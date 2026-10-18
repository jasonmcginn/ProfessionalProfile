// ported from the prototype; hash router removed (stories are real pages now)
(function(){
  // theme toggle
  var root=document.documentElement, btn=document.getElementById('tt');
  btn.addEventListener('click',function(){
    var cur=root.getAttribute('data-theme');
    if(!cur){ cur=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'; }
    root.setAttribute('data-theme', cur==='dark'?'light':'dark');
  });
})();
(function(){
  // copy email (contact-row, only if present)
  var b=document.getElementById('copyBtn'), e=document.getElementById('email');
  if(b&&e){
    b.addEventListener('click',function(){
      var t=e.textContent.trim();
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(t).then(function(){ b.textContent='copied ✓';
          setTimeout(function(){b.textContent='copy email';},1600);
        }).catch(select);
      } else select();
      function select(){ var r=document.createRange(); r.selectNodeContents(e);
        var s=window.getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent='selected';
        setTimeout(function(){b.textContent='copy email';},1600); }
    });
  }
  var rb=document.getElementById('resumeBtn');
  if(rb) rb.addEventListener('click',function(ev){ ev.preventDefault(); });
})();
(function(){
  // alternate the highlighted main button slowly; hold on hover/focus
  var mains=Array.prototype.slice.call(document.querySelectorAll('.cta a.btn'));
  if(mains.length<2) return;
  var reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var idx=0, timer=null;
  function setPrimary(i){ mains.forEach(function(b,k){ b.classList.toggle('primary', k===i); }); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  function start(){ if(reduced) return; stop(); timer=setInterval(function(){ idx=(idx+1)%mains.length; setPrimary(idx); },3200); }
  mains.forEach(function(b,k){
    b.addEventListener('mouseenter',function(){ stop(); idx=k; setPrimary(k); });
    b.addEventListener('mouseleave',function(){ start(); });
    b.addEventListener('focus',function(){ stop(); idx=k; setPrimary(k); });
    b.addEventListener('blur',function(){ start(); });
  });
  setPrimary(0); start();
})();
(function(){
  // highlight cards: expand related links
  document.querySelectorAll('.hcard-toggle').forEach(function(btn){
    btn.addEventListener('click',function(){
      var more=btn.parentElement.querySelector('.hcard-more');
      var open=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded', String(!open));
      if(more) more.hidden=open;
    });
  });
})();
(function(){
  // terminal intro program: ./whoami.sh
  var body=document.getElementById('termBody');
  if(!body) return;
  var reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var P='~/prod/portfolio$';
  var ART=[
'  _  _     _   ___ _        _       ',
'| \\| |___| |_/ __| |_ __ _| |_ ___ ',
'| .` / -_)  _\\__ \\  _/ _` |  _/ -_)',
'|_|\\_\\___|\\__|___/\\__\\__,_|\\__\\___|'
  ].join('\n');
  var lines=[
    {t:'cmd', x:'./whoami.sh'},
    {t:'gap'},
    {t:'name', x:'Jason R. McGinn'},
    {t:'role', x:'IT Coordinator / Systems & Infrastructure Administrator'},
    {t:'badges', x:['Azure Fundamentals','Dynamics 365 F&O','CompTIA A+','NB Instructional']},
    {t:'tag', x:'hands-on at every layer, from the cable to the cloud'},
    {t:'gap'},
    {t:'kv', k:'about  ', x:'a builder at heart - secure, documented, usable'},
    {t:'kv', k:'exp    ', x:'20+ years - from the cable to the cloud'},
    {t:'kv', k:'based  ', x:'Moncton area, NB · or remote'},
    {t:'kv', k:'stack  ', x:'Azure · Windows Server · Linux · Cisco · VMware · Docker · PowerShell · Python'},
    {t:'gap'},
    {t:'status', x:'available for work'},
    {t:'gap'},
    {t:'prompt'}
  ];
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  function badges(a){ return a.map(function(b){return '<span class="badge">'+esc(b)+'</span>';}).join(''); }
  function lineHTML(l){
    if(l.t==='cmd')    return '<span class="p">'+P+'</span> '+esc(l.x)+'\n';
    if(l.t==='art')    return '<span class="t-art">'+esc(ART)+'</span>';
    if(l.t==='name')   return '<span class="t-name">'+esc(l.x)+'</span>';
    if(l.t==='role')   return '<span class="t-role">'+esc(l.x)+'</span>';
    if(l.t==='tag')    return '<span class="t-tag">'+esc(l.x)+'</span>';
    if(l.t==='badges') return '<span class="t-badges">'+badges(l.x)+'</span>';
    if(l.t==='kv')     return '<div class="kv"><span class="k">'+esc(l.k)+'</span><span class="o">'+esc(l.x)+'</span></div>';
    if(l.t==='out')    return '<span class="o">'+esc(l.x)+'</span>\n';
    if(l.t==='status') return '<span class="t-status"><span class="s-dot"></span>'+esc(l.x)+'</span>\n';
    if(l.t==='prompt') return '<span class="p">'+P+'</span> ';
    return '\n';
  }
  if(reduced){ body.innerHTML=lines.map(lineHTML).join('')+'<span class="caret"></span>'; return; }
  var i=0, out='', finished=false, warned=false;
  function render(){ body.innerHTML=out+'<span class="caret"></span>'; }
  function delay(t){
    if(t==='art') return 480;
    if(t==='name') return 340;
    if(t==='role') return 280;
    if(t==='badges') return 340;
    if(t==='status') return 340;
    return 300;
  }
  function typeCmd(l){
    var full=l.x, j=0, pre='<span class="p">'+P+'</span> ';
    (function tc(){
      if(j<=full.length){ body.innerHTML=out+pre+esc(full.slice(0,j))+'<span class="caret"></span>'; j++; setTimeout(tc,95); }
      else { out+=pre+esc(full)+'\n'; i++; setTimeout(step,480); }
    })();
  }
  function step(){
    if(i>=lines.length){ finished=true; render(); return; }
    var l=lines[i];
    if(l.t==='cmd'){ typeCmd(l); return; }
    if(l.t==='gap'){ out+='\n'; i++; render(); setTimeout(step,240); return; }
    out+=lineHTML(l); i++; render();
    setTimeout(step, delay(l.t));
  }
  var rT;
  window.addEventListener('resize', function(){
    clearTimeout(rT);
    rT=setTimeout(function(){
      if(!finished || warned) return;
      warned=true;
      body.style.minHeight='';
      body.innerHTML=out+'\n<span class="t-err">[!] display resized - refresh the page to redraw properly</span>\n<span class="p">'+P+'</span> <span class="caret"></span>';
    },300);
  });
  function measureStart(){
    body.innerHTML=lines.map(lineHTML).join('')+'<span class="caret"></span>';
    body.style.minHeight=body.offsetHeight+'px';
    body.innerHTML='';
    setTimeout(step,450);
  }
  if(document.fonts&&document.fonts.ready){ document.fonts.ready.then(measureStart); } else { measureStart(); }
})();
(function(){
  // contact terminal program: ./contact.sh
  var body=document.getElementById('contactTermBody');
  if(!body) return;
  var reduced=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var P='~/prod/portfolio$';
  var lines=[
    {t:'cmd', x:'./contact.sh'},
    {t:'gap'},
    {t:'out', x:'# open to IT Coordinator, Systems & Infrastructure roles'},
    {t:'out', x:'# Moncton area, or remote'},
    {t:'gap'},
    {t:'link', k:'email    ', href:'mailto:mcginn@netstatedata.ca', x:'mcginn@netstatedata.ca'},
    {t:'link', k:'linkedin ', href:'https://www.linkedin.com/in/jason-mcginn-bb350711', x:'linkedin.com/in/jason-mcginn'},
    {t:'link', k:'github   ', href:'https://github.com/jasonmcginn', x:'github.com/jasonmcginn'},
    {t:'link', k:'resume   ', href:'/resume.pdf', x:'download resume (pdf)'},
    {t:'gap'},
    {t:'prompt'}
  ];
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  function linkHTML(l){
    var ext=!(l.href.charAt(0)==='#'||l.href.indexOf('mailto:')===0);
    var attr=ext?' target="_blank" rel="noopener"':'';
    var dl=/\.pdf$/.test(l.href)?' download="Jason-McGinn-Resume.pdf"':''; return '<div class="kv"><span class="k">'+esc(l.k)+'</span><a class="tlink" href="'+l.href+'"'+attr+dl+'>'+esc(l.x)+'</a></div>';
  }
  function lineHTML(l){
    if(l.t==='cmd')    return '<span class="p">'+P+'</span> '+esc(l.x)+'\n';
    if(l.t==='out')    return '<span class="o">'+esc(l.x)+'</span>\n';
    if(l.t==='link')   return linkHTML(l);
    if(l.t==='prompt') return '<span class="p">'+P+'</span> ';
    return '\n';
  }
  if(reduced){ body.innerHTML=lines.map(lineHTML).join('')+'<span class="caret"></span>'; return; }
  var i=0, out='';
  function render(){ body.innerHTML=out+'<span class="caret"></span>'; }
  function typeCmd(l){
    var full=l.x, j=0, pre='<span class="p">'+P+'</span> ';
    (function tc(){
      if(j<=full.length){ body.innerHTML=out+pre+esc(full.slice(0,j))+'<span class="caret"></span>'; j++; setTimeout(tc,95); }
      else { out+=pre+esc(full)+'\n'; i++; setTimeout(step,460); }
    })();
  }
  function step(){
    if(i>=lines.length){ render(); return; }
    var l=lines[i];
    if(l.t==='cmd'){ typeCmd(l); return; }
    if(l.t==='gap'){ out+='\n'; i++; render(); setTimeout(step,200); return; }
    out+=lineHTML(l); i++; render();
    setTimeout(step, l.t==='link'?230:260);
  }
  function begin(){ setTimeout(step,250); }
  function measureStart(){
    body.innerHTML=lines.map(lineHTML).join('')+'<span class="caret"></span>';
    body.style.minHeight=body.offsetHeight+'px';
    body.innerHTML=''; render();
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ io.disconnect(); begin(); } }); }, {threshold:0.25});
      io.observe(body);
    } else { begin(); }
  }
  if(document.fonts&&document.fonts.ready){ document.fonts.ready.then(measureStart); } else { measureStart(); }
})();
(function(){
  // expand/collapse all layers
  var btn=document.getElementById('layersToggle');
  if(!btn) return;
  var layers=Array.prototype.slice.call(document.querySelectorAll('.layers .layer'));
  if(!layers.length){ btn.style.display='none'; return; }
  function anyClosed(){ return layers.some(function(d){ return !d.open; }); }
  function sync(){ var allOpen=!anyClosed(); btn.textContent=allOpen?'collapse all':'expand all'; btn.setAttribute('aria-expanded', String(allOpen)); }
  btn.addEventListener('click', function(){
    var open=anyClosed();
    layers.forEach(function(d){ d.open=open; });
    sync();
  });
  layers.forEach(function(d){ d.addEventListener('toggle', sync); });
  sync();
})();
