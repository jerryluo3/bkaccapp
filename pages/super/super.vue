<template>
	<view class="page">
		<view class="super_list">
			<view class="super_item" v-for="(item,index) in adsList" :key="index" @click="jumpUrl" :data-url="'/pages/merchant/shop?id='+item.sa_shopid">
				<view class="super_img">
					<image :src="baseUrl + item.sa_picture"></image>
				</view>
				<view class="weui-flex">
					<view class="super_title weui-flex__item">{{ item.sa_title }}</view>
					<view class="super_distance">{{ item.distance }}km</view>
				</view>
				<view class="super_times">
					活动时间：{{ item.starttime + '-' + item.endtime }}					
				</view>
			</view>
			<view class="isall" v-if="isall == 1">
				<text>我是有底线的</text>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'

	export default {
		data() {
			return {
				baseUrl: common.baseUrl,
				userid: '',
				userInfo: [],
				info: {
					bg_color: '255,255,255',
					bg_alpha: 1,
					delta: 1,
				},
				scrollTop: 0, //滚动高度
				header_bg_alpha: 0, //头部背景色透明度
				currentPagesLen: 1, //页面数量，看是否返回
				titleHeight: 0,
				statusBarHeight: 0,
				naviBarHeight: 0,

				adsList: [], //特推商品列表
				isall: 0, //是否显示完
				page: 0, //当前页码
			};
		},
		onLoad(e) {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			console.log(userInfo)

			that.userid = userid
			that.userInfo = userInfo

			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;

			that.getSuperAdsList();


		},
		onPageScroll(e) {
			let that = this
			that.scrollTop = e.scrollTop
			if (e.scrollTop < 100) {
				that.header_bg_alpha = e.scrollTop / 100
			} else {
				that.header_bg_alpha = 1
			}
			console.log(that.header_bg_alpha)
		},

		onPullDownRefresh: function() {
			var that = this
			uni.showNavigationBarLoading();

			that.resetAttr();
			that.getSuperAdsList();

			console.log('下拉刷新中...');
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage(res) {
			var that = this
			if (res.from === 'button') { // 来自页面内转发按钮
				console.log(res.target)
			}
			var userInfo = uni.getStorageSync('userInfo');
			if (userInfo.users_id > 0) {
				var shareUrl = '/pages/super/super?tjuid=' + userInfo.users_id
			} else {
				var shareUrl = '/pages/super/super'
			}
			return {
				title: '商家活动广告平台——众晨星',
				path: shareUrl,
			}
		},
		onReachBottom() {
			var that = this
			that.loadmore()
		},
		methods: {

			//重置参数
			resetAttr() {
				var that = this
				that.page = 0;
				that.isall = 0;
				that.adsList = []
			},
			//加载更多
			loadmore() {
				var that = this
				that.page = that.page + 1;
				that.getSuperAdsList();
			},
			//获取特推活动列表
			getSuperAdsList() {
				var that = this
				var lng = uni.getStorageSync('lng');
				var lat = uni.getStorageSync('lat');
				uni.request({
					url: common.apiUrl + 'shop/getSuperAdsList',
					method: 'GET',
					data: {
						lng: lng,
						lat: lat,
						page: that.page + 1
					},
					success: res => {
						var data = res.data
						console.log(data)
						var adsList = data.ads_list
						for (var i = 0; i < adsList.length; i++) {
							that.adsList.push(adsList[i])
						}
						that.isall = data.isall
						console.log("isall", data.isall)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//电话联系
			phoneContact(e) {
				var that = this
				var index = e.currentTarget.dataset.index
				var shopList = that.commendShopList
				var mobile = e.currentTarget.dataset.mobile
				uni.makePhoneCall({
					phoneNumber: mobile
				});
			},
			//一键导航
			goaddr(e) {
				var that = this
				var index = e.currentTarget.dataset.index
				var shopList = that.shopList
				var lat = shopList[index].shop_lat
				var lng = shopList[index].shop_lng

				console.log(parseFloat(lat));
				console.log(parseFloat(lng));
				uni.openLocation({
					latitude: parseFloat(lat),
					longitude: parseFloat(lng),
					success: function() {
						console.log('success');
					}
				});
			},
			navBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			navHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//跳转
			jumpUrl(e) {
				var that = this
				var url = e.currentTarget.dataset.url
				uni.navigateTo({
					url: url,
				});
			},
			//获取用户信息
			getUserInfo() {
				var that = this
				var userid = that.userid
				if (userid > 0) {
					uni.request({
						url: common.apiUrl + 'user/getUserInfo',
						method: 'GET',
						data: {
							userid: userid
						},
						success: res => {
							if (res.data.code == 0) {
								var userInfo = res.data.userInfo;
								uni.setStorageSync('userInfo', userInfo);
								that.userInfo = userInfo
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '你还没登录，现在去登录吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
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
		}
	}
</script>

<style>
	/******素材******/
	.goods_list {
		padding-top: 20upx;
	}

	.goods_item {
		margin: 0 20upx 20upx 20upx;
		background: #fff;
		width: 710upx;
		border-radius: 10upx;
	}

	.goods_img {
		width: 100%;
		height: 355upx;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
	}

	.goods_img image {
		width: 100%;
		height: 300upx;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
	}

	.goods_price {
		color: #f40;
		font-weight: 700;
		font-size: 32upx;
	}

	.goods_title {
		font-size: 32upx;
		font-weight: 700;
		line-height: 40upx;
		padding: 20upx;
	}

	.goods_info {
		border-top: 1upx solid #eee;
		line-height: 60upx;
		padding: 20upx;
	}

	.goods_price {
		color: #f00;
		font-size: 32upx;
		font-weight: 700;
		display: inline-block;
		line-height: 60upx;
	}

	.goods_mprice {
		color: #666;
		text-decoration: line-through;
		display: inline-block;
		padding: 0 10upx;
		line-height: 60upx;
	}

	.goods_commission {
		color: #fff;
		background: #F0AD4E;
		display: inline-block;
		padding: 0 20upx;
		border-radius: 6upx;
		line-height: 40upx;
		margin: 10upx 0;
	}

	.goods_sales {
		line-height: 60upx;
		color: #666;
	}

	.super_list {
		padding-top: 20upx;
	}

	.super_item {
		margin: 0 20upx 20upx 20upx;
		background: #fff;
		width: 710upx;
		border-radius: 10upx;
	}

	.super_img {
		width: 100%;
		height: 300upx;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
	}

	.super_img image {
		width: 100%;
		height: 300upx;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
	}

	.super_title {
		font-size: 32upx;
		font-weight: 700;
		line-height: 40upx;
		padding: 20upx;
	}
	.super_distance{line-height: 40upx;font-size:28upx;padding: 20upx;}
	.super_times{line-height: 40upx;padding:0 20upx 20upx;}

	.super_shop_info {
		padding: 20upx;
		border-top: 1upx solid #eee;
		background: #fafafa;
	}

	.super_shop_info_item {
		color: #333;
	}

	.super_shop_info_title {
		font-size: 28upx;
	}

	/****全部***/
	.isall {
		width: 100%;
		text-align: center;
		color: #ccc;
		margin: 20upx 0;
		border-bottom: 1upx solid #f1f1f1;
		height: 20upx;
	}

	.isall text {
		padding: 0 40upx;
		background: #fff;
		position: relative;
		line-height: 40upx;
	}
	
	
</style>
