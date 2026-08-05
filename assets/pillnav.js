(function () {
  const brand = document.querySelector('.menubar .brand');
  const items = [...document.querySelectorAll('.menubar a.menu-item')];
  if (!brand || !items.length) return;
  const nav = document.createElement('nav');
  items.forEach(a => nav.appendChild(a));
  brand.after(nav);
  const links = [...nav.querySelectorAll('a')];

  const pill = document.createElement('span');
  pill.className = 'pill';
  nav.appendChild(pill);

  const page = location.pathname.split('/').pop();
  const activeMap = {
    'index.html': '首页',
    'projects.html': '作品', 'copy.html': '作品', 'push.html': '作品',
    'newspaper.html': '作品', 'poster.html': '作品', 'red.html': '作品', 'video.html': '作品',
    'experience.html': '经历',
    'contact.html': '联系'
  };
  const activeEl = links.find(a => a.textContent.trim() === activeMap[page]) || null;
  if (activeEl) activeEl.classList.add('active');

  function place(el) {
    if (!el) { pill.style.opacity = '0'; return; }
    const navRect = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    pill.style.left = (r.left - navRect.left) + 'px';
    pill.style.width = r.width + 'px';
    pill.style.opacity = '1';
  }

  links.forEach(a => a.addEventListener('mouseenter', () => place(a)));
  nav.addEventListener('mouseleave', () => place(activeEl));
  window.addEventListener('resize', () => place(activeEl));
  place(activeEl);
})();
