/*
 * Home-page hero animation: a compact binary inspiral, merger and ringdown,
 * with the outgoing gravitational-wave pattern drawn as a field around it.
 *
 * Toy model (not a waveform model, just the right shape):
 *   tau = t_merger - t_retarded              time to merger
 *   orbital phase  phi(tau) = phi_c - C * tau^(5/8)      -> f ~ tau^(-3/8)
 *   separation     a(tau)   = a0 * (tau / T_insp)^(1/4)
 *   amplitude      A(tau)   ~ 1 / a(tau)
 *   field          h(r, theta, t) = A(t - r/c) / (r + r0) * cos(2 theta - 2 phi(t - r/c))
 * After merger the signal rings down exponentially, then the cycle repeats.
 * Every pixel uses its own retarded time, so waves keep travelling outwards
 * smoothly across cycle boundaries.
 *
 * Usage: <canvas class="gw-hero"></canvas> + this script (defer).
 */
(function () {
  "use strict";

  var canvas = document.querySelector("canvas.gw-hero");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  // ---- Parameters (times in seconds, lengths in units of the circle radius)
  var PERIOD = 10.0;      // length of one inspiral-merger-ringdown cycle
  var T_INSP = 7.0;       // inspiral duration (merger happens at t = T_INSP in each cycle)
  var TAU_MIN = 0.08;     // stop the chirp just before the formal merger
  var C_PHASE = 5.2;      // sets the initial orbital frequency
  var A0 = 0.30;          // initial separation
  var WAVE_SPEED = 0.38;  // outward speed of the pattern
  var R0 = 0.16;          // softening of the 1/r fall-off near the centre
  var RD_TIME = 0.45;     // ringdown decay time
  var FIELD_RES = 150;    // resolution of the field grid (upscaled smoothly)
  var GAIN = 0.10;        // contrast of the wave pattern
  var GRID_N = 22;        // spacetime-mesh lines per direction
  var GRID_WARP = 0.035;  // how strongly the waves distort the mesh

  var PHI_MIN = -C_PHASE * Math.pow(TAU_MIN, 5 / 8);
  var OMEGA_MIN = (5 / 8) * C_PHASE * Math.pow(TAU_MIN, -3 / 8);
  var OMEGA_RD = 1.25 * OMEGA_MIN;

  // Orbital phase, separation and amplitude at time t (seconds since start)
  function source(t) {
    var k = Math.floor(t / PERIOD);
    var tc = t - k * PERIOD;                 // time within cycle
    var cyclePhase = k * 2.399;              // rotate each cycle a bit (golden angle)
    var tau = T_INSP - tc;
    var fadeIn = Math.min(1, tc / 1.0);
    fadeIn = fadeIn * fadeIn * (3 - 2 * fadeIn);

    if (tau > TAU_MIN) {
      var x = tau / T_INSP;
      return {
        phase: cyclePhase - C_PHASE * Math.pow(tau, 5 / 8),
        sep: A0 * Math.pow(x, 0.25),
        amp: fadeIn * Math.min(2.4, Math.pow(x, -0.25)),
        merged: false, sinceMerger: -tau
      };
    }
    var s = TAU_MIN - tau;                   // time since end of the chirp
    var ampMerge = Math.min(2.4, Math.pow(TAU_MIN / T_INSP, -0.25));
    return {
      phase: cyclePhase + PHI_MIN + OMEGA_RD * s,
      sep: 0,
      amp: ampMerge * Math.exp(-s / RD_TIME),
      merged: true, sinceMerger: s
    };
  }

  // ---- Field buffer (precomputed polar coordinates)
  var field = document.createElement("canvas");
  field.width = field.height = FIELD_RES;
  var fctx = field.getContext("2d");
  var img = fctx.createImageData(FIELD_RES, FIELD_RES);
  var N = FIELD_RES * FIELD_RES;
  var rr = new Float32Array(N), th = new Float32Array(N);
  for (var j = 0; j < FIELD_RES; j++) {
    for (var i = 0; i < FIELD_RES; i++) {
      var x = (i + 0.5) / FIELD_RES * 2 - 1, y = (j + 0.5) / FIELD_RES * 2 - 1;
      rr[j * FIELD_RES + i] = Math.sqrt(x * x + y * y);
      th[j * FIELD_RES + i] = Math.atan2(y, x);
    }
  }

  // Retarded-time samples are cached per radius bin (field is a function of r only
  // through the retarded time), which keeps the per-pixel work to one cosine.
  var RBINS = 256;
  var binPhase = new Float32Array(RBINS), binAmp = new Float32Array(RBINS);
  var binOf = new Uint16Array(N);
  for (var p = 0; p < N; p++) binOf[p] = Math.min(RBINS - 1, Math.floor(rr[p] / 1.45 * RBINS));

  function drawField(t) {
    for (var b = 0; b < RBINS; b++) {
      var r = (b + 0.5) / RBINS * 1.45;
      var s = source(t - r / WAVE_SPEED);
      binPhase[b] = s.phase;
      binAmp[b] = s.amp / (r + R0);
    }
    var d = img.data;
    for (var q = 0; q < N; q++) {
      var bb = binOf[q];
      var h = binAmp[bb] * Math.cos(2 * th[q] - 2 * binPhase[bb]) * GAIN;
      if (h > 1) h = 1; else if (h < -1) h = -1;
      // dark navy base; crests brighten towards cyan-blue, troughs darken
      var I = 0.36 + 0.64 * h;
      var k = q * 4;
      d[k]     = 3 + 26 * I * I;
      d[k + 1] = 10 + 80 * I;
      d[k + 2] = 28 + 170 * I;
      d[k + 3] = 255;
    }
    fctx.putImageData(img, 0, 0);
  }

  // Field value at an arbitrary point (x, y in units of the radius), using the
  // per-radius retarded-time cache filled by drawField().
  function hAt(x, y) {
    var r = Math.sqrt(x * x + y * y);
    var b = Math.min(RBINS - 1, Math.floor(r / 1.45 * RBINS));
    return binAmp[b] * Math.cos(2 * Math.atan2(y, x) - 2 * binPhase[b]) * GAIN;
  }

  // Faint square mesh, displaced by the wave (a cartoon of the "stretch and squeeze")
  function drawMesh() {
    var R = W / 2, steps = 48;
    ctx.lineWidth = Math.max(1, W / 400);
    ctx.strokeStyle = "rgba(150, 190, 255, 0.22)";
    for (var dir = 0; dir < 2; dir++) {
      for (var g = 0; g <= GRID_N; g++) {
        var u = g / GRID_N * 2 - 1;
        ctx.beginPath();
        for (var k = 0; k <= steps; k++) {
          var v = k / steps * 2 - 1;
          var x = dir ? u : v, y = dir ? v : u;
          var h = hAt(x, y);
          var px = x * (1 + GRID_WARP * h / (Math.abs(h) + 0.6) * 4), py = y * (1 - GRID_WARP * h / (Math.abs(h) + 0.6) * 4);
          var X = R + px * R, Y = R + py * R;
          k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
        }
        ctx.stroke();
      }
    }
  }

  function glow(x, y, rad, alpha) {
    var g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, "rgba(255,255,255," + alpha + ")");
    g.addColorStop(0.25, "rgba(200,225,255," + (0.85 * alpha) + ")");
    g.addColorStop(1, "rgba(120,170,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, 2 * Math.PI);
    ctx.fill();
  }

  // ---- Sizing (sharp on high-DPI screens)
  var W = 0, H = 0;
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width * dpr));
    H = Math.max(1, Math.round(rect.height * dpr));
    canvas.width = W; canvas.height = H;
  }

  function render(t) {
    drawField(t);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(field, 0, 0, W, H);
    drawMesh();

    var R = W / 2, cx = W / 2, cy = H / 2;
    var s = source(t);
    if (!s.merged) {
      // unequal masses (q = 0.6): lighter body on the larger orbit
      var r1 = s.sep * 0.375 * R, r2 = s.sep * 0.625 * R;
      var c = Math.cos(s.phase), n = Math.sin(s.phase);
      glow(cx + r1 * c, cy + r1 * n, 0.085 * R, 1.0);
      glow(cx - r2 * c, cy - r2 * n, 0.065 * R, 0.95);
    } else {
      var flash = Math.exp(-s.sinceMerger / 0.25);
      glow(cx, cy, (0.10 + 0.35 * flash) * R, 0.6 + 0.4 * flash);
    }
  }

  // ---- Animation loop: pause when off-screen or in a background tab
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var visible = true, running = false, t0 = null, tPaused = 2.0;  // start with waves already present

  function frame(now) {
    if (!running) return;
    if (t0 === null) t0 = now - tPaused * 1000;
    render((now - t0) / 1000);
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true; t0 = null;
    requestAnimationFrame(frame);
  }
  function stop() {
    if (!running) return;
    running = false;
    tPaused = (performance.now() - (t0 || performance.now())) / 1000;
  }

  resize();
  render(4.5);  // a mid-inspiral still frame (also the reduced-motion view)
  window.addEventListener("resize", function () { resize(); if (!running) render(tPaused || 4.5); });
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(canvas);
  }
  start();
})();
