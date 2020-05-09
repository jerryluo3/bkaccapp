<template>
	<view class="page">
		<view class="hexiao_header">
			<view class="hexiao_btn" @click="scanOrder">扫码核销订单</view>
		</view>
		<view class="order_info" v-if="coupon != ''">			
			<view class="order_basic">{{ coupon.shop_title }}</view>
			<view class="order_basic">{{ coupon.c_title }}</view>
			<view class="order_basic">抵扣金额：{{ coupon.c_amount }}</view>
			<view class="order_basic">使用条件：满{{ coupon.c_needamount }}使用</view>
			<view class="order_basic">当前状态：<text style="color:#f40;">{{ coupon.uc_used == 1 ? '已使用' : '未使用' }}</text></view>
			<view class="order_basic">有 效 期：{{ coupon.endtime }}</view>
			
			<view class="" v-if="coupon.enable == 1">
				<view class="hexiao_submit" @click="hexiaosubmit" v-if="coupon.uc_used == 0">确定核销</view>
			</view>
			<view class="" v-else>
				<view class="hexiao_submit btn_disable">您无权核销此优惠券</view>
			</view>
		</view>
	</view>
</template>

<script>
import common from '../../common/common.js'

export default {
		data() {
			return {
				userInfo:[],
				id:0,				//优惠券ID
				coupon:[],			// 优惠券信息
			}
		},
		onLoad(option) {
			var that = this
			var userInfo = uni.getStorageSync('userInfo');
						
			
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');
						
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods: {
			jumpUrl(e){
				var that = this
				var url = e.currentTarget.dataset.url
				uni.navigateTo({
					url: url
				});
			},
			//确定核销吗？
			hexiaosubmit(){
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定核销优惠券吗？',
					success: res => {
						if(res.confirm){
							that.hexiaoCoupon();
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//核销
			hexiaoCoupon(){
				var that = this
				var id = that.id
				var userInfo = uni.getStorageSync('userInfo');
				uni.request({
					url: common.apiUrl + 'shop/hexiaoCoupon',
					method: 'GET',
					data: {
						id:id
					},
					success: res => {
						if(res.data.code == 0){
							uni.showToast({
								title:'核销成功',
								icon:'success',
								duration:1500,
								success:res=>{
									setTimeout(function(){
										uni.navigateTo({
											url:'/pages/user/user'
										})
									},1500)
								}
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								duration:1500
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//扫码
			scanOrder(){
				var that = this
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						if(res.result){
							that.id = res.result
							that.getHexiaoCouponInfo();
						}
					}
				})
			},
			//获取优惠券信息
			getHexiaoCouponInfo(){
				var that = this
				var id = that.id
				var userInfo = uni.getStorageSync('userInfo');
				uni.request({
					url: common.apiUrl + 'shop/getHexiaoCouponInfo',
					method: 'GET',
					data: {
						id:id,
						users_mobile:userInfo.users_mobile
					},
					success: res => {
						console.log(res)
						if(res.data.code == 0){
							that.coupon = res.data.coupon
							
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none',
								duration:1500
							})
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	
	}
</script>

<style>
.hexiao_header{background:#fff;padding:20upx;}
.hexiao_header .hexiao_btn{background:#007AFF;color:#fff;height:80upx;line-height:80upx;text-align: center;font-size:32upx;border-radius:10upx;}

.order_info{background:#fff;margin-top:20upx;padding:20upx;}
.order_basic{font-size:32upx;line-height:60upx;}
.order_list{padding:20upx 0;}
.order_item{border-bottom:1upx solid #eee;line-height:60upx;padding:10upx 0;}
.order_title{font-size:28upx;}
.order_nums{width:100upx;font-size:28upx;text-align: center;}
.order_amount{width:150upx;font-size:28upx;text-align: center;}
.hexiao_submit{background:#f40;color:#fff;height:80upx;line-height:80upx;margin:30upx 0;text-align: center;font-size:32upx;border-radius:10upx;}
.btn_disable{background:#ccc;color:#666;}


</style>
