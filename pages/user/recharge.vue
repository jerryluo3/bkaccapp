<template>
	<view class="page">

		<view class="page_bg"></view>
		<view class="account_header">
			<view class="account_wallet" @click="changeAccountType" data-type="wallet">
				<view class="wallet_amount">{{ userInfo.users_wallet }}</view>
				<view class="wallet_tips">钱包金额</view>
			</view>
		</view>
		<view class="t_blank"></view>
		<view class="weui-flex account_words">
			<view class="weui-flex__item account_words_v">
				<span>钱包明细</span>
			</view>
			<view class="account_option" @click="toggleZhuan">
				<view class="zhuanchu">资金提现</view>
			</view>
		</view>
		<scroll-view class="recharge_list" scroll-y="true" @scrolltolower="getAccountRechargeList">			
				<view class="recharge_item uni-flex" v-for="(item,index) in rechargeList" :key="index">
					<view class="recharge_date">{{item.ur_date}}</view>
					<view class="recharge_type">{{item.ur_type == 0 ? '增加' : '减少'}}</view>
					<view class="recharge_amount">¥{{item.ur_amount}}</view>
					<view class="uni-flex-item">{{item.ur_content}}</view>
				</view>
				<view class="isall" v-if="isall == 1">------没有更多了------</view>
		</scroll-view>
		
		<view class="popbg" v-if="popzhuan" @click="toggleZhuan"></view>
		<view class="pop_zhuan" v-if="popzhuan">
			<view class="uni-form">
				<view class="uni-form-item item_title">
					<view class="title">资金提现</view>
				</view>
				<view class="uni-input-row uni-flex row_item">
					<view class="uni-label labelname">可用金额</view>
					<view class="uni-flex-item">
						<input type="number" class="input_txt" readonly name="users_wallet" v-model="userInfo.users_wallet" placeholder="可用总金额" />
					</view>
				</view>
				<view class="uni-input-row uni-flex row_item">
					<view class="uni-label labelname">转到微信账号</view>
					<view class="uni-flex-item">
						<input type="number" class="input_txt" readonly name="weixin" placeholder="转到微信账号" />
					</view>
				</view>
				<view class="uni-input-row uni-flex row_item">
					<view class="uni-label labelname">转出金额</view>
					<view class="uni-flex-item">
						<input type="digit" class="input_txt" name="amounts" @input="checkAmounts" placeholder="转出金额" />
					</view>
				</view>
				
			</view>
			<view style="width:100%;height:120upx;"></view>
			<button class="btn-submit" @click="submitSave">提交</button>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				rechargeList:[],
				isall:0,
				page:0,
				type:'wallet',
				current:0,			//转出类型 0:不可提现账户 1:可提现账户
				amounts:0,			//转出金额
				popzhuan:false,		
				pingjun:0,			//平均每天单数
				needpingjum:10,		//需每天平均单数
				userInfo:[],
				
				info:{
					bg_color:'167,137,0',
					bg_alpha:1,
					delta:2,
					icon_color:'white'
				},				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			}
		},
		onLoad() {
			var that = this
			var userInfo = uni.getStorageSync('userInfo');
			var utype =  uni.getStorageSync('utype');			//用户类型
			
			that.userInfo = userInfo
			that.needpingjum = userInfo.shop_pingjundan
			
			
			that.getRechargeList();
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			// #ifdef H5
			that.titleHeight = 0;
			// #endif

		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');
			that.page = 0;
			that.isall = 0;
			that.rechargeList = []

			that.getRechargeList();
			that.getUserInfo();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			var that = this
			uni.showNavigationBarLoading();			
			
			that.getRechargeList();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods: {
			toggleZhuan(){
				var that = this
				
				if(!that.popzhuan){
					var account = that.info.shop_account
					if(account == 0){
						uni.showToast({
							title:'余额不足',
							icon:'none',
							duration:1500
						})
						return false
					}
				}
				that.popzhuan = !that.popzhuan
			},
			checkAmounts(e){
				var that = this
				that.amounts = e.detail.value
				
			},
			submitSave(e){
				var that = this
				var userInfo = uni.getStorageSync('userInfo');
				var wallet = userInfo.users_wallet
				var amounts = parseFloat(that.amounts)
				var weixin = e.detail.weixin
				
				if(amounts == 0){
					uni.showToast({
						title:'请输入提现金额',
						icon:'none',
						duration:1500
					})
					return false
				}
				
				if(amounts > wallet){
					uni.showToast({
						title:'余额不足',
						icon:'none',
						duration:1500
					})
					return false
				}
				
				uni.request({
					url: common.apiUrl + 'user/saveTixian',
					method: 'GET',
					data: {
						userid:userInfo.users_id,
						amount:amounts,
						weixin:weixin
					},
					success: res => {
						if(res.data.code == 0){
							uni.showToast({
								title:'操作成功',
								icon:'success',
								duration:1500,
								success:res=>{
									setTimeout(function(){
										that.resetAttr();
										that.getRechargeList();
										that.toggleZhuan();
										that.getUserInfo()
									})
								}
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none',
								duration:1500									
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			radioChange: function(evt) {
				var that = this
				that.current = evt.target.value;
				console.log(that.current);
			},
			//切换账户状态
			changeAccountType(e){
				var that = this
				var t_type = e.currentTarget.dataset.type
				if(t_type == that.type){
					return false
				}else{
					that.type = t_type
					that.resetAttr();
					that.getData();
				}
			},
			resetAttr(){
				var that = this
				that.page = 0
				that.isall = 0
				that.rechargeList = []
			},
			getData(){
				var that = this
				that.getRechargeList();
			},
			
			//获取用户信息
			getUserInfo(){
				var that = this
				var userInfo = uni.getStorageSync('userInfo');
				var userid = userInfo.users_id
				if(userid > 0){
					uni.request({
						url: common.apiUrl+'user/getUserInfo',
						method: 'GET',
						data: {
							userid:userid
						},
						data: {
							userid:userid
						},
						success: res => {
							if(res.data.code == 0){
								var userInfo = res.data.userInfo;
								uni.setStorageSync('userInfo',userInfo);
								that.userInfo = userInfo
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					uni.showModal({
						title: '提示',
						content: '你还没登录，现在去登录吗？',
						showCancel: true,
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
							if(res.confirm){
								uni.navigateTo({
									url: '/pages/userlogin/userlogin',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
					
			//获取资金明细列表
			getRechargeList(){
				var that = this
				var isall = that.isall
				console.log('isall',isall)
				if(isall == 1){
					return false;
				}
				var userInfo = uni.getStorageSync('userInfo');
				var uid = userInfo.mem_id
				uni.request({
					url: common.apiUrl + 'user/getRechargeList',
					method: 'GET',
					data: {
						uid:userInfo.users_id,
						page:that.page+1
					},
					success: res => {
						that.rechargeList = that.rechargeList.concat(res.data.recharge_list);
						that.isall = res.data.isall;
						console.log(res.data.recharge_list);
						that.page = res.data.page
						console.log(that.page);
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>

<style>
	page{background:#fff;text-align:center;}
	.page_bg{background:#a78900;height:200upx;position:relative;}	
	.account_header{width:670upx;height:180upx;position:absolute;z-index:10;top:40upx;left:40upx;border-radius:10upx;background:#fff;}
	.account_wallet{padding:20upx;}
	.wallet_amount{font-size:48upx;color:#a78900;font-weight: 700;line-height:80upx;}
	.wallet_tips{font-size:28upx;color:#666;line-height:38upx;}
	.sub_account{background:#fff;border:1upx solid #eee;border-bottom-left-radius:10upx;border-bottom-right-radius:10upx;padding:20upx 0;}
	.accout_money{font-size:32upx;font-weight: 700;color:#a78900;}
	.border_side{border-left:1upx solid #eee;}
	.account_tips{font-size:24upx;color:#666;}
	
	.t_blank{width:100%;height:10upx;}
	.account_words{padding:20upx 40upx;}
	.account_words_v{font-size:28upx;font-weight:700;color:#a78900;text-align: left;}
	.account_option{}
	.zhuanchu{background:#a78900;color:#fff;width:150upx;text-align: center;font-size:28upx;height:60upx;line-height:60upx;border-radius: 6upx;}
	
	.infos{width:100%}
	.header{background:#fafafa;border-bottom:1upx solid #ddd;height:80upx;line-height:80upx;font-size:28upx;width:100%;z-index:10;}
	.header view{line-height:80upx;}
	.recharge_list{overflow:scroll;position: fixed;top:300upx;bottom:0;width:100%;}
	.recharge_item{font-size:28upx;color:#444;border-bottom:1upx solid #eee;line-height:50upx;}
	.recharge_item view{line-height:60upx;}
	.recharge_date{width:150upx;}
	.recharge_type{width:100upx;}
	.recharge_amount{width:200upx;}
	.isall{color:#999;hegiht:60upx;line-height:60upx;margin:30upx 0;}
	
	.popbg{background: rgba(0,0,0,.8);position:fixed;top:0;left:0;bottom:0;right:0;z-index:1000;}
	.pop_zhuan{background:#fff;width:670upx;position:fixed;top:240upx;left:40upx;z-index:2000;}
	.input_txt{font-size:28upx;}
	.btn-submit{border-radius:0;width:100%;z-index:1000;background:#F76260;color:#fff;}
	.uni-form{background:#fff;font-size:28upx;}
	.row_item{border-bottom:1upx solid #eee;}
	.item_title{background:#eee;}
	
</style>
