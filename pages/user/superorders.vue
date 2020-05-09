<template>
	<view class="page">

		
		<scroll-view scroll-y="true" class="order_list" :style=" 'top:'+titleHeight +'px' " @scrolltolower="loadmore" data-loadtype="1">
			<view class="order_item" v-for="(item,index) in orderList" :key="index">
				<view class="weui-flex" @tap="orderInfo" :data-id="item.order_no">
					<view class="market_img"><image :src="baseUrl + item.goods_picture"></image></view>
					<view class="order_info weui-flex__item">
						<view class="goods_info">{{item.order_title}}</view>
						<view class="order_addtime">{{item.order_addtime}}</view>
					</view>
					
				</view>
				<view class="weui-flex" style="padding:20upx 0;">
					
					<view class="order_amount">¥<text>{{item.amounts}}</text></view>
					<view class="order_status">{{item.status}}</view>
					<view class="weui-flex__item"></view>
				</view>
			</view>
			<view class="isall" v-if="isall == 1">------没有更多了------</view>
		</scroll-view>
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
					'bg_color':'255,255,255',
					'bg_alpha':1,
					delta:2,
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
			
			that.getDarenSuperOrders();			 
			
			
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

			that.resetAttr();
			that.getDarenSuperOrders();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods:{		
			
			//重置参数
			resetAttr(){
				var that = this
				that.page = 0;
				that.isall = 0;
				that.orderList = []
			},
			
			
			//获取达人推广订单列表
			getDarenSuperOrders(){
				var that = this
				var userid = uni.getStorageSync('userid');
				var isall = that.isall
				console.log('isall',isall)
				if(isall == 1){
					return false;
				}
				uni.request({
					url: common.apiUrl+'orders/getDarenSuperOrders',
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
				var loadtype = e.currentTarget.dataset.loadtype
				that.getUserOrders();
			},
			
			
		}
	}
</script>

<style>

.tab{height:100upx;line-height:100upx;text-align: center;background:#fafafa;}
.tab_item{font-size:32upx;position:relative;line-height:100upx;}
.item_in{color:#00aafa;font-weight: 700;border-bottom:4upx solid #00aafa;background:#eee;}
.orders_container{padding:20upx 0;font-size:28upx;}
.title{line-height:60upx;line-height:60upx;font-size:36upx;font-weight: bold;color:#333;padding-left:20upx;}
.order_list{position:fixed;bottom:0;top:100upx;width:100%;z-index:10;}
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

.isall{color:#999;hegiht:60upx;line-height:60upx;margin:30upx 0;text-align: center;}

</style>
