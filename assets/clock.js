(function () {
  function pad(n) { return String(n).padStart(2, '0'); }
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  function tick() {
    const el = document.querySelector('.menubar .clock');
    if (!el) return;
    const d = new Date();
    el.textContent = (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + days[d.getDay()] + ' ' + d.getHours() + ':' + pad(d.getMinutes());
  }
  tick();
  setInterval(tick, 10000);
})();
