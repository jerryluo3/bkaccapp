<template>
	<view class="page">

		<view class="btn_block uni-flex">
			<view class="uni-flex-item btn_block_item">				
				<button open-type="contact" style="position:absolute;top:0;left:0;right:0;bottom:0; opacity: 0;" type="warn">进入客服会话</button>
				<view class="btn_img online_bg">
					<image src="../../static/user/kefu_online.png" mode=""></image>
				</view>
				<view class="btn_words">
					<view class="mwords">在线客服</view>
					<view class="mtips">8:00-21:00</view>
				</view>
			</view>
			<view class="uni-flex-item" @click="phoneContact">
				<view class="btn_img phone_bg">
					<image src="../../static/user/kefu_phone.png" mode=""></image>
				</view>
				<view class="btn_words">
					<view class="mwords">热线电话</view>
					<view class="mtips">7:00-22:00</view>
				</view>
			</view>
		</view>
		<view class="common_question">常见问题</view>
		<view class="question_list">
			<view class="question_item uni-flex" v-for="(item,index) in questionList" :key="index" @click="jumpUrl" :data-url="'/pages/user/content?id='+item.id">
				<view class="uni-flex-item question_title">{{item.title}}</view>
				<view class="question_more"><image src="../../static/user/right_jt_gray.png" mode=""></image></view>
			</view>
		</view>
		<!-- <view class="question">
			<rich-text :nodes="question.content"></rich-text>
		</view> -->
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import util from '../../common/util.js'
	import uniPopup from '../../components/uni-popup.vue'
	
	export default {
		data() {
			return {
				userid:'',
				userInfo:[],
				question:[],
				hotline:'',		//客服热线
				questionList:[],
				info:{
					title:'合作加盟',
					delta:1
				},
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			}
		},
		onLoad() {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			
			that.userid = userid
			that.userInfo = userInfo
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			that.getQuestionList();
			that.getHotline();
			
		
		},
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  console.log('下拉刷新中...');	
		  that.getQuestionList();
		  that.getHotline();
		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		methods: {
			//详情
			//获取常见问题
			getQuestionList(){
				var that = this
				uni.request({
					url: common.apiUrl + 'user/getQuestionList',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res)
						that.questionList = res.data.question_list
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//拨打客服电话
			phoneContact(){
				var that = this
				uni.makePhoneCall({
					phoneNumber:that.hotline
				})
			},
			
			//获取客服电话
			getHotline(){
				var that = this
				uni.request({
					url: common.apiUrl + 'user/getHotline',
					method: 'GET',
					data: {
					},
					success: res => {
						that.hotline = res.data.hotline
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
	.btn_block{with:100%;text-align: center;background:#fff;padding:30upx 0;}
	.btn_block_item{position:relative;}
	.btn_block .online_bg{background:#8bcb96;}
	.btn_block .phone_bg{background:#f5c066;}
	.btn_block .btn_img{width:100upx;height:100upx;margin:20upx auto;border-radius:50%;}
	.btn_block .btn_img image{width:60upx;height:60upx;margin:20upx;}
	.btn_words{text-align:center;color:#333;}
	.btn_words .mwords{font-size:32upx;line-height:30upx;}
	.btn_words .mtips{color:#666;}
	
	.common_question{padding:0 20upx;line-height:80upx;height:80upx;font-size:28upx;color:#666;}
	.question_list{background:#fff;padding-left:20upx;}
	.question_item{border-bottom:1upx solid #eee;line-height:80upx;height:80upx;}
	.question_item .question_title{line-height:80upx;font-size:32upx;color:#333;}
	.question_item .question_more{width:40upx;height:40upx;margin:20upx;}
	.question_item .question_more image{width:40upx;height:40upx;}
	
	.question{padding:20upx;background:#fff;font-size:28upx;color:#333;}
</style>
