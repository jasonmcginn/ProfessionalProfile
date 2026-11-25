(function(){
  var COLS=10, ROWS=20, CELL=22;
  var board=document.getElementById("board");
  board.width=COLS*CELL; board.height=ROWS*CELL;
  var over=document.getElementById("over");
  var nextC=document.getElementById("next");
  var ctx=board.getContext("2d"), nctx=nextC.getContext("2d");
  var elScore=document.getElementById("score"), elLines=document.getElementById("lines"), elLevel=document.getElementById("level");
  var COLORS=[null,"#5bd1c9","#ffd23d","#b06be0","#5bd15b","#f24d4d","#4da6ff","#f6a21e"];
  var SHAPES={I:[[1,1,1,1]],O:[[2,2],[2,2]],T:[[0,3,0],[3,3,3]],S:[[0,4,4],[4,4,0]],Z:[[5,5,0],[0,5,5]],J:[[6,0,0],[6,6,6]],L:[[0,0,7],[7,7,7]]};
  var KEYS=Object.keys(SHAPES);
  var grid,cur,nextP,score,lines,level,dropMs,acc,last,raf,paused,dead,bag;

  function bagNew(){ var b=KEYS.slice(); for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=b[i];b[i]=b[j];b[j]=t;} return b; }
  function take(){ if(!bag||!bag.length) bag=bagNew(); return bag.pop(); }
  function spawn(){ var k=nextP||take(); nextP=take(); var sh=SHAPES[k].map(function(r){return r.slice();}); cur={sh:sh,x:Math.floor((COLS-sh[0].length)/2),y:0}; if(hit(cur.sh,cur.x,cur.y)){dead=true;over.hidden=false;} drawNext(); }
  function hit(sh,x,y){ for(var r=0;r<sh.length;r++)for(var c=0;c<sh[r].length;c++){ if(sh[r][c]){ var nx=x+c,ny=y+r; if(nx<0||nx>=COLS||ny>=ROWS) return true; if(ny>=0&&grid[ny][nx]) return true; } } return false; }
  function rot(sh){ var R=sh[0].length,C=sh.length,o=[]; for(var r=0;r<R;r++){o[r]=[];for(var c=0;c<C;c++)o[r][c]=sh[C-1-c][r];} return o; }
  function lock(){ for(var r=0;r<cur.sh.length;r++)for(var c=0;c<cur.sh[r].length;c++){ if(cur.sh[r][c]){ var ny=cur.y+r; if(ny>=0) grid[ny][cur.x+c]=cur.sh[r][c]; } } clearLines(); spawn(); }
  function clearLines(){ var n=0; for(var r=ROWS-1;r>=0;r--){ if(grid[r].every(function(v){return v;})){ grid.splice(r,1); grid.unshift(new Array(COLS).fill(0)); n++; r++; } } if(n){ score+=[0,40,100,300,1200][n]*level; lines+=n; level=Math.floor(lines/10)+1; dropMs=Math.max(90,700-(level-1)*55); upd(); } }
  function cellRect(x,y,ci,cell,cc){ cc.fillStyle=COLORS[ci]; cc.fillRect(x*cell,y*cell,cell,cell); cc.fillStyle="rgba(255,255,255,.14)"; cc.fillRect(x*cell,y*cell,cell,3); cc.strokeStyle="rgba(0,0,0,.4)"; cc.strokeRect(x*cell+.5,y*cell+.5,cell-1,cell-1); }
  function draw(){ ctx.fillStyle="#040807"; ctx.fillRect(0,0,board.width,board.height); for(var r=0;r<ROWS;r++)for(var c=0;c<COLS;c++){ if(grid[r][c]) cellRect(c,r,grid[r][c],CELL,ctx); } if(cur) for(var rr=0;rr<cur.sh.length;rr++)for(var cc2=0;cc2<cur.sh[rr].length;cc2++){ if(cur.sh[rr][cc2]){ var yy=cur.y+rr; if(yy>=0) cellRect(cur.x+cc2,yy,cur.sh[rr][cc2],CELL,ctx); } } }
  function drawNext(){ nctx.fillStyle="#040807"; nctx.fillRect(0,0,nextC.width,nextC.height); if(!nextP) return; var sh=SHAPES[nextP],cell=16,ox=(4-sh[0].length)/2,oy=(4-sh.length)/2; for(var r=0;r<sh.length;r++)for(var c=0;c<sh[r].length;c++){ if(sh[r][c]) cellRect(c+ox,r+oy,sh[r][c],cell,nctx); } }
  function upd(){ elScore.textContent=score; elLines.textContent=lines; elLevel.textContent=level; }
  function reset(){ grid=[]; for(var r=0;r<ROWS;r++) grid.push(new Array(COLS).fill(0)); score=0;lines=0;level=1;dropMs=700;acc=0;last=0;dead=false;paused=false;bag=bagNew();nextP=null;over.hidden=true; spawn(); upd(); draw(); }
  function loop(t){ raf=requestAnimationFrame(loop); if(dead){ return; } if(paused){ last=t; return; } if(!last)last=t; acc+=t-last; last=t; if(acc>=dropMs){ acc=0; if(!hit(cur.sh,cur.x,cur.y+1)) cur.y++; else lock(); } draw(); }
  function key(e){ if(dead){ if(e.key==="Enter") reset(); return; } var k=e.key; if(k==="ArrowLeft"){ if(!hit(cur.sh,cur.x-1,cur.y))cur.x--; e.preventDefault(); } else if(k==="ArrowRight"){ if(!hit(cur.sh,cur.x+1,cur.y))cur.x++; e.preventDefault(); } else if(k==="ArrowDown"){ if(!hit(cur.sh,cur.x,cur.y+1)){cur.y++;}else lock(); e.preventDefault(); } else if(k==="ArrowUp"){ var r=rot(cur.sh),ks=[0,-1,1,-2,2]; for(var i=0;i<ks.length;i++){ if(!hit(r,cur.x+ks[i],cur.y)){cur.sh=r;cur.x+=ks[i];break;} } e.preventDefault(); } else if(k===" "){ while(!hit(cur.sh,cur.x,cur.y+1)){cur.y++;} lock(); e.preventDefault(); } else if(k==="p"||k==="P"){ paused=!paused; } draw(); }

  document.addEventListener("keydown",key);
  document.getElementById("restart").addEventListener("click",reset);
  document.getElementById("startBtn").addEventListener("click",reset);
  reset(); raf=requestAnimationFrame(loop);
})();
