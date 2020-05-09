<template>
	<view class="menu weui-flex">
		<view class="weui-flex__item menu_item" :class="menu.mindex == 0 ? 'menu_item_in' : ''" @click="jumpUrl" :data-url="'/pages/merchant/shop?id='+menu.shopid">首页</view>
		<view class="weui-flex__item menu_item" :class="menu.mindex == 1 ? 'menu_item_in' : ''" @click="jumpUrl" :data-url="'/pages/merchant/products?id='+menu.shopid" v-if="menu.shop.shop_products == 1">产品</view>
		<view class="weui-flex__item menu_item" :class="menu.mindex == 3 ? 'menu_item_in' : ''" @click="jumpUrl" :data-url="'/pages/merchant/article?id='+menu.shopid" v-if="menu.shop.shop_article == 1">资讯</view>
		<view class="weui-flex__item menu_item" :class="menu.mindex == 4 ? 'menu_item_in' : ''" @click="jumpUrl" :data-url="'/pages/merchant/contact?id='+menu.shopid">联系</view>
		<view class="weui-flex__item menu_item" :class="menu.mindex == 5 ? 'menu_item_in' : ''" @click="jumpUrl" :data-url="'/pages/merchant/user?id='+menu.shopid">我的</view>
	</view>
</template>

<script>
	export default {
		props: ['menu'],
		methods:{
			jumpUrl(e){
				var url = e.currentTarget.dataset.url
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style>
.menu{width:100%;height:100upx;background:#00aafa;position:fixed;bottom:0;z-index:1000;}
.menu_item{text-align: center;font-size:28upx;font-weight: 700;line-height:100upx;color:#fff;}
.menu_item_in{background:#0A98D5;}
</style>
