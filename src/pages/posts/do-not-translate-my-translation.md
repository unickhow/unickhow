---
title: 怎麼讓用戶不再師爺我的網站
description: do not translate my translation
date: 2021-01-15T16:00:00.000+08:00
schedule:
hidden: false
tags:
  - i18n
  - vue
  - jquery
---

# {{ title }}

{{ description }}

[[toc]]

---

## 序

在維護專案時，不免會遇到舊專案要慢慢 migrate 架構的問題，我們嘗試在一個 jQuery 的 SPA 環境下，逐頁帶入 Vue 的形狀，於是每個頁面都是獨立的 instance，而又因為原本的專案是透過 [mustache](https://github.com/janl/mustache.js/) 模板來編譯，跟 Vue 一樣都是以 `{{` `}}` 做辨識，所以在引入 Vue template 時要另外再聲明模板標記，以防打架
```jsx
delimiters: ['{%', '%}']
```

然而部分使用者會在瀏覽網頁時，使用 Google translate 來將頁面翻譯成特定語言

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F204db8fd-cb5f-4315-ab5f-145ea9691f6c%2FUntitled.png?id=c95a56ca-d5b9-4c5f-a5db-f6852931ed6c&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=550&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

於是

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6163057e-1910-488e-ad8b-7276cebe2f4a%2FUntitled.png?id=c9966dc2-eade-4af2-bc9b-fb93853dd4ed&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=1690&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

![](https://img.jinghooo.com/upload/20200421/553295fb06a24f80b20dc4d4dce4c80d.jpg)


## 查找原因

上面可以看到部分 template 中的 key 都被拆解直譯，拆解的邏輯乍看之下沒有規則可言，前端也在各種嘗試下尋找是不是哪段編譯失敗等等的狀況，那麼究竟是什麼原因造成翻譯會變得如此脆弱不堪？接下來讓我們把時間拉回到 2020 年的 12 月 7 日。

2020 年的 12 月 7 日，這天是個星期一，使用者不知怎麼著進到頁面時，Chrome 建議他把這個頁面翻譯成中文，使用者也很沒有志氣的點了「一律翻譯此頁面」的選項，到此這個含有 Vue template 的產品瞬間分崩離析，幾乎所有透過 Vue template 的翻譯位置都會受影響。這是透過受害者提供錄影才一切真相大白。


## 解決問題

雖然濫用翻譯是一個非常不上進的行為，但我們也不忍頁面因此而壞去，於是我第一時間想到的是 *(噹～)*

> 💡 如何阻止瀏覽器自動翻譯 *~~(如何矯正XX使用者)~~*

方法有數種，因應支援版本的不同，分別有：

1. 最簡單的只要在 html 上聲明
```html
<html translate="no"> ... </html>
```
2. 只想避開特定位置被翻譯的話，在該位置的元素加上
```html
<div class="notranslate"> ... </div>
```
3. 不講道理地圖砲
```html
<meta name="google" content="notranslate">`
```

為除後患，下次說不定來個 IE 用戶又要師爺 🙄，不如

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d09fcd0-869f-4a37-af62-997651a4b2a6%2FUntitled.png?id=c6714083-e681-48cf-947d-eab425e50fe6&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=700&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

```html
<html translate="no" class="notranslate">
	<head>
		<meta name="google" content="notranslate">
		...
	</head>
	<body>
		...
	</body>
</html>
```

###### *~~明明就給你語言切換了你還自動翻譯，你恥不恥~~*

> reference:<br>
>
> [https://stackoverflow.com/questions/12238396/how-to-disable-google-translate-from-html-in-chrome](https://stackoverflow.com/questions/12238396/how-to-disable-google-translate-from-html-in-chrome)