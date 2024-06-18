import{d as t}from"./dom-f93f7533.js";import{e,k as i,l as s,G as o,R as n,f as r,u as l,H as a,I as c}from"./dom-utils-04e3c6d2.js";import{d as h}from"./disposable-d2c2d283.js";import{S as u}from"./observables-589a5615.js";import{initFocusHidingEvents as d}from"./focus-utils-cd9c9bc2.js";import{P as m}from"./pointer-event-helper-ba4ce1e1.js";import{D as p}from"./dx-dropdown-owner-82f2e52f.js";import{T as g}from"./toolbar-css-classes-98be7512.js";import"./_tslib-6e8ca86b.js";import"./css-classes-f3f8ed66.js";import"./touch-b17c92da.js";import"./constants-58283e53.js";import"./dx-ui-element-7f5e2dd2.js";import"./logicaltreehelper-bc8e12d3.js";import"./layouthelper-dc0e1370.js";import"./rect-00eb3fa4.js";import"./point-e4ec110e.js";import"./lit-element-base-7a85dca5.js";import"./data-qa-utils-8be7c726.js";import"./lit-element-70cf14f4.js";import"./popup-3304c929.js";import"./rafaction-bba7928b.js";import"./transformhelper-ebad0156.js";import"./positiontracker-1fe0834d.js";import"./branch-bf06b0d2.js";import"./property-d3853089.js";import"./custom-element-267f9a21.js";import"./capturemanager-86a8762a.js";import"./eventhelper-8570b930.js";import"./nameof-factory-64d95f5b.js";import"./custom-events-helper-18f7786a.js";const b="data-dxtoolbar-group-id",f=".dxbl-btn-toolbar",y=".dxbl-image:not(.dxbl-toolbar-dropdown-toggle)",k=!1;class v{constructor(t){this.items=[],this.isLocked=!1,this.subscriptions=[],t&&this.addRange(t)}subscribe(t){this.isLocked||t(this.getChanges(this.items,[])),this.subscriptions.push(t)}getChanges(t,e){return{addedItems:t||[],removedItems:e||[]}}forEach(t,e){this.items.forEach(t,e)}selectMany(t,e){return this.map(t,e).reduce((function(t,e){return t.concat(e)}),[])}reduce(t,e){return this.items.reduce(t,e)}map(t,e){return this.items.map(t,e)}filter(t,e){return this.items.filter(t,e)}any(){return this.count()>0}count(){return this.items.length}get(t){return this.items[t]}add(t){this.addItemCore(t)&&this.raiseChanges([t],[])}remove(t){this.removeItemCore(t)&&this.raiseChanges([],[t])}addRange(t){this.raiseChanges(t.map(this.addItemCore.bind(this)).filter((function(t){return!!t})),[])}removeRange(t){this.raiseChanges([],t.map(this.removeItemCore.bind(this)).filter((function(t){return!!t})))}addItemCore(t){return this.items.indexOf(t)>-1?null:this.items[this.items.length]=t}removeItemCore(t){const e=this.items.indexOf(t);return-1===e?null:this.items.splice(e,1)[0]}raiseChanges(t,e){const i=this.getChanges(t,e);(i.addedItems.length>0||i.removedItems.length>0)&&this.subscriptions.forEach((function(t){t(i)}))}lock(){this.isLocked=!0}unlock(){this.isLocked=!1}}class C{constructor(t,e,i){var s;this.layer=t,this.block=e,this.width=0,this._blockCollection=void 0;const o=e.getGroupElement();o&&(this._blockCollection=this.layer.getBlockCollection(o),null===(s=this._blockCollection)||void 0===s||s.push(e)),i.subscribe(e,((t,i=!1)=>{var s;null===t&&(t=null===(s=this.layer.getPrevLayer())||void 0===s?void 0:s.getActualBlocks().filter((function(t){return t.block===e}))[0].width),t!==this.width&&(this.width=null!=t?t:0,i||this.layer.requestUpdateLayoutModel())}))}get blockCollection(){return this._blockCollection||new I(null)}getMinWidth(){return this.width}getMaxWidth(t){return this.getMinWidth()}}class x extends C{getPrevLayerMinWidth(){const t=this.layer.getPrevLayer();return t?t.getActualBlocks().filter((t=>t.block===this.block))[0].getMinWidth():0}getMaxWidth(t){return t===this.layer?this.getPrevLayerMinWidth():this.getMinWidth()}}class I{constructor(t){this.id=t,this._margins=void 0,this.blocks=[]}push(t){this.blocks.includes(t)||this.blocks.push(t),this.update()}toArray(){return Array.from(this.blocks)}get margins(){return this._margins||0}update(){if(!this._margins&&this.blocks.length){const e=this.blocks[0].getGroupElement();if(e){const i=t.DomUtils.getCurrentStyle(e);this._margins=t.DomUtils.pxToInt(i.marginRight)+t.DomUtils.pxToInt(i.marginLeft)}}}}class L extends C{}class W extends C{}class M{constructor(t,e){this.widthCalculator=t,this.triggersResolver=e,this.widthCalculator=t,this.triggersResolver=e}subscribe(t,e){const i=this.widthCalculator.bind(this);this.triggersResolver(t).forEach((function(s){s.subscribe((function(){t.isWidthCalculationLocked||o((function(){e(i(t),!1)}))}),!0)})),o((function(){e(i(t),!0)}))}}const w={fullWidthItem:new M((function(t){return t.getWidth()}),F),fullWidthSystemItem:new M((function(t){return t.getWidth()}),(function(t){return[]})),titleItem:new M((function(t){return t.getWidth()}),(function(t){var e,i;return[null===(e=t.toolbar.title)||void 0===e?void 0:e.hasTitle,null===(i=t.toolbar.title)||void 0===i?void 0:i.text]})),noTextItem:new M((function(t){return t.getNoTextWidth()}),F),contextItem:function(t){return new M((function(e){return t.items.filter((function(t){return"item"===t.getName()&&t.index<e.index&&t.isVisible()})).length>=e.toolbar.minRootItems||!e.isVisible()?0:null}),F)},hiddenItem:new M((function(){return 0}),(function(){return[]}))};class E{constructor(t,e,i,s){this.stateName=t,this.blockUpdaterGetter=e,this.prevLayer=i,this.canApply=s,this.nextLayer=null,this.layoutBlocks=[],this.nextLayer=null,i&&(i.nextLayer=this)}getNextLayer(){return null!=this.nextLayer?this.nextLayer.canApply()?this.nextLayer:this.nextLayer.getNextLayer():null}getPrevLayer(){return null!=this.prevLayer?this.prevLayer.canApply()?this.prevLayer:this.prevLayer.getPrevLayer():null}requestUpdateLayoutModel(){var t;null===(t=this.getPrevLayer())||void 0===t||t.requestUpdateLayoutModel()}getBlockCollection(t){var e;return null===(e=this.getPrevLayer())||void 0===e?void 0:e.getBlockCollection(t)}isValidWidth(t){if(!this.canApply()||!t)return!1;const e=this.getRange();return!this.getNextLayer()&&e.min>t||!this.getPrevLayer()&&e.max<t||e.min<=t&&e.max>=t}getRange(){const t=new Set,e=this.latestRange=this.getActualBlocks().reduce(((e,i)=>(t.add(i.blockCollection),{min:e.min+i.getMinWidth(),max:e.max+i.getMaxWidth(this)})),{min:0,max:0});return t.forEach((t=>{e.min+=t.margins,e.max+=t.margins})),e}getActualBlocks(){const t=this.getPrevLayer();return t?t.getActualBlocks().map((t=>this.layoutBlocks.filter((function(e){return e.block===t.block}))[0]||t)):this.layoutBlocks}activate(t){t&&this.layoutBlocks.forEach((t=>{t.block.updateState(this.stateName)}))}addBlock(t){const e=this.blockUpdaterGetter(t);e&&this.layoutBlocks.push(this.createBlock(t,e))}removeBlock(t){}activateAndReset(t){}}class R extends E{constructor(t,e,i,s){super(t,e,null,s),this.layoutModel=i,this.blockCollection=new Map}requestUpdateLayoutModel(){this.layoutModel.updateLayout()}createBlock(t,e){return new W(this,t,e)}activateAndReset(t){this.activate(t),this.layoutBlocks.forEach((t=>{t.block.reset()}))}getBlockCollection(t){return this.getBlockCollectionCore(t)}getBlockCollectionCore(t){let e=this.blockCollection.get(t);return e||this.blockCollection.set(t,e=new I(t)),e}}class S extends E{activate(t){const e=this.getActualBlocks();let i=this.latestRange.max,s=this.stateName;const o=new Map;for(let n=e.length-1;n>=0;n--){const r=e[n];if(i>t){i-=r.getMaxWidth(this)-r.getMinWidth();const e=r.blockCollection.id,n=(o.has(e)?o:o.set(e,r.blockCollection.toArray())).get(e);if(n&&(n.splice(n.indexOf(r.block),1),n.length||(i-=r.blockCollection.margins)),i<=t){r.block.updateState(s);const t=this.getPrevLayer();s=t?t.stateName:"";continue}}r.block.updateState(s)}}getRange(){const t=new Set;return this.latestRange=this.getActualBlocks().reduce(((e,i)=>(t.add(i.blockCollection),{min:e.min+i.getMinWidth(),max:e.max+i.getMaxWidth(this)})),{min:0,max:0}),t.forEach((t=>{this.latestRange.max+=t.margins})),this.latestRange}createBlock(t,e){return new x(this,t,e)}}class T extends E{createBlock(t,e){return new L(this,t,e)}getRange(){const t=new Set;let e=this.getActualBlocks().reduce((function(e,i){return t.add(i.blockCollection),e+i.getMinWidth()}),0);t.forEach((t=>{e+=t.margins}));const i=this.getPrevLayerRangeMax();return this.latestRange={min:e,max:i}}getPrevLayerRangeMax(){const t=this.getPrevLayer();return t?t.getRange().max-1:0}}class B{constructor(t){this.onLayerApplied=t,this.layers=[],this.currentWidth=null,this.currentHeight=null,this.minWidth=null,this.sequentialLayer=null}initialize(t,e,i){this.elementContentWidthSubscription=r(e,(e=>{this.currentWidth===e.width&&this.currentHeight===e.height||(null===this.currentWidth&&t.subscribe((t=>{t.addedItems.forEach(this.addBlock.bind(this)),t.removedItems.forEach(this.removeBlock.bind(this))})),this.currentWidth=e.width,this.currentHeight=e.height,i&&i(e))}))}dispose(){this.elementContentWidthSubscription&&l(this.elementContentWidthSubscription)}getLastLayer(){return this.layers[this.layers.length-1]||null}defaultLayer(t,e){this.layers.push(new R("default",t,this,e))}simultaneousTransitionLayer(t,e,i){this.layers.push(new T(t,e,this.getLastLayer(),i))}sequentialTransitionLayer(t,e,i){const s=this.sequentialLayer=new S(t,e,this.getLastLayer(),i);this.layers.push(s)}addBlock(t){this.layers.forEach((function(e){e.addBlock(t)}))}removeBlock(t){this.layers.forEach((function(e){e.removeBlock(t)}))}updateLayout(){const t=this.findLayersForWidth(this.currentWidth);t.length>0&&(this.applyLayer(t[0]),this.minWidth=Math.min(...this.layers.filter((t=>t.latestRange)).map((t=>t.latestRange.min))))}resetToDefault(){this.applyLayer(this.layers[0],!0)}applyLayer(t,e=!1){e?t.activateAndReset(this.currentWidth):t.activate(this.currentWidth),this.onLayerApplied&&this.onLayerApplied(t)}findLayersForWidth(t){return this.layers.filter((function(e){return e.isValidWidth(t)}))}forceUpdate(){null!==this.currentWidth&&this.updateLayout()}getMinWidth(){return this.minWidth?this.minWidth:this.sequentialLayer?this.sequentialLayer.getActualBlocks().map((t=>t.getMinWidth())).reduce(((t,e)=>t+e)):null}}class N{constructor(t){this.toolbar=t,this.state="",this._isWidthCalculationLocked=!1,this.index=-1}getWidth(){return this.isVisible()?J(this.getElement(),!1,k):0}getNoTextWidth(){return this.getWidth()}isVisible(){return!0}get isWidthCalculationLocked(){return this._isWidthCalculationLocked}updateState(t){this.state=t,this.updateStateCore(t)}updateStateCore(t){}lockWidthCalculation(){this._isWidthCalculationLocked=!0}unlockWidthCalculation(){this._isWidthCalculationLocked=!1}getGroupElement(){return null}reset(){}}class V extends N{constructor(t,e){super(t),this.item=e}getElement(){return this.item.getElement()}updateStateCore(t){this.item.isDisplayed.update(t.indexOf("has-"+this.getName())>-1)}updateVisible(t){t||this.lockWidthCalculation(),this.item.updateVisible(t),t&&this.unlockWidthCalculation()}reset(){const t=this.getElement();t&&t.classList.remove(g.ToolbarHiddenItem)}}class A extends V{constructor(t,e){super(t,e)}getNoTextWidth(){return this.item.isDisplayed.value?function(e){let i=J(e,!1,k);if(0===i)return i;if(e){const s=e.querySelector(y);if(s){i-=K(s);let e=s;for(;e=e.nextElementSibling;)Q(e)||"absolute"===t.DomUtils.getCurrentStyle(e).position||(i-=J(e))}}return i}(this.getElement()):0}getName(){return"item"}isVisible(){return this.item.isDisplayed.value}updateStateCore(t){const e=this.item.toolbar,i=-1===t.indexOf(g.ToolbarHasEllipsis);this.updateVisible(e.minRootItems>0?i||this.index<e.minRootItems:i)}getGroupElement(){return this.item.getGroupElement()}}class j extends V{constructor(t,e){super(t,e)}getName(){return"ellipsis"}updateStateCore(t){super.updateStateCore(t),this.updateVisible(this.item.isDisplayed.value)}reset(){this.updateVisible(!0)}}class P extends A{constructor(t,e){super(t,e),this.itemBlocks=[],this.addItem(e)}addItem(t){this.itemBlocks.push(new A(this.toolbar,t))}isVisible(){return this.itemBlocks.reduce((function(t,e){return t&&e.isVisible()}),!0)}getWidth(){return this.itemBlocks.reduce((function(t,e){return t+e.getWidth()}),0)}getNoTextWidth(){return this.itemBlocks.reduce((function(t,e){return t+e.getNoTextWidth()}),0)}updateVisible(t){this.itemBlocks.forEach((function(e){e.updateVisible(t)}))}tryAddItem(t){const e=this.itemBlocks[this.itemBlocks.length-1].item,i=e.groupName===t.groupName&&e.group===t.group&&e.adaptivePriority.value===t.adaptivePriority.value;return i&&this.addItem(t),i}}class q extends N{constructor(t,e){super(t),this.item=e}getName(){return"title"}getWidth(){return J(this.getElement(),!1,k)}getElement(){return this.item.getElement()}}class D{constructor(t,e){this.element=t,this.toolbar=e,this.index=new u(-1),this.isVisible=new u(this.defaultIsVisible()),this.isVisible.subscribe((t=>{this.onIsVisibleChanged(t)}),!0)}defaultIsVisible(){return!0}getElement(){return this.element}updateVisible(t){this.isVisible.update(t)}onIsVisibleChanged(t){const e=this.getElement();e&&(t?this.show(e):this.hide(e))}show(t){t.classList.remove(g.ToolbarHiddenItem)}hide(t){t.classList.add(g.ToolbarHiddenItem)}}class H extends D{constructor(){super(...arguments),this.isDisplayed=new u(!0),this.text=new u(""),this.iconCssClass=new u("")}show(t){t.style.display=""}hide(t){t.style.display="none"}getGroupElement(){return null}}class U extends H{constructor(t,e,i){super(t,e),this.group=i,this.groupName=new u(""),this.adaptivePriority=new u(-1)}onIsVisibleChanged(t){super.onIsVisibleChanged(t),this.group.onItemVisibleChanged()}getElement(){return document.querySelector(X("data-dxtoolbar-item-id",this.id))}getParent(){const t=this.getElement();return t&&t.parentElement?t.parentElement:null}getGroupElement(){return this.group.getElement()}}class _ extends H{constructor(t,e){super(t,e)}defaultIsVisible(){return null}}class G extends D{constructor(t,e){super(t,e),this.items=[]}addItem(t){this.items.push(t)}onItemVisibleChanged(){if(0===this.items.length)return;const t=this.items.some((t=>t.isVisible.value));this.updateVisible(t)}getElement(){if(0===this.items.length)return null;const t=s(this.items[0].getElement(),X(b,this.toolbar.id));return t||this.items[0].getParent()}}class O extends D{constructor(t,e){super(null,t),this.elementSelector=e,this.hasTitle=new u(!1),this.text=new u(""),this.text.subscribe((t=>{this.hasTitle.update(null!=t&&""!==t)}))}getElement(){return document.querySelector(this.elementSelector)}}class z{constructor(t,e){this.element=t,this.id=e,this.items=[],this.itemMap=new Map,this.groupMap=new Map,this.canHideRootItems=!1,this.canCollapseToIcons=!1,this.minRootItems=0}}class ${constructor(){this.isLoading=!0,this.isLayoutCalculated=!1,this.toolbar=null,this.layoutModel=null,this.minWidth=null,this.reinitRequested=!1}init(e,n,r){this.isLayoutCalculated=!1;const l=r,a=e.dataset.dxtoolbarId,c=X("data-dxtoolbar-title-id",a),h=X("data-dxtoolbar-ellipsis-id",a),u=document.querySelector(h),d=this.toolbar=new z(e,a),m=d.groupMap;Array.from(n.items).forEach((t=>{const e=document.querySelector(X("data-dxtoolbar-item-id",t.id));e&&e.classList.remove(g.ToolbarHiddenItem);const i=s(e,X(b,a));let o=null;m.has(i)&&(o=m.get(i)),o||(o=new G(i,d),m.set(i,o));const n=new U(e,d,o);n.text.update(t.text),n.groupName.update(t.groupName),n.adaptivePriority.update(t.adaptivePriority),n.iconCssClass.update(t.iconCssClass),n.isDisplayed.update(t.visible),n.index.update(t.index),n.id=t.id,d.itemMap.set(n.id,n),d.items.some((t=>t.index.value===n.index.value))||(o.addItem(n),d.items.push(n))})),d.canHideRootItems=n.canHideRootItems,d.canCollapseToIcons=n.canCollapseToIcons,d.minRootItems=n.minRootItems,d.itemSize=n.itemSize,d.renderMode=n.renderMode,d.itemSpacing=n.itemSpacingMode;const p=new v([]),y=new O(d,c);y.text.update(n.title),d.title=y,p.add(new q(d,y));const k=Array.from(m.values()),C=k.some((t=>t))?k.map((t=>t.items)).reduce(((t,e)=>t.concat(e))):[];p.addRange(this.getItemsBlocks(d,C));const x=new _(u,d);x.id=n.adaptiveMenuModel.id,p.add(new j(d,x)),d.ellipsisViewModel=x;const I=w.contextItem(p),L=this.layoutModel=new B((s=>{if(!this.isLayoutCalculated){this.isLayoutCalculated=!0;const t=d.element;o((()=>{const e=t.querySelector(f);this.updateControlStyles(d,Math.ceil(!this.isLoading&&e?e.offsetHeight:t.offsetHeight)),this.isLoading=!1}))}const n=d.element.querySelector(f)||d.element;if(s.stateName.indexOf(g.ToolbarNoItemText)>-1?t.DomUtils.addClassName(n,g.ToolbarNoItemText):t.DomUtils.removeClassName(n,g.ToolbarNoItemText),t.DomUtils.removeClassName(e,g.Loading),i(e))return;const r=d.items.concat(d.ellipsisViewModel).map((t=>({Id:t.id,IsVisible:t.isVisible.value})));l.invokeMethodAsync("OnModelUpdated",Array.from(r)).catch((function(t){i(e)||console.error(t)}))}));L.defaultLayer((function(t){switch(t.getName()){case"item":return w.fullWidthItem;case"title":return w.titleItem}return w.hiddenItem}),(()=>!0)),L.sequentialTransitionLayer(g.ToolbarHasEllipsis,(function(t){switch(t.getName()){case"ellipsis":return w.fullWidthSystemItem;case"item":return I}}),(()=>d.canHideRootItems&&d.minRootItems>0)),L.simultaneousTransitionLayer(g.ToolbarNoItemText,(function(t){switch(t.getName()){case"item":return w.noTextItem;case"ellipsis":return w.hiddenItem}}),(()=>d.canCollapseToIcons)),L.sequentialTransitionLayer(d.canCollapseToIcons?`${g.ToolbarNoItemText} ${g.ToolbarHasEllipsis}`:g.ToolbarHasEllipsis,(function(t){switch(t.getName()){case"item":return I;case"ellipsis":return w.fullWidthSystemItem}}),(()=>d.canHideRootItems)),L.initialize(p,d.element.querySelector(f)||d.element,(t=>{var e;this.height!==t.height&&(this.isLayoutCalculated=!1,this.height=t.height),null===(e=this.layoutModel)||void 0===e||e.updateLayout(),this.checkUpdateMinWidth(d)}))}reinit(t,e){this.reinitRequested||(this.reinitRequested=!0,n((()=>{this.resetToDefault(),this.disposeModel(),n((()=>{this.reinitRequested=!1,this.init(t.mainElement,t,e)}))})))}resetToDefault(){var t;null===(t=this.layoutModel)||void 0===t||t.resetToDefault()}update(t,e){var i,s;if(!this.toolbar)return;let o=!1,n=!1;if(this.toolbar.canHideRootItems!==t.canHideRootItems&&(this.toolbar.canHideRootItems=t.canHideRootItems,o=!0),this.toolbar.canCollapseToIcons!==t.canCollapseToIcons&&(this.toolbar.canCollapseToIcons=t.canCollapseToIcons,o=!0),this.toolbar.minRootItems!==t.minRootItems&&(this.toolbar.minRootItems=t.minRootItems,n=!0),this.toolbar.itemSize!==t.itemSize&&(this.toolbar.itemSize=t.itemSize,n=!0),this.toolbar.renderMode!==t.renderMode&&(this.toolbar.renderMode=t.renderMode,n=!0),this.toolbar.itemSpacing!==t.itemSpacingMode&&(this.toolbar.itemSpacing=t.itemSpacingMode,n=!0),null===(i=this.toolbar.title)||void 0===i||i.text.update(t.title),!n){const e=Array.from(t.items).map((t=>t.id)),i=Array.from(this.toolbar.itemMap.values()).map((t=>t.id));n=!((r=e).length===(l=i).length&&r.every(((t,e)=>t===l[e])))}var r,l;n?this.reinit(t,e):(Array.from(t.items).forEach((t=>{if(!this.toolbar)return;const e=this.toolbar.itemMap.get(t.id);e&&(e.text.update(t.text),e.groupName.update(t.groupName),e.adaptivePriority.update(t.adaptivePriority),e.index.update(t.index),e.iconCssClass.update(t.iconCssClass),e.isDisplayed.update(t.visible))})),o&&(null===(s=this.layoutModel)||void 0===s||s.forceUpdate()))}disposeModel(){var t;null===(t=this.layoutModel)||void 0===t||t.dispose()}dispose(){this.disposeModel()}getItemsBlocks(t,e){return e.reduce(((e,i)=>e.group&&e.group.tryAddItem(i)?e:i.groupName.value?{group:e.blocks[e.blocks.length]=new P(t,i),blocks:e.blocks}:{group:null,blocks:e.blocks.concat([new A(t,i)])}),{blocks:[],group:null}).blocks.sort((function(t,e){return t.item.adaptivePriority.value-e.item.adaptivePriority.value})).map((function(t,e){return t.index=e,t}))}updateControlStyles(t,e){t.element.style.height=e+"px"}checkUpdateMinWidth(t){var e;const i=null===(e=this.layoutModel)||void 0===e?void 0:e.getMinWidth();i&&this.minWidth!==i&&(this.minWidth=i,t.element.style.minWidth=i+"px")}}function F(t){return[t.item.text,t.item.isDisplayed,t.item.iconCssClass]}function J(e,i=!1,s=!1){if(!e)return 0;let o=Math.ceil(a(e)+(i?0:K(e)));if(e.parentElement&&!s){if(e.parentElement.lastElementChild===e){const i=t.DomUtils.getCurrentStyle(e.parentElement);o+=t.DomUtils.pxToInt(i.marginRight)}if(e.parentElement.firstElementChild===e){const i=t.DomUtils.getCurrentStyle(e.parentElement);o+=t.DomUtils.pxToInt(i.marginLeft)}}return o}function K(t){return c(t)}function Q(e){return t.DomUtils.hasClassName(e,"popout")}function X(t,e){return`[${t}=${e}]`}const Y=new Map;function Z(t,i,s){if(!(t=e(t)))return Promise.reject("failed");let o=Y.get(t);o?o.update(i,s):(o=new $,o.init(t,i,s),Y.set(t,o));const n=t.querySelector(f)||t;return d(n),Promise.resolve("ok")}function tt(t){return s(t=e(t),Y),Array.from(Y.keys()).forEach((t=>{i(t)&&s(t,Y)})),Promise.resolve("ok");function s(t,e){if(!t)return;const i=t.querySelector(f);i&&h(i);const s=e.get(t);null==s||s.dispose(),e.delete(t)}}customElements.define("dxbl-toolbar-menu-item",class extends p{constructor(){super(...arguments),this.boundOnButtonClick=this.onButtonClick.bind(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.boundOnButtonClick)}disconnectedCallback(){this.removeEventListener("click",this.boundOnButtonClick),super.disconnectedCallback()}canHandlePointerDown(t){return m.containsInComposedPath(t,this)}onButtonClick(t){if(null===this.getAttribute("submit-form-on-click"))return;const e=this.getAttribute("data-dxtoolbar-container-id");if(e){const t=document.querySelector(`[data-dxtoolbar-id=${e}]`);if(t){const e=document.createElement("input");e.type="submit",e.hidden=!0,t.appendChild(e),e.click(),t.removeChild(e)}}}});const et={init:Z,dispose:tt};export{et as default,tt as dispose,Z as init};