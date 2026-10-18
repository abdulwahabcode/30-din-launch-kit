/* Members renderers: roadmap / templates / GBP guide from JSON */
(function(){
  "use strict";
  function el(html){ var d=document.createElement('div'); d.innerHTML=html; return d.firstChild; }

  window.renderRoadmap = function(){
    var box = document.getElementById('days');
    fetch('../data/roadmap.json').then(function(r){ return r.json(); }).then(function(days){
      function show(filter){
        box.innerHTML = '';
        days.forEach(function(d){
          var w = d.day<=7?1 : d.day<=14?2 : d.day<=21?3 : 4;
          if(filter!=='all' && w!==+filter) return;
          var card = el(
            '<div class="day"><button class="day-head" type="button">'+
            '<span class="day-num">DIN<br>'+d.day+'</span><h3>'+d.title+'</h3><span style="color:var(--brass-dark);font-weight:800">+</span>'+
            '</button><div class="day-body"><div class="inner">'+
            '<h4>Kya karna hai</h4><p>'+d.task+'</p>'+
            '<h4>Kyun zaroori hai</h4><p>'+d.why+'</p>'+
            '<h4>Kaise karna hai</h4><p>'+d.how+'</p>'+
            '</div></div></div>');
          var head = card.querySelector('.day-head');
          head.addEventListener('click', function(){
            var open = card.classList.contains('open');
            box.querySelectorAll('.day.open').forEach(function(o){ o.classList.remove('open'); });
            if(!open) card.classList.add('open');
          });
          box.appendChild(card);
        });
      }
      show('all');
      document.getElementById('weekbar').addEventListener('click', function(e){
        var b = e.target.closest('button'); if(!b) return;
        this.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on'); show(b.dataset.w);
      });
    }).catch(function(){ box.innerHTML = '<p class="lead">Data load nahi hua — page refresh karein.</p>'; });
  };

  window.renderTemplates = function(){
    var box = document.getElementById('tpls'), bar = document.getElementById('catbar');
    fetch('../data/templates.json').then(function(r){ return r.json(); }).then(function(data){
      var cats = ['Sab'].concat(data.categories||[]);
      function show(cat){
        box.innerHTML = '';
        (data.templates||[]).forEach(function(t){
          if(cat!=='Sab' && t.category!==cat) return;
          var card = el(
            '<div class="tpl"><div class="cat">'+t.category+'</div><h3>'+t.title+'</h3>'+
            '<div class="txt">'+t.text+'</div>'+
            '<button class="copybtn" type="button">📋 Copy Karein</button></div>');
          var btn = card.querySelector('.copybtn');
          btn.addEventListener('click', function(){
            var txt = card.querySelector('.txt').textContent;
            function done(){ btn.textContent='✓ Copy Ho Gaya'; btn.classList.add('done');
              setTimeout(function(){ btn.textContent='📋 Copy Karein'; btn.classList.remove('done'); },1800); }
            if(navigator.clipboard && navigator.clipboard.writeText){
              navigator.clipboard.writeText(txt).then(done).catch(function(){ fallback(); });
            } else fallback();
            function fallback(){
              var ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta);
              ta.select(); try{ document.execCommand('copy'); }catch(e){} document.body.removeChild(ta); done();
            }
          });
          box.appendChild(card);
        });
      }
      cats.forEach(function(c,i){
        var b = document.createElement('button');
        b.textContent = c; if(i===0) b.classList.add('on');
        b.addEventListener('click', function(){
          bar.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); });
          b.classList.add('on'); show(c);
        });
        bar.appendChild(b);
      });
      show('Sab');
    }).catch(function(){ box.innerHTML = '<p class="lead">Data load nahi hua — page refresh karein.</p>'; });
  };

  window.renderGbp = function(){
    var box = document.getElementById('gsteps');
    fetch('../data/gbp-guide.json').then(function(r){ return r.json(); }).then(function(data){
      document.getElementById('gbpIntro').textContent = data.intro || '';
      (data.steps||[]).forEach(function(s){
        box.appendChild(el(
          '<div class="gstep"><div class="n">'+s.n+'</div><div><h3>'+s.title+'</h3><p>'+s.detail+'</p></div></div>'));
      });
    }).catch(function(){ box.innerHTML = '<p class="lead">Data load nahi hua — page refresh karein.</p>'; });
  };
})();
