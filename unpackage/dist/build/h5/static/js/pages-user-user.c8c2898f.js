(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-user"],{"22bf":function(i,t,e){var a=e("596e");"string"===typeof a&&(a=[[i.i,a,""]]),a.locals&&(i.exports=a.locals);var n=e("4f06").default;n("6a487b82",a,!0,{sourceMap:!1,shadowMode:!1})},"596e":function(i,t,e){var a=e("24fb");t=a(!1),t.push([i.i,".main[data-v-759226bf]{width:100%;height:100%;min-height:%?1200?%}.user_header[data-v-759226bf]{width:100%;background:#fff;height:%?150?%;padding:%?20?% 0}.user_avatar[data-v-759226bf]{width:%?150?%;height:%?150?%;margin:0 %?40?%;border-radius:50%;background:#c3e7f3}.user_avatar uni-image[data-v-759226bf]{width:%?150?%;height:%?150?%;border-radius:50%}.user_infoset[data-v-759226bf]{width:%?60?%;height:%?60?%;padding:%?40?% 0 0}.user_infoset uni-image[data-v-759226bf]{width:%?40?%;height:%?40?%}.user_nickname[data-v-759226bf]{color:#000;font-size:%?56?%;line-height:%?60?%;font-weight:700;padding:%?20?% 0 0 %?30?%;position:relative}.user_vip[data-v-759226bf]{margin-left:%?10?%;width:%?60?%;height:%?60?%;display:inline-block;vertical-align:middle}.user_vip uni-image[data-v-759226bf]{width:%?60?%;height:%?60?%;display:block}.user_logintips[data-v-759226bf]{color:#666;font-size:%?24?%;padding:0 0 0 %?30?%;line-height:%?60?%}.tabs[data-v-759226bf]{background:#fff;height:%?180?%;padding:%?20?%;text-align:center}.tabs_item[data-v-759226bf]{box-shadow:0 0 %?10?% #eee;border-radius:%?10?%;margin:%?10?%;background:#fff}.tabs_val[data-v-759226bf]{height:%?40?%;line-height:%?40?%;padding-top:%?40?%;width:100%;font-size:%?44?%;font-weight:700}.tabs_val uni-text[data-v-759226bf]{font-size:%?24?%}.tabs_img[data-v-759226bf],.tabs_img uni-image[data-v-759226bf]{width:%?60?%;height:%?60?%;margin:0 auto}.tabs_img[data-v-759226bf]{padding-top:%?20?%}.tabs_words[data-v-759226bf]{font-size:%?28?%;color:#585858;line-height:%?40?%;padding:%?10?% 0 %?30?%}.info_list[data-v-759226bf]{margin-bottom:%?20?%;width:100%;background:#fff}.info_item[data-v-759226bf]{height:%?60?%;line-height:%?60?%;font-size:%?28?%;padding:%?20?% 0}.info_item .info_ico[data-v-759226bf]{width:%?60?%;height:%?40?%;padding:0 0 0 %?30?%}.info_item .info_name[data-v-759226bf]{font-size:%?32?%}.info_item .info_more[data-v-759226bf]{width:%?60?%;height:%?40?%}.info_item  uni-image[data-v-759226bf]{width:%?40?%;height:%?40?%;margin:%?10?% auto}.invite_ads[data-v-759226bf]{width:100%;height:%?200?%;margin-bottom:%?20?%}.invite_ads uni-image[data-v-759226bf]{width:100%;height:%?200?%}.blue[data-v-759226bf]{color:#1286e9}.red[data-v-759226bf]{color:#ff643d}.yellow[data-v-759226bf]{color:#ffa61a}",""]),i.exports=t},"63be":function(i,t,e){"use strict";var a,n=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("v-uni-view",{staticClass:"main"},[""!=i.userInfo?a("v-uni-view",{staticClass:"user_header weui-flex",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.setting.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"weui-flex__item"},[a("v-uni-view",{staticClass:"user_nickname"},[i._v(i._s(i.userInfo.users_nickname)),1==i.userInfo.isvip?a("v-uni-view",{staticClass:"user_vip"},[a("v-uni-image",{attrs:{src:e("622a"),mode:""}})],1):i._e(),1==i.userInfo.users_type?a("v-uni-view",{staticClass:"user_vip"},[a("v-uni-image",{attrs:{src:e("ae58"),mode:""}})],1):i._e()],1),a("v-uni-view",{staticClass:"user_logintips"},[i._v("优享生活从凡迪开始")])],1),a("v-uni-view",{staticClass:"user_avatar"},[a("v-uni-image",{attrs:{src:i.userInfo.users_avatar}})],1)],1):a("v-uni-view",{staticClass:"user_header weui-flex",on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.checkLogin.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"weui-flex__item"},[a("v-uni-view",{staticClass:"user_nickname"},[i._v("立即登录")]),a("v-uni-view",{staticClass:"user_logintips"},[i._v("凡迪您的生活小助手")])],1),a("v-uni-view",{staticClass:"user_avatar"},[a("v-uni-image",{attrs:{src:"/static/user/unloginlogo.png"}})],1)],1),a("v-uni-view",{staticClass:"tabs weui-flex"},[a("v-uni-view",{staticClass:"weui-flex__item tabs_item",attrs:{"data-url":"/pages/user/recharge"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.jumpUrl.apply(void 0,arguments)}}},[i.userid>0?a("v-uni-view",{staticClass:"tabs_val blue"},[i._v(i._s(i.userInfo.users_wallet)),a("v-uni-text",[i._v("元")])],1):a("v-uni-view",{staticClass:"tabs_img"},[a("v-uni-image",{attrs:{src:e("f30c")}})],1),a("v-uni-view",{staticClass:"tabs_words"},[i._v("钱包")])],1),a("v-uni-view",{staticClass:"weui-flex__item tabs_item"},[i.userid>0?a("v-uni-view",{staticClass:"tabs_val red"},[i._v(i._s(i.coupon_nums)),a("v-uni-text",[i._v("个")])],1):a("v-uni-view",{staticClass:"tabs_img"},[a("v-uni-image",{attrs:{src:e("3555")}})],1),a("v-uni-view",{staticClass:"tabs_words"},[i._v("优惠")])],1),a("v-uni-view",{staticClass:"weui-flex__item tabs_item last_item"},[i.userid>0?a("v-uni-view",{staticClass:"tabs_val yellow"},[i._v(i._s(i.userInfo.users_integral)),a("v-uni-text",[i._v("个")])],1):a("v-uni-view",{staticClass:"tabs_img"},[a("v-uni-image",{attrs:{src:e("333a")}})],1),a("v-uni-view",{staticClass:"tabs_words"},[i._v("积分")])],1)],1),""!=i.ads&&0==i.userInfo.users_type?a("v-uni-view",{staticClass:"invite_ads",attrs:{"data-url":i.ads.aa_url,"data-attr":i.ads.aa_attr},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.jumpUrl.apply(void 0,arguments)}}},[a("v-uni-image",{attrs:{src:i.baseUrl+i.ads.aa_picture}})],1):i._e(),a("v-uni-view",{staticClass:"info_list"},[1==i.userInfo.users_type?a("v-uni-view",{staticClass:"info_item weui-flex",attrs:{"data-url":"/pages/user/superorders"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.jumpUrl.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"info_ico"},[a("v-uni-image",{attrs:{src:e("8519")}})],1),a("v-uni-view",{staticClass:"weui-flex__item info_name"},[i._v("达人订单")]),a("v-uni-view",{staticClass:"info_more"},[a("v-uni-image",{attrs:{src:e("79d9")}})],1)],1):i._e(),a("v-uni-view",{staticClass:"info_item weui-flex",attrs:{"data-url":"/pages/user/setting/address"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.jumpUrl.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"info_ico"},[a("v-uni-image",{attrs:{src:e("7a2c")}})],1),a("v-uni-view",{staticClass:"weui-flex__item info_name"},[i._v("收货地址")]),a("v-uni-view",{staticClass:"info_more"},[a("v-uni-image",{attrs:{src:e("79d9")}})],1)],1),a("v-uni-view",{staticClass:"info_item weui-flex",attrs:{"data-url":"/pages/user/kefu"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.jumpUrl.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"info_ico"},[a("v-uni-image",{attrs:{src:e("5b5b")}})],1),a("v-uni-view",{staticClass:"weui-flex__item info_name"},[i._v("客服/售后")]),a("v-uni-view",{staticClass:"info_more"},[a("v-uni-image",{attrs:{src:e("79d9")}})],1)],1),""!=i.userInfo?a("v-uni-view",{staticClass:"info_item weui-flex",attrs:{"data-url":"/pages/shop/index/index"},on:{click:function(t){arguments[0]=t=i.$handleEvent(t),i.jumpUrl.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"info_ico"},[a("v-uni-image",{attrs:{src:e("5124")}})],1),a("v-uni-view",{staticClass:"weui-flex__item info_name"},[i._v("商家中心")]),a("v-uni-view",{staticClass:"info_more"},[a("v-uni-image",{attrs:{src:e("79d9")}})],1)],1):i._e()],1),a("uni-popup",{attrs:{show:i.showPopupMiddle,type:i.popType},on:{hidePopup:function(t){arguments[0]=t=i.$handleEvent(t),i.hidePopup.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"uni-common-mt uni-helllo-text uni-center"},[a("v-uni-button",{attrs:{"open-type":"contact",type:"warn"}},[i._v("进入客服会话")])],1)],1)],1)},s=[];e.d(t,"b",(function(){return n})),e.d(t,"c",(function(){return s})),e.d(t,"a",(function(){return a}))},"6bd3":function(i,t,e){"use strict";e.r(t);var a=e("63be"),n=e("8d42");for(var s in n)"default"!==s&&function(i){e.d(t,i,(function(){return n[i]}))}(s);e("97a3");var u,o=e("f0c5"),r=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"759226bf",null,!1,a["a"],u);t["default"]=r.exports},"75e9":function(i,t,e){"use strict";(function(i){var a=e("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(e("4976")),s=(a(e("d7cb")),a(e("884d"))),u={data:function(){return{baseUrl:n.default.baseUrl,userid:"",userInfo:[],coupon_nums:0,ads:[],popType:"middle",showPopupMiddle:!1,info:{bg_color:"255,255,255",bg_alpha:1,delta:1},titleHeight:0,statusBarHeight:0,naviBarHeight:0,canbuy:1}},onLoad:function(){var t=this,e=uni.getStorageSync("userid"),a=uni.getStorageSync("userInfo");t.userid=e,t.userInfo=a,t.getInviteAds();var s=getCurrentPages();t.info.delta=s.length,t.titleHeight=n.default.titleHeight,t.statusBarHeight=n.default.statusBarHeight,t.naviBarHeight=n.default.naviBarHeight,i.log("userid",e),i.log("userInfo",a)},onPullDownRefresh:function(){var t=this;uni.showNavigationBarLoading(),i.log("下拉刷新中..."),t.getUserInfo(),t.getInviteAds(),uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},methods:{hidePopup:function(){this.showPopupMiddle=!1},showMiddlePopup:function(){this.hidePopup(),this.showPopupMiddle=!0},getInviteAds:function(){var t=this;uni.request({url:n.default.apiUrl+"ads/getInviteAds",method:"GET",data:{},success:function(e){i.log(e),t.ads=e.data.ads,t.canbuy=e.data.canbuy},fail:function(){},complete:function(){}})},kefu:function(){var t=this;uni.showActionSheet({itemList:["在线客服","0573-82082008"],success:function(e){0==e.tapIndex&&(i.log("在线客服"),t.showMiddlePopup()),1==e.tabpIndex&&uni.makePhoneCall({phoneNumber:"114"})},fail:function(t){i.log(t.errMsg)}})},ruzhu:function(){uni.navigateToMiniProgram({appId:"wx8cac4ba732d41675",path:"pages/index/index",extarData:{open:"auth"},success:function(t){i.log("aaa")},fail:function(t){i.log(t)}})},jumpUrl:function(i){var t=i.currentTarget.dataset.url;uni.navigateTo({url:t})},getCouponNums:function(){uni.getStorageSync("userid")},getUserInfo:function(){var i=this,t=i.userid;t>0?uni.request({url:n.default.apiUrl+"user/getUserInfo",method:"GET",data:{userid:t},success:function(t){if(0==t.data.code){var e=t.data.userInfo;uni.setStorageSync("userInfo",e),i.userInfo=e}},fail:function(){},complete:function(){}}):uni.showModal({title:"提示",content:"你还没登录，现在去登录吗？",showCancel:!0,cancelText:"取消",confirmText:"确定",success:function(i){i.confirm&&uni.navigateTo({url:"/pages/userlogin/userlogin",success:function(i){},fail:function(){},complete:function(){}})},fail:function(){},complete:function(){}})},checkLogin:function(){var t=uni.getStorageSync("userid");t?i.log("已经登录"):(i.log("还没有登录"),uni.navigateTo({url:"/pages/userlogin/userlogin",success:function(i){},fail:function(){},complete:function(){}}))},setting:function(){uni.navigateTo({url:"/pages/user/setting/setting",success:function(i){},fail:function(){},complete:function(){}})}},components:{uniPopup:s.default}};t.default=u}).call(this,e("5a52")["default"])},"8d42":function(i,t,e){"use strict";e.r(t);var a=e("75e9"),n=e.n(a);for(var s in a)"default"!==s&&function(i){e.d(t,i,(function(){return a[i]}))}(s);t["default"]=n.a},"97a3":function(i,t,e){"use strict";var a=e("22bf"),n=e.n(a);n.a}}]);