---
title: 聲明式 (declaration) vs 陳述式 (expression)
description: function difference between declaration and expression
date: 2019-01-28T16:00:00.000+08:00
schedule:
hidden: false
tags:
  - js
---


## 序

使用過 Javascript 都知道要定義 function 大致有兩種方法：
1. 聲明式 (declaration)
```js
function someFunction() {
  ...
}
```

2. 表達式( expression )
```js
const someFunction = function() {
  ...
}
```

兩者在使用上幾乎沒有不同，一樣都可以透過 function name 來執行，例如：
```js
function declareAdd(a, b) {
  return a + b
}
declareAdd(1, 2)    // 3

const expressionAdd = function(a, b) {
  return a + b
}
expressionAdd(1, 2) // 3
```

但實際上在執行時，會因為定義方式的不同而有使用上的限制。

## Hoisting

還記得 var 變數時會被 JS hoisting 優先處理，在所有函式執行前先在記憶體卡位，只是在聲明變數前呼叫的話會得到 undefined
```js
console.log(demo) // undefined
var demo = 10
```

declaration function 在宣告時也會被 hoisting，所以以下寫法是可以被執行的
```js
declareAdd(1, 2)    // 3
function declareAdd(a, b) {
  return a + b
}
```

反之 expression function 則會被視為眾多程式碼中的一員，也就是當 JS 走到他那行時才會被執行，也就無法像 declaration function 一樣在宣告前執行函式
```js
expressionAdd(1, 2) // expressionAdd is not defined
const expressionAdd = function(a, b) {
  return a + b
}
```

## Lifecycle
第二點差異在於，declaration function 被宣告後就會在記憶體中揮之不去，而 expression function 則是會隨著變數的週期迭代或等待 GC 回收

---

在 ES6 後，expression function 可以用 arrow function 取代之，但要特別注意若內層是否有用到 this 的需求
```js
const expressionAdd = (a, b) => {
  return a + b
}
```

> reference:
>
> [whats-the-difference-between-function-foo-and-foo-function](https://stackoverflow.com/questions/5403121/whats-the-difference-between-function-foo-and-foo-function)
> [[JavaScript]function expression(函式陈述式) VS declaration (函式运算式)](https://dotblogs.com.tw/blackie1019/2014/10/25/147085)
> [When 'not' to use arrow functions](https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/)
>
> This article has been migrated from medium: https://medium.com/@unick.zhow/%E8%81%B2%E6%98%8E%E5%BC%8F-declaration-vs-%E9%99%B3%E8%BF%B0%E5%BC%8F-expression-b9e62e385484
