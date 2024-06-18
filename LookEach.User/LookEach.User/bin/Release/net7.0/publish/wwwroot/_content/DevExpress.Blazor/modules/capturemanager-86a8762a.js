import{E as t}from"./eventhelper-8570b930.js";import{L as e}from"./logicaltreehelper-bc8e12d3.js";import{L as n}from"./layouthelper-dc0e1370.js";class r{constructor(){this.lockCount=0}get IsLocked(){return this.lockCount>0}lock(){this.lockCount+=1}unlock(){this.IsLocked&&(this.lockCount-=1)}reset(){this.lockCount=0}lockOnce(){this.IsLocked||this.lock()}doLockedAction(t){this.lock();try{t()}finally{this.unlock()}}doIfNotLocked(t){this.IsLocked||t()}doLockedActionIfNotLocked(t){this.doIfNotLocked((()=>this.doLockedAction(t)))}}class o{static isFocused(t){return t===document.activeElement}static isFocusWithin(t,r=!1){return r?e.containsElement(t,document.activeElement):n.containsElement(t,document.activeElement)}static restoreFocus(t){t.focus({preventScroll:!1}),this.restoreFocusAction.execute((()=>{o.isFocused(t)||t.focus({preventScroll:!1})}))}static cancelRestoreFocus(){this.restoreFocusAction.cancel()}static unfocus(){o.cancelRestoreFocus();const t=document.activeElement;t&&t.blur()}}o.restoreFocusAction=new class{constructor(){this.action=null,this.handle=null}execute(t){this.cancel(),this.action=t,this.handle=setTimeout((()=>{var t;null===(t=this.action)||void 0===t||t.call(this),this.handle=null,this.action=null}),0)}cancel(){this.handle&&(clearTimeout(this.handle),this.action=null,this.handle=null)}};class c{constructor(){this.handled=!1}}class i extends c{constructor(){super(...arguments),this.nextInteractionHandled=!1}}class s{constructor(){this._capturedElement=null,this._captureStack=[],this._globalLocker=new r,this.pointerDownHandler=this.handlePointerDown.bind(this),this.mouseClickHandler=this.handleClick.bind(this),this.pointerUpHandler=this.handlePointerUp.bind(this),this.keyDownHandler=this.handleKeyDown.bind(this),this.preventNextPointerInteraction=!1,this.restoreFocusOnPreventNextPointerInteractionElement=null,document.addEventListener("pointerdown",this.pointerDownHandler,{capture:!0}),document.addEventListener("click",this.mouseClickHandler,{capture:!0}),document.addEventListener("pointerup",this.pointerUpHandler,{capture:!0}),document.addEventListener("keydown",this.keyDownHandler,{capture:!0})}get capturedInteractionLocker(){const t=this.capturedElement;return null===t?this._globalLocker:t.locker}get hasCapture(){return!!this._capturedElement}get capturedElement(){return this._capturedElement}get captureStackCount(){return this._captureStack.length}capture(t,e=!0){if(t===this.capturedElement)return!0;if(this.capturedElement&&!this.removeCapture(this.capturedElement,t))return!1;return this.createCapture(this._capturedElement,t,e)}releaseCapture(t){var e;if(this.capturedElement!==t)return this._captureStack=this._captureStack.filter((e=>e!==t)),!0;const n=null!==(e=this._captureStack.pop())&&void 0!==e?e:null;return this.capture(n,!1)}removeCapture(t,e){return t.lostCapture(),!0}createCapture(t,e,n){return e?(t&&n&&this._captureStack.push(t),this._capturedElement=e,e.gotCapture(),!0):(this._capturedElement=null,!0)}handlePointerUp(e){if(!this.capturedInteractionLocker.IsLocked)return this.preventNextPointerInteraction?(this.restoreFocusOnPreventNextPointerInteractionElement=document.activeElement,void t.markHandled(e,!1)):void 0;t.markHandled(e,!1)}handleClick(e){if(this.capturedInteractionLocker.IsLocked)t.markHandled(e,!1);else if(this.preventNextPointerInteraction){if(this.preventNextPointerInteraction=!1,t.markHandled(e,!1),this.restoreFocusOnPreventNextPointerInteractionElement&&o.isFocused(this.restoreFocusOnPreventNextPointerInteractionElement))return;o.unfocus()}}async handlePointerDown(e){const n=this.capturedInteractionLocker;if(!n.IsLocked&&(this.preventNextPointerInteraction=!1,this.capturedElement))try{n.lock();const r=new i;await this.capturedElement.processCapturedPointerDownAsync(e,r),this.preventNextPointerInteraction=r.handled&&r.nextInteractionHandled,this.preventNextPointerInteraction&&t.markHandled(e,!1)}finally{n.unlock()}}async handleKeyDown(t){var e;if(!this.hasCapture)return;const n=this.capturedInteractionLocker;if(!n.IsLocked)try{n.lock();const r=new c;await(null===(e=this.capturedElement)||void 0===e?void 0:e.processCapturedKeyDownAsync(t,r))}finally{n.unlock()}}hasCapturedElementForTests(){return this.hasCapture}getCapturedElementForTests(){return this.capturedElement}}function a(){return l}const l=new s,u=Object.freeze({__proto__:null,CaptureInteractionOptions:c,PointerCaptureInteractionOptions:i,CaptureManager:s,getCaptureManagerSingletonForTests:a,captureManagerSingleton:l,default:{CaptureManager:s,captureManagerSingleton:l,getCaptureManagerSingletonForTests:a}});export{o as F,r as L,u as a,l as c};