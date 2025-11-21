// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveToNotion') {
    saveToNotion(request.data)
      .then(result => {
        sendResponse({ success: true, result });
      })
      .catch(error => {
        sendResponse({ success: false, error: error.message });
      });

    // Return true to indicate we'll send response asynchronously
    return true;
  }
});

// Save page to Notion database
async function saveToNotion(data) {
  const { title, url, description, date, notionApiKey, notionDatabaseId } = data;

  const notionPayload = {
    parent: {
      database_id: notionDatabaseId
    },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: title
            }
          }
        ]
      },
      URL: {
        url: url
      },
      Description: {
        rich_text: [
          {
            text: {
              content: description
            }
          }
        ]
      },
      Date: {
        date: {
          start: date
        }
      }
    }
  };

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionApiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify(notionPayload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Notion API error: ${response.status}`);
  }

  return await response.json();
}
