const search = document.getElementById('search')

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault()
  pxy(search.value)
});
function uv(url) {
  window.open("/uv/ga.html#" + btoa(url))
}
function searchurl(url) {
  switch (localStorage.getItem("search")) {
    case 'DuckDuckGo':
      uv(`https://duckduckgo.com/?q=${url}`)
      break;
    case 'Brave':
      uv(`https://search.brave.com/search?q=${url}`)
      break;
    case 'Bing':
        uv(`https://bing.com/search?q=${url}`)
      break;
    case 'Yahoo':
        uv(`https://search.yahoo.com/search?q=${url}`)
      break;
    case 'Google':
      uv(`https://www.google.com/search?q=${url}`)
      break;
    default:
      localStorage.setItem("search", "DuckDuckGo")
      uv(`https://duckduckgo.com/?q=${url}`)
  }
}
function pxy(url) {
  console.log(`Going to ${url}`)
  if (!isUrl(url)) {
    searchurl(url)
  } else {
    if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url
    uv(url)
  }
}
function isUrl(val = '') {
  if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
  return false;
}