const skipAds = () => {
  const player = document.querySelector('video');
  const adOverlay = document.querySelector('.ytp-ad-overlay-container');
  const adShow = document.querySelector('.ad-showing');
  const skipBtn = document.querySelector('.ytp-ad-skip-button');

  if (adShow && player) {
    console.log("⏭⏭⏭ Reklama nasilno preskočena.");
    player.currentTime = player.duration;
  }

  if (skipBtn) {
    skipBtn.click();
    console.log("⏭ Skip dugme kliknuto.");
  }

  if (adOverlay) {
    adOverlay.style.display = 'none';
  }
};

setInterval(skipAds, 500);