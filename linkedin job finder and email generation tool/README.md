# 🚀 LinkedIn Job Hunter – Complete Automation System (n8n)

## 📌 Overview
This is a **full AI-powered job hunting automation system** built using n8n.

It combines:
1. Job scraping from LinkedIn
2. Intelligent job filtering & storage
3. AI-generated outreach emails
4. Automated email sending with resume
5. Telegram notifications & reports

---

## 📂 Workflows Included

### 1️⃣ LinkedIn Job Hunter v5
👉 File: LinkedIn Job Hunter v5.json
- Scrapes jobs from LinkedIn using Apify
- Stores jobs in Google Sheets
- Deduplicates companies
- Prepares data for outreach

📄 Source: fileciteturn4file1

---

### 2️⃣ Send Pending Emails
👉 File: LinkedIn Job Hunter – Send Pending Emails.json
- Reads pending jobs from Google Sheets
- Generates personalized emails using AI
- Sends emails with resume attachment
- Updates status (Sent / Failed / Skipped)
- Sends Telegram summary

📄 Source: fileciteturn4file0

---

## ⚙️ Features

### 🔍 Job Discovery
- LinkedIn job scraping (Apify)
- Custom filters (role, location, remote, experience)
- Deduplication (no duplicate companies)

### 📊 Data Management
- Google Sheets as database
- Tracks:
  - Company
  - Job role
  - Status (Pending / Sent / Failed)

### 🤖 AI Email Automation
- Finds HR/recruiter email
- Writes personalized cold email
- Matches resume with job description

### 📧 Email Sending
- Sends email via Gmail
- Attaches resume (PDF from Google Drive)
- Handles failures & retries

### 📩 Telegram Integration
- Trigger workflows
- Get real-time updates
- Receive summary reports

---

## 🏗️ System Architecture

### Step 1: Input (Form)
- User submits job preferences:
  - Role
  - Location
  - Remote option
  - Experience level

### Step 2: Job Scraping
- Apify LinkedIn scraper
- Fetches latest jobs

### Step 3: Processing
- Clean & normalize data
- Remove duplicates
- Extract company info

### Step 4: Storage
- Save to Google Sheets
- Mark as "Pending"

### Step 5: Email Automation
- AI generates:
  - HR email
  - Subject
  - Body
- Attach resume

### Step 6: Sending
- Gmail node sends email
- Status updated

### Step 7: Reporting
- Telegram summary:
  - Sent
  - Failed
  - Pending

---

## 💬 Usage Flow

### Step 1: Submit Job Preferences
Fill form:
- Role (e.g. React Developer)
- Location (e.g. Bangalore)
- Remote option
- Experience level

---

### Step 2: System Runs Automatically
- Jobs scraped
- Stored in sheet
- Marked as Pending

---

### Step 3: Run Email Workflow
Trigger via Telegram:
- Sends emails to all pending companies

---

### Step 4: Get Report
Telegram message:
- Emails sent
- Success rate
- Sheet link

---

## 📥 Setup Instructions

### 1. Import Workflows
- Import both JSON files into n8n

---

### 2. Configure Credentials

Required:
- Telegram Bot API
- Google Sheets OAuth2
- Google Docs API
- Google Drive API
- Gmail OAuth2
- Apify API
- Google Gemini / Claude API

---

### 3. Google Sheets Structure

Columns:
Company | Job Title | Location | Salary | Job URL | Send Status | Recruiter Email | Email Sent Date

---

### 4. Resume Setup
- Store resume in Google Drive
- Link used in workflow

---

### 5. Activate Workflows
- Enable both workflows

---

## ⚠️ Notes

- Email rate limits apply
- Use delay nodes (already configured)
- AI output may need validation
- Ensure proper API keys

---

## 📈 Future Improvements

- Add email open tracking
- Add follow-up automation
- Add job scoring system
- Add dashboard UI
- Multi-account email sending

---

## 👨‍💻 Tech Stack

- n8n
- Telegram Bot API
- Google Sheets / Docs / Drive
- Gmail API
- Apify (LinkedIn scraping)
- Google Gemini / Claude AI

---

## 🔥 Use Case

👉 User fills form:
React Developer – Bangalore

➡️ System:
- Scrapes jobs
- Saves to sheet
- Generates emails
- Sends applications

👉 Output:
- Automated job applications sent
- Telegram report received

---

