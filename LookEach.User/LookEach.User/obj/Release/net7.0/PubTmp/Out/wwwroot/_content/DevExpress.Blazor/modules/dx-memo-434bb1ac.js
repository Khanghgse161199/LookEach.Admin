import{_ as e}from"./_tslib-6e8ca86b.js";import{b as t}from"./text-editor-f842510a.js";import{f as s}from"./constants-2d0e11b4.js";import{C as i}from"./css-classes-f3f8ed66.js";import{e as r}from"./custom-element-267f9a21.js";import"./single-slot-element-base-d44a6577.js";import"./data-qa-utils-8be7c726.js";import"./dx-ui-element-7f5e2dd2.js";import"./logicaltreehelper-bc8e12d3.js";import"./layouthelper-dc0e1370.js";import"./rect-00eb3fa4.js";import"./point-e4ec110e.js";import"./constants-58283e53.js";import"./lit-element-base-7a85dca5.js";import"./lit-element-70cf14f4.js";import"./custom-events-helper-18f7786a.js";import"./eventhelper-8570b930.js";import"./property-d3853089.js";class o{}o.Memo=i.Prefix+"-memo-edit";let n=class extends t{constructor(){super(),this.textAreaObserver=new MutationObserver(this.textAreaSizeChanged.bind(this))}connectedOrContentChanged(){super.connectedOrContentChanged();const e=this.getFieldElement();e&&this.textAreaObserver.observe(e,{attributes:!0})}disconnectedCallback(){this.textAreaObserver.disconnect(),super.disconnectedCallback()}textAreaSizeChanged(e,t){const s=e[0].target,i=parseInt(s.style.width);if(!isNaN(i)){const e=this.offsetWidth-this.clientWidth+i;this.offsetWidth!==e&&(this.style.width=e+"px")}const r=parseInt(s.style.height);if(!isNaN(r)){const e=parseInt(getComputedStyle(s).minHeight),t=this.offsetHeight-this.clientHeight+(r>=e?r:e);this.offsetHeight!==t&&(this.style.height=t+"px")}}get shouldForceInputOnEnter(){return!1}getFieldElement(){return this.querySelector("textarea")}};n=e([r(s)],n);const a={loadModule:function(){}};export{n as DxMemoEditor,o as MemoCssClasses,a as default};