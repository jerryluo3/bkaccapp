(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-orders-orders"],{"0d9e":function(e,t,i){"use strict";var a=i("f646"),r=i.n(a);r.a},"2fc2":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,".tab[data-v-0d71ebb4]{height:%?100?%;line-height:%?100?%;text-align:center;background:#fafafa}.tab_item[data-v-0d71ebb4]{font-size:%?32?%;position:relative;line-height:%?100?%}.item_in[data-v-0d71ebb4]{color:#00aafa;font-weight:700;border-bottom:%?4?% solid #00aafa;background:#eee}.orders_container[data-v-0d71ebb4]{padding:%?20?% 0;font-size:%?28?%}.title[data-v-0d71ebb4]{line-height:%?60?%;line-height:%?60?%;font-size:%?36?%;font-weight:700;color:#333;padding-left:%?20?%}.order_list[data-v-0d71ebb4]{width:100%}.order_item[data-v-0d71ebb4]{background:#fff;border-bottom:%?1?% solid #ddd;padding:%?30?% 0}.market_img[data-v-0d71ebb4]{width:%?80?%;margin:0 %?20?%}.market_img uni-image[data-v-0d71ebb4]{width:%?80?%;height:%?80?%}.market_title[data-v-0d71ebb4]{font-size:%?36?%;color:#343434;font-weight:700}.order_addtime[data-v-0d71ebb4]{font-size:%?24?%;color:#9a9a9a}.goods_info[data-v-0d71ebb4]{color:#6b6b6b;padding-right:%?20?%}.order_status[data-v-0d71ebb4]{width:%?220?%;color:#646464;text-align:right;font-size:%?28?%;padding-right:%?20?%;line-height:%?60?%}.order_amount[data-v-0d71ebb4]{width:%?220?%;color:#333;text-align:right;padding-right:%?20?%}.order_amount uni-text[data-v-0d71ebb4]{font-weight:700;font-size:%?36?%}.order_info[data-v-0d71ebb4]{padding-left:%?20?%}.order_goods[data-v-0d71ebb4]{padding:%?20?%}.goods_item[data-v-0d71ebb4]{padding:%?10?% 0}.goods_img[data-v-0d71ebb4],.goods_img uni-image[data-v-0d71ebb4]{width:%?40?%;height:%?40?%;margin-right:%?20?%}.goods_nums[data-v-0d71ebb4]{font-size:%?20?%;color:#777}.goods_price[data-v-0d71ebb4]{padding:0 0 0 %?40?%;font-weight:700}.order_del[data-v-0d71ebb4]{margin:0 %?20?%;padding:0 10px;background:#e50011;color:#fff;text-align:center;height:%?50?%;line-height:%?50?%;font-size:%?24?%}.order_cancel[data-v-0d71ebb4]{margin:0 %?20?%;padding:0 10px;background:#f76260;color:#fff;text-align:center;height:%?50?%;line-height:%?50?%;font-size:%?24?%}.isall[data-v-0d71ebb4]{color:#999;hegiht:%?60?%;line-height:%?60?%;margin:%?30?% 0;text-align:center}",""]),e.exports=t},3416:function(e,t,i){"use strict";i.r(t);var a=i("86d5"),r=i("d023");for(var n in r)"default"!==n&&function(e){i.d(t,e,(function(){return r[e]}))}(n);i("0d9e");var s,o=i("f0c5"),d=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,"0d71ebb4",null,!1,a["a"],s);t["default"]=d.exports},"86d5":function(e,t,i){"use strict";var a,r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"page"},[i("v-uni-view",{staticClass:"tab weui-flex"},[i("v-uni-view",{staticClass:"weui-flex__item tab_item",class:0==e.type?"item_in":"",attrs:{"data-type":"0"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.changeTab.apply(void 0,arguments)}}},[e._v("商品订单")]),i("v-uni-view",{staticClass:"weui-flex__item tab_item",class:1==e.type?"item_in":"",attrs:{"data-type":"1"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.changeTab.apply(void 0,arguments)}}},[e._v("特推订单")])],1),0==e.type?i("v-uni-view",{staticClass:"order_list"},[e._l(e.orderList,(function(t,a){return i("v-uni-view",{key:a,staticClass:"order_item"},[i("v-uni-view",{staticClass:"weui-flex",attrs:{"data-id":t.order_no},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.orderInfo.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"market_img"},[i("v-uni-image",{attrs:{src:e.baseUrl+t.shop_picture}})],1),i("v-uni-view",{staticClass:"order_info weui-flex__item"},[i("v-uni-view",{staticClass:"market_title"},[e._v(e._s(t.shop_title))]),i("v-uni-view",{staticClass:"order_addtime"},[e._v(e._s(t.order_addtime))])],1),i("v-uni-view",{staticClass:"order_status"},[e._v(e._s(t.status))])],1),i("v-uni-view",{staticClass:"weui-flex",staticStyle:{padding:"20upx 0"},attrs:{"data-id":t.order_no},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.orderInfo.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"order_info weui-flex__item"},[i("v-uni-view",{staticClass:"goods_info"},[e._v(e._s(t.order_title)),t.nums>1?i("v-uni-text",[e._v("等"+e._s(t.nums)+"件商品")]):e._e()],1)],1),i("v-uni-view",{staticClass:"order_amount"},[e._v("¥"),i("v-uni-text",[e._v(e._s(t.amounts))])],1)],1),i("v-uni-view",{staticClass:"weui-flex",staticStyle:{padding:"20upx 0"}},[i("v-uni-view",{staticClass:"weui-flex__item"}),i("v-uni-view",{staticClass:"order_op"},[1==t.order_paytype?i("v-uni-view",{staticClass:"order_del",attrs:{"data-orderno":t.order_no},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.delOrderInfo.apply(void 0,arguments)}}},[e._v("删除订单")]):i("v-uni-view",{staticClass:"order_cancel",attrs:{"data-orderno":t.order_no},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelOrderInfo.apply(void 0,arguments)}}},[e._v("取消订单")])],1)],1)],1)})),1==e.isall?i("v-uni-view",{staticClass:"isall"},[e._v("------没有更多了------")]):e._e()],2):e._e(),1==e.type?i("v-uni-view",{staticClass:"order_list"},[e._l(e.orderList,(function(t,a){return i("v-uni-view",{key:a,staticClass:"order_item"},[i("v-uni-view",{staticClass:"weui-flex",attrs:{"data-id":t.order_no},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.orderInfo.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"market_img"},[i("v-uni-image",{attrs:{src:e.baseUrl+t.goods_picture}})],1),i("v-uni-view",{staticClass:"order_info weui-flex__item"},[i("v-uni-view",{staticClass:"goods_info"},[e._v(e._s(t.order_title))]),""!=t.order_guige?i("v-uni-view",{staticClass:"goods_info"},[e._v("规格："+e._s(t.order_guige))]):e._e(),i("v-uni-view",{staticClass:"order_addtime"},[e._v(e._s(t.order_addtime))])],1)],1),i("v-uni-view",{staticClass:"weui-flex",staticStyle:{padding:"20upx 0"}},[i("v-uni-view",{staticClass:"order_amount"},[e._v("¥"),i("v-uni-text",[e._v(e._s(t.amounts))])],1),i("v-uni-view",{staticClass:"order_status"},[e._v(e._s(t.status))]),i("v-uni-view",{staticClass:"weui-flex__item"}),i("v-uni-view",{staticClass:"order_op"},[i("v-uni-view",{staticClass:"order_del",attrs:{"data-orderno":t.order_no},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.delOrderInfo.apply(void 0,arguments)}}},[e._v("删除订单")])],1)],1)],1)})),1==e.isall?i("v-uni-view",{staticClass:"isall"},[e._v("------没有更多了------")]):e._e()],2):e._e()],1)},n=[];i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return n})),i.d(t,"a",(function(){return a}))},9600:function(e,t,i){"use strict";(function(e){var a=i("ee27");i("99af"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(i("4976")),n={data:function(){return{baseUrl:r.default.baseUrl,userid:"",orderList:[],type:0,page:0,isall:0,info:{delta:1},titleHeight:0,statusBarHeight:0,naviBarHeight:0,superTitleHeight:0}},onLoad:function(e){var t=this,i=uni.getStorageSync("userid");t.userid=i;var a=e.id,n=e.act,s=e.otype,o=e.type;1==o?(t.type=o,t.resetAttr(),t.getUserSuperOrders()):t.getUserOrders(),""!=a&&"payfee"==n&&("super"==s?uni.navigateTo({url:"/pages/orders/superinfo?id="+a+"&act="+n,success:function(e){},fail:function(){},complete:function(){}}):uni.navigateTo({url:"/pages/orders/orderinfo?id="+a+"&act="+n,success:function(e){},fail:function(){},complete:function(){}})),t.titleHeight=r.default.titleHeight,t.statusBarHeight=r.default.statusBarHeight,t.naviBarHeight=r.default.naviBarHeight,t.superTitleHeight=r.default.titleHeight+50,t.titleHeight=0},onPullDownRefresh:function(){var t=this;uni.showNavigationBarLoading(),e.log("下拉刷新中...");var i=uni.getStorageSync("userid");t.userid=i,t.resetAttr(),1==t.type?t.getUserSuperOrders():t.getUserOrders(),uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},onReachBottom:function(){var e=this;e.loadmore()},methods:{changeTab:function(t){var i=this,a=t.currentTarget.dataset.type;e.log(a),a!=i.type&&(i.resetAttr(),1==a?i.getUserSuperOrders():i.getUserOrders(),i.type=a)},resetAttr:function(){var e=this;e.page=0,e.isall=0,e.orderList=[]},delOrderInfo:function(t){var i=this,a=t.currentTarget.dataset.orderno;uni.showModal({title:"提示",content:"确定要删除吗？",success:function(t){if(t.confirm){if(e.log(a),1==i.type)var n=r.default.apiUrl+"orders/delSuperOrderInfo";else n=r.default.apiUrl+"orders/delOrderInfo";uni.request({url:n,method:"GET",data:{order_no:a},success:function(t){e.log(t),uni.showToast({title:"删除成功",icon:"none"}),i.resetAttr(),1==i.type?i.getUserSuperOrders():i.getUserOrders()},fail:function(){},complete:function(){}}),e.log("用户点击确定")}else t.cancel&&e.log("用户点击取消")}})},cancelOrderInfo:function(t){var i=this,a=t.currentTarget.dataset.orderno;uni.showModal({title:"提示",content:"确定要取消订单吗？",success:function(t){if(t.confirm){e.log(a);var n=r.default.apiUrl+"orders/cancelOrderInfo";uni.request({url:n,method:"GET",data:{orderno:a},success:function(t){e.log(t),uni.showToast({title:"取消成功",icon:"none"}),i.resetAttr(),i.getUserOrders()},fail:function(){},complete:function(){}}),e.log("用户点击确定")}else t.cancel&&e.log("用户点击取消")}})},getUserOrders:function(){var t=this,i=uni.getStorageSync("userid"),a=t.isall;if(e.log("isall",a),1==a)return!1;uni.request({url:r.default.apiUrl+"orders/getUserOrders",method:"GET",data:{userid:i,page:t.page+1},success:function(i){e.log(i),t.orderList=t.orderList.concat(i.data.order_list),t.isall=i.data.isall,t.page=i.data.page},fail:function(){},complete:function(){}})},getUserSuperOrders:function(){var t=this,i=uni.getStorageSync("userid"),a=t.isall;if(e.log("isall",a),1==a)return!1;uni.request({url:r.default.apiUrl+"orders/getUserSuperOrders",method:"GET",data:{userid:i,page:t.page+1},success:function(i){e.log(i),t.orderList=t.orderList.concat(i.data.order_list),t.isall=i.data.isall,t.page=i.data.page},fail:function(){},complete:function(){}})},loadmore:function(e){var t=this;t.type;t.getUserOrders()},orderInfo:function(e){var t=this,i=e.currentTarget.dataset.id,a=t.type;1==a?uni.navigateTo({url:"/pages/orders/superinfo?id="+i,success:function(e){},fail:function(){},complete:function(){}}):uni.navigateTo({url:"/pages/orders/orderinfo?id="+i,success:function(e){},fail:function(){},complete:function(){}})}}};t.default=n}).call(this,i("5a52")["default"])},d023:function(e,t,i){"use strict";i.r(t);var a=i("9600"),r=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=r.a},f646:function(e,t,i){var a=i("2fc2");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var r=i("4f06").default;r("838ddcca",a,!0,{sourceMap:!1,shadowMode:!1})}}]);