# 🚀 Meeting Coordinator with Google Meet – n8n Workflow

## 📌 Overview
This workflow automates the creation of Google Meet links using a webhook.

It allows any external system (website, app, or API) to:
- Trigger meeting creation
- Generate a Google Meet link instantly
- Return the meeting URL as a response

---

## ⚙️ Features
- 🔗 Instant Google Meet link generation
- 🌐 Webhook-based trigger (API ready)
- ⚡ Real-time response with meeting URL
- 🔓 Open access meeting (no host required to join)
- 📡 Easily integratable with websites or apps

---

## 🏗️ Workflow Structure

### 1. Webhook Trigger
- Receives POST request
- Acts as entry point for meeting creation

---

### 2. Create Meet Space
- Calls Google Meet API:
  https://meet.googleapis.com/v2/spaces

- Configuration:
  - accessType: OPEN
  - entryPointAccess: ALL

➡️ This ensures:
- Anyone with link can join
- No host restriction

---

### 3. Respond to Webhook
- Returns JSON response:
{
  "meetingUrl": "<generated_meet_link>"
}

---

## 🔗 Usage

### Example API Call

POST request to webhook URL:

{
  "title": "Team Meeting"
}

---

### Response

{
  "meetingUrl": "https://meet.google.com/xxx-xxxx-xxx"
}

---

## 📥 Setup Instructions

### 1. Import Workflow
- Open n8n
- Import JSON file:
  Meeting Coordinator with google meet.json

---

### 2. Configure Credentials

#### Google OAuth2 Required:
- Enable Google Meet API
- Add OAuth2 credentials in n8n

---

### 3. Activate Workflow
- Enable workflow in n8n

---

## 🌐 Integration Example

### Website Flow:
1. User clicks "Create Meeting"
2. Frontend sends request to webhook
3. n8n creates meeting
4. Returns link instantly
5. Display link to user

---

## ⚠️ Notes

- Google Meet API must be enabled
- OAuth permissions required
- Ensure webhook is publicly accessible
- Meeting is open (no restrictions)

---

## 📈 Future Improvements

- Add meeting title & description
- Add participants automatically
- Schedule meetings (date/time)
- Store meeting history (database)
- Add authentication layer

---

## 👨‍💻 Tech Stack

- n8n
- Google Meet API
- Webhooks (REST API)

---

## 🔥 Use Case

👉 User clicks "Create Meeting" button

➡️ Workflow:
- Webhook triggered
- Google Meet space created
- Link returned instantly

👉 Output:
https://meet.google.com/xxx-xxxx-xxx

---

