---
title: Slope - Figma plugin (3)
description: time to evolve!
date: 2023-05-10T16:00:00.000+08:00
schedule:
hidden: false
tags:
  - vue
  - vite
  - figma
  - dayjs
  - mixpanel
---

# {{ title }}

{{ description }}

[[toc]]

---

## 序


繼上次引入 petite-vue 後又事隔一年，使用數竟然來到了 300up 🫢 *(Figma plugin 現在採即時引用而非像過去一樣「仿下載」的操作)*，也算是沾到一點「開源開發者」的邊了吧，終於要來實踐一年前的「日期字串」承諾。

依慣例先巡了一下目前的架構，又是一如既往的不滿足啊 😒 於是秉持「工欲善其事，必先利其器」的精神，還是先來梳理開發環境吧！由於這次對整個功能有更多的想像，所以想先將現代 SPA 的環境整組套上

- Vite
- Vue3


## DX env setup

畢竟終究只是個 html + js 的產物，過程怎麼樣都不打緊吧～先照 vite 的流程起手，之後再新增一個 `figma/code.ts` 放 plugin 與 figma 溝通用的主要邏輯，接著新增 `public/manifest.json`，內容應同 create figma plugin 時提供的檔案 (包含 id 及 name)，這樣打包後就會原封不動的搬進 dist，最終開發完要提供給 figma 的就是這包 dist，所以接下來要從 vite.config.ts 中把打包產物都設定好

```bash
dist
|- index.html
|- code.js
|- manifest.json
```

在改版前可以看到所有的 css 都被寫在 html 中，主要是因為 manifest 中並沒有任何關於 css 的路徑參照，如果用相對路徑在 html 中引入的話，在部署到 figma 上後可能又會不一樣，所以這邊選擇將 css 全部壓進 html，配上前端開發必備良藥 [unocss](https://github.com/unocss/unocss)，而 code.ts 則輸出成 code.js

```tsx {4,11}
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSingleFile(),
    UnoCSS()
  ],
  build: {
    cssCodeSplit: false, // 不另外打包 css
    rollupOptions: {
      input: {
        index: 'index.html',
        code: 'figma/code.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
})
```

值得注意的點是，為了達到 js, css all in html 而安裝的 [vite-plugin-singlefile](https://github.com/richardtallent/vite-plugin-singlefile) 似乎會遇到一些相容性的 bug，所以安裝時要指定版號 `@0.7.1` ，雖然作者[表示](https://github.com/richardtallent/vite-plugin-singlefile/issues/23)在 @0.10.0 已修復，依舊無效 🤨

以下就是這次全新版本的開發環境 vite + vue3 + unocss !!

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0625dbc5-7faa-4220-aaa6-12a32ce7fd15%2FCleanShot_2023-05-04_at_15.42.01.png?id=0e84287f-b6ea-45fc-a577-cc8725a80d73&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

既然都走到這了就發個 template 吧 [figma-plugin-vite-vue-template](https://github.com/unickhow/figma-plugin-vite-vue-template)

幾番折騰後終於進入正題了，有了如此神助的 DX，每次開發都一百分呢 🚀

| before | after |
| ------ | ----- |
| ![before](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc49c5fbd-7095-4702-afb7-16ec73a777e8%2FUntitled.png?id=bffe3a33-991d-4a37-8533-5af5595879c1&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2) | ![after](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8b42b0b4-d07c-49a0-b87d-38bdef49040a%2FUntitled.png?id=2e419438-d6b7-469d-add0-b9bb73b7c553&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2) |


## 改造開始

然後是說了很久的 datetime 字串功能，由於介面使用上與現有的方式有點不同，打算採用 tab 來切換兩個功能，看了一下其他有 tab 的 plugin 總感覺有一個 design guideline 但又找不到相關的文件

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F591dc829-c328-4301-880a-7167bb0ec880%2FCleanShot_2023-05-04_at_16.36.50.png?id=0371d74a-4e5c-40ae-add8-21ccae96d58a&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=910&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

![CleanShot 2023-05-04 at 16.37.26.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F08f4877a-42b9-485f-838d-a82e28cfc837%2FCleanShot_2023-05-04_at_16.37.26.png?id=62f64245-6f77-452b-a32d-f9206e5601d8&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=630&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

拼拼湊湊看下來，最接近的是 [menu](https://www.figma.com/plugin-docs/manifest#menu)，但 Unplash 有帶 icon 卻看不到文件中有可以指定 icon 的欄位，而因為我想要的是開發上 HMR 的即時反饋體驗，至少在介面開發上可以更快速的實作，如果要借助 figma sdk 去切換會造成 local 開發極大的不便，於是我想用盡量相仿的視覺設計，透過 component 切換來做 plugin 內部的控管，再加上我可以自己控制 component 的生命週期，所以在切換頁面上可以有效降低每次 init 的啟動時間，唯一的問題是：不知道會不會因為不符合規範被下架 😐，再加上另一個潛在的問題是，[parameter](https://www.figma.com/plugin-docs/manifest#parameters) 這欄位似乎是可以對不同 tab 做什麼 *(目前沒用他的 tab 就沒繼續深究)* ，如果之後有類似的需求可能就要整組打掉重練。

### 設計理念

開始動手前先釐清了幾個要點：

1. date picker 不能手動輸入，必須透過日曆上的點擊動作觸發<br>
→ 節省多餘的驗證步驟，也考慮到這是 wireframe 設計，大多數時間只需要帶格式的字串即可
1. format 不能手動輸入，採限定選項的 select<br>
→ 各家的格式定義不一，光這次採用的 [dayjs](https://day.js.org/) 就跟 [v-calendar](https://vcalendar.io/) 有些微出入了，如果再考慮用戶從其他 library (e.g. momentjs) 習慣格式搬過來的話，要處理太多可能性的轉換

```jsx
YYYY-MM-DD
MM-DD-YYYY
MM/DD/YYYY
MMMM DD, YYYY
MMMM DD, YYYY h:mm A
dddd, MMMM DD, YYYY h:mm A
M/D/YYYY
MMM D, YYYY
MMM D, YYYY h:mm A
ddd, MMM D, YYYY h:mm A
```

3. calendar 的呈現方式主要考量兩種，一是跟一般常用的 form 表單一樣，透過點擊 input 觸發才顯示，二是直接丟在介面上
→ 想跟第一個 tab 的介面做出差異，選擇直接呈現

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff52c533f-0890-438b-b9a1-7fc3c69c333f%2FUntitled.png?id=9a6410f4-d92c-4f82-a2a9-b97d95324853&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=670&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

voilà

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe8929b77-7241-43bb-b0bf-f4cdcf3b7c6e%2F%25E6%2588%25AA%25E5%259C%2596_2023-05-07_%25E4%25B8%258A%25E5%258D%25889.56.54.png?id=246b693f-ca1f-49d9-be05-90ad4db78dc1&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=710&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

### 後續追蹤

基於這次上述 format 的考量，我先把 dayjs 現有的 [format](https://day.js.org/docs/en/display/format#localized-formats) 全部丟上去，然後再埋 [mixpanel](https://mixpanel.com/) 來追蹤一下大家使用的習慣，以利後續更新參考 🤫，這邊有個小坑著墨了一段時間，就是官方提供的 https://github.com/mixpanel/mixpanel-js 並不適用於 figma plugin，因為背後會去存取使用者的 cookie/localStorage，而 figma plugin 是以 Data-URI 的方式透過 iframe 嵌入，並不能操作到 cookie (即便用上了 `disable_persistence` 也無效 …)，所以找到了專為 figma plugin 而生的二創套件 https://github.com/okotoki/mixpanel-figma ，去掉了 cookie/localStorage 的部分，但這樣的代價是如果設計師同時開了多個項目在使用 plugin，將被視為不同的使用者紀錄，不過對於目前需求已經很夠用了！於是進一步把 mixpanel dashboard 都設置好，便可以準備一窺設計師們的習性了 👀

![mixpanel](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff879f3db-703d-4e78-9293-22ad63266edc%2F%25E6%2588%25AA%25E5%259C%2596_2023-05-07_%25E4%25B8%258B%25E5%258D%25881.35.39.png?id=a1d73fb6-fd6d-4742-85cb-40c9aaab17e3&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)


## Summary

總結一下這次一年一度卯起來的改版，整體來說非常的充實啊，從開發環境開始搞到畫面產出，都有源源不絕的動力，卡最久的本來以為會是 vite 架構，但其實時間都花在找 tab guideline …，找到後試著改寫才發現跟 dev server 相性很差，於是又跳回 SPA 的開發模式繼續衝，至於 Todo 中還有一項：append element，也就是不需要先選擇字串就可以無中生有的功能嘛 … 就再看看什麼時候有緣了 😅
