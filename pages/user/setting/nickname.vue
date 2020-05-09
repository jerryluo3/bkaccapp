<template>
	<view class="page">

		<view class="main">
			<form @submit="formSubmit">
			<view class="userlogin">			
				<view class="userlogin_item weui-flex">
					<view class="weui-flex__item">
						<input class="userlogin_input" name="nickname" type="text" :value="userInfo.users_nickname" placeholder="昵称" />
					</view>
				</view>
			</view>
			<view class="userlogin_tips">温馨提示：个人用户昵称一个月只能修改一次,长度3-20个汉字</view>
			
			<button formType="submit" class="userlogin_btn">提交</button>
			
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
				info:{},
				
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
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
		},
		methods:{
			//提交
			formSubmit(e){
				var that = this
				var data = e.detail.value;
				var nickname = data.nickname
				
				
				
				if(nickname == '' || nickname.length < 3){					
					uni.showToast({
						title: '请输入昵称',
						duration: 1500,
						icon :'none'
					});
					return false
				}
				
				uni.showLoading({
					title: '处理中'
				});
				
				uni.request({
					url: common.apiUrl + 'user/updateNickname',
					method: 'GET',
					data: {
						userid:that.userid,
						nickname:nickname
					},
					success: res => {
						uni.hideLoading();
						
						var userInfo = uni.getStorageSync('userInfo');
						userInfo.users_nickname = nickname
						uni.setStorageSync('userInfo',userInfo);
						that.userInfo = userInfo
						
						uni.showToast({
							title: '操作成功',
							duration: 1500,
							icon:'success'
						});
						uni.navigateBack();
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

.userlogin_tips{padding:10upx 20upx;font-size:20upx;color:#aaa;}
.userlogin_input{height:80upx;line-height:80upx;padding:0 3%;}

.userlogin_btn{background:#ff8400;color:#fff;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
.getcode{background:#f0f0f0;padding:0 20upx;border-radius:6upx;}
.getcode_use{background:#fdd108;color:#725e03;}
</style>
