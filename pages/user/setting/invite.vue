<template>
	<view class="page">

		<view class="main">
			<form @submit="formSubmit">
			<view class="userlogin">			
				<view class="userlogin_item weui-flex">
					<view class="weui-flex__item">
						<input class="userlogin_input" name="mobile" type="text" :value="invite.users_mobile" placeholder="推荐人手机号" />
					</view>
				</view>
			</view>
			<view class="userlogin_tips">温馨提示：未填写推荐人用户可编辑一次</view>
			<view v-if="invite == ''">
			<button formType="submit" class="userlogin_btn">提交</button>
			</view>
			</form>
		</view>
	</view>
	
</template>

<script>
	import common from '../../../common/common.js'
	
	export default {
		data() {
			return {
				userid:'',
				userInfo:[],
				invite:[],
				
				info:{
					'delta':1
				},
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			};
		},
		onLoad() {
			var that = this
			var userInfo = uni.getStorageSync('userInfo');
			that.userInfo = userInfo
			var userid = uni.getStorageSync('userid');
			that.userid = userid
			that.getInviteInfo();
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
		},
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  console.log('下拉刷新中...');
		  
		  that.getInviteInfo();
		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		methods:{
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
			//提交
			formSubmit(e){
				var that = this
				var data = e.detail.value;
				var mobile = data.mobile
				var userInfo = uni.getStorageSync('userInfo');
				var userid = userInfo.users_id
				
				
				if(mobile == '' || mobile.length != 11){					
					uni.showToast({
						title: '请输入推荐人手机号',
						duration: 1500,
						icon :'none'
					});
					return false
				}
				
				uni.showLoading({
					title: '处理中'
				});
				
				uni.request({
					url: common.apiUrl + 'user/updateInviteInfo',
					method: 'GET',
					data: {
						userid:userid,
						mobile:mobile
					},
					success: res => {
						uni.hideLoading();
						var data = res.data;
						
						if(data.code == 0){
							var userInfo = uni.getStorageSync('userInfo');
							userInfo = data.user
							uni.setStorageSync('userInfo',userInfo);
							uni.showToast({
								title: '操作成功',
								duration: 1500,
								icon:'success'
							});
							uni.navigateBack();
						}else{
							uni.showToast({
								title: data.msg,
								duration: 1500,
								icon:'none'
							});
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
				
				
				
			}
		}
	}
</script>

<style>
.userlogin{margin:20upx 0;background:#fff;}
.userlogin_item{border-bottom:1upx solid #eee;height:80upx;line-height:80upx;padding:10upx;}

.userlogin_tips{padding:10upx 20upx;font-size:24upx;color:#aaa;}
.userlogin_input{height:80upx;line-height:80upx;padding:0 3%;font-size:36upx;}

.userlogin_btn{background:#ff8400;color:#fff;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
.getcode{background:#f0f0f0;padding:0 20upx;border-radius:6upx;}
.getcode_use{background:#fdd108;color:#725e03;}
</style>
