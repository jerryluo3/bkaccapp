<template>
	<view class="page">
		<view class="weui-flex tabs">
			<view class="weui-flex__item tabs_item" :class="tabIndex == 0 ? 'active' : ''" @click="changeTab" :data-tabIndex="'0'">未使用</view>
			<view class="weui-flex__item tabs_item" :class="tabIndex == 1 ? 'active' : ''" @click="changeTab" :data-tabIndex="'1'">已使用</view>
			<view class="weui-flex__item tabs_item" :class="tabIndex == 2 ? 'active' : ''" @click="changeTab" :data-tabIndex="'2'">已过期</view>
		</view>
		<block v-for="(item,index) in couponList" :key="index">
			<view class="uni-flex coupon_item">
				<view class="coupon_item_left">
					<view class="coupon_amount"><text>¥</text>{{item.c_amount}}</view>
					<view class="coupon_needamount">满{{item.c_needamount}}元使用</view>
				</view>
				<view class="uni-flex-item coupon_info">
					<view class="coupon_title">{{item.c_title}}</view>
					<view class="coupon_expired">有效期至 {{item.endtime}}</view>
				</view>
				<view class="coupon_use" v-if="tabIndex == 0" @click="useCoupon" :data-id="item.uc_id">立即使用</view>
				<view class="coupon_use" v-else-if="tabIndex == 1">已使用</view>
				<view class="coupon_use" v-else="tabIndex == 2">已过期</view>
			</view>
		</block>
		
		
		<view class="popbg" v-if="showCouponQR" @click="toggleCouponQR"></view>
		<view class="pop_orderqr" v-if="showCouponQR">
			<image v-if="couponQR != ''" :src="baseUrl + couponQR" mode=""></image>
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
				tabIndex: 0,
				couponList:[],
				
				couponQR:'',			//优惠券二维码
				showCouponQR:false,		//是否显示核销码
				
				page:0,
				isall:0,
			}
		},
		onLoad: function() {
			var that = this
			that.getUserCouponList()
			console.log("newsitems",this.newsitems)
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			
			that.resetAttr();
			that.getUserCouponList()
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		onReachBottom(){
			var that = this
			that.loadmore();
		},
		methods: {
			toggleCouponQR(){
				var that = this
				var showCouponQR = that.showCouponQR
				that.showCouponQR = !showCouponQR
			},
			//加载更多
			loadmore(e){
				var that = this
				that.getUserCouponList();
			},
			//优惠券核销码
			useCoupon(e){
				var that = this
				var id = e.currentTarget.dataset.id
				uni.request({
					url: common.baseUrl + 'sharepic/getCouponQR',
					method: 'GET',
					data: {
						id:id
					},
					success: res => {
						console.log("orderQR",res);
						that.couponQR = res.data.couponQR
						that.toggleCouponQR();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//重置参数
			resetAttr(){
				var that = this
				that.page = 0;
				that.isall = 0;
				that.couponList = []
			},
			//获取用户优惠券列表
			getUserCouponList(){
				var that = this
				var uid = uni.getStorageSync('userid');
				uni.request({
					url: common.apiUrl + 'user/getUserCoupoList',
					method: 'GET',
					data: {
						userid:uid,
						type:that.tabIndex,
						page:that.page+1
					},
					success: res => {
						console.log(res.data.coupon_list)
						that.couponList = that.couponList.concat(res.data.coupon_list)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			changeTab(e){
				var that = this
				var tabIndex = e.currentTarget.dataset.tabindex
				console.log(e)
				if(that.tabIndex != tabIndex){
					that.tabIndex = tabIndex
					that.resetAttr();
					that.getUserCouponList();
				}
			}
			
		}
	}
</script>

<style>

	
	.coupon_item{width:96%;margin:2%;background:#fff;border-radius:6upx;height:140upx;}
	.coupon_item_left{width:160upx;text-align:center;height:140upx;border-right:1upx dotted #ccc;}
	
	.coupon_amount{font-size:40upx;color:#ff643d;font-weight:bold;display: inline-block;}
	.coupon_amount text{font-size:24upx;font-weight:bold;display: inline-block;}
	.coupon_needamount{color:#777;font-size:20upx;}
	
	.coupon_info{height:140upx;padding-left:10upx;}
	.coupon_title{font-size:30upx;line-height:60upx;padding-top:20upx;}
	.coupon_expired{font-size:24upx;color:#777;}
	
	.coupon_use{text-align:center;line-height:140upx;padding:0 20upx;background:#fafafa;}
	.uni-swiper-tab{background:#fff;}
	.uni-tab-bar .active{color:#ff643d;border-bottom:4upx solid #ff643d;margin-bottom:-6upx;}
	.swiper-tab-list{height:78upx;}
	
	.tabs{background:#fff;height:100upx;border-bottom:1upx solid #eee;}
	.tabs .tabs_item{font-size: 32upx;text-align: center;line-height:100upx;}
	.tabs .active{border-bottom:4upx solid #ff643d;margin-bottom:-2upx;font-weight: 700;color:#ff643d;}
	
	.popbg{background:rgba(0,0,0,.8);position:fixed;top:0;right:0;bottom:0;left:0;z-index:100;}
	.pop_orderqr{width:500upx;background:#fff;border-radius:10upx;position:fixed;top:200upx;left:105upx;right:105upx;padding:20upx;z-index:1000;}
	.pop_orderqr image{width:500upx;height:500upx;display:block;}
	
</style>
