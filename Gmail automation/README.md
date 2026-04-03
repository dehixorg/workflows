# 🚀 SendFlow Bot – n8n Email Automation Workflow

## 📌 Overview
SendFlow Bot is a Telegram-based email campaign automation system built using n8n.

It integrates:
- Gmail (multi-account sending)
- Google Sheets (email database + tracking)
- Google Gemini AI (email generation)
- Telegram Bot (command interface)

---

## ⚙️ Features
- Bulk email sending via Telegram
- AI-generated email content
- Status tracking (pending, sent, failed)
- Multi-account Gmail rotation
- Reset and resend functionality
- Campaign analytics

---

## 💬 Commands

### Send Campaign
/send your message here

### Status
/status
/status email@x.com

### Stats
/stats

### List Emails
/list

### Reset
/reset all
/reset failed
/reset email@x.com

### Resend Failed
/resendfailed

### Add / Remove Emails
/add email@x.com
/remove email@x.com

### Direct Send
/sendto email@x.com: message

### Help
/help

---

## 📥 Setup

1. Import the workflow JSON into n8n
2. Configure credentials:
   - Telegram API
   - Gmail OAuth2
   - Google Sheets
   - Google Gemini API
3. Create Google Sheet with columns:
   Email | status | sentAt | AccountUsed
4. Activate workflow

---

## 📊 Workflow Summary
- Telegram → Command Router → Switch
- AI Email Generator (Gemini)
- Google Sheets (read/write)
- Gmail (multi-account sending)
- Telegram notifications

---

## ⚠️ Notes
- Gmail limits apply
- Keep delays between emails
- Use multiple accounts for scaling

---

## 👨‍💻 Tech Stack
- n8n
- Telegram Bot API
- Google Gemini AI
- Gmail API
- Google Sheets API
