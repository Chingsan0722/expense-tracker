# 老爸的記帳本

一個使用 Node.js + Express + MongoDB 打造的 記帳本，用來紀錄日常開銷


## 專案畫面

![image](https://github.com/Chingsan0722/expense-tracker/blob/main/snapshot/home-page.png)

## Features - 產品功能

1. 使用者可以創建自己的帳號，也可選擇FB登入
2. 使用者可以瀏覽所有自己的帳目
3. 使用者可以新增帳目(包含收入、支出)
4. 使用者可以編輯任一帳目
5. 使用者可以依照帳目名稱進行搜尋
6. 使用者可以選擇單一類別檢視支出、收入等總金額

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/Chingsan0722/expense-tracker.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件，在 Terminal 輸入

```
 npm install
```
4. 載入種子資料

```
npm run seed
```

5. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

6. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
App i 1s running on http://localhost:3000
```

7. 使用建立好的種子使用者登入

帳號：user1@example.com
密碼：1234

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用我的餐廳清單囉！


## Contributor - 專案開發人員

> [Ching Lin](https://github.com/Chingsan0722)
