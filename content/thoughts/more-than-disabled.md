---
title: 對於 disabled，你可以做得更多
description: Do more than just disabled
date: 2023-06-16T23:41:00.000+08:00
schedule:
hidden: false
tags:
  - html
  - js
---


## 序

成為前端工程師以後，每逢任何限制行為的網頁，我都會下意識地開啟 inspector，試圖越過這些開發者設下的枷鎖，`disabled`，尤其是在公家機關的網站屢試不爽，以 button 為例

```js
$0.removeAttribute('disabled')
$0.click()
```

同樣的操作也適用於 select, input etc.，至此之後看到任何帶有 disabled opacity 樣式的元件對我而言都形同虛設，所以我深刻的體悟在設計 function 時該做到怎樣的防護。


## 實作

一直以來，我習慣會在有行為限制的 trigger 之後多設一層檢查，尤其 button 最為重要，因為這是面向使用者最直覺的操作，以 vue 為例，常見的寫法如下

```vue
<template>
  <button :disabled=”!isValid” @click=”handleSubmit”>Submit</button>
</template>

<script setup>
const isValid = ref(false)

function handleSubmit () {
// do something like ajax request …
}
</script>
```

這種寫法只要稍微懂前端的人，都可以照開頭的方式越過限制，直接觸發 handleSubmit，所以最好是在執行 function 前把 disabled 的條件再驗證一次

```vue
<template>
  <button :disabled=”!isValid” @click=”handleSubmit”>Submit</button>
  <!-- or -->
  <button :disabled=”!isValid” @click=”isValid && handleSubmit”>Submit</button> // [!code focus]
</template>

<script setup>
const isValid = ref(false)

function handleSubmit () {
  if (!isValid.value) return // [!code focus]
  // do something like ajax request …
}
</script>
```

這樣的機制下，就算 html 上沒有 disabled，也能做到原本該有的行為限制，因為回過頭來探討，身為開發者要禁止的是這個 button 按下去之後的行為，**能不能按**這件事只是一個視覺上的提醒，不應該把提醒當成一道有效的防線。

相同的情境也常發生在 input 上，例如：修改使用者基本資料，部分欄位會禁止再次更新，而使用 input[disabled] 的方式來呈現

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcfb45b01-f97d-438b-9fbc-5cbb220174bd%2FCleanShot_2023-06-15_at_15.14.09.png?id=67415bf2-f1d2-4f56-9b10-c0adde3e4931&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)


先不論後端是否有防範意識，這樣讓使用者可以越獄修改的風險，後果不堪設想 🤪

所以面對這類問題，在串接 api 時就要意識到哪些欄位是需要個別處理，方法百百種，例如可以在遇到不可修改的欄位時，以純文字替換

```html
<p>{{ userEmail }}</p>
```

部分狀況也許會遇到像上圖，Create 與 Update 是復用同一個 component，我的做法就會偏向如下

```vue
<template>
  <input :value=”userEmail” @input=”handleEmailUpdate”>
  <!-- or -->
  <input :value=”userEmail” @input=”isAllowUpdate && handleEmailUpdate”> // [!code focus]
</template>

<script setup>
const userEmail = ref(’’)
const isAllowUpdate = ref(false)

function getUserInfo () {
  return promise.then(response => {
    userEmail.value = response.email
  })
}

function handleEmailUpdate (evt) {
  if (!isAllowUpdate.value) return // [!code focus]
  userEmail.value = evt.target.value
}
</script>
```

如此一來，前端也算是把防範做到仁至義盡了，接下來就請後端自重吧


## 反思

這篇紀錄的動機主要是因為工作上有同事在 review PR 時問了一句：

> 👨‍💻 不是已經有 disabled 了嗎，為什麼還要這段 if?

荒唐來的措手不及，我一直以為你各位只是懶得做，畢竟後端有擋的話一切都相安無事，但此話一出我不禁懷疑是我雞婆了嗎 🫥 如果每個用戶都跟我一樣手賤習慣亂戳，又如果剛好碰上對於前端死心踏地信任的後端，那就真的不是不爆，時候味道 👃

話說回來，前端這個面向終究是防不勝防，最終還是取決於後端這道大鎖，我們能做到的就只是把這個門檻能拉多高拉多高，時時告誡自己：前端僅防君子，特別是在處理機敏資訊的系統（如金流）更是要盾上加盾，如果要挖 sources 破防的朋友就請便吧 … 球給後端 🤞

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F681ee7be-79ed-47cc-88a1-c1e1d1ae8a14%2FCleanShot_2023-06-15_at_15.48.48.png?id=ed62151c-53bf-4159-9f6d-dafd5a625212&table=block&spaceId=97e46578-ab72-4131-b5e5-cf4f9a6129f1&width=2000&userId=dc5218bd-bd61-4da3-8a7d-f9791b956c76&cache=v2)

