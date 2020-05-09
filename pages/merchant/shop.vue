<template>
	<view class="page">
		<!-- #ifdef MP-WEIXIN -->
		<page-head :info="info"></page-head>
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<!-- #endif -->
		
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="turnpic" v-for="(item,index) in bannerList" :key="index" v-if="bannerList != ''">
				<image v-if="item != ''" :src="baseUrl + item" ></image>
			</swiper-item>
		</swiper>
		
		<view class="shop_info">
			<view class="shop_title">{{ shop.shop_title }}</view>
			<view class="shop_address">地址：{{ shop.shop_address }}</view>
			<view class="shop_mobile">电话：{{ shop.shop_mobile }}</view>
			<view class="shop_zhuying">主营：{{ shop.shop_zhuying }}</view>
			<view class="shop_btns weui-flex">
				<view class="weui-flex__item">
					<view class="shop_btn calling weui-flex" @click="phoneContact" :data-mobile="shop.shop_mobile">
						<view class="btn_img"><image src="../../static/images/hotline.png"></image></view>
						<view class="weui-flex__item">
							<view class="btn_words">电话咨询</view>
							<view class="btn_tips">有疑问请联系</view>
						</view>
					</view>
				</view>
				<view class="weui-flex__item">
					<view class="shop_btn daohang weui-flex" @click="daohang">
						<view class="btn_img"><image src="../../static/images/daohang.png"></image></view>
						<view class="weui-flex__item">
							<view class="btn_words">一键导航</view>
							<view class="btn_tips">地图导航服务</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="shop_coupon" v-if="coupon != '' && coupon != null" @click="linquCoupon">
			<view class="shop_coupon_border border_left"><image src="../../static/images/coupon_border.png"></image></view>
			<view class="shop_coupon_border border_right"><image src="../../static/images/coupon_border.png"></image></view>
			<view class="shop_coupon_title">{{ coupon.c_title }}</view>
			<view class="shop_coupon_main weui-flex">
				<view class="weui-flex__item shop_coupon_detail">
					<view class="shop_coupon_item">有效时间：{{ coupon.c_days }}天</view>
					<view class="shop_coupon_item">领取条件：{{ coupon.c_integral }}积分</view>
					<view class="shop_coupon_item">使用条件：到店消费满{{ coupon.c_needamount }}元</view>					
				</view>
				<view class="shop_coupon_amount">¥<text>{{ coupon.c_amount }}</text></view>
			</view>
			<view class="shop_coupon_btn">立即领取</view>
		</view> -->
		
		<view class="block" v-if="adsList != ''">
			<view class="ads_item" v-for="(item,index) in adsList" :key="index"><image :src="baseUrl + item.sa_picture"></image></view>
		</view>
		
		<view class="coupon weui-flex" v-if="coupon != '' && coupon != null">
			<view class="weui-flex__item">
				<view class="coupon_info weui-flex">
					<view class="coupon_info_amount">
						<view class="coupon_info_amount_words">¥<text>{{ coupon.c_amount }}</text></view>
						<view class="coupon_info_amount_tips">满{{ coupon.c_needamount }}元使用</view>
					</view>
					<view class="weui-flex__item">
						<view class="coupon_info_item coupon_info_title">{{ coupon.c_title }}</view>
						<view class="coupon_info_item">{{ coupon.c_integral }}积分兑换</view>
						<view class="coupon_info_item">领券后{{ coupon.c_days }}天有效</view>
					</view>
				</view>

				
			</view>			
			<view class="coupon_btn" @click="linquCoupon">
				<view class="coupon_jg">
					<view class="coupon_jg_yuan coupon_yuan_top"></view>
					<view class="coupon_jg_yuan coupon_yuan_bottom"></view>
				</view>
				<view class="coupon_btn_words">立即领取</view>
			</view>
		</view>
		
		<view class="block" v-if="shop.shop_intro != ''">
			<view class="block_title weui-flex">
				<view class="block_title_name weui-flex__item">关于我们</view>
			</view>
			<view class="block_content">
				<rich-text :nodes="shop.shop_intro"></rich-text>
			</view>
		</view>

		<view class="block" v-if="goodsList != ''">
			<view class="block_title weui-flex">
				<view class="block_title_name weui-flex__item">商品</view>
			</view>
			<view class="goods_list">
				<view class="goods_item" v-for="(item,index) in goodsList" :key="index">
					<view class="goods_picture"><image :src="baseUrl + item.goods_picture" mode=""></image>
						<view class="goods_tags">
							<view class="goods_tags_item" v-for="(items,indexs) in item.goodsTags " :key="indexs">{{ items }}</view>
						</view>
					</view>
					<view class="goods_title">{{ item.goods_title }}</view>
					<view class="goods_price">¥ {{ item.goods_price }}</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- <view class="block" v-if="shop.commendshopList != ''">
			<view class="block_title weui-flex">
				<view class="block_title_name weui-flex__item">推荐商家</view>
			</view>
			<view class="commend_shop">
				<view class="commend_shop_item" v-for="(item,index) in shop.commendshopList" :key="index">
					<view class="commend_shop_logo"><image :src="baseUrl + item.shop_picture" mode=""></image></view>
					<view class="commend_shop_title">{{ item.shop_title }}</view>
				</view>
			</view>
		</view> -->
				
	</view>
</template>

<script>
	
import common from '../../common/common.js'
import util from '../../common/util.js'
	
export default {
	data() {
		return {
			baseUrl:common.baseUrl,
			shopid:0,				//店铺ID
			shop:[],				//店铺信息			
			goodsList:[],			//店铺商品列表						
			bannerList:[],			//广告列表
			catList:[],				//分类列表
			adsList:[],				//广告列表
			coupon:[],				//优惠券

			menu:{
				mindex:0,
				shopid:0,
				shop:[],
			},
			
			info:{
				bg_color:'0,170,250',
				bg_alpha:1,
				delta:2,
				icon_color:'white',
				shpid:0,
			},
			titleHeight:0,
			statusBarHeight:0,
			naviBarHeight:0,
			mainTop:0,
			
			popsharehb: false,
			shareImg:'',
			
			showForm:false,
			
		}
	},
	onLoad(option) {
		var that = this
		var shopid = option.id
		// shopid = 1;
				
		if(shopid > 0){
			that.menu.shopid = shopid
			that.info.shopid = shopid
			that.shopid = shopid
			uni.setStorageSync('shopid', shopid);
			//获取店铺信息
			that.getShopInfo();
			//获取店铺优惠券
			that.getShopCoupon();	
			//获取店铺广告列表
			that.getShopAds();
			//获取店铺商品信息
			that.getShopCommendGoodsList();
			
		}
		
		that.titleHeight = common.titleHeight;
		that.statusBarHeight = common.statusBarHeight;
		that.naviBarHeight = common.naviBarHeight;
		
		var pages = getCurrentPages();
		that.info.delta = pages.length
		
		
		that.mainTop = common.titleHeight + 40;
	},
	onPullDownRefresh() {
		var that = this
		uni.showNavigationBarLoading();
		
		//获取店铺信息
		that.getShopInfo();
		//获取店铺优惠券
		that.getShopCoupon();
		//获取店铺广告列表
		that.getShopAds();
		//获取店铺推荐商品信息
		that.getShopCommendGoodsList();
		
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	},
	onShareAppMessage(res) {
		var that = this
		if (res.from === 'button') {// 来自页面内转发按钮
		  console.log(res.target)
		}
		var userInfo = uni.getStorageSync('userInfo');
		var shopid = that.shopid
		if(userInfo.users_id > 0){
			var shareUrl = '/pages/merchant/shop?id='+shopid+'&tjuid='+userInfo.users_id
		}else{
			var shareUrl = '/pages/merchant/shop?id='+shopid
		}
		return {
		  title: that.shop.shop_title,
		  path: shareUrl,
		}
	},
	methods: {
		//领取优惠券
		linquCoupon(){
			var that = this
			var coupon = that.coupon
			var userInfo = uni.getStorageSync('userInfo');
			if(!userInfo){
				that.checkLogin();
				return false
			}
			uni.showModal({
				title: '提示',
				content: '确定要用'+that.coupon.c_integral+'积分兑换吗？',
				showCancel: true,
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					if(res.confirm){
						uni.request({
							url: common.apiUrl + 'shop/linquCoupon',
							method: 'GET',
							data: {
								userid:userInfo.users_id,
								shopid:that.shopid,
								couponid:that.coupon.c_id
							},
							success: res => {
								if(res.data.code == 0){
									uni.showModal({
										title: '提示',
										content: '领取成功,请在"我的>优惠"中查看',
										showCancel: true,
										cancelText: '取消',
										confirmText: '确定',
										success: res => {
											if(res.confirm){
												uni.switchTab({
													url: '/pages/user/user'
												});
											}
											that.getUserInfo();
										},
										fail: () => {},
										complete: () => {}
									});
									
								}else{
									uni.showToast({title:res.data.msg,icon:'none',duration:1500})
								}					
								
							},
							fail: () => {},
							complete: () => {}
						});
					}
				},
			});
			
		},
		//获取用户信息
		getUserInfo(){
			var that = this
			var userInfo = uni.getStorageSync('userInfo');
			if(userInfo.users_id > 0){
				uni.request({
					url: common.apiUrl+'user/getUserInfo',
					method: 'GET',
					data: {
						userid:userInfo.users_id
					},
					success: res => {
						if(res.data.code == 0){
							var userInfo = res.data.userInfo;
							uni.setStorageSync('userInfo',userInfo);
							that.userInfo = userInfo
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}else{
				uni.showModal({
					title: '提示',
					content: '你还没登录，现在去登录吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if(res.confirm){
							uni.navigateTo({
								url: '/pages/userlogin/userlogin',
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		//用户登录
		checkLogin(){
			var that = this
			var userid = uni.getStorageSync('userid');
			if(!userid){
				console.log('还没有登录');
				uni.navigateTo({
					url: '/pages/userlogin/userlogin',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}else{
				console.log('已经登录');
			}
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
		//导航
		daohang(){
			var that = this
			var shop = that.shop
			console.log(shop)
			uni.openLocation({
			    latitude: parseFloat(shop.shop_lat),
			    longitude: parseFloat(shop.shop_lng),
			    success: function () {
			        console.log('success');
			    }
			});
		},
		
		
		
		//获取店铺推荐商品信息
		getShopCommendGoodsList(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopCommendGoodsList',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {			
					that.goodsList = res.data.goods_list	
				},
				fail: () => {},
				complete: () => {}
			});
		},
		
		//跳转
		jumpUrl(e){
			var that = this
			var url = e.currentTarget.dataset.url
			uni.navigateTo({
				url:url,
			});
		},
		//获取店铺信息
		getShopInfo(){
			var that = this
			var shopid = that.shopid
			var userInfo = uni.getStorageSync('userInfo');
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopInfo',
				method: 'GET',
				data: {
					shopid:shopid,
					userid:userInfo.users_id
				},
				success: res => {
					var shop = res.data.shop
					that.shop = res.data.shop

					that.menu.shop = res.data.shop
					uni.setNavigationBarTitle({
					    title: shop.shop_title
					});
					that.info.title = shop.shop_title
					that.bannerList = shop.shop_pics
					console.log('bannerList',that.bannerList)
	
				},
				fail: () => {},
				complete: () => {}
			});
		},
		//获取店铺优惠券
		getShopCoupon(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopCoupon',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {
					that.coupon = res.data.coupon
					console.log("coupon",that.coupon)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		
		//获取店铺广告
		getShopBanner(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopBanner',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {
					that.bannerList = res.data.banner_list
					console.log('banner_list',res.data)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		
		//获取店铺广告列表
		getShopAds(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopAds',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {
					that.adsList = res.data.ads_list
					console.log('ads_list',res.data)
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
}



</script>

<style>

page{background:#eee;}

.page_blank{width:100%;height:120upx;}
.shop_bar{width:100%;height:200upx;background:#00aafa;}
.shop_bar image{width:100%;height:200upx;display: block;}

.shop_header{padding:10upx 3%;background:rgba(0,0,0,.3);height:60upx;overflow: hidden;position:absolute;z-index:10000;top:120upx;left:0;width:94%;}
.shop_logo{width:60upx;height:60upx;border-radius:10upx;border:1upx solid #ddd;margin-right:20upx;}
.shop_logo image{width:60upx;height:60upx;border-radius:10upx;}
.shop_info{padding:20upx;background:#fff;margin:20upx;border-radius:10upx;}
.shop_title{font-size:32upx;font-weight: 700;}
.shop_address{font-size:28upx;}
.shop_mobile{font-size:28upx;}
.shop_btns{padding:30upx 0;}
.shop_btn{width:300upx;margin:0 auto;height:100upx;border-radius:50upx;text-align: left;color:#fff;}
.calling{background:#f40;box-shadow: 0 6upx 10upx #ccc;}
.daohang{background:#007AFF;box-shadow: 0 6upx 10upx #ccc;}
.btn_img,.btn_img image{width:60upx;height:60upx;}
.btn_img{margin:20upx 20upx 20upx 30upx;}
.btn_words{font-size:32upx;line-height:30upx;padding-top:20upx;font-weight: 700;}
.btn_tips{font-size:20upx;line-height:36upx;}

.menu{width:100%;height:100upx;background:#00aafa;position:fixed;bottom:0;}
.menu_item{text-align: center;font-size:28upx;font-weight: 700;line-height:100upx;color:#fff;}
.menu_item_in{background:#0A98D5;}

.shop_main{position:fixed;top:300upx;width:100%;bottom:100upx;background:#fff;}
.shop_left{width:200upx;text-align: center;position:relative;}


/******头部广告列表*******/
.swiper{width:100%;height:300upx;}
.swiper .turnpic image{width:100%;height:300upx;display:block;}

.search{padding:20upx;background:#fff;}
.search_txt{background:#eee;border-radius:80upx;height:80upx;line-height:80upx;text-align:center;font-size:28upx;}


/******类别列表********/
.shop_category{background:#fafafa;position:absolute;width:100%;top:0;bottom:0;overflow: scroll;}
.shop_cat{width:100%;height:100upx;line-height:100upx;font-size:32upx;border-bottom: 1upx solid #eee;}
.shop_cat_in{background:#fff;font-weight: 700;color:#00aafa}

/******类别*******/
.cat_nav_list{padding:30upx 0;background:#fff;}
.cat_nav_item{width:25%;display: inline-block;text-align: center;font-size:28upx;}
.cat_nav_ico{width:100upx;height:100upx;background:#fafafa;border-radius: 50%;margin:0 auto;}
.cat_nav_ico image{width:100upx;height:100upx;border-radius: 50%;}
.cat_nav_name{height:60upx;line-height:60upx;}

.ads_item{width:100%;}
.ads_item image{width:100%;height:300upx;margin-bottom:10upx;display: block;}

/******商品列表********/
.goods_list{padding:2%;}
.goods_item{padding:2%;width:42%;display: inline-block; vertical-align: top;height:450upx;background:#fafafa;margin:2%;box-shadow:0 3upx 3upx #eee;}
.goods_picture{height:280upx;}
.goods_picture image{width:100%;height:100%;}
.goods_title{font-size:32upx;line-height:40upx;height:80upx;margin:10upx 0;overflow: hidden;}
.goods_price{font-size:32upx;font-weight:700;color:#f40;height:60upx;line-height:60upx;}
.goods_shenqingprice{background:#f40;color:#fff;border-radius:6upx;height:50upx;line-height:50upx;padding:0 10upx;display:inline-block;}
.goods_btn,.goods_btn image{width:50upx;height:50upx;border-radius:50%;}
.goods_btn{border:4upx solid #00aafa;border-radius:50%;display:inline-block;vertical-align:top;}
.goods_nums{width:60upx;text-align:center;line-height:60upx;display:inline-block;vertical-align:top;}
.goods_add{background:#00aafa;}
.goods_sub{}
.goods_tags{padding:10upx 0;}
.goods_tags_item{border:1upx solid #d9d9d9;color:#ff6408;margin-right:10upx;padding:0 5upx;display:inline-block;font-size:20upx;border-radius:4upx;}

.block{margin-top:20upx;background:#fff;border-radius: 6upx;margin:20upx;}
.block_title{padding:0 20upx;height:80upx;}
.block_title_name{font-size:32upx;font-weight: 700;line-height:80upx;}
.block_title_more{font-size:28upx;color:#666;line-height:80upx;color:#fff;}
.block_content{padding:15upx;background:#fff;}

/******推荐商家*****/
.commend_shop{background:#fff;padding:10upx;}
.commend_shop_item{padding:5upx;width:170upx;display: inline-block;vertical-align: top;text-align: center;}
.commend_shop_logo,.commend_shop_logo image{width:150upx;height:150upx;border-radius:50%;}
.commend_shop_logo{margin:0 auto;}
.commend_shop_title{height:80upx;line-height:40upx;}


.sharebg{background-color:rgba(0, 0, 0, 0.3);width:100%;position:fixed;z-index:10;top:0;bottom:0;left:0;right:0;}
.shareHB{width:80%;margin:4% 10%;position:fixed;z-index:10000;top:0;}
.shareHB_c{background:#fff;}
.shareBtn{position:absolute;left:35%;bottom:-80upx;width:30%;text-align:center;height:60upx;line-height:60upx;color:#000;font-size:32upx;background:#fff;}

.shop_haibao{background:#fff;}

/******form_block******/
.form_block{width:90%;background:#fff;padding:5%;position:fixed;bottom:0;z-index:111111}
.form_item{border-bottom:1upx solid #eee;height:80upx;line-height:80upx;padding:10upx;}
.form_input{height:80upx;line-height:80upx;padding:0 3%;font-size:36upx;}
.form_btn{background:#ff8400;color:#fff;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}

.pop_bg{background-color:rgba(0, 0, 0, 0.3);width:100%;position:fixed;z-index:10;top:0;bottom:0;left:0;right:0;}
.hideitem{display: none;}


/*******shop_coupon*********/
.shop_coupon{background:#fff;margin:20upx;position:relative;overflow: hidden;}
.shop_coupon_border{position:absolute;top:0;z-index:5;width:8upx;}
.shop_coupon_border image{width:8upx;}
.border_left{left:-4upx;}
.border_right{right:-4upx;}
.shop_coupon_title{height:100upx;line-height:100upx;background:#e5382f;color:#fff3b9;font-size:36upx;padding:0 30upx;font-weight: 600;}
.shop_coupon_main{background:#e9463d;padding:20upx 30upx;color:#fff3b9;}
.shop_coupon_item{height:40upx;line-height:50upx;font-size:24upx;}
.shop_coupon_amount{width:230upx;text-align: right;font-size:32upx;line-height:100upx;}
.shop_coupon_amount text{font-size:100upx;font-weight: 700;}
.shop_coupon_btn{background:#16b9c2;height:80upx;line-height:80upx;text-align: center;font-size:36upx;color:#fff;font-weight: 700;}

.coupon{background:#ea5432;color:#f4d9a5;border-radius:8upx;margin:20upx;}
.coupon_info{padding:20upx 0;}
.coupon_info_item{}
.coupon_info_amount{width:200upx;text-align: center;padding-right:10upx;}
.coupon_info_amount_words{font-size:24upx;display: inline-block;vertical-align: middle;line-height:50upx;padding-top:30upx;}
.coupon_info_amount_words text{font-size:64upx;font-weight: 700;line-height:50upx;}
.coupon_info_amount_tips{font-size:24upx;line-height:30upx;}
.coupon_info_title{font-size:32upx;display: inline-block;vertical-align: middle;line-height:60upx;}
.coupon_btn{width:200upx;text-align: center;position: relative;}
.coupon_btn_words{line-height:200upx;font-size: 32upx;font-weight: 700;}
.coupon_jg{border-left:4upx dotted #ededed;position:relative;width:10upx;height:200upx;position:absolute;z-index:2;left:0;}
.coupon_yuan_top{position:absolute;top:-10upx;left:-12upx;}
.coupon_yuan_bottom{position:absolute;bottom:-10upx;left:-12upx;}
.coupon_jg_yuan{width:20upx;height:20upx;background:#ededed;border-radius: 50%;}

</style>
