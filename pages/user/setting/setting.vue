<template>
	<view class="main">

		<view class="info_block">
			<view class="info_title">基础信息</view>
			<view class="info_list">
				<view class="info_item weui-flex" @tap="changeAvatar">
					<view class="info_name weui-flex__item">头像</view>
					<view class="info_desc users_avatar">
						<image :src="userInfo.users_avatar" v-if="userInfo.users_avatar != ''"></image>
						<image src="../../../static/user/unloginlogo.png" v-else></image>
					</view>
					<view class="info_more"><image src="../../../static/user/right_jt_gray.png"></image></view>
				</view>
				<view class="info_item weui-flex" @tap="modNickname">
					<view class="info_name weui-flex__item">昵称</view>
					<view class="info_desc weui-felx__item">
						{{userInfo.users_nickname}}
					</view>
					<view class="info_more"><image src="../../../static/user/right_jt_gray.png"></image></view>
				</view>
				<!-- <view class="info_item weui-flex" @tap="address">
					<view class="info_name weui-flex__item">收货地址</view>
					<view class="info_desc weui-felx__item">
						
					</view>
					<view class="info_more"><image src="../../../static/user/right_jt_gray.png"></image></view>
				</view> -->
				<view class="info_item weui-flex" @tap="goinvite">
					<view class="info_name weui-flex__item">推荐人</view>
					<view class="info_desc weui-felx__item">
						{{ invite.users_mobile ? invite.users_mobile : '无' }}
					</view>
					<view class="info_more"><image src="../../../static/user/right_jt_gray.png"></image></view>
				</view>
				<!-- <view class="info_item weui-flex">
					<view class="info_name weui-flex__item">密码</view>
					<view class="info_desc weui-felx__item">
						未设置
					</view>
					<view class="info_more"><image src="../../../static/user/right_jt_gray.png"></image></view>
				</view> -->
			</view>
		</view>
		<view class="userlogin_quit" @tap="userLoginQuit">退出当前账号</view>
	</view>
</template>

<script>
	import common from '../../../common/common.js'
	
	export default {
		data() {
			return {
				userInfo:[],
				userid:'',
				invite:[],
				info:{},
				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			};
		},
		onLoad() {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			that.userInfo = userInfo;
			that.userid = userid;
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			that.getInviteInfo();
		},
		onShow(){
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			that.userInfo = userInfo;
			that.userid = userid;
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');	
			that.getInviteInfo();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods:{
			//收货地址
			address(){
				var that = this
				uni.navigateTo({
					url: '/pages/user/setting/address',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//获取诉请人信息
			getInviteInfo(){
				var that = this
				var userInfo = uni.getStorageSync('userInfo');
				var invite_uid = userInfo.invite_uid
				uni.request({
					url: common.apiUrl + 'user/getInviteInfo',
					method: 'GET',
					data: {
						invite_uid:invite_uid
					},
					success: res => {
						var data = res.data
						that.invite = data.invite
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//推荐人
			goinvite(){
				var that = this
				uni.navigateTo({
					url: '/pages/user/setting/invite',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			
			//修改昵称
			modNickname(){
				var that = this
				uni.navigateTo({
					url: '/pages/user/setting/nickname',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//修改头像
			changeAvatar(){
				var that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function (res) {
						//console.log(JSON.stringify(res.tempFilePaths));
						const tempFilePaths = res.tempFilePaths;
						console.log(tempFilePaths);
						//return false;
						console.log(that.userid)
						uni.uploadFile({
							url: common.apiUrl+'user/saveUserAvatar', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'userid': that.userid
							},
							success: (uploadFileRes) => {
								//console.log(uploadFileRes.data);
								var jsonDataStr = JSON.parse(uploadFileRes.data);
								var userInfo = uni.getStorageSync('userInfo');
								console.log(that.userInfo)
								userInfo['users_avatar'] = jsonDataStr.uploadfile;
								uni.setStorageSync('userInfo',userInfo);
								that.userInfo = userInfo;
// 								
// 								console.log(that.userInfo)
							}
						});
					}
				});
			},
			
			
			//退出当前账号
			userLoginQuit(){
				var that = this
				
				
				
				uni.showModal({
					title: '提示',
					content: '确定要退出当前账号吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						console.log(res)
						if(res.confirm){
							uni.removeStorageSync('userid');
							uni.removeStorageSync('userInfo');
							uni.showLoading();
							uni.reLaunch({
								url: '/pages/user/user',
								success: res => {
									uni.hideLoading();
								},
								fail: () => {},
								complete: () => {}
							});
						}
						
											
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>
.main{background:#fff;}
.info_block{padding:30upx 0 0 30upx;background:#fff;display: block;}
.info_title{font-size:24upx;color:#777;}
.info_list{}
.info_item{border-bottom:1upx solid #eee;height:100upx;line-height:100upx;}
.info_name{font-size: 32upx;line-height:100upx;}
.info_desc{font-size:24upx;color:#777;line-height:100upx;}
.info_desc image{width:80upx;height:80upx;border-radius:50%;}
.users_avatar{background:#c3e7f3;border-radius:50%;width:80upx;height:80upx;}
.info_more{width:30upx;height:30upx;padding:5upx 30upx; vertical-align:middle;margin-top:30upx;}
.info_more image{width:30upx;height:30upx;}
.userlogin_quit{width:100%;border-bottom:1upx solid #eee;height:100upx;line-height:100upx;text-align:center;color:#ff8400;font-size: 32upx;}
</style>
