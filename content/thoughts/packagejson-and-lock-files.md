---
title: 基本 package.json 及那些 lock files
description: 淺談即止 🤏
date: 2024-10-26T21:00:00.000+08:00
schedule:
hidden: false
tags:
  - nodejs
  - npm
---


## 序

在前端開發中，`package.json` 可以說是每個專案的心臟，它為我們管理專案的依賴、腳本以及環境設定等等。無論你是剛開始學習前端，還是已經有幾年經驗，理解 `package.json` 的關鍵部分都對專案的開發與維護有莫大的幫助。這篇文章會稍微地帶上一些在前端開發上，應該知道的幾個重點屬性。


## package.json

### dependencies
`dependencies` 是指專案在「執行時 (runtime)」需要依賴的套件，也就是當你的應用程式在使用者瀏覽器或伺服器上運行時，所必須的套件。例如，若你在開發一個 React 應用，`react` 和 `react-dom` 這些套件就應該被放在 `dependencies` 裡。

```json
{
  "dependencies": {
    "vue": "^3.2.47",
    "vue-router": "^4.2.0",
    "pinia": "^2.0.34"
  }
}
```

### devDependencies
`devDependencies` 則是指開發過程中需要的套件，這些套件在專案「運行」時其實並不需要存在，只是用來輔助開發。例如：測試工具、編譯工具或 lint 工具（像是 `eslint` 或 `vite`）就會放在 `devDependencies` 裡。

```json
{
  "devDependencies": {
    "eslint": "^8.35.0",
    "vite": "^5.2.0"
  }
}

```

合理地區分 `dependencies` 和 `devDependencies` 能幫助我們有效管理專案的大小，尤其是在部署到生產環境時。你不會想要帶著大量不必要的開發工具進入生產環境，這只會拖慢載入速度，也增加了潛在的風險。

### engines
`engines` 是一個經常被忽略但十分實用的欄位，它讓你可以指定專案運行所需的 Node.js 或 npm/yarn 版本。這對於團隊協作或長期維護專案時尤其重要，能避免因為開發環境不同而產生的問題。

例如，如果你的專案需要特定版本的 Node.js 才能正常運行，你可以在 `package.json` 中這樣指定：

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=6.0.0"
  }
}
```

這樣，當有人在不同版本的 Node.js 或 npm 中嘗試安裝套件時，會收到警告，甚至可以設定讓安裝過程自動失敗，確保環境的一致性。

但很可惜，我最近常用的 bun 目前還沒有被支援在 engines 欄位中指定。不過，隨著 Bun 的快速發展和日益增長的採用率，我們可以期待在未來的某個時候，它也會被加入到這個列表中。在此之前，如果你的專案需要特定版本的 Bun，你可能需要在專案的文檔或 README 中明確說明這一需求。

### scripts
`scripts` 欄位讓你可以定義一系列方便的命令，像是啟動開發伺服器、執行測試、編譯程式等。例如：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
  }
}
```

如果你使用過 vite 來建立專案，上面這些命令一定不陌生。這些命令分別用於啟動開發伺服器、構建生產版本和預覽構建結果。使用這些預定義的腳本不僅可以簡化開發流程，還能確保團隊成員使用一致的命令來執行常見任務。此外，你還可以根據專案需求自定義更多的腳本，例如運行測試、代碼格式化或部署等操作。

我常用的像是可以定義在部署不同環境時該帶入什麼環境變數

```json
{
  "scripts": {
    "build": "vite build",
    "build:dev": "vite build --mode staging" // 打包時會載入 .env.stage
  }
}
```

或是專案有相關的 subtree 要同步的話，例如 i18n 字典

```json
{
  "scripts": {
    "i18n:pull": "git subtree pull -P src/locales --squash git@github.com:unickhow/my_i18n_dictionary.git main",
    "i18n:push": "git subtree push -P src/locales git@github.com:unickhow/my_i18n_dictionary.git main"
  }
}
```

### type
上述提到的屬性都是屬於 npm 提供的標準屬性，但 `type` 這個欄位其實是屬於 Node.js 的。`type: "module"` 是 `package.json` 中的一個關鍵欄位，它告訴 Node.js 這個專案使用的是 **ES Module** 規範，而不是傳統的 CommonJS 模塊系統。這是現代 JavaScript 開發中非常重要的一個設定，因為它決定了你在專案中如何引入和導出模塊。

- **ES Module**：使用 `import` 和 `export` 關鍵字來進行模塊的導入和導出，是現代 JavaScript 原生支持的模塊系統，也是瀏覽器標準。
- **CommonJS**：傳統的模塊系統，使用 `require()` 和 `module.exports` 來導入和導出模塊，這是 Node.js 長期以來使用的方式。

當你設置 `type: "module"` 時：

1. 使用 `import/export`：你可以在 Node.js 中直接使用 ES Module 的語法：
    ```jsx
    import fs from 'fs'
    export function myFunction() {
      console.log('Hello, ES Module!')
    }
    ```

2. `.js` 文件默認為 ESM：所有的 `.js` 文件會被當作 ES Module 處理。如果你要使用 CommonJS 文件，它們需要命名為 `.cjs`。

3. `.mjs` 文件：即使你沒有設置 `type: "module"`，只要文件的擴展名是 `.mjs`，Node.js 也會自動將它視為 ES Module。


例如，當 `package.json` 中設定了 `type: "module"`，你可以在 `.js` 中這樣使用
```jsx [utils.js]
export function add(a, b) {
  return a + b
}
```
```jsx [index.js]
import { add } from './utils.js'
console.log(add(2, 3))  // 輸出 5
```

這與 CommonJS 的 `require` 模式形成了鮮明對比：

```jsx [utils.js]
module.exports = {
  add(a, b) {
    return a + b
  }
}
```
```jsx [index.js]
const { add } = require('./utils')
console.log(add(2, 3))  // 輸出 5
```

如果你希望專案同時支持 ES Module 和 CommonJS，可以通過使用 `.mjs`、`.cjs` 副檔名來區分。

現代 JavaScript 正在朝向標準化 ES Module 的方向發展，特別是像 Vite、Rollup、Webpack 等打包工具以及瀏覽器都天然支持 ES Module。使用 `type: "module"` 是適應這一趨勢的步驟，讓你的專案更符合現代標準，同時也能享受 Tree Shaking 等優化功能。

當然，package.json 還有很多屬性，google 一下也能找到不少解說詳盡的文章，這邊只粗略地談到幾個重點。不過，這些屬性已經足以讓我們理解 package.json 在專案管理中的核心作用。正確地配置這些屬性不僅可以提高開發效率，還能確保專案的穩定性和可維護性。更多詳細內容請移駕 [npm 官方文件](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) 或 [nodejs 官方文件](https://nodejs.org/docs/v20.18.0/api/packages.html)

接下來，讓我們來看看與套件管理相關的另一個重要話題：lock file。

## 什麼是 lock file?

在使用 npm、yarn 或 pnpm 等不同的套件管理工具 (package manager，下稱 pm) 時，每個工具會生成自己的 lock file，用來鎖定確切的套件版本。這些文件的名稱分別是：

- npm: `package-lock.json`
- yarn: `yarn.lock`
- pnpm: `pnpm-lock.yaml`
- bun: `bun.lockb`

lock file 的目的是確保在不同的環境中，每次安裝相同的套件版本，避免因為版本差異而導致問題。

### 版本？版號？

首先，先來認識所謂的版號數字代表什麼意思：

![https://miro.medium.com/v2/resize:fit:1400/0*gh7hUWnQ85vq7Jzn.jpg](https://miro.medium.com/v2/resize:fit:1400/0*gh7hUWnQ85vq7Jzn.jpg)

通常除了固定版號外，還會有 `^` 和 `~` 這兩種符號，分別代表不同的版本更新策略：

- `^` 允許更新 minor 和 patch，但不更新 major。例如：`^1.2.3` 在執行安裝時，會自動安裝到最新版本的 `1.x.x`，但不會到 `2.0.0`

- `~` 允許更新 patch，但不更新 minor 和 major。例如：`~3.4.5` 在執行安裝時，會自動安裝到最新版本的 `3.4.x`，但不會到 `3.5.0`

當你在 `package.json` 中使用如 `^` 或 `~` 這樣的範圍符號來指定依賴版本時，pm 在第一次安裝時會根據範圍選擇當前可用的最新版本。這樣做的目的是允許在一定範圍內安裝更新的版本（例如小版本升級或補丁版本）。它具體扮演的角色包括：

1. **鎖定確切的版本**：lock file 會記錄每個依賴的確切版本，無論 `package.json` 中指定的是範圍版本還是精確版本。例如，假設你在 `package.json` 中使用 `^1.2.3`，但 lock file 會具體記錄「安裝時」選擇的確切版本，譬如 `1.2.5`。下次執行 `[pm] install` 時，無論其他開發者運行的環境如何，pm 會依據對應 lock file 中的版本進行安裝，而不是根據 `package.json` 的範圍規則重新選擇最新版本。
2. **提高安裝一致性**：由於 lock file 記錄了精確的依賴樹（包括所有直接和間接依賴的具體版本），它能確保開發團隊中的每一個人，以及在 CI/CD 中自動構建的應用程式，所使用的依賴版本都完全一致，不會受到外部環境變化的影響。
3. **提高安裝速度**：lock file 可以加速安裝過程，因為它跳過了版本解析的過程（不需要重新解析 `^` 或 `~` 等範圍規則），直接安裝記錄在 lock file 中的版本，這對於有大量依賴的專案來說尤為重要。

### 一個專案可以有幾個 lock file？

在專案中同時存在多個 lock file（例如同時有 `package-lock.json` 和 `yarn.lock`）會讓 pm 產生混淆，因為它們會嘗試使用自己對應的 lock file 來安裝套件，這可能導致依賴版本不一致的情況。例如我在開發時使用 pnpm 安裝的是 vue@3.5 的版本，專案中也引入了 v3.5 新增的 api，而其他協作者則是使用 yarn，導致他們在本地開發時載入的是 yarn.lock 中的 vue@3.4 版本。這會造成他們的專案出現無法預期的錯誤或行為，更別說如果 CI/CD 上又是用另一套 pm 的話，後果可能會更加嚴重。這種情況下，不同環境間的不一致可能會導致部署失敗、功能異常，甚至是安全漏洞。因此，統一使用一種包管理工具和對應的 lock file 是至關重要的。這不僅能確保開發環境的一致性，還能大大減少因版本差異而引發的問題，提高整個開發和部署流程的可靠性。

## 結語

之前在專案開發的過程中，發現有同事竟然不知道 `package-lock.json` 跟 `pnpm-lock.yaml` 是什麼 🙂‍↕️ 兩者同時出現在他的專案中也渾然不覺，以及無法理解為什麼有些套件要加上 `--save-dev` 😀，這讓我意識到，即使是入行這麼久的工程師，對於基本的套件管理概念也可能存在認知差距，所以決定臨時插播一則豆知識來記錄一下，共勉之 🙏


> references
>
> https://nodejs.org/docs/v20.18.0/api/packages.html *(node v20.18.0)*
>
> https://docs.npmjs.com/cli/v10/configuring-npm/package-json *(npm v10.9.0)*