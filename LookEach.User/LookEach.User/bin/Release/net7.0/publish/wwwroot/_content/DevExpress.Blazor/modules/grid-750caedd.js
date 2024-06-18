import{b as e,d as t}from"./dom-f93f7533.js";import{e as o}from"./evt-a125525d.js";import{t as n}from"./touch-b17c92da.js";import{l,d as r,m as i,n as s,h as c,q as a,e as d,u,r as f,b as p,o as h,f as m,p as g,v as y,w as S,g as b}from"./dom-utils-04e3c6d2.js";import{d as v,r as x}from"./disposable-d2c2d283.js";import{S as H}from"./svg-utils-0be6c8b2.js";import{minColumnWidth as T,ColumnResizeMode as w}from"./column-resize-7b7595ec.js";import{updateScrollbarStyle as E}from"./dx-style-helper-01d35a9d.js";import{ListBoxCssClasses as L}from"./dx-listbox-d460bffc.js";import"./_tslib-6e8ca86b.js";import"./css-classes-f3f8ed66.js";import"./key-4ced10e2.js";import"./lit-element-base-7a85dca5.js";import"./data-qa-utils-8be7c726.js";import"./lit-element-70cf14f4.js";import"./custom-element-267f9a21.js";import"./dx-ui-element-7f5e2dd2.js";import"./logicaltreehelper-bc8e12d3.js";import"./layouthelper-dc0e1370.js";import"./rect-00eb3fa4.js";import"./point-e4ec110e.js";import"./constants-58283e53.js";import"./dx-html-element-pointer-events-helper-4b46ddbf.js";import"./eventhelper-8570b930.js";import"./pointer-event-helper-ba4ce1e1.js";import"./property-d3853089.js";const N="data-dxdg-column-id",I="data-dxdg-draggable-id",B={GroupPanelHead:"gph",ColumnHead:"ch"};function C(e){if(!e.hasAttribute(I))return null;const t=e.getAttribute(N).split("|"),o=!(t.length>2)||"1"===t[2],n=t.length>1?B[t[1]]:B.ColumnHead,l=n===B.ColumnHead?parseInt(t[0]):-1,r=n===B.GroupPanelHead?parseInt(t[0]):-1,i=e.previousElementSibling;return{columnVisibleIndex:l,groupVisibleIndex:r,columnHeadType:n,canBeGrouped:o,needInsertBeforeToo:!i||!C(i),element:e}}function R(e){return"["+I+"="+e+"]"}function M(e,t,o){var n,l,r;n=e,l=D(t,"clientX")-o.left,r=D(t,"clientY")-o.top,n.style.transform=["translate(",Math.round(l),"px, ",Math.round(r),"px)"].join("")}function D(e,t){return void 0!==e[t]?e[t]:void 0!==e.touches?e.touches[0][t]:0}function V(t,o,c,a){const d=D(t,"clientX"),u=D(t,"clientY"),f=t.target;if(c){const e=l(t.target,"th");if(e&&d>=e.getBoundingClientRect().right-T)return}let p=!1;const h=function(e){const t=Math.abs(d-D(e,"clientX"))>10,c=Math.abs(u-D(e,"clientY"))>10;return(t||c)&&(p=!0,m(),function(e,t,o,c){const a=R(o),d=l(t,a);if(!d)return;const u=r(d,"dxbs-gridview").getBoundingClientRect(),f=C(d),p=s(),h=i();let m={left:0,top:0};const g=function(e,t){const o=[],n=R(t),l=document.querySelectorAll(n);let r=!1,i=!1;for(let e=0;e<l.length;e++){const t=l[e],n=t.getBoundingClientRect(),s=C(t),c=s.columnVisibleIndex,a=s.groupVisibleIndex,d=s.columnHeadType;d===B.GroupPanelHead?r=!0:d===B.ColumnHead&&(i=!0),s.needInsertBeforeToo&&o.push(new q(t,n.left,n.top,n.bottom,c,a,d,!0,!1)),o.push(new q(t,n.right,n.top,n.bottom,c,a,d,!1,!1))}if(r||i){if(!r){const e=document.querySelector("[data-dxdg-drag-group-panel="+t+"]");if(e){const t=e.getBoundingClientRect();o.push(new q(e,t.left,t.top,t.bottom,-1,0,B.GroupPanelHead,!1,!0,!0))}}if(!i){const e=document.querySelector("[data-dxdg-drag-head-row="+t+"]");if(e){const t=e.getBoundingClientRect();o.push(new q(e,t.right,t.top,t.bottom,-1,-1,B.ColumnHead,!1,!0,!0))}}}return o}(0,o),y=function(e,t){let o=e.cloneNode(!0);const n=e.getBoundingClientRect(),l={left:D(t,"clientX")-n.left,top:D(t,"clientY")-n.top};if("DIV"!==o.tagName){const t=document.createElement("DIV"),l=window.getComputedStyle(e);t.innerHTML=o.innerHTML,t.className="card "+e.className,t.style.width=n.width+"px",t.style.height=n.height+"px",t.style.paddingTop=l.paddingTop,t.style.paddingBottom=l.paddingBottom,t.style.paddingLeft=l.paddingLeft,t.style.paddingRight=l.paddingRight,o=t}else o.style.width=n.width+"px",o.style.height=n.height+"px";o.className=o.className+" dx-dragging-state",document.body.appendChild(o);const r=o.getBoundingClientRect();return{dragElement:o,offsetFromMouse:{left:r.left+l.left,top:r.top+l.top}}}(d,e),S=y.dragElement,b=y.offsetFromMouse;M(S,e,b);let v=!0,x=null;const T=function(e){v&&(S.style.visibility="visible",v=!1);return M(S,e,{left:b.left+m.left,top:b.top+m.top}),x=function(e,t,o,n,l,r){!function(e){const t=R(e),o="div."+j+t,n=document.querySelectorAll(o);for(let e=0;e<n.length;e++){const t=n[e];t.parentNode.removeChild(t)}}(t);let c=null;const a=[],d=D(n,"clientX"),u=D(n,"clientY");for(let t=0;t<e.length;t++){const n=e[t];if(n.columnHeadType===B.GroupPanelHead&&!o.canBeGrouped)continue;if(n.top+l.top<=u&&u<=n.bottom+l.top){if(n.wholeRowIsRarget){c=n;break}a.push({distance:Math.abs(Math.abs(n.x+l.left)-Math.abs(d)),target:n})}}if(null==c){let e=1e6;for(const t in a)e>a[t].distance&&O(d,o,a[t].target)&&(e=a[t].distance,c=a[t].target)}null==c||A(o,c)||c.x>=r.left&&c.x<=r.right&&function(e,t){const o=document.createElement("DIV"),n=1,l=16,r=e.bottom-e.top+2*n,c=2*(l+n)+r;o.className=j,o.dataset.dxdgDraggableId=t,o.style.top=e.top+(e.docScrollTop-i())+i()-1-n-l+"px",o.style.height=c+"px",o.style.left=e.x+(e.docScrollLeft-s())+s()-l/2+"px",o.innerHTML=[H.getSvgHtml(H.ArrowDownIconName),"<div style='height:",r,"px'></div>",H.getSvgHtml(H.ArrowUpIconName)].join(""),document.body.appendChild(o),e.mark=o}(c,t);return c}(g,o,f,e,m,u),e.preventDefault(),!1},w=function(){if(x&&!A(f,x)){c.invokeMethodAsync("OnGridColumnHeadDragNDrop",f.columnHeadType===B.GroupPanelHead?f.groupVisibleIndex:f.columnVisibleIndex,f.columnHeadType,x.columnHeadType===B.GroupPanelHead?x.groupVisibleIndex:x.columnVisibleIndex,x.columnHeadType,x.insertBefore),x.mark&&x.mark.parentNode.removeChild(x.mark)}document.removeEventListener(n.TouchUtils.touchMouseMoveEventName,T),document.removeEventListener(n.TouchUtils.touchMouseUpEventName,w),window.removeEventListener("scroll",E),S.parentNode.removeChild(S)},E=function(){m={left:p-s(),top:h-i()}};document.addEventListener(n.TouchUtils.touchMouseMoveEventName,T),document.addEventListener(n.TouchUtils.touchMouseUpEventName,w),window.addEventListener("scroll",E)}(e,f,o,a)),e.preventDefault(),!1},m=function(){document.removeEventListener(n.TouchUtils.touchMouseMoveEventName,h),document.removeEventListener(n.TouchUtils.touchMouseUpEventName,m),!p&&f&&e.Browser.WebKitTouchUI&&f.click()};document.addEventListener(n.TouchUtils.touchMouseMoveEventName,h),document.addEventListener(n.TouchUtils.touchMouseUpEventName,m),t.preventDefault(),f.focus()}function q(e,t,o,n,l,r,c,a,d){this.element=e,this.x=t,this.top=o,this.bottom=n,this.columnVisibleIndex=l,this.groupVisibleIndex=r,this.columnHeadType=c,this.insertBefore=a,this.wholeRowIsRarget=d,this.docScrollTop=i(),this.docScrollLeft=s()}function A(e,t){function o(e,t){return t.groupVisibleIndex===e.groupVisibleIndex||t.groupVisibleIndex===e.groupVisibleIndex-1&&!t.insertBefore}function n(e,t){return t.columnVisibleIndex===e.columnVisibleIndex||t.columnVisibleIndex===e.columnVisibleIndex-1&&!t.insertBefore}if(t.columnHeadType===e.columnHeadType&&e.columnHeadType===B.GroupPanelHead&&o(e,t))return!0;if(t.columnHeadType===e.columnHeadType&&e.columnHeadType===B.ColumnHead&&n(e,t))return!0;if(e.columnHeadType===B.GroupPanelHead&&t.columnHeadType===B.ColumnHead&&-1!==e.columnVisibleIndex&&n(e,t))return!0;return!(e.columnHeadType!==B.ColumnHead||t.columnHeadType!==B.GroupPanelHead||-1===e.groupVisibleIndex||!o(e,t))}function O(e,t,o){const n=t.element.getBoundingClientRect();if(A(t,o)&&(e<n.left||e>n.right))return!1;if(o.x<n.left){if(e>n.right)return!1}else if(e<n.left)return!1;return!0}B[1]=B.ColumnHead,B[0]=B.GroupPanelHead;const j="dxgv-target-marks";const W=200,P="dxbs-data-row",U={GridSelectedRowCell:".dxbs-table td.table-active"},_={SELECTION_BG:"--selection-bg",COMPONENT_WIDTH:"--component-width",SCROLL_LEFT:"--scroll-left"},G=new ResizeObserver((e=>{for(let t=0;t<e.length;t++){const o=e[t],n=o.target;n.style.setProperty(_.COMPONENT_WIDTH,o.contentRect.width+"px"),n._dxOnWindowResize&&n._dxOnWindowResize()}}));class k{constructor(e,t,o){this._itemHeight=e,this._scrollTop=t,this._scrollHeight=o}get itemHeight(){return this._itemHeight}get scrollTop(){return this._scrollTop}get scrollHeight(){return this._scrollHeight}isEqual(e){return this.itemHeight===e.itemHeight&&this.scrollTop===e.scrollTop&&this.scrollHeight===e.scrollHeight}toJSON(){return{ItemHeight:this.itemHeight,ScrollTop:this.scrollTop,ScrollHeight:this.scrollHeight}}}function z(e){if(!c(e))return;let t=function(e){let t=e.querySelector("*[id$='_LB']");!t&&e.parentNode&&(t=e.parentNode.querySelector("*[id$='_LB']"));t||(t=e);if(t){let e=t.querySelector(L.ItemSelected);if(e||(e=t.querySelector(U.GridSelectedRowCell)),e)return e.parentNode}return null}(e);if(t||(t=function(e){let t=null;a(e,(o=>{t=e.querySelector("*"+o+" > *[id$='_LB']")})),t||a(e.parentNode,(o=>{e.parentNode&&(t=e.parentNode.querySelector("*"+o+" > *[id$='_LB']"))}));const o=t?t.querySelector(U.GridSelectedRowCell):null;return o?o.parentNode:null}(e)),t){const o=e;let n=t.offsetTop;if(t.offsetParent&&"TABLE"===t.offsetParent.tagName){const e=t.offsetParent.previousElementSibling;e&&(n+=e.clientHeight)}const l=o.scrollTop+o.clientHeight<n+t.offsetHeight;o.scrollTop>n&&(o.scrollTop=n),l&&(o.scrollTop=n-(o.clientHeight-t.offsetHeight))}}function F(e){if(!c(e))return;const t=function(e){let t=e.querySelector("*[id$='_LB']");!t&&e.parentNode&&(t=e.parentNode.querySelector("*[id$='_LB']"));t||(t=e);if(t){const e=t.querySelector(L.ItemActive);if(e)return"TR"===e.tagName?e:e.parentNode}return null}(e);if(t){let o=e.querySelector(".dxgvCSD");o||(o=e);const n=o.scrollTop+o.clientHeight<t.offsetTop+t.offsetHeight;o.scrollTop>t.offsetTop&&(o.scrollTop=t.offsetTop),n&&(o.scrollTop=t.offsetTop-(o.clientHeight-t.offsetHeight))}}function X(e){void 0===e.dataset.virtualScrollLock&&(e.dataset.virtualScrollLock="0")}function $(e){X(e);const t=Number(e.dataset.virtualScrollLock)+1;e.dataset.virtualScrollLock=t.toString()}function Y(e){X(e);const t=Number(e.dataset.virtualScrollLock)-1;e.dataset.virtualScrollLock=t.toString()}function J(e,t,o,n,l,r,i){o.isHorizontalScrolling&&K(e,n,l),o.isVirtualScrolling&&function(e,t,o,n,l){if(r=o,X(r),Number(r.dataset.virtualScrollLock)>0)return;var r;!function(e,t,o,n,l){let r=!0;o.dataset.prevScrollTop?r=o.dataset.prevScrollTop!==o.scrollTop.toString():o.dataset.prevScrollTop=o.scrollTop.toString();Q(o),r&&(o.dataset.OnScrollTimerId=setTimeout((function(){(function(e,t,o,n){const l=Z(t),r=ne(t),i=r.scrollTop,s=r.scrollBottom,c=o.clientHeight>0&&i<o.offsetHeight,a=n.clientHeight>0&&s>o.offsetHeight+l.offsetHeight;return c||a?function(e,t,o){const n=e;return n.dxScrollStateCache&&n.dxScrollStateCache.isEqual(o)?Promise.resolve():(n.dxScrollStateCache=o,t.DxRestoreScrollTop=t.scrollTop,$(t),e.invokeMethodAsync("OnGridVirtualScroll",o.itemHeight,o.scrollTop,o.scrollHeight).then((o=>{!function(e,t){he(e.mainElement,e,t)}(o,e),Y(t)})).catch(le))}(e,t,r.requestScrollState):Promise.resolve()})(e,o,n,l).then((()=>{delete o.dataset.prevScrollTop})),t.needInternalSettings&&ie(t)}),W).toString(),function(e){const t=0===e.scrollTop,o=e.scrollHeight-e.scrollTop===e.clientHeight,n="dx-scrolling";e.classList.remove(n),t||o||e.classList.add(n)}(o))}(e,t,o,n,l)}(t,o,n,r,i)}function K(e,t,n){if(t.scrollLeft===n.scrollLeft)return;const l=o.EvtUtils.getEventSource(e);if(l===t){const e=t.scrollLeft;n.scrollLeft=e,t.style.setProperty(_.SCROLL_LEFT,e+"px")}else l===n&&setTimeout((()=>t.scrollLeft=n.scrollLeft),0)}function Q(e){e.dataset.OnScrollTimerId&&(clearTimeout(Number(e.dataset.OnScrollTimerId)),delete e.dataset.OnScrollTimerId)}function Z(e){const t=e.querySelector("table.dxbs-table"),o=e.classList.contains(L.ListBox)?e.querySelector("ul"):null;return t||o}function ee(e,t,o,n,l){const r=Z(t),i=function(e,t){const o=oe(e),n=t.virtualScrollingOptions.itemsAbove*o,l=t.virtualScrollingOptions.itemsBelow*o;return{itemHeight:o,spacerTop:n,spacerBelow:l}}(r,l);o.style.height=i.spacerTop+"px",n.style.height=i.spacerBelow+"px",function(e,t,o){e.scrollTop<o.clientHeight&&(e.scrollTop=o.clientHeight+1);e.scrollTop+e.clientHeight>o.clientHeight+t.offsetHeight&&(e.scrollTop=o.clientHeight+t.offsetHeight-e.clientHeight-1)}(t,r,o)}function te(e){return Array.from(function(e){switch(e.tagName){case"TABLE":return e.querySelectorAll(":scope > tbody > tr");case"UL":return e.querySelectorAll(":scope > li");default:throw new Error("Unexpected data container element")}}(e),(e=>e.offsetHeight))}function oe(e){const t=te(e),o={};for(let e=0;e<t.length;e++){const n=t[e];o[n]=o[n]?o[n]+1:1}let n=0,l=0;for(const e in o)o[e]>l&&(l=o[e],n=Number(e));return n}function ne(e){const t=300,o=Z(e);let n=e.scrollTop-t;n<0&&(n=0);const l=e.scrollTop+e.clientHeight+t;let r=n-t;r<0&&(r=0);const i=l-r+t,s=oe(o);return{scrollTop:n,scrollBottom:l,requestScrollState:new k(s,r,i)}}function le(e){e&&e.mainElement&&me(e.mainElement)}function re(e){return()=>{if(!e)return;const t=e.parentStyleSheet;if(!t)return;const o=Array.prototype.indexOf.call(t.cssRules,e);o>-1&&t.deleteRule(o)}}function ie(e){const t=e.elementsStorage,o=d(e.mainElement).parentElement;if(!o)return null;const n=d(t.scrollElement),l=d(t.scrollHeaderElement),r=[],i=window.getComputedStyle(o);if(!i)return null;if(!n.style.maxHeight)if(e.isDropDown)n.style.maxHeight=ae(i,l)+"px";else{const e=m(o,(e=>{n.style.maxHeight=e.height-l.offsetHeight+"px"})),t=m(l,(e=>{n.style.maxHeight=o.clientHeight-(e.height+2*g(l))+"px"}));r.push((()=>{u(e),u(t)})),n.style.maxHeight=o.clientHeight-l.offsetHeight+"px"}if(e.isDropDown&&2!==e.dropDownWidthMode){const t=ce(n,l,o,e,i),s=n.querySelector("table");if(!s)return null;x(s,(()=>{t&&t()}));const c=m(s,(t=>{v(s);const r=ce(n,l,o,e,i);x(s,(function(){r&&r()}))}));r.push((function(){u(c),v(s)}))}return r.length>0?()=>{r.forEach((e=>e()))}:null}function se(e,o,n){const l="dxbs-vertical-scrollbar-visible";o&&!n?t.DomUtils.addClassName(e,l):t.DomUtils.removeClassName(e,l)}function ce(e,t,o,n,l){function r(e,t){const o=e.querySelector(t);return o?o.children:null}let i=null;const s=e.querySelector("table"),c=t.querySelector("table");if(!s||!c)return null;const a=r(s,"tbody>tr"),u=a&&1===a.length&&s.querySelector("tr.dxbs-empty-data-row"),f=r(c,"colgroup"),h=r(s,"colgroup");o.dataset.calculated&&function(e,t){if(!e||!t)return;for(let o=0;o<e.length;o++){const n=e[o];n.dataset.autoWidth&&ue(n,t.item(o))}}(f,h);let m=0;if(u){c.style.width="auto",c.style.tableLayout="auto";const e=window.getComputedStyle(c).width;c.removeAttribute("style"),m=parseFloat(e)}else{const e=r(c,"thead>tr");if(!(f&&e&&a&&h))return null;s.style.width=c.style.width="auto",s.style.tableLayout=c.style.tableLayout="auto";const t=[];for(let o=0;o<f.length;o++){const l=f[o];if(l.style.width)if(-1!==l.style.width.indexOf("%"))t.push(o);else{const e=b(),t=d(n.mainElement).getAttribute("data-dxdg-id");let r=null;e&&(e.insertRule("[data-dxdg-id='"+t+"'] table tr>td:nth-child("+(o+1)+"), [data-dxdg-id='"+t+"'] table tr>th:nth-child("+(o+1)+") { max-width:"+l.style.width+"; }",e.cssRules.length),r=e.cssRules[e.cssRules.length-1],m+=parseFloat(l.style.width)),i=re(r)}else l.dataset.autoWidth="true",m+=de(l,h[o],e[o],a[o])}if(t.length>0)for(let o=0;o<t.length;o++)m+=de(f[o],h[o],e[o],a[o]);s.removeAttribute("style"),c.removeAttribute("style")}if(0===n.dropDownWidthMode||1===n.dropDownWidthMode){const r=n.editor;if(!r)return null;const i=parseInt(l.borderRightWidth,10)+parseInt(l.borderLeftWidth,10),s=m+(e.querySelector("table").offsetHeight>ae(l,t)?p():0)+i;0===n.dropDownWidthMode&&r.offsetWidth>s?(!function(e,t,o){if(!e||!t)return;const n=Array.from(e),l=n.filter((e=>e.dataset.autoWidth));if(l.length>0){const e=Math.floor(o/l.length);for(let o=0;o<l.length-1;o++){const r=l[o],i=t[n.indexOf(r)],s=Number.parseInt(r.style.width);i.style.width=r.style.width=s+e+"px"}const r=l[l.length-1];ue(r,t[n.indexOf(r)])}}(f,h,r.offsetWidth-s),o.style.width=r.offsetWidth-2+"px"):o.style.width=s+"px"}return o.dataset.calculated="true",i}function ae(e,t){const o=parseInt(e.borderTopWidth,10)+parseInt(e.borderBottomWidth,10);return parseInt(e.maxHeight,10)-o-t.offsetHeight}function de(e,t,o,n){const l=Math.ceil(o.getBoundingClientRect().width),r=Math.ceil(n.getBoundingClientRect().width),i=l>r?l:r;return t.style.width=e.style.width=i+"px",i}function ue(e,t){e.style.width="",t&&(t.style.width="")}k.Auto=new k(0,0,0);const fe=document.createElement("TD");async function pe(e,o){try{const n=d(e);if(!n)throw new Error("failed");await function(e){return new Promise(((t,o)=>{!function n(l){e.clientHeight>0?t():0===l?o("DxDataGrid.Init error: can't measure layout"):setTimeout(n,100,l-1)}(10)}))}(n),n._dxResizeAttached||(n._dxResizeAttached=!0,G.observe(n)),cancelAnimationFrame(n._dxNextRafId||-1);const l=n.clientWidth+"px",r=t.DomUtils.getCurrentStyle(fe).backgroundColor,i=o(n);return n._dxNextRafId=requestAnimationFrame((()=>{n.style.setProperty(_.SELECTION_BG,r),n.style.setProperty(_.COMPONENT_WIDTH,l)})),i}catch(e){throw new Error(`DxDataGrid.Init error: ${e}`)}}function he(e,l,i){return pe(e,(e=>{const s=i,c=l.isMultipleSelectionEnabled,a=l.scrollToSelectedItemRequested,m=l.elementsStorage;v(e);let g=null,b=null,H=null,T=null,L=null;l.needInternalSettings&&(L=ie(l));const N=d(m.scrollElement),I=d(m.scrollHeaderElement);if(N){const o=d(m.virtualScrollSpacerTopElement),n=d(m.virtualScrollSpacerBottomElement);if($(N),l.isVirtualScrolling||l.isVerticalScrolling){t.DomUtils.addClassName(e,"dxbs-has-vertical-scrollbar"),se(e,N.scrollHeight>N.clientHeight,l.isHorizontalScrolling);l.isFirstScrollableRender&&l.isAutoVerticalScrollBarMode&&(e.disposeVerticalScrollBarSubscriber=function(e,t,o){const n=y(t,(t=>{se(e,t,o)}));return()=>{u(n)}}(e,N,l.isHorizontalScrolling)),l.isFirstScrollableRender&&(e.disposeVerticalScrollBarWidthSubscriber=function(){const e=S((()=>E()));return()=>{u(e)}}())}if(l.isVirtualScrolling&&(ee(0,N,o,n,l),a?z(N):N.DxRestoreScrollTop&&(N.scrollTop=N.DxRestoreScrollTop,delete N.DxRestoreScrollTop)),function(e){const t=e.querySelectorAll(".btn.btn-toggle");if(0!==t.length)for(let o=0;o<t.length;o++){const n=t[o],l=n.offsetWidth+h(n.parentNode);if(l>0){requestAnimationFrame((()=>{e.style.setProperty("--button-w",l+"px")}));break}}}(e),g=e=>J(e,s,l,N,I,o,n),N.addEventListener("scroll",g),I&&I.addEventListener("scroll",g),Y(N),function(e){return!e.needInternalSettings&&(e.isHorizontalScrolling||e.isVerticalScrolling&&e.columnResizeMode!==w.Component)}(l)){const t=d(m.rootElement);b=()=>function(e,t,o,n){let l="",r="";t&&($(t),l=t.style.overflowX,t.style.overflowX="hidden",t.style.width="0"),o&&(r=o.style.overflowX,o.style.overflowX="hidden",o.style.width="0");const i=e.clientWidth;if(t&&(i&&(t.style.width=i+"px"),t.style.overflowX=l),o){const e=function(e,t){return(t.isVerticalScrolling||t.isVirtualScrolling)&&(e.clientHeight<e.scrollHeight||"scroll"===e.style.overflowY)}(t,n)?p():0;i&&(o.style.width=i-e+"px"),o.style.overflowX=r}t&&Y(t)}(t,N,I,l),b(),window.addEventListener("resize",b),e._dxOnWindowResize=b}}function B(e){C(e)}function C(e){if(!c||!e.shiftKey||!o.EvtUtils.isLeftButtonPressed(e))return;const t=o.EvtUtils.getEventSource(e);r(t,P)&&f()}e.addEventListener("mousedown",B);let R=null,M=null;const D=l.columnResizeMode!==w.Disabled;if(l.isColumnDragEnabled){const t=e.dataset.dxdgId;t&&(R=e.querySelector("[data-dxdg-drag-head-row='"+t+"']"),R&&(H=e=>V(e,t,D,s),R.addEventListener(n.TouchUtils.touchMouseDownEventName,H)),M=e.querySelector("[data-dxdg-gp='"+t+"']"),M&&(T=e=>V(e,t,D,s),M.addEventListener(n.TouchUtils.touchMouseDownEventName,T)))}if(x(e,(function(){L&&L(),g&&(N.removeEventListener("scroll",J),I&&I.removeEventListener("scroll",J)),b&&window.removeEventListener("resize",b),N&&Q(N),H&&R&&R.removeEventListener(n.TouchUtils.touchMouseDownEventName,H),T&&M&&M.removeEventListener(n.TouchUtils.touchMouseDownEventName,T),e.removeEventListener("mousedown",B)})),l.isFirstScrollableRender&&l.isVirtualScrolling&&l.virtualScrollingOptions.itemsBelow>0){const e=ne(N);return JSON.stringify(e.requestScrollState)}return JSON.stringify(k.Auto)}))}function me(e){return(e=d(e))&&function(e){G.unobserve(e),v(e),function(e){e.disposeVerticalScrollBarSubscriber&&(e.disposeVerticalScrollBarSubscriber(),delete e.disposeVerticalScrollBarSubscriber)}(e),function(e){e.disposeVerticalScrollBarWidthSubscriber&&(e.disposeVerticalScrollBarWidthSubscriber(),delete e.disposeVerticalScrollBarWidthSubscriber)}(e)}(e),Promise.resolve("ok")}fe.style.cssText="display: none; position: fixed; top: -1000px; left: -1000px;",fe.className="table-active",document.body.appendChild(fe);const ge={init:he,dispose:me};export{ge as default,me as dispose,ne as getParametersForVirtualScrollingRequest,he as init,F as scrollToFocusedItem,z as scrollToSelectedItem};