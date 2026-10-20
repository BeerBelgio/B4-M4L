/* V0.9 homepage editor adapted from B4M4L-MAX-HERO-POC. Geometry lives in max-cords.js. */
(() => {
  'use strict';
  const root = document.querySelector('#patch-system');
  if (!root) return;
  const canvas = document.querySelector('#patch-canvas');
  const nodes = [...canvas.querySelectorAll('[data-node]')];
  const editButton = document.querySelector('#edit-toggle');
  const resetButton = document.querySelector('#reset-layout');
  const status = document.querySelector('#layout-status');
  const controls = document.querySelector('#layout-controls');
  const media = matchMedia('(min-width: 1000px) and (pointer: fine)');
  const GAP = 18;
  const EDGE = 14;
  let editable = false, locked = false, active = null, z = 2;
  let lastWidth = 0, lastHeight = 0, announceTimer;
  const DEFAULT = window.B4M4L_DEFAULT_LAYOUT;
  const storageKey = 'b4m4l.hero.session.v1.' + (document.body.dataset.demoCatalogue ? 'demo' : 'main') + '.layout' + DEFAULT.layoutVersion;
  let preferred = null, storageAvailable = true;
  const reasons = new Set();
  function note(reason) { if (!reasons.has(reason)) { reasons.add(reason); console.info('[B4~M4L layout]', reason); } }
  const rects = new Map();
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function announce(text) {
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => { status.textContent = text; }, 100);
  }
  function apply(el, r) {
    rects.set(el, { ...r });
    Object.assign(el.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' });
  }
  function contentHeight(el, width) {
    const content = el.querySelector('.object-content');
    const oldWidth = el.style.width, oldHeight = el.style.height, oldFlex = content.style.flex;
    el.style.width = width + 'px'; el.style.height = 'auto'; content.style.flex = '0 0 auto';
    const h = content.scrollHeight + (el.dataset.node === 'wordmark' ? 30.6 : 36); // reserve the unlocked handle and native frame, even while locked
    el.style.width = oldWidth; el.style.height = oldHeight; content.style.flex = oldFlex;
    return Math.max(Number(el.dataset.minHeight), h);
  }
  function overlapping(a, b) {
    return a.x < b.x + b.w + GAP && a.x + a.w + GAP > b.x &&
      a.y < b.y + b.h + GAP && a.y + a.h + GAP > b.y;
  }
  function allowed(el, r) {
    return nodes.every(other => other === el || !overlapping(r, rects.get(other)));
  }
  function valid(config) {
    if (!config || config.schema !== 'b4m4l.hero-layout' || config.schemaVersion !== 1 || config.layoutVersion !== DEFAULT.layoutVersion ||
        config.container?.id !== canvas.id || config.container.coordinateSpace !== 'normalized' || !Array.isArray(config.nodes) || config.nodes.length !== nodes.length) return false;
    const ids = new Set();
    for (const r of config.nodes) {
      if (!nodes.some(el => el.dataset.node === r.id) || ids.has(r.id)) return false;
      ids.add(r.id);
      if (!['x','y','width','height'].every(k => Number.isFinite(r[k])) || r.x < 0 || r.y < 0 || r.width <= 0 || r.height <= 0 || r.x > 1 || r.y > 1 || r.width > 1 || r.height > 1) return false;
    }
    return true;
  }
  function currentConfig() {
    return {
      schema: 'b4m4l.hero-layout', schemaVersion: 1, siteVersion: '0.13-rc.1', layoutVersion: DEFAULT.layoutVersion,
      container: { id: canvas.id, coordinateSpace: 'normalized', referenceWidth: canvas.clientWidth, referenceHeight: canvas.clientHeight },
      nodes: nodes.map(el => {
        const r = rects.get(el), round = n => Math.round(n * 1e8) / 1e8;
        return { id: el.dataset.node, x: round(r.x / canvas.clientWidth), y: round(r.y / canvas.clientHeight), width: round(r.w / canvas.clientWidth), height: round(r.h / canvas.clientHeight) };
      })
    };
  }
  function readSession() {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (valid(parsed)) return parsed;
      sessionStorage.removeItem(storageKey); note('Saved layout schema or geometry is incompatible; using the reference default.');
    } catch (error) { storageAvailable = false; note('Session storage is unavailable or unreadable; editing still works in memory.'); }
    return null;
  }
  function persist() {
    if (!editable) return;
    preferred = currentConfig();
    try { sessionStorage.setItem(storageKey, JSON.stringify(preferred)); }
    catch (error) { storageAvailable = false; note('Session storage is unavailable; this layout lasts until this document is closed.'); }
  }
  function fit(config) {
    const w = canvas.clientWidth, h = canvas.clientHeight, placed = [];
    const requested = [...config.nodes].sort((a,b) => a.y - b.y);
    for (const item of requested) {
      const el = nodes.find(n => n.dataset.node === item.id);
      const width = clamp(item.width * w, Number(el.dataset.minWidth), w - EDGE * 2);
      const height = Math.max(item.height * h, contentHeight(el, width));
      if (height > h - EDGE * 2) return null;
      const r = { x: clamp(item.x*w, EDGE, w-EDGE-width), y: clamp(item.y*h, EDGE, h-EDGE-height), w: width, h: height };
      if (placed.some(p => overlapping(r,p.r))) {
        const xs = [r.x, EDGE, w-EDGE-r.w, ...placed.flatMap(p => [p.r.x-r.w-GAP,p.r.x+p.r.w+GAP])];
        const ys = [r.y, EDGE, h-EDGE-r.h, ...placed.flatMap(p => [p.r.y-r.h-GAP,p.r.y+p.r.h+GAP])];
        const candidates = xs.flatMap(x => ys.map(y => ({...r,x,y}))).filter(c => c.x>=EDGE && c.y>=EDGE && c.x+c.w<=w-EDGE && c.y+c.h<=h-EDGE && !placed.some(p => overlapping(c,p.r)));
        candidates.sort((a,b) => Math.hypot(a.x-r.x,a.y-r.y)-Math.hypot(b.x-r.x,b.y-r.y));
        if (!candidates.length) return null;
        Object.assign(r,candidates[0]);
      }
      placed.push({el,r});
    }
    return placed;
  }
  function restoreLayout(config) {
    cancelGesture(true);
    if (!editable) return schedule();
    let fitted = valid(config) ? fit(config) : null;
    if (!fitted) { note('Layout cannot fit this viewport; using the reference default.'); fitted = fit(DEFAULT); }
    if (!fitted) { note('Viewport is too constrained for free editing.'); return; }
    for (const {el,r} of fitted) { apply(el,r); el.style.zIndex=''; el.classList.remove('is-selected'); }
    lastWidth=canvas.clientWidth; lastHeight=canvas.clientHeight;
    root.dataset.layoutWidth=String(lastWidth); schedule();
  }
  function initialLayout() {
    preferred = null;
    try { sessionStorage.removeItem(storageKey); } catch (error) { storageAvailable=false; }
    restoreLayout(DEFAULT);
  }
  function select(el) {
    nodes.forEach(n => n.classList.toggle('is-selected', n === el));
    el.style.zIndex = String(++z);
  }
  function propose(el, r, mode) {
    const maxW = canvas.clientWidth - EDGE;
    const maxH = canvas.clientHeight - EDGE;
    if (mode === 'resize') {
      r.w = clamp(r.w, Math.min(Number(el.dataset.minWidth), maxW - r.x), maxW - r.x);
      const minH = contentHeight(el, r.w);
      if (minH > maxH - r.y) return false;
      r.h = clamp(r.h, minH, maxH - r.y);
    } else {
      r.x = clamp(r.x, EDGE, maxW - r.w);
      r.y = clamp(r.y, EDGE, maxH - r.h);
    }
    if (!allowed(el, r)) return false;
    apply(el, r);
    schedule();
    return true;
  }
  function begin(e) {
    const handle = e.target.closest('.drag-handle, .resize-handle');
    if (!handle || !editable || locked || active || e.button !== 0 || !e.isPrimary) return;
    const el = handle.closest('[data-node]');
    select(el);
    handle.focus({ preventScroll: true });
    active = { el, handle, id: e.pointerId, startX: e.clientX, startY: e.clientY,
      origin: { ...rects.get(el) }, mode: handle.classList.contains('resize-handle') ? 'resize' : 'move',
      scaleX: canvas.getBoundingClientRect().width / canvas.clientWidth,
      scaleY: canvas.getBoundingClientRect().height / canvas.clientHeight };
    handle.setPointerCapture(e.pointerId);
    el.classList.add('is-dragging');
    e.preventDefault();
  }
  function move(e) {
    if (!active || e.pointerId !== active.id) return;
    const { el, origin, startX, startY, mode, scaleX, scaleY } = active;
    const dx = (e.clientX - startX) / scaleX, dy = (e.clientY - startY) / scaleY;
    propose(el, mode === 'move' ? { ...origin, x: origin.x + dx, y: origin.y + dy } :
      { ...origin, w: origin.w + dx, h: origin.h + dy }, mode);
  }
  function cancelGesture(restore = false) {
    if (!active) return;
    const previous = active;
    active = null; // lostpointercapture can fire synchronously.
    if (restore) apply(previous.el, previous.origin);
    previous.el.classList.remove('is-dragging');
    if (previous.handle.hasPointerCapture(previous.id)) previous.handle.releasePointerCapture(previous.id);
    schedule();
  }
  function finish(e) {
    if (!active || active.id !== e.pointerId) return;
    const name = active.el.dataset.node;
    cancelGesture(e.type === 'pointercancel');
    if (e.type !== 'pointercancel') persist();
    announce(name + (e.type === 'pointercancel' ? ': change cancelled.' : ': layout updated.'));
  }
  canvas.addEventListener('pointerdown', begin);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', finish);
  canvas.addEventListener('pointercancel', finish);
  canvas.addEventListener('lostpointercapture', () => cancelGesture(true));
  canvas.addEventListener('keydown', e => {
    if (e.key === 'Escape' && active) { cancelGesture(true); announce('Change cancelled.'); return; }
    const handle = e.target.closest('.drag-handle, .resize-handle');
    if (!handle || !editable || locked || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const el = handle.closest('[data-node]');
    select(el);
    const r = { ...rects.get(el) }, step = e.shiftKey ? 24 : 8;
    const dx = e.key === 'ArrowRight' ? step : e.key === 'ArrowLeft' ? -step : 0;
    const dy = e.key === 'ArrowDown' ? step : e.key === 'ArrowUp' ? -step : 0;
    const mode = handle.classList.contains('resize-handle') ? 'resize' : 'move';
    if (mode === 'resize') { r.w += dx; r.h += dy; } else { r.x += dx; r.y += dy; }
    const ok = propose(el, r, mode);
    if (ok) persist();
    announce(ok ? `${el.dataset.node}: ${Math.round(r.x)}, ${Math.round(r.y)}; ${Math.round(r.w)} by ${Math.round(r.h)} pixels.` : 'Space reserved for another object.');
  });
  canvas.addEventListener('focusin', e => {
    const el = e.target.closest('[data-node]');
    if (el && editable && !locked) select(el);
  });
  function updateLock() {
    root.classList.toggle('is-unlocked', editable && !locked);
    document.body.classList.toggle('max-layout-editing', editable && !locked);
    editButton.setAttribute('aria-pressed', String(locked));
    editButton.setAttribute('aria-label', locked ? 'Unlock layout' : 'Lock layout');
    editButton.title = locked ? 'Unlock layout' : 'Lock layout';
    nodes.forEach(el => {
      el.querySelectorAll('.drag-handle,.resize-handle').forEach(h => { h.disabled = !editable || locked; });
      el.classList.remove('is-selected');
    });
    schedule();
  }
  editButton.addEventListener('click', () => {
    cancelGesture(true); locked = !locked; updateLock();
    announce(locked ? 'Layout locked.' : 'Layout unlocked. Use handles or arrow keys to edit.');
  });
  resetButton.addEventListener('click', () => { initialLayout(); announce('Initial layout restored.'); });
  function setMode() {
    cancelGesture(true); editable = media.matches;
    root.dataset.layoutMode = editable ? 'desktop' : 'fixed';
    root.classList.toggle('is-layout-capable', editable);
    controls.hidden = !editable;
    nodes.forEach(el => { if (!editable) el.removeAttribute('style'); });
    updateLock(); restoreLayout(preferred || DEFAULT);
  }
  function reflow() {
    if (editable && (Math.abs(canvas.clientWidth - lastWidth) > .5 || Math.abs(canvas.clientHeight - lastHeight) > .5)) restoreLayout(preferred || DEFAULT);
    schedule();
  }
  function schedule() { root.dispatchEvent(new Event('patch:layout')); }
  const observer = 'ResizeObserver' in window ? new ResizeObserver(reflow) : null;
  [canvas,...nodes].forEach(el => observer?.observe(el));
  media.addEventListener('change',setMode);
  window.addEventListener('resize',reflow);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('blur',() => cancelGesture(true));
  window.addEventListener('pageshow',schedule);
  window.visualViewport?.addEventListener('resize',reflow);
  document.fonts?.ready.then(() => { if (editable) restoreLayout(preferred || DEFAULT); else schedule(); });
  preferred = readSession();
  setMode();
})();
