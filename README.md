# Google登入與本地登入系統

本專案展示了如何實現 Google 登入與本地登入系統。練習中使用了以下技術：

- **EJS**: 用於前端模板渲染。
- **MongoDB**: 用於儲存用戶資料，並透過 Docker 進行容器化。
- **Passport.js**: 實現身份驗證功能。
- **Authentication**: 本地登入系統。
- **OAuth (Google Login Setup)**: 使用 Google OAuth 實現 Google 登入功能。

## 專案架構

- `mongodb/Dockerfile`: 用來建立 MongoDB Docker 容器的配置檔案。
- `views/`: 儲存 EJS 模板檔案。
- `models/`: 儲存 MongoDB 模型。
- `routes/`: 儲存不同路由的處理程式。
- `config/`: 儲存 Passport.js 的配置與其他設定。

## 安裝步驟

### 1. 克隆此專案

```bash
git clone https://github.com/luap580101/googleLogin.git
```


這個 `README.md` 包含了專案介紹、安裝步驟、設定說明及使用方法等資訊，可以讓其他開發者快速了解你的專案。
