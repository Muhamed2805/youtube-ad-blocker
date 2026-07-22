function handleAds() {
  const video = document.querySelector('video');
  if (!video) return;

  const player = document.querySelector('.html5-video-player');
  const adShowing =
    player?.classList.contains('ad-showing') ||
    player?.classList.contains('ad-interrupting') ||
    document.querySelector('.ytp-ad-player-overlay');

  if (adShowing) {
    // Ugasi zvuk i ubrzaj na max da "pregori" što brže
    video.muted = true;
    try {
      video.playbackRate = 16;
    } catch (e) {}

    // Ako znamo trajanje, odmah skoči na kraj (triggeruje sljedeći ad ili video)
    if (video.duration && isFinite(video.duration)) {
      video.currentTime = video.duration;
    }

    // Klikni skip čim je vidljivo, koji god selektor da je trenutno aktivan
    const skipBtn = document.querySelector(
      '.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button, button[aria-label*="Skip"], button[aria-label*="Preskoči"]'
    );
    if (skipBtn) skipBtn.click();

    // Zatvori "overlay" reklame preko videa (banner tokom reklame)
    document
      .querySelectorAll('.ytp-ad-overlay-close-button')
      .forEach((btn) => btn.click());
  } else {
    // Vrati normalu kad reklame nema
    video.muted = false;
    if (video.playbackRate !== 1) video.playbackRate = 1;
  }

  // Ukloni banner/feed reklame
  const selectors = [
    'ytd-display-ad-renderer',
    'ytd-promoted-sparkles-web-renderer',
    'ytd-in-feed-ad-layout-renderer',
    'ytd-ad-slot-renderer',
    'ytd-banner-promo-renderer',
    '#masthead-ad'
  ];
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  });
}

// Brz interval (50ms) da ne kasnimo za ad state promjenama
setInterval(handleAds, 50);

// Reaguj i odmah na DOM promjene
const observer = new MutationObserver(handleAds);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});

// Reaguj i na promjenu videa (kad se učita novi segment - ad ili sadržaj)
document.addEventListener(
  'loadedmetadata',
  (e) => {
    if (e.target.tagName === 'VIDEO') handleAds();
  },
  true
);