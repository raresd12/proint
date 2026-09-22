/* Stilisierte Karte: Deutschland, Schweiz, Österreich (vereinfachte Umrisse,
   von Hand gezeichnet, Koordinaten in Länge/Breite). Einfache Plattkarte. */
(function () {
  'use strict';

  var LON0 = 5.5, LAT0 = 55.3, K = 60, COSLAT = Math.cos(49 * Math.PI / 180);
  function X(lon) { return (lon - LON0) * COSLAT * K; }
  function Y(lat) { return (LAT0 - lat) * K; }

  var OUTLINES = {
    DE: [[6.9,53.35],[7.2,53.6],[7.6,53.7],[8.0,53.6],[8.35,53.55],[8.55,53.65],[8.5,53.9],[8.9,53.95],[8.85,54.3],[8.6,54.7],[8.35,54.95],[8.65,54.9],[9.25,54.8],[9.6,54.85],[10.0,54.6],[10.2,54.45],[10.7,54.35],[11.0,54.4],[11.2,54.0],[11.7,54.15],[12.2,54.25],[12.5,54.45],[12.9,54.4],[13.3,54.6],[13.6,54.65],[13.9,54.35],[14.2,54.0],[14.25,53.75],[14.15,53.4],[14.4,53.25],[14.15,52.9],[14.6,52.6],[14.75,52.3],[14.6,51.9],[14.75,51.6],[15.0,51.2],[14.8,50.85],[14.3,51.05],[14.4,50.9],[13.9,50.75],[13.4,50.6],[12.95,50.4],[12.35,50.25],[12.1,50.3],[12.5,49.95],[12.4,49.75],[12.7,49.45],[13.4,49.0],[13.8,48.75],[13.7,48.55],[13.4,48.35],[12.95,48.15],[12.75,47.75],[13.0,47.55],[12.7,47.65],[12.2,47.7],[12.05,47.5],[11.6,47.55],[11.3,47.4],[10.9,47.5],[10.45,47.55],[10.15,47.3],[9.95,47.55],[9.6,47.55],[9.2,47.65],[8.9,47.7],[8.6,47.8],[8.4,47.6],[8.0,47.55],[7.6,47.55],[7.55,47.9],[7.7,48.3],[7.8,48.6],[8.2,48.95],[7.9,49.05],[7.4,49.15],[6.9,49.2],[6.4,49.45],[6.35,49.75],[6.1,50.05],[6.15,50.3],[6.0,50.75],[5.9,51.05],[6.2,51.4],[6.1,51.85],[6.7,51.9],[7.05,52.25],[6.7,52.45],[7.0,52.65],[7.2,53.0]],
    CH: [[7.6,47.55],[8.0,47.55],[8.4,47.6],[8.6,47.8],[8.9,47.7],[9.2,47.65],[9.6,47.5],[9.55,47.2],[9.5,47.05],[9.9,46.95],[10.2,46.85],[10.45,46.9],[10.4,46.6],[10.1,46.25],[9.6,46.3],[9.3,46.5],[9.0,45.85],[8.6,46.1],[8.45,46.25],[8.1,46.0],[7.85,45.9],[7.5,45.95],[7.0,45.9],[6.8,46.15],[6.9,46.45],[6.3,46.4],[6.0,46.15],[6.1,46.4],[6.5,46.75],[6.8,46.9],[7.05,47.35],[7.35,47.45]],
    AT: [[9.55,47.55],[9.6,47.5],[9.6,47.2],[9.85,47.05],[10.2,46.85],[10.45,46.9],[11.0,46.8],[11.5,47.0],[12.15,47.05],[12.2,46.85],[12.5,46.65],[13.0,46.55],[13.7,46.5],[14.5,46.4],[15.0,46.6],[15.6,46.65],[16.0,46.85],[16.1,47.0],[16.5,47.0],[16.45,47.7],[17.0,47.9],[17.15,48.05],[16.95,48.45],[16.9,48.7],[16.5,48.8],[16.0,48.75],[15.5,48.9],[15.0,49.0],[14.7,48.6],[14.0,48.75],[13.7,48.55],[13.4,48.35],[12.95,48.15],[12.75,47.75],[13.0,47.55],[12.7,47.65],[12.2,47.7],[12.05,47.5],[11.6,47.55],[11.3,47.4],[10.9,47.5],[10.45,47.55],[10.15,47.3],[9.95,47.55]]
  };
  var LABELS = { DE: [10.3, 51.75, 'DEUTSCHLAND'], CH: [8.1, 46.55, 'SCHWEIZ'], AT: [14.55, 47.85, 'ÖSTERREICH'] };
  /* Position der Stadtnamen relativ zum Punkt */
  var ANCHOR = { koeln: 'w', bremen: 'w', hamburg: 'e', ruegen: 'e', berlin: 'e', bastei: 'e', erfurt: 'e', frankfurt: 'e', tuebingen: 'e', rheinfall: 'w', bern: 'w', muenchen: 'e', grossglockner: 's', graz: 'e' };

  var NS = 'http://www.w3.org/2000/svg';
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function fmt(n) { return Math.round(n * 10) / 10; }

  /* Geschlossene, leicht geglättete Fläche (Catmull-Rom -> Bezier) */
  function smoothClosed(pts, tension) {
    var t = tension == null ? 0.5 : tension, n = pts.length, d = 'M' + fmt(pts[0][0]) + ' ' + fmt(pts[0][1]);
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6 * t, c1y = p1[1] + (p2[1] - p0[1]) / 6 * t;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6 * t, c2y = p2[1] - (p3[1] - p1[1]) / 6 * t;
      d += ' C' + fmt(c1x) + ' ' + fmt(c1y) + ' ' + fmt(c2x) + ' ' + fmt(c2y) + ' ' + fmt(p2[0]) + ' ' + fmt(p2[1]);
    }
    return d + ' Z';
  }
  /* Offene Kurve durch alle Punkte */
  function smoothOpen(pts, tension) {
    var t = tension == null ? 0.9 : tension, n = pts.length, d = 'M' + fmt(pts[0][0]) + ' ' + fmt(pts[0][1]);
    for (var i = 0; i < n - 1; i++) {
      var p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, n - 1)];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6 * t, c1y = p1[1] + (p2[1] - p0[1]) / 6 * t;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6 * t, c2y = p2[1] - (p3[1] - p1[1]) / 6 * t;
      d += ' C' + fmt(c1x) + ' ' + fmt(c1y) + ' ' + fmt(c2x) + ' ' + fmt(c2y) + ' ' + fmt(p2[0]) + ' ' + fmt(p2[1]);
    }
    return d;
  }

  /**
   * Baut die Karte in ein <svg>.
   * @param {SVGElement} svg
   * @param {Array} stationen  Objekte mit id, nr, stadt, lon, lat
   * @param {Object} opts     { compact: bool }
   * @returns API { setProgress(0..1), lightUpTo(index), total, cityLen[] }
   */
  window.buildMap = function (svg, stationen, opts) {
    opts = opts || {};
    svg.innerHTML = '';
    svg.classList.add('map');

    var gLand = el('g', { 'class': 'lands' }, svg);
    ['DE', 'AT', 'CH'].forEach(function (c) {
      var pts = OUTLINES[c].map(function (p) { return [X(p[0]), Y(p[1])]; });
      el('path', { 'class': 'land land--' + c, d: smoothClosed(pts, 0.6) }, gLand);
    });
    if (!opts.compact) {
      for (var c in LABELS) {
        var L = LABELS[c];
        var tx = el('text', { 'class': 'land-label', x: fmt(X(L[0])), y: fmt(Y(L[1])) }, svg);
        tx.textContent = L[2];
      }
    }

    var pts = stationen.map(function (s) { return [X(s.lon), Y(s.lat)]; });
    var d = smoothOpen(pts, 0.8);
    var gRoute = el('g', { 'class': 'routes' }, svg);
    el('path', { 'class': 'route-shadow', d: d }, gRoute);
    el('path', { 'class': 'route-line', d: d }, gRoute);           /* gepunktete Vorschau */
    var draw = el('path', { 'class': 'route-draw', d: d }, gRoute); /* wird "gezeichnet" */
    var total = draw.getTotalLength();
    draw.style.strokeDasharray = total + ' ' + total;
    draw.style.strokeDashoffset = total;

    /* Länge des Pfads an jeder Station bestimmen (Pfad läuft durch die Punkte) */
    var cityLen = [], steps = 1400, best = [];
    for (var i = 0; i < pts.length; i++) best.push([Infinity, 0]);
    for (var s = 0; s <= steps; s++) {
      var len = total * s / steps, p = draw.getPointAtLength(len);
      for (var j = 0; j < pts.length; j++) {
        var dx = p.x - pts[j][0], dy = p.y - pts[j][1], dd = dx * dx + dy * dy;
        if (dd < best[j][0]) best[j] = [dd, len];
      }
    }
    for (var k = 0; k < pts.length; k++) cityLen.push(best[k][1]);
    cityLen[0] = 0; cityLen[cityLen.length - 1] = total;

    var gCities = el('g', { 'class': 'cities' }, svg), cities = [];
    stationen.forEach(function (st, i) {
      var g = el('g', { 'class': 'city', 'data-id': st.id }, gCities);
      var x = fmt(pts[i][0]), y = fmt(pts[i][1]);
      el('circle', { 'class': 'city__halo', cx: x, cy: y, r: opts.compact ? 7 : 6 }, g);
      el('circle', { 'class': 'city__dot', cx: x, cy: y, r: opts.compact ? 6 : 7.5 }, g);
      if (!opts.compact) {
        var nr = el('text', { 'class': 'city__nr', x: x, y: (+y + 3.2) }, g);
        nr.textContent = st.nr;
        var a = ANCHOR[st.id] || 'e', lx = +x, ly = +y + 4, anchor = 'start';
        if (a === 'e') { lx = +x + 12; }
        if (a === 'w') { lx = +x - 12; anchor = 'end'; }
        if (a === 's') { ly = +y + 20; anchor = 'middle'; }
        if (a === 'n') { ly = +y - 12; anchor = 'middle'; }
        var lb = el('text', { 'class': 'city__label', x: fmt(lx), y: fmt(ly), 'text-anchor': anchor }, g);
        lb.textContent = st.stadt;
      }
      cities.push(g);
    });

    var traveller = el('circle', { 'class': 'traveller', r: opts.compact ? 7 : 6, cx: fmt(pts[0][0]), cy: fmt(pts[0][1]) }, svg);

    var api = {
      total: total,
      cityLen: cityLen,
      /* Fortschritt 0..1 der gezeichneten Route + Punkte, die schon erreicht sind */
      setProgress: function (p) {
        p = Math.max(0, Math.min(1, p));
        var len = total * p;
        draw.style.strokeDashoffset = total - len;
        var pt = draw.getPointAtLength(len);
        traveller.setAttribute('cx', fmt(pt.x));
        traveller.setAttribute('cy', fmt(pt.y));
        for (var i = 0; i < cities.length; i++) {
          var lit = len >= cityLen[i] - total * 0.012;
          if (lit !== cities[i].classList.contains('is-lit')) cities[i].classList.toggle('is-lit', lit);
        }
      },
      /* Fortschritt bis zu Station i (Index) */
      progressFor: function (i) { return i < 0 ? 0 : cityLen[Math.min(i, cityLen.length - 1)] / total; }
    };
    api.setProgress(0);
    return api;
  };
})();
