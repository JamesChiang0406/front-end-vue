(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45e6b48e"],{1368:function(t,e,a){},"5df4":function(t,e,a){"use strict";a("1368")},d946:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container d-flex flex-column align-items-center py-5"},[t._m(0),a("form",{staticClass:"signin-area",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[t._m(1),a("div",{staticClass:"form-label-group mb-2"},[a("label",{attrs:{for:"account"}},[t._v("帳號")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.account,expression:"account"}],staticClass:"form-control mt-3",attrs:{type:"text",name:"account",id:"account",required:""},domProps:{value:t.account},on:{input:function(e){e.target.composing||(t.account=e.target.value)}}})]),a("div",{staticClass:"form-label-group mb-3"},[a("label",{attrs:{for:"password"}},[t._v("密碼")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control mt-3",attrs:{type:"password",name:"password",id:"password",required:"",autocomplete:"off"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),a("div",{staticClass:"btn-wrapper"},[a("button",{staticClass:"btn my-2 submit-btn",attrs:{type:"submit",disabled:t.isProcessing}},[t._v(" 登入 ")]),a("div",{staticClass:"buttons mt-3"},[a("router-link",{attrs:{to:"/signin"}},[t._v(" 前台登入")])],1)])])])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("img",{attrs:{src:a("808a"),alt:"icon"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"my-2 title"},[a("p",[t._v("後台登入")])])}],n=a("1da1"),o=(a("96cf"),a("49c2")),i=a("2fa3"),c={data:function(){return{account:"",password:"",isProcessing:!1}},methods:{handleSubmit:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,t.account&&t.password){e.next=3;break}return e.abrupt("return",i["a"].fire({icon:"error",title:"帳號或密碼未輸入，請重新確認！"}));case 3:return t.isProcessing=!0,e.next=6,o["a"].adminSignIn({account:t.account,password:t.password});case 6:if(a=e.sent,s=a.data,"success"===s.status){e.next=10;break}throw new Error(s.message);case 10:localStorage.setItem("token",s.token),t.$store.commit("setCurrentUser",s.user),t.$router.push({name:"admin-main"}),e.next=20;break;case 15:e.prev=15,e.t0=e["catch"](0),t.password="",t.isProcessing=!1,i["a"].fire({icon:"error",title:"無法登入，請確認帳號密碼是否有誤！"});case 20:case"end":return e.stop()}}),e,null,[[0,15]])})))()}}},u=c,l=(a("5df4"),a("2877")),m=Object(l["a"])(u,s,r,!1,null,"106b959b",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-45e6b48e.ce638fdd.js.map