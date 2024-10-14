---
title: 硬著頭皮走上 SDK 開發之路
description: Still Don't Know how to do it in the right way 😶‍🌫️
date: 2023-11-10T12:50:00.000+08:00
schedule: null
hidden: false
tags:
  - SDK
  - js
  - vue
  - solidjs
---


## 序

在網站開發的道路上，或多或少都會碰到串接第三方 SDK (Software development kit) 的經驗，最常見的就是 Facebook pixel 或 Google Analytics 這類事件追蹤的 SDK，這是相對簡單上手的 SDK，只要將範例程式碼加到網站上，就可以透過腳本提供的全域實例來註冊事件

```jsx
fbq('track', 'AddToCart')
```

因為像這種全站類型的事件追蹤，通常只需要綁定一個 ID，那既然是一對一的關係，開發者在向該服務申請的過程中，就可以事先幫你做好範例程式碼，同樣以 Facebook 提供的腳本為例，針對你申請的服務直接提供包含 initialize 的範例碼，因此只需要貼上腳本，就可以有最基本的 PageView  事件

```html
<script>
!function(f,b,e,v,n,t)
{...}(...)
fbq('init','1234567890')
fbq('track','PageView')
...
</script>
```

再來以我個人的經驗就是金流服務了，例如 Stripe、TapPay 等等，這類服務的 SDK 比起事件行為追蹤會稍微複雜一點，因為訂單相關的資訊只會在使用者準備結帳的前一刻產生，這時後端會向支付系統取得一組僅供本次交易的 key，前端再以這把 key 註冊生成支付畫面

```jsx
Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

var elements = stripe.elements({
  clientSecret: 'CLIENT_SECRET',
});
```

當然，後續 Stripe 還有因應不同需求提供各種 api 可以使用，詳情請見[光翻碗讚](https://stripe.com/docs/js)。

大概一年前接下了公司新的專案，主要開發這種第三方的金流 SDK 供其他開發者使用，從一開始的無頭蒼蠅到現在總算有點穩定的開發方式，中間個人的血淚歷程就來記錄一下。

## 起手

這段路途真的是一波多折，算一算大概有一個多禮拜的時間都在跟後端一起研究 [Stripe](https://docs.stripe.com/js/elements_object/create)*~~(此頁效能極差，慎入😀)~~*、[TapPay](https://tappay.github.io/tappay-web-example/) 的實作方式再交叉比對，因為東翻西找，就是找不到有關金流 SDK 的任何時做文章，大部分都是在說明 SDK 怎麼運作，有心的會再配上那種很 Todo-list like 的實例教學 🤣，那就只好從競品身上開始頗析了。

### 我以為

![Stripe Payment Element](https://img.notionusercontent.com/s3/prod-files-secure%2F97e46578-ab72-4131-b5e5-cf4f9a6129f1%2F1863441e-d0e8-4fc4-9509-73af3fe24db0%2FCleanShot_2023-08-17_at_11.44.33.png/size/w=1420?exp=1728997187&sig=yI-SSLVSmSZDLpiobmBhvo6AOSyIGM54lrAOTjdnTwk)

看完範例後，天真的我便開始著手實作，心想：「阿不就 insert element？ 蒿哈已累？」，那就順便來玩一下 [Solidjs](https://www.solidjs.com/) 吧！選擇 Solidjs 的主因是這個考慮到專案很小，只需要幾個 input 組成的表單，其他交由串接此 SDK 的開發人員處理即可，因此我認為不需要動用到額外的 compiler 做 virtual DOM 的處理，選項便刪去了 React、Vue，剩下 Svelte 跟 Solidjs 在做抉擇，而因為 Svelte 也額外需要 complier 去編譯 .svelte 檔案，再加上我現在強迫自己專案都要直上 TS 練習，考慮到過去 Vue 搭上 TS 的那種設置麻煩，不如直接補上 jsx/tsx 這條技術線。

不消一會，v0 SDK 出爐了（下方僅做重點示例）

```tsx [src/index.tsx]
import App from './App.tsx'
import { render } from 'solid-js/web'

class PaymentSDK {
  private clientKey: string = ''
  private secretKey: string = ''
  constructor ({
    clientKey,
    secretKey
  }) {
    this.clientKey = clientKey
    this.secretKey = secretKey
  }

  public mount (el: Element | string) {
    el = typeof el === 'string' ? document.querySelector(el)! : el
    if (!el) {
      throw new Error('Element not found.')
    }

    render(App, el)
  }
}
```

```tsx [src/App.tsx]
import { createSignal } from 'solid-js'

function App () {
  const [cardNumber, setCardNumber] = createSignal('')
  ...

  return (
    <form>
      <input value={cardNumber()} onChange={evt => setCardNumber(evt.target.value)} />
      ...
    </form>
  )
}
```

正當我想要比對競品畫面的客製化條件時，發現了一個重大的錯誤：「為什麼他們都有 iframe?!」，沒看不知道，一看不得了，原來在金流交易的世界，為了確保用戶的卡片資訊不外流，都會用 iframe 的方式來區隔環境，而這對過去沒什麼 iframe 處理經驗的我來說著實是個效果拔群的痛擊，除了最基本的特性「iframe 與外部程式的 scope 互不干涉」以外，都沒有深入研究，於是與後端再次望進深淵，一番探討後決定，前端只需要出基本的樣式，其餘的行為由後端 php server side 維護。

### 這不合理吧

![Stripe elements](https://img.notionusercontent.com/s3/prod-files-secure%2F97e46578-ab72-4131-b5e5-cf4f9a6129f1%2Fc3101461-e292-44b4-bf0b-af5a6eefe771%2FCleanShot_2024-04-17_at_09.32.49.png/size/w=1420?exp=1728997282&sig=YkKQZ_yBgQMolTJDUDb0GtmPY3UH1R8HQMJit3_PDuA)


![Tappay fields](https://img.notionusercontent.com/s3/prod-files-secure%2F97e46578-ab72-4131-b5e5-cf4f9a6129f1%2F2e5c21d4-9a2e-4ffe-8a22-4124d6b95786%2FCleanShot_2024-04-17_at_09.35.47.png/size/w=1420?exp=1728997301&sig=txlsaiN_XZ4Z6ki7ff2CZ_zr6iqDXxbDEIJ545CCM0M)


從上圖我們觀察到，Stripe 與 TapPay 都是透過 URL 傳遞參數到 iframe 的頁面，而在我們的做法上，客戶端在向後端請求 html 時，就可驗證客戶端的資訊，所以這步驟我們省略👍 我快速地將 form input 套上 cleave.js 後，後端只需要處理在點擊 form submit 後的事件即可

…

不是啊，submit button 在哪？

母丟欸

這不合理吧？

兩者 SDK 竟然都提供了 submit method，也就是說，submit 會由開發者決定如何觸發，原本天真的我以為只要把所有表單需求都包進一個頁面，讓後端決定該顯示哪些欄位就好，現在 submit 外拋，等於要做一條 postMessage 來讓開發者呼叫 iframe submit，而在開發過程中也體會到了一個致命的疏失：本地開發非常不便，從上述流程可以知道，前端必須在開發的同時，必須先將打包後的檔案丟到後端的靜態資源位置，然後訪問後端 server 取得頁面才能得到反饋，可想而知後續如果有更多需求，甚至加入其他協同開發者會是極差的開發體驗，那既然已經看到血淋淋可預見的未來，不如當機立斷直接把專案徹底分離。

## 捲土再重來

經過了兩次教訓，重新規劃了 SDK 的專案架構，首先 SDK 主程序需要自己獨立一個腳本，目前只考慮讓開發者以 CDN 的方式引入，所以檔案盡可能地收斂在一支 js 中，再來所有的表單畫面依據需求拆分，現況大致分為 Card(信用卡資訊) 及 BillTo(持卡人資訊) ，各自獨立為一組 HTML + CSS + JS，而主程序與所有表單可能會有共用的邏輯函數，綜觀以上條件，我選擇使用 monorepo(pnpm workspace)，主程序為 solidjs + ts + vite，表單則是使用 vue + ts + vite，用上一知半解的架構又為這不穩定的專案增添幾分難度呢 🤪

<i class="text-xs">其實在為表單選擇框架時有個小小的內心戲，畢竟業務邏輯一旦複雜起來，不用框架著實是一種慢性自殺，我就在想到底是要繼續用 solidjs 還是再試試看其他想玩的框架？後來考慮到也許未來會有其他人一起維護，選擇一個公司普遍熟悉的 vue 還是妥當一點，最重要的是：也許有一天市場會驚嘆「這個 PaymentSDK 也是 base on vue 耶！」 😗</i>

目前我對 monorepo 的特性認知有兩個：一是內部各個專案若有共用的第三方套件，可以由根目錄安裝一次後，共享給所有專案，避免重複下載的問題，但若是遇到不同版本的需求也可以針對特定的專案個別處理；二是函式共用，可以在 monorepo 中新增一個如 shared 的專案，負責提供通用函式讓其他專案引入。

```bash [structure]
root
|- packages
  |- core
  |- form
    |- card
    |- billTo
  |- shared
```

我預期開發者在串接時只需要透過 CDN 建立實例後，依需求導入不同表單的 HTML

```html
<head>
  <script src="https://js.payment.com/v1/sdk.js"></script>
</head>
```

`sdk.js` 會引入 `https://js.payment.com/v1/form/card.html`，再由 `card.html` 拉進參照的 css, js

而為了避免跨域發生不可預期的錯誤，在本地開發時盡可能的模擬正式使用情境，所以在 core 專案中啟動一個 dev server `:8080`，在 form 專案中同時啟用兩個 terminal，一個負責 build on watch `pnpm build --watch`，另一個則是 host 打包後的檔案 `pnpm preview` `:9090`，至此，便可以在 core 開發時模擬跨域引用 iframe 的情況開發。

這樣一來，等同於在同一個頁面中，串上兩個不同的產品，而在 iframe 的世界中，跨區域的溝通必須通過 [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) 來傳遞，大略的帶一下他的概念：

### postMessage

```jsx
targetWindow.postMessage(payload, targetOrigin)
```

- `targetWindow` 指的是你要溝通的對象 (Window)
- `payload` 為要傳遞的資訊
- `targetOrigin` 指的是上述 `targetWindow` 必須具備的 origin (包含 protocol、port 等)

以上述例子來說，`core` 要向 `form` 所在的 window 傳遞訊息的話

```tsx
// parent window: 'https://unick.how'
const formIFrame = document.getElementById('form-iframe')
formIFrame.contentWindow.postMessage('hello, my iframe', 'https://js.payment.com')
```

而接收方則透過 `message` listener 來處理事件

```tsx
// iframe window: 'https://js.payment.com'
window.addEventListener('message', evt => {
  if (evt.origin !== 'https://unick.how') return
  // do something ...
})
```

同樣的概念，如果要從 iframe 往上打資訊到 parent 視窗

```tsx
// iframe window: 'https://js.payment.com/'
window.parent.postMessage('hello, my frame.', 'https://unick.how')

// parent window: 'https://unick.how'
window.addEventListener('message', evt => {
  if (evt.origin !== 'https://js.payment.com') return
  // do something ...
})
```

接著就跟日常開發模式一樣，只要資訊能夠傳遞，跨不跨域也不是問題。

而在 iframe 初始化的時候，因為內部的 js 根本就還沒有個影，所以也只能透過 url 來溝通基礎資訊，也就是為什麼 Stripe 他們會生出這麼冗長的 url

橋樑搭好了就開始著手搭建實例，大部分跟 v0 架構相仿，只是在介面層要改用 iframe 來源，並將所有客戶端的資訊盡可能的拋給 iframe

```tsx [core/index.tsx]
import App from './App.tsx'
import { render } from 'solid-js/web'

class PaymentSDK {
  private clientKey: string = ''
  private secretKey: string = ''
  constructor ({
    clientKey,
    secretKey
  }) {
    this.clientKey = clientKey
    this.secretKey = secretKey
  }

  public mount (el: Element | string) {
    el = typeof el === 'string' ? document.querySelector(el)! : el
    if (!el) {
      throw new Error('Element not found.')
    }

    render(App, el)
  }
}
```

```tsx [core/App.tsx]
import { createSignal } from 'solid-js'

function App () {
  const query = {
    hostname: window.location.hostname,
    origin: window.location.origin,
    referrer: document.referrer,
    href: window.location.href,
    port: window.location.port,
    protocol: window.location.protocol,
    // ...
  }

  return (
    <iframe src={`https://js.payment.com/form.html?${query}`}></iframe>
  )
}
```

到此，真 v0 也算是告一個段落了，這時沒想到，後面竟然 …

To be continue

> 發現如果寫筆記的當下沒有整理文章，現在要再來回顧是件很痛苦的事 ... 所以哪天有閒情逸致再繼續吧 ☕️
>
> 次回予定： 驗證 ✕ 漂白 ✕ 再重構
