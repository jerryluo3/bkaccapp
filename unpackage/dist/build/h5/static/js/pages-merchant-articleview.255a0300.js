(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-merchant-articleview"],{"09b2":function(t,e,r){"use strict";r.r(e);var n=r("6012"),i=r("866a");for(var a in i)"default"!==a&&function(t){r.d(e,t,(function(){return i[t]}))}(a);r("6562");var o,u=r("f0c5"),c=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,"4673dfa5",null,!1,n["a"],o);e["default"]=c.exports},1148:function(t,e,r){"use strict";var n=r("a691"),i=r("1d80");t.exports="".repeat||function(t){var e=String(i(this)),r="",a=n(t);if(a<0||a==1/0)throw RangeError("Wrong number of repetitions");for(;a>0;(a>>>=1)&&(e+=e))1&a&&(r+=e);return r}},"12c0":function(t,e,r){r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("5757");function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}t.exports=a},"38a2":function(t,e,r){"use strict";(function(t){var n=r("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(r("4976")),a=(n(r("d7cb")),{data:function(){return{baseUrl:i.default.baseUrl,shopid:0,shop:[],id:0,article:[],menu:{mindex:3,shopid:0,shop:[]},info:{bg_color:"0,170,250",bg_alpha:1,delta:2,icon_color:"white",shpid:0},titleHeight:0,statusBarHeight:0,naviBarHeight:0}},onLoad:function(t){var e=this,r=t.shopid,n=t.id;e.shopid=r,e.id=n,r>0&&(e.menu.shopid=r,e.info.shopid=shop.shop_id,uni.setStorageSync("shopid",r),e.getShopArticle(),e.getShopInfo()),e.titleHeight=i.default.titleHeight,e.statusBarHeight=i.default.statusBarHeight,e.naviBarHeight=i.default.naviBarHeight},onPullDownRefresh:function(){var t=this;uni.showNavigationBarLoading(),t.getShopArticle(),t.getShopInfo(),uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},onShareAppMessage:function(e){var r=this;"button"===e.from&&t.log(e.target);var n=uni.getStorageSync("userInfo"),i=r.shopid;if(n.users_id>0)var a="/pages/merchant/articleview?shopid="+i+"&id="+r.id+"&tjuid="+n.users_id;else a="/pages/merchant/articleview?shopid="+i+"&id="+r.id;return{title:r.article.title+"-"+r.shop.shop_title,path:a}},methods:{getShopInfo:function(){var t=this,e=t.shopid;if(""==e||0==e)return!1;uni.request({url:i.default.apiUrl+"shop/getShopInfo",method:"GET",data:{shopid:e},success:function(e){t.shop=e.data.shop,t.menu.shop=e.data.shop;var r=e.data.shop;uni.setNavigationBarTitle({title:r.shop_title})},fail:function(){},complete:function(){}})},jumpUrl:function(t){var e=t.currentTarget.dataset.url;uni.navigateTo({url:e})},getShopArticle:function(){var e=this,r=e.id;if(""==r||0==r)return!1;uni.request({url:i.default.apiUrl+"shop/getShopArticle",method:"GET",data:{id:r},success:function(r){if(e.article=r.data.article,t.log(r),e.$wechat){var n=r.data.article.picture?r.data.article.picture:r.data.article.shop_picture;e.$wechat.share({title:r.data.article.title,desc:r.data.article.shop_zhuying,img:e.baseUrl+n})}},fail:function(){},complete:function(){}})}}});e.default=a}).call(this,r("5a52")["default"])},"408a":function(t,e,r){var n=r("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=n(t))throw TypeError("Incorrect invocation");return+t}},6012:function(t,e,r){"use strict";var n,i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-uni-view",{staticClass:"page"},[r("v-uni-view",{staticClass:"acticle_title"},[t._v(t._s(t.article.title))]),r("v-uni-view",{staticClass:"article_content"},[r("v-uni-rich-text",{attrs:{nodes:t.article.content}})],1),r("v-uni-view",{staticClass:"page_blank",style:"height:"+t.titleHeight+"px"}),r("page-menu",{attrs:{menu:t.menu}})],1)},a=[];r.d(e,"b",(function(){return i})),r.d(e,"c",(function(){return a})),r.d(e,"a",(function(){return n}))},6562:function(t,e,r){"use strict";var n=r("e3b7"),i=r.n(n);i.a},"866a":function(t,e,r){"use strict";r.r(e);var n=r("38a2"),i=r.n(n);for(var a in n)"default"!==a&&function(t){r.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},b680:function(t,e,r){"use strict";var n=r("23e7"),i=r("a691"),a=r("408a"),o=r("1148"),u=r("d039"),c=1..toFixed,s=Math.floor,f=function(t,e,r){return 0===e?r:e%2===1?f(t,e-1,r*t):f(t*t,e/2,r)},l=function(t){var e=0,r=t;while(r>=4096)e+=12,r/=4096;while(r>=2)e+=1,r/=2;return e},d=c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!u((function(){c.call({})}));n({target:"Number",proto:!0,forced:d},{toFixed:function(t){var e,r,n,u,c=a(this),d=i(t),h=[0,0,0,0,0,0],p="",g="0",v=function(t,e){var r=-1,n=e;while(++r<6)n+=t*h[r],h[r]=n%1e7,n=s(n/1e7)},b=function(t){var e=6,r=0;while(--e>=0)r+=h[e],h[e]=s(r/t),r=r%t*1e7},w=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==h[t]){var r=String(h[t]);e=""===e?r:e+o.call("0",7-r.length)+r}return e};if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(p="-",c=-c),c>1e-21)if(e=l(c*f(2,69,1))-69,r=e<0?c*f(2,-e,1):c/f(2,e,1),r*=4503599627370496,e=52-e,e>0){v(0,r),n=d;while(n>=7)v(1e7,0),n-=7;v(f(10,n,1),0),n=e-1;while(n>=23)b(1<<23),n-=23;b(1<<n),v(1,1),b(2),g=w()}else v(0,r),v(1<<-e,0),g=w()+o.call("0",d);return d>0?(u=g.length,g=p+(u<=d?"0."+o.call("0",d-u)+g:g.slice(0,u-d)+"."+g.slice(u-d))):g=p+g,g}})},d7cb:function(t,e,r){r("a15b"),r("d81d"),r("b680"),r("d3b7"),r("acd8"),r("e25e"),r("ac1f"),r("25f0"),r("5319"),r("1276");var n=r("12c0");function i(t){if("number"!==typeof t||t<0)return t;var e=parseInt(t/3600);t%=3600;var r=parseInt(t/60);t=parseInt(t%60);var n=t;return[e,r,n].map((function(t){return t=t.toString(),t[1]?t:"0"+t})).join(":")}function a(t){t=new Date(t);var e=1900+t.getYear(),r="0"+(t.getMonth()+1),n="0"+t.getDate(),i="0"+t.getHours(),a="0"+t.getMinutes();t.getSeconds();return e+"-"+r.substring(r.length-2,r.length)+"-"+n.substring(n.length-2,n.length)+" "+i.substring(i.length-2,i.length)+":"+a.substring(a.length-2,a.length)}function o(t,e){for(var r=new Object,i=0,a=t.length;i<a;i++){var o=t[i][e];r[o]=n({},t[i])}return r}function u(t){return"undefined"==typeof t||null==t?"":t.replace(/^(\d{4})\d{4}(\d+)/,"$1****$2")}function c(t){var e=new Array;for(var r in t)e.push(t[r]);return e}function s(t){var e=/^[1][3,4,5,7,8,9][0-9]{9}$/;return!!e.test(t)}function f(t,e){return"string"===typeof t&&"string"===typeof e&&(t=parseFloat(t),e=parseFloat(e)),t=t.toFixed(2),e=e.toFixed(2),{longitude:t.toString().split("."),latitude:e.toString().split(".")}}var l={UNITS:{"年":315576e5,"月":26298e5,"天":864e5,"小时":36e5,"分钟":6e4,"秒":1e3},humanize:function(t){var e="";for(var r in this.UNITS)if(t>=this.UNITS[r]){e=Math.floor(t/this.UNITS[r])+r+"前";break}return e||"刚刚"},format:function(t){var e=this.parse(t),r=Date.now()-e.getTime();if(r<this.UNITS["天"])return this.humanize(r);var n=function(t){return t<10?"0"+t:t};return e.getFullYear()+"/"+n(e.getMonth()+1)+"/"+n(e.getDay())+"-"+n(e.getHours())+":"+n(e.getMinutes())},parse:function(t){var e=t.split(/[^0-9]/);return new Date(e[0],e[1]-1,e[2],e[3],e[4],e[5])}};t.exports={formatTime:i,formatUnixtimestamp:a,formatLocation:f,dateUtils:l,ObjectToArray:c,ArrayExtractToObjectWithKey:o,isPoneAvailable:s,hidePhoneNumber:u}},e3b7:function(t,e,r){var n=r("e686");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=r("4f06").default;i("a73e9c5a",n,!0,{sourceMap:!1,shadowMode:!1})},e686:function(t,e,r){var n=r("24fb");e=n(!1),e.push([t.i,"uni-page-body[data-v-4673dfa5]{background:#fff}.acticle_title[data-v-4673dfa5]{padding:%?20?%;font-size:%?48?%;text-align:center;background:#fafafa;border-bottom:#eee}.article_content[data-v-4673dfa5]{padding:%?20?%;font-size:%?28?%}body.?%PAGE?%[data-v-4673dfa5]{background:#fff}",""]),t.exports=e}}]);