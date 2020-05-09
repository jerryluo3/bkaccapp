<script>
	import common from './common/common.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const res = uni.getSystemInfoSync()
			const system = res.platform
			var statusBarHeight = res.statusBarHeight
			console.log(res)
			if (system === 'android') {
				var titleHeight = (48 + statusBarHeight)
			} else if (system === 'ios') {
				var titleHeight = (44 + statusBarHeight)
			}else{
				var titleHeight = (48 + statusBarHeight)
			}
			var naviBarHeight = titleHeight - statusBarHeight
			common.titleHeight = titleHeight
			common.statusBarHeight = statusBarHeight
			common.naviBarHeight = naviBarHeight
			// console.log("naviBarHeight",common.titleHeight)
			// console.log("titleHeight",common.statusBarHeight)
			// console.log("statusBarHeight",common.naviBarHeight)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	
	page{font-size:28upx;}
	.page_blank{width:100%;height:100upx;}
	.page_header{position:fixed;width:100%;z-index:6666;background:#fff}
	.page_status_bar{width:100%;height:40upx;}
	.page_navBar{width:100%;}
	.page_navBar .btn{width:40upx;height:40upx;margin:28upx 0;padding:0 20upx;display:inline-block;vertical-align: middle;}
	.page_navBar .btn_border{border-left:1upx solid #eee;}
	.page_navBar image{width:40upx;height:40upx;display: block;}
	.page_title{display:inline-block;vertical-align: middle;color:#fff;font-size:28upx;padding-left:10upx;overflow: hidden;}
	
</style>
