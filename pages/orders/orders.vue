<template>
	<view class="page">

		<view class="tab weui-flex">
			<view class="weui-flex__item tab_item" :class="type == 0 ? 'item_in' : ''" @click="changeTab" :data-type="'0'">商品订单</view>
			<view class="weui-flex__item tab_item" :class="type == 1 ? 'item_in' : ''" @click="changeTab" :data-type="'1'">特推订单</view>
		</view>
		<view class="order_list" v-if="type==0">			
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view class="weui-flex" @tap="orderInfo" :data-id="item.order_no">
					<view class="market_img"><image :src="baseUrl + item.shop_picture"></image></view>
					<view class="order_info weui-flex__item">
						<view class="market_title">{{item.shop_title}}</view>
						<view class="order_addtime">{{item.order_addtime}}</view>
					</view>
					<view class="order_status">{{item.status}}</view>
				</view>
				<view class="weui-flex" style="padding:20upx 0;" @tap="orderInfo" :data-id="item.order_no">
					<!-- <view class="market_img"></view> -->
					<view class="order_info weui-flex__item">
						<view class="goods_info">{{item.order_title}} <text v-if="item.nums > 1">等{{item.nums}}件商品</text></view>
					</view>
					<view class="order_amount">¥<text>{{item.amounts}}</text></view>
				</view>
				<view class="weui-flex" style="padding:20upx 0;">
					<view class="weui-flex__item"></view>
					<view class="order_op">
						<view class="order_del" @click="delOrderInfo" :data-orderno="item.order_no" v-if="item.order_paytype == 1">删除订单</view>
						<view class="order_cancel" @click="cancelOrderInfo" :data-orderno="item.order_no" v-else>取消订单</view>
					</view>
				</view>
			</view>
			<view class="isall" v-if="isall == 1">------没有更多了------</view>
		</view>	
		<view class="order_list" v-if="type==1">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view class="weui-flex" @tap="orderInfo" :data-id="item.order_no">
					<view class="market_img"><image :src="baseUrl + item.goods_picture"></image></view>
					<view class="order_info weui-flex__item">
						<view class="goods_info">{{item.order_title}}</view>
						<view class="goods_info" v-if="item.order_guige != ''">规格：{{item.order_guige}}</view>
						<view class="order_addtime">{{item.order_addtime}}</view>
					</view>
					
				</view>
				<view class="weui-flex" style="padding:20upx 0;">
					
					<view class="order_amount">¥<text>{{item.amounts}}</text></view>
					<view class="order_status">{{item.status}}</view>
					<view class="weui-flex__item"></view>
					<view class="order_op">
						<view class="order_del" @tap="delOrderInfo" :data-orderno="item.order_no">删除订单</view>
					</view>
				</view>
			</view>
			<view class="isall" v-if="isall == 1">------没有更多了------</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				baseUrl:common.baseUrl,
				userid:'',
				orderList:[],
				type:0,				//类别，0:买菜，1:拼团
				page:0,
				isall:0,
				info:{
					delta:1,
				},
				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				superTitleHeight:0,
			};
		},
		onLoad(e) {
			var that = this
			var userid = uni.getStorageSync('userid');
			that.userid = userid
			
			var id = e.id
			var act = e.act
			var otype = e.otype
			var t_type = e.type
			if(t_type == 1){
				that.type = t_type
				that.resetAttr();
				that.getUserSuperOrders();
			}else{
				that.getUserOrders();
			}
			 
			if( id != '' && act == 'payfee'){
				if(otype == 'super'){
					uni.navigateTo({
						url: '/pages/orders/superinfo?id='+id+'&act='+act,
						success: res => {
							
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					uni.navigateTo({
						url: '/pages/orders/orderinfo?id='+id+'&act='+act,
						success: res => {
							
						},
						fail: () => {},
						complete: () => {}
					});
				}				
			}
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			that.superTitleHeight = common.titleHeight + 50;
			// #ifdef H5
			that.titleHeight = 0;
			// #endif
			
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');	
			var userid = uni.getStorageSync('userid');
			that.userid = userid
			that.resetAttr();
			if(that.type == 1){
				that.getUserSuperOrders();
			}else{
				that.getUserOrders();
			}
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		onReachBottom(){
			var that = this
			that.loadmore();
		},
		methods:{		
			//切换
			changeTab(e){
				var that = this
				var type = e.currentTarget.dataset.type
				console.log(type);
				if(type != that.type){
					that.resetAttr();
					if(type == 1){
						that.getUserSuperOrders();
					}else{
						that.getUserOrders();
					}
					that.type = type
				}
			},
			//重置参数
			resetAttr(){
				var that = this
				that.page = 0;
				that.isall = 0;
				that.orderList = []
			},
			//删除订单功能
			delOrderInfo(e){
				var that = this
				var order_no = e.currentTarget.dataset.orderno
				uni.showModal({
					title:'提示',
					content:'确定要删除吗？',
					success: function (res) {
						if (res.confirm) {
							console.log(order_no)
							if(that.type == 1){
								var url = common.apiUrl + 'orders/delSuperOrderInfo'
							}else{
								var url = common.apiUrl + 'orders/delOrderInfo'
							}
							uni.request({
								url: url,
								method: 'GET',
								data: {
									order_no : order_no
								},
								success: res => {
									console.log(res);
									uni.showToast({
										title:'删除成功',
										icon:'none'
									})
									that.resetAttr();
									if(that.type == 1){
										that.getUserSuperOrders();
									}else{
										that.getUserOrders();
									}
								},
								fail: () => {},
								complete: () => {}
							});
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//取消订单,货到付款订单
			cancelOrderInfo(e){
				var that = this
				var orderno = e.currentTarget.dataset.orderno
				uni.showModal({
					title:'提示',
					content:'确定要取消订单吗？',
					success: function (res) {
						if (res.confirm) {
							console.log(orderno)
							var url = common.apiUrl + 'orders/cancelOrderInfo'
							uni.request({
								url: url,
								method: 'GET',
								data: {
									orderno : orderno
								},
								success: res => {
									console.log(res);
									uni.showToast({
										title:'取消成功',
										icon:'none'
									})
									that.resetAttr();
									that.getUserOrders();
								},
								fail: () => {},
								complete: () => {}
							});
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//获取用户订单列表
			getUserOrders(){
				var that = this
				var userid = uni.getStorageSync('userid');
				var isall = that.isall
				console.log('isall',isall)
				if(isall == 1){
					return false;
				}
				uni.request({
					url: common.apiUrl+'orders/getUserOrders',
					method: 'GET',
					data: {
						userid:userid,
						page:that.page+1
					},
					success: res => {
						console.log(res);
						that.orderList = that.orderList.concat(res.data.order_list);
						that.isall = res.data.isall;
						that.page = res.data.page
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//获取用户订单列表
			getUserSuperOrders(){
				var that = this
				var userid = uni.getStorageSync('userid');
				var isall = that.isall
				console.log('isall',isall)
				if(isall == 1){
					return false;
				}
				uni.request({
					url: common.apiUrl+'orders/getUserSuperOrders',
					method: 'GET',
					data: {
						userid:userid,
						page:that.page+1
					},
					success: res => {
						console.log(res);
						that.orderList = that.orderList.concat(res.data.order_list);
						that.isall = res.data.isall;
						that.page = res.data.page
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//加载更多
			loadmore(e){
				var that = this
				var loadtype = that.type
				that.getUserOrders();
			},
			
			//订单详情
			orderInfo(e){
				var that = this
				var id = e.currentTarget.dataset.id
				var type = that.type
				if(type == 1){
					uni.navigateTo({
						url: '/pages/orders/superinfo?id='+id,
						success: res => {
							
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					uni.navigateTo({
						url: '/pages/orders/orderinfo?id='+id,
						success: res => {
							
						},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		}
	}
</script>

<style>

.tab{height:100upx;line-height:100upx;text-align: center;background:#fafafa;}
.tab_item{font-size:32upx;position:relative;line-height:100upx;}
.item_in{color:#00aafa;font-weight: 700;border-bottom:4upx solid #00aafa;background:#eee;}
.orders_container{padding:20upx 0;font-size:28upx;}
.title{line-height:60upx;line-height:60upx;font-size:36upx;font-weight: bold;color:#333;padding-left:20upx;}
.order_list{width:100%;}
.order_item{background:#fff;border-bottom:1upx solid #ddd;padding:30upx 0;}
.market_img{width:80upx;margin:0 20upx;}
.market_img image{width:80upx;height:80upx;}
.market_title{font-size:36upx;color:#343434;font-weight:bold;}
.order_addtime{font-size:24upx;color:#9a9a9a;}
.goods_info{color:#6b6b6b;padding-right:20upx;}
.order_status{width:220upx;color:#646464;text-align:right;font-size:28upx;padding-right:20upx;line-height:60upx;}
.order_amount{width:220upx;color:#333;text-align:right;padding-right:20upx;}
.order_amount text{font-weight: bold;font-size:36upx;}

.order_info{padding-left:20upx;}

.order_goods{padding:20upx;}
.goods_item{padding:10upx 0;}
.goods_img,.goods_img image{width:40upx;height:40upx;margin-right:20upx;}
.goods_title{}
.goods_nums{font-size:20upx;color:#777;}
.goods_price{padding:0 0 0 40upx;font-weight: bold;}

.order_del{margin:0 20upx;padding:0 10px;background:#e50011;color:#fff;text-align:center;height:50upx;line-height:50upx;font-size:24upx;}
.order_cancel{margin:0 20upx;padding:0 10px;background:#F76260;color:#fff;text-align:center;height:50upx;line-height:50upx;font-size:24upx;}

.isall{color:#999;hegiht:60upx;line-height:60upx;margin:30upx 0;text-align: center;}

</style>
