<template>
	<view class="page">
		<view class="invite_header">
			<image v-if="ads.aa_picture" :src="baseUrl + ads.aa_picture" mode="aspectFill"></image>
		</view>
		<!-- <view class="invite_list uni-swiper-msg">			
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<navigator>{{item}}</navigator>
				</swiper-item>
			</swiper>
		</view> -->
		
		<view class="invite_btns">
			<view class="uni-flex">
				<view class="uni-flex-tem invite_haibao" @click="popHaibao">朋友圈海报</view>
				<view class="uni-flex-tem invite_qrcode">
					<button open-type="share" style="position:absolute;top:0;left:0;right:0;bottom:0; opacity: 0;" type="warn">赠送给好友</button>
					赠送给好友
				</view>
			</view>
		</view>
		
		<view class="invite_rule" style="margin-bottom:20upx;">
			<view class="invite_rule_title"><text>我的邀请</text></view>
			<view class="invite_rule_content">
				<view class="invite_user" v-for="(item,index) in userList" :key="index">
					{{item.users_mobile}}
				</view>
			</view>
		</view>
		
		<view class="invite_rule">
			<view class="invite_rule_title"><text>{{rule.title}}</text></view>
			<view class="invite_rule_content">
				<rich-text :nodes="rule.content"></rich-text>
			</view>
		</view>		
		
		<!-- 居中 -->
		<uni-popup :show="showHaibaoMiddle" :type="popType" v-on:hidePopup="hideHaibao">
			<image :src="haibao" mode="aspectFit" class="haibaoimg"></image>
			<button class="savebtn" @click="saveHaibao">保存海报到相册</button>
		</uni-popup>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import util from '../../common/util.js'
	import uniPopup from '../../components/uni-popup.vue'
	
	export default {
		data() {
			return {
				baseUrl:common.baseUrl,
				userid:'',
				userInfo:[],
				ads:[],
				msg : [],
				rule:[],
				popType: 'middle',
				showPopupMiddle: false,				
				qrval:'',
				qrsize:170,
				qrcode :'',
				showHaibaoMiddle:false,
				haibao:'',
				userList:[],
			}
		},
		onLoad() {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			
			that.userid = userid
			that.userInfo = userInfo
			
			that.qrval = '/pages/index/index?tjuid='+userid
			
			that.getInviteDetailAds();
			that.getInviteRule();
			that.getInviteLogs();
			that.getInviteUserList();
			
			
		},
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  console.log('下拉刷新中...');	
		  
		  that.getInviteDetailAds();
		  that.getInviteRule();
		  that.getInviteLogs();
		  that.getInviteUserList();
		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		onShareAppMessage(res) {
			var that = this
			var userid = that.userid
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '商家活动广告平台——众晨星',
			  path: '/pages/index/index?tjuid='+userid
			}
		},
		methods: {
			
			//统一的关闭popup方法
			hidePopup: function() {
				this.showPopupMiddle = false;
			},
			//展示居中 popup
			showMiddlePopup: function() {
				this.hidePopup();
				this.showPopupMiddle = true;
				this.creatQrcode();
			},			
			hideHaibao(){
				var that = this
				that.showHaibaoMiddle = false;
			},
			//海报
			popHaibao(){
				var that = this
				that.hideHaibao();
				that.showHaibaoMiddle = true;
				that.creatHaibao();
			},
			//保存海报
			saveHaibao(){
				var that = this
				var imgSrc = that.haibao
				console.log(imgSrc)
				uni.downloadFile({
					url: imgSrc, //仅为示例，并非真实的资源
					success: (res) => {
						//console.log(res);
						uni.saveImageToPhotosAlbum({
						  filePath: res.tempFilePath,
						  success(result) {
							uni.showModal({
								title:'提示',
								content:'保存相册成功',
								success() {
									that.hideHaibao();
								}
							})
						  }
						})
					}
				});
			},
			//获取海报
			creatHaibao(){
				var that = this
				var userid = uni.getStorageSync('userid');
				uni.request({
					url: common.baseUrl + 'sharepic/getInviteHaibao',
					method: 'GET',
					data: {
						uid:userid
					},
					success: res => {
						//console.log("qrcode",res);
						that.haibao = res.data.result
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//邀请列表
			getInviteLogs(){
				var that = this
				uni.request({
					url: common.apiUrl + 'user/getInviteLogs',
					method: 'GET',
					data: {},
					success: res => {
						console.log("logs",res);
						that.msg = res.data.logs;
					},
				});
			},
			//邀请规则
			getInviteRule(){
				var that = this
				uni.request({
					url: common.apiUrl + 'ads/getInviteRule',
					method: 'GET',
					data: {},
					success: res => {
						that.rule = res.data.rule;
					},
				});
			},
			//邀请详情广告
			getInviteDetailAds(){
				var that = this
				uni.request({
					url: common.apiUrl + 'ads/getInviteDetailAds',
					method: 'GET',
					data: {},
					success: res => {
						that.ads = res.data.ads
					},
					fail: () => {},
					complete: () => {}
				});
			},
			creatQrcode(){
				//this.$refs.qrcode.creatQrcode();
				var that = this
				var userid = uni.getStorageSync('userid');
				uni.request({
					url: common.baseUrl + 'sharepic/getInviteQrcode',
					method: 'GET',
					data: {
						uid:userid
					},
					success: res => {
						//console.log("qrcode",res);
						that.qrcode = res.data.qrcode
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//获取邀请用户列表
			getInviteUserList(){
				var that = this
				var userid = uni.getStorageSync('userid');
				uni.request({
					url: common.apiUrl + 'user/getInviteUserList',
					method: 'GET',
					data: {
						uid:userid
					},
					success: res => {
						console.log(res);
						that.userList = res.data.user_list
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		components: {
			uniPopup,
		}
	}
</script>

<style>
	.invite_header{width:750upx;height:705upx;}
	.invite_header image{width:750upx;height:705upx;}
	.invite_list{width:750ux;text-align:center;background:#fff6d7;color:#702200;}
	.invite_btns{background:#fff;width:750upx;padding:80upx 0;text-align: center;margin-bottom:20upx;}
	.invite_haibao{background:#00BFFF;color:#fff;font-size:40upx;width:90%;height:80upx;line-height:80upx;border-radius:60upx;margin:0 5%;}
	.invite_qrcode{background:#09BB07;color:#fff;font-size:40upx;width:90%;height:80upx;line-height:80upx;border-radius:60upx;margin:0 5%;position:relative;}

	.invite_rule{background:#fff;width:750upx;padding-top:30upx;}
	.invite_rule_title{font-size:36upx;text-align:center;border-bottom:1upx dashed #ccc;height:40upx;}
	.invite_rule_title text{position:relative;background:#fff;padding:0 20upx;line-height:40upx;}
	.invite_rule_content{padding:40upx;color:#444;}
	.uni-popup-middle{width:60%;height:auto;position:fixed;padding:0;}
	.qrcode{width:380upx;height:380upx;}
	.haibaoimg{width:600upx;height:1050upx;}
	
	.savebtn{width:90%;background:#FF8400;color:#fff;height:100upx;border-radius:6upx;text-align:center;line-height:100upx;position: fixed;bottom:120upx;}
	
	.invite_user{width:30%;display:inline-block;height:60upx;line-height:60upx;text-align:center;}
</style>
