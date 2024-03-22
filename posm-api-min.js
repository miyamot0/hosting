!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).POSMObject={})}(this,(function(e){"use strict";var t,n,i,r,s;function o(e){let t=0;for(let n=0;n<e.length;n++)t+=e[n];return e.reduce(((e,t)=>e+t),0)}function a(e,t,n){const i=[];for(let r=t;r<=n;r++)i.push(e[r]);return i}function l(e){const t=Array(e.length).fill(0).map(((t,n)=>o(a(e,0,n)))),n=Array(e.length).fill(0).map(((t,n)=>o(a(e,n,e.length-1))));return Array(e.length).fill(0).map(((e,i)=>Math.min(t[i],n[i])))}function d(e){if(0===e.length)throw new Error("Array is empty");let t=e[0],n=0;return e.forEach(((e,i)=>{e>t&&(n=i,t=e)})),n}function c(e){const t=function(e){return Math.max(...e)}(e);return e.map((e=>e/t))}function u(e,t){e.responses.push({Price:e.prediction,Quantity:t/e.prediction,Revenue:t})}function h(e,t){return e>=t.max_expend}function m(e,t){t.max_expend_price=t.prediction,t.max_expend=e,t.max_q=e/t.prediction}function _(e,t){switch(e){case i.BelowIndex:return t.beliefs.slice().map(((e,n)=>{if(!t.index_max)throw new Error("index_max is undefined!");return n<=t.index_max?e*t.beta:e}));case i.AboveIndex:return t.beliefs.slice().map(((e,n)=>{if(!t.index_max)throw new Error("index_max is undefined!");return n<=t.index_max?e:e*t.beta}));case i.AtIndex:return t.beliefs}}function p(e,t){if(!t.index_max)throw new Error("index_max is undefined, algorithm needs initialization!");let r=t.beliefs.slice();const s=function(e){return e.prediction>e.max_expend_price?n.PriceIncreased:e.prediction==e.max_expend_price?n.PriceIdentical:n.PriceDecreased}(t),o=h(e,t),a=t.responses.filter((e=>e.Revenue>0));s===n.PriceIncreased?o?(r=_(i.BelowIndex,t),t.notes="Inelastic Revenue Function"):(r=_(i.AboveIndex,t),t.notes="Elastic Revenue Function"):s===n.PriceDecreased?o||a.length<t.min_nonzero_consumption_points?(r=_(i.AboveIndex,t),t.notes="Elastic Revenue Function (A)"):(r=_(i.BelowIndex,t),t.notes="Inelastic Revenue Function (B)"):s===n.PriceIdentical&&(o?(r=_(i.AboveIndex,t),t.notes="Retread PMAX: but prev was underestimate"):(r=_(i.BelowIndex,t),t.notes="Repeat PMAX: different expend")),t.last_regret=t.max_expend-e,t.last_p=t.prediction,t.last_spend=e,t.last_q=e/t.prediction,o&&m(e,t),t.beliefs=c(r),u(t,e),t.get_prediction(),t.increment_turn()}!function(e){e[e.NonconsumptionFound=0]="NonconsumptionFound",e[e.ConsumptionFoundNonInitial=1]="ConsumptionFoundNonInitial",e[e.ConsumptionFoundInitial=2]="ConsumptionFoundInitial"}(t||(t={})),function(e){e[e.PriceIncreased=0]="PriceIncreased",e[e.PriceIdentical=1]="PriceIdentical",e[e.PriceDecreased=2]="PriceDecreased"}(n||(n={})),function(e){e[e.BelowIndex=0]="BelowIndex",e[e.AboveIndex=1]="AboveIndex",e[e.AtIndex=2]="AtIndex"}(i||(i={})),function(e){e[e.Visual=0]="Visual"}(r||(r={})),function(e){e.None="None",e.MaximumIteration="MaximumIteration",e.RegretMin="RegretMin"}(s||(s={}));class x{constructor(){this.beta=.5,this.turn=1,this.n_levels=0,this.beliefs=[],this.levels=[],this.last_regret=void 0,this.prediction=-1,this.index_max=void 0,this.notes=""}}const f="custom-question-container";const b=function(e,t){Object.assign(t.style,e)};class v{constructor({id:e,variant:t,text:n,onclick:i}){this._element=document.createElement("button"),this._id=e,this._variant=t,this._text=n,this._onclick=i}get_classes_for_variant(){if("button"===this._variant)return["bg-green-500","text-white","rounded","px-2","py-1","w-[60px]","text-center","text-nowrap","border","border-green-600"];throw new Error("Invalid variant for ButtonElement.")}get_styles_for_variant(){if("button"===this._variant)return{width:"60px",display:"flex",alignItems:"center",justifyContent:"center",gap:"0.5rem",cursor:"pointer"};throw new Error("Invalid variant for ButtonElement.")}build(){return this._id&&this._element.setAttribute("id",this._id),b(this.get_styles_for_variant(),this._element),this._element.textContent=this._text,this._element.addEventListener("click",(()=>this._onclick())),this._element}}class w{constructor({id:e,data:t,variant:n}){this._element=document.createElement("div"),this._id=e,this._data=t,this._variant=n}get_styles_for_variant(){switch(this._variant){case"container":return{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem"};case"question-container":return{width:"100%",display:"flex",flexDirection:"column",gap:"1rem",maxWidth:"600px",backgroundColor:"white",padding:"1rem",borderRadius:"1rem",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)",border:"1px solid #ccc"};case"question-item":return{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:"1rem",width:"100%",userSelect:"none"};case"visual-container":return{backgroundColor:"white",borderRadius:"1rem",display:"flex",flexDirection:"column",width:"100%",maxWidth:"600px",alignItems:"center",margin:"auto",marginTop:"1rem",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)",border:"1px solid #ccc",gap:"1rem"};case"question-row":return{display:"flex",flexDirection:"row",gap:"1rem"};default:throw new Error("Invalid variant for DivElement.")}}build(){return this._id&&this._element.setAttribute("id",this._id),this._data&&this._data.forEach((e=>{this._element.setAttribute(e[0],e[1])})),b(this.get_styles_for_variant(),this._element),this._element}}class g{constructor({id:e,variant:t,type:n,name:i,min:r,max:s,step:o,value:a}){this._element=document.createElement("input"),this._id=e,this._variant=t,this._type=n,this._name=i,this._min=r,this._max=s,this._step=o,this._value=a}get_styles_for_variant(){if("question-input"===this._variant)return{"min-width":"45px",border:"1px solid #ccc","border-radius":"0.25rem",padding:"0.25rem","text-align":"center",appearance:"textfield"};throw new Error("Invalid variant for InputElement.")}build(){var e,t;return b(this.get_styles_for_variant(),this._element),this._element.setAttribute("type","number"),this._element.setAttribute("id",this._id),this._element.setAttribute("name",this._name),this._element.setAttribute("min",this._min.toString()),this._element.setAttribute("max",this._max.toString()),this._element.setAttribute("step",this._step.toString()),this._element.setAttribute("value",null!==(t=null===(e=this._value)||void 0===e?void 0:e.toString())&&void 0!==t?t:""),this._element}}class y{constructor({id:e,text:t,variant:n,label_for:i}){this._element=document.createElement("label"),this._text=t,this._id=e,this._variant=n,this._for=i}get_styles_for_variant(){switch(this._variant){case"question-label":case"question-label-disabled":return{fontSize:"1rem",textAlign:"center",width:"100%"};default:throw new Error("Invalid variant for LabelElement.")}}build(){const e=document.createElement("label");return b(this.get_styles_for_variant(),this._element),e.setAttribute("for",this._for),e.textContent=this._text,e}}function I({posm:e,commodity_string:t,sorting:n=!0}){const i=document.getElementById(f),r=e.prediction;if(!i)throw new Error("A question container must be provided");const o=function(e){switch(e.threshhold){case s.None:return!1;case s.MaximumIteration:return e.turn>e.max_turns;case s.RegretMin:throw new Error("Not implemented")}}(e);if(o)return void function({posm:e}){const t=document.getElementById(f);if(!t)throw new Error("A question container must be provided");if(!e.callback)throw new Error("A callback function must be provided");t.replaceChildren(),e.callback(e)}({posm:e});const a=function({posm:e,price:t,commodity_string:n}){const i=new y({variant:"question-label",text:"How many"+n+" would you purchase at $"+t,label_for:"price-"+t.toString()}).build(),r=new w({variant:"question-item",data:[["data-price",t.toString()]]}).build();r.appendChild(i);const s=new g({id:"price-"+t.toString(),name:"price-"+t.toString(),variant:"question-input",type:"number",min:0,max:100,step:1,value:0}).build(),o=new v({variant:"button",text:"Save",onclick:()=>{const r=parseInt(s.value),a=e.prediction*r;e.iterate(a),new y({variant:"question-label-disabled",text:"How many"+n+" would you purchase at $"+t,label_for:"price-"+t.toString()}).build(),i.style.color="lightgray",s.disabled=!0,s.style.color="lightgray",o.textContent="---",o.disabled=!0,I({posm:e,commodity_string:n})}}).build(),a=new w({variant:"question-row"}).build();return a.appendChild(s),a.appendChild(o),r.appendChild(a),r}({posm:e,price:r,commodity_string:t});n?function(e,t,n){const i=e.children;if(0===i.length)e.appendChild(t);else{const r=Array.from(i).map(((e,t)=>{const n=e.getAttribute("data-price");if(!n)throw new Error("failed to find data attribute for price");return parseFloat(n)}));let s=!1;for(let o=0;o<r.length;o++)if(n<=r[o]){e.insertBefore(t,i[o]),s=!0;break}s||e.appendChild(t)}}(i,a,r):i.appendChild(a)}class A{constructor({id:e,text:t,variant:n}){switch(n){case"h1":this._element=document.createElement("h1");break;case"h2":this._element=document.createElement("h2");break;default:throw new Error("Invalid variant for HeadingElement.")}this._id=e,this._variant=n,this._text=t}get_styles_for_variant(){switch(this._variant){case"h1":return{fontSize:"2rem",textAlign:"center",width:"100%"};case"h2":return{fontSize:"1.5rem",textAlign:"center",width:"100%"}}}build(){return b(this.get_styles_for_variant(),this._element),this._element.textContent=this._text,this._element}}const E=new class extends x{constructor(){super(...arguments),this.last_spend=void 0,this.last_q=void 0,this.last_p=void 0,this.max_expend=0,this.max_expend_price=0,this.max_q=0,this.responses=[],this.threshhold=s.MaximumIteration,this.max_turns=10,this.question_block_reference=void 0,this.min_nonzero_consumption_points=3}reset(){this.beta=.5,this.turn=1,this.n_levels=0,this.beliefs=[],this.levels=[],this.prediction=-1,this.index_max=void 0,this.notes="",this.last_spend=void 0,this.last_q=void 0,this.last_p=void 0,this.last_regret=void 0,this.max_expend=0,this.max_expend_price=0,this.max_q=0,this.responses=[]}set_question_block_reference(e){this.question_block_reference=e}set_callback(e){this.callback=e}set_max_turns(e){this.max_turns=e}set_min_nonzero_consumption_points(e){this.min_nonzero_consumption_points=e}init(e){this.levels=e,this.n_levels=this.levels.length,this.beliefs=Array(this.n_levels).fill(1),this.index_max=d(l(this.beliefs)),this.max_expend_price=this.prediction=this.levels[this.index_max]}iterate(e){var n;switch(n=this,e<=0?t.NonconsumptionFound:void 0!==n.last_q?t.ConsumptionFoundNonInitial:t.ConsumptionFoundInitial){case t.NonconsumptionFound:!function(e,t){if(!t.index_max)throw new Error("index_max is undefined, algorithm needs initialization!");const n=_(i.AboveIndex,t);h(e,t)&&m(e,t),t.beliefs=c(n),u(t,e),t.notes="Zero Consumption Observed",t.get_prediction(),t.increment_turn()}(e,this);break;case t.ConsumptionFoundInitial:!function(e,t){if(!t.index_max)throw new Error("index_max is undefined, algorithm needs initialization!");const n=_(i.AboveIndex,t),r=h(e,t);t.last_regret=t.max_expend-e,t.last_p=t.prediction,t.last_spend=e,t.last_q=e/t.prediction,r&&m(e,t),t.beliefs=c(n),u(t,e),t.notes="First move",t.get_prediction(),t.increment_turn()}(e,this);break;case t.ConsumptionFoundNonInitial:p(e,this)}}get_prediction(){this.index_max=d(l(this.beliefs)),this.prediction=this.levels[this.index_max]}increment_turn(){this.turn+=1}};e.global_posm=E,e.on_doc_load_internal=function(e,t,n,i,r=""){if(!e)throw new Error("A POSM object must be provided");if(!n)throw new Error("A holder id must be provided");if(!t)throw new Error("A price array must be provided");if(!i)throw new Error("A callback function must be provided");if(e.set_question_block_reference(n),!e.question_block_reference)throw new Error("A callback function must be provided");const s=document.getElementById(e.question_block_reference);if(!s)throw new Error("A container must be provided [entry]");const o=new w({variant:"container",id:"custom-container"}).build();s.replaceWith(o);const a=new w({variant:"question-container",id:f}).build(),l=new A({text:"Hypothetical Purchase Task",variant:"h1"}).build();o.appendChild(l),o.appendChild(a),e.reset(),e.set_callback(i),e.init(t),I({posm:e,commodity_string:r})}}));