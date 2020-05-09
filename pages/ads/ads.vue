<template>
	<view class="page">
		<view class="content">
			<rich-text :nodes="ads.aac_content"></rich-text>
		</view>
	</view>
</template>

<script>
import common from '../../common/common.js'
export default {
	data() {
		return {
			baseUrl:common.baseUrl,
			id:0,				//店铺ID
			ads:[],				//广告信息	
			
			info:{
				bg_color:'0,170,250',
				bg_alpha:0,
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
		var id = option.id
		that.id = id
				
		//获取广告信息
		that.getAdsInfo();
		
		that.titleHeight = common.titleHeight;
		that.statusBarHeight = common.statusBarHeight;
		that.naviBarHeight = common.naviBarHeight;
	
	},
	onPullDownRefresh() {
		var that = this
		uni.showNavigationBarLoading();
		
		//获取广告信息
		that.getAdsInfo();
		
		uni.hideNavigationBarLoading();
		uni.stopPullDownRefresh();
	},
	onShareAppMessage(res) {
		var that = this
		if (res.from === 'button') {// 来自页面内转发按钮
		  console.log(res.target)
		}
		var userInfo = uni.getStorageSync('userInfo');
		if(userInfo.users_id > 0){
			var shareUrl = '/pages/ads/ads?id='+that.id+'&tjuid='+userInfo.users_id
		}else{
			var shareUrl = '/pages/index/index?id='+that.id
		}
		return {
		  title: that.ads.aac_title+'-凡迪优品',
		  path: shareUrl,
		}
	},
	methods: {
		
		
		//获取店铺推荐商品信息
		getAdsInfo(){
			var that = this
			var id = that.id
			if(id == '' || id == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'ads/getAdsInfo',
				method: 'GET',
				data: {
					id:id
				},
				success: res => {			
					that.ads = res.data.ads	
				},
				fail: () => {},
				complete: () => {}
			});
		},
	}
}
</script>

<style>
</style>
