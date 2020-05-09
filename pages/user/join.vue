<template>
	<view class="page">

		<view class="block">
			<view class="content_list">
				<view class="content_item uni-flex" v-for="(item,index) in contentList" :key="index" @click="jumpUrl" :data-url="'/pages/user/content?id='+item.id">
					<view class="uni-flex-item content_title">{{item.title}}</view>
					<view class="content_more"><image src="../../static/user/right_jt_gray.png" mode=""></image></view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				contentList:[],
				info:{
					title:'合作加盟'
				},
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			};
		},
		onLoad() {
			var that = this
			that.getJoinInfo();
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
		},
		
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  console.log('下拉刷新中...');		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		
		methods: {
			//获取合作加盟
			getJoinInfo(){
				var that = this
				uni.request({
					url: common.apiUrl+'user/getJoinInfo',
					method: 'GET',
					data: {},
					success: res => {
						that.contentList = res.data.content_list;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//链接
			jumpUrl(e){
				var that = this
				var url = e.currentTarget.dataset.url;
				uni.navigateTo({
					url:url
				})
			},
		}
	}
</script>

<style>
	page{background:#fff;}
	.block{padding:20upx;font-size:28upx;}
	.join_title{font-size:32upx;font-weight:bold;text-align:center;margin-bottom:20upx;}
	.join_content{color:#5a5a5a;line-height:40upx;}
	
	.content_list{background:#fff;padding-left:20upx;}
	.content_item{border-bottom:1upx solid #eee;line-height:80upx;height:80upx;}
	.content_item .content_title{line-height:80upx;font-size:32upx;color:#333;}
	.content_item .content_more{width:40upx;height:40upx;margin:20upx;}
	.content_item .content_more image{width:40upx;height:40upx;}
</style>
