(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'clickSparkCanvas';
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9998;display:block;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cfg = { sparkSize: 10, sparkRadius: 36, sparkCount: 10, duration: 460 };
  const colors = ['#F2619C', '#E78EF8', '#93ABD9', '#EDE986'];
  let sparks = [];

  function resize() {
    canvas.width = Math.max(1, window.innerWidth * dpr);
    canvas.height = Math.max(1, window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  const ease = t => t * (2 - t);

  function draw(ts) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    sparks = sparks.filter(s => {
      const elapsed = ts - s.start;
      if (elapsed >= cfg.duration) return false;
      const p = ease(elapsed / cfg.duration);
      const dist = p * cfg.sparkRadius;
      const len = cfg.sparkSize * (1 - p);
      const x1 = s.x + dist * Math.cos(s.angle);
      const y1 = s.y + dist * Math.sin(s.angle);
      const x2 = s.x + (dist + len) * Math.cos(s.angle);
      const y2 = s.y + (dist + len) * Math.sin(s.angle);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      return true;
    });
    if (sparks.length) requestAnimationFrame(draw);
  }

  document.addEventListener('click', e => {
    const now = performance.now();
    for (let i = 0; i < cfg.sparkCount; i++) {
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / cfg.sparkCount + Math.random() * 0.2,
        start: now,
        color: colors[i % colors.length]
      });
    }
    requestAnimationFrame(draw);
  });
})();
