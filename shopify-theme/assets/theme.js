(function () {
  'use strict';

  // ── 1. Mobile menu toggle ──────────────────────────────────────────────────
  var header      = document.getElementById('site-header');
  var hamburger   = document.getElementById('hamburger-btn');
  var mobileMenu  = document.getElementById('mobile-menu');
  var shopTrigger = document.getElementById('shop-trigger-mobile');
  var shopSub     = document.getElementById('mobile-shop-sub');
  var shopChevron = document.getElementById('mobile-shop-chevron');
  var menuOpen    = false;
  var shopSubOpen = false;

  function openMenu() {
    menuOpen = true;
    if (header)     header.classList.add('menu-open');
    if (mobileMenu) { mobileMenu.classList.add('open'); mobileMenu.setAttribute('aria-hidden', 'false'); }
    if (hamburger)  { hamburger.setAttribute('aria-expanded', 'true'); hamburger.setAttribute('aria-label', 'Close menu'); }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    if (header)     header.classList.remove('menu-open');
    if (mobileMenu) { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true'); }
    if (hamburger)  { hamburger.setAttribute('aria-expanded', 'false'); hamburger.setAttribute('aria-label', 'Open menu'); }
    document.body.style.overflow = '';
    // Also close shop sub-menu when closing main menu
    closeShopSub();
  }

  function toggleMenu() {
    if (menuOpen) { closeMenu(); } else { openMenu(); }
  }

  function openShopSub() {
    shopSubOpen = true;
    if (shopSub)     { shopSub.classList.add('open'); shopSub.setAttribute('aria-hidden', 'false'); }
    if (shopTrigger) shopTrigger.setAttribute('aria-expanded', 'true');
    if (shopChevron) shopChevron.style.transform = 'rotate(180deg)';
  }

  function closeShopSub() {
    shopSubOpen = false;
    if (shopSub)     { shopSub.classList.remove('open'); shopSub.setAttribute('aria-hidden', 'true'); }
    if (shopTrigger) shopTrigger.setAttribute('aria-expanded', 'false');
    if (shopChevron) shopChevron.style.transform = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (shopTrigger) {
    shopTrigger.addEventListener('click', function () {
      if (shopSubOpen) { closeShopSub(); } else { openShopSub(); }
    });
  }

  // Close mobile menu when any nav link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  // ── 2. Desktop SHOP dropdown ───────────────────────────────────────────────
  var shopWrap     = document.getElementById('shop-dropdown-wrap');
  var shopDropdown = document.getElementById('shop-dropdown');
  var shopBtn      = document.getElementById('shop-trigger-desktop');
  var hoverTimer   = null;
  var dropdownOpen = false;

  function openDropdown() {
    clearTimeout(hoverTimer);
    if (!shopDropdown) return;
    dropdownOpen = true;
    shopDropdown.style.display = 'block';
    if (header)  header.classList.add('dropdown-open');
    if (shopBtn) shopBtn.classList.add('open');
  }

  function closeDropdown() {
    hoverTimer = setTimeout(function () {
      if (!shopDropdown) return;
      dropdownOpen = false;
      shopDropdown.style.display = 'none';
      if (header)  header.classList.remove('dropdown-open');
      if (shopBtn) shopBtn.classList.remove('open');
    }, 140);
  }

  function keepDropdown() {
    clearTimeout(hoverTimer);
  }

  if (shopWrap) {
    shopWrap.addEventListener('mouseenter', openDropdown);
    shopWrap.addEventListener('mouseleave', closeDropdown);
  }

  if (shopDropdown) {
    shopDropdown.addEventListener('mouseenter', keepDropdown);
    shopDropdown.addEventListener('mouseleave', closeDropdown);

    // Close dropdown when a dropdown link is clicked
    shopDropdown.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        clearTimeout(hoverTimer);
        if (shopDropdown) shopDropdown.style.display = 'none';
        if (header)  header.classList.remove('dropdown-open');
        if (shopBtn) shopBtn.classList.remove('open');
        dropdownOpen = false;
      });
    });
  }

  // ── 3. Header scroll state ─────────────────────────────────────────────────
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // ── 4. Header bg on scroll (transparent pages only) ───────────────────────
  // The header background is controlled via CSS classes:
  // - Default: transparent (on home page)
  // - .scrolled: var(--bg-cream) added by JS
  // - Pages that need solid header from the start use data-solid-header attribute
  var solidHeader = header && header.getAttribute('data-solid-header') === 'true';
  if (solidHeader && header) {
    header.style.background = 'var(--bg-cream)';
  }

  // ── 5. Product page: thumbnail gallery switching ───────────────────────────
  var thumbs   = document.querySelectorAll('.product-thumb');
  var mainImg  = document.querySelector('.product-main-img img');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var newSrc = this.getAttribute('data-src');
      var newAlt = this.getAttribute('data-alt') || '';

      if (mainImg && newSrc) {
        mainImg.src = newSrc;
        mainImg.alt = newAlt;
      }

      thumbs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // ── 6. Product page: accordion ─────────────────────────────────────────────
  var accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var body = this.nextElementSibling;

      // Close all other accordions
      accordionTriggers.forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
        var b = t.nextElementSibling;
        if (b) b.classList.remove('open');
      });

      // Toggle this one
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        if (body) body.classList.add('open');
      }
    });
  });

  // ── 7. Product page: quantity +/- buttons ──────────────────────────────────
  var qtyBtns = document.querySelectorAll('.product-qty-btn');

  qtyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.querySelector('.product-qty-input');
      if (!input) return;
      var current = parseInt(input.value, 10) || 1;
      var delta   = parseInt(this.getAttribute('data-delta'), 10) || 0;
      var newVal  = Math.max(1, current + delta);
      input.value = newVal;
    });
  });

  // ── 8. Cart page: quantity update on change ────────────────────────────────
  var cartQtyInputs = document.querySelectorAll('.cart-item-qty');

  cartQtyInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      var form = this.closest('form');
      if (form) form.submit();
    });
  });

})();
