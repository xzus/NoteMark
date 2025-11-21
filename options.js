// Get elements
const apiKeyInput = document.getElementById('apiKey');
const databaseIdInput = document.getElementById('databaseId');
const saveBtn = document.getElementById('saveBtn');
const messageDiv = document.getElementById('message');

// Load saved settings
async function loadSettings() {
  const { notionApiKey, notionDatabaseId } = await chrome.storage.sync.get([
    'notionApiKey',
    'notionDatabaseId'
  ]);

  if (notionApiKey) {
    apiKeyInput.value = notionApiKey;
  }

  if (notionDatabaseId) {
    databaseIdInput.value = notionDatabaseId;
  }
}

// Show message
function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type} show`;

  if (type === 'success') {
    setTimeout(() => {
      messageDiv.classList.remove('show');
    }, 3000);
  }
}

// Save settings
async function saveSettings() {
  const apiKey = apiKeyInput.value.trim();
  const databaseId = databaseIdInput.value.trim();

  if (!apiKey) {
    showMessage('Please enter your Notion API key', 'error');
    return;
  }

  if (!databaseId) {
    showMessage('Please enter your database ID', 'error');
    return;
  }

  try {
    await chrome.storage.sync.set({
      notionApiKey: apiKey,
      notionDatabaseId: databaseId
    });

    showMessage('✓ Settings saved successfully!', 'success');
  } catch (error) {
    console.error('Error saving settings:', error);
    showMessage('Error saving settings', 'error');
  }
}

// Event listeners
saveBtn.addEventListener('click', saveSettings);

// Load settings on page load
loadSettings();
