# Quick Start Guide

## 5-Minute Setup

### 1. Get Your Notion Credentials

**API Key:**
1. Go to https://www.notion.com/my-integrations
2. Create new integration → Copy the secret key

**Database ID:**
1. Open your Notion database
2. Copy from URL: `notion.so/{DATABASE_ID}?v=...`

### 2. Create a Notion Database

Create a simple table with these columns:
- **Title** (Text)
- **URL** (URL)
- **Description** (Text)

### 3. Grant Integration Access

1. Open your database
2. Click "..." → "Connections"
3. Add your integration

### 4. Load Extension in Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json`

### 5. Configure Extension

1. Click extension icon
2. Click "Settings"
3. Paste API Key and Database ID
4. Click "Save"

## Start Saving!

1. Visit any webpage
2. Click the NoteMark icon
3. Edit title/add description (optional)
4. Click "Save to Notion"

That's it! Your page is now in Notion.

## Common Issues

| Problem | Solution |
|---------|----------|
| "Configure settings first" | Click Settings, add API Key and Database ID |
| Pages not saving | Check that your database has Title, URL, Description columns |
| Wrong database ID | Copy the full ID from the URL bar |

## Need Help?

See README.md for detailed setup instructions and troubleshooting.
