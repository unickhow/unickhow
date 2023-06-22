---
title: Slope - Figma plugin (2)
description: work in modern way.
date: 2022-06-18T16:00:00.000+08:00
schedule: null
hidden: false
tags:
  - figma
  - petite-vue
---


一年之後，很榮幸的下載數來到了 50 大關，就興致一起來改個版，這期間未來室友一直在許願可以有日期的功能，以及前後對調的功能，在第一版時，Slope 僅支援 prefix + number 排列

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F41ab7af0-5332-4176-bafd-81afe2c7d1d7%2FUntitled.png?id=0aa82263-e58d-420c-a1be-3890f2591a6c&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

概念上我覺得這兩個功能都不會太難達成，但由於專案起創時是最原始的 html + css + js，於是趁著這次想改版的念頭乾脆把 framework 引進來，考慮到專案大小不太需要完整的 vue，看了 svelte、solidjs，最後還是選擇了尤教授的輕量版 vue: [petite-vue](https://github.com/vuejs/petite-vue)，在 MVVM 的幫助下又找回了舒適的 DX 🥴 但這畢竟不是一個完整的打包環境，所以在 UI framework 及 Icon 上使用還是有點受限，暫時先繼續使用 bulma cdn，幾個小時的較調下，v2 順應而生

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdaca93f2-735f-442c-a781-74fff9cb1be7%2FUntitled.png?id=3f27712c-6d81-47d0-8ad1-224cc01236be&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

這次提供了前後文的對調功能，在文字的選擇上更加彈性，至於日期嘛 … 就破 100 再來看看嘍 😃

[https://github.com/unickhow/slope](https://github.com/unickhow/slope)
