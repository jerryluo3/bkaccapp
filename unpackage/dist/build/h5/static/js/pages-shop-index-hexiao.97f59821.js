(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-index-hexiao"],{"06a8":function(t,e,n){"use strict";var i=n("5b6d"),a=n.n(i);a.a},1584:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"page"},[n("v-uni-view",{staticClass:"hexiao_header"},[n("v-uni-view",{staticClass:"hexiao_btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.scanOrder.apply(void 0,arguments)}}},[t._v("扫码核销订单")])],1),""!=t.orderList?n("v-uni-view",{staticClass:"order_info"},[n("v-uni-view",{staticClass:"order_basic"},[t._v("订单信息 ("+t._s(t.orderList[0].order_no)+")")]),n("v-uni-view",{staticClass:"order_list"},t._l(t.orderList,(function(e,i){return n("v-uni-view",{key:i,staticClass:"order_item weui-flex"},[n("v-uni-view",{staticClass:"weui-flex__item order_title"},[t._v(t._s(e.order_title))]),n("v-uni-view",{staticClass:"order_nums"},[t._v("x"+t._s(e.order_nums))]),n("v-uni-view",{staticClass:"order_amount"},[t._v("¥"+t._s(e.order_amount))])],1)})),1),n("v-uni-view",{staticClass:"hexiao_submit",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.hexiaosubmit.apply(void 0,arguments)}}},[t._v("确定核销")])],1):t._e()],1)},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},"26ac":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".hexiao_header[data-v-16467dcc]{background:#fff;padding:%?20?%}.hexiao_header .hexiao_btn[data-v-16467dcc]{background:#007aff;color:#fff;height:%?80?%;line-height:%?80?%;text-align:center;font-size:%?32?%;border-radius:%?10?%}.order_info[data-v-16467dcc]{background:#fff;margin-top:%?20?%;padding:%?20?%}.order_basic[data-v-16467dcc]{font-size:%?32?%;line-height:%?60?%}.order_list[data-v-16467dcc]{padding:%?20?% 0}.order_item[data-v-16467dcc]{border-bottom:%?1?% solid #eee;line-height:%?60?%;padding:%?10?% 0}.order_title[data-v-16467dcc]{font-size:%?28?%}.order_nums[data-v-16467dcc]{width:%?100?%;font-size:%?28?%;text-align:center}.order_amount[data-v-16467dcc]{width:%?150?%;font-size:%?28?%;text-align:center}.hexiao_submit[data-v-16467dcc]{background:#f40;color:#fff;height:%?80?%;line-height:%?80?%;margin:%?30?% 0;text-align:center;font-size:%?32?%;border-radius:%?10?%}",""]),t.exports=e},"3c42":function(t,e,n){"use strict";n.r(e);var i=n("1584"),a=n("fd87");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("06a8");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"16467dcc",null,!1,i["a"],r);e["default"]=c.exports},"5b6d":function(t,e,n){var i=n("26ac");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("45242347",i,!0,{sourceMap:!1,shadowMode:!1})},"9a34":function(t,e,n){"use strict";(function(t){var i=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("4976")),o={data:function(){return{shopInfo:[],orderList:[],istuan:0}},onLoad:function(t){uni.getStorageSync("shopInfo")},onPullDownRefresh:function(){uni.showNavigationBarLoading(),t.log("下拉刷新中..."),uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},methods:{jumpUrl:function(t){var e=t.currentTarget.dataset.url;uni.navigateTo({url:e})},hexiaosubmit:function(){var t=this;uni.showModal({title:"提示",content:"确定核销订单吗？",success:function(e){e.confirm&&t.hexiaoOrder()},fail:function(){},complete:function(){}})},hexiaoOrder:function(){var t=this,e=t.orderno,n=uni.getStorageSync("shopInfo");uni.request({url:a.default.apiUrl+"merchant/hexiaoOrder",method:"GET",data:{shopid:n.shop_id,orderno:e,istuan:t.istuan},success:function(t){0==t.data.code?uni.showToast({title:"核销成功",icon:"success",duration:1500,success:function(t){setTimeout((function(){uni.reLaunch({url:"/pages/index/index"})}),1500)}}):uni.showToast({title:t.data.msg,duration:1500})},fail:function(){},complete:function(){}})},scanOrder:function(){var e=this;uni.scanCode({success:function(n){t.log("条码类型："+n.scanType),t.log("条码内容："+n.result),n.result&&(e.orderno=n.result,e.getMerchantHexiaoOrderInfo())}})},getMerchantHexiaoOrderInfo:function(){var e=this,n=e.orderno,i=uni.getStorageSync("shopInfo");uni.request({url:a.default.apiUrl+"merchant/getMerchantHexiaoOrderInfo",method:"GET",data:{shopid:i.shop_id,orderno:n},success:function(n){0==n.data.code?(e.orderList=n.data.order_list,e.istuan=n.data.istuan,t.log(e.orderList)):uni.showToast({title:n.data.msg,icon:"none",duration:1500})},fail:function(){},complete:function(){}})}}};e.default=o}).call(this,n("5a52")["default"])},fd87:function(t,e,n){"use strict";n.r(e);var i=n("9a34"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a}}]);