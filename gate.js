/* ══════════════════════════════════════════
   访问密码门(Will & Elena 小站)
   · 修改密码:算好新密码的哈希,替换 HASH 常量
     (让 Jarvis 帮你算,或者运行:
      node -e "function djb2(s){var h=5381;for(var i=0;i<s.length;i++){h=((h<<5)+h+s.charCodeAt(i))>>>0;}return h.toString(36);}var salt='wne2026elena';var p='你的新密码';console.log(djb2(djb2(salt+p+salt)+'x'+salt))"
     把输出的值填到下面 HASH 里)
   ══════════════════════════════════════════ */
(function(){
  var HASH = '1mnzxbx';           // 当前密码:20260618(纪念日)
  var SALT = 'wne2026elena';

  function djb2(s){
    var h = 5381;
    for(var i=0;i<s.length;i++){ h = ((h<<5)+h+s.charCodeAt(i))>>>0; }
    return h.toString(36);
  }
  function check(pwd){
    var h1 = djb2(SALT + pwd + SALT);
    return djb2(h1 + 'x' + SALT) === HASH;
  }

  // 本地打开(file://)不设密码,方便预览;线上才需要密码
  if(location.protocol === 'file:'){ return; }

  // 立即插入遮罩(防止内容闪现)
  document.write(
    '<div id="wneGate" style="position:fixed;inset:0;z-index:9999;background:#faf7f2;display:flex;align-items:center;justify-content:center;font-family:PingFang SC,Microsoft YaHei,sans-serif;">' +
      '<div style="text-align:center;padding:40px 32px;background:#fffdf9;border:1px solid #e8dfd3;border-radius:16px;max-width:340px;width:88%;box-shadow:0 8px 30px rgba(61,53,46,.08);">' +
        '<div style="font-size:12px;letter-spacing:.3em;color:#c0795f;margin-bottom:10px;">OUR LITTLE PLACE</div>' +
        '<div style="font-family:Noto Serif SC,Songti SC,serif;font-size:22px;color:#3d352e;margin-bottom:6px;">Will &amp; Elena</div>' +
        '<div style="font-size:13px;color:#8a7d70;margin-bottom:22px;">输入我们的密码，进来吧</div>' +
        '<input id="wnePwd" type="password" placeholder="密码" style="width:100%;padding:11px 14px;border:1px solid #e8dfd3;border-radius:8px;font-size:15px;color:#3d352e;background:#fff;outline:none;box-sizing:border-box;" autocomplete="off">' +
        '<div id="wneErr" style="font-size:12px;color:#c0795f;margin-top:8px;height:16px;"></div>' +
        '<button id="wneBtn" style="width:100%;margin-top:6px;padding:11px;border:none;border-radius:8px;background:#c0795f;color:#fff;font-size:15px;cursor:pointer;">进入</button>' +
        '<div style="font-size:11px;color:#b8aa99;margin-top:14px;">提示：纪念日试试</div>' +
      '</div>' +
    '</div>'
  );

  window.addEventListener('DOMContentLoaded', function(){
    var gate = document.getElementById('wneGate');
    var pwd = document.getElementById('wnePwd');
    var btn = document.getElementById('wneBtn');
    var err = document.getElementById('wneErr');

    function enter(){
      if(check(pwd.value)){
        try{ localStorage.setItem('wne_gate', '1'); }catch(e){}
        gate.style.display = 'none';
      }else{
        err.textContent = '密码不对哦，再想想～';
        pwd.value = '';
        pwd.focus();
      }
    }
    btn.addEventListener('click', enter);
    pwd.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ enter(); } });

    // 已记住(同一浏览器打开过)直接进入
    try{
      if(localStorage.getItem('wne_gate') === '1'){ gate.style.display = 'none'; }
      else{ pwd.focus(); }
    }catch(e){ pwd.focus(); }
  });
})();
