(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-goods-goods"],{5810:function(t,o,a){"use strict";a.r(o);var i=a("6fdf"),s=a.n(i);for(var d in i)"default"!==d&&function(t){a.d(o,t,(function(){return i[t]}))}(d);o["default"]=s.a},"6fdf":function(t,o,a){"use strict";(function(t){var i=a("ee27");a("a434"),Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var s=i(a("4976")),d={data:function(){return{key:"",shopInfo:[],goodsList:[]}},onLoad:function(){var t=this;uni.getStorageSync("shopInfo"),uni.getStorageSync("utype");t.getGoodsList()},onPullDownRefresh:function(){var o=this;uni.showNavigationBarLoading(),t.log("下拉刷新中..."),o.getGoodsList(),uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},methods:{inputkeys:function(t){var o=this,a=t.detail.value;o.key=a,o.getGoodsList()},delGoods:function(t){var o=this,a=t.currentTarget.dataset.goodsid,i=t.currentTarget.dataset.index;uni.showModal({title:"提示",content:"确定要删除吗？",success:function(t){t.confirm&&uni.request({url:s.default.sjApiUrl+"merchant/delgoods",method:"GET",data:{goodsid:a},success:function(t){var a=t.data;0==a.code&&(uni.showToast({title:"操作成功",mask:!1,duration:1500}),o.goodsList.splice(i,1))},fail:function(){},complete:function(){}})}})},optionGoods:function(o){var a=this,i=o.currentTarget.dataset.goodsid,d=o.currentTarget.dataset.status,e=o.currentTarget.dataset.index;uni.request({url:s.default.sjApiUrl+"merchant/optionGoods",method:"GET",data:{goodsid:i,status:d},success:function(o){t.log(o);o.data;var i=1==d?0:1;a.goodsList[e].goods_status=i,uni.showToast({title:"操作成功",duration:1e3,icon:"success"})},fail:function(){},complete:function(){}})},getGoodsList:function(){var t=this,o=uni.getStorageSync("shopInfo");uni.request({url:s.default.sjApiUrl+"merchant/getGoodsList",method:"GET",data:{shop_id:o.shop_id,key:t.key},success:function(o){t.goodsList=o.data.goods_list},fail:function(){},complete:function(){}})},jumpUrl:function(t){var o=t.currentTarget.dataset.url;uni.navigateTo({url:o})}}};o.default=d}).call(this,a("5a52")["default"])},ac95:function(t,o,a){"use strict";var i,s=function(){var t=this,o=t.$createElement,a=t._self._c||o;return a("v-uni-view",{staticClass:"page"},[a("v-uni-view",{staticClass:"goods_add",attrs:{"data-url":"/pages/shop/goods/editgoods"},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.jumpUrl.apply(void 0,arguments)}}},[t._v("添加商品")]),a("v-uni-view",{staticClass:"goods_search"},[a("v-uni-input",{staticClass:"search_txt",attrs:{type:"text",value:"",placeholder:"搜索内容"},on:{input:function(o){arguments[0]=o=t.$handleEvent(o),t.inputkeys.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"goods_list"},t._l(t.goodsList,(function(o,i){return a("v-uni-view",{key:i,staticClass:"goods_item"},[a("v-uni-view",{staticClass:"goods_info uni-flex"},[a("v-uni-view",{staticClass:"goods_img"},[0==o.goods_status?a("v-uni-view",{staticClass:"mask"},[t._v("已下架")]):t._e(),a("v-uni-image",{attrs:{src:o.goods_picture,mode:""}})],1),a("v-uni-view",{staticClass:"goods_detail uni-flex-item"},[a("v-uni-view",{staticClass:"goods_title"},[t._v(t._s(o.goods_title))]),a("v-uni-view",{staticClass:"goods_price"},[t._v(t._s(o.goods_price))])],1)],1),a("v-uni-view",{staticClass:"goods_bnts"},[a("v-uni-view",{staticClass:"goods_op goods_btn_yellow",attrs:{"data-url":"/pages/shop/goods/editgoods?id="+o.goods_id},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.jumpUrl.apply(void 0,arguments)}}},[t._v("编辑")]),1==o.goods_status?a("v-uni-view",{staticClass:"goods_op goods_btn_green_default",attrs:{"data-goodsid":o.goods_id,"data-status":o.goods_status,"data-index":i},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.optionGoods.apply(void 0,arguments)}}},[t._v("下架")]):a("v-uni-view",{staticClass:"goods_op goods_btn_green",attrs:{"data-goodsid":o.goods_id,"data-index":i,"data-status":o.goods_status},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.optionGoods.apply(void 0,arguments)}}},[t._v("上架")]),a("v-uni-view",{staticClass:"goods_op",attrs:{"data-goodsid":o.goods_id,"data-index":i},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.delGoods.apply(void 0,arguments)}}},[t._v("删除")])],1)],1)})),1)],1)},d=[];a.d(o,"b",(function(){return s})),a.d(o,"c",(function(){return d})),a.d(o,"a",(function(){return i}))},bc90:function(t,o,a){"use strict";var i=a("ce0a"),s=a.n(i);s.a},c440:function(t,o,a){"use strict";a.r(o);var i=a("ac95"),s=a("5810");for(var d in s)"default"!==d&&function(t){a.d(o,t,(function(){return s[t]}))}(d);a("bc90");var e,n=a("f0c5"),c=Object(n["a"])(s["default"],i["b"],i["c"],!1,null,"58486d9c",null,!1,i["a"],e);o["default"]=c.exports},cdac:function(t,o,a){var i=a("24fb");o=i(!1),o.push([t.i,".goods_add[data-v-58486d9c]{width:100%;text-align:center;background:#ff643d;color:#fff;font-size:%?28?%;height:%?80?%;line-height:%?80?%;position:fixed;top:0;z-index:1000}.goods_search[data-v-58486d9c]{padding:%?20?%;text-align:center;background:#fff;height:%?60?%;position:fixed;top:%?80?%;z-index:1000;width:%?710?%;border-bottom:%?1?% solid #eee}.search_txt[data-v-58486d9c]{border:%?1?% solid #ddd;border-radius:%?60?%;height:%?60?%;magin:%?10?% %?20?%;background:#fafafa;font-size:%?28?%}.goods_list[data-v-58486d9c]{margin:%?200?% 0}.goods_item[data-v-58486d9c]{background:#fff;width:100%;margin-bottom:%?20?%}.goods_info[data-v-58486d9c]{border-bottom:%?1?% solid #eee;padding:%?20?%}.goods_img[data-v-58486d9c]{width:%?100?%;height:%?100?%;position:relative}.goods_img uni-image[data-v-58486d9c]{width:%?100?%;height:%?100?%}.goods_img .mask[data-v-58486d9c]{background:rgba(0,0,0,.5);color:#fff;text-align:center;width:%?100?%;height:%?100?%;line-height:%?100?%;position:absolute;top:0;left:0;z-index:10}.goods_detail[data-v-58486d9c]{padding-left:%?20?%}.goods_title[data-v-58486d9c]{display:block;font-size:%?28?%}.goods_price[data-v-58486d9c]{color:#f30}.goods_bnts[data-v-58486d9c]{text-align:right;padding:%?20?%}.goods_op[data-v-58486d9c]{width:%?150?%;border-radius:%?6?%;text-align:center;color:#333;height:%?60?%;line-height:%?60?%;display:inline-block;margin:0 %?10?%;background:#f76260;color:#fff}.goods_btn_green_default[data-v-58486d9c]{background:#0a98d5}.goods_btn_green[data-v-58486d9c]{background:#00b26a}.goods_btn_yellow[data-v-58486d9c]{background:#ff643d}",""]),t.exports=o},ce0a:function(t,o,a){var i=a("cdac");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=a("4f06").default;s("312c9cfc",i,!0,{sourceMap:!1,shadowMode:!1})}}]);