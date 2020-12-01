(this.webpackJsonpbattleship_react=this.webpackJsonpbattleship_react||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n(1),c=n.n(r),i=n(8),s=n.n(i),l=n(2),o=n(4),u=n(7),f=c.a.forwardRef((function(t,e){var n=t.id,r=t.length,c=t.player;return Object(a.jsx)("div",{className:"ship",ref:e,id:n,children:Array(r).fill(null).map((function(t,e){return Object(a.jsx)("div",{className:"cell--".concat(c," cell--ship")},e)}))})}));var d=function(t){var e=t.x,n=t.y,r=t.wasHit,c=t.containsShip,i=t.isShipSunk,s=t.playerPlay,l=t.gameState,o=t.player,u=t.board;return Object(a.jsxs)("div",{className:"cell + cell--".concat(o)+(u?" cell--board":"")+(i?" cell--sunk":"")+(1===o&&c?" cell--ship":""),"data-x":e,"data-y":n,onClick:function(t){"game"===l&&2===o&&s(t)},children:[r&&c&&Object(a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-circle mark--o",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:1===o||2===o&&i?"#00131a":"#02ffff",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[Object(a.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("circle",{cx:"12",cy:"12",r:"9"})]}),r&&!c&&Object(a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-x mark--x",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"#02ffff",fill:"none",strokeLinecap:"round",strokeLinejoin:"round",children:[Object(a.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),Object(a.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})]})},h=[{id:0,name:"carrier",length:5},{id:1,name:"battleship",length:4},{id:2,name:"cruiser",length:3},{id:3,name:"submarine",length:3},{id:4,name:"destroyer",length:2}];var j=function(t){var e=t.size,n=t.gameState,i=t.player,s=t.changeGameState,j=t.changeCurrentPlayer,b=t.currentPlayer,y=t.changeLastShipSunk,x=t.changePlayerStats,m=t.difficulty,O=t.changeGameResult,g=Object(r.useState)(Array(e).fill(null).map((function(){return Array(e).fill(null)}))),p=Object(l.a)(g,2),v=p[0],w=p[1],_=Object(r.useState)([{id:1},{id:2},{id:3},{id:4},{id:5}]),S=Object(l.a)(_,2),k=S[0],N=S[1],M=Object(r.useState)(Array(e).fill(null).map((function(){return Array(e).fill(null)}))),L=Object(l.a)(M,2),z=L[0],A=L[1],R=Object(r.useState)({hits:0,accuracy:0,fleet:h.reduce((function(t,e){return t+ +e.length}),0),shipsSunk:[],wins:0}),C=Object(l.a)(R,2),E=C[0],P=C[1],B=Object(r.useRef)(null),W=[Object(r.useRef)(null),Object(r.useRef)(null),Object(r.useRef)(null),Object(r.useRef)(null),Object(r.useRef)(null)],H=Object(r.useState)({x:"",y:""}),X=Object(l.a)(H,2),G=X[0],F=X[1],D=Object(r.useState)({x:"",y:""}),I=Object(l.a)(D,2),J=I[0],T=I[1],Y=Object(r.useState)([]),q=Object(l.a)(Y,2),K=q[0],Q=q[1],U=Object(r.useState)({}),V=Object(l.a)(U,2),Z=V[0],$=V[1],tt=function(t){var n=t.length,a=t.width;return{x:Math.floor(Math.random()*(e-n+1)),y:Math.floor(Math.random()*(e-a+1))}},et=function(t,e,n,a){for(var r=e.x;r<e.x+n;r+=1)for(var c=e.y;c<e.y+a;c+=1)if(null!==t[r][c])return!1;return!0},nt=function(t,e){var n,a,r=(n=e.length,Math.random()>.5?{length:1,width:n}:{length:n,width:1});do{a=tt(r)}while(!et(t,a,r.length,r.width));var c={};return c.id=e.id,c.coordinates=a,c.length=r.length,c.width=r.width,c};Object(r.useEffect)((function(){1===i&&k.forEach((function(t,e){t.coordinates&&function(t,e){t.current.style.gridArea="".concat(e.coordinates.x+1," / ").concat(e.coordinates.y+1," / ").concat(e.coordinates.x+e.length+1," / ").concat(e.coordinates.y+e.width+1),e.length>e.width?t.current.classList.add("ship--vertical"):t.current.classList.remove("ship--vertical")}(W[e],t)}))}),[k]);var at=function(t){if(t.target.closest(".ship")){var n=B.current.getBoundingClientRect(),a=B.current.clientWidth/e,r=+t.target.closest(".ship").id;t.preventDefault(),W[r].current.style.zIndex=1e3;var c=t.clientX-W[r].current.getBoundingClientRect().left,i=t.clientY-W[r].current.getBoundingClientRect().top,s=function(t){!function(t,e){var a=t-c-n.left,s=e-i-n.top;W[r].current.style.gridArea="",a<0&&(a=0),a>B.current.clientWidth-W[r].current.offsetWidth&&(a=B.current.clientWidth-W[r].current.offsetWidth),s<0&&(s=0),s>B.current.offsetHeight-W[r].current.offsetHeight&&(s=B.current.offsetHeight-W[r].current.offsetHeight),W[r].current.style.left="".concat(a,"px"),W[r].current.style.top="".concat(s,"px")}(t.pageX,t.pageY)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",(function t(){var e={x:Math.round((W[r].current.getBoundingClientRect().top-n.top)/a),y:Math.round((W[r].current.getBoundingClientRect().left-n.left)/a)};et(v.map((function(t){return t.map((function(t){return t===r?null:t}))})),e,k[r].length,k[r].width)||(e=rt(v.map((function(t){return t.map((function(t){return t===r?null:t}))})),e,k[r].length,k[r].width));var c=Object.assign({},k[r]);c.coordinates=e,ct(c),it(c),W[r].current.style.left="",W[r].current.style.top="",W[r].current.style.zIndex="",document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",t),W[r].current.onMouseDown=null}))}},rt=function(t,n,a,r){for(var c=n,i=1;!et(t,c,a,r);){for(var s=0;s<=i;s+=1)c.x-s>0&&c.y-(i-s)>0&&et(t,{x:c.x-s,y:c.y-(i-s)},a,r)?c={x:c.x-s,y:c.y-(i-s)}:c.x-s>0&&c.y+(i-s)<e-a&&et(t,{x:c.x-s,y:c.y+(i-s)},a,r)?c={x:c.x-s,y:c.y+(i-s)}:c.x+s<e-a&&c.y-(i-s)>0&&et(t,{x:c.x+s,y:c.y-(i-s)},a,r)?c={x:c.x+s,y:c.y-(i-s)}:c.x+s<e-a&&c.y+(i-s)<e-a&&et(t,{x:c.x+s,y:c.y+(i-s)},a,r)&&(c={x:c.x+s,y:c.y+(i-s)});i+=1}return c},ct=function(t){N((function(e){return e.map((function(e){return e.id===t.id?t:e}))}))},it=function(t){w((function(e){for(var n=Object(o.a)(e).map((function(e){return e.map((function(e){return e===t.id?null:e}))})),a=t.coordinates.x;a<t.coordinates.x+t.length;a+=1)for(var r=t.coordinates.y;r<t.coordinates.y+t.width;r+=1)n[a][r]=t.id;return n}))};Object(r.useEffect)((function(){"game"===n&&A((function(){var t,n=Array(e).fill(null).map((function(){return Array(e).fill(null)})),a=Object(u.a)(k);try{for(a.s();!(t=a.n()).done;)for(var r=t.value,c=r.coordinates.x;c<r.coordinates.x+r.length;c+=1)for(var i=r.coordinates.y;i<r.coordinates.y+r.width;i+=1)n[c][i]=r.id}catch(s){a.e(s)}finally{a.f()}return n}))}),[n]);var st=function(t){"X"!==v[t.target.dataset.x][t.target.dataset.y]&&"O"!==v[t.target.dataset.x][t.target.dataset.y]&&ot(t.target.dataset.x,t.target.dataset.y)},lt=function(){return{x:Math.floor(Math.random()*e),y:Math.floor(Math.random()*e)}},ot=function(t,e){if("X"!==v[t][e]&&"O"!==v[t][e]){if(null===v[t][e]&&w((function(n){return n[t][e]="X",n})),"number"===typeof v[t][e]){var n=Object(o.a)(v);n[t][e]="O",w(n),n.flat().includes(z[t][e])||(y(i,z[t][e]),0===n.flat().filter((function(t){return"number"===typeof t})).length&&ft())}j(),dt()}},ut=function(t,e){if(null===v[t][e]&&(w((function(n){return n[t][e]="X",n})),Q((function(t){var e=Object(o.a)(t);return e=e.slice(1)}))),"number"===typeof v[t][e]){var n=Object(o.a)(v);n[t][e]="O",w(n),0===K.length&&(F({x:t,y:e}),Q([{x:0,y:1},{x:0,y:-1},{x:-1,y:0},{x:1,y:0}])),n.flat().includes(z[t][e])||(y(i,z[t][e]),Q([]),F({x:"",y:""}),T({x:"",y:""}),0===n.flat().filter((function(t){return"number"===typeof t})).length&&ft())}T({x:t,y:e}),j(),dt()},ft=function(){s("end"),P((function(t){var e=Object.assign({},t);return e.wins=t.wins+1,e})),O(2===i?"victory":"defeat")},dt=function(){P((function(t){var e=Object.assign({},t);return e.hits=t.hits+1,e.accuracy=v.flat().filter((function(t){return"O"===t})).length,e.fleet=h.reduce((function(t,e){return t+ +e.length}),0)-v.flat().filter((function(t){return"O"===t})).length,e.shipsSunk=Array.from(new Set(z.flat().filter((function(t){return!v.flat().includes(t)})))),e}))};return Object(r.useEffect)((function(){2===b&&1===i&&("normal"===m?function(){var t,n=Object(o.a)(K);do{0===n.length?t=lt():((t=JSON.stringify(J)===JSON.stringify(G)?{x:G.x+n[0].x,y:G.y+n[0].y}:n[0]===Z?{x:J.x+n[0].x,y:J.y+n[0].y}:{x:G.x+n[0].x,y:G.y+n[0].y}).x<0||t.x>e||t.y<0||t.y>e||"X"===v[t.x][t.y]||"O"===v[t.x][t.y])&&(n=n.slice(1))}while(t.x<0||t.x>e||t.y<0||t.y>e||"X"===v[t.x][t.y]||"O"===v[t.x][t.y]);Q(n),$(n[0]),setTimeout((function(){return ut(t.x,t.y)}),300)}():function(){var t;do{t=lt()}while("X"===v[t.x][t.y]||"O"===v[t.x][t.y]);setTimeout((function(){return ot(t.x,t.y)}),300)}())}),[b]),Object(r.useEffect)((function(){"initialization"===n&&2===b&&j()}),[n]),Object(r.useEffect)((function(){"initialization"===n&&(!function(t){var n,a=Array(e).fill(null).map((function(){return Array(e).fill(null)})),r=[],c=Object(u.a)(t);try{for(c.s();!(n=c.n()).done;){var i=n.value,s=nt(a,i);r.push(s);for(var l=s.coordinates.x;l<s.coordinates.x+s.length;l+=1)for(var o=s.coordinates.y;o<s.coordinates.y+s.width;o+=1)a[l][o]=s.id}}catch(f){c.e(f)}finally{c.f()}N(r),w(a)}(h),A(Array(e).fill(null).map((function(){return Array(e).fill(null)}))))}),[n]),Object(r.useEffect)((function(){"initialization"===n&&P((function(t){var e=Object.assign({},t);return e.hits=0,e.accuracy=0,e.fleet=h.reduce((function(t,e){return t+ +e.length}),0),e.shipsSunk=[],e}))}),[n]),Object(r.useEffect)((function(){x(E)}),[E]),Object(a.jsxs)("div",{className:"container container--".concat(i),onMouseDown:function(t){"initialization"===n&&at(t)},onDoubleClick:function(t){"initialization"===n&&function(t){if(t.target.closest(".ship")){var n=+t.target.closest(".ship").id,a=Object.assign({},k[n]),r=a.length;a.length=a.width,a.width=r,a.coordinates.x+a.length>e&&(a.coordinates.x=e-a.length),a.coordinates.y+a.width>e&&(a.coordinates.y=e-a.width),et(v.map((function(t){return t.map((function(t){return t===a.id?null:t}))})),a.coordinates,a.length,a.width)||(a.coordinates=rt(v.map((function(t){return t.map((function(t){return t===a.id?null:t}))})),a.coordinates,a.length,a.width)),ct(a),it(a)}}(t)},ref:B,children:[Object(a.jsx)("div",{className:"board",children:v.map((function(t,e){return Object(a.jsx)(c.a.Fragment,{children:t.map((function(t,r){return Object(a.jsx)(d,{x:e,y:r,wasHit:"X"===v[e][r]||"O"===v[e][r],containsShip:null!==z[e][r],isShipSunk:null!==z[e][r]&&!v.flat().includes(z[e][r]),playerPlay:st,gameState:n,player:i,board:!0},"".concat(e,"-").concat(r))}))},e)}))}),1===i&&"initialization"===n&&h.map((function(t,e){return Object(a.jsx)(f,{length:t.length,id:t.id,ref:W[e],player:i},t.id)}))]})};var b=function(t){var e=t.gameState,n=t.changeGameState,r=t.currentPlayer,c=t.reset,i=t.lastShipSunk,s=t.gameResult;return Object(a.jsxs)("div",{className:"text",children:["initialization"===e&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"instructions",children:["Welcome, Lieutenant!",Object(a.jsx)("br",{}),"In such a battle, preparations are crucial. ",Object(a.jsx)("br",{}),"Take your time to think of the perfect strategy to defend your ships.",Object(a.jsx)("br",{}),"Drag your ships to place them, and double click to rotate them.",Object(a.jsx)("br",{}),"Engage in combat whenever you feel ready."]}),Object(a.jsx)("button",{type:"button",className:"btn",onClick:function(){return n("game")},children:"To Battle!"})]}),"game"===e&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"text__player",children:["Current player: ",r]}),i.player&&Object(a.jsxs)("div",{className:"text__ship",children:["Lieutenant ",i.player,"'s"," ",h[i.ship].name," sunk."]})]}),"end"===e&&Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"text__end",children:[Object(a.jsx)("div",{className:"text__result",children:s}),"Would you like to play again?"]}),Object(a.jsx)("button",{type:"button",className:"btn",onClick:c,children:"Play again"})]})]})};var y=function(t){var e=t.player1,n=t.player2,r=t.gameNumber;return Object(a.jsxs)("div",{className:"stats",children:[Object(a.jsxs)("div",{className:"stats__stat",children:[Object(a.jsx)("span",{className:"stats__name",children:"Accuracy:"}),Object(a.jsx)("span",{className:"stats__value",children:Math.floor(n.accuracy/n.hits*100)||0}),Object(a.jsx)("div",{className:"stats__outer_bar",children:Object(a.jsx)("div",{className:"stats__inner_bar",style:{width:"".concat(15*Math.floor(n.accuracy/n.hits*100)/100||0,"vh")}})})]}),Object(a.jsxs)("div",{className:"stats__stat",children:[Object(a.jsx)("span",{className:"stats__name",children:"Ally Fleet:"}),Object(a.jsx)("span",{className:"stats__value",children:Math.floor(e.fleet/h.reduce((function(t,e){return t+e.length}),0)*100)}),Object(a.jsx)("div",{className:"stats__outer_bar",children:Object(a.jsx)("div",{className:"stats__inner_bar",style:{width:"".concat(15*Math.floor(e.fleet/h.reduce((function(t,e){return t+e.length}),0)*100)/100,"vh")}})})]}),Object(a.jsxs)("div",{className:"stats__stat",children:[Object(a.jsx)("span",{className:"stats__name",children:"Enemy Fleet:"}),Object(a.jsx)("span",{className:"stats__value",children:Math.floor(n.fleet/h.reduce((function(t,e){return t+e.length}),0)*100)}),Object(a.jsx)("div",{className:"stats__outer_bar",children:Object(a.jsx)("div",{className:"stats__inner_bar",style:{width:"".concat(15*Math.floor(n.fleet/h.reduce((function(t,e){return t+e.length}),0)*100)/100,"vh")}})})]}),Object(a.jsxs)("div",{className:"stats__stat",children:[Object(a.jsx)("span",{className:"stats__name",children:"Fleets defeated:"}),Object(a.jsx)("span",{className:"stats__value",children:n.wins}),Object(a.jsx)("div",{className:"stats__outer_bar",children:Object(a.jsx)("div",{className:"stats__inner_bar",style:{width:"".concat(n.wins/r*100*15/100||0,"vh")}})})]})]})};var x=function(){var t=Object(r.useState)("initialization"),e=Object(l.a)(t,2),n=e[0],c=e[1],i=Object(r.useState)(""),s=Object(l.a)(i,2),o=s[0],u=s[1],f=Object(r.useState)(0),d=Object(l.a)(f,2),x=d[0],m=d[1],O=Object(r.useState)("normal"),g=Object(l.a)(O,2),p=g[0],v=g[1],w=Object(r.useState)(1),_=Object(l.a)(w,2),S=_[0],k=_[1],N=Object(r.useState)({player:"",ship:""}),M=Object(l.a)(N,2),L=M[0],z=M[1],A=Object(r.useState)({hits:0,accuracy:0,fleet:h.reduce((function(t,e){return t+ +e.length}),0),shipsSunk:[],wins:0}),R=Object(l.a)(A,2),C=R[0],E=R[1],P=Object(r.useState)({hits:0,accuracy:0,fleet:h.reduce((function(t,e){return t+ +e.length}),0),shipsSunk:[],wins:0}),B=Object(l.a)(P,2),W=B[0],H=B[1],X=function(t){c(t)},G=function(t){u(t),m((function(t){return t+1}))},F=function(){k((function(t){return 1===t?2:1}))},D=function(t,e){z({player:t,ship:e})};return Object(a.jsxs)("div",{className:"game",children:[Object(a.jsx)(j,{size:10,gameState:n,player:1,changeGameState:X,changeCurrentPlayer:F,currentPlayer:S,changeLastShipSunk:D,changePlayerStats:function(t){E(t)},changeGameResult:G,difficulty:p}),Object(a.jsx)(j,{size:10,gameState:n,player:2,changeGameState:X,changeCurrentPlayer:F,currentPlayer:S,changeLastShipSunk:D,changePlayerStats:function(t){H(t)},changeGameResult:G,difficulty:p}),Object(a.jsxs)("div",{className:"settings",children:[Object(a.jsx)(y,{player1:C,player2:W,gameNumber:x}),Object(a.jsxs)("div",{className:"settings__difficulty",children:[Object(a.jsx)("button",{onClick:function(){return v("normal"===p?"easy":"normal")},children:Object(a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-caret-left",width:"20",height:"20",viewBox:"0 0 24 24",strokeWidth:"1",stroke:"#02ffff",fill:"#02ffff",strokeLinecap:"round",strokeLinejoin:"round",children:[Object(a.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("path",{d:"M18 15l-6-6l-6 6h12",transform:"rotate(270 12 12)"})]})}),p,Object(a.jsx)("button",{onClick:function(){return v("normal"===p?"easy":"normal")},children:Object(a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-caret-right",width:"20",height:"20",viewBox:"0 0 24 24",strokeWidth:"1",stroke:"#02ffff",fill:"#02ffff",strokeLinecap:"round",strokeLinejoin:"round",children:[Object(a.jsx)("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),Object(a.jsx)("path",{d:"M18 15l-6-6l-6 6h12",transform:"rotate(90 12 12)"})]})})]})]}),Object(a.jsx)(b,{gameState:n,currentPlayer:S,lastShipSunk:L,changeGameState:X,reset:function(){c("initialization"),k(1)},gameResult:o})]})};n(14);var m=function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("h1",{children:"Battleship"}),Object(a.jsx)(x,{})]})};s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(m,{})}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fefbc102.chunk.js.map