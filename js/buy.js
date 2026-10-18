/* Buy page: WhatsApp order link + access-code gate (SHA-256 vs data/codes.json) */
(function(){
  "use strict";
  // >>> OWNER: apna WhatsApp number yahan likhein (country code ke saath, bina + ke), masalan "923001234567"
  var WHATSAPP_NUMBER = "923101021797";

  var waBtn = document.getElementById('waOrder');
  var msg = "Assalam-o-Alaikum! Mujhe 30-Din Business Launch Kit khareedna hai (Rs 4,997). Mera naam: ";
  waBtn.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);

  var input = document.getElementById('codeInput');
  var btn = document.getElementById('unlockBtn');
  var msgEl = document.getElementById('codeMsg');

  function norm(s){ return (s||"").toUpperCase().replace(/[^A-Z0-9]/g,""); }
  function sha256hex(str){
    var buf = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', buf).then(function(h){
      return Array.prototype.map.call(new Uint8Array(h), function(b){
        return ('0'+b.toString(16)).slice(-2);
      }).join('');
    });
  }
  function say(t, cls){ msgEl.textContent = t; msgEl.className = 'code-msg ' + (cls||''); }

  btn.addEventListener('click', function(){
    var code = norm(input.value);
    if(code.length < 8){ say('Code kam az kam 8 harf ka hota hai — dobara check karein.', 'err'); return; }
    say('Check ho raha hai…', '');
    btn.disabled = true;
    fetch('data/codes.json').then(function(r){
      if(!r.ok) throw new Error('codes file missing');
      return r.json();
    }).then(function(data){
      return sha256hex(code).then(function(hex){
        var ok = (data.hashes||[]).indexOf(hex) !== -1;
        btn.disabled = false;
        if(ok){
          try{ sessionStorage.setItem('ldk_access','1'); }catch(e){}
          say('Mubarak ho! Members area khul raha hai…', 'ok');
          setTimeout(function(){ window.location.href = 'members/'; }, 900);
        } else {
          say('Ye code theek nahi lag raha. WhatsApp par mila hua code bilkul waisa hi likhein.', 'err');
        }
      });
    }).catch(function(){
      btn.disabled = false;
      say('Kuch technical masla hua — page refresh karke dobara try karein.', 'err');
    });
  });
  input.addEventListener('keydown', function(e){ if(e.key==='Enter') btn.click(); });
})();
