<template>
	<view class="page">	
		<!-- #ifdef MP-WEIXIN -->
		<page-head :info="info"></page-head>
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<!-- #endif -->
		
		<view class="acticle_title">{{ article.title }}</view>
		<view class="article_content">
			<rich-text :nodes="article.content"></rich-text>
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
						
			id:0,
			article:[],			//文章
			
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
		var shopid = option.shopid
		var id = option.id
		that.shopid = shopid
		that.id = id
		// id = 22;
				
		// shopid = 10;
		if(shopid > 0){
			that.menu.shopid = shopid
			that.info.shopid = shop.shop_id
			
			uni.setStorageSync('shopid', shopid);
			//获取店铺资讯
			that.getShopArticle();	
			//获取店铺信息
			that.getShopInfo();
		}
		
		that.titleHeight = common.titleHeight;
		that.statusBarHeight = common.statusBarHeight;
		that.naviBarHeight = common.naviBarHeight;
	
	},
	
	onPullDownRefresh() {
		var that = this
		uni.showNavigationBarLoading();
		
		//获取店铺资讯
		that.getShopArticle();
		//获取店铺信息
		that.getShopInfo();
		
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
			var shareUrl = '/pages/merchant/articleview?shopid='+shopid+'&id='+that.id+'&tjuid='+userInfo.users_id
		}else{
			var shareUrl = '/pages/merchant/articleview?shopid='+shopid+'&id='+that.id
		}
		return {
		  title: that.article.title  + '-' + that.shop.shop_title,
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
		getShopArticle(){
			var that = this
			var id = that.id
			if(id == '' || id == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopArticle',
				method: 'GET',
				data: {
					id:id
				},
				success: res => {
					that.article = res.data.article
					console.log(res)
					// #ifdef H5
					if (that.$wechat ) {  
						//var share_url = baseUrl + 'h5/#/pages/merchant/shop?id='+shopid
						var s_img = res.data.article.picture ? res.data.article.picture : res.data.article.shop_picture
					     that.$wechat.share({  
					          title: res.data.article.title,
							  desc: res.data.article.shop_zhuying,  
					          img: that.baseUrl + s_img
					    });  
					}  
					// #endif
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

.acticle_title{padding: 20upx;font-size: 48upx;text-align: center;background: #fafafa;border-bottom: #eee;}
.article_content{padding: 20upx;font-size: 28upx;}



</style>
