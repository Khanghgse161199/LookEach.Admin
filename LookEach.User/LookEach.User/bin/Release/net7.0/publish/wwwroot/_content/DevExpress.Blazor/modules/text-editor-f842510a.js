import{_ as e}from"./_tslib-6e8ca86b.js";import{S as t}from"./single-slot-element-base-d44a6577.js";import{C as i}from"./css-classes-f3f8ed66.js";import{C as n}from"./custom-events-helper-18f7786a.js";import{t as s}from"./constants-2d0e11b4.js";import{E as l}from"./eventhelper-8570b930.js";import{e as o}from"./property-d3853089.js";class d extends CustomEvent{constructor(e){super(d.eventName,{detail:new c(e),bubbles:!0,composed:!0,cancelable:!0})}}d.eventName=s+".focusin";class a extends CustomEvent{constructor(e,t){super(a.eventName,{detail:new p(e,t),bubbles:!0,composed:!0,cancelable:!0})}}a.eventName=s+".focusout";class r extends CustomEvent{constructor(e){super(r.eventName,{detail:e,bubbles:!0,composed:!0,cancelable:!0})}}r.eventName=s+".keydown";class u extends CustomEvent{constructor(e){super(u.eventName,{detail:e,bubbles:!0,composed:!0,cancelable:!0})}}u.eventName=s+".beforeinput";class h extends CustomEvent{constructor(e){super(h.eventName,{detail:e,bubbles:!0,composed:!0,cancelable:!0})}}h.eventName=s+".compositionEnd";class c{constructor(e){this.NeedSelection=e}}class p{constructor(e,t){this.Text=e,this.TabKey=t}}class m{constructor(e){this.Text=e}}class x extends m{constructor(e,t){super(e),this.Version=t}}class f extends CustomEvent{constructor(e,t){super(f.eventName,{detail:new x(e,t),bubbles:!0,composed:!0,cancelable:!0})}}f.eventName=s+".textinput";class y extends CustomEvent{constructor(e){super(y.eventName,{detail:new m(e),bubbles:!0,composed:!0,cancelable:!0})}}y.eventName=s+".textchange",n.register(f.eventName,(e=>e.detail)),n.register(y.eventName,(e=>e.detail)),n.register(d.eventName,(e=>e.detail)),n.register(a.eventName,(e=>e.detail)),n.register(r.eventName,(e=>{const t=e.detail;return{Key:t.key,Code:t.code,CtrlKey:t.ctrlKey,AltKey:t.altKey,ShiftKey:t.shiftKey,MetaKey:t.metaKey}})),n.register(u.eventName,(e=>{const t=e.detail;return{InputType:t.inputType,Text:t.data}})),n.register(h.eventName,(e=>({Text:e.detail.data})));class v{get hasAction(){return!!this.handle}constructor(e){this.action=null,this.handle=null,this.timeout=0,this.timeout=e}execute(e){this.cancel(),this.action=e,this.handle=setTimeout((()=>{var e;null===(e=this.action)||void 0===e||e.call(this),this.handle=null,this.action=null}),this.timeout)}forceExecute(){if(!this.hasAction)return;const e=this.action;this.cancel(),e&&e()}cancel(){this.hasAction&&this.handle&&(clearTimeout(this.handle),this.action=null,this.handle=null)}}var T,b,E;!function(e){e.inputText="field-text",e.inputTextVersion="field-text-version",e.bindValueMode="bind-value-mode",e.fieldInputDelay="field-input-delay"}(T||(T={})),function(e){e.OnLostFocus="OnLostFocus",e.OnInput="OnInput",e.OnDelayedInput="OnDelayedInput"}(b||(b={})),function(e){e.WithoutTemplate="WithoutTemplate",e.WithTemplate="WithTemplate",e.WithEditableTemplate="WithEditableTemplate"}(E||(E={}));const I=500;class V{}V.TextEdit=i.Prefix+"-text-edit",V.ClearButton=i.Prefix+"-edit-btn-clear",V.EditBoxTemplate=i.Prefix+"-text-edit-template",V.TextEditInput=i.Prefix+"-text-edit-input";class g extends t{constructor(){super(...arguments),this.fieldText="",this.fieldTextVersion=-1,this.fieldInputDelay=500,this.bindValueMode=b.OnLostFocus,this.boundOnInputInputHandler=this.onTextInput.bind(this),this.boundOnInputChangeHandler=this.onTextChange.bind(this),this.boundOnInputKeyDownHandler=this.onInputKeyDown.bind(this),this.boundOnPointerDownHandler=this.onPointerDown.bind(this),this.inputDelayDeferredAction=new v(500),this._fieldTextHistory={},this._fieldInitialized=!1,this._fieldTextVersion=-1}get inputSelectionStart(){var e,t;return null!==(t=null===(e=this.fieldElement)||void 0===e?void 0:e.selectionStart)&&void 0!==t?t:0}get inputSelectionEnd(){var e,t;return null!==(t=null===(e=this.fieldElement)||void 0===e?void 0:e.selectionEnd)&&void 0!==t?t:0}get selectionLength(){return Math.abs(this.inputSelectionEnd-this.inputSelectionStart)}get enabled(){var e,t;return null!==(t=!(null===(e=this.fieldElement)||void 0===e?void 0:e.disabled))&&void 0!==t&&t}get allowInput(){return this.enabled&&!!this.fieldElement&&!this.fieldElement.readOnly}static isClearButtonElement(e){var t;return!!e&&(null===(t=e.classList)||void 0===t?void 0:t.contains(V.ClearButton))}static isEditBoxTemplateElement(e){var t;return!!e&&(null===(t=e.classList)||void 0===t?void 0:t.contains(V.EditBoxTemplate))}get fieldElementValue(){var e,t;return null!==(t=null===(e=this.fieldElement)||void 0===e?void 0:e.value)&&void 0!==t?t:""}set fieldElementValue(e){this.fieldElement&&(this.fieldElement.value=e)}get rendered(){return!!this.fieldElement}get focused(){return document.activeElement===this.editBoxElement}get editBoxElement(){var e;return null!==(e=this.fieldElement)&&void 0!==e?e:this.editBoxTemplateElement}get editBoxTemplateElement(){return this.querySelector(`.${V.EditBoxTemplate}`)}raiseFieldText(){let e;const t=this.fieldElementValue;this.shouldProcessFieldTextVersion?(e=++this._fieldTextVersion,this._fieldTextHistory[e]=t):e=this._fieldTextVersion,this.dispatchEvent(new f(t,e))}raiseFieldChange(){this.dispatchEvent(new y(this.fieldElementValue))}applyTextProperty(){this.shouldProcessFieldTextVersion?this.applyTextPropertyByVersion():(this.applyTextPropertyCore(),this._fieldTextVersion=this.fieldTextVersion)}applyTextPropertyByVersion(){const e=this.fieldTextVersion,t=this.fieldText;let i=this._fieldTextVersion;e>i&&(i=e),-1===i||t!==this.fieldElementValue&&this._fieldTextHistory[e]!==t?(this.applyTextPropertyCore(),this._fieldTextVersion=i+1):delete this._fieldTextHistory[e]}applyTextPropertyCore(){this.fieldElementValue=this.fieldText}onBindValueModeChanged(e){e===b.OnLostFocus?(this._fieldTextHistory={},this._fieldTextVersion++):this.bindValueMode===b.OnLostFocus&&(this._fieldTextHistory={},this._fieldTextVersion=-1)}onInputDelayChanged(){this.inputDelayDeferredAction=new v(this.fieldInputDelay)}get shouldProcessFieldTextVersion(){return this.bindValueMode===b.OnInput||this.bindValueMode===b.OnDelayedInput}get shouldForceInputOnEnter(){return!0}onTextInput(e){if(this.shouldRaiseFieldTextEvents)switch(this.bindValueMode){case b.OnInput:this.raiseFieldText();break;case b.OnDelayedInput:this.inputDelayDeferredAction.execute((()=>this.raiseFieldText()))}}onTextChange(e){this.shouldRaiseFieldTextEvents&&(this.bindValueMode===b.OnLostFocus?this.raiseFieldChange():this.bindValueMode===b.OnDelayedInput&&this.tryForceDelayedInput())}onFieldReady(e,t){e.addEventListener("input",this.boundOnInputInputHandler),e.addEventListener("change",this.boundOnInputChangeHandler),e.addEventListener("keydown",this.boundOnInputKeyDownHandler),t&&this.applyTextProperty()}onTemplateWithoutInputReady(e){e.addEventListener("keydown",this.boundOnInputKeyDownHandler)}onPointerDown(e){var t,i;l.containsInComposedPath(e,g.isClearButtonElement)&&(e.preventDefault(),this.focused||null===(t=this.editBoxElement)||void 0===t||t.focus()),l.containsInComposedPath(e,g.isEditBoxTemplateElement)&&!this.focused&&(null===(i=this.editBoxElement)||void 0===i||i.focus())}onInputKeyDown(e){this.processKeyDown(e)}processKeyDown(e){return"Enter"===e.key&&this.shouldForceInputOnEnter&&this.tryForceDelayedInput(),!1}tryForceDelayedInput(){this.shouldRaiseFieldTextEvents&&this.bindValueMode===b.OnDelayedInput&&this.inputDelayDeferredAction.forceExecute()}contentChanged(){this.fieldElement=this.getFieldElement(),this.fieldElement?(this.onFieldReady(this.fieldElement,!this._fieldInitialized),this._fieldInitialized=!0):this.editBoxTemplateElement&&this.onTemplateWithoutInputReady(this.editBoxTemplateElement),this.addEventListener("pointerdown",this.boundOnPointerDownHandler)}get shouldRaiseFieldTextEvents(){return!0}get readyOnConnectedCallback(){return!1}updated(e){this.rendered&&e.has("bindValueMode")&&this.onBindValueModeChanged(e.get("bindValueMode")),this.rendered&&(e.has("fieldText")||e.has("fieldTextVersion"))&&this.applyTextProperty(),e.has("fieldInputDelay")&&this.onInputDelayChanged(),super.updated(e)}}e([o({type:String,attribute:T.inputText})],g.prototype,"fieldText",void 0),e([o({type:Number,attribute:T.inputTextVersion})],g.prototype,"fieldTextVersion",void 0),e([o({type:Number,attribute:T.fieldInputDelay})],g.prototype,"fieldInputDelay",void 0),e([o({type:b,attribute:T.bindValueMode})],g.prototype,"bindValueMode",void 0);export{b as B,h as C,T as D,p as F,r as I,V as T,u as a,g as b,d as c,a as d,v as e,I as f};