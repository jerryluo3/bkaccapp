<template>
	<view class="page">
		<!--  #ifdef  MP-WEIXIN -->
		<page-head :info="info"></page-head>
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<!--  #endif -->
		
		<view class="block">
			<view class="block_content">
				<rich-text :nodes="shop.shop_intro"></rich-text>
			</view>
		</view>
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<page-menu :menu="menu"></page-menu>
		
		
	</view>
</template>

<script>
import common from '../../common/common.js'
import util from '../../common/util.js'
	
export default {
	data() {
		return {
			baseUrl:common.baseUrl,
			shopid:0,				//店铺ID
			shop:[],				//店铺信息
						
			bannerList:[],			//广告列表
			
			menu:{
				mindex:2,
				shopid:0,
				shop:[],
			},
			
			info:{
				bg_color:'0,170,250',
				bg_alpha:1,
				delta:2,
				icon_color:'white'
			},
			titleHeight:0,
			statusBarHeight:0,
			naviBarHeight:0,	
		}
	},
	onLoad(option) {
		var that = this
		var shopid = option.id
		var share = option.share
		if(share == 1){
			//分享
			that.info.delta = 1
		}
		// shopid = 14;
				
		// shopid = 10;
		if(shopid > 0){
			that.menu.shopid = shopid
			that.shopid = shopid
			uni.setStorageSync('shopid', shopid);
			//获取店铺信息
			that.getShopInfo();
			//获取店铺广告
			that.getShopBanner();			
		}
		
		that.titleHeight = common.titleHeight;
		that.statusBarHeight = common.statusBarHeight;
		that.naviBarHeight = common.naviBarHeight;
	
	},
	
	onPullDownRefresh() {
		var that = this
		uni.showNavigationBarLoading();
		
		//获取店铺信息
		that.getShopInfo();
		//获取店铺广告
		that.getShopBanner();
		
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	},	
	methods: {
		
		//跳转
		jumpUrl(e){
			var that = this
			var url = e.currentTarget.dataset.url
			uni.navigateTo({
				url:url,
			});
		},
		//获取店铺信息
		getShopInfo(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopInfo',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {
					that.shop = res.data.shop
					that.menu.shop = res.data.shop
					console.log('shop',res.data)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		//获取店铺广告
		getShopBanner(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopBanner',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {
					that.bannerList = res.data.banner_list
					console.log('banner_list',res.data)
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
}
</script>

<style>
page{background:#fff;}

.block{width:100%;margin-top:20upx;}
.block_title{padding:0 20upx;height:80upx;background:#0AB7CC;color:#fff;}
.block_title_name{font-size:32upx;font-weight: 700;line-height:80upx;}
.block_title_more{font-size:28upx;color:#666;line-height:80upx;color:#fff;}
.block_content{padding:15upx;background:#fff;}



</style>
