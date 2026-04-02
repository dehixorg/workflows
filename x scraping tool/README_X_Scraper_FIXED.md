# Ultimate X (Twitter) Scraping Machine – Detailed README

## 📌 Overview
This workflow (fileciteturn6file0) is a **fully automated Twitter/X intelligence system** that:
- Fetches tweets using API
- Extracts & structures data
- Filters useful tweets
- Stores data in Google Sheets
- Generates AI insights
- Sends formatted report to Telegram

---

## ⚙️ Workflow Architecture

### 1. Schedule Trigger
- Runs automatically (interval-based)
- You can change timing (e.g., every 1 hour)

---

### 2. Get Tweets (HTTP Request)
- API: twitterapi.io
- Endpoint: `/advanced_search`
- Query:
  - keyword = "hackathon"
  - type = latest
- Pagination enabled (fetch multiple pages)

👉 **Credential Needed**
- Header Auth → API Key from twitterapi.io

---

### 3. Extract Tweet Content (Code Node)
- Converts raw API response → structured format

#### Output fields:
- tweetId
- url
- content
- likeCount
- retweetCount
- replyCount
- quoteCount
- viewCount
- createdAt (formatted)

---

### 4. Filter Low-Performing Tweets
Condition:
- likeCount > 0

👉 Removes low-quality tweets

---

### 5. Save Information (Google Sheets)
Stores all tweets

#### Required Sheet Columns:
- ID
- URL
- Content
- Likes
- Retweets
- Replies
- Quotes
- Views
- Date

👉 Credential:
- Google Sheets OAuth2

---

### 6. Format for AI
- Combines all tweet content into one block
- Separator: `---`

---

### 7. AI Summary Generator
Uses OpenAI model to:
- Analyze tweets
- Generate Telegram-ready report

#### Output includes:
- Topic overview
- Sentiment
- Top tweets
- Insights

---

### 8. Telegram Node
- Sends final AI report

👉 Credential:
- Telegram Bot Token
- Chat ID

---

## 🔐 Credentials Setup (Detailed)

### 1. Twitter API (twitterapi.io)
- Go: https://twitterapi.io
- Signup → Dashboard
- Copy API Key
- Use in Header Auth

---

### 2. Google Sheets
- Go: https://console.cloud.google.com
- Enable: Google Sheets API
- Create OAuth Client
- Add redirect:
  http://localhost:5678/rest/oauth2-credential/callback
- Paste into n8n

---

### 3. OpenAI API
- Go: https://platform.openai.com/api-keys
- Create API Key
- Add in n8n

---

### 4. Telegram Bot
- Open Telegram → @BotFather
- Create bot → copy token
- Get chat ID via @userinfobot

---

## 🔄 Data Flow
Schedule → API → Extract → Filter → Store → AI → Telegram

---

## 🚀 Usage
1. Activate workflow
2. Wait for schedule trigger
3. Telegram receives report automatically

---

## ⚠️ Important Notes
- API limits → controlled via pagination
- Use Wait node if scaling
- Ensure sheet columns match exactly
- Escape characters handled by AI prompt

---

## 💡 Improvements (Optional)
- Add engagement threshold (likes > 10)
- Add multi-keyword search
- Add database instead of Sheets
- Add error handling node

---

## 🧠 Summary
This is a **production-ready social media intelligence pipeline** combining:
- Data scraping
- Processing
- AI analysis
- Automated delivery
