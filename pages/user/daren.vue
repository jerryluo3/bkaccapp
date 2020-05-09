<template>
	<view class="page">

		<view class="daren_bg"><image :src="baseUrl + 'data/asset/share/daren_bg.png'" mode=""></image></view>
		<!-- <view class="daren_btn" @click="checkOrder"></view> -->
		<button class="daren_btn" open-type="getUserInfo" @click="authpay" v-if="userInfo.users_openid == null || userInfo.users_openid == ''">¥1 (<text>¥198</text>) 立即成人分享达人</button>
		<button class="daren_btn" @tap="checkOrder" v-else-if="userInfo.users_openid != null && userInfo.users_openid != '' ">¥1 (<text>¥198</text>) 立即成人分享达人</button>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import util from '../../common/util.js'
	
	export default {
		data() {
			return {
				baseUrl:common.baseUrl,
				userid:'',
				userInfo:[],
				coupon_nums:0,
				ads:[],
				popType: 'middle',
				showPopupMiddle: false,
				info:{
					'icon_color':'white',
					'bg_color':'255,255,255',
					'bg_alpha':0,
					'delta':2
				},
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				
				orderno:'',
			}
		},
		onLoad() {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			
			that.userid = userid
			that.userInfo = userInfo
			
			that.checkLogin();
			
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
		  
		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		methods: {
			//授权并支付
			authpay(){
				var that = this
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					console.log(loginRes);
					var code = loginRes.code;
					// 获取用户信息
					uni.getUserInfo({
					  provider: 'weixin',
					  success: function (infoRes) {
						
						var rawData = infoRes.rawData;
						var signature = infoRes.signature;
						var iv =  infoRes.iv;
						var encryptedData = infoRes.encryptedData;
						uni.request({
							url: common.apiUrl+'login/updateUserInfo',
							method: 'GET',
							data: {
								userid:that.userid,
								code:code,
								rawData:rawData,
								signature:signature,
								iv:iv,
							},
							success: res => {
								console.log(res);
								if(res.data.code == 0){
									var userInfo  = res.data.userInfo;
									uni.setStorageSync('userInfo',userInfo);
									that.userInfo = userInfo;
									that.checkOrder();
								}else{
									uni.showToast({
										title: res.msg,
										duration: 1000,
										icon :'none'
									})
								}
							},
							fail: () => {},
							complete: () => {}
						});
						
					  }
					});
				  }
				});
			},
			//下单
			checkOrder(){
				var that = this
				var userid = that.userid
				uni.request({
					url: common.apiUrl + 'orders/checkOrderDaren',
					method: 'GET',
					data: {
						userid:userid
					},
					success: res => {
						var orderno = res.data.order_no;
						that.orderno = orderno
						that.payfee();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//支付订单
			payfee(){
				var that = this
				var userid = that.userid
				var orderno = that.orderno
				console.log(userid);
				console.log('orderno',orderno)
// 				if(that.all_amount <= that.coupon_disamount){
// 					return false
// 				}
				uni.request({
					url: common.apiUrl+'pay/payfeedaren',
					method: 'GET',
					data: {
						userid:userid,
						order_no:orderno
					},
					success: res => {
						console.log(res)
						var timeStamp = res.data.timeStamp
						var nonceStr = res.data.nonceStr;
						var vpackage = res.data.package;
						var paySign = res.data.paySign;
						//console.log("nonceStr",nonceStr);
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: timeStamp,
							nonceStr: nonceStr,
							package: vpackage,
							signType: 'MD5',
							paySign: paySign,
							success: function (res) {
								uni.showModal({
									title: '提示',
									content: '支付成功',
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										setTimeout(function () {
											uni.reLaunch({
											  url: '/pages/user/user'
											})
										}, 1000) //延迟时间
									},
									fail: () => {},
									complete: () => {}
								});								
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					},
					fail: () => {},
					complete: () => {}
				});
				//console.log(that.userInfo);
				//console.log('开始支付');
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
		}
	}
</script>

<style>

.daren_bg{position:fixed;z-index: 1;width:100%;top:0;bottom:0;overflow:hidden}
.daren_bg image{width:100%;height: 100%;}
.daren_btn{width:90%;margin:5%;position:fixed;bottom:0;background:#eab75e;color:#fff;text-align:center;height:100upx;line-height:100upx;border-radius:100upx;z-index:999;font-size:32upx;font-weight: 700;}
.daren_btn text{text-decoration: line-through;}
</style>
