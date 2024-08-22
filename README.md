# Music Player

這是一個簡單的音樂播放器網頁應用，允許用戶播放多個音頻文件，並通過點擊專輯封面導航到 YouTube。

## 功能

- 播放音頻文件。
- 點擊專輯封面鏈接到 YouTube 觀看視頻。
- 控制音樂播放（播放、暫停、快退、快進）。

## 專案結構

- `index.html`: 主要的 HTML 文件，包含音樂播放器的結構。
- `style.css`: 用於樣式化音樂播放器的 CSS 文件。
- `script.js`: 處理播放器控制和功能的 JavaScript 文件。
- `image/`: 存放專輯封面的圖片文件夾。
- `mp3/`: 存放音頻文件的 MP3 文件夾。

## 使用方法

1. **下載專案**

   克隆專案或將檔案上傳到您的伺服器。

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **上傳到伺服器**

   將所有檔案（包括 `index.html`、`style.css`、`script.js`、`image/` 和 `mp3/` 文件夾）上傳到伺服器。

3. **訪問專案**

   在您的瀏覽器中打開 `index.html` 文件，或訪問上傳到伺服器的 URL 以查看和使用音樂播放器。

## HTML 結構

`index.html` 文件的主要結構如下：

- `<head>`: 包含元數據、CSS 和 JavaScript 文件的鏈接，以及 Ionic 圖標的腳本。
- `<body>`: 包含音樂播放器的主要內容：
  - `<div id="player_container">`: 包含多個播放器區塊。
  - 每個播放器區塊 `<div id="player_box">` 包含：
    - `<a>` 標籤，鏈接到 YouTube 視頻。
    - `<ion-icon>` 元素，顯示 YouTube 標誌。
    - `<img>` 標籤，顯示專輯封面。
    - `<h3>` 標籤，顯示曲目標題。
    - `<audio>` 元素，用於播放控制。
    - `<input type="range">`，顯示播放進度條。
    - `<div id="player_control">`，顯示控制按鈕（播放、暫停、快退、快進）。

## 依賴項

- **Ionic Icons**: 用於顯示控制按鈕的圖標。
  - 通過 CDN 在 `index.html` 的 `<head>` 部分加載。

## 開發

- **CSS**: 在 `style.css` 中自定義樣式。
- **JavaScript**: 在 `script.js` 中添加音頻控制和進度追蹤功能。

## 授權

隨意

## 瀏覽

伺服器由aws提供 : http://13.114.103.31/music/
