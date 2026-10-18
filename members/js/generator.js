/* AI Copy Generator — client-side template engine (Roman Urdu + English) */
(function(){
  "use strict";

  var TYPES = {
    restaurant:{label:"Restaurant", sp:["mazedaar desi khane","taza aur garma garam dishes","ghar jaisa zaiqa"], en_sp:["delicious desi food","fresh, hygienic meals","authentic home-style taste"]},
    salon:{label:"Salon", sp:["stylish haircut aur grooming","dulhan makeup aur facial","saaf suthra mahol"], en_sp:["stylish haircuts & grooming","bridal makeup & facials","clean, comfortable salon"]},
    clinic:{label:"Clinic", sp:["tajurba-kar doctor","munasib fees me ilaaj","mareezon ki dekhbhaal"], en_sp:["experienced doctor","affordable treatment","caring patient service"]},
    kapra:{label:"Kapre ki Dukaan", sp:["naye design ke kapre","munasib qeemat","har size dastiyab"], en_sp:["latest designs","fair prices","all sizes available"]},
    kiryana:{label:"Kiryana Store", sp:["roz marra ki har cheez","munasib qeemat","ghar bethay order"], en_sp:["daily essentials","fair prices","order from home"]},
    property:{label:"Property Dealer", sp:["etehad wali deals","har budget ke plots","mukammal rehnumai"], en_sp:["trusted deals","plots for every budget","complete guidance"]},
    mobile:{label:"Mobile Shop", sp:["asal mobiles aur accessories","munasib qeemat","repair ki sahulat"], en_sp:["genuine mobiles & accessories","fair prices","repair service"]},
    bakery:{label:"Bakery", sp:["taza cakes aur mithaas","order par tayyar","munasib qeemat"], en_sp:["fresh cakes & sweets","made to order","fair prices"]},
    tailor:{label:"Tailor", sp:["naap ka perfect kaam","waqt par delivery","naye design"], en_sp:["perfect fitting","on-time delivery","latest designs"]},
    general:{label:"Dukaan", sp:["mayari cheezein","munasib qeemat","khush akhlaq service"], en_sp:["quality products","fair prices","friendly service"]}
  };

  var TONE = {
    dostana:{
      open:["Dekho ji, {city} me agar {sp} chahiye to","{city} walon! {sp} ka asli pata —","Apne sheher {city} me {sp} dhoond rahe ho?"],
      close:["Aao, chai piyo, baat karo — bharosa khud ban jayega.","Ek dafa aakar dekho, phir khud faisla karo.","Hum yahin hain, aap ke apne — zaroor tashreef lao."],
      cta:["Aaj hi WhatsApp par rabta karein!","Order ke liye abhi message karein.","Tashreef laiye — intezar rahega!"],
      offer_pre:["Khaas offer sirf aap ke liye!","Dhamaka offer — mehdood muddat!","Khushkhabri {city} walon!"]
    },
    professional:{
      open:["{city} me {sp} ke liye etemad ka naam —","Mayar aur etemad — {city} me {sp} ka behtareen intekhab.","{city} ke customers ke liye {sp} me numaya mayar —"],
      close:["Hum mayar par samjhota nahi karte.","Aap ka etemad hi hamari kamyabi hai.","Professional service, har dafa."],
      cta:["Mazeed maloomat ke liye rabta karein.","Visit karein ya WhatsApp par order dein.","Aaj hi tashreef laiye."],
      offer_pre:["Mehdood muddat ki khaas peshkash:","Hamari nayi offer se faida uthaiye:","Khaas customers ke liye:"]
    },
    dhamakedaar:{
      open:["🔥 {city} me dhamaka! {sp} ab naye andaaz me —","Suno suno {city} walon! {sp} ka sab se bara naam —","Taiyaar ho jao {city}! {sp} me sab se aage —"],
      close:["Ye mauqa haath se na jane do!","Pehle aao, pehle pao — stock mehdood!","Der kis baat ki? Abhi aao!"],
      cta:["ABHI order karo — der na karo!","Foran WhatsApp karo, offer pakki karo!","Aaj hi aao — kal pachtao ge nahi!"],
      offer_pre:["💥 DHAMAKA OFFER 💥","🔥 SAB SE BARI OFFER 🔥","⚡ FLASH SALE ⚡"]
    }
  };

  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function fill(s, m){ return s.replace(/\{(\w+)\}/g, function(_,k){ return m[k]||""; }); }

  var tone = "dostana";
  document.getElementById('toneRow').addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return;
    this.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); });
    b.classList.add('on'); tone = b.dataset.t;
  });

  function generate(){
    var name = (document.getElementById('gName').value||"").trim() || "Hamari Dukaan";
    var type = document.getElementById('gType').value;
    var city = (document.getElementById('gCity').value||"").trim() || "aap ke sheher";
    var offer = (document.getElementById('gOffer').value||"").trim();
    var T = TYPES[type]||TYPES.general, TN = TONE[tone];
    var sp = pick(T.sp), en_sp = pick(T.en_sp);
    var m = {name:name, city:city, sp:sp};

    var offerUr = offer ? ("Khaas baat: "+offer+".") : "";
    var shortUr = fill(pick(TN.open), m)+" "+name+". "+offerUr+" "+fill(pick(TN.close), m);
    var longUr = fill(pick(TN.open), m)+" "+name+" — yahan aapko milega "+sp+", "+pick(T.sp)+
      (offer ? " aur khaas tor par "+offer : "")+". Hum "+city+" me apne customers ka bharosa jeet chuke hain. "+
      fill(pick(TN.close), m)+" "+fill(pick(TN.cta), m);
    var enOffer = offer ? ("Special: "+offer+".") : "";
    var enDesc = "Looking for "+en_sp+" in "+city+"? "+name+" is your trusted choice — "+pick(T.en_sp)+
      (offer ? " and "+offer : "")+". Quality you can rely on, prices you'll love. "+
      (tone==="dhamakedaar" ? "Don't miss out — visit us today!" : tone==="dostana" ? "Come visit us — you'll love it here!" : "Contact us for more details.");
    var promo = fill(pick(TN.offer_pre), m)+"\n"+name+" — "+city+"\n"+
      (offer ? "✨ "+offer+"\n" : "✨ "+sp+"\n")+
      fill(pick(TN.cta), m)+"\n\n"+fill(pick(TN.offer_pre), {city:city})+"\n"+name+" | "+city;

    document.getElementById('outShort').textContent = shortUr.replace(/\s+/g," ").trim();
    document.getElementById('outLong').textContent = longUr.replace(/\s+/g," ").trim();
    document.getElementById('outEn').textContent = enDesc.replace(/\s+/g," ").trim();
    document.getElementById('outPromo').textContent = promo;
    document.getElementById('genOut').style.display = 'block';
    document.getElementById('genOut').scrollIntoView({behavior:'smooth', block:'start'});
  }

  document.getElementById('genBtn').addEventListener('click', generate);
  document.getElementById('regenBtn').addEventListener('click', generate);
  document.querySelectorAll('.copybtn[data-for]').forEach(function(b){
    b.addEventListener('click', function(){
      var txt = document.getElementById(b.dataset.for).textContent;
      function done(){ b.textContent='✓ Copy Ho Gaya'; setTimeout(function(){ b.textContent='📋 Copy'; },1500); }
      if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(done).catch(done); }
      else done();
    });
  });
})();
