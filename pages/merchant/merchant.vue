<template>
	<view class="page">			
		
		
		<view class="weui-flex category">
			<view class="weui-flex__item">
				<scroll-view scroll-x="true" class="cat_list" :scroll-left="scrollLeft">
					<view class="cat_item" :class="cid == 0 ? 'item_in' : ''" @click="changeSubCat" data-cid="0" data-cindex="-1">全部</view>
					<view class="cat_item" v-for="(item,index) in currentCatList" :key="index" :class="cid == item.cat_id ? 'item_in' : ''" @click="changeSubCat" :data-cid="item.cat_id" :data-cindex="index">{{ item.cat_name }}</view>
				</scroll-view>
			</view>
			<view class="cat_more" @click="togglePopCategory"><image src="../../static/images/cat_more.png" mode=""></image></view>
		</view>
		<view class="page_blank"></view>
		<view class="shop_list">
			<view class="shop_item weui-flex" v-for="(item,index) in shopList" :key="index">
				<view class="shop_logo" @click="jumpUrl" :data-url="'/pages/merchant/shop?id='+item.shop_id">
					<image :src="baseUrl + item.shop_logo" mode="" class="login_img"></image>
				</view>
				<view class="weui-flex__item" @click="jumpUrl" :data-url="'/pages/merchant/shop?id='+item.shop_id">
					<view class="shop_title">{{ item.shop_title }}</view>
					<view class="weui-flex">
						<view class="shop_info_ico"><image src="../../static/images/phone.png" mode=""></image></view>
						<view class="shop_mobile weui-flex__item">联系商家</view>
						<view class="shop_info_desc" v-if="item.distance < 1">{{ item.distance*1000 }}m</view>
						<view class="shop_info_desc" v-else>{{ item.distance }}km</view>
					</view>					
					<view class="weui-flex">
						<view class="shop_info_ico"><image src="../../static/images/addr.png" mode=""></image></view>
						<view class="shop_addr weui-flex__item">{{ item.shop_address }}</view>
					</view>
					<view class="shop_tags" v-if="item.shopTags != ''">
						<view class="shop_tags_item" v-for="(items,indexs) in item.shopTags " :key="indexs">{{ items }}</view>
					</view>
					<view class="shop_zhuying">{{ item.shop_zhuying }}</view>
				</view>
			</view>
			<view class="isall" v-if="isall == 1">
				<text>我是有底线的</text>
			</view>
		</view>
		
		<view class="pop_bg" v-if="pop_category" @click="togglePopCategory"></view>
		<view class="pop_category" v-if="pop_category" >
			<view class="pop_category_title weui-flex">
				<view class="pop_category_tname weui-flex__item">请选择分类</view>
				<view class="pop_category_close" @click="togglePopCategory"><image src="../../static/images/m4.png" mode=""></image></view>
			</view>
			<view class="pop_category_block weui-flex">
				<view class="pop_category_block_left">
					<view class="pop_big_catlist">
						<view class="pop_big_catitem" :class="findex == index ? 'pop_big_catitem_in' : ''" v-for="(item,index) in bigCatList" :key="index" @click="changePopBigCat" :data-index="index">{{ item.cat_name }}</view>
					</view>
				</view>
				<view class="pop_category_block_right weui-flex__item">
					<view class="pop_sub_catlist">
						<view class="pop_sub_catitem" :class="cid == 0 ? 'pop_sub_catitem_in' : ''" @click="changePopCat" :data-fid="fid" :data-cid="'0'" :data-cindex="'-1'">全部</view>
						<view class="pop_sub_catitem" :class="cid == item.cat_id ? 'pop_sub_catitem_in' : ''" v-for="(item,index) in tempCurrentCatList" :key="index" @click="changePopCat" :data-fid="item.cat_fid" :data-cid="item.cat_id" :data-cindex="index">{{ item.cat_name }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				baseUrl:common.baseUrl,
				info:{
					icon_color:'white',
					delta:1,
				},
				scrollTop:0,		//滚动高度
				header_bg_alpha:0,	//头部背景色透明度
				currentPagesLen:1,	//页面数量，看是否返回
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				
				fid:0,					//大类ID
				cid:0,					//小类ID
				tempCurrentCatList:[],	//切换类别时的临时数组
				currentCatList:[],		//当前滚动的类别列表
				bigCatList:[],			//大类别列表
				subCatList:[],			//小类列表
				cindex:-1,				//当前选择中类别
				findex:0,				//弹出层切换类别参数
				scrollLeft:0,			//子栏目滚动距离
				
				shopList:[],			//店铺列表
				isall:0,				//是否显示完
				page:0,					//当前页码
				pop_category:false,
				
				canbuy:1,
			};
		},
		onLoad(e) {
			var that = this
			var fid = e.fid			
			if(fid > 0){
				that.fid = fid
			}
			var cid = e.cid
			console.log("cid",e)
			if(cid > 0){
				that.cid = cid
			}
			
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			//获取类别列表
			that.getCatList();
			//获取店铺列表
			that.getCatShopList();
			
			// var currentPages = getCurrentPages()
			// var currentPagesLen = currentPages.length
			// that.currentPagesLen = currentPagesLen;
			
			
		},
		// onPageScroll(e) {
		// 	let that = this
		// 	that.scrollTop = e.scrollTop
		// 	if(e.scrollTop < 100){
		// 		that.header_bg_alpha = e.scrollTop/100
		// 	}else{
		// 		that.header_bg_alpha = 1
		// 	}
		// 	console.log(that.header_bg_alpha)
		// },
		
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  
		  that.resetAttr();
		  //获取类别列表
		  that.getCatList();
		  //获取店铺列表
		  that.getCatShopList();
		  
		  console.log('下拉刷新中...');		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		onShareAppMessage(res) {
			var that = this
			if (res.from === 'button') {// 来自页面内转发按钮
			  console.log(res.target)
			}
			var userInfo = uni.getStorageSync('userInfo');
			if(userInfo.users_id > 0){
				var shareUrl = '/pages/merchant/merchant?tjuid='+userInfo.users_id
			}else{
				var shareUrl = '/pages/merchant/merchant'
			}
			return {
			  title: '商家活动广告平台——众晨星',
			  path: shareUrl,
			}
		},
		onReachBottom(){
			var that = this
			that.loadmore();
		},
		methods: {
			//切换弹出层小类
			changePopCat(e){
				var that = this
				var cindex = e.currentTarget.dataset.cindex
				var fid = e.currentTarget.dataset.fid
				var cid = e.currentTarget.dataset.cid
				if(cid != that.cid){
					
					if(fid != that.fid){
						//切换大类及小类
						that.fid = fid
						that.currentCatList = that.subCatList[that.findex]
						
					}
					//只切换小类
					that.cid = cid
					that.cindex = cindex
					that.scrollLeft = cindex*75;
					that.resetAttr();
					//重新获取数据
					that.getCatShopList();
					that.togglePopCategory();
				}
			},
			//
			togglePopCategory(){
				var that = this
				that.pop_category = !that.pop_category
			},
			//切换小类
			changePopBigCat(e){
				var that = this
				var index = e.currentTarget.dataset.index
				var subCatList = that.subCatList
				that.tempCurrentCatList = subCatList[index]
				that.findex = index
			},
			//切换小类
			changeSubCat(e){
				var that = this
				var cid = e.currentTarget.dataset.cid
				var cindex = e.currentTarget.dataset.cindex
				that.cid = cid
				that.cindex = cindex
				that.scrollLeft = cindex*75;
				that.resetAttr();
				that.getCatShopList();
			},
			//重置参数
			resetAttr(){
				var that = this
				that.page = 0;
				that.isall = 0;
				that.shopList = []
			},
			//获取类别列表
			getCatList(){
				var that = this
				uni.request({
					url: common.apiUrl + 'shop/getCatList',
					method: 'GET',
					data: {
						fid:that.fid
					},
					success: res => {
						var data = res.data
						console.log(data)
						that.bigCatList = data.big_cat_list
						that.subCatList = data.sub_cat_list
						that.currentCatList = data.current_cat_list
						that.tempCurrentCatList = data.current_cat_list
						that.fid = data.big_cat_list != '' ? data.big_cat_list[0]['cat_id'] : 0;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//加载更多
			loadmore(){
				var that = this
				that.page = that.page+1;
				that.getCatShopList();
			},
			//获取店铺列表
			getCatShopList(){
				var that = this
				var lng = uni.getStorageSync('lng');
				var lat = uni.getStorageSync('lat');
				uni.request({
					url: common.apiUrl + 'shop/getCatShopList',
					method: 'GET',
					data: {
						fid:that.fid,
						cid:that.cid,
						lng:lng,
						lat:lat,
						page:that.page+1
					},
					success: res => {
						var data = res.data
						console.log(data)
						var shopList = data.shop_list
						for(var i=0;i<shopList.length;i++){
							that.shopList.push(shopList[i])
						}						
						that.isall = data.isall
						that.canbuy = data.canbuy
						console.log("shopList",that.shopList)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//电话联系
			phoneContact(e){
				var that = this
				var index = e.currentTarget.dataset.index
				var shopList = that.commendShopList
				var mobile = e.currentTarget.dataset.mobile
				uni.makePhoneCall({
				    phoneNumber: mobile 
				});
			},
			//一键导航
			goaddr(e){
				var that = this
				var index = e.currentTarget.dataset.index
				var shopList = that.shopList
				var lat = shopList[index].shop_lat
				var lng = shopList[index].shop_lng
				
				console.log(parseFloat(lat));
				console.log(parseFloat(lng));
				uni.openLocation({
				    latitude: parseFloat(lat),
				    longitude: parseFloat(lng),
				    success: function () {
				        console.log('success');
				    }
				});
			},
			navBack(){
				uni.navigateBack({
					delta:1
				})
			},
			navHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			//跳转
			jumpUrl(e){
				var that = this
				if(that.canbuy == 1){
					var url = e.currentTarget.dataset.url
					uni.navigateTo({
						url:url,
					});
				}
				
			}
		}
	}
</script>

<style>
page{background:#fff;}
.page_header{background:#00aafa;}

.category{background:#00aafa;width:100%;height:80upx;position:fixed;z-index:6666;}
.cat_list{width:680upx;overflow:scroll; white-space: nowrap;}
.cat_item{height:80upx;line-height:80upx;font-size:28upx;display:inline-block;vertical-align:top;width:150upx;text-align: center;color:#95edff}
.item_in{color:#fff;font-weight: 700;line-height:76upx;border-bottom:6upx solid #fff;height:76upx;}
.cat_more{width:40upx;height:40upx;padding:20upx;}
.cat_more image{width:40upx;height:40upx;}


/****店铺列表***/

.shop_list{width:100%;background:#fff;}
/*  #ifdef  H5  */
.shop_list{top:80upx;min-height:100upx;}
/*  #endif */
.shop_item{padding:20upx;}
.shop_logo{width:170upx;height:170upx;border-radius: 6upx;border:1upx solid #eee;margin-right:20upx;position:relative}
.shop_logo .login_img{width:170upx;height:170upx;border-radius: 6upx;}
.pifa_ico{position:absolute;z-index:10;top:-10upx;left:0;width:80upx;height:40upx;}
.shop_title{font-size:32upx;font-weight: 700;}
.shop_addr{color:#666;padding:10upx 0;}
.shop_tags{padding:10upx 0;}
.shop_tags_item{border:1upx solid #d9d9d9;color:#ff6408;margin-right:10upx;padding:0 5upx;display:inline-block;font-size:20upx;border-radius:4upx;}
.shop_mobile{color:#f40;font-size:28upx;line-height:60upx;}
.shop_zhuying{background:#f7fbfd;color:#819caa;padding:5upx 10upx;border-radius: 6upx;}
.shop_info_ico{width:30upx;height:30upx;padding:15upx;}
.shop_info_ico image{width:30upx;height:30upx;display: block;}
.shop_info_desc{line-height:60upx;color:#999}

/****全部***/
.isall{width:100%;text-align:center;color:#ccc;margin:20upx 0;border-bottom:1upx solid #f1f1f1;height:20upx;}
.isall text{padding:0 40upx;background:#fff;position:relative;line-height:40upx;}

/*****弹出层*******/
.pop_bg{background:rgba(0,0,0,.7);position:fixed;top:0;bottom:0;width:100%;z-index:100;}
.pop_category{background:#fff;position:fixed;top:0;width:100%;z-index:7777;}
/*  #ifdef  H5  */
.pop_category{top:0upx;}
/*  #endif */
.pop_category_title{background:#f6f6f6;padding:0 20upx;height:80upx;line-height:80upx;}
.pop_category_tname{font-size:28upx;font-weight: 700;color:#333;line-height:80upx;}
.pop_category_close{width:40upx;height:40upx;padding:20upx;}
.pop_category_close image{width:40upx;height:40upx;}
.pop_category_block{width:100%;}
.pop_category_block_left{width:250upx;text-align: center;background:#fdfdff;}
.pop_big_catlist{width:100%;max-height: 800upx;overflow: scroll;}
.pop_big_catitem{font-size:30upx;color:#666;border-left:6upx solid #fdfdff;padding:30upx 0;height:60upx;line-height:60upx;}
.pop_big_catitem_in{border-left:6upx solid #00aafa;background:#fff;}
.pop_category_block_right{padding:0 20upx;}
.pop_sub_catlist{padding:20upx 0;max-height: 760upx;overflow: scroll;}
.pop_sub_catitem{height:60upx;line-height:60upx;background:#fafafa;display:inline-block;margin:0 20upx 20upx;font-size:28upx;width:180upx;text-align:center;}
.pop_sub_catitem_in{background:#00aafa;color:#fff;}
</style>

