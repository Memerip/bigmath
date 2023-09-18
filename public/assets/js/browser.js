const browserSelect = document.getElementById('browsers');
const saveButtonB = document.getElementById('saveBrowser');

saveButtonB.addEventListener('click', function() {
  const selectedBrowser = browserSelect.value;
  localStorage.setItem('search', selectedBrowser);
});

const savedBrowser = localStorage.getItem('search');
if (savedBrowser) {
  browserSelect.value = savedBrowser;
}

function changeSearch(target) {

}