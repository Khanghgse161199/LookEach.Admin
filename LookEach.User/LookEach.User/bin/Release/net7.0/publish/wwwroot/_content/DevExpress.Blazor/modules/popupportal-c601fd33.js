import{D as e}from"./data-qa-utils-8be7c726.js";import{s,i as t,y as r}from"./lit-element-70cf14f4.js";import{_ as o}from"./_tslib-6e8ca86b.js";import{f as n}from"./popup-3304c929.js";import{i}from"./logicaltreehelper-bc8e12d3.js";import{e as a}from"./custom-element-267f9a21.js";class c extends s{static get styles(){return t`
            :host {
                display: flex;
            }
        `}connectedCallback(){super.connectedCallback(),e.setLoaded(this)}disconnectedCallback(){super.disconnectedCallback(),e.removeLoaded(this)}render(){return r`<slot></slot>`}}const l="dxbl-popup-portal";let d=class extends n{get popup(){var e;for(const s of null!==(e=this.portable)&&void 0!==e?e:[])if(i(s,(()=>["branchType","reposition","desiredWidth","desiredHeight","minDesiredWidth","minDesiredHeight","closeHierarchyAsync","closeAsync","processCapturedPointerDownAsync","addEventListener","removeEventListener","contains","focus","positionChanged","renderedVisible"])))return s;return null}get popupBase(){var e;for(const s of null!==(e=this.portable)&&void 0!==e?e:[])if(i(s,(()=>["closeHierarchyAsync","closeAsync","processCapturedPointerDownAsync","addEventListener","removeEventListener","contains","focus","positionChanged","renderedVisible"])))return s;return null}};d=o([a(l)],d);export{c as D,l as a};
