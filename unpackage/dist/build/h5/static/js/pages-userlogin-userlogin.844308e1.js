(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-userlogin-userlogin"],{1148:function(t,e,i){"use strict";var n=i("a691"),r=i("1d80");t.exports="".repeat||function(t){var e=String(r(this)),i="",o=n(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(i+=e);return i}},"12c0":function(t,e,i){i("a4d3"),i("4de4"),i("4160"),i("e439"),i("dbb4"),i("b64b"),i("159b");var n=i("5757");function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function o(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){n(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}t.exports=o},2750:function(t,e,i){"use strict";var n,r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"main"},[i("v-uni-form",{on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.formSubmit.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"userlogin"},[i("v-uni-view",{staticClass:"userlogin_item weui-flex"},[i("v-uni-view",{staticClass:"weui-flex__item"},[i("v-uni-input",{staticClass:"userlogin_input",attrs:{type:"number",name:"mobile",value:"",focus:!0,placeholder:"手机号"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.onkeyinput.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"getcode",class:{getcode_use:1==t.ismobile},attrs:{id:"getcode"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getcode.apply(void 0,arguments)}}},[t._v(t._s(t.words))])],1),i("v-uni-view",{staticClass:"userlogin_item weui-flex"},[i("v-uni-view",{staticClass:"weui-flex__item"},[i("v-uni-input",{staticClass:"userlogin_input",attrs:{name:"code",type:"number",maxlength:"4",value:"",placeholder:"验证码"}})],1)],1),i("v-uni-view",{staticClass:"userlogin_item weui-flex"},[i("v-uni-view",{staticClass:"weui-flex__item"},[i("v-uni-input",{staticClass:"userlogin_input",attrs:{name:"tjmobile",type:"number",value:"",placeholder:"邀请码(邀请人手机号,没有可不填)"}})],1)],1)],1),i("v-uni-view",{staticClass:"userlogin_tips"},[t._v("温馨提示：未注册凡迪优品账号的手机号，登录时将自动注册，且代表您已同意《用户服务协议》、《隐私政策》")]),i("v-uni-button",{staticClass:"userlogin_btn",attrs:{formType:"submit"}},[t._v("登录")])],1)],1)},o=[];i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},"2f83":function(t,e,i){"use strict";i.r(e);var n=i("7c33"),r=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=r.a},"408a":function(t,e,i){var n=i("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},"5e37":function(t,e,i){"use strict";i.r(e);var n=i("2750"),r=i("2f83");for(var o in r)"default"!==o&&function(t){i.d(e,t,(function(){return r[t]}))}(o);i("9e55");var a,u=i("f0c5"),s=Object(u["a"])(r["default"],n["b"],n["c"],!1,null,"fbdda170",null,!1,n["a"],a);e["default"]=s.exports},"7c33":function(t,e,i){"use strict";(function(t){var n=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(i("4976")),o=n(i("d7cb")),a={data:function(){return{mobile:"",ismobile:!1,issend:!1,wait:60,words:"获取验证码",info:{bg_color:"255,255,255",bg_alpha:1,delta:2},titleHeight:0,statusBarHeight:0,naviBarHeight:0,tfrom:"",id:""}},onLoad:function(t){var e=this,i=t.tfrom,n=t.id;""!=i&&(e.tfrom=i),""!=n&&(e.id=n),e.titleHeight=r.default.titleHeight,e.statusBarHeight=r.default.statusBarHeight,e.naviBarHeight=r.default.naviBarHeight},onPullDownRefresh:function(){uni.showNavigationBarLoading(),t.log("下拉刷新中..."),uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},methods:{onkeyinput:function(t){var e=this,i=t.detail.value;o.default.isPoneAvailable(i)?(e.ismobile=!0,e.mobile=i):(e.ismobile=!1,e.mobile="")},getcode:function(){var t=this,e=t.mobile;if(!t.ismobile)return 60==t.wait&&uni.showToast({title:"请输入正确手机号",duration:1500,icon:"none"}),!1;t.ismobile=!1,t.time(),uni.request({url:r.default.apiUrl+"login/getSafeCode",method:"GET",data:{mobile:e},success:function(e){if(e.data.code>0)return uni.showToast({title:e.data.msg,duration:1500,icon:"none"}),!1;t.ismobile=!1},fail:function(){},complete:function(){}})},time:function(){var t=this,e=t.wait;0==e?(t.ismobile=!0,t.words="获取验证码",t.wait=60):(t.ismobile=!1,t.words="重新发送("+e+")",e--,t.wait=e,setTimeout((function(){t.time()}),1e3))},formSubmit:function(e){var i=this,n=e.detail.value,a=n.mobile,u=n.code,s=n.tjmobile,l=uni.getStorageSync("tjuid");return""==a?(uni.showToast({title:"请输入手机号码",duration:1500,icon:"none"}),!1):o.default.isPoneAvailable(a)?4!=u.length?(uni.showToast({title:"验证码错误",duration:1500,icon:"none"}),!1):(uni.showLoading({title:"登录中"}),void uni.request({url:r.default.apiUrl+"login/checkUserLogin",method:"GET",data:{mobile:a,code:u,tjuid:l,tjmobile:s},success:function(e){uni.hideLoading();var n=e.data;if(t.log(n),0!=n.code)return uni.showToast({title:n.msg,duration:1500,icon:"none"}),!1;uni.setStorageSync("userInfo",n.user),uni.setStorageSync("userid",n.user.users_id),uni.showToast({title:"登录成功",duration:1500,icon:"success"}),setTimeout((function(){if("goods"==i.tfrom){var t="/pages/merchant/goods?id="+i.id;uni.navigateTo({url:t})}else if("products"==i.tfrom){t="/pages/merchant/products?id="+i.id;uni.navigateTo({url:t})}else{t="/pages/user/user";uni.reLaunch({url:t})}}),1500)},fail:function(){},complete:function(){}})):(uni.showToast({title:"手机号格式不正确",duration:1500,icon:"none"}),!1)}}};e.default=a}).call(this,i("5a52")["default"])},"9e55":function(t,e,i){"use strict";var n=i("c204"),r=i.n(n);r.a},b680:function(t,e,i){"use strict";var n=i("23e7"),r=i("a691"),o=i("408a"),a=i("1148"),u=i("d039"),s=1..toFixed,l=Math.floor,c=function(t,e,i){return 0===e?i:e%2===1?c(t,e-1,i*t):c(t*t,e/2,i)},f=function(t){var e=0,i=t;while(i>=4096)e+=12,i/=4096;while(i>=2)e+=1,i/=2;return e},d=s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!u((function(){s.call({})}));n({target:"Number",proto:!0,forced:d},{toFixed:function(t){var e,i,n,u,s=o(this),d=r(t),g=[0,0,0,0,0,0],v="",h="0",b=function(t,e){var i=-1,n=e;while(++i<6)n+=t*g[i],g[i]=n%1e7,n=l(n/1e7)},p=function(t){var e=6,i=0;while(--e>=0)i+=g[e],g[e]=l(i/t),i=i%t*1e7},m=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==g[t]){var i=String(g[t]);e=""===e?i:e+a.call("0",7-i.length)+i}return e};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(s!=s)return"NaN";if(s<=-1e21||s>=1e21)return String(s);if(s<0&&(v="-",s=-s),s>1e-21)if(e=f(s*c(2,69,1))-69,i=e<0?s*c(2,-e,1):s/c(2,e,1),i*=4503599627370496,e=52-e,e>0){b(0,i),n=d;while(n>=7)b(1e7,0),n-=7;b(c(10,n,1),0),n=e-1;while(n>=23)p(1<<23),n-=23;p(1<<n),b(1,1),p(2),h=m()}else b(0,i),b(1<<-e,0),h=m()+a.call("0",d);return d>0?(u=h.length,h=v+(u<=d?"0."+a.call("0",d-u)+h:h.slice(0,u-d)+"."+h.slice(u-d))):h=v+h,h}})},c204:function(t,e,i){var n=i("d72d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("126a1b10",n,!0,{sourceMap:!1,shadowMode:!1})},d72d:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,".main[data-v-fbdda170]{background:#f5f5f5;width:100%;height:100%;min-height:%?1200?%}.userlogin[data-v-fbdda170]{margin:%?20?% 0;background:#fff}.userlogin_item[data-v-fbdda170]{border-bottom:%?1?% solid #eee;height:%?80?%;line-height:%?80?%;padding:%?10?%}.userlogin_tips[data-v-fbdda170]{padding:%?10?% %?20?%;font-size:%?24?%;color:#aaa}.userlogin_input[data-v-fbdda170]{height:%?80?%;line-height:%?80?%;padding:0 3%;font-size:%?36?%}.userlogin_btn[data-v-fbdda170]{background:#ff8400;color:#fff;margin:3%;height:%?100?%;line-height:%?100?%;border-radius:%?6?%;text-align:center;font-size:%?32?%;font-weight:700}.getcode[data-v-fbdda170]{background:#f0f0f0;padding:0 %?20?%;border-radius:%?6?%;line-height:%?80?%;font-size:%?28?%}.getcode_use[data-v-fbdda170]{background:#fdd108;color:#725e03}",""]),t.exports=e},d7cb:function(t,e,i){i("a15b"),i("d81d"),i("b680"),i("d3b7"),i("acd8"),i("e25e"),i("ac1f"),i("25f0"),i("5319"),i("1276");var n=i("12c0");function r(t){if("number"!==typeof t||t<0)return t;var e=parseInt(t/3600);t%=3600;var i=parseInt(t/60);t=parseInt(t%60);var n=t;return[e,i,n].map((function(t){return t=t.toString(),t[1]?t:"0"+t})).join(":")}function o(t){t=new Date(t);var e=1900+t.getYear(),i="0"+(t.getMonth()+1),n="0"+t.getDate(),r="0"+t.getHours(),o="0"+t.getMinutes();t.getSeconds();return e+"-"+i.substring(i.length-2,i.length)+"-"+n.substring(n.length-2,n.length)+" "+r.substring(r.length-2,r.length)+":"+o.substring(o.length-2,o.length)}function a(t,e){for(var i=new Object,r=0,o=t.length;r<o;r++){var a=t[r][e];i[a]=n({},t[r])}return i}function u(t){return"undefined"==typeof t||null==t?"":t.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")}function s(t){var e=new Array;for(var i in t)e.push(t[i]);return e}function l(t){var e=/^[1][3,4,5,7,8,9][0-9]{9}$/;return!!e.test(t)}function c(t,e){return"string"===typeof t&&"string"===typeof e&&(t=parseFloat(t),e=parseFloat(e)),t=t.toFixed(2),e=e.toFixed(2),{longitude:t.toString().split("."),latitude:e.toString().split(".")}}var f={UNITS:{"年":315576e5,"月":26298e5,"天":864e5,"小时":36e5,"分钟":6e4,"秒":1e3},humanize:function(t){var e="";for(var i in this.UNITS)if(t>=this.UNITS[i]){e=Math.floor(t/this.UNITS[i])+i+"前";break}return e||"刚刚"},format:function(t){var e=this.parse(t),i=Date.now()-e.getTime();if(i<this.UNITS["天"])return this.humanize(i);var n=function(t){return t<10?"0"+t:t};return e.getFullYear()+"/"+n(e.getMonth()+1)+"/"+n(e.getDay())+"-"+n(e.getHours())+":"+n(e.getMinutes())},parse:function(t){var e=t.split(/[^0-9]/);return new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5])}};t.exports={formatTime:r,formatUnixtimestamp:o,formatLocation:c,dateUtils:f,ObjectToArray:s,ArrayExtractToObjectWithKey:a,isPoneAvailable:l,hidePhoneNumber:u}}}]);