// Get elements
const titleInput = document.getElementById('title');
const urlInput = document.getElementById('url');
const descriptionInput = document.getElementById('description');
const saveBtn = document.getElementById('saveBtn');
const settingsBtn = document.getElementById('settingsBtn');
const messageDiv = document.getElementById('message');
const loadingDiv = document.getElementById('loading');
const formDiv = document.getElementById('form');

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

// Load current page data
async function loadPageData() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    urlInput.value = tab.url;

    // Set title from page title
    if (tab.title) {
      titleInput.value = tab.title;
    }
  } catch (error) {
    console.error('Error loading page data:', error);
    showMessage('Error loading page data', 'error');
  }
}

// Save to Notion
async function saveToNotion() {
  const title = titleInput.value.trim();
  const url = urlInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    showMessage('Please enter a title', 'error');
    return;
  }

  if (!url) {
    showMessage('URL is required', 'error');
    return;
  }

  // Check if settings are configured
  const { notionApiKey, notionDatabaseId } = await chrome.storage.sync.get([
    'notionApiKey',
    'notionDatabaseId'
  ]);

  if (!notionApiKey || !notionDatabaseId) {
    showMessage('Please configure your Notion settings first', 'error');
    settingsBtn.click();
    return;
  }

  // Show loading state
  formDiv.style.display = 'none';
  loadingDiv.classList.add('show');
  saveBtn.disabled = true;

  try {
    // Get current date
    const today = new Date().toISOString().split('T')[0];

    // Send message to background script to save to Notion
    const response = await chrome.runtime.sendMessage({
      action: 'saveToNotion',
      data: {
        title,
        url,
        description,
        date: today,
        notionApiKey,
        notionDatabaseId
      }
    });

    if (response.success) {
      showMessage('✓ Saved to Notion successfully!', 'success');
      // Clear form
      titleInput.value = '';
      descriptionInput.value = '';

      // Reload page data
      setTimeout(() => {
        loadPageData();
        formDiv.style.display = 'block';
        loadingDiv.classList.remove('show');
      }, 2000);
    } else {
      throw new Error(response.error || 'Failed to save to Notion');
    }
  } catch (error) {
    console.error('Error saving to Notion:', error);
    showMessage(`Error: ${error.message}`, 'error');
    formDiv.style.display = 'block';
    loadingDiv.classList.remove('show');
  } finally {
    saveBtn.disabled = false;
  }
}

// Settings click handler
settingsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// Save button click handler
saveBtn.addEventListener('click', saveToNotion);

// Load page data on popup open
loadPageData();
