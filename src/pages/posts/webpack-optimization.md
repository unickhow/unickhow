---
title: Vue-cli 4 evolution
description: still webpack in 2023 ...
date: 2023-05-11T16:00:00.000+08:00
schedule:
hidden: true
tags:
  - vue
  - vue-cli
  - webpack
---

# {{ title }}

{{ description }}

[[toc]]

## 序

最近深刻的感受到公司專案的不便性，可能是因為近期碰 side project 的頻率升高，導致在那種前衛的 DX 環境下，回到公司專案就更顯得拙劣遲緩，雖然 Vite@4 + vue3 跟 Webpack4 + vue2.6 不在同一個水平上，根本不能這樣拿來比雞腿，但還是希望盡綿薄之力，至少先踏出第一步吧，終點訂在那 es build 的遠方，從腳下的 webpack5 + vue2.7 踏出第一步。


## 始於足下

首先來到 [vue-cli migration note](https://next.cli.vuejs.org/migrations/migrate-from-v4.html)，把整個 vue-cli 生態都一併升級，基本上這些異動應該不會造成太大的問題，搭配 [naruto](https://blog.vuejs.org/posts/vue-2-7-naruto) 升級指引，把用不到或該升級的 dependencies 都一次到位


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










![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6f2e6716-3855-412c-838c-acc630d7c585/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/50e9cace-7334-4230-8a1c-bda1311ce74a/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0d7deb37-0ae1-4ea4-96a3-d99370bc88d4/Untitled.png)

refs

[https://webpack.js.org/configuration/optimization/#optimizationminimizer](https://webpack.js.org/configuration/optimization/#optimizationminimizer)

[https://segmentfault.com/a/1190000040257542](https://segmentfault.com/a/1190000040257542)

[https://blog.csdn.net/qiwoo_weekly/article/details/104935415](https://blog.csdn.net/qiwoo_weekly/article/details/104935415)

[https://www.cnblogs.com/zjxlicheng/p/15000917.html](https://www.cnblogs.com/zjxlicheng/p/15000917.html)

[https://jelly.jd.com/article/61179aa26bea510187770aa3](https://jelly.jd.com/article/61179aa26bea510187770aa3)

[https://zhuanlan.zhihu.com/p/395587041](https://zhuanlan.zhihu.com/p/395587041)

[https://blog.csdn.net/Run_youngman/article/details/123092799](https://blog.csdn.net/Run_youngman/article/details/123092799)

[https://juejin.cn/post/6844904138954801166](https://juejin.cn/post/6844904138954801166)

[https://www.cnblogs.com/plBlog/p/15477349.html](https://www.cnblogs.com/plBlog/p/15477349.html)

[https://blog.csdn.net/weixin_43443341/article/details/108865372](https://blog.csdn.net/weixin_43443341/article/details/108865372)

[https://thomasnguyen.site/useful-webpack-optimization-configuration](https://thomasnguyen.site/useful-webpack-optimization-configuration)

[https://blog.logrocket.com/guide-performance-optimization-webpack/](https://blog.logrocket.com/guide-performance-optimization-webpack/)

[https://cli.vuejs.org/guide/webpack.html](https://cli.vuejs.org/guide/webpack.html)

[https://github.com/webpack/webpack/issues/12102](https://github.com/webpack/webpack/issues/12102)

[Webpack 5 is consistently ~30% slower for all our packages compared to Webpack 4 · webpack/webpack · Discussion #12475](https://github.com/webpack/webpack/discussions/12475)
