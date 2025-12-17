const fade = document.getElementById('fade');

const url = new URL(window.location.href);

const urlParams = new URLSearchParams(window.location.search);
const isRedirected = urlParams.get('redirected');

if (url.searchParams.has('redirected')) {
  url.searchParams.delete('redirected');
  history.replaceState({}, document.title, url.toString());
}

document.addEventListener('DOMContentLoaded', () => {
  if (isRedirected) {
    // fade.style.visiblity = 'visible';
    // fade.style.opacity = 0.7;

    fade.classList.remove('showFade');
  }
});

function navigateTo(destination) {
  const body = document.body;

  if (body) {
    fade.classList.add('showFade');

    setTimeout(() => {
      window.location.href = `${destination}?redirected=true`;
    }, 200);
  }
}
