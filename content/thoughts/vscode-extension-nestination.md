---
title: VS Code extension - Nestination
description: vsce 開發初體驗
date: 2024-02-23T12:50:00.000+08:00
schedule:
hidden: false
tags:
  - vscode extension
  - json
---

## 序

你是否有做過 i18n 的經驗？
你是否常常在物件之海迷失方向？
在專案中，團隊常用`json` 來管理字典，舉例來說

```vue
<template>
  <h1>{{ $t('home.title') }}</h1>
</template>
```

物件可以很方便的歸類出字典的群組，這樣一來在取用時就可以很直觀的辨識這個詞的來源及用途，但是當專案規模日漸茁壯後，物件的層數通常也會跟著一發不可收拾 (當然如果你不使用巢狀來管理也就不會遇到了)，例如

```vue
<template>
  <ul>
    <li>{{ $t('application.settings.userInfo.title') }}</li>
    <li>{{ $t('application.settings.userInfo.description') }}</li>
    <li>{{ $t('application.settings.userInfo.label') }}</li>
    <li>{{ $t('application.settings.userInfo.placeholder') }}</li>
    <li>{{ $t('application.settings.userInfo.message') }}</li>
  </ul>
</template>
```

對應到字典中，就會看到
```json
{
  // ...
  "application": {
    "settings": {
      "userInfo": {
        "title": "Title",
        "description": "Description",
        "label": "Label",
        "placeholder": "Placeholder",
        "message": "Message"
      }
    }
  },
  // ...
}
```

試想當字典長到數百上千行時，這個回找的動作會令人眼花撩亂 😵‍💫，在 html 上的 key 是 dot notation，但在 json 中卻是巢狀的方式呈現，所以很難快速的找到該字詞所在的位置，更別說可能會有相同的 key 散落在不同的 parent object 中

```json {3,14}
{
  // ...
  "application": {
    "settings": {
      "userInfo": {
        "title": "Title",
        "description": "Description",
        "label": "Label",
        "placeholder": "Placeholder",
        "message": "Message"
      }
    }
  },
  "product": {
    "settings": {
      "userInfo": {
        "title": "Title",
        "description": "Description",
        "label": "Label",
        "placeholder": "Placeholder",
        "message": "Message"
      }
    }
  },
  // ...
}
```

歷經多次曠日費時的查找後，就希望有個可以一鍵定位的「尋找」功能來拯救蒼生。

## 實作

<div class="text-center font-bold text-xl">Introduce — Nestination, Nest + Destination</div>

身在 2024 這個 AI 時代，第一步當然就是有請 ChatGPT 提供最小功能演示，但礙於免費仔的 v3.5，他的建議實在是吞不下去，調教了七八個版本才有一個能執行的範本可以下手，之後就是跟他不斷的來回詰問，邊翻找 [VS Code API](https://code.visualstudio.com/api/references/vscode-api) 和[範例](https://github.com/microsoft/vscode-extension-samples/blob/main/document-editing-sample/src/extension.ts#L8-L20)來逐步優化了，我期望在這個 extension 想達成的目的有：

- 尋找巢狀字串: `foo.bar.baz` ⇒ 找到對應的行數
- 複製巢狀字串: `baz` ⇒ 複製向上全部層級 `foo.bar.baz`
- 支援 json 以外的文件格式 (如 yaml)

其實在實作的過程中就有看到幾個已經實現類似概念的 extension 了，大致的概念都是先取得整個文件的內容後，逐行進行正規表達式的比對，這樣的做法簡單粗暴，舉例來說，上方的字典如果輸入 `product.settings.userInfo`，會先拆解成三個層級，並逐一掃描文件中對應字詞的位置

- 第一次迴圈找到 `product`
- 第二次迴圈又從頭開始，找到了 `settings` 但會是在 `application` 中的 `product`
- …

從這種循環可以推測，結果都只會配對到最後一個層級的字詞在文件中第一次出現的位置。
中間有閃過一個念頭是把文件的物件都轉換出來後，再用 js 的方法去找出從屬的 key

- 第一個迴圈找到 `product`
- 把 `product` 透過 `JSON.stringify` 轉換後找出內層是否有 `settings` 的 key 存在
- 找到 `settings` 後 `JSON.stringify`，再尋找下一個 key
- …

完美解答！

… 這麼棒的話就好了 🙄，因為在做完 `JSON.stringify` 後，就會失去 vscode API 提供的行數與字數的屬性，也就沒辦法進一步推敲字詞在文件中的位置 🤦‍♂️，所以折返回文本的正規比對，但這次稍做了一些改變

- 第一次迴圈找到 `product`，紀錄該行數及位置
- 第二次迴圈從前一層紀錄的位置開始往下找
- …

但即便如此，這仍然是以文本去配對字詞的做法，所以執行上依然會存在一些預期之外的結果，上例中直接尋找 `settings` 也會返回從上至下第一個找到的 `settings` 位置 (無論其位於何層)。

不過從結果來看，現況已經可以處理我需求的初衷了，就趕緊發佈第一個 VS Code extension 吧！

~~*[官方文件](https://code.visualstudio.com/api/get-started/your-first-extension)詳細到無須多言*~~

然後速速的隨手上一張 icon 先結束這回合，之後再慢慢補上其他的功能，現在趕快來一起 `Cmd + P` Find key nestination 吧！

https://marketplace.visualstudio.com/items?itemName=unickhow.nestination

> 希望不會收到太多一星好評 🙂
