import{d as t}from"./dom-f93f7533.js";import{k as e}from"./key-4ced10e2.js";import{t as o}from"./touch-b17c92da.js";import{c as n,s as i,t as r,a as s,g as l,b as c,i as a,e as d,d as h,f as u,h as f,j as m,k as p,R as g}from"./dom-utils-04e3c6d2.js";import{d as w,r as v}from"./disposable-d2c2d283.js";import{scrollToFocusedItem as y}from"./grid-750caedd.js";import{C as b}from"./css-classes-f3f8ed66.js";import{initFocusHidingEvents as x,FocusableElementsSelector as M}from"./focus-utils-cd9c9bc2.js";import{E as z}from"./eventRegister-fb9b0e47.js";import{getClientRectWithMargins as C,getClientRect as E,PointBlz as T,geometry as B}from"./dragAndDropUnit-815cb9e2.js";import"./_tslib-6e8ca86b.js";import"./evt-a125525d.js";import"./svg-utils-0be6c8b2.js";import"./column-resize-7b7595ec.js";import"./dx-style-helper-01d35a9d.js";import"./lit-element-base-7a85dca5.js";import"./data-qa-utils-8be7c726.js";import"./lit-element-70cf14f4.js";import"./custom-element-267f9a21.js";import"./dx-listbox-d460bffc.js";import"./dx-ui-element-7f5e2dd2.js";import"./logicaltreehelper-bc8e12d3.js";import"./layouthelper-dc0e1370.js";import"./rect-00eb3fa4.js";import"./point-e4ec110e.js";import"./constants-58283e53.js";import"./dx-html-element-pointer-events-helper-4b46ddbf.js";import"./eventhelper-8570b930.js";import"./pointer-event-helper-ba4ce1e1.js";import"./property-d3853089.js";const R=document.body,H=new WeakMap,O=new Map,j={subtree:!0,childList:!0},k=new MutationObserver((function(t){t.forEach(P)}));function P(t){t.removedNodes.forEach(L)}function L(t){const e=O.get(t);O.delete(t)&&(0===O.size&&k.disconnect(),e())}const S="show",D="\\s*matrix\\(\\s*"+[0,0,0,0,0,0].map((function(){return"(\\-?\\d+\\.?\\d*)"})).join(",\\s*")+"\\)\\s*",I="above",N="below",W="above-inner",U="below-inner",A="top-sides",F="bottom-sides",V="outside-left",q="outside-right",K="left-sides",_="right-sides",Y="resizing";function G(t){let e=0;if(null!=t&&""!==t)try{const o=t.indexOf("px");o>-1&&(e=parseFloat(t.substr(0,o)))}catch(t){}return Math.ceil(e)}function X(t,e,o){const n=t.getBoundingClientRect(),i={left:e(n.left),top:e(n.top),right:o(n.right),bottom:o(n.bottom)};return i.width=i.right-i.left,i.height=i.bottom-i.top,i}function J(t){return X(t,Math.floor,Math.ceil)}function Q(t){return X(t,Math.ceil,Math.floor)}class Z{constructor(t,e){this.key=t,this.info=e}checkMargin(){return!0}allowScroll(){return"height"===this.info.size}canApplyToElement(t){return t.className.indexOf("dxbs-align-"+this.key)>-1}getRange(t){const e=this.getTargetBox(t)[this.info.to],o=e+this.info.sizeM*(t.elementBox[this.info.size]+(this.checkMargin()?t.margin:0));return{from:Math.min(e,o),to:Math.max(e,o),windowOverflow:0}}getTargetBox(t){return null}validate(t,e){const o=e[this.info.size];return t.windowOverflow=Math.abs(Math.min(0,t.from-o.from)+Math.min(0,o.to-t.to)),t.validTo=Math.min(t.to,o.to),t.validFrom=Math.max(t.from,o.from),0===t.windowOverflow}applyRange(t,e){e.appliedModifierKeys[this.info.size]=this.key;const o="width"===this.info.size?"left":"top",n=e.styles;let i=t.from;this.allowScroll()&&t.windowOverflow>0&&(e.limitBox.scroll.width||(e.limitBox.scroll.width=!0,e.limitBox.width.to-=c()),e.isScrollable&&(n["max-height"]=e.height-t.windowOverflow+"px",e.width+=c(),e.elementBox.width+=c(),i=t.validFrom)),n.width=e.width+"px",this.checkMargin()&&(i+=Math.max(0,this.info.sizeM)*e.margin),e.elementBox[o]+=i,n.transform="matrix(1, 0, 0, 1, "+e.elementBox.left+", "+e.elementBox.top+")"}dockElementToTarget(t){const e=this.getRange(t);this.dockElementToTargetInternal(e,t)||this.applyRange(e,t)}dockElementToTargetInternal(t,e){}}class $ extends Z{constructor(t,e,o){super(t,e,o),this.oppositePointName=o||null}getTargetBox(t){return this.info.useInnerTargetBox?t.targetBox.inner:t.targetBox.outer}getOppositePoint(){return this._oppositePoint||(this._oppositePoint=et.filter(function(t){return t.key===this.oppositePointName}.bind(this))[0])}dockElementToTargetInternal(t,e){if(this.validate(t,e.limitBox))this.applyRange(t,e);else{const o=this.getOppositePoint(),n=o.getRange(e);if(!(o.validate(n,e.limitBox)||n.windowOverflow<t.windowOverflow))return!1;o.applyRange(n,e)}return!0}}class tt extends Z{checkMargin(){return!1}getTargetBox(t){return t.targetBox.inner}dockElementToTargetInternal(t,e){return(this.info.isHorizontal&&e.fitHorizontally||!this.info.isHorizontal&&e.fitVertically)&&this.validate(t,e.limitBox),!1}validate(t,e){const o=Math.min(t.from,Math.max(0,t.to-e[this.info.size].to));return o>0&&(t.from-=o,t.to-=o),super.validate(t,e)}}const et=[new $(I,{to:"top",from:"bottom",size:"height",sizeM:-1,isHorizontal:!1},N),new $(N,{to:"bottom",from:"top",size:"height",sizeM:1,isHorizontal:!1},I),new $(W,{to:"top",from:"bottom",size:"height",sizeM:-1,isHorizontal:!1,useInnerTargetBox:!1},U),new $(U,{to:"bottom",from:"top",size:"height",sizeM:1,isHorizontal:!1,useInnerTargetBox:!0},W),new tt(A,{to:"top",from:"top",size:"height",sizeM:1,isHorizontal:!1}),new tt(F,{to:"bottom",from:"bottom",size:"height",sizeM:-1,isHorizontal:!1}),new $(V,{to:"left",from:"right",size:"width",sizeM:-1,isHorizontal:!0},q),new $(q,{to:"right",from:"left",size:"width",sizeM:1,isHorizontal:!0},V),new tt(K,{to:"left",from:"left",size:"width",sizeM:1,isHorizontal:!0}),new tt(_,{to:"right",from:"right",size:"width",sizeM:-1,isHorizontal:!0})];function ot(e,o,n){const i=l(),r=J(e),s=Q(o),c=e.ownerDocument.documentElement,a={isScrollable:t.DomUtils.hasClassName(e,"dxbs-scrollable"),specifiedOffsetModifiers:et.filter((function(t){return t.canApplyToElement(e)})),margin:G(i.marginTop),width:n?Math.max(n.width,Math.ceil(e.offsetWidth)):Math.ceil(e.offsetWidth),height:Math.ceil(e.offsetHeight),appliedModifierKeys:{height:null,width:null},fitHorizontally:n.fitHorizontally,fitVertically:n.fitVertically},d=function(t){const e=new RegExp(D).exec(t.transform);return e?{left:parseInt(e[5]),top:parseInt(e[6])}:{left:0,top:0}}(i),h=e.classList.contains(b.InvisibleOffScreen)||e[Y]?s.left:r.left;var u,f,m,p;a.elementBox={left:u=d.left-h,top:f=d.top-r.top,right:u+(m=r.width),bottom:f+(p=r.height),width:m,height:p},a.targetBox={outer:J(o),inner:Q(o)},a.limitBox={scroll:{width:c.clientWidth<window.innerWidth,height:c.clientHeight<window.innerHeight},width:{from:0,to:c.clientWidth},height:{from:0,to:c.clientHeight}},a.styles={};const g=(e.getAttribute("data-popup-align")||n&&n.align).split(/\s+/);return a.offsetModifiers=et.filter((function(t){return g.some((function(e){return t.key===e}))})),a}function nt(t,e,o,l=!0,c=!0,a=(t=>{})){null!==e&&(!function(t,e,o,r){n((function(){const n=ot(t,e,o);for(let t=0;t<n.offsetModifiers.length;t++)n.offsetModifiers[t].dockElementToTarget(n);r(n),i(t,n.styles)}))}(t,e,{align:o,fitHorizontally:l,fitVertically:c},a),r(t,S,!0),s(t))}function it(t){return parseFloat(window.getComputedStyle(t,null).getPropertyValue("padding-right"))}function rt(){return window.innerWidth-document.body.getBoundingClientRect().width}class st{constructor(t,e){this.element=t,this.getClientRect=e}get leftTopCorner(){const t=this;return new lt(this.element,(function(e){return t.getClientRect(e)}),(function(t){return{x:0,y:0}}))}get leftBottomCorner(){const t=this;return new lt(this.element,(function(e){const o=t.getClientRect(e);return new T(o.x,o.bottom)}),(function(e){const o=t.getClientRect(e);return new T(0,-o.height)}))}get rightTopCorner(){const t=this;return new lt(this.element,(function(e){const o=t.getClientRect(e);return new T(o.right,o.y)}),(function(e){const o=t.getClientRect(e);return new T(-o.width,0)}))}get rightBottomCorner(){const t=this;return new lt(this.element,(function(e){const o=t.getClientRect(e);return new T(o.right,o.bottom)}),(function(e){const o=t.getClientRect(e);return new T(-o.width,-o.height)}))}get center(){const t=this;return new lt(this.element,(function(e){return t.getClientRect(e).center}))}}class lt{constructor(t,e,o){this.element=t,this.getLocation=e,this.getDelta=o}get location(){return this.getLocation(this.element)}get delta(){return this.getDelta(this.element)}anchorTo(t){return new ct(this,t)}}class ct{constructor(t,e){this.point=t,this.anchor=e,this.events=new z(this);const o=[];if(o.push([window,"resize"]),o.push([window,"scroll"]),this.containers=function(t,e){const o=[];for(;null!==t&&"BODY"!==t.tagName&&"#document"!==t.nodeName;)e(t)&&o.push(t),t=t.parentNode;return 0===o.length?null:o}(this.anchor.element.parentNode,this.isElementScrollable),this.containers&&this.containers.forEach((function(t){o.push([t,"scroll"])})),this.checkInCasesInt(o),"undefined"!=typeof ResizeObserver){const t=this;this.resizeObserver=new window.ResizeObserver((function(){t.update()})),this.resizeObserver.observe(this.anchor.element),this.resizeObserver.observe(this.point.element)}else this.resizeObserver=null;let n=this.point.element.offsetParent;this.notStaticParent=null===n?{x:0,y:0,scrollTop:0,scrollLeft:0}:a(n)?n:window,this.update()}isElementScrollable(t){const e=window.getComputedStyle(t);return"static"===e.position&&("scroll"===e["overflow-x"]||"scroll"===e["overflow-y"]||"auto"===e["overflow-x"]||"auto"===e["overflow-y"])}update(){const t=this.notStaticParent===window?{x:window.scrollX,y:window.scrollY}:{x:this.notStaticParent.scrollLeft,y:this.notStaticParent.scrollTop},e=B(this.anchor.location,"+",this.point.delta,"-",this.notStaticParent,"+",t),o=this.point.element;n((function(){o.style.left=e.x+"px",o.style.top=e.y+"px"}))}checkInCasesInt(t){const e=this.events;t.forEach((function(t){e.attachEvent(t[0],t[1],(function(t){this.update()}))}))}checkInCases(){return this.containers?(this.checkInCasesInt(Array.from(arguments)),this.update(),this):this}dispose(){this.events&&(this.events.dispose(),this.events=null,this.dropDownStartPos=null,this.containers=null,this.resizeObserver&&this.resizeObserver.disconnect())}}function at(t){return new st(t,C)}function dt(t){return new st(t,E)}var ht,ut;!function(t){t[t.Popup=0]="Popup",t[t.Modal=1]="Modal"}(ht||(ht={})),function(t){t[t.Down=1]="Down",t[t.Up=2]="Up"}(ut||(ut={}));const ft=8,mt=new WeakMap;let pt;const gt=[];function wt(t){let e=(t=d(t)).querySelector(".dxbs-dm.dropdown-menu");return e||(e=t.querySelector(".dxgvCSD.dxbs-grid-vsd")),e}function vt(t,e,o,n){return new Promise(((o,i)=>{let r=wt(t);r=d(r),r?(0===n&&(r.style.minWidth=t.offsetWidth+"px"),2===n&&(r.style.width=t.offsetWidth+"px"),yt(t,r,e),y(r),o()):o()}))}function yt(t,e,o){mt.has(t)&&(mt.get(t).disconnect(),mt.delete(t));const i=e.offsetParent;if(!i)return void n((function(){e.style.visibility=""}));const r=i.getBoundingClientRect(),s=t.getBoundingClientRect(),l=s.top-r.top,c=r.bottom-s.bottom;let a;const d=window.getComputedStyle(e),h=e.offsetHeight+Math.max(parseFloat(d.marginTop),0)+Math.max(parseFloat(d.marginBottom),0)+ft;switch(o){case ut.Up:a=!0,r.top+(l-h)<=0&&r.top+l+t.offsetHeight+h+window.pageYOffset<=Math.max(document.body.scrollHeight,window.innerHeight)&&(a=!1);break;default:a=!1,r.bottom-(c-h)>=window.innerHeight&&r.top+l-h+window.pageYOffset>=0&&(a=!0);break}const u=s.left+e.offsetWidth+ft>=document.body.clientWidth&&s.right-e.offsetWidth-ft>0;n((()=>{pt&&pt.dispose(),pt=a?u?at(e).rightBottomCorner.anchorTo(dt(t).rightTopCorner):at(e).leftBottomCorner.anchorTo(dt(t).leftTopCorner):u?at(e).rightTopCorner.anchorTo(dt(t).rightBottomCorner):at(e).leftTopCorner.anchorTo(dt(t).leftBottomCorner),e.style.visibility=""}))}const bt=[{value:0,text:""},{value:1,text:I},{value:2,text:N},{value:4,text:A},{value:8,text:F},{value:16,text:V},{value:32,text:q},{value:64,text:K},{value:128,text:_},{value:256,text:W},{value:512,text:U}];function xt(t,e,o){let n=t.target;for(;n;){if(n===e)return;n=n.parentElement}o&&o()}function Mt(t){return"hidden"!==t.style.visibility||t.classList.contains("dxbs-visually-hidden")}function zt(t,e){if(!e)return!1;if(h(t.srcElement,"modal-header"))return!0;const o=h(t.srcElement,"column-chooser-elements-container"),n=h(o,"modal-body");if(!o||!n)return!1;if(n.clientHeight>=o.clientHeight)return!0;const i=t.touches[0].pageY-e.touches[0].pageY,r=t=>t.getBoundingClientRect().top,s=o.querySelector(".column-chooser-element-container");if(s&&r(s)===r(n)&&i>=0&&t.cancelable)return!0;const l=t=>Math.round(t.getBoundingClientRect().bottom),c=o.querySelector(".column-chooser-element-container:last-child");return c&&l(c)===l(n)&&i<=0&&t.cancelable}function Ct(t,e,o){if(o!==ht.Modal)return-1;const n=t.getBoundingClientRect(),i=e.getBoundingClientRect(),r=h(t,"dxbs-gridview"),s=r&&r.querySelector("thead");if(!s)return-1;const l=s.getBoundingClientRect(),c=(l||n).bottom;return c>.5*e.clientHeight?c-n.top<.5*e.clientHeight?c-i.top-.5*e.clientHeight:n.top-i.top-2:-1}function Et(t){if(!(t=d(t)))return;const e=t.getElementsByClassName("modal-body")[0];e.style.width=e.offsetWidth+"px",e.style.height=e.offsetHeight+"px"}const Tt={init:function(t,e,n,i){if(t=d(t),e=d(e),n=d(n),!t)return Promise.reject("failed");if(w(t),n){const r=o=>{xt(o,t,(function(){f(t)||w(t);const o=document.activeElement===e,r=n&&Mt(n);(o||r)&&i.invokeMethodAsync("OnDropDownLostFocus",e.value).catch((t=>console.error(t)))}))};document.addEventListener(o.TouchUtils.touchMouseDownEventName,r),v(t,(function(){document.removeEventListener(o.TouchUtils.touchMouseDownEventName,r)}))}return Promise.resolve("ok")},dispose:function(t){return(t=d(t))&&w(t),pt&&pt.dispose(),Promise.resolve("ok")},showAdaptiveDropdown:function(i,l,c,a,f,w){if(!(i=d(i)))return Promise.reject();const v=h(i,c);if(!v)return Promise.reject();const y=document.documentElement,b=document.documentElement.style.overflow,z=document.body.style.overflow,C=document.body.scroll,E=l.dialogType,T=l.alignment,B=function(t){let e="";return bt.forEach((o=>{0!=(o.value&t)&&(e&&(e+=" "),e+=o.text)})),e}(T),P=E===ht.Modal,L=new ResizeObserver((function(t,e){if(t.length<1)return;D&&D.height!==t[0].contentRect.height&&(s(i),m(i,Y,!0),nt(i,v,B,l.fitHorizontally,l.fitVertically,A),n((()=>{m(i,Y,!1)})));D=t[0].contentRect}));if(E===ht.Popup)0===T?yt(v,i,l.dropDownDirection):nt(i,v,B,l.fitHorizontally,l.fitVertically,A),l.handleResize&&L.observe(i);else{gt.push(i),i.style.paddingRight=it(i)+rt()+"px";const t=it(document.body)+rt();document.body.style.paddingRight=String(t),document.body.classList.add("dxbl-modal-open")}let S=!1,D=null;function A(t){let e;t.appliedModifierKeys.height===N||t.appliedModifierKeys.height===U?e=l.bottomAlignmentCssClass:t.appliedModifierKeys.height!==I&&t.appliedModifierKeys.height!==W||(e=l.topAlignmentCssClass),e&&r(i,e,!0)}function F(t){const e=t.srcElement;i&&e&&(!i.contains(e)||E===ht.Modal&&i===e)&&q(i)}function V(t){const e=t.target;e&&(y.removeEventListener("focusin",V),null===t.relatedTarget&&i&&i.contains(e)&&e.focus())}function q(t){if(!S){if(S=!0,p(t))return;K(),f.invokeMethodAsync("CloseDialog").catch((function(e){p(t)||console.error(e)}))}}function K(){if(y.removeEventListener(o.TouchUtils.touchMouseDownEventName,F),window.removeEventListener("resize",G),L.disconnect(),E===ht.Modal){if(i){const t=gt.indexOf(i);t>-1&&gt.splice(t,1)}gt.length||(X(E,!1),document.body.classList.remove("dxbl-modal-open"),document.body.style.paddingRight=String(it(document.body)-rt()))}i=null}function _(){if(!i)return;const t=i.querySelector(M);t&&t.focus()}function G(){if(!i||!h(i,"modal-dialog-owner"))return;const t=i.firstElementChild;if(!t)return;const e=t.classList,o=Ct(v,y,E),n=y.clientHeight>y.clientWidth?"topVertical":"topHorizontal";g((function(){e.contains("topVertical")||e.contains("topHorizontal")?e.remove("transition"):e.add("transition"),o&&(y.scrollTop=o),e.remove("topVertical","topHorizontal"),e.add(n)}))}function X(t,e){if(t!==ht.Modal)return;let o,n,i;e?(o="hidden",n="hidden",i=()=>{}):(o=b,n=z,i=C),document.documentElement.style.overflow=o,document.body.style.overflow=n,document.body.scroll=i}return y.addEventListener(o.TouchUtils.touchMouseDownEventName,F),i.addEventListener("keydown",(function(t){i&&t.keyCode===e.KeyCode.Esc&&q(i)})),i.addEventListener("focusout",(function(t){const e=t.relatedTarget;!S&&i&&(e&&!i.contains(e)?function(t){if(!i)return;const e=i.compareDocumentPosition(t);e&window.Node.DOCUMENT_POSITION_PRECEDING?function(){if(!i)return;const t=function(t){const e=t.querySelectorAll(M);return e[e.length-1]}(i);t&&t.focus()}():e&window.Node.DOCUMENT_POSITION_FOLLOWING&&_()}(e):null===e&&y.addEventListener("focusin",V))})),function(t,e,o,n){t&&e.addEventListener("touchmove",(t=>{t.srcElement===e&&t.preventDefault()}));if(n===ht.Modal){let t;o.addEventListener("touchstart",(e=>{t=e})),o.addEventListener("touchmove",(e=>{zt(e,t)&&e.preventDefault(),t=e}))}}(P,i,v,E),function(t){if(H.has(t))return H.get(t);const e=new Promise((function(e){0===O.size&&k.observe(R,j),O.set(t,(()=>{e(void 0)}))}));return H.set(t,e),e}(i).then((()=>{K(),i=null})),X(E,!0),n((function(){i&&(l.showFocus||(t.DomUtils.addClassName(i,"dxbs-focus-hidden"),x(i)),E===ht.Popup&&(_(),function(t,e){const o=h(t,e);if(t&&o){const e=h(t,"dx-menu-bar");e&&e.classList.contains("vertical")||(u(o,n),n())}function n(){const e=t.getBoundingClientRect(),n=o.getBoundingClientRect(),i=parseFloat(t.style.marginLeft);if(i&&(e.x=e.x-i),Math.round(e.x+e.width)>Math.round(n.x+n.width)&&n.width>e.width){const o=h(t.parentNode,"dropdown-menu");if(o){const n=o.getBoundingClientRect(),i=parseFloat(window.getComputedStyle(o,null).getPropertyValue("border-right-width"));t.style.marginLeft="-"+(e.x+e.width-n.x-i)+"px"}else t.style.marginLeft="-"+(e.x+e.width-n.x-n.width)+"px"}else i&&(t.style.marginLeft="")}}(i,w)))})),E===ht.Modal&&(window.addEventListener("resize",G),G()),Promise.resolve()},updateGridDropDown:vt,setInlineModalSize:Et};export{ht as DialogType,Tt as default,wt as getDropDownElement,Mt as isDropDownVisible,xt as onOutsideClick,Ct as scrollDropDown,Et as setInlineModalSize,yt as setPositionOfDropDown,zt as shouldPreventTouchMove,vt as updateGridDropDown};