---
title: 換行不是只有 <br>
description: meet <wbr>
date: 2021-11-15T10:49:00.000+08:00
schedule:
hidden: false
tags:
  - html

---

# {{ title }}


[[toc]]


在撰寫 HTML 常常遇到換行字元斷得不乾淨的狀況，相較於英文內容，中文倒是比較少見，舉🌰來說，著名的火山矽肺病

```html
<p>This is Pneumonoultramicroscopicsilicovolcanoconiosis</p>
```

如果遇到 RWD 的問題，就預設而言都是採用「單字」破壞，如果單字過長就會變成

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fec1b199f-9477-487d-8114-88c98b6c9e9f%2FUntitled.png?id=bff48205-9b2d-41d1-a52f-2f916d7dbf71&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

這時候就要對 CSS 特別處理，像是 `word-break: break-word` 或 `word-break: break-all` 來指定文字破壞規則，當然還可以加上 `hyphens: auto` 來讓被破壞的單字以 '-' 做連結，但以上的做法都是讓 CSS 自動換行，如果有特定的句子需要維持在同一行的需求呢？

這時候我們可以透過 [**Soft break** / **Soft hyphen**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr) 來讓開發者自訂換行位置。既然要自訂換行，就意味著要關閉預設的換行方式，首先讓目標元素

```css
element {
	word-break: keep-all;
}
```

如此一來當字串大於寬度時，會需要由 overflow 來決定超出部位的動作，而在這字串當中如果有出現 Soft break `<wbr>` 或 Soft hyphen `&shy;` 就會換行！ 484 很有掌握一切的感覺

<iframe height="300" style="width: 100%;" scrolling="no" title="Soft break/hyphen" src="https://codepen.io/uNickHow/embed/MWeeoMX?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/uNickHow/pen/MWeeoMX">
  Soft break/hyphen</a> by uNickHow (<a href="https://codepen.io/uNickHow">@uNickHow</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

先前在製作公司官網時就遇到一個需求像是，當畫面夠寬時文字應該要完整呈現

> OwlNest 奧丁丁區塊鏈旅宿管理系統，世界第一以太坊應用

而在小螢幕時不想讓文字斷在不順暢的地方，所以當時做了幾個 element 去做 RWD 的顯示切換，現在就可以用 `<wbr>` 來完成

> OwlNest *`<wbr>`*
奧丁丁區塊鏈旅宿管理系統，*`<wbr>`*
世界第一以太坊應用
>