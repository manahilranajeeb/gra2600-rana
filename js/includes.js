function loadInclude(id, url) {
  const target = document.getElementById(id);
  if (!target) return;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(url + ' returned ' + response.status);
      }
      return response.text();
    })
    .then(html => {
      target.innerHTML = html;
    })
    .catch(error => {
      console.error('Include failed:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadInclude('site-header', 'header.html');
  loadInclude('site-footer', 'footer.html');
});