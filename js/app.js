/* Meine Reise – Scroll-Storytelling
   Vanilla JS + GSAP ScrollTrigger + Lenis. Funktioniert auch per file:// */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var R = window.REISE, S = R.stationen, N = S.length;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = window.matchMedia('(max-width: 760px)').matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tageKurz(t) { return t.length > 1 ? 'Tag ' + t[0] + '–' + t[t.length - 1] : 'Tag ' + t[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function imgName(st, kind) { return 'images/' + pad(st.nr) + '-' + st.id + '-' + kind + '.webp'; }

  /* ---------------------------------------------------------------- Render */
  function renderParagraphs(target, arr) {
    $(target).innerHTML = arr.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  }
  renderParagraphs('#warumText', R.warum);
  renderParagraphs('#fazitText', R.fazit);

  $('#routeLegend').innerHTML = S.map(function (st) {
    return '<li><b>' + pad(st.nr) + '</b><span>' + esc(st.stadt) + '</span><span class="flag">' + st.land + '</span></li>';
  }).join('');

  var stationsHtml = S.map(function (st, i) {
    var even = i % 2 === 1;
    return '' +
      '<section class="station' + (even ? ' station--even' : '') + '" id="s-' + st.id + '" data-nav data-index="' + i + '" data-land="' + st.land + '">' +
        '<div class="station__bg"><img loading="lazy" decoding="async" src="' + imgName(st, 'bg') + '" alt="' + esc(st.ort) + ', ' + esc(st.stadt) + '"></div>' +
        '<div class="station__veil"></div>' +
        '<div class="station__inner">' +
          '<article class="card reveal" data-nr="' + pad(st.nr) + '">' +
            '<div class="card__meta"><span class="card__days">' + tageKurz(st.tage) + '</span><span class="card__land">' + esc(R.laender[st.land].name) + '</span></div>' +
            '<h2 class="card__city">' + esc(st.stadt) + '</h2>' +
            '<p class="card__place">' + esc(st.ort) + '</p>' +
            '<p class="card__story">' + esc(st.geschichte) + '</p>' +
            '<div class="card__boxes">' +
              '<div class="card__box card__box--hl"><h3>Mein Highlight</h3><p>' + esc(st.highlight) + '</p></div>' +
              '<div class="card__box card__box--fact"><h3>Wusstest du?</h3><p>' + esc(st.fakt) + '</p></div>' +
            '</div>' +
          '</article>' +
          '<div class="polaroid-wrap">' +
            '<figure class="polaroid reveal' + (even ? ' polaroid--left' : '') + '">' +
              '<span class="pin" aria-hidden="true"></span>' +
              '<div class="polaroid__img"><img loading="lazy" decoding="async" src="' + imgName(st, 'detail') + '" alt="' + esc(st.bildtext) + '"' + (st.bildPos ? ' style="object-position:' + esc(st.bildPos) + '"' : '') + '></div>' +
              '<figcaption>' + esc(st.bildtext) + '</figcaption>' +
            '</figure>' +
          '</div>' +
        '</div>' +
      '</section>';
  }).join('');
  $('#stations').innerHTML = stationsHtml;

  /* Bahn-Leiste */
  var rail = $('#rail');
  rail.innerHTML = '<div class="rail__track"><i id="railFill"></i></div>' + S.map(function (st, i) {
    return '<button class="rail__stop" type="button" data-index="' + i + '" aria-label="Station ' + st.nr + ': ' + esc(st.stadt) + '"><span class="rail__tip">' + pad(st.nr) + ' ' + esc(st.stadt) + '</span></button>';
  }).join('');
  var railStops = $$('.rail__stop');

  /* Bildnachweise */
  (function renderCredits() {
    var list = $('#creditsList'), data = window.BILDNACHWEISE || [];
    if (!data.length) {
      list.innerHTML = '';
      var p = document.createElement('p');
      p.className = 'credits__empty';
      p.textContent = 'Die Liste der Fotos (Titel, Autor, Lizenz, Link) wird automatisch aus credits.json erzeugt – siehe tools/fetch_images.py.';
      list.parentNode.insertBefore(p, list);
      return;
    }
    list.innerHTML = data.map(function (c) {
      var st = null;
      for (var i = 0; i < N; i++) if (S[i].id === c.key) st = S[i];
      var nr = st ? pad(st.nr) : (c.key === 'hero' ? '✦' : '–');
      var wo = st ? esc(st.stadt) + (c.art === 'detail' ? ' (Detail)' : '') : 'Titelbild';
      return '<li><b>' + nr + '</b><span><strong>' + wo + ':</strong> „' + esc(c.titel) + '“ – ' + esc(c.autor) +
        ', <a href="' + esc(c.lizenzUrl || c.quelle) + '" target="_blank" rel="noopener">' + esc(c.lizenz) + '</a>' +
        ' · <a href="' + esc(c.quelle) + '" target="_blank" rel="noopener">Wikimedia Commons</a></span></li>';
    }).join('');
  })();

  /* Fehlende Bilder: kein Platzhalter, Sektion bekommt Farbverlauf, Polaroid wird ausgeblendet */
  function watchImage(img, onFail) {
    if (img.complete && img.naturalWidth === 0 && img.src) { onFail(); return; }
    img.addEventListener('error', onFail);
  }
  watchImage($('#heroImg'), function () { $('#hero').classList.add('no-image'); });
  $$('.station').forEach(function (sec) {
    watchImage($('.station__bg img', sec), function () { sec.classList.add('no-image'); });
    watchImage($('.polaroid__img img', sec), function () { $('.polaroid', sec).classList.add('is-missing'); });
  });

  /* ---------------------------------------------------------------- GSAP + Lenis */
  gsap.registerPlugin(ScrollTrigger);
  var lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* Karten */
  var bigMap = window.buildMap($('#mapSvg'), S, { compact: false });
  var miniMap = window.buildMap($('#minimapSvg'), S, { compact: true });

  /* ---------------------------------------------------------------- Hero */
  (function heroIntro() {
    var lines = $$('.hero__title .line > span');
    if (reduced) return;
    gsap.set(lines, { yPercent: 110 });
    gsap.set(['.hero__kicker', '.hero__author', '.hero__scroll'], { autoAlpha: 0, y: 14 });
    var tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });
    tl.from('.hero__bg img', { scale: 1.16, duration: 2.6, ease: 'power2.out' }, 0)
      .to('.hero__kicker', { autoAlpha: 1, y: 0, duration: .9 }, 0.3)
      .to(lines, { yPercent: 0, duration: 1.3, stagger: 0.11 }, 0.45)
      .to('.hero__author', { autoAlpha: 1, y: 0, duration: .9 }, 1.1)
      .to('.hero__scroll', { autoAlpha: 1, y: 0, duration: .9 }, 1.5);
    /* Hero-Text beim Scrollen leicht nach oben & ausblenden */
    gsap.to('.hero__inner', {
      yPercent: -18, autoAlpha: 0, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero__bg img', {
      yPercent: mobile ? 6 : 14, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  })();

  /* ---------------------------------------------------------------- Route-Sektion (Karte zeichnet sich) */
  var routeST = null;
  (function routeSection() {
    var sec = $('#route');
    if (reduced) { bigMap.setProgress(1); return; }
    var state = { p: 0 };
    routeST = ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: mobile ? 'bottom bottom' : '+=160%',
      pin: !mobile,
      scrub: 0.6,
      onUpdate: function (self) { bigMap.setProgress(self.progress); }
    });
    if (mobile) {
      routeST.kill();
      routeST = ScrollTrigger.create({
        trigger: sec, start: 'top 60%', end: 'bottom 70%', scrub: 0.6,
        onUpdate: function (self) { bigMap.setProgress(self.progress); }
      });
    }
    gsap.from('.route__text > *', {
      y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sec, start: 'top 70%', once: true }
    });
  })();

  /* ---------------------------------------------------------------- Stationen: Parallax + Reveal */
  $$('.station').forEach(function (sec, i) {
    var img = $('.station__bg img', sec), card = $('.card', sec), pol = $('.polaroid', sec);
    if (reduced) { card.classList.add('is-in'); pol.classList.add('is-in'); return; }
    var amp = mobile ? 3.5 : 8;
    gsap.fromTo(img, { yPercent: -amp }, {
      yPercent: amp, ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true }
    });
    var rot = parseFloat(getComputedStyle(pol).getPropertyValue('--rot')) || 3;
    var tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 62%', once: true } });
    tl.fromTo(card, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power4.out', onStart: function () { card.classList.add('is-in'); } }, 0)
      .from($$('.card > *', sec), { y: 18, autoAlpha: 0, stagger: 0.07, duration: 0.8, ease: 'power3.out' }, 0.15)
      .fromTo(pol, { y: 70, rotation: rot * 3, autoAlpha: 0 }, { y: 0, rotation: rot, autoAlpha: 1, duration: 1.2, ease: 'power4.out', onStart: function () { pol.classList.add('is-in'); } }, 0.25);
  });

  /* Reveal für Intro / Fazit / Danke */
  ['#warum .intro__inner > *', '#fazit .fazit__inner > *', '#danke .danke__inner > *'].forEach(function (sel) {
    if (reduced) return;
    var items = $$(sel);
    gsap.from(items, {
      y: 30, autoAlpha: 0, stagger: 0.09, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: items[0].parentNode, start: 'top 68%', once: true }
    });
  });

  /* ---------------------------------------------------------------- Aktive Station: HUD, Leiste, Mini-Karte, Willkommen */
  var hud = $('#hud'), day = $('#dayCounter'), minimap = $('#minimap'), toast = $('#toast'), toastText = $('#toastText');
  var railFill = $('#railFill');
  var active = -1, lastLand = null, toastTimer = null, mini = { p: 0 };

  function showToast(text) {
    toastText.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2600);
  }
  function setMini(target) {
    if (reduced) { miniMap.setProgress(target); return; }
    gsap.to(mini, { p: target, duration: 1.4, ease: 'power2.inOut', overwrite: true, onUpdate: function () { miniMap.setProgress(mini.p); } });
  }
  function setActive(i, zone) {
    /* zone: 'hero' | 'intro' | 'station' | 'outro' */
    var inStation = zone === 'station';
    hud.classList.toggle('is-visible', zone !== 'hero');
    hud.classList.toggle('is-light', zone === 'intro' || zone === 'credits');
    rail.classList.toggle('is-visible', zone !== 'hero');
    minimap.classList.toggle('is-visible', inStation);
    day.style.visibility = inStation ? 'visible' : 'hidden';

    if (inStation) {
      var st = S[i];
      day.textContent = tageKurz(st.tage) + ' von ' + R.tage;
      if (lastLand !== st.land) {
        showToast(st.willkommen || R.laender[st.land].willkommen);
      }
      lastLand = st.land;
      setMini(miniMap.progressFor(i));
    } else if (zone === 'intro') {
      lastLand = null; setMini(0);
    } else if (zone === 'outro') {
      setMini(1);
    }
    railStops.forEach(function (b, k) {
      b.classList.toggle('is-current', inStation && k === i);
      b.classList.toggle('is-done', (inStation && k < i) || zone === 'outro');
    });
    var frac = inStation ? i / (N - 1) : (zone === 'outro' ? 1 : 0);
    railFill.style.width = (frac * 100) + '%';
    active = inStation ? i : -1;
  }

  ScrollTrigger.create({ trigger: '#hero', start: 'top top', end: 'bottom 45%', onEnter: function () { setActive(-1, 'hero'); }, onEnterBack: function () { setActive(-1, 'hero'); } });
  ScrollTrigger.create({ trigger: '#warum', start: 'top 45%', end: 'bottom 45%', onEnter: function () { setActive(-1, 'intro'); }, onEnterBack: function () { setActive(-1, 'intro'); } });
  ScrollTrigger.create({ trigger: '#route', start: 'top 45%', endTrigger: '#s-' + S[0].id, end: 'top 45%', onEnter: function () { setActive(-1, 'intro'); }, onEnterBack: function () { setActive(-1, 'intro'); } });
  $$('.station').forEach(function (sec, i) {
    ScrollTrigger.create({
      trigger: sec, start: 'top 45%', end: 'bottom 45%',
      onEnter: function () { setActive(i, 'station'); }, onEnterBack: function () { setActive(i, 'station'); },
      onLeaveBack: i === 0 ? function () { setActive(-1, 'intro'); } : null
    });
  });
  ['#fazit', '#danke'].forEach(function (sel) {
    ScrollTrigger.create({ trigger: sel, start: 'top 45%', end: 'bottom 45%', onEnter: function () { setActive(-1, 'outro'); }, onEnterBack: function () { setActive(-1, 'outro'); } });
  });
  ScrollTrigger.create({ trigger: '#bildnachweise', start: 'top 45%', end: 'bottom top', onEnter: function () { setActive(-1, 'credits'); }, onEnterBack: function () { setActive(-1, 'credits'); } });
  setActive(-1, 'hero');

  /* ---------------------------------------------------------------- Navigation (Leiste, Tastatur, Klicker) */
  var navSections = $$('[data-nav]');

  function sectionTop(el) {
    if (routeST && el.id === 'route') return routeST.start;
    return el.getBoundingClientRect().top + window.pageYOffset;
  }
  function scrollToEl(el) {
    var y = sectionTop(el);
    if (lenis) lenis.scrollTo(y, { duration: 1.15, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    else window.scrollTo(0, y);
  }
  function currentIndex() {
    var y = window.pageYOffset + 2, idx = 0;
    for (var i = 0; i < navSections.length; i++) {
      if (sectionTop(navSections[i]) <= y + window.innerHeight * 0.3) idx = i;
    }
    return idx;
  }
  function go(delta) {
    var cur = currentIndex();
    /* Auf der Karte: erster Schritt zeichnet die Route fertig (Pin-Ende), dann erst weiter */
    if (delta > 0 && routeST && navSections[cur].id === 'route' && !mobile && !reduced && window.pageYOffset < routeST.end - 10) {
      if (lenis) lenis.scrollTo(routeST.end, { duration: 1.6, easing: function (t) { return 1 - Math.pow(1 - t, 3); } });
      else window.scrollTo(0, routeST.end);
      return;
    }
    var idx = Math.max(0, Math.min(navSections.length - 1, cur + delta));
    scrollToEl(navSections[idx]);
  }

  rail.addEventListener('click', function (e) {
    var b = e.target.closest('.rail__stop');
    if (!b) return;
    scrollToEl($$('.station')[+b.getAttribute('data-index')]);
  });
  $('.hud__brand').addEventListener('click', function (e) { e.preventDefault(); scrollToEl($('#hero')); });
  $('.hero__scroll').addEventListener('click', function (e) { e.preventDefault(); scrollToEl($('#warum')); });

  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    switch (e.key) {
      case 'ArrowDown': case 'ArrowRight': case 'PageDown': case ' ': case 'Spacebar': case 'Enter':
        if (e.key === 'Enter' && tag === 'BUTTON') return;
        e.preventDefault(); go(e.shiftKey && e.key === ' ' ? -1 : 1); break;
      case 'ArrowUp': case 'ArrowLeft': case 'PageUp': case 'Backspace':
        e.preventDefault(); go(-1); break;
      case 'Home':
        e.preventDefault(); scrollToEl(navSections[0]); break;
      case 'End':
        e.preventDefault(); scrollToEl(navSections[navSections.length - 1]); break;
      default: return;
    }
  });

  /* Nach dem Laden aller Schriften Layout neu messen */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
