<template>
	<view class="page">

		<view class="page_bg"></view>
		<view class="account_header">
			<view class="account_wallet" @click="changeAccountType" data-type="wallet">
				<view class="wallet_amount">{{ userInfo.users_integral }}</view>
				<view class="wallet_tips">积分</view>
			</view>
		</view>
		<view class="t_blank"></view>
		<view class="weui-flex account_words">
			<view class="weui-flex__item account_words_v" :class="tabindex == 0 ? 'active' : ''" >
				<span>积分明细</span>
			</view>
			<view class="weui-flex__item account_words_v">
				<span></span>
			</view>
		</view>
		<scroll-view class="recharge_list" scroll-y="true" @scrolltolower="getIntegralList">			
				<view class="recharge_item uni-flex" v-for="(item,index) in integralList" :key="index">
					<view class="recharge_date">{{item.ui_date}}</view>
					<view class="recharge_amount">{{item.ui_type == 0 ? '+' : '-'}}{{item.ui_amount}}</view>
					<view class="uni-flex-item">{{item.ui_content}}</view>
				</view>
				<view class="isall" v-if="isall == 1">------没有更多了------</view>
		</scroll-view>
		
		<view class="popbg" v-if="popzhuan" @click="toggleZhuan"></view>
		<view class="pop_zhuan" v-if="popzhuan">
			<view class="uni-form">
				<view class="uni-form-item item_title">
					<view class="title">积分兑换余额</view>
				</view>
				<view class="uni-input-row uni-flex row_item">
					<view class="uni-label labelname">可用积分</view>
					<view class="uni-flex-item">
						<input type="number" class="input_txt" readonly name="users_integral" v-model="userInfo.users_integral" placeholder="可用总金额" />
						<view class="common_btn" @click="setall">全部</view>
					</view>
				</view>
				<view class="uni-input-row uni-flex row_item">
					<view class="uni-label labelname">兑换数量</view>
					<view class="uni-flex-item">
						<input type="digit" class="input_txt" name="amounts" v-model="amounts" @input="checkAmounts" placeholder="兑换数量" />
					</view>
				</view>
				<view class="uni-input-row uni-flex row_item">
					<view class="uni-label labelname">可兑余额</view>
					<view class="uni-flex-item">
						{{ money }}
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
				integralList:[],
				isall:0,
				page:0,
				type:'wallet',
				current:0,			//转出类型 0:不可提现账户 1:可提现账户
				amounts:0,			//转出积分
				popzhuan:false,		
				pingjun:0,			//平均每天单数
				needpingjum:10,		//需每天平均单数
				userInfo:[],
				
				money:0,
				duihuanbi:100,		//积分兑换比
				
				tabindex:0,			
			}
		},
		onLoad() {
			var that = this
			var userInfo = uni.getStorageSync('userInfo');
			var utype =  uni.getStorageSync('utype');			//用户类型
			
			that.userInfo = userInfo
			that.needpingjum = userInfo.shop_pingjundan
			
			
			that.getIntegralList();
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');
			that.resetAttr();

			if(that.tabindex == 1){
				that.getIntegralTempList();
			}else{
				that.getIntegralList();
			}
			that.getUserInfo();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			var that = this
			uni.showNavigationBarLoading();	
			
			that.getIntegralList();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods: {
			switchTabs(e){
				var that = this
				var tabindex = e.currentTarget.dataset.tabindex
				console.log(tabindex)
				if(tabindex != that.tabindex){
					that.tabindex = tabindex
					that.resetAttr();
					if(tabindex == 0){
						that.getIntegralList();
					}else{
						that.getIntegralTempList();
					}
				}
			},
			toggleZhuan(){
				var that = this
				
				if(!that.popzhuan){
					var account = that.userInfo.users_integral
					if(account == 0){
						uni.showToast({
							title:'积分不足',
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
				var amounts = e.detail.value
				//var users_integral = that.userInfo.users_integral
				//amounts = amounts > users_integral ? users_integral : amounts
				that.amounts = amounts
				that.recountMoney();
			},
			setall(){
				var that = this
				var integral = that.userInfo.users_integral
				that.amounts = integral
				that.recountMoney();
			},
			//计算可得余额
			recountMoney(){
				var that = this
				var duihuanbi  = that.duihuanbi
				var money = (that.amounts/duihuanbi).toFixed(2);
				that.money = money
			},
			submitSave(e){
				var that = this
				var userInfo = uni.getStorageSync('userInfo');
				var integral = userInfo.users_integral
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
				
				if(amounts > integral){
					uni.showToast({
						title:'积分不足',
						icon:'none',
						duration:1500
					})
					return false
				}
				
				uni.request({
					url: common.apiUrl + 'user/saveDuihuan',
					method: 'GET',
					data: {
						userid:userInfo.users_id,
						amount:amounts
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
										that.getIntegralList();
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
				that.integralList = []
			},
			getData(){
				var that = this
				that.getIntegralList();
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
					
			//获取积分明细列表
			getIntegralList(){
				var that = this
				var isall = that.isall
				console.log('isall',isall)
				if(isall == 1){
					return false;
				}
				var userInfo = uni.getStorageSync('userInfo');
				var uid = userInfo.mem_id
				uni.request({
					url: common.apiUrl + 'user/getIntegralList',
					method: 'GET',
					data: {
						uid:userInfo.users_id,
						page:that.page+1
					},
					success: res => {
						that.integralList = that.integralList.concat(res.data.integral_list);
						that.isall = res.data.isall;
						console.log(res.data.integral_list);
						that.page = res.data.page
						console.log(that.page);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//获取积分临时表明细列表
			getIntegralTempList(){
				var that = this
				var isall = that.isall
				console.log('isall',isall)
				if(isall == 1){
					return false;
				}
				var userInfo = uni.getStorageSync('userInfo');
				var uid = userInfo.mem_id
				uni.request({
					url: common.apiUrl + 'user/getIntegralTempList',
					method: 'GET',
					data: {
						uid:userInfo.users_id,
						page:that.page+1
					},
					success: res => {
						that.integralList = that.integralList.concat(res.data.integral_list);
						that.isall = res.data.isall;
						console.log(res.data.integral_list);
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
	.page_bg{background:#4cb3c1;height:200upx;position:relative;}	
	.account_header{width:670upx;height:180upx;position:absolute;z-index:10;top:40upx;left:40upx;border-radius:10upx;background:#fff;}
	.account_wallet{padding:20upx;}
	.wallet_amount{font-size:48upx;color:#4cb3c1;font-weight: 700;line-height:80upx;}
	.wallet_tips{font-size:28upx;color:#666;line-height:38upx;}
	.sub_account{background:#fff;border:1upx solid #eee;border-bottom-left-radius:10upx;border-bottom-right-radius:10upx;padding:20upx 0;}
	.accout_money{font-size:32upx;font-weight: 700;color:#4cb3c1;}
	.border_side{border-left:1upx solid #eee;}
	.account_tips{font-size:24upx;color:#666;}
	
	.t_blank{width:100%;height:10upx;}
	.account_words{text-align: center;border-bottom:1upx solid #ddd;margin-bottom:10upx;background:#fafafa;}
	.account_words_v{font-size:28upx;font-weight:700;padding:20upx 0;}
	.active{color:#4cb3c1;background:#fefefe}
	.account_option{}
	.zhuanchu{background:#4cb3c1;color:#fff;width:150upx;text-align: center;font-size:28upx;height:60upx;line-height:60upx;border-radius: 6upx;}
	
	.infos{width:100%}
	.header{background:#fafafa;border-bottom:1upx solid #ddd;height:80upx;line-height:80upx;font-size:28upx;width:100%;z-index:10;}
	.header view{line-height:80upx;}
	.recharge_list{overflow:scroll;position: fixed;top:300upx;bottom:0;width:100%;}
	.recharge_item{font-size:28upx;color:#444;border-bottom:1upx solid #eee;line-height:50upx;}
	.recharge_item view{line-height:60upx;}
	.recharge_date{width:120upx;}
	.recharge_type{width:80upx;}
	.recharge_amount{width:150upx;}
	.isall{color:#999;hegiht:60upx;line-height:60upx;margin:30upx 0;}
	
	.popbg{background: rgba(0,0,0,.8);position:fixed;top:0;left:0;bottom:0;right:0;z-index:1000;}
	.pop_zhuan{background:#fff;width:670upx;position:fixed;top:240upx;left:40upx;z-index:2000;}
	.input_txt{font-size:28upx;}
	.btn-submit{border-radius:0;width:100%;z-index:1000;background:#F76260;color:#fff;}
	.uni-form{background:#fff;font-size:28upx;}
	.row_item{border-bottom:1upx solid #eee;position:relative;}
	.item_title{background:#eee;}
	
	.common_btn{position:absolute;z-index:100;right:20upx;top:10upx;background:#aaa;color:#fff;width:100upx;text-align: center;font-size:28upx;height:60upx;line-height:60upx;border-radius: 6upx;}
	
</style>
