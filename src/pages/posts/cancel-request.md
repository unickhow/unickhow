---
title: Cancel previous request for ALL
description: I assume most of requests deserve a cancel, right?
date: 2023-04-28T16:00:00.000+08:00
schedule:
hidden: false
tags:
  - axios
  - fetch
  - api
---

# {{ title }}

{{ description }}

[[toc]]


## 序

過去在處理「取消請求」的時候，以 [axios](https://axios-http.com/) 來說都會以 CancelToken 來處理，或是搭配 Rxjs 的 [switchMap](https://rxjs.dev/api/index/function/switchMap)，但現在有了更棒的做法：就是 Browser 支援的 [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

舉個 🌰

使用者在一個充滿表格的 CMS 後台，進入的第一個畫面是 500 items / per page 的頁面，在等待三秒後不加思考的晃到了最後一頁 (先不論 pagination 是否有做阻擋，因為也可能可以透過 url query 去變動)，這時最後一頁的資訊可能只有少少的 3 筆，所以 response 很快就回來了，但這段時間，後端其實也把上一個 500 筆 query 處理完也接著回傳給前端，在這兩組 request 交纏下，因為 response timing 的差異，導致使用者極有可能是人在「最後一頁」但看到「第一頁」的資訊

![](https://howtohow.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2b604815-0236-4a93-b39e-ba9cae1bc205%2FUntitled.png?id=97daf153-f9c2-44ea-8045-4bb050130006&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=770&userId=&cache=v2)

前端為了避免這種窘境，會在該 function 做一個 cancel flag 去標記，以便在重複觸發請求時可以把標記的請求做取消

以 axios [CancelToken](https://github.com/axios/axios#canceltoken-deprecated)(*deprecated*) + Vue 為例

```jsx {6,7,8,10,20}
import axios from 'axios'

const cancelToken = ref(null)
const handleFetch = () => {
	// 每次請求前，如果有存在 token 就做執行取消，所以第一次不會有影響
	if (cancelToken) {
		cancelToken.cancel()
	}
	// 將此次的請求標記並存在 cancelToken 中
	cancelToken.value = axios.CancelToken.source()
	return http({
		method: 'get',
		url: '/admin/orders',
		params: {
			limit: 500,
			page: 1
		}
	}, {
		// 標記丟進 axios，後續在取消時才有對應的請求可以中止
		cancelToken: cancelToken.value.token
	})
}
```

在 axios v0.22.0 已經廢棄 CancelToken 的用法，全面擁抱 browser 原生的 AbortController，於是改寫成以下

```jsx {6,7,8,10,20}
import axios from 'axios'

const controller = ref(null)
const handleFetch = () => {
	// 每次請求前，如果有存在 token 就做執行取消，所以第一次不會有影響
	if (controller) {
		controller.abort()
	}
	// 將此次的請求標記並存在 cancelToken 中
	controller.value = new AbortController()
	return http({
		method: 'get',
		url: '/admin/orders',
		params: {
			limit: 500,
			page: 1
		}
	}, {
		// 標記丟進 axios，後續在取消時才有對應的請求可以中止
		signal: controller.value.signal
	})
}
```

這樣確實解決了時間差異導致畫面不同步的問題，但這時候把視角再往上拉一點，我不禁反問：難道不是所有請求都該這樣處理嗎？

## 試探

於是我把手伸進了 interceptor 裡，踏上 cancel request one for all 的求道之路

![](https://howtohow.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa0e4e774-91d4-4394-bbc2-7c799aa85ca5%2FUntitled.png?id=99d6499c-3ce5-42eb-bcd4-bf5888bafe7d&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=670&userId=&cache=v2)

同樣的邏輯先搬進 request interceptor 試一試

```jsx
import axios from 'axios'

const http = axios.create({ ... })

let controller = null
http.interceptors.request.use(
	(config) => {
		if (controller) {
			controller.abort()
		}
		controller = new AbortController()
		config.signal = controller.signal

		return config
	},
	(error) => {
		// handle the request error
		return Promise.reject(error);
	}
)
```

乍看之下，好像是沒有問題，但要注意這裡畢竟是所有請求的**中央處理**，也就是不管是誰發起的他都六親不認一律取消前一個請求

![](https://howtohow.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F488acddd-2ca3-4d0d-93aa-c89f03a9061d%2FUntitled.png?id=7439462c-ccc8-47ff-b226-100ad3fc5709&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=480&userId=&cache=v2)

那現在任務就很明確了：辨識發起的請求是否為同一個

## 實作

先來看看 axios request config 長什麼樣子

![](https://howtohow.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F638d6273-5070-47e6-91ac-cf951e1f5a2b%2FCleanShot_2023-04-28_at_11.31.22.png?id=791e72b1-269a-4f69-87c5-728c0f7d106c&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=1720&userId=&cache=v2)

我第一個想到的是用 map 來記錄所有發過的請求，並儲存**取消標記**到對應的值，unique key 則使用 `url + method` 的組合拳 *(如果站內有多個來源也可以考慮加入 `baseURL` 辨識)*

![](https://howtohow.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc37ce436-286f-4af9-b95d-223ba65b35fa%2FCleanShot_2023-04-28_at_14.28.56.png?id=9e6dc9ad-81c8-44f2-b4c2-cef5c6baf5f9&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=1120&userId=&cache=v2)

```jsx
const histories = new Map()

http.interceptors.request.use(
  (config) => {
    if (histories.has(`${config.url}__${config.method}`)) {
      histories.get(`${config.url}__${config.method}`)()
    }

    const controller = new AbortController()
    histories.set(`${config.url}__${config.method}`, controller.abort.bind(controller))
    config.signal = controller.signal

    return config
  },
  (error) => {
    // handle the request error
    return Promise.reject(error);
  }
)
```

![真香](https://howtohow.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fbabf974c-e1b6-4398-a63e-7acfccdb64d0%2FUntitled.png?id=90aca5a5-6bce-4b5b-8dcd-f933cfc6ba39&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=480&userId=&cache=v2)

這樣一來所有相同路徑的重複請求都會被限制，同時只有最新的那個在作用 🤘 當然這只是我認為應該有的功能，也許沒這麼普遍落實也是有他的原因 ?! 在真正遇到痛點前就先這麼做吧！

## Todo

不過後續要考量的東西也不少，目前還不會遇到就先表列記錄一下：

1. Map 記憶體極限？在規模較大的專案中，是否會遇到請求紀錄肥到拖慢效能的程度？
2. 開放參數調整讓想保持重複請求的特例可以使用
    ```jsx
    e.g. options: { keepRequest: true }
    ```
    例如有些 api 可能會依據 query 來做區別，但在前端是需要把不同 query 都一併呈現在同一個畫面上，可能就會需要保持重複請求，或者也可以把 query params 視情況加入到 map 的辨識名稱上，達到同樣的效果