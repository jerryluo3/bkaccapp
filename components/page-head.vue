<template>
	<view class="">
		<view class="page_header" :style=" 'height:'+titleHeight+'px;background:rgba('+info.bg_color+','+info.bg_alpha+')' ">
			<view class="page_status_bar" :style=" 'height:'+statusBarHeight +'px' "></view>
			<view class="page_navBar weui-flex" :style=" 'height:'+naviBarHeight +'px' ">
				<view class="btn" @click="navBack" v-if="info.delta > 1"><image :src="'../static/images/return_'+ info.icon_color +'.png'" mode=""></image></view>
				<!-- <view class="btn" @click="jumpUrl" :data-url="'/pages/merchant/shop?id='+info.shopid"><image :src="'../static/images/home_'+ info.icon_color +'.png'" mode=""></image></view> -->
				<view class="page_title weui-flex__item"  :style=" 'line-height:'+naviBarHeight +'px' ">{{ info.title }}</view>
			</view>
		</view>		
	</view>
</template>

<script>
	import common from '../common/common.js'
	
    export default {
		props: ['info'],
		computed: {
		    titleHeight() {
		        //#ifdef MP-WEIXIN
		        return `${common.titleHeight}`
		        //#endif
		        //#ifdef APP-PLUS
		        return ''
		        //#endif
		    },
			statusBarHeight() {
			    //#ifdef MP-WEIXIN
			    return `${common.statusBarHeight}`
			    //#endif
			    //#ifdef APP-PLUS
			    return ''
			    //#endif
			},
			naviBarHeight() {
			    //#ifdef MP-WEIXIN
			    return `${common.naviBarHeight}`
			    //#endif
			    //#ifdef APP-PLUS
			    return ''
			    //#endif
			}
		},
		data(){
			return{
				scrollTop:0,		//滚动高度
				header_bg_alpha:1,	//头部背景色透明度
				currentPagesLen:0,	//页面数量，看是否返回
			}
		},
		
		methods:{
			navBack(){
				uni.navigateBack({
					delta:1
				})
			},
			navHome(){
				var that = this
				uni.navigateTo({
					url:'/pages/merchant/shop?id='+that.info.shopid
				})
			},
			jumpUrl(e){
				var url = e.currentTarget.dataset.url
				uni.navigateTo({
					url:url
				})
			}
		}
    }
</script>

<style>

</style>
