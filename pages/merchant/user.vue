<template>
	<view class="main">
		<!-- #ifdef MP-WEIXIN -->
		<page-head :info="info"></page-head>
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<!-- #endif -->
		
		<view class="user_header weui-flex" @click="setting" v-if="userInfo != '' ">			
			<view class="weui-flex__item">
				<view class="user_nickname">{{userInfo.users_nickname}}<view class="user_vip" v-if="userInfo.isvip == 1"><image src="../../static/user/vip.png" mode=""></image></view><view class="user_vip" v-if="userInfo.users_type == 1"><image src="../../static/user/daren.png" mode=""></image></view></view>
				<view class="user_logintips">优享生活从凡迪开始</view>
				
			</view>
			<view class="user_avatar">
				<image :src="userInfo.users_avatar"></image>
			</view>
		</view>
		<view class="user_header weui-flex" @click="checkLogin" v-else>			
			<view class="weui-flex__item">
				<view class="user_nickname">立即登录</view>
				<view class="user_logintips">凡迪您的生活小助手</view>
			</view>
			<view class="user_avatar">
				<image src="/static/user/unloginlogo.png"></image>
			</view>
		</view>
		<view class="tabs weui-flex">
			<view class="weui-flex__item tabs_item" @click="jumpUrl" :data-url="'/pages/user/recharge'">
				<view class="tabs_val blue" v-if="userid > 0">{{userInfo.users_wallet}}<text>元</text></view>
				<view class="tabs_img" v-else><image src="../../static/user/wallet_ico.png"></image></view>
				<view class="tabs_words">钱包</view>
			</view>
			<view class="weui-flex__item tabs_item">
				<view class="tabs_val red" v-if="userid > 0">{{coupon_nums}}<text>个</text></view>
				<view class="tabs_img" v-else><image src="../../static/user/dis_ico.png"></image></view>				
				<view class="tabs_words">优惠</view>
			</view>
			<view class="weui-flex__item tabs_item last_item">
				<view class="tabs_val yellow" v-if="userid > 0">{{userInfo.users_integral}}<text>个</text></view>
				<view class="tabs_img" v-else><image src="../../static/user/jifen_ico.png"></image></view>
				<view class="tabs_words">积分</view>
			</view>
		</view>
		
		<view class="invite_ads" v-if="ads != '' && userInfo.users_type == 0" @tap="jumpUrl" :data-url="ads.aa_url" :data-attr="ads.aa_attr">
			<image :src="baseUrl + ads.aa_picture"></image>
		</view>
		
		<view class="info_list">
			<view class="info_item weui-flex" @tap="jumpUrl" :data-url="'/pages/user/superorders'" v-if="userInfo.users_type == 1">
				<view class="info_ico"><image src="../../static/user/orders.png"></image></view>
				<view class="weui-flex__item info_name">达人订单</view>
				<view class="info_more"><image src="../../static/user/right_jt_gray.png"></image></view>
			</view>
			<view class="info_item weui-flex" @tap="jumpUrl" :data-url="'/pages/user/setting/address'">
				<view class="info_ico"><image src="../../static/user/addr.png"></image></view>
				<view class="weui-flex__item info_name">收货地址</view>
				<view class="info_more"><image src="../../static/user/right_jt_gray.png"></image></view>
			</view>
			<!-- <view class="info_item weui-flex">
				<view class="info_ico"><image src="../../static/user/love.png"></image></view>
				<view class="weui-flex__item info_name">我的收藏</view>
				<view class="info_more"><image src="../../static/user/right_jt_gray.png"></image></view>
			</view> -->
			<view class="info_item weui-flex" @tap="jumpUrl" :data-url="'/pages/user/kefu'">
				<view class="info_ico"><image src="../../static/user/kefu.png"></image></view>
				<view class="weui-flex__item info_name">客服/售后</view>
				<view class="info_more"><image src="../../static/user/right_jt_gray.png"></image></view>
			</view>
			<view class="info_item weui-flex" @tap="jumpUrl" :data-url="'/pages/shop/index/index'" v-if="userInfo != ''">
				<view class="info_ico"><image src="../../static/user/join.png"></image></view>
				<view class="weui-flex__item info_name">商家中心</view>
				<view class="info_more"><image src="../../static/user/right_jt_gray.png"></image></view>
			</view>
		</view>
		
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<page-menu :menu="menu"></page-menu>
		
		<!-- 居中 -->
		<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup">
			
			<view class="uni-common-mt uni-helllo-text uni-center">
				<button open-type="contact" type="warn">进入客服会话</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import util from '../../common/util.js'
	import uniPopup from '../../components/uni-popup.vue'
	
	export default {
		data() {
			return {
				baseUrl:common.baseUrl,
				userid:'',
				shopid:0,
				userInfo:[],
				coupon_nums:0,
				ads:[],
				popType: 'middle',
				showPopupMiddle: false,
				info:{
					bg_color:'0,170,250',
					bg_alpha:1,
					delta:2,
					icon_color:'white',
					shpid:0,
				},
				menu:{
					mindex:5,
					shopid:0,
					shop:[],
				},
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				
				canbuy:1,
			}
		},
		onLoad(option) {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			
			that.userid = userid
			that.userInfo = userInfo
			
			var shopid = option.id
			that.shopid = shopid
			that.menu.shopid = shopid
			that.info.shopid = shopid
			
			that.getShopInfo();
			

			that.getInviteAds();
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			console.log("userid",userid);
			console.log("userInfo",userInfo);
		},
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  console.log('下拉刷新中...');	
		  that.getUserInfo();
		  that.getShopInfo();
		  that.getInviteAds();
		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		methods: {
			//获取店铺信息
			getShopInfo(){
				var that = this
				var shopid = that.shopid
				if(shopid == '' || shopid == 0){
					return false
				}
				uni.request({
					url: common.apiUrl + 'shop/getShopInfo',
					method: 'GET',
					data: {
						shopid:shopid
					},
					success: res => {
						that.shop = res.data.shop
						that.menu.shop = res.data.shop
						var shop = res.data.shop
						uni.setNavigationBarTitle({
						    title: shop.shop_title
						});
						console.log(shop)
						that.info.title = shop.shop_title
						that.info.shopid = shop.shop_id
						// #ifdef H5
						if (that.$wechat ) {  
							//var share_url = baseUrl + 'h5/#/pages/merchant/shop?id='+shopid
						     that.$wechat.share({  
						          title:shop.shop_title,
								  desc: shop.shop_zhuying,  
						          img: that.baseUrl + shop.shop_picture
						    });  
						}  
						// #endif
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupMiddle = false;
			},
			//展示居中 popup
			showMiddlePopup: function() {
				this.hidePopup();
				this.showPopupMiddle = true;
			},
			//邀请广告
			getInviteAds(){
				var that = this
				uni.request({
					url: common.apiUrl + 'ads/getInviteAds',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res)
						that.ads = res.data.ads
						that.canbuy = res.data.canbuy
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//客服
			kefu(){
				var that = this
				uni.showActionSheet({
					itemList: ['在线客服', '0573-82082008'],
					success: function (res) {
						if(res.tapIndex == 0){
							console.log('在线客服');
							that.showMiddlePopup();
						}
						if(res.tabpIndex == 1){
							uni.makePhoneCall({
								phoneNumber:'114'
							})
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});
			},
			ruzhu(){
				
				uni.navigateToMiniProgram({
				      appId: 'wx8cac4ba732d41675', // 要跳转的小程序的appid
				      path: 'pages/index/index', // 跳转的目标页面
				      extarData: {
				        open: 'auth'
				      },
				      success(res) {
				        // 打开成功  
						console.log('aaa')
				      },
					  fail(res){
						  console.log(res)
					  }
				}) 
			},
			//链接
			jumpUrl(e){
				var that = this
				var url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url:url
				})
			},
			//获取优惠券数量
			getCouponNums(){
				var that = this
				var userid = uni.getStorageSync('userid');
				
			},
			//获取用户信息
			getUserInfo(){
				var that = this
				var userid = that.userid
				if(userid > 0){
					uni.request({
						url: common.apiUrl+'user/getUserInfo',
						method: 'GET',
						data: {
							userid:userid
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
			
			//用户信息
			setting(){
				uni.navigateTo({
					url: '/pages/user/setting/setting',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		components: {
			uniPopup
		}
	}
</script>

<style>

.main{width:100%;height:100%;min-height:1200upx;}
.user_header{width:100%;background:#fff;height:150upx;padding:20upx 0;}
.user_avatar{width:150upx;height:150upx;margin:0 40upx;border-radius: 50%;background:#c3e7f3;}
.user_avatar image{width:150upx;height:150upx;border-radius: 50%;}

.user_infoset{width:60upx;height:60upx;padding:40upx 0 0;}
.user_infoset image{width:40upx;height:40upx;}

.user_nickname{color:#000;font-size:56upx;line-height:60upx;font-weight: 700;padding:20upx 0 0 30upx;position:relative}
.user_vip{margin-left:10upx;width:60upx;height:60upx;display:inline-block;vertical-align: middle;}
.user_vip image{width:60upx;height:60upx;display: block;}
.user_logintips{color:#666;font-size:24upx;padding:0 0 0 30upx;line-height:60upx;}

.tabs{background:#fff;height:180upx;padding:20upx;text-align: center;}
.tabs_item{box-shadow:0 0 10upx #eee;border-radius:10upx;margin:10upx;background:#fff;}
.tabs_val{height:40upx;line-height:40upx;padding-top:40upx;width:100%;font-size:44upx;font-weight: bold;}
.tabs_val text{font-size:24upx;}
.tabs_img,.tabs_img image{width:60upx;height:60upx;margin:0 auto;}
.tabs_img{padding-top:20upx;}
.tabs_words{font-size:28upx;color:#585858;line-height: 40upx;padding:10upx 0 30upx;}

.info_list{margin-bottom:20upx;width:100%;background:#fff;}
.info_item{height:60upx;line-height:60upx;font-size:28upx;padding:20upx 0;}
.info_item .info_ico{width:60upx;height:40upx;padding:0 0 0 30upx;}
.info_item .info_name{font-size:32upx;}
.info_item .info_more{width:60upx;height:40upx;}
.info_item  image{width:40upx;height:40upx;margin:10upx auto;}

.invite_ads{width:100%;height:200upx;margin-bottom:20upx;}
.invite_ads image{width:100%;height:200upx;}


.blue{color:#1286e9;}
.red{color:#ff643d}
.yellow{color:#ffa61a;}

</style>
