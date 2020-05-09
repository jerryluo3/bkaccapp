<template>
	<view class="page">
		<!-- #ifdef MP-WEIXIN -->
		<page-head :info="info"></page-head>
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<!-- #endif -->
		
		<view class="article_list">
			<view class="article_item weui-flex" v-for="(item,index) in articleList" :key="index" @click="jumpUrl" :data-url="'/pages/merchant/articleview?shopid='+shopid+'&id='+item.id">
				<view class="article_img"><image :src="baseUrl + item.picture" mode=""></image></view>
				<view class="weui-flex__item">
					<view class="article_title">{{ item.title }}</view>
					<view class="article_desc">{{ item.desc }}</view>
				</view>
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
						
			articleList:[],			//文章列表
			
			menu:{
				mindex:3,
				shopid:0,
				shop:[],
			},
			
			info:{
				bg_color:'0,170,250',
				bg_alpha:1,
				delta:2,
				icon_color:'white',
				shpid:0,
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
		// if(share == 1){
		// 	//分享
		// 	that.info.delta = 1
		// }
		// shopid = 14;
				
		// shopid = 19;
		if(shopid > 0){
			that.menu.shopid = shopid
			that.info.shopid = shopid
			that.shopid = shopid
			uni.setStorageSync('shopid', shopid);
			//获取店铺信息
			that.getShopInfo();
			//获取店铺资讯
			that.getShopArticleList();		
		}
		
		that.titleHeight = common.titleHeight;
		that.statusBarHeight = common.statusBarHeight;
		that.naviBarHeight = common.naviBarHeight;
	var pages = getCurrentPages();
	that.info.delta = pages.length
	
	},
	
	onPullDownRefresh() {
		var that = this
		uni.showNavigationBarLoading();
		
		//获取店铺信息
		that.getShopInfo();
		//获取店铺资讯
		that.getShopArticleList();
		
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	},
	onShareAppMessage(res) {
		var that = this
		if (res.from === 'button') {// 来自页面内转发按钮
		  console.log(res.target)
		}
		var userInfo = uni.getStorageSync('userInfo');
		var shopid = that.shopid
		if(userInfo.users_id > 0){
			var shareUrl = '/pages/merchant/products?id='+shopid+'&tjuid='+userInfo.users_id
		}else{
			var shareUrl = '/pages/merchant/products?id='+shopid
		}
		return {
		  title: that.shop.shop_title,
		  path: shareUrl,
		}
	},
	
	methods: {
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
					var shop = res.data.shop
					uni.setNavigationBarTitle({
					    title: shop.shop_title
					});
					that.info.title = shop.shop_title
					that.info.shopid = shop.shop_id
					// #ifdef H5
					if (that.$wechat ) {  
						//var share_url = baseUrl + 'h5/#/pages/merchant/shop?id='+shopid
					     that.$wechat.share({  
					          title:shop.shop_title,
							  desc: shop.shop_zhuying,  
					          img: that.baseUrl + shop.shop_picture
					    });  
					}  
					// #endif
				},
				fail: () => {},
				complete: () => {}
			});
		},
		//跳转
		jumpUrl(e){
			var that = this
			var url = e.currentTarget.dataset.url
			uni.navigateTo({
				url:url,
			});
		},
		//获取店铺资讯
		getShopArticleList(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopArticleList',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {
					that.articleList = res.data.article_list
					console.log(res)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		
	}
}
</script>

<style>
page{background:#fff;}

.article_list{padding:20upx;}
.article_item{border-bottom:1upx solid #eee;padding:20upx 0;}
.article_img,.article_img image{width:200upx;height:200upx;}
.article_img{margin-right:20upx;}
.article_title{font-size:32upx;line-height:40upx;padding-bottom:20upx;}
.article_desc{color:#666;}
.article_addtime{font-size:28upx;color:#888;line-height:80upx;}



</style>
