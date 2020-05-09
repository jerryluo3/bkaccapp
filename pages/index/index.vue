<template>
	<view class="page">
		<view class="page_header" :style=" 'height:'+titleHeight +'px;background:rgba(0,170,250,'+header_bg_alpha+')' ">
			<view class="page_status_bar" :style=" 'height:'+statusBarHeight +'px' "></view>
			<view class="page_navBar" :style=" 'height:'+naviBarHeight +'px' ">
				<view class="weui-flex position_bar">
					<view class="position" @click="changePos">
						<view class="pos_ico"><image src="../../static/images/pos_ico.png" mode=""></image></view>
						{{ posname == '' ? '请选择地址' : posname }}
						<view class="pos_more"><image src="../../static/images/m3.png" mode=""></image></view>
					</view>
					<view class="weui-flex__item"></view>
				</view>
			</view>
		</view>
		<view class="page_blank" :style=" 'background:'+adsList[current]['aa_bgcolor'] "><image src="../../static/images/topbg.png"></image></view>
		
		<view class="page_top_block">
			<view class="search">
				<view class="search_txt" @click="jumpUrl" :data-url="'/pages/search/search'">搜索店铺名称</view>
			</view>
			<!--切换广告开始-->
			<view class="swiper-all">
			<swiper class="swiper" :indicator-dots="indicatorDots" @change="changeSwiper" circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in adsList" :key="index" @click="jumpAds" :data-url="item.aa_url ? item.aa_url : ''" :data-attr="item.aa_attr">
					<view class="swiper_item"><image :src="baseUrl+item.aa_picture" mode=""></image></view>
				</swiper-item>
			</swiper>
			<view class="dots">
				  <block v-for="(item,index) in adsList" :key="index">
					<view class="dot" :class="index == current ? 'active' : ''"></view>
				  </block>
			  </view>
			  </view>
			<!--切换广告结束-->
		</view>
		
		<!--导航菜单开始-->
		<view class="menus">
			<view class="menu_item" v-for="(item,index) in menuList" :key="index" @click="jumpAds" :data-url="item.am_url ? item.am_url : ''" :data-attr="item.am_attr">
				<view class="menu_ico"><image v-if="item.am_picture" :src="baseUrl + item.am_picture" mode=""></image></view>
				<view class="menu_title">{{ item.am_title }}</view>
			</view>
		</view>
		<!--导航菜单结束-->
		
		<!--半屏广告开始-->
		<view class="mid_ads">
			<view class="ads_item" v-for="(item,index) in midAdsList" :key="index" :class="index== 0 ? 'm_r_10' : ''" @click="jumpAds" :data-url="item.aa_url ? item.aa_url : ''" :data-attr="item.aa_attr">
				<image v-if="item.aa_picture" :src="baseUrl + item.aa_picture" mode=""></image>
			</view>
		</view>
		<!--半屏广告结束-->		
		
		<!--热门店铺-->
		<view class="block">
			<view class="block_title weui-flex">
				<view class="weui-flex__item block_title_name">热门活动</view>
				<view class="block_more"></view>
			</view>			
			<view class="hotshop_ads">
				<view class="ads_item" v-for="(item,index) in hotShopAdsList" :key="index" :class="index%2 == 1 ? '' : 'm_r_10'" @click="jumpShop" :data-url="'/pages/merchant/shop?id='+item.sa_shopid" :data-shopid="item.sa_shopid">
					<image v-if="item.sa_picture" :src="baseUrl + item.sa_picture" mode=""></image>
				</view>
			</view>
		</view>
		<!--热门店铺结束-->
		
		<!--推荐商家开始-->
		<view class="block">
			<view class="block_title weui-flex">
				<view class="weui-flex__item block_title_name">推荐商家</view>
				<view class="block_more" @click="goUrl" :data-url="'/pages/merchant/merchant'">更多好店 ></view>
			</view>
			<view class="shop_list">
				<view class="shop_item weui-flex" v-for="(item,index) in commendShopList" :key="index" @click="jumpShop" :data-url="'/pages/merchant/shop?id='+item.shop_id" :data-shopid="item.shop_id">
					<view class="shop_logo">
						<image v-if="item.shop_logo" :src="baseUrl + item.shop_logo" mode="" class="login_img"></image>
					</view>
					<view class="weui-flex__item">
						<view class="shop_title weui-flex__item">{{ item.shop_title }}</view>
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
						<view class="shop_tags" v-if="item.shopTags != '' || item.shopTags != null">
							<view class="shop_tags_item" v-for="(items,indexs) in item.shopTags" :key="indexs">{{ items }}</view>
						</view>
						<view class="shop_zhuying">{{ item.shop_zhuying }}</view>
					</view>
				</view>
			</view>
		</view>
		<!--推荐商家结束-->
		<!-- <button @click="dingyue" style="position: fixed;z-index:1000;bottom:0;">弹出订阅窗口</button> --> 
		<!-- <navigator url="plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=2">Go to Live Player page</navigator> -->
	</view>
</template>

<script>
import common from '../../common/common.js'
import util from '../../common/util.js'
	
export default {
	data() {
		return {
			baseUrl:common.baseUrl,
			adsList:[],		//首页切换广告列表
			indicatorDots: false,
			indicatorColor: 'rgba(0, 0, 0, .3)',
			indicatorActiveColor:'#ffffff',
			autoplay:true,
			interval:5000,
			duration:500,
			current:0,
			
			menuList:[],		//首页导航菜单列表
			midAdsList:[],		//菜单底部半屏广告
			mainYouhuiAdsList:[],	//优惠专区大图	2个
			subYouhuiAdsList:[],	//优惠专区小图	4个
			hotShopAdsList:[],		//热门店铺小图	4个
			
			commendShopList:[],		//首页推荐商家 默认10个
			canbuy:0,
			
			posname:'',		//地址名
			address:'',		//地址详情
			addressComponent:'',	//地址控件
			
			titleHeight:0,
			naviBarHeight:0,
			statusBarHeight:0,
			
			scrollTop:0,		//滚动高度
			header_bg_alpha:0,	//头部背景色透明度
			
		}
	},
	onLoad(option) {
		var that = this
		
		var lng = uni.getStorageSync('lng');
		var lat = uni.getStorageSync('lat');
		var posaddr = uni.getStorageSync('posaddr');
		var posname = uni.getStorageSync('posname');
		var postime = uni.getStorageSync('postime');
		that.lng = lng;
		that.lat = lat;
		that.posname = posname
		var ntime = (Date.parse(new Date()) / 1000);//当前时间戳
		var ltime = ntime-300;	//5分钟
		if(posaddr == '' || lng == '' || lat == '' || postime == '' || postime < ltime){
			//获取当前位置
			that.getUserPostion();
		}
		
		that.titleHeight = common.titleHeight;
		that.naviBarHeight = common.naviBarHeight;
		that.statusBarHeight = common.statusBarHeight;
		
		//首页切换广告
		that.getHomeAdsList();
		//首页导航菜单
		that.getHomeMenuList();
		//首页中间半屏广告
		that.getHomeMiddleAdsList();
		//首页优惠专区广告
		//that.getHomeYouhuiAdsList();
		//首页热门店铺广告
		that.getHomeHotShopAdsList();
		//首页推荐商家
		that.getHomeCommendShopList();
		
		//获取首页分享信息
		that.getSiteShareInfo();
		
		
	},
	onShow(e) {
		var that = this
		console.log('开始执行onshow')
		var t_lng = uni.getStorageSync('lng');
		var t_lat = uni.getStorageSync('lat');
		var ntime = (Date.parse(new Date()) / 1000);//当前时间戳
		var ltime = ntime-300;	//5分钟
		var postime = uni.getStorageSync('postime');
		var posaddr = uni.getStorageSync('posaddr');
		var posname = uni.getStorageSync('posname');
		if(posaddr == '' || t_lng == '' || t_lat == '' || postime == '' || postime < ltime){
			//获取当前位置
			//that.getUserPostion();
			uni.getLocation({
			    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			    success: function (res) {
			        const lat = res.latitude;
			        const lng = res.longitude;
					console.log(res)
					console.log(lat,lng)
					if( lat != t_lat || lng != t_lat){
						uni.request({
							url: common.apiUrl + 'location/latlng2addr',
							method: 'GET',
							data: {
								lat:lat,
								lng:lng
							},
							success: res => {
								console.log(res)
								var data = res.data.address
								that.posname = data.aois[0].name
								that.address = data.address
								that.addressComponent = data.addressComponent
								uni.setStorageSync('lng',lng);
								uni.setStorageSync('lat',lat);
								uni.setStorageSync('posname',that.posname);
								uni.setStorageSync('posaddr',that.address);
								//重新获取推荐商家
								that.getHomeCommendShopList();
							},
							fail: () => {},
							complete: () => {}
						});
					}				
			    }
			});
		}

		
		
	},
	onPullDownRefresh() {
		var that = this
		uni.showNavigationBarLoading();
		
		//获取当前位置
		that.getUserPostion();
		//首页切换广告
		that.getHomeAdsList();
		//首页导航菜单
		that.getHomeMenuList();
		//首页中间半屏广告
		that.getHomeMiddleAdsList();
		//首页优惠专区广告
		//that.getHomeYouhuiAdsList();
		//首页热门店铺广告
		that.getHomeHotShopAdsList();
		//首页推荐商家
		that.getHomeCommendShopList();
		//获取首页分享信息
		that.getSiteShareInfo();
		
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	},
	onPageScroll(e) {
		let that = this
		that.scrollTop = e.scrollTop
		if(e.scrollTop < 100){
			that.header_bg_alpha = e.scrollTop/100
		}else{
			that.header_bg_alpha = 1
		}
		//console.log(that.header_bg_alpha)
	},
	onShareAppMessage(res) {
		var that = this
		if (res.from === 'button') {// 来自页面内转发按钮
		  console.log(res.target)
		}
		var userInfo = uni.getStorageSync('userInfo');
		if(userInfo.users_id > 0){
			var shareUrl = '/pages/index/index?tjuid='+userInfo.users_id
		}else{
			var shareUrl = '/pages/index/index'
		}
		return {
		  title: '商家活动广告平台——众晨星',
		  path: shareUrl,
		}
	},
	methods: {
		//订阅消息
		// dingyue: function() {  
		// 	wx.requestSubscribeMessage({  
		// 	  tmplIds: ['Kk6LJAZ8tjTzU6S0mTpQ6WwFAatxtAzMPC8yqAGmRX8'],  
		// 	  success (res) {  
		// 		  console.log("success:"+res);  
		// 	  },  
		// 	  fail (res) {  
		// 		  console.log("fail:"+res);  
		// 	  },  
		// 	  complete (res) {  
		// 		  console.log("complete:"+res);  
		// 	  }  
		// 	})  
		// },
		
		//
		changeSwiper(e){
			var that = this
			var current = e.detail.current
			that.current = current
		},
		
		//获取首页分享信息
		getSiteShareInfo(){
			var that = this
			// #ifdef H5
			uni.request({
				url: common.apiUrl + 'ads/getSiteShareInfo',
				method: 'GET',
				data: {},
				success: res => {
					var data = res.data
					//var share_url = that.baseUrl + 'h5/?'
					if (that.$wechat ) {
					     that.$wechat.share({  
					          title:data.share_title,
							  desc: data.share_desc,  
					          img: data.share_picture
					    });  
					}  
				},
			});
			
			// #endif
			
		},
		//搜索位置
		changePos(){
			var that = this
			uni.navigateTo({
				url: '/pages/location/location',
			});
		},
		//获取当前位置
		getUserPostion(){
			var that = this
			uni.getLocation({
			    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			    success: function (res) {
			        const lat = res.latitude;
			        const lng = res.longitude;
					console.log(res)
					console.log(lat,lng)
					uni.request({
						url: common.apiUrl + 'location/latlng2addr',
						method: 'GET',
						data: {
							lat:lat,
							lng:lng
						},
						success: res => {
							console.log(res)
							var data = res.data.address
							that.posname = data.aois[0].name
							that.address = data.address
							that.addressComponent = data.addressComponent
							uni.setStorageSync('lng',lng);
							uni.setStorageSync('lat',lat);
							uni.setStorageSync('posname',that.posname);
							uni.setStorageSync('posaddr',that.address);
							var ntime = (Date.parse(new Date()) / 1000);//当前时间戳
							uni.setStorageSync('postime',ntime);
							//重新获取推荐商家
							that.getHomeCommendShopList();
						},
						fail: () => {},
						complete: () => {}
					});
			    }
			});
		},
		//首页切换广告
		getHomeAdsList(){
			var that = this
			uni.request({
				url: common.apiUrl + 'ads/getHomeTopAds',
				method: 'GET',
				data: {},
				success: res => {
					var data = res.data
					console.log(data);
					that.adsList = data.ads_list
				},
			});
		},
		//首页中间半屏广告
		getHomeMiddleAdsList(){
			var that = this
			uni.request({
				url: common.apiUrl + 'ads/getHomeMiddleAdsList',
				method: 'GET',
				data: {},
				success: res => {
					var data = res.data
					console.log(data);
					that.midAdsList = data.ads_list
				},
			});
		},
		//首页导航菜单列表
		getHomeMenuList(){
			var that = this			
			uni.request({
				url: common.apiUrl + 'ads/getHomeMenus',
				method: 'GET',
				data: {},
				success: res => {
					var data = res.data
					console.log(data);
					that.menuList = data.menu_list
				},
			});
		},
		//首页优惠专区广告
		getHomeYouhuiAdsList(){
			var that = this
			uni.request({
				url: common.apiUrl + 'ads/getHomeYouhuiAdsList',
				method: 'GET',
				data: {},
				success: res => {
					var data = res.data
					console.log(data);
					that.mainYouhuiAdsList = data.main_ads_list
					that.subYouhuiAdsList = data.sub_ads_list
				},
			});
		},
		//首页热门店铺广告
		getHomeHotShopAdsList(){
			var that = this
			uni.request({
				url: common.apiUrl + 'ads/getHomeHotShopAdsList',
				method: 'GET',
				data: {},
				success: res => {
					var data = res.data
					console.log(data);
					that.hotShopAdsList = data.hotshop_ads_list
				},
			});
		},
		//首页推荐商家
		getHomeCommendShopList(){
			var that = this
			var lng = uni.getStorageSync('lng');
			var lat = uni.getStorageSync('lat');
			
			console.log("lng",lng,"lat",lat);
			uni.request({
				url: common.apiUrl + 'shop/getHomeCommendShopList',
				method: 'GET',
				data: {
					lng:lng,
					lat:lat
				},
				success: res => {
					var data = res.data
					console.log(data);
					that.commendShopList = data.shop_list
					that.canbuy = data.canbuy
				},
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
			var shopList = that.commendShopList
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
		//跳转
		jumpUrl(e){			
			var that = this
			if(that.canbuy == 1){
				var url = e.currentTarget.dataset.url
				console.log(url)
				uni.navigateTo({
					url:url,
				});
			}
			
		},
		//中转到店铺
		jumpShop(e){
			var that = this
			if(that.canbuy == 1){
				var url = e.currentTarget.dataset.url
				uni.navigateTo({
					url:url,
				});
			}
		},
		goUrl(e){
			var that = this
			var url = e.currentTarget.dataset.url
			uni.switchTab({
				url:url,
			});
		},
		jumpAds(e){
			console.log(e);
			var that = this
			var url = e.currentTarget.dataset.url
			var attr = e.currentTarget.dataset.attr
			var t_url = attr != '' && attr != 0 ? url+attr : url;
			if(url == ''){
				return false
			}
			console.log("t_url",t_url)
			//if(that.canbuy == 1){
				if(url == '/pages/index/index' || url == '/pages/merchant/merchant?fid=' || url == '/pages/merchant/merchant?cid=' || url == '/pages/orders/orders' || url == '/pages/user/user'){
					uni.reLaunch({
						url:t_url,
					});
				}else{
					uni.navigateTo({
						url:t_url,
					});
				}
			//}
		}
	}
}
</script>

<style>

.page_blank{transition: all .6s;height:400upx;}
.page_blank image{width:100%;}
.page_header{position:fixed;width:100%;z-index:10000;}
.page_top_block{position:relative;margin-top:-250upx;}
.position_bar{padding:23upx 30upx;height:60upx;}
.position{font-size:28upx;font-weight:700;color:#fff;margin-right:40upx;}
.pos_ico{width:30upx;height:30upx;display:inline-block; vertical-align: middle;padding-right:10upx;}
.pos_ico image{width:30upx;height:30upx;}
.pos_more{width:30upx;height:30upx;display:inline-block;vertical-align: middle;padding-left:10upx;}
.pos_more image{width:30upx;height:30upx;}
.tool_scan{color:#0ab7cc;font-size:28upx;padding-right:20upx;}
.tool_scan image{width:40upx;height:40upx;vertical-align: middle;padding-right:10upx;}
.page_header_bg{background:#fff;border-bottom:1upx solid #eee;}
.page_header_bg .position{color:#000}

.search{padding:0 20upx;}
.search_txt{background:rgba(255,255,255,.7);border-radius:60upx;height:60upx;line-height:60upx;text-align:center;font-size:28upx;}

.swiper{width:700upx;height:280upx;border-radius:10upx;}
.swiper_item{width:100%;height:280upx;border-radius:10upx;}
.swiper_item image{width:100%;height:280upx;display:block;border-radius:10upx;}

.swiper-all{position: relative;height:280upx;margin:25upx;}
.swiper-all .dots{position: absolute;left: 0;right: 0;bottom: 15upx;display: flex;justify-content: center;}
.swiper-all .dots .dot{margin: 0 4upx;width: 8upx;height: 8upx;background: #ffffff95;border-radius: 4upx;transition: all .6s;}
.swiper-all .dots .active{width: 16upx;background: #ffffff;}

.menus{padding:10upx 0;}
.menu_item{width:150upx;display:inline-block;text-align:center;padding:5upx 0}
.menu_item .menu_ico{width:100upx;height:100upx;margin:0 auto;}
.menu_item .menu_ico image{width:100upx;height:100upx;}
.menu_item .menu_title{color:#666;font-size:28upx;line-height:60upx;}

.mid_ads{padding:20upx;}
.mid_ads .ads_item{width:350upx;height:110upx;display:inline-block;}
.mid_ads .ads_item image{width:350upx;height:110upx;display: block;border-radius:10upx;}

.block{padding:20upx;background:#fff;border-radius:20upx;margin-bottom:20upx;}
.block .block_title{padding:20upx 0}
.block .block_title .block_title_name{font-size:36upx;font-weight: 700;line-height:60upx;}
.block .block_title .block_more{line-height:60upx;color:#666;}
.main_youhui_ads{}
.main_youhui_ads .ads_item{width:350upx;display:inline-block}
.main_youhui_ads .ads_item image{width:350upx;height:290upx;display: block;border-radius:6upx;}
.sub_youhui_ads{}
.sub_youhui_ads .ads_item{width:170upx;display:inline-block}
.sub_youhui_ads .ads_item image{width:170upx;height:220upx;display: block;border-radius:6upx;}
.hotshop_ads{}
.hotshop_ads .ads_item{width:350upx;display:inline-block;margin-bottom:10upx;}
.hotshop_ads .ads_item image{width:350upx;height:150upx;display: block;border-radius:6upx;}

/****店铺列表***/
.shop_list{}
.shop_item{padding:20upx 0;}
.shop_logo{width:170upx;height:170upx;border-radius: 6upx;border:1upx solid #eee;margin-right:20upx;position:relative}
.shop_logo .login_img{width:170upx;height:170upx;border-radius: 6upx;}
.pifa_ico{position:absolute;z-index:10;top:-10upx;left:0;width:80upx;height:40upx;}
.shop_title{font-size:32upx;font-weight: 700;}
.shop_tags{padding:10upx 0;}
.shop_tags_item{border:1upx solid #d9d9d9;color:#ff6408;margin-right:10upx;padding:0 5upx;display:inline-block;font-size:20upx;border-radius:4upx;}
.shop_addr{color:#666;padding:10upx 0;}
.shop_mobile{color:#f40;font-size:28upx;line-height:60upx;}
.shop_zhuying{background:#f7fbfd;color:#819caa;padding:5upx 10upx;border-radius: 6upx;}
.shop_info_ico{width:30upx;height:30upx;padding:15upx;}
.shop_info_ico image{width:30upx;height:30upx;display: block;}
.shop_info_desc{line-height:60upx;color:#999}

.m_r_10{margin-right:10upx;}

</style>
