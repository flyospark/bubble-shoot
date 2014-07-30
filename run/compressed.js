!function(){function a(a,n,t,e){var r=t/2,i=8*e,o=4*e,l=r-o/2,c=r+i,u=Math.asin(l/c),d=Math.sqrt(1-Math.pow(l/c,2))*c,v=t+i+o,f=a/2,s=n-v,h=document.createElement("canvas");h.width=a,h.height=v;var m=h.getContext("2d");return m.lineJoin=m.lineCap="round",m.translate(f,v-r),m.moveTo(-f+o,-l),m.lineTo(-d,-l),m.arc(0,0,c,-Math.PI+u,-u),m.lineTo(f-o,-l),m.strokeStyle="#555",m.lineWidth=o,m.stroke(),{paint:function(a){a.drawImage(h,0,s)}}}function n(a,n){var t=document.createElement("canvas");t.width=a,t.height=n;var e=t.getContext("2d");return{c:e,canvas:t,clear:function(){e.fillStyle="rgba(0, 0, 0, 0.3)",e.fillRect(0,0,a,n)}}}function t(a,n){function t(a,n){var t=r[a];if(t){var i=t[n];i&&!u[i.id]&&(u[i.id]=i,i.shape.isBomb&&e(i))}}function e(a){var n=a.colNumber,e=a.rowNumber;t(n-2,e),t(n+2,e),t(n-1,e-1),t(n+1,e-1),t(n-1,e+1),t(n+1,e+1)}var r={};for(var i in a){var o=a[i];r[i]={};for(var l in o){var c=o[l];r[i][c.rowNumber]=c}}for(var u={},i=0;i<n.length;i++){var d=n[i];u[d.id]=d,d.shape.isBomb&&e(d)}return u}function e(a,n){for(var t=6*a,e=24,r=[],i=0;e>i;i++){var o=t*(e-i)/e,l=o+1,c=document.createElement("canvas");c.width=c.height=2*l;var u=c.getContext("2d");u.fillStyle=n,u.translate(l,l),u.arc(0,0,o,0,2*Math.PI),u.fill(),r.push(c)}return r}function r(a,n,t,e){var r,i,o=0,l=t.particleCanvases;t.isBomb?(r=3*e,i=10):(r=2*e,i=5);for(var c=[],u=0;i>u;u++){var d=x(r,r),v=x(r,r);c.push({x:a+d[0],y:n+d[1],dx:v[0],dy:v[1]})}return{id:Math.random(),paint:function(e){o||t.paint(e,a,n);for(var r in c){var i=l[o],u=c[r],d=u.x-i.width/2,v=u.y-i.height/2;e.drawImage(i,d,v)}},tick:function(){for(var a in c){var n=c[a];n.x+=n.dx,n.y+=n.dy}return o++,o==l.length?!0:void 0}}}function i(a){var n={};return{add:function(t,e,i){var o=r(t,e,i,a);n[o.id]=o},paint:function(a){for(var t in n)n[t].paint(a)},tick:function(){for(var a in n)n[a].tick()&&delete n[a]}}}function o(a,n,t){var e=[];for(var r in a){var i=a[r];for(var o in n){var l=n[o],c=l.x-i.x,u=l.y-i.y,d=Math.sqrt(c*c+u*u);if(t>d){e.push({movingBubble:i,stillBubble:l,distance:d});break}}}return e}function l(a){var n={};return{add:function(t,e,r){var i=c(t,e,r,a);n[i.id]=i},paint:function(a){for(var t in n)n[t].paint(a)},tick:function(){for(var a in n)n[a].tick()&&delete n[a]}}}function c(a,n,t,e){var r=32,i=r,o=1,l=6*(2*Math.random()-1)*e,c=0;return{id:Math.random(),paint:function(e){e.globalAlpha=o,t.paint(e,a,n),e.globalAlpha=1},tick:function(){return a+=l,n+=c,c+=e,l*=.95,i--,i?(o=i/r,void 0):!0}}}function u(a,n,t,e,r,i){var o=2*Math.max(a,n),l=a/2,c=n-t;return{paint:function(a,n,t,r){var u=n-l,d=t-c,v=Math.sqrt(u*u+d*d),f=u*o/v,s=d*o/v;-i>d/v&&(a.beginPath(),a.moveTo(l,c),a.lineTo(l+f,c+s),a.lineWidth=e,a.lineCap="round",a.strokeStyle=r,a.stroke())}}}function d(a,n,t,e,r){var i=t+", "+e+"%, "+r+"%",o=n.createLinearGradient(0,0,0,a);return o.addColorStop(0,"hsla("+i+", 0)"),o.addColorStop(1,"hsla("+i+", 0.2)"),o}function v(a,n,t){var e=(a-a*t)/2,r=(n-n*t)/2,i=document.createElement("canvas");return i.className="MainCanvas",i.width=a,i.height=n,i.style.transform="scale("+1/t+") translate("+e+"px, "+r+"px)",i}function f(){function t(){var a=fn.get();return p(U,j,F,a)}function e(){if(kn){var a=Nn-U/2,n=j-F-yn,t=Math.sqrt(a*a+n*n),e=a/t,r=-n/t;if(-Pn>r&&Dn&&Dn.ready){var i=Dn.shape;Mn.add(i,e,r),Dn=null,Ln=10,Gn=null,kn=!1}}}function r(){return!Dn||!Dn.ready||xn.showing||xn.hiding?!0:xn.visible?(xn.hide(),Cn.reset(),wn.reset(),!0):void 0}function c(a){Nn=a.clientX*g-Sn,yn=a.clientY*g-Bn}function d(a){Nn=a.clientX*g-Sn,yn=a.clientY*g-Bn,kn=!0}function f(){requestAnimationFrame(function(){var a=Date.now();hn.clear(),En.clearRect(0,0,U,j),pn.paint(mn),wn.paint(mn),Cn.paint(mn),kn&&Tn.paint(mn,Nn,yn,Dn.shape.laserGradient),Dn&&Dn.paint(mn),Mn.paint(mn),bn.paint(mn),gn.paint(mn),xn.visible&&xn.paint(mn),En.drawImage(hn.canvas,0,0),Q.innerHTML="repaint "+(Date.now()-a),f()})}function s(a){var n;return n=a.isBomb?"bomb":"normal",vn[a.colorName][n]}function m(){for(var a=0;2>a;a++){var n=Date.now();Cn.tick(),Mn.tick(),bn.tick(),gn.tick(),xn.visible&&xn.tick();for(var e=o(Mn.movingBubbles,Cn.stillBubbles,X),r=0;r<e.length;r++){var i=e[r],l=i.movingBubble;l.shiftBack(E-i.distance),b(l),Mn.remove(l)}Ln?(Ln--,Ln||(Dn=t())):Dn&&Dn.tick(),K.innerHTML="tick "+(Date.now()-n)}}function b(a){Cn.add(a),qn++,qn===Hn&&(qn=0,Cn.shift())}var g=devicePixelRatio,x=innerWidth*g,N=innerHeight*g,B=9+Math.floor((x-300)/200),E=Math.floor(x/B),W=E/40,F=E/2,J=Math.sin(Math.PI/3)*E,Y=F-1*W,X=2*Y,U=x-x%E,j=N-N%E,z="MainPanel",K=document.createElement("div"),Q=document.createElement("div"),V=document.createElement("div");V.className=z+"-debug",V.appendChild(Q),V.appendChild(K);var Z=k(Y,W),$=I(j,Y,W),_=S(Y,W),an=P(j,Y,W),nn=T(Y,W),tn=D(j,Y,W),en=L(Y,W),rn=O(j,Y,W),on=G(Y,W),ln=R(j,Y,W),cn=A(Y,W),un=q(j,Y,W),dn=H(Y,W),vn={black:{normal:Z},blue:{normal:$,bomb:_},green:{normal:an,bomb:nn},red:{normal:tn,bomb:en},violet:{normal:rn,bomb:on},white:{normal:ln,bomb:cn},yellow:{normal:un,bomb:dn}},fn=w();fn.add(1,$),fn.add(1,an),fn.add(1,tn),fn.add(1,rn),fn.add(1,ln),fn.add(1,un);var sn=w();sn.add(3,Z),sn.add(8,$),sn.add(1,_),sn.add(8,an),sn.add(1,nn),sn.add(8,tn),sn.add(1,en),sn.add(8,rn),sn.add(1,on),sn.add(8,ln),sn.add(1,cn),sn.add(8,un),sn.add(1,dn);var hn=n(U,j),mn=hn.c,pn=a(U,j,E,W),bn=i(W),gn=l(W),wn=M(j,E,W),xn=C(U,j,W),Cn=y(j,F,B,E,sn.get,J,bn.add,gn.add,wn.add,function(){var a=wn.get();xn.show(a,On),a>On&&(On=a,localStorage.highScore=On)});Cn.reset();var Nn,yn,Mn=h(U,j,F,X,b,W),kn=!1,In=v(x,N,g),Sn=(x-U)/2,Bn=(N-j)/2,En=In.getContext("2d");En.translate(Sn,Bn);var Pn=.2,Tn=u(U,j,F,X,En,Pn),Dn=t(),Ln=0,On=parseInt(localStorage.highScore,10);isFinite(On)||(On=0);var Gn=null,Rn=!1,An=document.createElement("div");An.className=z,An.appendChild(In),An.appendChild(V),An.addEventListener("mousedown",function(a){if(Rn)Rn=!1;else{if(r())return;kn||d(a)}}),An.addEventListener("touchstart",function(a){if(!r()&&!kn){var n=a.changedTouches[0];Gn=n.identifier,d(n)}}),addEventListener("mousemove",function(a){Rn?Rn=!1:c(a)}),An.addEventListener("touchmove",function(a){Rn=!0,a.preventDefault();for(var n=a.changedTouches,t=0;t<n.length;t++){var e=n[t];e.identifier===Gn&&c(e)}}),addEventListener("mouseup",function(a){Rn?Rn=!1:e(a)}),An.addEventListener("touchend",function(a){Rn=!0,a.preventDefault();for(var n=a.changedTouches,t=0;t<n.length;t++){var r=n[t];r.identifier===Gn&&e(r)}});var qn=0,Hn=7;return addEventListener("beforeunload",function(){localStorage.state=JSON.stringify({width:x,height:N,dpp:g,score:wn.get(),stillCanvas:Cn.getData(),nextBubbleColorName:Dn?Dn.shape.colorName:null})}),addEventListener("keydown",function(a){32==a.keyCode&&m()}),setInterval(m,30),f(),function(){var a=localStorage.state;if(a){var n=JSON.parse(a);if(n.width==x||n.height==N||n.dpp==g){wn.add(n.score),Cn.setData(n.stillCanvas,s);var t=n.nextBubbleColorName;if(t){var e=vn[t].normal;Dn=p(U,j,F,e)}}}}(),{element:An}}function s(a,n,t,e,r,i,o,l){var c=20*l,u=i*c,d=o*c,v={id:Math.random(),shape:r,x:a/2,y:n-t,paint:function(a){r.paint(a,v.x,v.y)},shiftBack:function(n){var e=Math.sqrt(i*i+o*o);v.x-=i*n/e,v.y-=o*n/e;var r=t-v.x;r>0&&(v.x+=2*r);var l=v.x+t-a;l>0&&(v.x-=2*l)},tick:function(){v.x+=u,v.y+=d;var n=t-v.x;n>0&&(v.x+=2*n,i=-i,u=i*c);var e=v.x+t-a;return e>0&&(v.x-=2*e,i=-i,u=i*c),v.y<=t?(v.y=t,!0):void 0}};return v}function h(a,n,t,e,r,i){function o(a){delete l[a.id]}var l={};return{movingBubbles:l,remove:o,add:function(r,o,c){var u=s(a,n,t,e,r,o,c,i);l[u.id]=u},paint:function(a){for(var n in l)l[n].paint(a)},tick:function(){for(var a in l){var n=l[a];n.tick()&&(r(n),o(n))}}}}function m(a,n){function t(a,n){var t=r[a];if(t){var i=t[n];i&&!d[i.id]&&i.shape.colorName==u.colorName&&e(i)}}function e(a){var n=a.colNumber,e=a.rowNumber;d[a.id]=a,v.push(a),t(n-2,e),t(n+2,e),t(n-1,e-1),t(n+1,e-1),t(n-1,e+1),t(n+1,e+1)}var r={};for(var i in n){var o=n[i];r[i]={};for(var l in o){var c=o[l];r[i][c.rowNumber]=c}}var u=a.shape,d={},v=[];return e(a),v}function p(a,n,t,e){var r=a/2,i=n+t,o=8,l=0,c=2*t/o,u={ready:!1,shape:e,paint:function(a){a.globalAlpha=l/o,e.paint(a,r,i),a.globalAlpha=1},tick:function(){o>l?(l++,i-=c):u.ready=!0}};return u}function b(a){function n(a,n){var e=i[a];if(e){var o=e[n];if(o){var l=o.id;v[l]||(v[l]=!0,delete r[l],t(o))}}}function t(a){var t=a.colNumber,e=a.rowNumber;n(t-1,e-1),n(t+1,e-1),n(t-2,e),n(t+2,e),n(t-1,e+1),n(t+1,e+1)}var e=[],r={},i={};for(var o in a){var l=a[o];i[o]={};for(var c in l){var u=l[c],d=u.rowNumber;d?(i[o][d]=u,r[u.id]=u):e.push(u)}}for(var v={},o=0;o<e.length;o++)t(e[o]);return r}function g(a,n){for(var t=6*a,e=16,r=[],i=0;e>i;i++){var o=t*(e-i)/e,l=o+1,c=document.createElement("canvas");c.width=c.height=2*l;var u=c.getContext("2d");u.fillStyle=n,u.translate(l,l),u.arc(0,0,o,0,2*Math.PI),u.fill(),r.push(c)}return r}function w(){var a=[],n=0;return{add:function(t,e){a.push({chance:t,shape:e}),n+=t},get:function(){var t=Math.random()*n;for(var e in a){var r=a[e];if(t-=r.chance,0>t)return r.shape}}}}function x(a,n){var t=Math.random()*Math.PI*2,e=a+Math.random()*n,r=Math.cos(t)*e,i=Math.sin(t)*e;return[r,i]}function C(a,n,t){function e(){l&&l--,l||(f.visible=!1,f.hiding=!1),u=l/c}function r(){c>l?l++:f.showing=!1,u=l/c}var i,o,l=0,c=24,u=0,d=26*t,v="bold "+d+"px Arial, sans-serif",f={tick:r,hiding:!1,showing:!1,visible:!1,hide:function(){f.showing=!1,f.tick=e,f.hiding=!0},paint:function(t){var e=Math.pow(u,.25);t.fillStyle="rgba(0, 0, 0, "+.7*e+")",t.fillRect(0,0,a,n);var r=a/2,l=n/4+n*e/4-1.5*d;t.translate(r,l),t.fillStyle="rgba(255, 255, 255, "+e+")",t.textAlign="center",t.textBaseline="top",t.font=v,t.fillText("YOUR SCORE: "+i,0,0),i>o?t.fillText("NEW RECORD!",0,2*d):t.fillText("HIGH SCORE: "+o,0,2*d),t.translate(-r,-l)},show:function(a,n){i=a,o=n,f.visible=!0,f.hiding=!1,f.tick=r,f.showing=!0}};return f}function N(a,n,t,e,r){var i={colNumber:r,id:Math.random(),rowNumber:e,shape:t,x:a,y:n,paint:function(n){t.paint(n,a,i.y)}};return i}function y(a,n,e,r,i,o,l,c,u,d){function v(a){var n=a.id;M[n]=a,I[a.colNumber][n]=a,f(a)}function f(a){!T.gameOver&&a.rowNumber>=B&&(T.gameOver=!0,d())}function s(a,t){for(var e=n+a*n,l=n-o-C,c=0;t>c;c++){var u=i(),d=N(e,l,u,0,a);v(d),h(d,w+y),e+=r,a+=2}}function h(a,n){var t=a.id;k[t]?k[t].steps+=n:k[t]={steps:n,bubble:a}}function p(a){var n=a.id;delete M[n],delete I[a.colNumber][n]}function g(){for(var a in M){var n=M[a];h(n,w),n.rowNumber++,f(n)}E?s(1,e-1):s(0,e),E=!E,C+=o,y+=w}for(var w=4,x=o/w,C=0,y=0,M={},k={},I={},S=0;2*e-1>S;S++)I[S]={};var B=Math.floor((a-r)/o),E=!1,P=3,T={gameOver:!1,shift:g,stillBubbles:M,add:function(a){var e=a.y,i=y*x-n,d=Math.round((e+i)/o);e=d*o-i;var f=(d+(E?1:0))%2?n:0,s=a.x;s=Math.round((s-f)/r)*r+f;var g=Math.floor(s/n)-1,w=N(s,e,a.shape,d,g);v(w),y&&h(w,y);var C=m(w,I);if(C.length>=P){var M=t(I,C),k=0;for(var S in M){var B=M[S];p(B),l(B.x,B.y,B.shape),k++}u(k-P+1);var T=b(I);for(var S in T){var D=T[S];p(D),c(D.x,D.y,D.shape)}}},getData:function(){var a={odd:E,bubbles:[],shiftIndex:y};for(var n in M){var t=M[n],e=t.shape;a.bubbles.push({colNumber:t.colNumber,rowNumber:t.rowNumber,shape:{colorName:e.colorName,isBomb:e.isBomb}})}return a},isOdd:function(){return E},paint:function(a){for(var n in M)M[n].paint(a)},reset:function(){T.gameOver=!1,k={};for(var a in M)delete M[a];for(var a in I){var n=I[a];for(var a in n)delete n[a]}g(),g(),g()},setData:function(a,t){E=a.odd,y=Math.max(0,Math.floor(a.shiftIndex)),isFinite(y)||(y=0),C=y*o;for(var e in M)delete M[e];for(var e in I){var r=I[e];for(var e in r)delete r[e]}for(var e in k)delete k[e];var i=a.bubbles;for(var e in i){var l=i[e],c=t(l.shape);if(c){var u=l.colNumber,d=l.rowNumber,f=n+u*n,s=n+d*o,h=N(f,s,c,d,u);v(h)}}},tick:function(){for(var a in k){var n=k[a];n.steps--,n.bubble.y+=x,n.steps||(delete k[a],a--)}y&&(y--,C-=x)}};return T}function M(a,n,t){var e=0,r=10*t,i=a-n+10*t,o="bold "+26*t+"px Arial, sans-serif";return{add:function(a){e+=a},get:function(){return e},paint:function(a){a.textBaseline="top",a.font=o,a.fillStyle="#777",a.fillText(e,r,i)},reset:function(){e=0}}}function k(a,n){var t="hsl(0, 0%, 40%)",e=a+2,r=E(t,"hsl(0, 0%, 15%)",a);return{color:t,colorName:"black",particleCanvases:g(n,t),paint:function(a,n,t){a.drawImage(r,n-e,t-e)}}}function I(a,n,t){var e="hsl(220, 100%, 70%)",r=n+2,i=E(e,"hsl(220, 100%, 55%)",n),o=i.getContext("2d");return{color:e,colorName:"blue",laserGradient:d(a,o,220,100,70),particleCanvases:g(t,e),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function S(a,n){var t="hsl(220, 100%, 70%)",r=a+2,i=E(t,"hsl(220, 100%, 55%)",a);return B(i,a),{color:t,colorName:"blue",isBomb:!0,particleCanvases:e(n,t),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function B(a,n){var t=a.getContext("2d"),e="rgba(255 ,255, 255, 0.4)";t.beginPath(),t.arc(0,0,.25*n,0,2*Math.PI),t.fillStyle=e,t.fill();var r=3,i=2*Math.PI/r,o=.62*n,l=Math.PI/3;t.lineWidth=.45*n,t.beginPath(),t.rotate(Math.PI/2-l/2);for(var c=0;r>c;c++)t.moveTo(o,0),t.arc(0,0,o,0,l),t.rotate(i);t.strokeStyle=e,t.stroke()}function E(a,n,t){var e=t+2,r=document.createElement("canvas");r.width=r.height=2*e;var i=r.getContext("2d"),o=-t/2,l=i.createRadialGradient(0,o,0,0,o,2*t);return l.addColorStop(0,a),l.addColorStop(.5,n),l.addColorStop(1,a),i.fillStyle=l,i.translate(e,e),i.arc(0,0,t,0,2*Math.PI),i.fillStyle=l,i.fill(),r}function P(a,n,t){var e="hsl(100, 100%, 40%)",r=n+2,i=E(e,"hsl(100, 100%, 30%)",n),o=i.getContext("2d");return{color:e,colorName:"green",laserGradient:d(a,o,100,100,40),particleCanvases:g(t,e),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function T(a,n){var t="hsl(100, 100%, 40%)",r=a+2,i=E(t,"hsl(100, 100%, 30%)",a);return B(i,a),{color:t,colorName:"green",isBomb:!0,particleCanvases:e(n,t),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function D(a,n,t){var e="hsl(5, 100%, 65%)",r=n+2,i=E(e,"hsl(5, 100%, 40%)",n),o=i.getContext("2d");return{color:e,colorName:"red",laserGradient:d(a,o,5,100,65),particleCanvases:g(t,e),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function L(a,n){var t="hsl(5, 100%, 65%)",r=a+2,i=E(t,"hsl(5, 100%, 40%)",a);return B(i,a),{color:t,colorName:"red",isBomb:!0,particleCanvases:e(n,t),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function O(a,n,t){var e="hsl(300, 100%, 60%)",r=n+2,i=E(e,"hsl(300, 100%, 40%)",n),o=i.getContext("2d");return{color:e,colorName:"violet",laserGradient:d(a,o,300,100,60),particleCanvases:g(t,e),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function G(a,n){var t="hsl(300, 100%, 60%)",r=a+2,i=E(t,"hsl(300, 100%, 40%)",a);return B(i,a),{color:t,colorName:"violet",isBomb:!0,particleCanvases:e(n,t),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function R(a,n,t){var e="hsl(0, 0%, 90%)",r=n+2,i=E(e,"hsl(0, 0%, 70%)",n),o=i.getContext("2d");return{color:e,colorName:"white",laserGradient:d(a,o,0,0,90),particleCanvases:g(t,e),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function A(a,n){var t="hsl(0, 0%, 90%)",r=a+2,i=E(t,"hsl(0, 0%, 70%)",a);return B(i,a),{color:t,colorName:"white",isBomb:!0,particleCanvases:e(n,t),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function q(a,n,t){var e="hsl(60, 90%, 70%)",r=n+2,i=E(e,"hsl(60, 90%, 40%)",n),o=i.getContext("2d");return{color:e,colorName:"yellow",laserGradient:d(a,o,60,90,70),particleCanvases:g(t,e),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}function H(a,n){var t="hsl(60, 90%, 70%)",r=a+2,i=E(t,"hsl(60, 90%, 40%)",a);return B(i,a),{color:t,colorName:"yellow",isBomb:!0,particleCanvases:e(n,t),paint:function(a,n,t){a.drawImage(i,n-r,t-r)}}}!function(){var a=f();document.body.appendChild(a.element)}()}();