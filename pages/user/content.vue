<template>
	<view class="page">
		<view class="title">
			{{ row.title }}
		</view>
		<view class="content">
			<rich-text :nodes="row.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				id:0,
				row:[],
			}
		},
		onLoad(option) {
			var that = this
			var id = option.id
			that.id = id
			
			that.getContent();
			
		
		},
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  console.log('下拉刷新中...');	
		  
		  that.getContent();
		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		methods: {
			//获取内容
			getContent(){
				var that = this				
				uni.request({
					url: common.apiUrl + 'user/getContent',
					method: 'GET',
					data: {
						id:that.id
					},
					success: res => {						
						that.row = res.data.row
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
	.title{border-bottom:1upx solid #eee;padding:20upx;font-size:32upx;text-align: center;font-weight: 700;}
	.content{padding:30upx;font-size:32upx;}
</style>
