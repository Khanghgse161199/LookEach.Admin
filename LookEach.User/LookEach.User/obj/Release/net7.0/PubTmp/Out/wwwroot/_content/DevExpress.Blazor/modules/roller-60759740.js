import{k as e}from"./key-4ced10e2.js";import{R as t,d as i}from"./dom-utils-04e3c6d2.js";import{E as s,S as n,a as o}from"./observables-589a5615.js";import{C as l}from"./css-classes-f3f8ed66.js";import"./dom-f93f7533.js";import"./_tslib-6e8ca86b.js";function r(e){return e*(2-e)}function a(e){return e/Math.abs(e)}function h(e,t,i,s){let n=null;const o=e=>n?n(e,null):0,l=()=>{n=null},r=(e,s,o)=>{n=function(e,t,i,s,n){const o=t+i;let l=0;return(r,a)=>{if(a)return a(e-l,r,s(r/o));if(r<t)return null;r>=o&&n&&n();const h=e*s((Math.min(r,o)-t)/i)-l;return l+=h,h}}(s+e,o,t,i,l)},a=e=>{null===n?(r(e.value,0,e.timeStamp),s(o)):n(e.timeStamp,((t,i)=>r(e.value,t,i)))};return e.subscribe(a),()=>{n=null,e.unsubscribe(a)}}function c(e,i,n,o,l){const r=function(e,t,i){const n=new s;return e.addEventListener(t,(e=>{e.preventDefault();const t=i(e);0===t||isNaN(t)||n.emit({value:t,timeStamp:e.timeStamp})}),{capture:!1,passive:!1}),n}(e,"wheel",(e=>a(e.deltaY)*i));function c(e,i){t((t=>{const s=e(t);0!==s?(null!==s&&o(s),c(e,i)):i()}))}h(function(e,t){const i=new s;let n=0,o=1;return e.subscribe((e=>{(0===n||e.timeStamp>=n||a(e.value)!==o)&&(n=e.timeStamp+t,o=a(e.value),i.emit(e))})),i}(r,30),300,n,(function(e){l(new Promise(((t,i)=>{c(e,t)})))}))}class m{}function u(e,t,i){const s=i(e);return s?t||s.visible.value?s:u(s,t,i):null}function d(e,t){const i=-1===t?"prevItem":"nextItem";return e[i]?e[i]:e[i]=(i=>{const s=e.value+t*i.delta;return-1===t&&-1!==i.min&&s<i.min?i.needLoop?new g(i,i.max,!1,null,e):null:1===t&&-1!==i.max&&s>i.max?i.needLoop?new g(i,i.min,!1,e,null):null:new g(i,s,!1,null,null)})(e.collection)}m.Roller=l.Prefix+"-roller",m.RollerContainer=m.Roller+"-container",m.RollerTitle=m.Roller+"-title",m.RollerItem=m.Roller+"-item",m.RollerAfter=m.Roller+"-after",m.RollerExpander=m.Roller+"-expander";class p{constructor(e,t,i,s,o,l){this._collection=e,this.prevItem=o,this.nextItem=l,this.value=t,this.visible=i||new n(!0),this.selected=new n(!!s),o&&(o.nextItem=this),l&&(l.prevItem=this),this.displayText=new n(t);const r=this.collection.selectedItem;this.selected.subscribe((e=>{e&&(r.value&&r.value.selected.update(!1),r.update(this))})),this.visible.subscribe((e=>{if(!e&&this.selected.value){const e=this.getPrevious(!1);e&&e.selected.update(!0)}this.collection.visibleItemsChanged.emit(null)}),!0)}get collection(){return this._collection}getPrevious(e){return u(this,e,(e=>e.prevItem))}getNext(e){return u(this,e,(e=>e.nextItem))}getDisplayText(){return this.displayText.value||this.value}}class g extends p{constructor(e,t,i,s,n){super(e,t,null,i,s,n)}get collection(){return this._collection}getPrevious(e){return d(this,-1)}getNext(e){return d(this,1)}}class v extends g{constructor(e,t){super(e,t,!0,null,null)}}class f{constructor(e=!0){this.needLoop=e,this.items=[],this.selectedItem=new n(null),this.visibleItemsChanged=new s}static createCollection(e,t,i=!0){const s=new f(i);for(let i=0;i<t.length;i++)s.add(i+1,null,i+1===e).displayText.value=t[i];return s.initialize(e),s}static createGenerator(e,t,i,s,n=!0){const o=new b(t,i,s,n);return o.initialize(e),o}initialize(e){this.items.filter((t=>t.value===e))[0].selected.update(!0),this.needLoop&&(this.items[0].prevItem=this.items[this.items.length-1],this.items[this.items.length-1].nextItem=this.items[0])}add(e,t,i){const s=new p(this,e,t,i,this.items[this.items.length-1],null);return this.items.push(s),s}}class b extends f{constructor(e,t,i,s){super(s),this.min=e,this.max=t,this.delta=i,this.originItem=null}initialize(e){this.originItem=new v(this,e)}}class I{constructor(e,t,i,s,n){this.dataItem=null,this.displayTextSubscription=this.displayTextSubscription.bind(this),this.roller=i,this.prevItem=n,this.nextItem=null,this.index=t,this.elements=i.createRollerItemElements(),this.offset=t*s,this.height=s,this.position=0,this.visibleItemCount=i.visibleItemCount,n&&(n.nextItem=this),this.updateDataItem(e),this.selectItem=this.selectItem.bind(this)}initialize(e){const i=Math.floor(this.visibleItemCount/2);this.elements[1].style.top=(this.index-i)*this.height+"px",e.appendChild(this.elements[1]),this.move(this.offset),this.elements[0].addEventListener("click",(()=>{t(this.selectItem)}))}isSelected(){return Math.floor(this.visibleItemCount/2)*this.height===Math.round(this.position)}selectItem(e){if(!this.dataItem)return Promise.resolve();const i=Math.floor(this.visibleItemCount/2);return this.roller.afterMove(M(o.Empty,(e=>this.roller.move(e)),{divisor:this.roller.itemSize.height,startTimestamp:e,endTimestamp:e+300,easing:r,frameCallback:t,value:(i-this.index)*this.height-(this.position-this.offset)}))}move(e){this.updatePosition(e);const t=this.position-this.offset;this.elements.forEach((e=>e.style.transform="matrix(1, 0, 0, 1, 0, "+t+")"))}updatePosition(e){this.position+=e,this.position>this.visibleItemCount*this.height?(this.position-=(this.visibleItemCount+1)*this.height,this.updateDataItem(this.nextItem&&this.nextItem.dataItem?this.nextItem.dataItem.getPrevious(!1):null)):this.position<-1*this.height&&(this.position+=(this.visibleItemCount+1)*this.height,this.updateDataItem(this.prevItem.dataItem?this.prevItem.dataItem.getNext(!1):null))}updateDataItem(e){this.dataItem!==e&&(this.dataItem&&this.dataItem.displayText.unsubscribe(this.displayTextSubscription),this.dataItem=e,this.dataItem?this.dataItem.displayText.subscribe(this.displayTextSubscription):this.displayTextSubscription(""))}displayTextSubscription(e){this.elements.forEach((t=>C(t,e)))}raiseChanges(){this.isSelected()&&this.dataItem&&this.dataItem.selected.update(!0)}}function C(e,t){e.innerText=t}function y(e,t,i){const s=i(e);return s&&Math.abs(Math.round(s.position-e.position))===t?[s].concat(y(s,t,i)):[]}function x(e,t,i){0!==e.length&&(e.shift().updateDataItem(t),x(e,i(t),i))}class D{constructor(e,t,i,s,n,o){this.itemCollection=e,this.visibleItemCount=t,this.itemContainers=[],this.itemSize=s,this.caption=n,this.longestVisibleDisplayText=o,this.needLoop=e.needLoop,this.container=i,this.rollerElement=null,this.rollerContainer=null,this.move=this.move.bind(this),this.moveReversed=this.moveReversed.bind(this),this.afterMove=this.afterMove.bind(this)}initialize(){this.initializeRollerElements();const i=[this.itemCollection.selectedItem.value];for(;i.length<this.visibleItemCount;)i.splice(0,0,i[0]?i[0].getPrevious(!1):null),i.push(i[i.length-1]?i[i.length-1].getNext(!1):null);i.push(i[i.length-1]?i[i.length-1].getNext(!1):null);for(let e=0;e<i.length;e++)this.itemContainers.push(new I(i[e],e,this,this.itemSize.height,this.itemContainers[this.itemContainers.length-1]));this.longestVisibleDisplayText&&C(this.createRollerItemElement(m.RollerItem+" "+m.RollerExpander),this.longestVisibleDisplayText);const n=this.createRollerItemElement(m.RollerAfter);this.itemContainers[0].prevItem=this.itemContainers[this.itemContainers.length-1],this.itemContainers[this.itemContainers.length-1].nextItem=this.itemContainers[0];for(let e=0;e<this.itemContainers.length;e++)this.itemContainers[e].initialize(n);this.itemCollection.selectedItem.subscribe((()=>this.updateVisibleDataItems()),!0),this.itemCollection.visibleItemsChanged.subscribe((()=>this.updateVisibleDataItems())),c(this.rollerElement,this.itemSize.height,r,this.moveReversed,this.afterMove),function(e,i,n,o){const l=new s,a=new s;let h=0;e.addEventListener("touchstart",(e=>{h=e.touches[0].clientY}),{capture:!1,passive:!0}),e.addEventListener("touchend",(()=>{h=0,t((e=>a.emit(e)))}),{capture:!1,passive:!0}),e.addEventListener("touchmove",(e=>{e.preventDefault();const t=e.changedTouches[0].clientY;l.emit(t-h),h=t}),{capture:!1,passive:!0});const c={divisor:i,accelerationTimeFrame:0};!function(e,t,i,s,n,o){let l,a,h,c=1,m=!1;const u=i.accelerationTimeFrame||300;function d(e){const t=Math.abs(a%i.divisor);return{value:(i.divisor-t)*Math.sign(a),endTimestamp:e+300,startTimestamp:e,easing:r,frameCallback:o,divisor:0}}function p(e,t){return(t*=c)>=l&&e-h<=u&&(c=Math.min(2,1.2*c)),a+=t,l=t,h=e,t}function g(e){a=0,h=e,c=1}e.subscribe((i=>{o((o=>{m||(m=!0,g(o),n(new Promise(((i,n)=>{const l=n=>{t.unsubscribe(l),M(e,s,d(n)).then((()=>{m=!1,i()})).catch((()=>{t.subscribe(l)})).finally((()=>g(o)))};t.subscribe(l)})))),s(p(o,i))}))}))}(l,a,c,n,o,t)}(this.rollerElement,this.itemSize.height,this.move,this.afterMove),this.rollerContainer&&this.rollerContainer.addEventListener("keydown",(t=>{let i=null;t.keyCode===e.KeyCode.Up?i=this.itemCollection.selectedItem.value.getPrevious():t.keyCode===e.KeyCode.Down&&(i=this.itemCollection.selectedItem.value.getNext()),i&&(t.preventDefault(),i.selected.update(!0))}))}initializeRollerElements(){const e=this.rollerContainer=document.createElement("SPAN");e.className=m.RollerContainer,e.style.minWidth=this.itemSize.width.toString();const t=document.createElement("SPAN");t.innerText=this.caption,t.className=m.RollerTitle,e.appendChild(t);const i=this.rollerElement=document.createElement("DIV");i.className=m.Roller,i.tabIndex=-1,i.style.height=this.itemSize.height*this.visibleItemCount+"px",e.appendChild(i),this.container&&this.container.appendChild(e)}updateVisibleDataItems(){const e=this.itemContainers.filter((e=>e.isSelected()))[0];if(!e)return;const t=y(e,this.itemSize.height,(e=>e.prevItem)),i=y(e,this.itemSize.height,(e=>e.nextItem)),s=this.itemCollection.selectedItem.value;e.updateDataItem(s),x(t.concat([]),s.getPrevious(),(e=>e?e.getPrevious(!1):null)),x(i.concat([]),s.getNext(),(e=>e?e.getNext(!1):null))}createRollerItemElement(e){const t=document.createElement("SPAN");return t.className=e||m.RollerItem,this.rollerElement&&this.rollerElement.appendChild(t),t}createRollerItemElements(){const e=this.createRollerItemElement(null);return[e,e.cloneNode()]}moveReversed(e){this.move(0-e)}move(e){if(0===e)return;const t=Math.sign(e),i=this.itemContainers.length-1,s=-1===t?i:0,n=(-1===t?0:i)+t;if(!this.needLoop){if(1===t){const i=Math.floor(this.visibleItemCount/2)*this.itemSize.height;for(let o=s;o!==n;o+=t)!this.itemContainers[o].dataItem&&this.itemContainers[o].position+this.itemSize.height-i<=0&&this.itemContainers[o].position+this.itemSize.height+e-i>0&&(e=Math.min(i-(this.itemContainers[o].position+this.itemSize.height),e))}else{const i=(Math.floor(this.visibleItemCount/2)+1)*this.itemSize.height;for(let o=s;o!==n;o+=t)!this.itemContainers[o].dataItem&&this.itemContainers[o].position-i>=0&&this.itemContainers[o].position+e-i<0&&(e=Math.max(i-this.itemContainers[o].position,e))}if(0===e)return}for(let i=s;i!==n;i+=t)this.itemContainers[i].move(e)}afterMove(e){return e.then((()=>Promise.resolve(this.itemContainers.forEach((e=>e.raiseChanges())))))}}function M(e,t,i){return new Promise(((s,n)=>{function o(){e.unsubscribe(o),n()}e.subscribe(o);let l=0;const r=i.frameCallback,a=n=>{if(n<i.endTimestamp){const e=i.easing((n-i.startTimestamp)/(i.endTimestamp-i.startTimestamp)),s=i.value*e-l;t(s),l+=s,r(a)}else e.unsubscribe(o),t(i.value-l),s()};r(a)}))}function W(e){return e.value%4==0&&e.value%100!=0||e.value%400==0}function w(e){return 2!==e.value}function T(e){return-1!==[1,3,5,7,8,10,12].indexOf(e.value)}var S;function R(e,t,i,s,n,o,l){const r=e.add(t,i,s);o.subscribe((([e,i])=>{if(l){const s=n[N(i.value,e.value,t)];r.displayText.update(t+" "+s)}else r.displayText.value=n[t-1]}))}function N(e,t,i){return new Date(e,t-1,i).getDay()}function z(e){return e&&e.length?" "+e.concat([]).sort(((e,t)=>t.length-e.length))[0]:""}function E(e){let t="initial";for(;e;){if(t=window.getComputedStyle(e).backgroundColor,t&&"rgba(0, 0, 0, 0)"!==t&&"transparent"!==t)return t;e=e.parentElement}return t}!function(e){e[e.DayWithoutLeadingZero=0]="DayWithoutLeadingZero",e[e.DayWithLeadingZero=1]="DayWithLeadingZero",e[e.DayWithShortName=2]="DayWithShortName",e[e.DayWithFullName=3]="DayWithFullName",e[e.MonthWithShortName=4]="MonthWithShortName",e[e.MonthWithFullName=5]="MonthWithFullName",e[e.MonthWithoutLeadingZero=6]="MonthWithoutLeadingZero",e[e.MonthWithLeadingZero=7]="MonthWithLeadingZero",e[e.YearWithFourDigit=8]="YearWithFourDigit",e[e.YearWithThreeDigit=9]="YearWithThreeDigit",e[e.YearWithTwoDigit=10]="YearWithTwoDigit",e[e.YearWithOneDigit=11]="YearWithOneDigit"}(S||(S={}));const L={AM:1,PM:2},P={Hour:0,Minute:1,Second:2,AMPM:3};function Y(e,t,i){if(!t)return Promise.reject();const s=t.twelveHourFormat;let n=s?t.time.hours%12:t.time.hours;s&&0===n&&(n=12);let o=t.time.minutes,l=t.time.seconds,r=t.time.hours>=12?L.PM:L.AM;const a=$(e),h=f.createGenerator(l,0,59,1),c=f.createGenerator(o,0,59,1),u=s?f.createGenerator(n,1,12,1):f.createGenerator(n,0,23,1);let d=null;t.ampmDesignators&&t.ampmDesignators[0]&&t.ampmDesignators[1]&&(d=f.createCollection(r,t.ampmDesignators,!1));const p=document.createDocumentFragment(),g=document.createElement("STYLE");function v(e){return t=>{e(t),i.invokeMethodAsync("UpdateDateTime",[n,o,l,r]).catch()}}return g.type="text/css",g.innerText=`.${m.Roller} { height: ${5*a}px; } .${m.RollerItem}, .${m.RollerAfter} { height: ${a}px; } .${m.RollerItem}, .${m.RollerTitle} { color: ${window.getComputedStyle(e).color}!important; } .${m.RollerAfter} { background-color: ${E(e)}; }`,p.appendChild(g),t.items.forEach((e=>{switch(e.type){case P.Hour:new D(u,5,p,{width:-1,height:a},"Hour","15").initialize();break;case P.Minute:new D(c,5,p,{width:-1,height:a},"Minute","55").initialize();break;case P.Second:new D(h,5,p,{width:-1,height:a},"Second","55").initialize();break;case P.AMPM:if(d){new D(d,5,p,{width:-1,height:a},"AM/PM","AM").initialize()}}})),u.selectedItem.subscribe(v((e=>{n=e.value}))),c.selectedItem.subscribe(v((e=>{o=e.value}))),h.selectedItem.subscribe(v((e=>{l=e.value}))),d&&d.selectedItem.subscribe(v((e=>{r=e.value}))),A.set(e,new k(u,c,h,d)),e.textContent="",e.appendChild(p),Promise.resolve()}const A=new WeakMap;class k{constructor(e,t,i,s){this.hoursCollection=e,this.minutesCollection=t,this.secondsCollection=i,this.AMPMCollection=s}update(e){if(this.AMPMCollection){let t=this.AMPMCollection?e.hours%12:e.hours;t=0===t?12:t,this.hoursCollection.initialize(t),this.AMPMCollection.initialize(e.hours>=12?L.PM:L.AM)}else this.hoursCollection.initialize(e.hours);this.minutesCollection.initialize(e.minutes),this.secondsCollection.initialize(e.seconds)}}class F{constructor(e,t,i){this.yearsCollection=e,this.monthsCollection=t,this.daysCollection=i}update(e){const t=e.filter((e=>e.type===S.DayWithShortName||e.type===S.DayWithFullName||e.type===S.DayWithoutLeadingZero||e.type===S.DayWithLeadingZero))[0],i=e.filter((e=>e.type===S.MonthWithShortName||e.type===S.MonthWithFullName||e.type===S.MonthWithLeadingZero||e.type===S.MonthWithoutLeadingZero))[0],s=e.filter((e=>e.type===S.YearWithFourDigit||e.type===S.YearWithThreeDigit||e.type===S.YearWithTwoDigit||e.type===S.YearWithOneDigit))[0];this.yearsCollection.initialize(s.value),this.monthsCollection.initialize(i.value),this.daysCollection.initialize(t.value)}}function Z(e,t){if(!A.has(e))return;const i=A.get(e);if(i)return void i.update(t);const s=A.get(e);s&&s.update(t)}function $(e){const t=document.createElement("span");t.className=m.RollerItem,t.textContent="01234567890",e.appendChild(t);let s=t.offsetHeight;return s||(s=i(e,"dxbl-lg")?42:i(e,"dxbl-sm")?30:36),e.removeChild(t),s}const j={initializeDateRoller:function(e,t,i,s,n){const o=t.items.filter((e=>e.type===S.DayWithShortName||e.type===S.DayWithFullName||e.type===S.DayWithoutLeadingZero||e.type===S.DayWithLeadingZero))[0],l=t.items.filter((e=>e.type===S.MonthWithShortName||e.type===S.MonthWithFullName||e.type===S.MonthWithLeadingZero||e.type===S.MonthWithoutLeadingZero))[0],r=t.items.filter((e=>e.type===S.YearWithFourDigit||e.type===S.YearWithThreeDigit||e.type===S.YearWithTwoDigit||e.type===S.YearWithOneDigit))[0],a=t.yearNames||[];let h=t.monthNames||[];const c=t.dayNames||[],u=$(e);let d=o?o.value:1,p=null;l?p=l.value:(h=["","","","","","","","","","","",""],p=i);let g=r?r.value:s;const v=r?f.createCollection(g,a):f.createGenerator(g,1,9999,1),b=f.createCollection(p,h),I=b.selectedItem.asTrigger(w),C={29:v.selectedItem.asTrigger(W).or(I),30:I,31:b.selectedItem.asTrigger(T)},y=b.selectedItem.join(v.selectedItem),x=o&&(o.type===S.DayWithFullName||o.type===S.DayWithShortName),M=new f;for(let e=1;e<=31;e++)R(M,e,C[e],e===d,c,y,x);M.initialize(d);const N=["25"+z(c),z(h),"0000"].reduce(((e,t)=>e.length>t.length?e:t)),L=document.createDocumentFragment(),P=document.createElement("STYLE");function Y(e){return t=>{e(t),n.invokeMethodAsync("UpdateDateTime",[d,p,g]).catch((e=>console.error(e)))}}return P.type="text/css",P.innerText=`.${m.Roller} { height: ${5*u}px; } .${m.RollerItem}, .${m.RollerAfter} { height: ${u}px; } .${m.RollerItem}, .${m.RollerTitle} { color: ${window.getComputedStyle(e).color} !important; } .${m.RollerAfter} { background-color: ${E(e)}; } `,L.appendChild(P),t.items.forEach((e=>{switch(e.type){case S.DayWithoutLeadingZero:case S.DayWithLeadingZero:case S.DayWithFullName:case S.DayWithShortName:new D(M,5,L,{width:-1,height:u},"Day",N).initialize();break;case S.MonthWithFullName:case S.MonthWithShortName:case S.MonthWithLeadingZero:case S.MonthWithoutLeadingZero:new D(b,5,L,{width:-1,height:u},"Month",N).initialize();break;case S.YearWithFourDigit:case S.YearWithThreeDigit:case S.YearWithTwoDigit:case S.YearWithOneDigit:new D(v,5,L,{width:-1,height:u},"Year",N).initialize();break}})),e.textContent="",e.appendChild(L),M.selectedItem.subscribe(Y((e=>{d=e.value}))),b.selectedItem.subscribe(Y((e=>{p=e.value}))),v.selectedItem.subscribe(Y((e=>{g=e.value}))),A.set(e,new F(v,b,M)),Promise.resolve()},initializeTimeRoller:Y,updateRoller:Z};export{D as Roller,m as RollerCssClasses,p as RollerItem,f as RollerItemCollection,j as default,N as getDayOfWeek,Y as initializeTimeRoller,Z as updateRoller};
