# YouTube Research Workflow (n8n)

This workflow turns a Telegram message into a deep research pipeline for YouTube creators. It collects information from multiple sources, asks Gemini to synthesize the findings, creates a Google Doc, stores the result in Notion, and sends the final links back to Telegram.

Workflow source: uploaded n8n JSON export fileciteturn0file0

---

## What this workflow does

Send a Telegram message like:

- `long artificial intelligence in education`
- `short best AI tools for creators`

The workflow:

1. Reads the message from Telegram.
2. Detects whether the request is `short` or `long`.
3. Extracts the topic.
4. Fetches research from multiple sources:
   - Tavily web search
   - YouTube Data API
   - Hacker News / Algolia
   - Medium RSS feed via rss2json
5. Combines and compresses the results.
6. Sends the context to Google Gemini for structured analysis.
7. Builds a formatted Google Doc with links and references.
8. Creates a Notion page for review.
9. Sends completion and error messages back to Telegram.

---

## Required services and credentials

You must set up these accounts, APIs, and n8n credentials before running the workflow.

### 1) Telegram Bot
Used for both trigger and status messages.

You need:
- Telegram bot token
- n8n Telegram credential connected to that bot

In n8n:
- Create a Telegram credential
- Connect it to the **Telegram Trigger** and **Send Started / Send Error / Telegram Long Done** nodes

### 2) Tavily API
Used for web research.

You need:
- Tavily API key
- HTTP request node authorization header

Replace the placeholder bearer token in the **Tavily Long** node with your own Tavily key.

### 3) YouTube Data API v3
Used to search YouTube videos.

You need:
- Google Cloud project
- Enabled YouTube Data API v3
- API key

Replace the placeholder key in **YouTube Long** with your own key.

### 4) Google Gemini API
Used for analysis.

You need:
- Gemini / Google AI API access
- n8n AI credential for the Gemini chat model

Connect your Gemini credential to:
- **Google Gemini Chat Model**

### 5) Google Docs OAuth2
Used to create and edit the research document.

You need:
- Google account connected to n8n via OAuth2
- Google Docs API enabled if needed in your Google Cloud project

Connect the credential to:
- **Create Doc Long**
- **Update Doc Long**

### 6) Notion
Used to save the final research as a review item.

You need:
- Notion integration token
- Target database ID
- Database properties that match the workflow

Connect the credential to:
- **Add to Notion**

### 7) Medium RSS / rss2json
Used to fetch blog-style articles.

This workflow uses `rss2json` to read a Medium tag feed.

No special credential is required, but the feed must be valid.

### 8) Hacker News / Algolia
Used for community discussion and article discovery.

No credential is required.

---

## Input format

The Telegram bot expects a message in this format:

```text
long your topic here
```

or

```text
short your topic here
```

### How parsing works

The **Parse Input** node:
- `rawText`: full Telegram message
- `videoType`: `short` if the message starts with `short`, otherwise `long`
- `topic`: message text after removing `short` or `long`
- `chatId`: Telegram chat ID for responses

Example:

```text
long generative AI in education
```

Parsed values:
- `videoType` → `long`
- `topic` → `generative AI in education`

---

## Workflow structure

## 1) Telegram Trigger
Starts the workflow whenever a message arrives in Telegram.

### Purpose
- Listen for incoming messages
- Capture `message.text`
- Capture chat ID

### What to configure
- Telegram bot credential
- Webhook connection in n8n
- Ensure the bot is started in Telegram

---

## 2) Parse Input
Extracts and cleans the user message.

### Purpose
- Trim extra spaces
- Detect `short` vs `long`
- Extract the research topic
- Store the chat ID

### Important note
The current workflow mostly follows the **long research** path. The `videoType` is parsed and shown in the “started” message, but the connected execution path is built around the long workflow branch.

---

## 3) Send Started
Sends a Telegram message telling the user the research has begun.

### Purpose
- Confirm the workflow is running
- Show the topic
- Show whether the request is short or long

### Message shown to user
- Topic
- Research type
- Progress message

---

## 4) Research collection nodes

These nodes run in parallel after the start message.

### A. Tavily Long
Searches the web using Tavily.

#### Purpose
- Gather current web results
- Get Tavily’s answer summary
- Pull the most relevant sources

#### What it sends
- Topic + “latest 2025 complete guide”
- `search_depth: advanced`
- `max_results: 10`
- `include_answer: true`

#### Setup
- Replace the placeholder API key
- Make sure Tavily access is active

#### Fallback
If this node fails, **Fallback Tavily Long** supplies empty values so the workflow can continue.

---

### B. YouTube Long
Searches YouTube videos related to the topic.

#### Purpose
- Find relevant videos
- Capture titles, descriptions, channels, publish dates, and video IDs

#### Setup
- Enable YouTube Data API v3
- Replace the API key
- Confirm quota is available

#### Fallback
If the call fails, **Fallback YouTube Long** returns an empty `items` array.

---

### C. HackerNews Research
Searches Hacker News via Algolia.

#### Purpose
- Find community discussions and article links
- Collect titles, URLs, and points

#### Setup
- No API key needed

#### Fallback
If the request fails, **Fallback HN** returns an empty `hits` array.

---

### D. Articles
Fetches Medium-tagged content using rss2json.

#### Purpose
- Pull blog-style sources for the topic
- Add additional reference material beyond web and video sources

#### Setup
- The Medium feed URL is built from the topic
- No credential is needed

#### Fallback
If it fails, **Fallback DevTo** returns an empty `articles` array.

---

## 5) Merge Long Research
Combines the parallel research outputs.

### Purpose
- Wait for all research branches
- Bring all results together before analysis

### Output
All research items continue into a single downstream flow.

---

## 6) Compress Long Research
This code node normalizes and compresses all collected data.

### Purpose
- Deduplicate web URLs
- Sort sources by relevance/score
- Format compact context for the AI model
- Prepare clean arrays for:
  - web sources
  - YouTube sources
  - Hacker News sources
  - blog sources

### Key outputs
- `aiContext`
- `ytContext`
- `webSources`
- `youtubeSources`
- `hnSources`
- `blogSources`
- `bestSource`
- `tavilyAnswer`

### Why this node matters
The research sources can be large. This node reduces noise so Gemini receives a manageable, organized context.

---

## 7) Deep Research Analysis
Uses Google Gemini to create structured research notes.

### Purpose
- Analyze the topic from the combined sources
- Extract useful insights
- Identify facts, trends, controversies, and video ideas

### Expected output sections
- Quick Summary
- Key Facts & Data
- Key Insights from Sources
- Controversies or Criticism
- Important Trends
- Video Content Angles

### Prompt behavior
The prompt explicitly asks Gemini to:
- analyze, not copy
- avoid fluff
- merge repeated information
- focus on creator-friendly research notes

### Setup
- Connect the Gemini credential
- Make sure the AI model node is active

---

## 8) Source Deep Analysis
Produces source-by-source analysis for the most valuable results.

### Purpose
- Go deeper on individual sources
- Extract unique value from each source
- Provide a more detailed breakdown than the summary analysis

### Output
For each major source, it creates:
- source title
- URL
- type
- key insights
- unique value

---

## 9) Format Research Doc
Converts the AI output into Google Docs batch update requests.

### Purpose
- Parse Gemini’s sectioned response
- Turn it into headings, paragraphs, and hyperlinks
- Add source lists
- Build the final document structure

### Important behavior
This node creates:
- headings for each major section
- body text for the analysis
- clickable URLs for references
- a final “All References” section

### Output
- `batchRequests`
- `topic`
- `chatId`
- `totalSources`

---

## 10) Create Doc Long
Creates a new Google Doc.

### Purpose
- Make a new document for the research result
- Set the title using the topic and current date

### Document title format
```text
[RESEARCH] <topic> — YYYY-MM-DD
```

### Setup
- Connect Google Docs OAuth2 credential
- Make sure the account can create docs

---

## 11) Update Doc Long
Writes the formatted content into the Google Doc.

### Purpose
- Send the batch update to Google Docs API
- Insert headings, text, and links

### Setup
- Google Docs API access must work
- The document ID from **Create Doc Long** must be valid

---

## 12) Prepare Notion Data
Prepares the fields needed for the Notion page.

### Purpose
- Copy topic
- Copy chat ID
- Store Google Doc ID
- Count total sources

### Output
Used directly by the Notion node.

---

## 13) Add to Notion
Creates a page in the Notion database.

### Purpose
- Save the research as a review item
- Store the Google Doc link
- Add a short summary block

### Database used
A Notion database named “YouTube Videos” is expected in the current setup.

### Required properties
The workflow expects these properties in Notion:
- `Status` (status property)
- `Script URL` (URL property)

### Current values written
- `Status` → `Ready for Review`
- `Script URL` → Google Doc link

### Setup note
Make sure your database property names and types match exactly, or update the node to match your own database.

---

## 14) Telegram Long Done
Sends the final success message.

### Purpose
- Confirm the research is finished
- Show total sources analyzed
- Share the Google Doc link
- Share the Notion page link
- Summarize what the document contains

---

## 15) Send Error
Sends a Telegram error message.

### Purpose
- Notify the user if any major step fails
- Show the error message
- Remind the user to try again

### Important note
This node is used by multiple failure paths, so it acts as the central error notifier.

---

## End-to-end execution flow

```text
Telegram Trigger
→ Parse Input
→ Send Started
→ Tavily Long
→ YouTube Long
→ HackerNews Research
→ Articles
→ Merge Long Research
→ Compress Long Research
→ Deep Research Analysis
→ Source Deep Analysis
→ Format Research Doc
→ Create Doc Long
→ Update Doc Long
→ Prepare Notion Data
→ Add to Notion
→ Telegram Long Done
```

Fallback paths allow the workflow to continue even if one source fails.

---

## How to set it up from scratch

### Step 1: Import the workflow
- Open n8n
- Import the JSON workflow
- Save it as a new workflow

### Step 2: Connect Telegram
- Create a Telegram bot with BotFather
- Add the bot token to n8n credentials
- Attach the credential to all Telegram nodes

### Step 3: Add Tavily credentials
- Create or copy your Tavily API key
- Replace the placeholder authorization header in **Tavily Long**

### Step 4: Add YouTube API key
- Enable YouTube Data API v3 in Google Cloud
- Create an API key
- Replace the placeholder key in **YouTube Long**

### Step 5: Connect Gemini
- Add your Gemini / Google AI credential
- Attach it to **Google Gemini Chat Model**

### Step 6: Connect Google Docs
- Enable Google Docs access in Google Cloud if needed
- Authenticate the Google Docs OAuth2 credential
- Attach it to **Create Doc Long** and **Update Doc Long**

### Step 7: Connect Notion
- Create a Notion integration
- Share the target database with that integration
- Ensure the database has matching properties
- Attach the credential to **Add to Notion**

### Step 8: Test the workflow
Send a Telegram message like:

```text
long ai in healthcare
```

Check that:
- the “started” message appears
- research sources are collected
- a Google Doc is created
- a Notion page is created
- the final Telegram message arrives

---

## Expected output for the user

After success, the user should receive:

- Google Doc link
- Notion page link
- total number of sources analyzed
- confirmation that the research document contains:
  - Quick Overview
  - Key Facts & Data
  - Key Research Insights
  - Controversies or Criticism
  - Important Trends & Patterns
  - Video Content Angles
  - Detailed Source Analysis
  - Complete References

---

## Customization ideas

You can easily extend this workflow by adding:

- a real `short` branch
- more research sources
- Perplexity or other search APIs
- Google Sheets logging
- email notification
- PDF export
- a second Notion database for content planning
- stronger source ranking rules

---

## Troubleshooting

### Telegram trigger not firing
- Verify the bot token
- Make sure the bot is started
- Check webhook registration in n8n

### Tavily returns errors
- Confirm the API key is valid
- Check rate limits
- Make sure the Authorization header is correct

### YouTube search returns nothing
- Confirm the API key is active
- Make sure YouTube Data API v3 is enabled
- Check query text and quota

### Gemini output is empty or malformed
- Check the model credential
- Reduce context size if needed
- Inspect the source compression output

### Google Doc creation fails
- Verify Google Docs OAuth2
- Confirm the account has permission to create documents
- Check whether the Docs API is available

### Notion page creation fails
- Confirm the database ID
- Share the database with the integration
- Make sure `Status` and `Script URL` properties exist

### Final message does not arrive
- Check whether earlier nodes failed
- Verify the Telegram credential
- Confirm the chat ID is being passed correctly

---

## Security notes

This exported workflow contains real-looking keys and credential IDs in the node definitions. Do **not** commit those secrets to public repositories.

Before using the workflow in production:

- replace all API keys with your own
- re-check every credential reference
- remove any hard-coded secrets from node parameters
- prefer n8n credentials over inline secrets wherever possible

---

## Suggested improvements

For production use, consider these upgrades:

- move API keys entirely into n8n credentials or environment variables
- add rate limiting and retries
- add a real short-form branch
- include logging to a database or spreadsheet
- create better source ranking
- add output validation for Gemini text
- generate a PDF from the Google Doc
- store execution metadata for debugging

---

## Summary

This is a Telegram-driven multi-source research automation for YouTube creators. It collects web, video, article, and community data, then transforms it into a clean research document and a Notion review item.



## 🔐 Where to Get Credentials (Detailed Guide)

### 1. YouTube Data API Key
- Go to Google Cloud Console: https://console.cloud.google.com/
- Create a new project
- Enable **YouTube Data API v3**
- Go to **Credentials → Create Credentials → API Key**
- Copy and paste into n8n

### 2. Google OAuth (if used)
- Go to **APIs & Services → Credentials**
- Click **Create Credentials → OAuth Client ID**
- Choose Web Application
- Add redirect URL from n8n (e.g., http://localhost:5678/rest/oauth2-credential/callback)
- Copy Client ID & Secret into n8n

### 3. OpenAI / AI API (if used)
- Go to https://platform.openai.com/api-keys
- Create new key
- Paste into n8n credentials

### 4. HTTP Request APIs
- Check API provider website
- Usually found under:
  - Dashboard → API Keys
  - Developer Settings
- Example providers: RapidAPI, SerpAPI

### 5. n8n Credentials Setup
- Open n8n
- Go to **Credentials tab**
- Click **New**
- Select service
- Paste keys
- Save

---

## 🛡 Security Tips
- Never share your API keys publicly
- Use environment variables when possible
- Rotate keys if exposed
