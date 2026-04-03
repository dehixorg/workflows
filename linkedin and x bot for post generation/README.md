# 🚀 LinkedIn & X (Twitter) AI Content Bot – n8n Workflow

## 📌 Overview
This workflow automates social media content creation and posting using AI.

It takes a topic from Telegram and:
- Generates content using AI (Gemini)
- Creates an image using Stable Diffusion (Hugging Face)
- Posts to LinkedIn
- Posts to X (Twitter)
- Sends confirmation via Telegram

---

## ⚙️ Features
- 🤖 AI-generated content (LinkedIn + Twitter)
- 🎨 AI-generated images
- 🔗 Automated posting to LinkedIn & X
- 🧵 Twitter thread support
- 📊 Content strategy + analysis
- 📩 Telegram-based control

---

## 🏗️ Workflow Structure

### 1. Telegram Trigger
- Input: Topic message
- Starts workflow

---

### 2. AI Content Generation
- Uses Google Gemini
- Generates:
  - LinkedIn post
  - Twitter tweet + thread
  - Hashtags
  - CTA
  - Best posting time
  - Virality analysis

---

### 3. Image Generation
- Hugging Face Stable Diffusion
- Input: AI-generated prompt
- Output: PNG image

---

### 4. LinkedIn Posting

#### Primary Method:
- Uses n8n LinkedIn node

#### Fallback Method:
1. Register upload
2. Upload image
3. Create post via API

---

### 5. Twitter (X) Posting
- Posts main tweet with image
- Posts thread tweets
- Includes hashtags

---

### 6. Notifications
- Telegram confirmation (success/failure)
- Separate messages for LinkedIn & Twitter

---

## 💬 Usage

Send a topic via Telegram:
Example:
AI in startups

Workflow will:
- Generate content
- Create image
- Post to LinkedIn & Twitter
- Send confirmation

---

## 🔐 Setup Instructions

### 1. Telegram Bot
- Create bot via @BotFather
- Add token in n8n

---

### 2. Google Gemini API
- Get API key from Google AI Studio
- Add to n8n credentials

---

### 3. Hugging Face API
- Create account
- Generate token
- Add in HTTP request node

---

### 4. LinkedIn Setup
- Create app in LinkedIn Developers
- Get:
  - Client ID
  - Client Secret
- Setup OAuth2 OR use access token

---

### 5. Twitter (X) Setup
- Create developer app
- Get API keys
- Connect via OAuth2 in n8n

---

## ⚠️ Notes
- LinkedIn token expires every 60 days
- Twitter API requires developer access
- Image generation may take time
- Ensure proper API limits

---

## 📈 Future Improvements
- Scheduling posts
- Multi-platform support (Instagram, Facebook)
- Analytics dashboard
- Content history storage

---

## 👨‍💻 Tech Stack
- n8n
- Telegram Bot API
- Google Gemini AI
- Hugging Face (Stable Diffusion)
- LinkedIn API
- Twitter API

---

## 🔥 Use Case

Send:
AI marketing trends 2026

Bot will:
- Create viral content
- Generate image
- Post on LinkedIn
- Post on Twitter thread
- Notify you instantly

