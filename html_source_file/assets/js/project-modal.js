(function () {
  var modal = document.getElementById('project-modal');
  if (!modal) return;
  var body = modal.querySelector('.project-modal-body');
  var overlay = modal.querySelector('.project-modal-overlay');
  var closeBtn = modal.querySelector('.project-modal-close');
  var page = document.documentElement;
  var background = document.querySelector('.wrapper');
  var frozenBackground = [];
  var pageOverflow = '';
  var scrollX = 0;
  var scrollY = 0;
  var isClosing = false;

  function freezeBackground() {
    var elements = [background];
    background.querySelectorAll('header, footer').forEach(function (el) {
      if (window.getComputedStyle(el).position === 'fixed') elements.push(el);
    });
    // Measure everything before changing the fixed sidebar's containing layout.
    frozenBackground = elements.map(function (el) {
      return { element: el, style: el.getAttribute('style'), rect: el.getBoundingClientRect() };
    });
    frozenBackground.forEach(function (item) {
      var style = item.element.style;
      style.position = 'fixed';
      style.top = item.rect.top + 'px';
      style.left = item.rect.left + 'px';
      style.right = 'auto';
      style.bottom = 'auto';
      style.width = item.rect.width + 'px';
      style.boxSizing = 'border-box';
      style.margin = '0';
    });
  }

  function restoreBackground() {
    frozenBackground.forEach(function (item) {
      if (item.style === null) item.element.removeAttribute('style');
      else item.element.setAttribute('style', item.style);
    });
    frozenBackground = [];
  }

  function openModal(templateId) {
    var tpl = document.getElementById(templateId);
    if (!tpl || isClosing || modal.classList.contains('is-open')) return;
    scrollX = window.scrollX;
    scrollY = window.scrollY;
    pageOverflow = page.style.overflow;
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    // Keep the background at its current viewport coordinates for the entire modal session.
    freezeBackground();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    page.style.overflow = 'hidden';
  }

  function finishClose() {
    if (!isClosing) return;
    isClosing = false;
    modal.classList.remove('is-closing');
    modal.setAttribute('aria-hidden', 'true');
    body.innerHTML = '';
    page.style.overflow = pageOverflow;
    restoreBackground();
    window.scrollTo(scrollX, scrollY);
  }

  function closeModal() {
    if (isClosing || !modal.classList.contains('is-open')) return;
    isClosing = true;
    modal.classList.add('is-closing');
    modal.classList.remove('is-open');
    body.querySelectorAll('video, audio').forEach(function (media) { media.pause(); });
    // Keep the content and frozen background until the fade-out is fully hidden.
    // With transitions disabled, this completes immediately after the current task.
    Promise.all(modal.getAnimations().map(function (animation) {
      return animation.finished.catch(function () {});
    })).then(finishClose);
  }

  document.querySelectorAll('.project-modal-trigger').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(el.getAttribute('data-project-id') + '-content');
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
})();
