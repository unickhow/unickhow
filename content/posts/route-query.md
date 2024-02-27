---
title: 在 SPA 中不被重視的上/下頁
description: how to handle route history in SPA
date: 2022-12-18T16:00:00.000+08:00
schedule:
hidden: false
tags:
  - route
  - query
  - vue
  - history
  - url
---

## 序

在這個 SPA 普及的時代下，舊有的 SSR 模式已經幾乎找不太到立足之地了（除了屹立不搖的公家單位），但唯獨有一個是我非常芥蒂而且使用頻率很高的功能，就是「上/下頁」，我很常會使用滑鼠的快捷鍵上/下頁來穿梭網頁之間，不過前端普遍都沒有處理這種由瀏覽器觸發的路由事件，導致常常所見非所得，甚至更狠的根本就不做任何紀錄，每一次的再回首都是

![~~那跟無限滾動有何區別~~](https://media.tenor.com/NDH0YheBZroAAAAd/pulp-fiction-huh.gif)

在做專案的時候也找了很多討論依舊未果，只好捲起衣袖造起輪子。

## 探討

在 SSR 的時代，網頁都是以目前的 url 重新向 server 取得頁面資訊，包含所有的 hash, query，也就沒有處理不處理的問題，但這樣的缺點就是整個頁面每次都要閃一下 rerender，於是才有了現今的 SPA，藉由虛擬路由改善渲染過程，並適時地加入友善的過場動畫，但相對要處理的事情就更多了，前端常常在面對的是「介面互動」的事件，例如 `onClick` `onScroll` 甚至於 framework 中常見的 lifecycle `onMounted` `onUnmounted` 等等，必要時才會處理到路由事件。做法百百種，也可以選擇把特定頁面 keep-alive，但考慮何時要 kill instance 就是另一到課題了。

上 🌰，在一個有 filter query 的 table list 頁面中

```
1. 點選 page 3 => @click="fetchList({ ..., page: 3 })"           // 請求第 3 頁資訊
2. 點選 filter: rate = 4 => @click="fetchList({ ..., rate: 4 })" // 請求評價為 4 的資訊
3. 點選 page: 2 => @click="fetchList({ ..., page: 2 })"          // 請求第 2 頁資訊
```

經過上述操作，歷史紀錄預期應為：

```
1. https://shop.com/products?page=3
2. https://shop.com/products?page=3&rate=4
3. https://shop.com/products?page=2&rate=4
```

當我在第三步點選上一頁時，畫面中應幫我帶回 `?page=3&rate=4` 的內容，卻因為這是以路由發起的變化，完全不會觸發到 click event，也就是使用者會看到 url 已經回到過去了，但畫面卻依舊冷靜，除非使用者在這時重整頁面（假設前端有考慮到 landing with query），才會看到與 url 匹配的內容，但同樣地，繼續使用上一頁回到步驟一，或者下一頁前進到步驟三，也會發生一樣的狀況

實際案例演繹，部分操作是由滑鼠巨集鍵觸發，注意 url 變化即可

<iframe src="https://drive.google.com/file/d/11Q4J_-fF6HeNxYRAZ0EGF477FoJkJg1m/preview" width="100%" height="480" allow="autoplay"></iframe>
<br>
<iframe src="https://drive.google.com/file/d/1UEEyOTqS0pUYE-cgCGsFj6bfJ2jDqrjq/preview" width="100%" height="480" allow="autoplay"></iframe>


## 實作

既然是路由發起的變化，那就把所有行為都以路由為出發點重新設計，亦即所有 `fetch` 都不再直接由 `onClick` 觸發，改由監聽 url 變化做出相對應的回饋，而原本的 `onClick` 則是去驅動 url 變化，以 vue 為例（僅快速帶出理念，細節請忽略）

```vue
// before
<template>
	...
	<button @click="fetchList({ ..., page: 3 })">3</button>
	...
</tempalte>

<script setup>
function fetchList (payload) {
	return fetch('/list', payload)
}
</script>
```

```vue {4,17-27}
// after
<template>
	...
	<button @click="setQuery({ page: 3 })">3</button>
	...
</tempalte>

<script setup>
function fetchList (payload) {
	return fetch('/list', payload)
}

function setQuery (payload) {
	// update url
}

const unwatch = watch(
	() => route.query,
	(val) => {
		//  整理 api payload
		const payload = url.query
		fetchList(payload)
	},
	{
		immediately: true // landing 時也要觸發
	}
)

onBeforeUnmount(() => {
	unwatch()
})
</script>
```

經過改造之後，所有的請求都收束到 route change，頁面中的資訊如果有變更，一律先往 route query 方向更新，然後再從 watch 中做相對應的處理，在 vue3 更進一步可以包成 composable

```ts
import { watch, computed, unref } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'

function removeEmpty(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => value != null && value !== '')
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
}

export function useRouteQuery(cb, options = {}) {
  const router = useRouter()
  const route = useRoute()
  const { immediate = false } = options

  const setQuery = payload => {
    const query = {
      ...router.currentRoute.value.query,
      ...payload
    }

    router.push({
      query: removeEmpty(query)
    })
  }

  const query = computed(() => route.query || {})
  const getQuery = key => {
    const unrefQuery = unref(query)
    return key ? unrefQuery[key] : unrefQuery
  }

  if (cb) {
    let unwatch = null
    unwatch = watch(
      () => route.query,
      (to, from) => {
        const routeQuery = getQuery()
        cb(routeQuery)
      },
      {
        immediate
      }
    )

    onBeforeRouteLeave(() => unwatch())
  }

  return {
    setQuery,
    getQuery
  }
}
```

服用方式如下

```vue
<script setup>
import { useRouteQuery } from '@/composables/routeQuery'

function fetchList (payload) {
	return fetch('/list', payload)
}

const { setQuery, getQuery } = useRouteQuery(fetchData, { immediate: true })
</script>
```

這樣不管是透過頁碼點擊、條件篩選或是上下頁事件，都可以避免畫面不同步的問題，只要注意在變化後，畫面上要把當前狀態再補回去 (`getQuery`)，例如頁碼 highlight、filter checkbox 等等

## TODO

然而這樣的寫法也是存在幾個缺陷

1. 新增條件時需要耗費一點心智負擔來轉換寫法
2. 單頁面如果有多個相似的請求，處理起來會很雜亂
3. 一般而言，使用者重複點擊篩選的按鈕時，會期待重新整理或更新畫面的回饋，但這種作法因為 query 沒有變化，畫面也就不會有反應，導致體感上這個行為好像壞掉一樣 …
4. ~~應該還有但臨時想不到，待補 …~~

如果有其他客製化條件，像是有些網站會以特定的 query 來做 tab 的分類，不同 tab 不應共享 query，那就可以在 watch 時先做一層判斷篩選，甚至現在專案有需求是 query 不想透露給使用者知道，所以在 composable 層多做了 base62 的 encode/decode

總之這個功能做起來我是很滿意啦～但步驟還是稍嫌複雜，如果有更好的做法會再嘗試看看，之前在實體研討會直接殺去問講者也問不出個所以然，已經不知道是大家潛意識忽略這隻大象還是真的沒人會用上/下頁(?!)

Btw, 這個 [政府資料開放平臺](https://data.gov.tw/datasets/search?ct=249) 有顧慮到這個功能讓我蠻意外的（技術棧是 Nuxt），雖然狀態回填的部分沒有到很完善，但已經可以重現該有的畫面了，真好奇他們是用什麼做法達成 🤨


> for en version: <a href="/posts/route-query-en">Prev/next navigation issue in SPA</a>
