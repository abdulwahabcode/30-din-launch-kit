/* Landing page interactions */
(function(){
  var faqs = [
    {q:"Main bilkul technical nahi hun. Kya main kar paunga?",
     a:"Bilkul. Ye kit isi liye bani hai — har step me bataya gaya hai ke phone par kya tap karna hai. Coding, designing, kuch nahi seekhna. Agar aap WhatsApp chala sakte hain, to ye kit chala sakte hain."},
    {q:"Mere paas website nahi hai. Kya phir bhi faida hoga?",
     a:"Ji haan — balki aap hi is kit ke asal customer hain. Pehle 2 hafte Google profile aur WhatsApp system par kaam hota hai; website (simple one-page) teesre hafte me aati hai, aur wo bhi free tools se."},
    {q:"Roz kitna time lagega?",
     a:"Roz sirf 25-30 minute. Har din ka sirf EK task hota hai — zyada nahi. Dukaan ke kaam ke saath aaram se ho jayega."},
    {q:"Payment kaise karun? Mere paas bank account nahi.",
     a:"Bank account ki zaroorat nahi. Easypaisa ya JazzCash se Rs 4,997 bhejein — jo number har Pakistani ke phone me hota hai. Payment ka screenshot WhatsApp par bhej dein, code mil jayega."},
    {q:"Access code kab milega?",
     a:"Aam tor par kuch ghanton me — jaise hi payment confirm hoti hai, aapko WhatsApp par aapka secret code bhej diya jata hai. Code isi site par enter karke members area khul jata hai."},
    {q:"Guarantee kaise kaam karti hai?",
     a:"30 din tak roadmap follow karein. Agar lage ke kit aapke kaam ki nahi, to 30 din ke andar ek WhatsApp message karein — poore Rs 4,997 wapas, koi sawal nahi."},
    {q:"Ye 'Website Launch Kit' se alag kya hai?",
     a:"Website Launch Kit un logon ke liye hai jo khud apni website banana chahte hain (DIY worksheets). 30-Din Kit poora online system hai — Google par aana, WhatsApp se customer lana, reviews, pehla ad — 30 din ka day-by-day plan."}
  ];
  var box = document.getElementById('faq');
  if(!box) return;
  faqs.forEach(function(f){
    var item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = '<button class="faq-q" type="button"><span>'+f.q+'</span><span class="pm">+</span></button>'+
                     '<div class="faq-a"><p>'+f.a+'</p></div>';
    var btn = item.querySelector('.faq-q');
    btn.addEventListener('click', function(){
      var open = item.classList.contains('open');
      box.querySelectorAll('.faq-item.open').forEach(function(o){
        o.classList.remove('open'); o.querySelector('.pm').textContent = '+';
      });
      if(!open){ item.classList.add('open'); item.querySelector('.pm').textContent = '−'; }
    });
    box.appendChild(item);
  });
})();
