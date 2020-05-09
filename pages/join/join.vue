<template>
	<view class="page">
		<view class="join_header">
			<image :src="baseUrl + 'data/weapp/images/join.png'" mode=""></image>
		</view>
		<view class="zixun_btn" @click="phoneContact">电话咨询客服</view>
		<view class="join_content">
			<rich-text :nodes="row.content"></rich-text>
		</view>
		<view class="join_list">
			<view class="join_item">
				<view class="join_title">加盟申请</view>
			</view>
			<form @submit="formSubmit">
			<view class="join_item"><input type="text" value="" name="shop_name" class="join_txt" placeholder="请输入店铺/公司名称" /></view>
			<view class="join_item"><input type="text" value="" name="shop_addr" class="join_txt" placeholder="请输入地址" /></view>
			<view class="join_item"><input type="text" value="" name="shop_contacter" class="join_txt" placeholder="请输入联系人" /></view>
			<view class="join_item"><input type="text" value="" name="shop_mobile" class="join_txt" placeholder="请输入电话" /></view>
			<view class="join_item">
				<button formType="submit" class="join_btn">立即加盟</button>
			</view>
			</form>
		</view>
	</view>
</template>

<script>
	import common from '@/common/common.js'
	
	export default {
		data() {
			return {
				baseUrl:common.baseUrl,
				userInfo:[],
				row:[],
				hotline:'15988355159',
			}
		},
		onLoad: function() {
			var that = this

			that.getJoinContent();			
			that.getHotline();
			
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			
			that.getJoinContent();
			that.getHotline();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods: {
			//拨打客服电话
			phoneContact(){
				var that = this
				uni.makePhoneCall({
					phoneNumber:that.hotline
				})
			},
			//获取客服电话
			getHotline(){
				var that = this
				uni.request({
					url: common.apiUrl + 'user/getHotline',
					method: 'GET',
					data: {
					},
					success: res => {
						that.hotline = res.data.hotline
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//提交
			formSubmit(e){
				var that = this
				var data = e.detail.value;
				var shop_name = data.shop_name
				var shop_addr = data.shop_addr
				var shop_contacter = data.shop_contacter
				var shop_mobile = data.shop_mobile
				var userInfo = uni.getStorageSync('userInfo');
				var userid = userInfo.users_id
				
				if(shop_name == '' ){
					uni.showToast({ title: '请输入店铺名称',duration: 1500,icon :'none' });
					return false
				}
				if(shop_addr == '' ){
					uni.showToast({ title: '请输入店铺地址',duration: 1500,icon :'none' });
					return false
				}
				
				if(shop_contacter == '' ){
					uni.showToast({ title: '请输入联系人',duration: 1500,icon :'none' });
					return false
				}				
				if(shop_mobile == '' || shop_mobile.length != 11){					
					uni.showToast({title: '请输入推荐人手机号',duration: 1500,icon :'none'});
					return false
				}
				
				uni.showLoading({
					title: '处理中'
				});
				
				uni.request({
					url: common.apiUrl + 'shop/shopJoin',
					method: 'GET',
					data: {
						shop_name:shop_name,
						shop_addr:shop_addr,
						shop_contacter:shop_contacter,
						shop_mobile:shop_mobile,
					},
					success: res => {
						uni.hideLoading();
						var data = res.data;
						
						if(data.code == 0){
							uni.showModal({
								title:'提示',
								content:'提交成功，等待客服处理',
								showCancel: false,
								confirmText: '确定',
								success: res => {
									if(res.confirm){
										uni.navigateBack();
									}
								},
							})
							
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
				
				
				
			},
			
			getJoinContent(){
				var that = this
				uni.request({
					url: common.apiUrl + 'ads/getJoinContent',
					method: 'GET',
					data: {},
					success: res => {
						that.row = res.data.row
					},
				});
			}
		}
	}
</script>

<style>
page{background:#000;}	
.join_header{width:100%;}
.join_header image{width:100%;}
.join_content{margin:30upx;background:rgba(255,255,255,.2);color:#fff;font-size:32upx;padding:30upx;border-radius: 10upx;}

.join_list{padding:30upx;}
.join_item{margin:20upx 0;}
.join_txt{background:#666;border-radius: 10upx;height:80upx;line-height:80upx;padding:0 40upx;font-size:32upx;color:#fff;}
.join_title{text-align: center;font-size:36upx;color:#fff;}
.join_btn{background:#f40;color:#fff;text-align: center;font-size:32upx;margin:20upx 0;height:100upx;line-height:100upx;border-radius: 10upx;}

.zixun_btn{margin:30upx;background:#007AFF;color:#fff;text-align: center;font-size:32upx;height:100upx;line-height:100upx;border-radius: 50upx;}
</style>
