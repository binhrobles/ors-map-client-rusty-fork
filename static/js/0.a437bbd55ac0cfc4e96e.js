webpackJsonp([0],{dDIy:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={props:{parameters:{required:!0},title:{required:!0,type:String},subPropsIndex:{required:!1},isModal:{required:!1,type:Boolean}},data:function(){return{active:!0}},created:function(){this.active=!0},methods:{fieldUpdated:function(t,e){this.$emit("fieldUpdated",{index:t,value:e})},onModalConfirm:function(){this.$emit("modalConfirmed")}},components:{"form-fields":function(){return new Promise(function(t){t()}).then(i.bind(null,"C23y"))}}},o=i("XyMi"),r=Object(o.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{staticClass:"props-modal",attrs:{"max-width":"600",persistent:!0},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("box",{attrs:{resizable:!0,background:"white"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("div",{attrs:{slot:"header"},slot:"header"},[i("h3",[t._v(t._s(t.title))])]),t._v(" "),i("div",{attrs:{slot:"content"},slot:"content"},[i("form-fields",{attrs:{parameters:t.parameters[t.subPropsIndex].props,"is-modal":t.isModal},on:{fieldUpdated:t.fieldUpdated}})],1),t._v(" "),i("div",{staticClass:"text-right",attrs:{slot:"footer"},slot:"footer"},[i("v-spacer"),t._v(" "),i("v-btn",{attrs:{color:"primary",flat:""},nativeOn:{click:function(e){return t.onModalConfirm(e)}}},[t._v(t._s(t.$t("global.ok")))])],1)])],1)},[],!1,null,null,null);e.default=r.exports}});
//# sourceMappingURL=0.a437bbd55ac0cfc4e96e.js.map