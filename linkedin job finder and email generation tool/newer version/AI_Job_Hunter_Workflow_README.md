# 🚀 AI Job Hunter Automation with Auto Email Sending (n8n Workflow)

## 📌 Overview
This n8n workflow automates the entire job application process:
- Takes user job preferences via form
- Scrapes jobs from LinkedIn using Apify
- Filters & ranks best job opportunities
- Fetches your resume from Google Docs
- Uses AI (Gemini + Perplexity) to:
  - Find company email
  - Generate tailored cover letter
  - Analyze job match
- Formats professional HTML email
- Sends email with resume attachment via Gmail

---

## ⚙️ Features
- Job search automation (LinkedIn scraping)
- Smart job filtering (removes duplicates + ranks quality)
- AI-powered cover letter generation
- Automatic HR email detection
- Match score & analysis
- HTML email formatting
- Resume attachment via Google Drive
- Direct email sending

---

## 🔄 Workflow Steps
1. Form Trigger – Collect job preferences  
2. Build LinkedIn URL  
3. Apify Scraper – Fetch jobs  
4. Filter Jobs – Rank + remove duplicates  
5. Get Resume (Google Docs)  
6. Merge Resume + Jobs  
7. AI Processing (Gemini + Perplexity)  
8. Structure Output  
9. Filter Errors  
10. Format Email (HTML)  
11. Download Resume (Drive)  
12. Send Email (Gmail)

---

## 🔐 Required Credentials
- Google Docs OAuth2
- Google Drive OAuth2
- Gmail OAuth2
- Google Gemini API
- Perplexity API
- Apify API Token

---

## 📂 Inputs Required
- Resume in Google Docs
- Resume PDF in Google Drive

---

## 📧 Email Output
- HTML formatted email
- Personalized cover letter
- Resume attachment

---

## ⚠️ Notes
- Ensure all credentials are connected
- Resume file ID must be correct
- AI must return valid JSON

---

## 🎯 Use Case
Best for job seekers and automation engineers to fully automate job applications.

---

## 🏁 Conclusion
This workflow acts as a complete AI-powered job application system that finds, analyzes, and applies to jobs automatically.
