(function(){"use strict";var e={554:function(e,t,o){var a=o(963),r=o(876),n=o(252),s=o(262),l=o(577);const i=(0,r.Q_)("scaleStore",(()=>{const e=(0,s.iH)(5),t=(0,s.iH)([{id:1,position:1,destination:1,speed:0,status:"rest",direction:""}]),o=()=>{e.value++},a=()=>{e.value>5&&e.value--},r=()=>t.value.length+1,l=()=>{t.value.push({id:r(),position:1,destination:1,speed:0,status:"rest",direction:""})},i=()=>{t.value.length>1&&t.value.splice(-1)},u=()=>{localStorage.setItem("ElevatorsInfo",JSON.stringify(t.value)),localStorage.setItem("FloorsAmmount",JSON.stringify(e.value))},c=()=>{const o=localStorage.getItem("ElevatorsInfo");o&&(t.value=JSON.parse(o));const a=localStorage.getItem("FloorsAmmount");a&&(e.value=JSON.parse(a))},v=(0,n.Fl)((()=>`height: ${799/e.value}px`)),d=(0,n.Fl)((()=>`top: ${800-800/e.value}px`));return(0,n.YP)(e,(()=>{u()})),(0,n.YP)(t,(()=>{u()}),{deep:!0}),{floors:e,elevators:t,elevatorHeight:v,elevatorTop:d,increaseFloor:o,decreaseFloor:a,increaseElevators:l,decreaseElevators:i,setScalingDatatoLocalStorage:u,getScalingDataFromLocalStorage:c,setID:r}})),u=(0,r.Q_)("elevatorStore",(()=>{const e=c(),t=i(),o=e=>`transform: translateY(${800*-(e.destination-1)/t.floors}px)`,a=e=>`transition: transform ${e.speed}s`,r=(t,o)=>e.floorsQueue[0]?(e.addToQueueWithElevators(t),t.destination=o):t.destination=t.position,n=e=>e.speed=Math.abs(e.destination-e.position),s=e=>{e.position<e.destination?e.direction="↑ ":e.direction="↓ ",e.position==e.destination&&(e.direction="")},l=e=>{e.position=e.destination},u=e=>e.status="rest",v=e=>e.status="inProgress",d=e=>e.status="arrived",f=(t,o)=>{r(t,o),n(t),s(t),v(t),setTimeout((()=>{t.position==t.destination&&u(t)}),100),document.getElementById(t.id).ontransitionend=()=>{l(t),d(t),e.floorsQueueWithElevators.forEach((e=>{e.floor==o&&e.elevator==t.id&&(e.status="done")})),s(t),setTimeout((()=>{u(t),e.elevateDelivered(o)}),3e3)}},g=()=>{console.log("page loaded")};return{moveElevator:o,smoothElevate:a,resetAfterReloadPage:g,setRest:u,setInProgress:v,setArrived:d,startQueue:f,changeDestination:r,changePosition:l}})),c=(0,r.Q_)("liftingSystemLogic",(()=>{const e=u(),t=i(),o=(0,s.iH)([]),a=(0,s.iH)([]),r=()=>{localStorage.setItem("floorsQueueWithElevators",JSON.stringify(a.value)),localStorage.setItem("floorsQueue",JSON.stringify(o.value))},l=()=>{const e=localStorage.getItem("floorsQueueWithElevators");e&&(a.value=JSON.parse(e));const t=localStorage.getItem("floorsQueue");t&&(o.value=JSON.parse(t))},c=e=>{o.value.includes(e)||(o.value.push(e),a.value.push({floor:e,elevator:"",status:"inQueue"}))},v=e=>{a.value.find((t=>{if(t.elevator,"rest"==e.status&&""==t.elevator)return t.elevator=e.id}))},d=e=>{const t=o.value.indexOf(e);o.value.splice(t,1)};return(0,n.YP)(o.value,(()=>{for(let r=0;r<a.value.length;r++){let n=r;n<t.elevators.length&&""==a.value[r].elevator&&e.startQueue(t.elevators[n],o.value[r]),n++}a.value.find((o=>{""==o.elevator&&(void 0==t.elevators.find((e=>"rest"==e.status))||e.startQueue(t.elevators.find((e=>"rest"==e.status)),o.floor))})),t.setScalingDatatoLocalStorage(),r()}),{deep:!0}),{floorsQueue:o,setQueueToLocalStorage:r,getQueueFromLocalStorage:l,elevateDelivered:d,addToQueue:c,floorsQueueWithElevators:a,addToQueueWithElevators:v}})),v={class:"floors"},d=["onClick"];var f={__name:"floor",setup(e){const t=i(),o=c();return(e,a)=>((0,n.wg)(),(0,n.iD)("div",v,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)((0,s.SU)(t).floors,(e=>((0,n.wg)(),(0,n.iD)("div",{class:"floor",id:"floor",key:e},[(0,n._)("button",{class:(0,l.C_)(["floor-btn",{"floor-btn__waiting":(0,s.SU)(o).floorsQueue.includes(e)}]),onClick:t=>(0,s.SU)(o).addToQueue(e)},(0,l.zw)(e),11,d)])))),128))]))}};const g=f;var p=g;const m=["id"],S={class:"elevator-cabine-table"},h=(0,n._)("div",{class:"elevator-cabine-table-text"},null,-1);var b={__name:"elevator",setup(e){const t=u(),o=i();c();return(0,n.bv)((()=>{})),(e,a)=>((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)((0,s.SU)(o).elevators,(e=>((0,n.wg)(),(0,n.iD)("div",{class:"elevator",key:e.id},[(0,n._)("div",{class:(0,l.C_)(["elevator-cabine",{blink:"arrived"==e.status}]),id:e.id,style:(0,l.j5)([(0,s.SU)(t).moveElevator(e),(0,s.SU)(t).smoothElevate(e),(0,s.SU)(o).elevatorHeight,(0,s.SU)(o).elevatorTop])},[(0,n._)("div",S,[h,(0,n.Uk)(" "+(0,l.zw)(e.direction)+" "+(0,l.zw)(e.destination),1)])],14,m)])))),128))}};const _=b;var Q=_;const E={class:"commandPannel"};var O={__name:"commandPanel",setup(e){const t=i();return(e,o)=>((0,n.wg)(),(0,n.iD)("div",E,[(0,n._)("button",{class:"commandPannel--button",onClick:o[0]||(o[0]=(...e)=>(0,s.SU)(t).increaseFloor&&(0,s.SU)(t).increaseFloor(...e))}," Добавить этаж "),(0,n._)("button",{class:"commandPannel--button",onClick:o[1]||(o[1]=(...e)=>(0,s.SU)(t).decreaseFloor&&(0,s.SU)(t).decreaseFloor(...e))}," убрать этаж "),(0,n._)("button",{class:"commandPannel--button",onClick:o[2]||(o[2]=(...e)=>(0,s.SU)(t).increaseElevators&&(0,s.SU)(t).increaseElevators(...e))}," Добавить лифт "),(0,n._)("button",{class:"commandPannel--button",onClick:o[3]||(o[3]=(...e)=>(0,s.SU)(t).decreaseElevators&&(0,s.SU)(t).decreaseElevators(...e))}," Убрать лифт ")]))}};const w=O;var k=w,y={__name:"App",setup(e){return(e,t)=>((0,n.wg)(),(0,n.iD)("main",null,[(0,n.Wm)(Q),(0,n.Wm)(p),(0,n.Wm)(k)]))}};const U=y;var P=U;(0,a.ri)(P).use((0,r.WB)()).mount("#app")}},t={};function o(a){var r=t[a];if(void 0!==r)return r.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,o),n.exports}o.m=e,function(){var e=[];o.O=function(t,a,r,n){if(!a){var s=1/0;for(c=0;c<e.length;c++){a=e[c][0],r=e[c][1],n=e[c][2];for(var l=!0,i=0;i<a.length;i++)(!1&n||s>=n)&&Object.keys(o.O).every((function(e){return o.O[e](a[i])}))?a.splice(i--,1):(l=!1,n<s&&(s=n));if(l){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[a,r,n]}}(),function(){o.d=function(e,t){for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,a){var r,n,s=a[0],l=a[1],i=a[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(i)var c=i(o)}for(t&&t(a);u<s.length;u++)n=s[u],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(c)},a=self["webpackChunkelevator_test_task"]=self["webpackChunkelevator_test_task"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=o.O(void 0,[998],(function(){return o(554)}));a=o.O(a)})();
//# sourceMappingURL=app.5965bf43.js.map