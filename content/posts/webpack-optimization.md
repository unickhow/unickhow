---
title: Webpack@4/Vue-cli@4 優化之路
description: still webpacking in 2023 ...
date: 2023-05-11T16:00:00.000+08:00
schedule:
hidden: false
tags:
  - vue
  - vue-cli
  - webpack
  - optimization
---

## 序

最近深刻的感受到公司專案的不便性，可能是因為近期碰 side project 的頻率比較高，導致在那種前衛的 DX 環境下，回到公司專案就更顯得拙劣遲緩，雖然 Vite@4 + vue@3 跟 Webpack@4 + vue@2.6 不在同一個水平上，根本不能這樣拿來比雞腿，但還是希望盡綿薄之力，至少先踏出第一步，終點訂在那 esm build 的遠方，從腳下的 Webpack@5 + vue@2.7 出發。


## 起手式

首先來到 [vue-cli migration note](https://next.cli.vuejs.org/migrations/migrate-from-v4.html)，把整個 vue-cli 生態都一併升級，基本上這些異動應該不會造成太大的問題，搭配 [naruto](https://blog.vuejs.org/posts/vue-2-7-naruto) 升級指引，把用不到或該升級的 dependencies 都一次到位


## 利其器
### webpack-bundle-analyzer

翻了文件發現，原來 vue-cli 已經有內建 build report 分析，也就不用另外安裝 [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

```tsx {3}
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build --report",
  "lint": "vue-cli-service lint"
},
```

這邊有個小小的差異，如果安裝 analyzer 預設會是以 local server 的方式開啟圖表，可以透過 analyzeMode 參數切換，但內建的指令就只有 `—-report` 及 `—report-json` 兩種靜態檔案的方式，需求上也只需要靜態檔案即可。

### speed-measure-webpack-plugin

接著還有一個分析利器也需要先行到位：[speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin) ，在啟動 server 的過程中，計算每個 loader 的耗時，從而對症下藥

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F77c7b2cc-3e0b-4b4c-b718-d1bd2c1c6b0f%2FCleanShot_2023-05-08_at_19.49.26.png?id=cd9b82e6-e9fb-4bc2-ac72-5c837843fdd8&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)


### thread-loader

上圖中看到的 [thread-loader](https://github.com/webpack-contrib/thread-loader) 也是這次為了優化而掛上去的工具，他的工作主要是將費時的 loader 另外開出 worker pool 處理，達到類似多線程的工作程序，而該怎麼判定「費時」就是取決於前面所用的 **speed-measure-webpack-plugin**，看完初步的評估後 ~~*(忘了截圖)*~~，我在 vue-loader 上使用了 thread-loader

```js {8-10}
// vue.config.js

module.exports = {
  ...
  chainWebpack: config => {
    ...
    config.module.rule('vue')
      .use('thread-loader')
      .loader('thread-loader')
      .end()
      // 在目標 loader 前插入 thread-loader
      .use('vue-loader')
      .loader('vue-loader')
      .end()
    ...
  }
}
```

在優化之前，local serve 啟動時間大約落在 2.43 min

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6f2e6716-3855-412c-838c-acc630d7c585%2FUntitled.png?id=ca437fc4-f870-4531-b2af-a1fe696fe610&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

後端同事的環境更慘，久久才開一次前端專案的狀況下，竟然要等到 4 分多鐘 🙀

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F50e9cace-7334-4230-8a1c-bda1311ce74a%2FUntitled.png?id=71090c11-8f87-4a2a-ba80-aea058588d45&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

經過上述的優化程序後，大幅地降低冷啟動時間，大部分都可以壓在兩分鐘內

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3aaf3f91-341e-41c5-a15b-6b4ffa7ae2b2%2FUntitled.png?id=02f2a06a-9efb-4240-aa5d-79acd09b1638&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)


### chunks

一般而言，在使用 webpack 打包時，他預設會將相關的 packages 壓在一包 `bundle.js` 中，可想而知這個檔案會非常的肥大，導致在瀏覽器啟動時，一口氣要吞太多東西，拉長了 loading 時間，下圖是在優化前的打包分析，尺寸來到了 **32.33MB**

![這個 txxxxxxx.xxs 碼的真詩情畫意](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3ede59db-2d23-4e5b-a1ed-87b4526faeca%2Fbefore.png?id=c61d60cb-1a85-40bd-9cfb-991bead8aa1e&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

這邊我做了兩個關於 chunk 的調整：

1. runtimeChunk
2. splitChunks

#### runtimeChunk

`runtimeChunk` 主要是針對發布後的版本，能讓瀏覽器對於 runtime packages 進行快取 (e.g. vue, babel etc.)，因為這些套件大多時間都不會有變動需求，因此不需要在每次發布後造訪網站都要重新請求檔案
```js
config.optimization.runtimeChunk(true)
```


#### splitChunks

`splitChunks` 有三個選項，分別是 `async` `initial` `all`，其中 `async` 為預設值，表示只有非同步載入的組件會被另外處理，例如 `vue-router` 中常見的
```js {4}
{
  name: 'Posts',
  path: '/posts',
  component: () => import(/* webpackChunkName: ‘posts’ */ '@/views/Posts/index.vue')
}
```

相反地，`initial` 則是處理同步載入的組件，例如
```js
import axios from 'axios'
import dayjs from ‘dayjs’
```

最後 `all` 即是以上皆是，不管同步非同步，全部都會被 chunk 分裝
```js {6-9}
// vue.config.js
module.exports = {
  ...
  chainWebpack: config => {
    ...
    config.optimization.runtimeChunk(true)
    config.optimization.splitChunks({
      chunks: 'all'
    })

    config.module.rule('vue')
      .use('thread-loader')
      .loader('thread-loader')
      .end()
      .use('vue-loader')
      .loader('vue-loader')
      .end()
    ...
  }
}
```

延續上題，splitChunks 背後還有一個重要的參數： `cacheGroups`，在 Webpack5 中，splitChunks 預設如下
```js {12-23}
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

上述結果即 cacheGroups 會將 `node_modules` 內以 `async` 方式被引入的模塊另外打包，但這次優化我目前是以全域 `chunks: 'all'` 的方式暴力拆分 😗 打包後竟然可以在 **7MB** 內

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F232210a4-ea34-4a14-99f4-795d4c2cff53%2Fafter.png?id=0a079f00-9817-4970-9989-217201f3d45c&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

一陣欣喜若狂後我就沒再對 cacheGroup 做什麼特別設定，雖然這樣會導致 initial request 變很多，不過因為每個檔案的尺寸都已經小到淋漓盡致了，上線後 loading 也有感提升，所以就沒再進一步處理，之後有機會再繼續調整參數 🙈

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F72000de9-73d1-4e66-b9d7-f47107bbb2ec%2FCleanShot_2023-06-28_at_11.22.01.png?id=354720d9-a8ce-4a80-93c0-aa6593356c49&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

CI/CD 的時間也從平均 11 分鐘降到約 7 分鐘的時間 🎉

![上線那筆 failed 是因為這次把 node 從 v14 升到 v16，但部署環境忘了修改導致錯誤](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4b5f935c-f219-4811-9abc-c583b1848ed2%2FCleanShot_2023-06-27_at_18.27.23.png?id=85f615e4-f9db-43fa-91a4-b8d3417c94a3&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

## 總結

優化過後，冷啟動時間大約快了 **20%** 🚄

| before    | after                                     |
| --------- | ----------------------------------------- |
| ~2.43 min | <span class="text-green">~1.93 min</span> |

打包體積也小了 **79%** 🚀

| before   | after                                   |
| -------- | --------------------------------------- |
| ~32.33MB | <span class="text-green">~6.72MB</span> |

<br>

回頭看看這個專案，不過兩年的時間，當時叱詫風雲的 webpack 竟然在此時此刻變得令人 ~~*(我)*~~ 如此唾棄 … 雖然剛入行的時候也有冒出打著 zero config 口號的 [parcel](https://parceljs.org/)，但在當時前端框架如雨後春筍般崛起的環境，零配置是蠻不切實際的願景，頂多也只能取代 gulp 在處理靜態頁面的地位，但就在 2020 年尤大大的 vite 帶著 esbuild 橫空出世，速度跟彈性根本不可相提並論，挺過了 IE 殞落的時間點後，就擋不住各開發者跳槽的決心，更甚至後面還有 [turbopack](https://turbo.build/pack)、[rspack](https://www.rspack.dev/) 在挑戰市場，真實的體悟到「前端一天，人間十年」啊 🚬，希望這個專案在走到 Vite + Vue3 的時候，不要又進入另一個 webpack 循環 … 最終還是只能帶著積極進取的皮囊跟著時代走，內心謹記一句前輩的話

> **求不要更新了，老子學不動了 👴**

<br>
<br>

---

## 後記

善惡終有報，果然暴力是不能解決問題的 🥲 因為 chunk 極其碎片化，雖然大幅降低了打包體積，但也可能因此導致引入順序不如預期，專案中的例子就是 tailwindcss 跟 ant-design-vue 的 css 發生覆蓋衝突，但也只侷限在 tailwindcss preflight 的部分，所以傷害還在可控範圍內，還是乖乖的把 node_modules 做好區別吧 …

```js {4-10}
config.optimization.splitChunks({
  ...
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      chunks: 'initial',
      name: 'chunk-vendors',
      enforce: true,
      priority: 10
    }
  }
  ...
})
```

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F10c14b15-6a1b-4873-a866-d90f077c4240%2Fnew.png?id=14672f9d-189e-44e4-9799-f5a9af0b5bcc&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

打包後雖然效果有回彈，但還是比升級調教前優化了 50%

| origin   | chunks 'all' | chunks by group 'node_modules'          |
| -------- | ------------ | --------------------------------------- |
| ~32.33MB | ~6.72MB      | <span class="text-green">~16.4MB</span> |

這次學到的教訓就是 … unocss 最高 🫡 *~~(他應該不會遇到吧…嗎…?)~~*


> references
> [https://webpack.js.org/configuration/optimization/#optimizationminimizer](https://webpack.js.org/configuration/optimization/#optimizationminimizer)
>
> [https://segmentfault.com/a/1190000040257542](https://segmentfault.com/a/1190000040257542)
>
> [https://blog.csdn.net/qiwoo_weekly/article/details/104935415](https://blog.csdn.net/qiwoo_weekly/article/details/104935415)
>
> [https://www.cnblogs.com/zjxlicheng/p/15000917.html](https://www.cnblogs.com/zjxlicheng/p/15000917.html)
>
> [https://jelly.jd.com/article/61179aa26bea510187770aa3](https://jelly.jd.com/article/61179aa26bea510187770aa3)
>
> [https://zhuanlan.zhihu.com/p/395587041](https://zhuanlan.zhihu.com/p/395587041)
>
> [https://blog.csdn.net/Run_youngman/article/details/123092799](https://blog.csdn.net/Run_youngman/article/details/123092799)
>
> [https://juejin.cn/post/6844904138954801166](https://juejin.cn/post/6844904138954801166)
>
> [https://www.cnblogs.com/plBlog/p/15477349.html](https://www.cnblogs.com/plBlog/p/15477349.html)
>
> [https://blog.csdn.net/weixin_43443341/article/details/108865372](https://blog.csdn.net/weixin_43443341/article/details/108865372)
>
> [https://thomasnguyen.site/useful-webpack-optimization-configuration](https://thomasnguyen.site/useful-webpack-optimization-configuration)
>
> [https://blog.logrocket.com/guide-performance-optimization-webpack/](https://blog.logrocket.com/guide-performance-optimization-webpack/)
>
> [https://cli.vuejs.org/guide/webpack.html](https://cli.vuejs.org/guide/webpack.html)
>
> [https://github.com/webpack/webpack/issues/12102](https://github.com/webpack/webpack/issues/12102)
>
> [Webpack 5 is consistently ~30% slower for all our packages compared to Webpack 4 · webpack/webpack · Discussion #12475](https://github.com/webpack/webpack/discussions/12475)
>
> [Webpack 前端打包工具 - 使用 SplitChunksPlugin 抽離公用模組](https://awdr74100.github.io/2020-04-06-webpack-splitchunksplugin/)
>
> [webpack 之 optimization.runtimeChunk 作用](https://www.jianshu.com/p/714ce38b9fdc)
>
> [https://libuv.org/](https://libuv.org/)
>
> [https://nodejs.org/api/worker_threads.html](https://nodejs.org/api/worker_threads.html)
>
> [https://webpack.js.org/plugins/split-chunks-plugin/](https://webpack.js.org/plugins/split-chunks-plugin/)