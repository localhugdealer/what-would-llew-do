// The two share buttons that need a script: Share, which opens the device's own share menu
// (the only way to reach Instagram, which has no share link), and Copy link. Each stays hidden
// unless the browser supports it. Both share the page's canonical address rather than the
// address in the bar, so a copy opened from disk or the github.io subpath still shares the real site.
const url = document.querySelector('link[rel="canonical"]').href;

document.querySelectorAll('.share').forEach((share) => {
  const status = share.querySelector('.share-status');
  const nativeButton = share.querySelector('[data-share="native"]');
  const copyButton = share.querySelector('[data-share="copy"]');

  const say = (message) => {
    status.textContent = message;
    setTimeout(() => { status.textContent = ''; }, 3000);
  };

  if (navigator.share) {
    nativeButton.parentElement.hidden = false;
    // A rejection here usually means the visitor closed the share menu, which needs no message.
    nativeButton.addEventListener('click', () => {
      navigator.share({ title: document.title, url }).catch(() => {});
    });
  }

  if (navigator.clipboard) {
    copyButton.parentElement.hidden = false;
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(url)
        .then(() => say('Link copied'))
        .catch(() => say(`Couldn't copy it, the address is ${url}`));
    });
  }
});
