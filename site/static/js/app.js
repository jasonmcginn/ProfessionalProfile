// ported from the prototype; hash router removed (stories are real pages now)
(function(){
  // theme toggle (header + taskbar)
  var root=document.documentElement;
  function toggle(){
    var cur=root.getAttribute('data-theme');
    if(!cur){ cur=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'; }
    root.setAttribute('data-theme', cur==='dark'?'light':'dark');
  }
  document.querySelectorAll('.tt').forEach(function(b){ b.addEventListener('click', toggle); });
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

(function(){ // copy command blocks
  document.querySelectorAll('.cmd .cp').forEach(function(btn){
    btn.addEventListener('click',function(){
      var box=btn.parentElement, txt=box.textContent.replace(/^\s*copy\s*/,'').trim();
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(function(){ var o=btn.textContent; btn.textContent='copied'; setTimeout(function(){btn.textContent='copy';},1400); });
      }
    });
  });
})();

(function(){ // smart back: return to the exact section you came from
  try{ if('scrollRestoration' in history){ history.scrollRestoration='auto'; } }catch(_){}
  document.querySelectorAll('a.backlink').forEach(function(a){
    a.addEventListener('click',function(e){
      try{
        var ref=document.referrer; if(!ref) return;        // deep-linked: let href="/" run
        var r=new URL(ref);
        if(r.origin===location.origin && r.pathname!==location.pathname && history.length>1){
          e.preventDefault(); history.back();              // restores scroll + open accordion
        }
      }catch(_){}
    });
  });
})();

(function(){ // expand/collapse all library groups
  var btn=document.getElementById('libToggle');
  if(!btn) return;
  var groups=Array.prototype.slice.call(document.querySelectorAll('.lib-group'));
  if(!groups.length){ btn.style.display='none'; return; }
  function anyClosed(){ return groups.some(function(d){ return !d.open; }); }
  function sync(){ var allOpen=!anyClosed(); btn.textContent=allOpen?'collapse all':'expand all'; btn.setAttribute('aria-expanded', String(allOpen)); }
  btn.addEventListener('click', function(){ var open=anyClosed(); groups.forEach(function(d){ d.open=open; }); sync(); });
  groups.forEach(function(d){ d.addEventListener('toggle', sync); });
  sync();
})();

(function(){ // XP Start menu
  var btn=document.getElementById('startBtn'), menu=document.getElementById('startMenu');
  if(!btn||!menu) return;
  function close(){ menu.hidden=true; btn.setAttribute('aria-expanded','false'); }
  function open(){ menu.hidden=false; btn.setAttribute('aria-expanded','true'); }
  btn.addEventListener('click', function(e){ e.stopPropagation(); if(menu.hidden) open(); else close(); });
  document.addEventListener('click', function(e){ if(!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) close(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
  menu.addEventListener('click', function(e){ if(e.target.closest('a')) close(); });
})();

(function(){ // xwin-desktop: open objects as windows with a taskbar
  var SECTIONS=["/stories/","/documents/","/scripts/","/containers/"];
  var tbWins=document.getElementById("tbWins");
  if(!tbWins) return;
  var z=200, wins={}, idc=0;
  function desktopOn(){ return window.matchMedia("(min-width:821px)").matches; }
  function isObj(href){ return SECTIONS.some(function(s){ return href.indexOf(s)===0 && href.length>s.length; }); }

  document.addEventListener("click", function(e){
    var a=e.target.closest("a"); if(!a) return;
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0) return;
    if(a.target==="_blank") return;
    var href=a.getAttribute("href")||"";
    if(!isObj(href)) return;
    if(!desktopOn()) return;            // phones/tablets: navigate normally
    e.preventDefault();
    openWin(href);
  });

  function openWin(url){
    if(wins[url]){ focus(wins[url]); return; }
    fetch(url).then(function(r){ return r.text(); }).then(function(html){
      var doc=new DOMParser().parseFromString(html,"text/html");
      var story=doc.querySelector(".storyview .story")||doc.querySelector(".storyview");
      if(!story){ location.href=url; return; }
      var h1=story.querySelector("h1");
      var title=h1?h1.textContent.trim():document.title;
      var sec=url.split("/").filter(Boolean)[0]||"stories";
      var bl=story.querySelector(".backlink"); if(bl) bl.remove();
      if(h1) h1.remove();
      make(url, title, sec, story.innerHTML);
    }).catch(function(){ location.href=url; });
  }

  function make(url, title, sec, bodyHTML){
    var n=Object.keys(wins).length;
    var win=document.createElement("div");
    win.className="xwin";
    win.style.left=(70+n*26)+"px";
    win.style.top=(96+n*22)+"px";
    win.style.zIndex=(++z);
    win.innerHTML=''
      +'<div class="xwin-bar"><span class="xwin-ico cat-'+sec+'"></span>'
      +'<span class="xwin-title"></span>'
      +'<span class="xwin-ctl"><button class="xw-b xw-min" title="Minimize" type="button">&#95;</button>'
      +'<a class="xw-b xw-open" title="Open full page" href="'+url+'">&#8599;</a>'
      +'<button class="xw-b xw-x" title="Close" type="button">&#215;</button></span></div>'
      +'<div class="xwin-body"><div class="storyview"><div class="wrap story"></div></div></div>';
    win.querySelector(".xwin-title").textContent=title;
    win.querySelector(".xwin-body .wrap").innerHTML=bodyHTML;
    document.body.appendChild(win);

    var tb=document.createElement("button");
    tb.type="button"; tb.className="tb-win";
    tb.innerHTML='<span class="tb-ico cat-'+sec+'"></span><span class="tb-lbl"></span>';
    tb.querySelector(".tb-lbl").textContent=title;
    tbWins.appendChild(tb);

    var rec={win:win, tb:tb, url:url, min:false};
    wins[url]=rec;

    win.addEventListener("mousedown", function(){ focus(rec); });
    win.querySelector(".xw-x").addEventListener("click", function(e){ e.stopPropagation(); close(rec); });
    win.querySelector(".xw-min").addEventListener("click", function(e){ e.stopPropagation(); minimize(rec); });
    win.querySelector(".xw-open").addEventListener("click", function(e){ e.stopPropagation(); });
    tb.addEventListener("click", function(){ toggle(rec); });
    drag(win, win.querySelector(".xwin-bar"));
    focus(rec);
  }

  function focus(rec){ if(rec.min){ rec.win.style.display=""; rec.min=false; } rec.win.style.zIndex=(++z); active(rec); }
  function active(rec){ Object.keys(wins).forEach(function(u){ var r=wins[u]; var on=(r===rec); r.tb.classList.toggle("active",on); r.win.classList.toggle("focused",on); }); }
  function minimize(rec){ rec.win.style.display="none"; rec.min=true; rec.tb.classList.remove("active"); rec.win.classList.remove("focused"); }
  function toggle(rec){ if(rec.min){ focus(rec); } else if(rec.tb.classList.contains("active")){ minimize(rec); } else { focus(rec); } }
  function close(rec){ rec.win.remove(); rec.tb.remove(); delete wins[rec.url]; }

  function drag(win, handle){
    var sx,sy,ox,oy,on=false;
    handle.addEventListener("mousedown", function(e){
      if(e.target.closest(".xw-b")) return;
      on=true; sx=e.clientX; sy=e.clientY;
      var r=win.getBoundingClientRect(); ox=r.left; oy=r.top;
      document.body.style.userSelect="none"; e.preventDefault();
    });
    document.addEventListener("mousemove", function(e){
      if(!on) return;
      var nx=Math.max(4, Math.min(window.innerWidth-80, ox+(e.clientX-sx)));
      var ny=Math.max(40, Math.min(window.innerHeight-80, oy+(e.clientY-sy)));
      win.style.left=nx+"px"; win.style.top=ny+"px";
    });
    document.addEventListener("mouseup", function(){ if(on){ on=false; document.body.style.userSelect=""; } });
  }
})();
(function(){ // taskbar clock
  var el=document.getElementById("tbClock"); if(!el) return;
  function t(){ var d=new Date(); var h=d.getHours(), m=d.getMinutes(); var ap=h<12?"AM":"PM"; h=h%12||12; el.textContent=h+":"+(m<10?"0"+m:m)+" "+ap; }
  t(); setInterval(t, 15000);
})();


(function(){ // NetState Security Challenge (CTF) + Tetris reward
  var tbWins=document.getElementById("tbWins"); if(!tbWins) return;

  // --- for the hunters: the login password lives here, base64-wrapped ---
  var PW=atob("dHJ1c3RubzE=");          // decode me. then log on.
  var ROT_ANSWER="firewall";            // (ciphertext waits on /sv-4a91/)
  var COOKIE_PLAIN="patch";             // base64 of this is dropped in your cookies at stage 3
  var HIDDEN="/sv-4a91";                // the path robots.txt tries to hide
  var FLAG="NSD{y0u_read_the_source}";

  // ---------------- a tiny window factory for the terminal ----------------
  var cz=300, cwins={};
  function cwDrag(win, handle){
    var sx,sy,ox,oy,on=false;
    handle.addEventListener("mousedown", function(e){
      if(e.target.closest(".xw-b")) return;
      on=true; sx=e.clientX; sy=e.clientY;
      var r=win.getBoundingClientRect(); ox=r.left; oy=r.top;
      document.body.style.userSelect="none"; e.preventDefault();
    });
    document.addEventListener("mousemove", function(e){
      if(!on) return;
      win.style.left=Math.max(4, Math.min(window.innerWidth-80, ox+(e.clientX-sx)))+"px";
      win.style.top =Math.max(40, Math.min(window.innerHeight-80, oy+(e.clientY-sy)))+"px";
    });
    document.addEventListener("mouseup", function(){ if(on){ on=false; document.body.style.userSelect=""; } });
  }
  function cwFocus(rec){ if(rec.min){ rec.win.style.display=""; rec.min=false; } rec.win.style.zIndex=(++cz); if(rec.tb) rec.tb.classList.add("active"); rec.win.classList.add("focused"); }
  function createWin(id, title, sec, extra, builder){
    if(cwins[id]){ cwFocus(cwins[id]); return cwins[id]; }
    var n=Object.keys(cwins).length;
    var win=document.createElement("div");
    win.className="xwin "+(extra||"");
    win.style.left=(90+n*26)+"px"; win.style.top=(92+n*22)+"px"; win.style.zIndex=(++cz);
    win.innerHTML=''
      +'<div class="xwin-bar"><span class="xwin-ico cat-'+sec+'"></span>'
      +'<span class="xwin-title"></span>'
      +'<span class="xwin-ctl"><button class="xw-b xw-min" title="Minimize" type="button">&#95;</button>'
      +'<button class="xw-b xw-x" title="Close" type="button">&#215;</button></span></div>'
      +'<div class="xwin-body"></div>';
    win.querySelector(".xwin-title").textContent=title;
    document.body.appendChild(win);
    var tb=document.createElement("button");
    tb.type="button"; tb.className="tb-win";
    tb.innerHTML='<span class="tb-ico cat-'+sec+'"></span><span class="tb-lbl"></span>';
    tb.querySelector(".tb-lbl").textContent=title;
    tbWins.appendChild(tb);
    var rec={id:id, win:win, tb:tb, api:null, min:false};
    cwins[id]=rec;
    win.addEventListener("mousedown", function(){ cwFocus(rec); });
    win.querySelector(".xw-x").addEventListener("click", function(e){ e.stopPropagation(); if(rec.api&&rec.api.destroy){try{rec.api.destroy();}catch(_){}} rec.win.remove(); rec.tb.remove(); delete cwins[id]; });
    win.querySelector(".xw-min").addEventListener("click", function(e){ e.stopPropagation(); rec.win.style.display="none"; rec.min=true; rec.tb.classList.remove("active"); });
    tb.addEventListener("click", function(){ if(rec.min){ cwFocus(rec); } else if(rec.tb.classList.contains("active")){ rec.win.style.display="none"; rec.min=true; rec.tb.classList.remove("active"); } else { cwFocus(rec); } });
    cwDrag(win, win.querySelector(".xwin-bar"));
    cwFocus(rec);
    rec.api = builder(win.querySelector(".xwin-body")) || {};
    return rec;
  }

  // ---------------- the challenge ----------------
  function openChallenge(){
    createWin("ctf","NetState Security Challenge  //  shell","scripts","xwin-term", function(root){
      var stage="auth";
      root.innerHTML='<div class="cterm"><div class="cterm-out"></div>'
        +'<div class="cterm-line"><span class="cterm-ps"></span>'
        +'<input class="cterm-cmd" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="terminal input"></div></div>';
      var out=root.querySelector(".cterm-out");
      var inp=root.querySelector(".cterm-cmd");
      var psEl=root.querySelector(".cterm-ps");

      function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
      function line(html,cls){ var d=document.createElement("div"); d.className="cl"+(cls?(" "+cls):""); d.innerHTML=html; out.appendChild(d); out.scrollTop=out.scrollHeight; }
      function ps(){ return stage==="auth" ? "login:" : "nsd@challenge:~$"; }
      function setps(){ psEl.textContent=ps(); }

      var HINTS={
        auth:   "View this site's source (Ctrl+U) and look for something base64-encoded. Decode it with atob() in the console, or any base64 tool.",
        robots: "Almost every site has a /robots.txt. Open it and see which path it politely asks crawlers NOT to visit, then:  goto <that path>",
        comment:"Open the page you just found and view its source. There's an HTML comment labelled rot13. Decode that one word, then:  decode <word>",
        cookie: "Open your browser's cookies for this site. There's one called nsd_key. Base64-decode its value, then:  unlock <value>"
      };
      var LESSON={
        auth:   "Lesson: a password living in client-side code is not a secret. Anything the browser can read, an attacker can read. Never ship real credentials to the front end.",
        robots: "Lesson: robots.txt is a signpost, not a lock. Listing a secret path there just tells attackers exactly where to look. Protect pages with real auth, don't hide them.",
        comment:"Lesson: HTML comments ship to the client, and ROT13 / base64 are obfuscation, not encryption. 'Hidden' notes in source are free intel for anyone who looks.",
        cookie: "Lesson: never trust client-side state. Cookies and localStorage can be read and forged by the user. Authorisation has to be checked on the server, every time."
      };

      function intro(st){
        if(st==="robots"){ line("",""); line("STAGE 2 // recon","hd"); line("Every site tells crawlers where not to look. Find the path this site's robots.txt forbids, then type:  <b>goto &lt;path&gt;</b>","dim"); }
        else if(st==="comment"){ line("",""); line("STAGE 3 // the vault page","hd"); line("You're in. View that page's source and find the comment marked rot13. Decode the word, then type:  <b>decode &lt;word&gt;</b>","dim"); }
        else if(st==="cookie"){ line("",""); line("STAGE 4 // the forged token","hd"); line("Logging in here dropped a cookie called <b>nsd_key</b>. Read it, base64-decode the value, then type:  <b>unlock &lt;value&gt;</b>","dim"); }
      }
      function setCookie(){ try{ document.cookie="nsd_key="+btoa(COOKIE_PLAIN)+"; path=/; samesite=lax"; }catch(e){} }

      function finale(){
        stage="done"; setps();
        line("",""); line("&#10003; all stages cleared.","ok");
        line("FLAG CAPTURED:  <b>"+FLAG+"</b>","flag");
        line("",""); line("Four quick lessons, one idea: the browser keeps no secrets. Source, robots.txt, comments, cookies &mdash; all readable, all forgeable. Real security lives on the server.","les");
        line("",""); line("Your reward is waiting. Type  <b>play</b>  to launch it.","hd");
        line("Tip: next time, just log in and run  <b>tetris</b>  to play straight away.","dim");
      }

      function run(raw){
        var s=(raw||"").trim();
        line('<span class="cp">'+esc(ps())+'</span> '+esc(s),"");
        var sp=s.indexOf(" ");
        var c=(sp<0?s:s.slice(0,sp)).toLowerCase();
        var arg=(sp<0?"":s.slice(sp+1)).trim();

        // universal commands (work in any stage)
        if(c==="clear"){ out.innerHTML=""; return; }
        if(c==="help"){ line(stage==="auth" ? "commands: help  hint  clear   (and enter the password to begin)" : "commands: help  hint  clear  whoami  ls  tetris   + the one each stage asks for","dim"); return; }
        if(c==="hint"){ line(HINTS[stage]||"no hints here. you've got this.","dim"); return; }

        if(stage==="auth"){
          if(s===""){ return; }
          if(s===PW){ line("&#10003; access granted. welcome, admin.","ok"); line(LESSON.auth,"les"); stage="robots"; setps(); intro("robots"); }
          else { line("access denied.","err"); line("(stuck? type  hint )","dim"); }
          return;
        }

        if(c===""){ return; }
        if(c==="whoami"){ line("root  (you cracked the login, remember?)","dim"); return; }
        if(c==="ls"){ line("recon.txt   notes/   robots.txt   .secrets   vault.lnk","dim"); return; }
        if(c==="tetris"){ line("launching tetris ...","ok"); setTimeout(openTetris,250); return; }

        if(stage==="robots"){
          if(c==="goto" && (arg===HIDDEN||arg===HIDDEN+"/"||arg===HIDDEN.slice(1)||arg==="sv-4a91/")){ line("resolving "+esc(arg)+" ...","dim"); line("&#10003; found it.","ok"); line(LESSON.robots,"les"); stage="comment"; setps(); intro("comment"); }
          else if(c==="goto"){ line("that path is not the one robots.txt forbids. check /robots.txt again.","err"); }
          else { line("unknown command for this stage. try:  goto <path>   (or 'hint')","err"); }
          return;
        }
        if(stage==="comment"){
          if(c==="decode" && arg.toLowerCase()===ROT_ANSWER){ line("&#10003; decoded.","ok"); line(LESSON.comment,"les"); setCookie(); stage="cookie"; setps(); intro("cookie"); }
          else if(c==="decode"){ line("that is not the ROT13 word from the vault page's source. try again.","err"); }
          else { line("unknown command for this stage. try:  decode <word>   (or 'hint')","err"); }
          return;
        }
        if(stage==="cookie"){
          if(c==="unlock" && arg.toLowerCase()===COOKIE_PLAIN){ line("&#10003; token accepted.","ok"); line(LESSON.cookie,"les"); finale(); }
          else if(c==="unlock"){ line("that token is wrong. read nsd_key from your cookies and base64-decode it.","err"); }
          else { line("unknown command for this stage. try:  unlock <value>   (or 'hint')","err"); }
          return;
        }
        if(stage==="done"){
          if(c==="play"){ line("launching surprise.exe ...","ok"); setTimeout(openTetris,350); }
          else { line("challenge complete. type  play  for your reward.","dim"); }
          return;
        }
      }

      inp.addEventListener("keydown",function(e){ if(e.key==="Enter"){ var v=inp.value; inp.value=""; run(v); } });

      // boot
      line("NetState Security Challenge  //  secure shell v1.0","hd");
      line("A friendly reminder that your browser keeps no secrets.","dim");
      line("",""); line("Authentication required.",""); line("The admin password is hidden in this site's source. (think: base64)","dim"); line("Enter password to continue:","");
      setps(); setTimeout(function(){inp.focus();},60);
      return {};
    });
  }

  // ---------------- Tetris now lives on its own page (/tetris/) ----------------
  function openTetris(){ window.location.href = "/tetris/"; }

  function lo_ready(){ var lo=document.getElementById("startLogon"); if(lo) lo.addEventListener("click",function(e){ e.preventDefault(); openChallenge(); }); return true; }
  lo_ready();
})();
