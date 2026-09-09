(function () {
  // Back to top — visible once the page has scrolled past the hero.
  var backToTop = document.getElementById('back-to-top');
  function toggleBackToTop() {
    backToTop.hidden = window.scrollY <= 600;
  }
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  // Image lightbox.
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  function openImage(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeImage() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }
  document.querySelectorAll('img[data-zoom]').forEach(function (img) {
    img.addEventListener('click', function () {
      openImage(img.currentSrc || img.src, img.alt);
    });
  });
  lightbox.addEventListener('click', closeImage);

  // Video modal — embeds the YouTube player instead of navigating away.
  var videoModal = document.getElementById('video-modal');
  var videoFrame = document.getElementById('video-frame');
  var videoInner = videoModal.querySelector('.video-modal-inner');
  function openVideo(id) {
    videoFrame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
    videoModal.hidden = false;
  }
  function closeVideo() {
    videoModal.hidden = true;
    videoFrame.src = '';
  }
  document.querySelectorAll('[data-yt]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openVideo(link.dataset.yt);
    });
  });
  videoModal.addEventListener('click', closeVideo);
  videoInner.addEventListener('click', function (e) { e.stopPropagation(); });
  document.getElementById('video-close').addEventListener('click', closeVideo);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lightbox.hidden) closeImage();
    if (!videoModal.hidden) closeVideo();
  });
})();
