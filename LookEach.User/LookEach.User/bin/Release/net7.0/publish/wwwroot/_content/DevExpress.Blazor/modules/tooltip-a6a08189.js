import{d as t}from"./dom-f93f7533.js";import{e as o,c as e}from"./dom-utils-04e3c6d2.js";import"./_tslib-6e8ca86b.js";import"./css-classes-f3f8ed66.js";let s;function i(t,i){i&&s&&s.series&&s.clearHover();const l=(t=o(t)).querySelector(".dx-chart-tooltip");l&&e((()=>l.classList.remove("show")))}function l(o,l,n){o.tooltip={enabled:!1,forceEvents:!0,location:l.location},o.onTooltipHidden=function(t){t.isPointerOut&&i(t.element.closest("div.dx-blazor-widget"),!1)},o.onTooltipShown=function(o){const i=o.target;if(!i||!i.series)return;const l=o.element.closest("div.dx-blazor-widget").querySelector(".dx-chart-tooltip"),c=l.offsetParent,r=o.x-t.DomUtils.getAbsolutePositionX(c),a=l.querySelector(".dx-tooltip-pointer"),d=`calc(${o.y-t.DomUtils.getAbsolutePositionY(c)}px - 0.625rem)`,f=l.classList;e((function(){l.style.top=d,l.style.left=r+"px",a.style.left="50%",f.contains("show")||f.add("show")})),s=i,n.invokeMethodAsync("ShowTooltip",i.data,i.tag,i.series.index)}}const n={hideTooltip:i};export{n as default,i as hideTooltip,l as setupTooltip};
