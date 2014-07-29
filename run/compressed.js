!function(){function n(n,t,a,e){var r=a/2,i=8*e,o=4*e,c=r-o/2,l=r+i,d=Math.asin(c/l),u=Math.sqrt(1-Math.pow(c/l,2))*l,v=a+i+o,f=n/2,s=t-v,h=document.createElement("canvas");h.width=n,h.height=v;var p=h.getContext("2d");return p.lineJoin=p.lineCap="round",p.translate(f,v-r),p.moveTo(-f+o,-c),p.lineTo(-u,-c),p.arc(0,0,l,-Math.PI+d,-d),p.lineTo(f-o,-c),p.strokeStyle="#555",p.lineWidth=o,p.stroke(),{paint:function(n){n.drawImage(h,0,s)}}}function t(n,t){var a=document.createElement("canvas");a.width=n,a.height=t;var e=a.getContext("2d");return{c:e,canvas:a,clear:function(){e.fillStyle="rgba(0, 0, 0, 0.3)",e.fillRect(0,0,n,t)}}}function a(n,t){function a(n,t){var a=r[n];if(a){var i=a[t];i&&!d[i.id]&&(d[i.id]=i,i.shape.isBomb&&e(i))}}function e(n){var t=n.colNumber,e=n.rowNumber;a(t-2,e),a(t+2,e),a(t-1,e-1),a(t+1,e-1),a(t-1,e+1),a(t+1,e+1)}var r={};for(var i in n){var o=n[i];r[i]={};for(var c in o){var l=o[c];r[i][l.rowNumber]=l}}for(var d={},i=0;i<t.length;i++){var u=t[i];d[u.id]=u,u.shape.isBomb&&e(u)}return d}function e(n,t){for(var a=6*n,e=24,r=[],i=0;e>i;i++){var o=a*(e-i)/e,c=o+1,l=document.createElement("canvas");l.width=l.height=2*c;var d=l.getContext("2d");d.fillStyle=t,d.translate(c,c),d.arc(0,0,o,0,2*Math.PI),d.fill(),r.push(l)}return r}function r(n,t,a,e){var r,i,o=0,c=a.particleCanvases;a.isBomb?(r=3*e,i=10):(r=2*e,i=5);for(var l=[],d=0;i>d;d++){var u=x(r,r),v=x(r,r);l.push({x:n+u[0],y:t+u[1],dx:v[0],dy:v[1]})}return{id:Math.random(),paint:function(e){o||a.paint(e,n,t);for(var r in l){var i=c[o],d=l[r],u=d.x-i.width/2,v=d.y-i.height/2;e.drawImage(i,u,v)}},tick:function(){for(var n in l){var t=l[n];t.x+=t.dx,t.y+=t.dy}return o++,o==c.length?!0:void 0}}}function i(n){var t={};return{add:function(a,e,i){var o=r(a,e,i,n);t[o.id]=o},paint:function(n){for(var a in t)t[a].paint(n)},tick:function(){for(var n in t)t[n].tick()&&delete t[n]}}}function o(n,t,a){var e=[];for(var r in n){var i=n[r];for(var o in t){var c=t[o],l=c.x-i.x,d=c.y-i.y,u=Math.hypot(l,d);if(a>u){e.push({movingBubble:i,stillBubble:c,distance:u});break}}}return e}function c(n){var t={};return{add:function(a,e,r){var i=l(a,e,r,n);t[i.id]=i},paint:function(n){for(var a in t)t[a].paint(n)},tick:function(){for(var n in t)t[n].tick()&&delete t[n]}}}function l(n,t,a,e){var r=32,i=r,o=1,c=6*(2*Math.random()-1)*e,l=0;return{id:Math.random(),paint:function(e){e.globalAlpha=o,a.paint(e,n,t),e.globalAlpha=1},tick:function(){return n+=c,t+=l,l+=e,c*=.95,i--,i?(o=i/r,void 0):!0}}}function d(n,t,a,e,r,i){var o=2*Math.max(n,t),c=n/2,l=t-a;return{paint:function(n,t,a,r){var d=t-c,u=a-l,v=Math.hypot(d,u),f=d*o/v,s=u*o/v;-i>u/v&&(n.beginPath(),n.moveTo(c,l),n.lineTo(c+f,l+s),n.lineWidth=e,n.lineCap="round",n.strokeStyle=r,n.stroke())}}}function u(n,t,a,e,r){var i=a+", "+e+"%, "+r+"%",o=t.createLinearGradient(0,0,0,n);return o.addColorStop(0,"hsla("+i+", 0)"),o.addColorStop(1,"hsla("+i+", 0.2)"),o}function v(n,t,a){var e=(n-n*a)/2,r=(t-t*a)/2,i=document.createElement("canvas");return i.className="MainCanvas",i.width=n,i.height=t,i.style.transform="scale("+1/a+") translate("+e+"px, "+r+"px)",i}function f(){function a(){var n=ct.get();return m(j,z,E,n)}function e(){var n=bt-j/2,t=z-E-wt,a=Math.hypot(n,t),e=n/a,r=-t/a;if(-It>r&&Et&&Et.ready){var i=Et.shape;xt.add(i,e,r),Et=null,Bt=10,Tt=null,yt=!1}}function r(){return!Et||!Et.ready||mt.showing||mt.hiding?!0:mt.visible?(mt.hide(),gt.reset(),pt.reset(),!0):void 0}function l(n){bt=n.clientX*g-Mt,wt=n.clientY*g-Nt}function u(n){bt=n.clientX*g-Mt,wt=n.clientY*g-Nt,yt=!0}function f(){requestAnimationFrame(function(){var n=Date.now();dt.clear(),kt.clearRect(0,0,j,z),vt.paint(ut),pt.paint(ut),gt.paint(ut),yt&&St.paint(ut,bt,wt,Et.shape.laserGradient),Et&&Et.paint(ut),xt.paint(ut),st.paint(ut),ht.paint(ut),mt.visible&&mt.paint(ut),kt.drawImage(dt.canvas,0,0),J.innerHTML="repaint "+(Date.now()-n),f()})}function s(){var n=Date.now();gt.tick(),xt.tick(),st.tick(),ht.tick(),mt.visible&&mt.tick();for(var t=o(xt.movingBubbles,gt.stillBubbles,q),e=0;e<t.length;e++){var r=t[e],i=r.movingBubble;i.shiftBack(C-r.distance),p(i),xt.remove(i)}Bt?(Bt--,Bt||(Et=a())):Et&&Et.tick(),X.innerHTML="tick "+(Date.now()-n)}function p(n){gt.add(n),Rt++,Rt===Ot&&(Rt=0,gt.shift())}var g=devicePixelRatio,b=innerWidth*g,x=innerHeight*g,C=40*g,E=C/2,B=Math.sin(Math.PI/3)*C,Y=E-1*g,q=2*Y,F="MainPanel",X=document.createElement("div"),J=document.createElement("div"),U=document.createElement("div");U.className=F+"-debug",U.appendChild(J),U.appendChild(X);var j=b-b%C,z=x-x%C,K=k(Y,g),Q=I(z,Y,g),V=S(Y,g),Z=P(z,Y,g),$=T(Y,g),_=G(z,Y,g),nt=L(Y,g),tt=R(z,Y,g),at=O(Y,g),et=A(z,Y,g),rt=D(Y,g),it=H(z,Y,g),ot=W(Y,g),ct=w();ct.add(1,Q),ct.add(1,Z),ct.add(1,_),ct.add(1,tt),ct.add(1,et),ct.add(1,it);var lt=w();lt.add(3,K),lt.add(8,Q),lt.add(1,V),lt.add(8,Z),lt.add(1,$),lt.add(8,_),lt.add(1,nt),lt.add(8,tt),lt.add(1,at),lt.add(8,et),lt.add(1,rt),lt.add(8,it),lt.add(1,ot);var dt=t(j,z),ut=dt.c,vt=n(j,z,C,g),ft=Math.floor(b/C),st=i(g),ht=c(g),pt=N(z,C,g),mt=y(j,z,g),gt=M(z,E,ft,C,lt.get,B,st.add,ht.add,pt.add,function(){var n=pt.get();mt.show(n,Pt),n>Pt&&(Pt=n,localStorage.highScore=Pt)});gt.reset();var bt,wt,xt=h(j,z,E,q,p,g),yt=!1,Ct=v(b,x,g),Mt=(b-j)/2,Nt=(x-z)/2,kt=Ct.getContext("2d");kt.translate(Mt,Nt);var It=.2,St=d(j,z,E,q,kt,It),Et=a(),Bt=0,Pt=parseInt(localStorage.highScore,10);isFinite(Pt)||(Pt=0);var Tt=null,Gt=!1,Lt=document.createElement("div");Lt.className=F,Lt.appendChild(Ct),Lt.appendChild(U),Lt.addEventListener("mousedown",function(n){if(Gt)Gt=!1;else{if(r())return;yt||u(n)}}),Lt.addEventListener("touchstart",function(n){if(!r()&&!yt){var t=n.changedTouches[0];Tt=t.identifier,u(t)}}),Lt.addEventListener("mousemove",function(n){Gt?Gt=!1:l(n)}),Lt.addEventListener("touchmove",function(n){Gt=!0,n.preventDefault();for(var t=n.changedTouches,a=0;a<t.length;a++){var e=t[a];e.identifier===Tt&&l(e)}}),Lt.addEventListener("mouseup",function(n){Gt?Gt=!1:e(n)}),Lt.addEventListener("touchend",function(n){Gt=!0,n.preventDefault();for(var t=n.changedTouches,a=0;a<t.length;a++){var r=t[a];r.identifier===Tt&&e(r)}});var Rt=0,Ot=7;return addEventListener("keydown",function(n){32==n.keyCode&&s()}),setInterval(s,20),f(),{element:Lt}}function s(n,t,a,e,r,i,o,c){var l=20*c,d=i*l,u=o*l,v={id:Math.random(),shape:r,x:n/2,y:t-a,paint:function(n){r.paint(n,v.x,v.y)},shiftBack:function(t){var e=Math.hypot(i,o);v.x-=i*t/e,v.y-=o*t/e;var r=a-v.x;r>0&&(v.x+=2*r);var c=v.x+a-n;c>0&&(v.x-=2*c)},tick:function(){v.x+=d,v.y+=u;var t=a-v.x;t>0&&(v.x+=2*t,i=-i,d=i*l);var e=v.x+a-n;return e>0&&(v.x-=2*e,i=-i,d=i*l),v.y<=a?(v.y=a,!0):void 0}};return v}function h(n,t,a,e,r,i){function o(n){delete c[n.id]}var c={};return{movingBubbles:c,remove:o,add:function(r,o,l){var d=s(n,t,a,e,r,o,l,i);c[d.id]=d},paint:function(n){for(var t in c)c[t].paint(n)},tick:function(){for(var n in c){var t=c[n];t.tick()&&(r(t),o(t))}}}}function p(n,t){function a(n,t){var a=r[n];if(a){var i=a[t];i&&!u[i.id]&&i.shape.colorName==d.colorName&&e(i)}}function e(n){var t=n.colNumber,e=n.rowNumber;u[n.id]=n,v.push(n),a(t-2,e),a(t+2,e),a(t-1,e-1),a(t+1,e-1),a(t-1,e+1),a(t+1,e+1)}var r={};for(var i in t){var o=t[i];r[i]={};for(var c in o){var l=o[c];r[i][l.rowNumber]=l}}var d=n.shape,u={},v=[];return e(n),v}function m(n,t,a,e){var r=n/2,i=t+a,o=8,c=0,l=2*a/o,d={ready:!1,shape:e,paint:function(n){n.globalAlpha=c/o,e.paint(n,r,i),n.globalAlpha=1},tick:function(){o>c?(c++,i-=l):d.ready=!0}};return d}function g(n){function t(n,t){var e=i[n];if(e){var o=e[t];if(o){var c=o.id;v[c]||(v[c]=!0,delete r[c],a(o))}}}function a(n){var a=n.colNumber,e=n.rowNumber;t(a-1,e-1),t(a+1,e-1),t(a-2,e),t(a+2,e),t(a-1,e+1),t(a+1,e+1)}var e=[],r={},i={};for(var o in n){var c=n[o];i[o]={};for(var l in c){var d=c[l],u=d.rowNumber;u?(i[o][u]=d,r[d.id]=d):e.push(d)}}for(var v={},o=0;o<e.length;o++)a(e[o]);return r}function b(n,t){for(var a=6*n,e=16,r=[],i=0;e>i;i++){var o=a*(e-i)/e,c=o+1,l=document.createElement("canvas");l.width=l.height=2*c;var d=l.getContext("2d");d.fillStyle=t,d.translate(c,c),d.arc(0,0,o,0,2*Math.PI),d.fill(),r.push(l)}return r}function w(){var n=[],t=0;return{add:function(a,e){n.push({chance:a,shape:e}),t+=a},get:function(){var a=Math.random()*t;for(var e in n){var r=n[e];if(a-=r.chance,0>a)return r.shape}}}}function x(n,t){var a=Math.random()*Math.PI*2,e=n+Math.random()*t,r=Math.cos(a)*e,i=Math.sin(a)*e;return[r,i]}function y(n,t,a){function e(){c&&c--,c||(f.visible=!1,f.hiding=!1),d=c/l}function r(){l>c?c++:f.showing=!1,d=c/l}var i,o,c=0,l=24,d=0,u=26*a,v="bold "+u+"px Arial, sans-serif",f={tick:r,hiding:!1,showing:!1,visible:!1,hide:function(){f.showing=!1,f.tick=e,f.hiding=!0},paint:function(a){var e=Math.pow(d,.25);a.fillStyle="rgba(0, 0, 0, "+.7*e+")",a.fillRect(0,0,n,t);var r=n/2,c=t/4+t*e/4-1.5*u;a.translate(r,c),a.fillStyle="rgba(255, 255, 255, "+e+")",a.textAlign="center",a.textBaseline="top",a.font=v,a.fillText("YOUR SCORE: "+i,0,0),i>o?a.fillText("NEW RECORD!",0,2*u):a.fillText("HIGH SCORE: "+o,0,2*u),a.translate(-r,-c)},show:function(n,t){i=n,o=t,f.visible=!0,f.hiding=!1,f.tick=r,f.showing=!0}};return f}function C(n,t,a,e,r){var i={colNumber:r,id:Math.random(),rowNumber:e,shape:a,x:n,y:t,paint:function(t){a.paint(t,n,i.y)}};return i}function M(n,t,e,r,i,o,c,l,d,u){function v(n){var t=n.id;N[t]=n,I[n.colNumber][t]=n,f(n)}function f(n){!T.gameOver&&n.rowNumber>=E&&(T.gameOver=!0,u())}function s(n,a){for(var e=t+n*t,c=t-o-y,l=0;a>l;l++){var d=i(),u=C(e,c,d,0,n);v(u),h(u,w+M),e+=r,n+=2}}function h(n,t){var a=n.id;k[a]?k[a].steps+=t:k[a]={steps:t,bubble:n}}function m(n){var t=n.id;delete N[t],delete I[n.colNumber][t]}function b(){for(var n in N){var t=N[n];h(t,w),t.rowNumber++,f(t)}B?s(1,e-1):s(0,e),B=!B,y+=o,M+=w}for(var w=4,x=o/w,y=0,M=0,N={},k={},I={},S=0;2*e-1>S;S++)I[S]={};var E=Math.floor((n-r)/o),B=!1,P=3,T={gameOver:!1,shift:b,stillBubbles:N,add:function(n){var e=n.y,i=M*x-t,u=Math.round((e+i)/o);e=u*o-i;var f=(u+(B?1:0))%2?t:0,s=n.x;s=Math.round((s-f)/r)*r+f;var b=Math.floor(s/t)-1,w=C(s,e,n.shape,u,b);v(w),M&&h(w,M);var y=p(w,I);if(y.length>=P){var N=a(I,y),k=0;for(var S in N){var E=N[S];m(E),c(E.x,E.y,E.shape),k++}d(k-P+1);var T=g(I);for(var S in T){var G=T[S];m(G),l(G.x,G.y,G.shape)}}},isOdd:function(){return B},paint:function(n){for(var t in N)N[t].paint(n)},reset:function(){T.gameOver=!1,k={};for(var n in N)delete N[n];for(var n in I){var t=I[n];for(var n in t)delete t[n]}b(),b(),b()},tick:function(){for(var n in k){var t=k[n];t.steps--,t.bubble.y+=x,t.steps||(delete k[n],n--)}M&&(M--,y-=x)}};return T}function N(n,t,a){var e=0,r=10*a,i=n-t+10*a,o="bold "+26*a+"px Arial, sans-serif";return{add:function(n){e+=n},get:function(){return e},paint:function(n){n.textBaseline="top",n.font=o,n.fillStyle="#777",n.fillText(e,r,i)},reset:function(){e=0}}}function k(n,t){var a="hsl(0, 0%, 40%)",e=n+2,r=B(a,"hsl(0, 0%, 15%)",n);return{color:a,colorName:"black",particleCanvases:b(t,a),paint:function(n,t,a){n.drawImage(r,t-e,a-e)}}}function I(n,t,a){var e="hsl(220, 100%, 70%)",r=t+2,i=B(e,"hsl(220, 100%, 55%)",t),o=i.getContext("2d");return{color:e,colorName:"blue",laserGradient:u(n,o,220,100,70),particleCanvases:b(a,e),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function S(n,t){var a="hsl(220, 100%, 70%)",r=n+2,i=B(a,"hsl(220, 100%, 55%)",n);return E(i,n),{color:a,colorName:"blue",isBomb:!0,particleCanvases:e(t,a),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function E(n,t){var a=n.getContext("2d"),e="rgba(255 ,255, 255, 0.4)";a.beginPath(),a.arc(0,0,.25*t,0,2*Math.PI),a.fillStyle=e,a.fill();var r=3,i=2*Math.PI/r,o=.62*t,c=Math.PI/3;a.lineWidth=.45*t,a.beginPath(),a.rotate(Math.PI/2-c/2);for(var l=0;r>l;l++)a.moveTo(o,0),a.arc(0,0,o,0,c),a.rotate(i);a.strokeStyle=e,a.stroke()}function B(n,t,a){var e=a+2,r=document.createElement("canvas");r.width=r.height=2*e;var i=r.getContext("2d"),o=-a/2,c=i.createRadialGradient(0,o,0,0,o,2*a);return c.addColorStop(0,n),c.addColorStop(.5,t),c.addColorStop(1,n),i.fillStyle=c,i.translate(e,e),i.arc(0,0,a,0,2*Math.PI),i.fillStyle=c,i.fill(),r}function P(n,t,a){var e="hsl(100, 100%, 40%)",r=t+2,i=B(e,"hsl(100, 100%, 30%)",t),o=i.getContext("2d");return{color:e,colorName:"green",laserGradient:u(n,o,100,100,40),particleCanvases:b(a,e),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function T(n,t){var a="hsl(100, 100%, 40%)",r=n+2,i=B(a,"hsl(100, 100%, 30%)",n);return E(i,n),{color:a,colorName:"green",isBomb:!0,particleCanvases:e(t,a),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function G(n,t,a){var e="hsl(5, 100%, 65%)",r=t+2,i=B(e,"hsl(5, 100%, 40%)",t),o=i.getContext("2d");return{color:e,colorName:"red",laserGradient:u(n,o,5,100,65),particleCanvases:b(a,e),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function L(n,t){var a="hsl(5, 100%, 65%)",r=n+2,i=B(a,"hsl(5, 100%, 40%)",n);return E(i,n),{color:a,colorName:"red",isBomb:!0,particleCanvases:e(t,a),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function R(n,t,a){var e="hsl(300, 100%, 60%)",r=t+2,i=B(e,"hsl(300, 100%, 40%)",t),o=i.getContext("2d");return{color:e,colorName:"violet",laserGradient:u(n,o,300,100,60),particleCanvases:b(a,e),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function O(n,t){var a="hsl(300, 100%, 60%)",r=n+2,i=B(a,"hsl(300, 100%, 40%)",n);return E(i,n),{color:a,colorName:"violet",isBomb:!0,particleCanvases:e(t,a),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function A(n,t,a){var e="hsl(0, 0%, 90%)",r=t+2,i=B(e,"hsl(0, 0%, 70%)",t),o=i.getContext("2d");return{color:e,colorName:"white",laserGradient:u(n,o,0,0,90),particleCanvases:b(a,e),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function D(n,t){var a="hsl(0, 0%, 90%)",r=n+2,i=B(a,"hsl(0, 0%, 70%)",n);return E(i,n),{color:a,colorName:"white",isBomb:!0,particleCanvases:e(t,a),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function H(n,t,a){var e="hsl(60, 90%, 70%)",r=t+2,i=B(e,"hsl(60, 90%, 40%)",t),o=i.getContext("2d");return{color:e,colorName:"yellow",laserGradient:u(n,o,60,90,70),particleCanvases:b(a,e),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}function W(n,t){var a="hsl(60, 90%, 70%)",r=n+2,i=B(a,"hsl(60, 90%, 40%)",n);return E(i,n),{color:a,colorName:"yellow",isBomb:!0,particleCanvases:e(t,a),paint:function(n,t,a){n.drawImage(i,t-r,a-r)}}}!function(){var n=f();document.body.appendChild(n.element)}()}();