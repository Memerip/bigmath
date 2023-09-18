const get = (key) => localStorage.getItem(key);

const set = (key, value) => localStorage.setItem(key, value);

const titleInput = document.getElementById('titleInput');
const faviconInput = document.getElementById('faviconInput');

// Check if the page is "/proxy"
if (window.location.pathname === "/settings") {
  const saveButtonC = document.getElementById('saveCloak');

  let existingLink = document.querySelector("link[rel='shortcut icon']");
  if (!existingLink) {
    existingLink = document.createElement('link');
    existingLink.rel = 'shortcut icon';
    document.head.appendChild(existingLink);
  }

  function updateTitleAndFavicon() {
    let titleValue = titleInput.value.trim();
    let faviconValue = faviconInput.value.trim();

    if (titleValue === '') {
      set('title', '');
      delete localStorage.title;
    } else {
      document.title = titleValue;
      set('title', titleValue);
    }

    if (faviconValue === '') {
      set('icon', '');
      delete localStorage.icon;
    } else {
      set('icon', faviconValue);
      existingLink.href = faviconValue;
    }
  }

  saveButtonC.addEventListener('click', function () {
    updateTitleAndFavicon();
    location.reload();
  });

  const savedTitle = get('title');
  if (savedTitle) {
    document.title = savedTitle;
    titleInput.value = savedTitle;
  }

  const savedIcon = get('icon');
  if (savedIcon) {
    faviconInput.value = savedIcon;
    existingLink.href = savedIcon;
  }
}

// Update text fields on all pages
function updateText() {
  const savedTitle = get('title');
  if (savedTitle) {
    document.title = savedTitle;
    titleInput.value = savedTitle;
  }

  const savedIcon = get('icon');
  if (savedIcon) {
    faviconInput.value = savedIcon;
    existingLink.href = savedIcon;
  }
}

// Call updateText function on all pages
updateText();