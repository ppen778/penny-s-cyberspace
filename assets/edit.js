(function () {
  // ═══ 站内文字编辑（仅上线前给你自己用）═══
  // 上线时：把 ENABLED 改成 false，或直接删除所有页面里这行引用：
  //   <script src="assets/edit.js"></script>
  const ENABLED = false; // 已把修改写回文件，关闭站内编辑，避免旧缓存覆盖页面
  const PASSCODE = 'xintong2026'; // 你的个人密钥，可自行修改
  const LOCK_KEY = 'xintong-edit-unlocked';
  const SAVE_KEY = 'xintong-edits-v1';

  // 打开 index.html?reset-edit=1 可清除你在浏览器里保存的文字修改
  if (/[?&]reset-edit=1/.test(location.search)) {
    try { localStorage.removeItem(SAVE_KEY); localStorage.removeItem(LOCK_KEY); } catch (e) {}
  }

  function containers() {
    return [...document.querySelectorAll('.win .body, .page-win .body, .proj-hero')];
  }
  const keyFor = (el, i) => location.pathname.split('/').pop() + '#' + i;

  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
      containers().forEach((el, i) => {
        const k = keyFor(el, i);
        if (saved[k]) el.innerHTML = saved[k];
      });
    } catch (e) {}
  }

  function makeButton() {
    const btn = document.createElement('button');
    btn.id = 'editToggle';
    btn.textContent = '✏️ 编辑文字';
    btn.style.cssText =
      'position:fixed;right:18px;bottom:18px;z-index:96;' +
      'font:700 12px "Inter Tight","Microsoft YaHei",sans-serif;' +
      'border:1.5px solid #111;border-radius:10px;background:#fff;color:#111;' +
      'padding:9px 14px;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.18);';
    document.body.appendChild(btn);

    let editing = false;
    btn.addEventListener('click', () => {
      if (localStorage.getItem(LOCK_KEY) !== '1') {
        const code = prompt('输入编辑密钥（仅你本人使用）：');
        if (code !== PASSCODE) { alert('密钥错误'); return; }
        localStorage.setItem(LOCK_KEY, '1');
      }
      editing = !editing;
      containers().forEach(el => {
        el.contentEditable = editing ? 'true' : 'false';
        el.style.outline = editing ? '2px dashed #FF2D55' : '';
      });
      btn.textContent = editing ? '💾 保存文字' : '✏️ 编辑文字';
      btn.style.background = editing ? '#FF2D55' : '#fff';
      btn.style.color = editing ? '#fff' : '#111';
      if (!editing) {
        const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
        containers().forEach((el, i) => { saved[keyFor(el, i)] = el.innerHTML; });
        localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
        alert('已保存（保存在本浏览器，仅你自己可见；上线前我会帮你同步到文件）');
      }
    });

    // 导出按钮：把浏览器里保存的文字修改导出，方便发回给开发者写回文件
    const exportBtn = document.createElement('button');
    exportBtn.id = 'editExport';
    exportBtn.textContent = '📤 导出我的修改';
    exportBtn.style.cssText =
      'position:fixed;right:18px;bottom:58px;z-index:96;' +
      'font:700 12px "Inter Tight","Microsoft YaHei",sans-serif;' +
      'border:1.5px solid #111;border-radius:10px;background:#E78EF8;color:#fff;' +
      'padding:9px 14px;cursor:pointer;box-shadow:0 6px 16px rgba(0,0,0,.18);';
    document.body.appendChild(exportBtn);
    exportBtn.addEventListener('click', () => {
      const saved = localStorage.getItem(SAVE_KEY) || '{}';
      try {
        navigator.clipboard.writeText(saved).then(() => alert('已复制到剪贴板，请粘贴发给开发者')).catch(() => show(saved));
      } catch (e) {
        show(saved);
      }
      function show(text) {
        const ta = prompt('复制以下内容发给开发者：', text);
      }
    });
  }

  if (ENABLED) { restore(); makeButton(); }
})();
