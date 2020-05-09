<template>
	<view class="page">
		<view class='login_bg' v-if=" ads.aa_picture " :style="'background:url('+ baseurl + ads.aa_picture+') no-repeat top center;background-size:100% '"></view>

		<view class='login_block'>
		  <view class='logo'><image mode='scaleToFill' src='../../static/user/avatar.png'></image></view>

		  <view class='open_mess' v-if=" !mobile ">
			<view class='open_mess_title'>
			  <text>此页面由众晨星开发</text>
			  <text>请确认授权以下信息</text>
			</view>
			<view class='open_mess_auth'>
			  <text>· 获取您的手机号作为登录账号</text>
			</view>
			<view class='open_mess_btn'><button open-type="getPhoneNumber" style='position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;opacity:0;' @getphonenumber="getPhoneNumber">123</button>授权手机号码登录</view>
			<view class='open_mess_tab'>
			  <view class='tab_row tab_in'></view>
			  <view class='tab_row'></view>
			</view>
		  </view>

		  <view class='open_mess' v-if=" !!mobile && userInfo == '' ">
			<view class='open_mess_title'>
			  <text>此页面由众晨星开发</text>
			  <text>请确认授权以下信息</text>
			</view>
			<view class='open_mess_auth'>
			  <text>· 获取您的公开信息(头像、昵称等)</text>
			</view>
			<view class='open_mess_btn'><button open-type="getUserInfo" style='position:absolute;top:0;left:0;right:0;bottom:0;z-index:100;opacity:0;' @getuserinfo="userInfoHandler">点我授权</button>绑定微信账号</view>
			<view class='open_mess_tab'>
			  <view class='tab_row'></view>
			  <view class='tab_row tab_in'></view>
			</view>
		  </view>

		</view>

		<view class='login_footer'>客服热线：15988355159</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import util from '../../common/util.js'
	
	export default {
		data() {
			return {
				baseurl: common.baseUrl,
				ads: [],
				mobile: '',
				userInfo: [],
				tfrom:'',
				userid:0,
				id:0,
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
			  title: '用户登录'
			})
			var that = this
			var userid = uni.getStorageSync("userid");
			var mobile = uni.getStorageSync("mobile");
			var userInfo = uni.getStorageSync("userInfo");

			var tfrom = options.from ? options.from : '';
			var id = parseInt(options.id)
			that.userid = userid
			that.mobile = mobile
			that.userInfo = userInfo
			that.tfrom = tfrom
			that.id = id

			that.getLoginBgAds();
		},
		onPullDownRefresh(){
		  var that = this
		  uni.showNavigationBarLoading();
		  console.log('下拉刷新中...');	
		  that.getLoginBgAds();
		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		methods: {
			getPhoneNumber: function (e) {
				var that = this
				
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				  uni.showModal({
					title: '提示',
					showCancel: false,
					content: '未授权',
					success: function (res) { }
				  })
				} else {
				  uni.login({
					success: function (res) {
					  var code = res.code
					  var url = common.apiUrl +'user/userAuthMobile';
					  var uid = uni.getStorageSync("uid");
					  var tjuid = uni.getStorageSync("tjuid");
					  console.log("code",code)
					  uni.request({
						url: url,
						data: {
						  uid: uid,
						  tjuid: tjuid,
						  code: code,
						  iv: e.detail.iv,
						  encryptedData: e.detail.encryptedData,
						},
						method: "GET",
						// header: {
						//   "Content-Type": "application/x-www-form-urlencoded"
						// },
						success: function (res) {
						  console.log(res);
						  if (res.data.code == 0) {
							that.mobile = res.data.userInfo.users_mobile;
							console.log(that.mobile)
							uni.setStorageSync("userInfo", res.data.userInfo);
							uni.setStorageSync("userid", res.data.userInfo.users_id);
						  } else {
							
							uni.showToast({ title: '处理失败', icon: 'none', duration: 1000 })
						  }

						}
					  })
					}
				  });

				}
			  },


			  userInfoHandler: function (e) {
				var that = this
				uni.getSetting({
				  success(res) {
					//console.log(res);
					if (!res.authSetting['scope.userInfo']) {
					  console.log('------没有授权----')
					} else {
					  //console.log('checkUserLogin', e.detail)
					  that.checkUserLogin(e.detail);
					}
				  }
				})
			  },

			  checkUserLogin: function (e) {
				var that = this;
				var userInfo = uni.getStorageSync("userInfo");
				//if (uid == '') {
				  uni.login({
					success: function (res) {
					  //console.log(res)
					  var code = res.code;
					  var rawData = e.rawData
					  var encryptedData = e.encryptedData
					  var iv = e.iv
					  var url = common.apiUrl + 'user/updateUserInfo';
					  var tjuid = uni.getStorageSync("tjuid");
					  var tpuid = uni.getStorageSync("tpuid");
					  uni.request({
						//用户登陆URL地址，请根据自已项目修改
						url: url,
						method: "GET",
						data: {
						  uid: userInfo.users_id,
						  tjuid: tjuid,
						  tpuid: tpuid,
						  code: code,
						  rawData: rawData,
						  encryptedData: encryptedData,
						  iv: iv
						},
						fail: function (res) {

						},
						success: function (res) {
						  var userInfo = res.data.userInfo;
						  //设置用户缓存
						  uni.setStorageSync("userInfo", userInfo);
						  console.log(userInfo)
						  console.log('登录成功');
						  uni.showToast({
							title: '操作成功',
							icon: 'success',
							duration: 1000,
							success() {
							  setTimeout(function () {
								//var userInfo = uni.getStorageSync("userInfo");
								that.userInfo = userInfo
								//if (!!userInfo.mem_mobile) {
								  var tfrom = that.tfrom
								  var id = that.id
								  if (!tfrom) {
									uni.reLaunch({
									  url: '/pages/user/user',
									})                      
								  } else if (tfrom == 'goods' && id > 0) {
									uni.navigateTo({
									  url: '/pages/goods/goods?id=' + id,
									})
								  } else {
									uni.reLaunch({
									  url: '/pages/user/user',
									})
								  }
								//}
								console.log('userInfo', that.userInfo)

							  }, 1500) //延迟时间
							}
						  })
						}
					  })
					},
					fail: function (res) {
					  console.log(res);
					}
				  })
				//}
			  },

			  //获取背景广告
			  getLoginBgAds: function () {
				var that = this
				uni.request({
				  url: common.apiUrl +'ads/getLoginBgAds',
				  method: "GET",
				  data: {
				  },
				  success(res) {
					that.ads = res.data.ads,
					console.log(res)
				  }
				})
			  },
		}
	}
</script>

<style>
.login_bg{width:100%;display:block;position:fixed;top:0;right:0;bottom:0;left:0;}
.login_bg image{width:100%;display:block;position:absolute;top:0;}

.login_block{position:fixed;bottom:100rpx;width:100%;text-align:center;}
.logo{width:150rpx;height:150rpx;margin:0 auto;}
.logo image{width:150rpx;height:150rpx;}

.open_mess{width:90%;padding:2% 5%;text-align:center;}
.open_mess_title{font-size:32rpx;color:#333;}
.open_mess_title text{display:block;line-height:40rpx;color:#00aafa;}
.open_mess_auth{color:#888;padding:10rpx 0;}
.open_mess_auth text{font-size:24rpx;}

.open_mess_btn{background:#00aafa;color:#fff;height:100rpx;line-height:100rpx;margin:30rpx 0;position:relative;font-size:32upx;}
.open_mess_tab{display: block;text-align:center;}
.open_mess_tab .tab_row{width:70rpx;height:8rpx;background:#aaa;margin:0 10rpx;display:inline-block;}
.open_mess_tab .tab_in{background:#00aafa;}


.login_footer{position:fixed;bottom:40rpx;color:#555;width:100%;text-align:center;font-size:32rpx;}
</style>
