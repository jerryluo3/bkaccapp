(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-shop-goods-editcat"],{"0e7d":function(t,a,i){"use strict";(function(t){var e=i("ee27");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=e(i("4976")),c={data:function(){return{sjApiUrl:n.default.sjApiUrl,baseUrl:n.default.baseUrl,catid:0,shopInfo:[],cat:[],cat_img:"",catList:[],catIndex:"",cat_fid:0,category:[],cat_status:0}},onLoad:function(a){var i=this,e=uni.getStorageSync("shopInfo");i.shopInfo=e,t.log(e);var n=a.id;n>0&&(i.catid=n),i.getCatInfo()},onPullDownRefresh:function(){var a=this;uni.showNavigationBarLoading(),t.log("下拉刷新中..."),a.getCatInfo(),uni.hideNavigationBarLoading(),uni.stopPullDownRefresh()},methods:{checkboxChange:function(a){var i=this,e=a.detail.value;t.log(e),i.goods_tags=e},tapStatus:function(t){var a=this;a.cat_status=t.currentTarget.dataset.status},formSubmit:function(t){var a=this,i=t.detail.value;if(""!=a.catIndex)var e=a.catList[a.catIndex].cat_id;else e=0;var c=i.cat_name,o=a.cat_img,s=a.cat_status,d=uni.getStorageSync("shopInfo");if(""==c)return uni.showToast({title:"请输入类别名称",duration:1e3,icon:"none"}),!1;uni.request({url:n.default.sjApiUrl+"merchant/editCat",method:"GET",data:{cat_id:a.catid,cat_fid:e,cat_name:c,cat_img:o,cat_status:s,cat_shopid:d.shop_id},success:function(t){var a=t.data;if(0!=a.code)return uni.showToast({title:a.msg,mask:!1,duration:1500}),!1;uni.showToast({title:"操作成功",mask:!1,duration:1500}),uni.navigateTo({url:"/pages/shop/goods/cat"})},fail:function(){},complete:function(){}})},pickerCat:function(a){var i=this,e=a.target.value;i.catIndex=e,t.log(),i.cat_fid=i.catList[e].cat_id},getMerchantFistCatList:function(){var a=this,i=uni.getStorageSync("shopInfo");uni.request({url:n.default.sjApiUrl+"merchant/getMerchantFistCatList",method:"GET",data:{shop_id:i.shop_id},success:function(i){t.log(i);var e=i.data;a.catList=e.cat_list;for(var n=[],c=0;c<e.cat_list.length;c++)n.push(e.cat_list[c].cat_name);a.category=n,t.log(n,"category")},fail:function(){},complete:function(){}})},getCatInfo:function(){var a=this;if(0==a.catid)return a.getMerchantFistCatList(),!1;uni.request({url:n.default.sjApiUrl+"merchant/getCatInfo",method:"GET",data:{catid:a.catid},success:function(i){var e=i.data;t.log(i.data),a.cat=e.cat,a.cat_img=e.cat.cat_img,a.cat_status=e.cat.cat_status,a.cat_fid=e.cat.cat_fid,a.catList=e.cat_list;for(var n=[],c=0;c<e.cat_list.length;c++)e.cat.cat_id==e.cat_list[c].cat_id&&(a.catIndex=c,t.log(c)),n.push(e.cat_list[c].cat_name);a.category=n},fail:function(){},complete:function(){}})},jumpUrl:function(t){var a=t.currentTarget.dataset.url;uni.navigateTo({url:a})},changeImg:function(){var a=this;uni.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(i){var e=i.tempFilePaths;t.log(e),uni.uploadFile({url:n.default.sjApiUrl+"merchant/saveCatImg",filePath:e[0],name:"file",formData:{},success:function(i){t.log(i.data);var e=JSON.parse(i.data);a.cat_img=e.uploadfile}})}})}}};a.default=c}).call(this,i("5a52")["default"])},"10ca":function(t,a,i){"use strict";var e,n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"page"},[e("v-uni-form",{on:{submit:function(a){arguments[0]=a=t.$handleEvent(a),t.formSubmit.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-form"},[e("v-uni-view",{staticClass:"uni-input-row uni-flex row_item"},[e("v-uni-view",{staticClass:"uni-label labelname"},[t._v("商品类别")]),e("v-uni-view",{staticClass:"uni-flex-item"},[e("v-uni-picker",{attrs:{mode:"selector",value:t.catIndex,range:t.category},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.pickerCat.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-input"},[t._v(t._s(""==t.catIndex?"上级类别":t.category[t.catIndex]))])],1)],1)],1),e("v-uni-view",{staticClass:"uni-input-row uni-flex row_item"},[e("v-uni-view",{staticClass:"uni-label labelname"},[t._v("类别名称")]),e("v-uni-view",{staticClass:"uni-flex-item"},[e("v-uni-input",{staticClass:"input_txt",attrs:{type:"text",name:"cat_name",placeholder:"请输入价格"},model:{value:t.cat.cat_name,callback:function(a){t.$set(t.cat,"cat_name",a)},expression:"cat.cat_name"}})],1)],1),e("v-uni-view",{staticClass:"uni-input-row uni-flex row_item",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.changeImg.apply(void 0,arguments)}}},[e("v-uni-view",{staticClass:"uni-label labelname"},[t._v("类别图标")]),e("v-uni-view",{staticClass:"uni-flex-item"},[null!=t.cat.cat_img||""!=t.cat_img?e("v-uni-image",{staticClass:"cat_img",attrs:{src:t.baseUrl+t.cat_img}}):e("v-uni-image",{staticClass:"cat_img",attrs:{src:i("66ce")}})],1)],1),e("v-uni-view",{staticClass:"uni-input-row uni-flex row_item"},[e("v-uni-view",{staticClass:"uni-label labelname"},[t._v("类别状态")]),e("v-uni-view",{staticClass:"uni-flex-item"},[e("v-uni-label",{staticClass:"radio",attrs:{"data-status":"1"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.tapStatus.apply(void 0,arguments)}}},[e("v-uni-radio",{attrs:{value:"1",checked:1==t.cat_status}}),t._v("通过")],1),e("v-uni-label",{staticClass:"radio",attrs:{"data-status":"0"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.tapStatus.apply(void 0,arguments)}}},[e("v-uni-radio",{attrs:{value:"0",checked:0==t.cat_status}}),t._v("待审")],1)],1)],1)],1),e("v-uni-view",{staticStyle:{width:"100%",height:"120upx"}}),e("v-uni-button",{staticClass:"btn-submit",attrs:{type:"warn","form-type":"submit"}},[t._v("提交")])],1)],1)},c=[];i.d(a,"b",(function(){return n})),i.d(a,"c",(function(){return c})),i.d(a,"a",(function(){return e}))},"41f1":function(t,a,i){var e=i("24fb");a=e(!1),a.push([t.i,".uni-form[data-v-fc2b196c]{background:#fff;font-size:%?28?%}.row_item[data-v-fc2b196c]{border-bottom:%?1?% solid #eee}.item_title[data-v-fc2b196c]{background:#eee}.upload_img[data-v-fc2b196c]{width:%?150?%;height:%?150?%;border:%?1?% solid #eee}.upload_img uni-image[data-v-fc2b196c]{width:%?120?%;height:%?120?%;margin:%?15?%}.labelname[data-v-fc2b196c]{font-size:%?28?%}.input_txt[data-v-fc2b196c]{font-size:%?28?%}.btn-submit[data-v-fc2b196c]{position:fixed;bottom:0;border-radius:0;width:100%;z-index:1000}.addbtn[data-v-fc2b196c]{border:%?1?% solid #ccc;border-radius:%?6?%;height:%?60?%;line-height:%?60?%}.attr_item[data-v-fc2b196c]{width:100%;margin:%?5?% 0;display:block}.delbtn[data-v-fc2b196c]{width:%?120?%;height:%?82?%;line-height:%?82?%;text-align:center;background:#00b26a;position:absolute;top:0;right:0;z-index:10;color:#fff}.attrinput[data-v-fc2b196c]{background:#fafafa;display:inline-block;border:%?1?% solid #ddd;width:90%}.attr_block[data-v-fc2b196c]{padding:%?20?%;display:block}.attr_del[data-v-fc2b196c]{width:%?160?%}.select[data-v-fc2b196c]{border:%?1?% solid #ddd}.guige_item[data-v-fc2b196c]{background:#ebebeb;padding:%?10?%;margin:%?10?% 0}.imports[data-v-fc2b196c]{height:%?80?%;width:%?80?%;position:fixed;top:%?150?%;background:rgba(0,0,0,.3);right:%?30?%;border-radius:50%}.imports uni-image[data-v-fc2b196c]{width:%?50?%;height:%?50?%;margin:%?15?%}.popbg[data-v-fc2b196c]{background:rgba(0,0,0,.8);position:fixed;top:0;left:0;bottom:0;right:0;z-index:1000}.pop_import[data-v-fc2b196c]{background:#fff;width:%?670?%;position:fixed;top:%?40?%;bottom:%?40?%;left:%?40?%;z-index:2000}.pop_headr_title[data-v-fc2b196c]{width:100%;height:%?80?%;line-height:%?80?%;text-align:center;font-size:%?32?%;background:#eaeaea}.goods_search[data-v-fc2b196c]{padding:%?20?%;text-align:center;background:#fff;height:%?60?%;width:%?630?%;border-bottom:%?1?% solid #eee}.search_txt[data-v-fc2b196c]{border:%?1?% solid #ddd;border-radius:%?60?%;height:%?60?%;magin:%?10?% %?20?%;background:#fafafa;font-size:%?28?%}.cat_img[data-v-fc2b196c]{width:%?100?%;height:%?100?%;border:%?1?% solid #eee;padding:%?10?%}.goods_bnts[data-v-fc2b196c]{text-align:right;padding:%?20?%}.goods_op[data-v-fc2b196c]{width:%?100?%;border-radius:%?6?%;text-align:center;color:#333;height:%?60?%;line-height:%?60?%;display:inline-block;margin:0 %?10?%;background:#f76260;color:#fff}.goods_btn_green_default[data-v-fc2b196c]{background:#0a98d5}.goods_btn_green[data-v-fc2b196c]{background:#00b26a}.goods_btn_yellow[data-v-fc2b196c]{background:#ff643d}.pop_close[data-v-fc2b196c]{background:#eaeaea;color:#333;text-align:center;border-radius:%?60?%;height:%?60?%;line-height:%?60?%;font-size:%?28?%;position:absolute;bottom:%?20?%;width:%?610?%;left:%?30?%}",""]),t.exports=a},"4e95":function(t,a,i){"use strict";i.r(a);var e=i("0e7d"),n=i.n(e);for(var c in e)"default"!==c&&function(t){i.d(a,t,(function(){return e[t]}))}(c);a["default"]=n.a},6154:function(t,a,i){"use strict";i.r(a);var e=i("10ca"),n=i("4e95");for(var c in n)"default"!==c&&function(t){i.d(a,t,(function(){return n[t]}))}(c);i("c293");var o,s=i("f0c5"),d=Object(s["a"])(n["default"],e["b"],e["c"],!1,null,"fc2b196c",null,!1,e["a"],o);a["default"]=d.exports},"66ce":function(t,a,i){t.exports=i.p+"static/img/jia_disable.60023a8b.png"},"9a1c":function(t,a,i){var e=i("41f1");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=i("4f06").default;n("58a7fedf",e,!0,{sourceMap:!1,shadowMode:!1})},c293:function(t,a,i){"use strict";var e=i("9a1c"),n=i.n(e);n.a}}]);