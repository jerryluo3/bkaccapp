(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-userlogin-userlogin"],{1148:function(e,t,r){"use strict";var n=r("a691"),i=r("1d80");e.exports="".repeat||function(e){var t=String(i(this)),r="",o=n(e);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(t+=t))1&o&&(r+=t);return r}},"12c0":function(e,t,r){r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("5757");function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}e.exports=o},"319c":function(e,t,r){"use strict";r.r(t);var n=r("dbd7"),i=r("dfe9");for(var o in i)"default"!==o&&function(e){r.d(t,e,(function(){return i[e]}))}(o);r("ce23");var a,u=r("f0c5"),s=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,"2a76fd90",null,!1,n["a"],a);t["default"]=s.exports},"408a":function(e,t,r){var n=r("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=n(e))throw TypeError("Incorrect invocation");return+e}},"6d48":function(e,t,r){"use strict";(function(e){var n=r("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n(r("af82"));var i=n(r("4976")),o=n(r("d7cb")),a={data:function(){return{userInfo:[],words:"获取验证码",mobile:"",ismobile:!1,issend:!1,wait:60}},onLoad:function(){uni.getStorageSync("userInfo")},methods:{onkeyinput:function(t){var r=this,n=t.detail.value;e.log(n),o.default.isPoneAvailable(n)?(r.ismobile=!0,r.mobile=n):(r.ismobile=!1,r.mobile="")},getcode:function(){var e=this,t=e.mobile;if(!e.ismobile)return 60==e.wait&&uni.showToast({title:"请输入正确手机号",duration:1500,icon:"none"}),!1;e.ismobile=!1,e.time(),uni.request({url:i.default.sjApiUrl+"getcode",method:"GET",data:{mobile:t},success:function(t){if(t.data.code>0)return uni.showToast({title:t.data.msg,duration:1500,icon:"none"}),!1;e.ismobile=!1},fail:function(){},complete:function(){}})},time:function(){var e=this,t=e.wait;0==t?(e.ismobile=!0,e.words="获取验证码",e.wait=60):(e.ismobile=!1,e.words="重新发送("+t+")",t--,e.wait=t,setTimeout((function(){e.time()}),1e3))},userreg:function(){uni.redirectTo({url:"/pages/shop/userlogin/userreg"})},formSubmit:function(t){var r=t.detail.value,n=r.mobile,a=r.password;return""==n?(uni.showToast({title:"请输入手机号码",duration:1500,icon:"none"}),!1):o.default.isPoneAvailable(n)?a.length<6?(uni.showToast({title:"密码至少6位",duration:1500,icon:"none"}),!1):(e.log("开始登录"),uni.showLoading({title:"登录中"}),e.log(i.default.sjApiUrl),void uni.request({url:i.default.sjApiUrl+"merchant/userLogin",method:"GET",data:{mobile:n,password:a},success:function(t){uni.hideLoading(),e.log(t);var r=t.data;if(0!=r.code)return uni.showToast({title:r.msg,duration:1500,icon:"none"}),!1;uni.setStorageSync("shopInfo",r.shop),uni.showToast({title:"登录成功",duration:1500,icon:"success"}),setTimeout((function(){var e="/pages/shop/index/index";uni.navigateTo({url:e})}),1e3)},fail:function(){uni.hideLoading()},complete:function(){uni.hideLoading()}})):(uni.showToast({title:"手机号格式不正确",duration:1500,icon:"none"}),!1)},formReset:function(t){e.log("清空数据"),this.chosen=""}}};t.default=a}).call(this,r("5a52")["default"])},"72ff":function(e,t,r){var n=r("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-2a76fd90]{background:#fff;padding:%?30?% 0}.uni-row[data-v-2a76fd90]{height:%?60?%;line-height:%?60?%;padding:%?20?% 0;border-bottom:%?1?% solid #eee}.uni-labelname[data-v-2a76fd90]{width:%?150?%;font-weight:700;font-size:%?30?%}.uni-input[data-v-2a76fd90]{padding:0;line-height:%?60?%;font-size:%?30?%}.btn_submit[data-v-2a76fd90]{background:#00aafa;color:#fff}.safecode[data-v-2a76fd90]{position:relative}.getsafecode[data-v-2a76fd90]{position:absolute;top:0;right:0;border-left:%?1?% solid #eee;padding:0 %?20?%;line-height:%?60?%;font-size:%?28?%;z-index:10}.getcode_use[data-v-2a76fd90]{background:#fdd108;color:#725e03}body.?%PAGE?%[data-v-2a76fd90]{background:#fff}",""]),e.exports=t},af82:function(e,t,r){r("c975"),r("a9e3"),r("4d63"),r("ac1f"),r("25f0"),r("1276"),e.exports={error:"",check:function(e,t){for(var r=0;r<t.length;r++){if(!t[r].checkType)return!0;if(!t[r].name)return!0;if(!t[r].errorMsg)return!0;if(!e[t[r].name])return this.error=t[r].errorMsg,!1;switch(t[r].checkType){case"string":var n=new RegExp("^.{"+t[r].checkRule+"}$");if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"int":n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[r].checkRule+"}$");if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[r].name]))return this.error=t[r].errorMsg,!1;var i=t[r].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[t[r].name]>i[1]||e[t[r].name]<i[0])return this.error=t[r].errorMsg,!1;break;case"betweenD":n=/^-?[1-9][0-9]?$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;i=t[r].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[t[r].name]>i[1]||e[t[r].name]<i[0])return this.error=t[r].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;i=t[r].checkRule.split(",");if(i[0]=Number(i[0]),i[1]=Number(i[1]),e[t[r].name]>i[1]||e[t[r].name]<i[0])return this.error=t[r].errorMsg,!1;break;case"same":if(e[t[r].name]!=t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"notsame":if(e[t[r].name]==t[r].checkRule)return this.error=t[r].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"phoneno":n=/^1[0-9]{10,10}$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"reg":n=new RegExp(t[r].checkRule);if(!n.test(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"in":if(-1==t[r].checkRule.indexOf(e[t[r].name]))return this.error=t[r].errorMsg,!1;break;case"notnull":if(null==e[t[r].name]||e[t[r].name].length<1)return this.error=t[r].errorMsg,!1;break}}return!0},isNumber:function(e){var t=/^-?[1-9][0-9]?.?[0-9]*$/;return t.test(e)}}},b680:function(e,t,r){"use strict";var n=r("23e7"),i=r("a691"),o=r("408a"),a=r("1148"),u=r("d039"),s=1..toFixed,c=Math.floor,f=function(e,t,r){return 0===t?r:t%2===1?f(e,t-1,r*e):f(e*e,t/2,r)},l=function(e){var t=0,r=e;while(r>=4096)t+=12,r/=4096;while(r>=2)t+=1,r/=2;return t},d=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!u((function(){s.call({})}));n({target:"Number",proto:!0,forced:d},{toFixed:function(e){var t,r,n,u,s=o(this),d=i(e),h=[0,0,0,0,0,0],g="",b="0",p=function(e,t){var r=-1,n=t;while(++r<6)n+=e*h[r],h[r]=n%1e7,n=c(n/1e7)},m=function(e){var t=6,r=0;while(--t>=0)r+=h[t],h[t]=c(r/e),r=r%e*1e7},v=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==h[e]){var r=String(h[e]);t=""===t?r:t+a.call("0",7-r.length)+r}return t};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(g="-",s=-s),s>1e-21)if(t=l(s*f(2,69,1))-69,r=t<0?s*f(2,-t,1):s/f(2,t,1),r*=4503599627370496,t=52-t,t>0){p(0,r),n=d;while(n>=7)p(1e7,0),n-=7;p(f(10,n,1),0),n=t-1;while(n>=23)m(1<<23),n-=23;m(1<<n),p(1,1),m(2),b=v()}else p(0,r),p(1<<-t,0),b=v()+a.call("0",d);return d>0?(u=b.length,b=g+(u<=d?"0."+a.call("0",d-u)+b:b.slice(0,u-d)+"."+b.slice(u-d))):b=g+b,b}})},caf1:function(e,t,r){var n=r("72ff");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=r("4f06").default;i("1f464230",n,!0,{sourceMap:!1,shadowMode:!1})},ce23:function(e,t,r){"use strict";var n=r("caf1"),i=r.n(n);i.a},d7cb:function(e,t,r){r("a15b"),r("d81d"),r("b680"),r("d3b7"),r("acd8"),r("e25e"),r("ac1f"),r("25f0"),r("5319"),r("1276");var n=r("12c0");function i(e){if("number"!==typeof e||e<0)return e;var t=parseInt(e/3600);e%=3600;var r=parseInt(e/60);e=parseInt(e%60);var n=e;return[t,r,n].map((function(e){return e=e.toString(),e[1]?e:"0"+e})).join(":")}function o(e){e=new Date(e);var t=1900+e.getYear(),r="0"+(e.getMonth()+1),n="0"+e.getDate(),i="0"+e.getHours(),o="0"+e.getMinutes();e.getSeconds();return t+"-"+r.substring(r.length-2,r.length)+"-"+n.substring(n.length-2,n.length)+" "+i.substring(i.length-2,i.length)+":"+o.substring(o.length-2,o.length)}function a(e,t){for(var r=new Object,i=0,o=e.length;i<o;i++){var a=e[i][t];r[a]=n({},e[i])}return r}function u(e){return"undefined"==typeof e||null==e?"":e.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")}function s(e){var t=new Array;for(var r in e)t.push(e[r]);return t}function c(e){var t=/^[1][3,4,5,7,8,9][0-9]{9}$/;return!!t.test(e)}function f(e,t){return"string"===typeof e&&"string"===typeof t&&(e=parseFloat(e),t=parseFloat(t)),e=e.toFixed(2),t=t.toFixed(2),{longitude:e.toString().split("."),latitude:t.toString().split(".")}}var l={UNITS:{"年":315576e5,"月":26298e5,"天":864e5,"小时":36e5,"分钟":6e4,"秒":1e3},humanize:function(e){var t="";for(var r in this.UNITS)if(e>=this.UNITS[r]){t=Math.floor(e/this.UNITS[r])+r+"前";break}return t||"刚刚"},format:function(e){var t=this.parse(e),r=Date.now()-t.getTime();if(r<this.UNITS["天"])return this.humanize(r);var n=function(e){return e<10?"0"+e:e};return t.getFullYear()+"/"+n(t.getMonth()+1)+"/"+n(t.getDay())+"-"+n(t.getHours())+":"+n(t.getMinutes())},parse:function(e){var t=e.split(/[^0-9]/);return new Date(t[0],t[1]-1,t[2],t[3],t[4],t[5])}};e.exports={formatTime:i,formatUnixtimestamp:o,formatLocation:f,dateUtils:l,ObjectToArray:s,ArrayExtractToObjectWithKey:a,isPoneAvailable:c,hidePhoneNumber:u}},dbd7:function(e,t,r){"use strict";var n,i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-uni-view",{staticClass:"page"},[r("v-uni-view",{staticClass:"uni-padding-wrap"},[r("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)},reset:function(t){arguments[0]=t=e.$handleEvent(t),e.formReset.apply(void 0,arguments)}}},[r("v-uni-view",{staticClass:"uni-flex uni-row"},[r("v-uni-view",{staticClass:"uni-labelname"},[e._v("手机号")]),r("v-uni-view",{staticClass:"uni-flex-item"},[r("v-uni-input",{staticClass:"uni-input",attrs:{type:"number",maxlength:"11",name:"mobile",placeholder:"输入手机号"},on:{input:function(t){arguments[0]=t=e.$handleEvent(t),e.onkeyinput.apply(void 0,arguments)}}})],1)],1),r("v-uni-view",{staticClass:"uni-flex uni-row"},[r("v-uni-view",{staticClass:"uni-labelname"},[e._v("密　码")]),r("v-uni-view",{staticClass:"uni-flex-item safecode"},[r("v-uni-input",{staticClass:"uni-input",attrs:{type:"password",maxlength:"20",name:"password",placeholder:"输入密码"}})],1)],1),r("v-uni-view",{staticClass:"uni-btn-v uni-common-mt"},[r("v-uni-button",{staticClass:"btn-submit btn_submit",attrs:{formType:"submit"}},[e._v("登录")]),r("v-uni-button",{attrs:{type:"default"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.userreg.apply(void 0,arguments)}}},[e._v("没有账号？马上注册")])],1)],1)],1)],1)},o=[];r.d(t,"b",(function(){return i})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return n}))},dfe9:function(e,t,r){"use strict";r.r(t);var n=r("6d48"),i=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=i.a}}]);