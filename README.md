# NoteMark - Save Pages to Notion

A Firefox extension that allows you to save web pages directly to your Notion database with one click. Capture the URL, title, and description of any page you're viewing.

## Features

- 📝 Save page title, URL, and custom description
- 🚀 One-click saving from any webpage
- 🔐 Secure API key storage (saved locally in Chrome sync storage)
- 🎨 Clean and intuitive UI
- ⚡ Fast and lightweight

## Prerequisites

Before you get started, you'll need:

1. A Notion account (free or paid)
2. A Notion database with the following properties:
   - **Title** (Text property)
   - **URL** (URL property)
   - **Description** (Text or Rich Text property)
   - **Date** (Date property)
3. A Notion integration API key

## Setup Instructions

### Step 1: Create a Notion Integration

1. Go to [Notion Integrations](https://www.notion.com/my-integrations)
2. Click "Create new integration"
3. Fill in the details (Name: "NoteMark", Logo optional)
4. Copy your **API Key** (you'll need this later)
5. Click "Save integration"

### Step 2: Create a Notion Database

1. In Notion, create a new database (or use an existing one)
2. Add the following properties if they don't exist:
   - **Title** - Text property (this is usually the default)
   - **URL** - URL property
   - **Description** - Text or Rich Text property
   - **Date** - Date property

### Step 3: Give Your Integration Access to the Database

1. In your Notion database, click the "..." (three dots) menu
2. Scroll to "Connections" and click it
3. Click "Connect to" and search for your integration name (e.g., "NoteMark")
4. Click it to connect

### Step 4: Get Your Database ID

1. Open your Notion database in the browser
2. Look at the URL: `https://www.notion.so/YOUR-DATABASE-ID?v=...`
3. Copy the DATABASE-ID part (it's the long alphanumeric string)

### Step 5: Install the Extension

1. Open Firefox
2. Go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to your project folder and select the `manifest.json` file

### Step 6: Configure the Extension

1. Click the NoteMark extension icon
2. Click the "Settings" button
3. Paste your Notion API Key and Database ID
4. Click "Save Settings"

## Usage

1. Navigate to any webpage you want to save
2. Click the NoteMark extension icon
3. The page title and URL will auto-populate
4. Add a description (optional but recommended)
5. Click "Save to Notion"
6. Done! The page has been saved to your Notion database

## File Structure

```
├── manifest.json          # Extension configuration
├── popup.html            # Main popup UI
├── popup.js              # Popup logic and interactions
├── background.js         # Service worker for Notion API calls
├── options.html          # Settings page
├── options.js            # Settings logic
└── README.md             # This file
```

## How It Works

1. **Popup** - When you click the extension icon, it shows a form with the current page's title and URL
2. **Popup Script** - Handles form submission and communicates with the background script
3. **Background Service Worker** - Makes secure API calls to Notion with your credentials
4. **Storage** - Your API key and database ID are stored securely in Chrome sync storage

## Troubleshooting

### "Please configure your Notion settings first"
- Make sure you've entered both your API Key and Database ID in the Settings page
- Check that your API Key starts with "secret_"

### Pages aren't being saved
1. Verify your Notion integration has access to the database
2. Check that your database has the correct properties (Title, URL, Description, Date)
3. Make sure the property names match exactly (case-sensitive)
4. Open the browser console (F12) to see detailed error messages

### Database ID not working
- Make sure you copied the full ID from the URL
- Don't include the "?v=" part or anything after it
- The ID should be a long string of characters

## Security Notes

- Your Notion API key is stored locally in your browser's sync storage
- It's never transmitted anywhere except directly to Notion's API
- For additional security, you can create a new Notion integration specifically for this extension
- Never share your API key with anyone

## Future Enhancements

Potential improvements:
- Add tags/categories field
- Save page content/highlights
- Batch save multiple pages
- Custom database property mapping
- Right-click context menu support
- Keyboard shortcuts

## License

MIT License - See LICENSE file for details

## Support

If you encounter issues:
1. Check the Firefox browser console for error messages (F12 > Console)
2. Verify your Notion API key and database ID are correct
3. Make sure your database has the required properties
4. Check that your Notion integration has database access
