<template>
	<view class="page">
		<view class="order_header">
			<view class="order_status">{{status}}</view>
			<view class="order_status_tip" v-if="pay_status == -1">
				感谢您对凡迪优品的信任，期待再次光临
			</view>
			<view class="order_status_tip" v-else-if="ps_status < 2">
				您的订单正在处理中，请耐心等待
			</view>
			
			<view class="order_status_tip" v-else>
				感谢您对凡迪优品的信任，期待再次光临
			</view>
			<button class="order_pay" open-type="getUserInfo" @tap="authpay" v-if="(userInfo.users_openid == null || userInfo.users_openid == '') && pay_status == 0 && pay_type == 1">授权并支付</button>
			<button class="order_pay" @tap="payfee" v-else-if="userInfo.users_openid != null && userInfo.users_openid != '' && pay_status == 0">马上支付</button>
			
			<button class="order_pay" @tap="shouhuo" v-else-if="orderinfo.order_ps_status == 4 && pay_status == 1">确认收货 {{ all_cha == 0 ? '' : (all_cha > 0 ? '(补差价¥'+all_cha_abs+')' : '(退差价¥'+all_cha_abs+')' ) }}</button>
		</view>
		<view class="order_block">
			<view class="order_block_tilte">商品列表</view>
			<view class="order_list">
				<block v-for="(item,index) in orderList" :key="index">
				<view class="order_item weui-flex" :class="item.order_status == 1 && item.order_ps_status == 4 ? 'quhuo' : ''">
					<view class="order_title weui-flex__item">
						<view class="title_name">{{item.order_title}}</view>
						<view class="shop_title">{{item.shop_title}}</view>
						<!-- <view class="hezong" v-if="item.order_weight != item.order_realweight">重量：{{item.order_weight}}g / 实重：{{item.order_realweight}}g</view> -->
					</view>
					<view class="order_nums">x{{item.order_nums}}</view>
					<view class="order_amount">
						<view>¥{{item.order_amount}}</view>
						<view class="hezong" v-if="item.order_amount != item.order_realamount">
							¥{{item.order_realamount}}
						</view>
					</view>
				</view>
				</block>
			</view>
			<view class="fee_list">
				<view class="fee_item weui-flex" v-if="bzfee > 0">
					<view class="weui-flex__item fee_name">包装费</view>
					<view class="weui-flex__item fee_num">¥0.00</view>
				</view>
				<view class="fee_item weui-flex" v-if="psfee > 0">
					<view class="weui-flex__item fee_name">配送费</view>
					<view class="weui-flex__item fee_num">¥{{ psfee }}</view>
				</view>
				<view class="fee_item weui-flex" v-if="disamount > 0">
					<view class="weui-flex__item fee_name">优惠</view>
					<view class="weui-flex__item fee_num disamount">-¥{{disamount}}</view>
				</view>
				<view class="fee_item weui-flex">
					<view class="weui-flex__item fee_name"></view>
					<view class="weui-flex__item fee_num all_amount">合计：¥{{all_amount}}<text v-if="coupon_disamount > 0">-优惠券¥{{ coupon_disamount }}</text></view>
				</view>
			</view>
		</view>
		<view class="order_block">
			<view class="order_block_tilte">配送信息</view>
			<view class="ps_list">
				<view class="ps_item weui-flex">
					<view class="item_name">送达时间</view>
					<view class="weui-flex__item item_val">{{ orderinfo.pstime }} {{ orderinfo.order_pstime_para }}</view>
				</view>
				<view class="ps_item weui-flex">
					<view class="item_name">收货信息</view>
					<view class="weui-flex__item item_val">
						<view class="item_detail">{{orderinfo.ua_address}}</view>
						<view class="item_detail">{{orderinfo.ua_name}}{{orderinfo.ua_sex}}　{{orderinfo.ua_mobile}}</view>
					</view>
				</view>
				<view class="ps_item weui-flex">
					<view class="item_name">配送方式</view>
					<view class="weui-flex__item item_val">{{orderinfo.os_pstype == 0 ? '配送' : '自取'}}</view>
				</view>
			</view>
		</view>
		<view class="order_block">
			<view class="order_block_tilte">订单信息</view>
			<view class="ps_list">
				<view class="ps_item weui-flex">
					<view class="item_name">订单号</view>
					<view class="weui-flex__item item_val">{{orderinfo.order_no}}</view>
				</view>
				<view class="ps_item weui-flex">
					<view class="item_name">支付方式</view>
					<view class="weui-flex__item item_val">{{ pay_type == 1 ? '在线支付' : '货到付款' }}</view>
				</view>
				<view class="ps_item weui-flex">
					<view class="item_name">下单时间</view>
					<view class="weui-flex__item item_val">{{orderinfo.addtime}}</view>
				</view>
			</view>
		</view>
		<button class="order_cancel" @tap="cancel" v-if="isneworder == 1 && pay_status >= 0">取消订单({{counttime}})</button>
		
		<view class="popbg" v-if="showOrderQR" @click="toggleOrderQR"></view>
		<view class="pop_orderqr" v-if="showOrderQR">
			<image v-if="orderQR != ''" :src="baseUrl + orderQR" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import util from '../../common/util.js'
	
	export default {
		data() {
			return {
				baseUrl:common.baseUrl,
				userid:'',
				userInfo:[],
				orderno:'',
				status:'',
				pay_status:0,
				ps_status:0,
				pay_type:1,			//支付方式
				orderList:[],
				all_amount:0,		//订单总金额
				all_realamount:0,	//订单实际金额
				all_cha:0,			//订单差额
				all_cha_abs:0,		//差额绝对值
				bzfee:0,			//包装费
				psfee:0,			//配送费
				disamount:0,		//优惠
				orderinfo:[],		//包含配送信息的订单信息,单条
				addtime:'',
				isneworder:0,		//是否新订单，120秒内
				counttime:'',		//倒计时
				psuser:[],			//配送人员
				maishou:[],			//买手信息
				coupon_disamount:0,	//优惠券减免
				orderQR:'',			//订单二维码
				showOrderQR:false,	//是否显示核销码
				
				info:{
					delta:2,
				},
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			};
		},
		onLoad(e) {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			console.log(userInfo);
			that.userid = userid;
			that.userInfo = userInfo;
			var orderno = e.id;
			that.orderno = orderno
			that.getOrderInfo(orderno);
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			var act = e.act;
			if(act == 'payfee'){
				that.payfee();
			}
			
			
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');	
			var orderno = that.orderno;

			that.getOrderInfo();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		methods:{
			toggleOrderQR(){
				var that = this
				var showOrderQR = that.showOrderQR
				that.showOrderQR = !showOrderQR
			},
			//核销码
			orderQRCode(){
				var that = this
				var orderno = that.orderno
				uni.request({
					url: common.baseUrl + 'sharepic/getOrderQR',
					method: 'GET',
					data: {
						orderno:orderno
					},
					success: res => {
						console.log("orderQR",res);
						that.orderQR = res.data.orderQR
						that.toggleOrderQR();
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			//收货
			shouhuo(){
				var that = this
				
				var cha = parseFloat(that.all_cha);
				
				uni.showModal({
					title:'提示',
					content:'确认收货吗？',
					success(res) {
						if(res.confirm){
							if(cha > 0){
								//补差价
								that.buCha();
							}else if(cha < 0){
								//退差价								
								that.tuiCha();
							}else{
								//无差价
								console.log(cha);
								that.shouhuoSubmit();
							}
						}
						
					}
				})
				
			},
			//补差价
			buCha(){
				var that = this
				uni.request({
					url: common.apiUrl + 'bucha',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					data: {
						userid:that.userid,
						orderno:that.orderno,
						cha:that.all_cha_abs
					},
					success: res => {
						var data = res.data
						if(data.code == 0){
							//余额补差完成
							uni.showToast({
								title:'余额补差成功',
								duration:1000,
								icon:'success',
								success(ress) {
								  setTimeout(function () {
									that.getOrderInfo();
								  }, 1500) //延迟时间
								}
							})
						}else if(data.code == 1){
							//余额不够，现金来凑
							var payfee = data.payfee
							var order_no = data.order_no
							that.buchaPayfee(order_no,payfee);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//补差支付订单
			buchaPayfee(orderno,payfee){
				var that = this
				var userid = that.userid
				uni.request({
					url: common.apiUrl+'buchaPayfee',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					data: {
						userid:userid,
						order_no:orderno,
						payfee:payfee
					},
					success: res => {
						console.log(res)
						var timeStamp = res.data.timeStamp
						var nonceStr = res.data.nonceStr;
						var vpackage = res.data.package;
						var paySign = res.data.paySign;
						//console.log("nonceStr",nonceStr);
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: timeStamp,
							nonceStr: nonceStr,
							package: vpackage,
							signType: 'MD5',
							paySign: paySign,
							success: function (res) {								
								uni.showToast({
									title: '支付成功',
									icon: 'success',
									duration: 2000,
									success(ress) {
									  setTimeout(function () {
										uni.reLaunch({
										  url: '/pages/orders/orders'
										})
									  }, 1000) //延迟时间
									}
								  });
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					},
					fail: () => {},
					complete: () => {}
				});
				//console.log(that.userInfo);
				//console.log('开始支付');
			},
			
			//退差价
			tuiCha(){
				var that = this
				uni.request({
					url: common.apiUrl + 'tuiCha',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					data: {
						userid:that.userid,
						orderno:that.orderno,
						cha:that.all_cha_abs
					},
					success: res => {
						var data = res.data
						console.log(data)
						if(data.code == 0){
							uni.showToast({
								title: '操作成功,退款已入账户钱包',
								duration: 1000,
								icon :'none'
							})
							that.getOrderInfo();
						}else{
							uni.showToast({
								title: data.msg,
								duration: 1000,
								icon :'none'
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//确认收货提示
			confirmShouhuo(){
				var that = this
				uni.showModal({
					title:'提示',
					content:'确认收货吗？',
					success() {
						that.shouhuoSubmit();
					}
				})
			},
			//确认收货操作
			shouhuoSubmit(){
				var that = this
				uni.request({
					url: common.apiUrl + 'shouhuo',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					data: {
						userid:that.userid,
						orderno:that.orderno
					},
					success: res => {
						var data = res.data
						console.log(data);
						if(data.code == 0){
							uni.showToast({
								title:'操作成功',
								duration:1000,
								icon:'success'
							})
							that.getOrderInfo();
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//取消订单
			cancel(){
				var that = this
				var userid = that.userid
				var orderno = that.orderno
				uni.showModal({
					title:'提示',
					content:'确定要取消订单吗？',
					success(res) {
						if (res.confirm) {
							uni.request({
								url: common.apiUrl + 'cancelOrder',
								method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
								data: {
									userid:userid,
									orderno:orderno
								},
								success: res => {
									console.log(res)
									if(res.data.code == ''){
										uni.showToast({
											title:'操作成功',
											icon:'success',
											duration: 1000,
											success(ress) {
											  setTimeout(function () {
												that.getOrderInfo();
											  }, 1000) //延迟时间
											}
										})
										
									}
								},
								fail: () => {},
								complete: () => {}
							});
						}
						
					}
				})
				
			},
			//授权并支付
			authpay(){
				var that = this
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					console.log(loginRes);
					var code = loginRes.code;
					// 获取用户信息
					uni.getUserInfo({
					  provider: 'weixin',
					  success: function (infoRes) {
						
						var rawData = infoRes.rawData;
						var signature = infoRes.signature;
						var iv =  infoRes.iv;
						var encryptedData = infoRes.encryptedData;
						uni.request({
							url: common.apiUrl+'login/updateUserInfo',
							method: 'GET',
							data: {
								userid:that.userid,
								code:code,
								rawData:rawData,
								signature:signature,
								iv:iv,
							},
							success: res => {
								console.log(res);
								if(res.data.code == 0){
									var userInfo  = res.data.userInfo;
									uni.setStorageSync('userInfo',userInfo);
									that.userInfo = userInfo;
									that.payfee();
								}else{
									uni.showToast({
										title: res.data.msg,
										duration: 1000,
										icon :'none'
									})
								}
							},
							fail: () => {},
							complete: () => {}
						});
						
					  }
					});
				  }
				});
			},
			
			//支付订单
			payfee(){
				var that = this
				var userid = that.userid
				var orderno = that.orderno
				console.log(userid);
				console.log('orderno',orderno)
// 				if(that.all_amount <= that.coupon_disamount){
// 					return false
// 				}
				uni.request({
					url: common.apiUrl+'pay/payfee',
					method: 'GET',
					data: {
						userid:userid,
						order_no:orderno
					},
					success: res => {
						console.log(res)
						var timeStamp = res.data.timeStamp
						var nonceStr = res.data.nonceStr;
						var vpackage = res.data.package;
						var paySign = res.data.paySign;
						//console.log("nonceStr",nonceStr);
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: timeStamp,
							nonceStr: nonceStr,
							package: vpackage,
							signType: 'MD5',
							paySign: paySign,
							success: function (res) {
								uni.showModal({
									title: '提示',
									content: '支付成功,您的订单将在'+that.orderinfo.pstime +'　'+ that.orderinfo.order_pstime_para+'左右送达',
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										setTimeout(function () {
											uni.reLaunch({
											  url: '/pages/orders/orders'
											})
										}, 1000) //延迟时间
									},
									fail: () => {},
									complete: () => {}
								});
								// uni.showToast({
								// 	title: '支付成功',
								// 	icon: 'success',
								// 	duration: 2000,
								// 	success(ress) {
								// 	  setTimeout(function () {
								// 		uni.reLaunch({
								// 		  url: '/pages/orders/orders'
								// 		})
								// 	  }, 1000) //延迟时间
								// 	}
								//   });
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
					},
					fail: () => {},
					complete: () => {}
				});
				//console.log(that.userInfo);
				//console.log('开始支付');
			},
			
			//获取订单列表
			getOrderInfo(){
				var that = this
				var orderno = that.orderno;
				console.log(orderno);
				uni.request({
					url: common.apiUrl+'orders/getOrderInfo',
					method: 'GET',
					data: {
						orderno:orderno
					},
					success: res => {
						console.log(res);
						that.orderList = res.data.order_list
						that.status = res.data.orderinfo.status;
						that.ps_status = res.data.orderinfo.order_ps_status;
						that.pay_status = res.data.orderinfo.order_status;
						that.pay_type = res.data.orderinfo.order_paytype
						that.coupon_disamount = res.data.coupon_disamount;
						that.all_amount = res.data.all_amount;
						that.all_realamount = res.data.all_realamount;
						that.all_cha = res.data.all_cha;
						that.all_cha_abs = res.data.all_cha_abs;
						that.disamount = res.data.disamount;
						that.psfee = res.data.psfee;
						that.bzfee = res.data.bzfee;
						that.orderinfo = res.data.orderinfo;
						that.addtime = res.data.orderinfo.order_addtime
						that.psuser = res.data.psuser
						that.maishou = res.data.maishou
						
						//that.cancelOrderCountDown();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//取消订单倒计时
			cancelOrderCountDown(){
				var that = this
				var addtime = that.addtime
				var mdate = new Date();
				var now = mdate.getTime();
				now = now/1000;
				console.log(now);
				if(now-addtime < 60 && that.pay_status >= 0){
					var ltime = 60-(now-addtime);
					var ss = util.formatTime(ltime);
					that.counttime = ss
					
					//setInterval(cancelOrderCountDown,1000);
					setTimeout(function() {  
						that.cancelOrderCountDown()  
					},  
					1000)
					that.isneworder = 1;
				}else{
					clearTimeout(function(){
						that.cancelOrderCountDown()
					})
					that.isneworder = 0;
				}
				
			},
			
			//联系骑手
			contactRider(){
				var that = this
				var psuser = that.psuser
				if(psuser != ''){
					uni.makePhoneCall({
						phoneNumber:psuser.mem_mobile
					})
				}else{
					uni.showToast({
						title:'获取骑手信息失败',
						duration:1000
					})
				}
			},
			
			//联系买手
			contactMaishou(){
				var that = this
				var maishou = that.maishou
				if(maishou != ''){
					uni.makePhoneCall({
						phoneNumber:maishou.mem_mobile
					})
				}else{
					uni.showToast({
						title:'获取买手信息失败',
						duration:1000
					})
				}
			}
			
			
			

		}
	}
</script>
<style>
.order_header{background:#fff;padding:30upx;text-align:center;margin-bottom:20upx;}
.order_status{font-size:36upx;font-weight:bold;}
.order_status_tip{font-size:28upx;color:#666;padding:20upx 0;}
.order_pay{background:#fdd108;color:#008085;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
.order_cancel{background:#c40;color:#fff;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
.order_maishou{background:#00B26A;color:#fff;height:70upx;line-height:70upx;border-radius:6upx;text-align:center;margin:3%;font-size:28upx;}
.order_qishou{background:#1286E9;color:#fff;height:70upx;line-height:70upx;border-radius:6upx;text-align:center;margin:3%;font-size:28upx;}

.order_block{background:#fff;width:100%;margin-bottom:20upx;}
.order_block_tilte{height:80upx;line-height:80upx;font-size:32upx;font-weight:bold;text-indent:20upx;border-bottom:1upx solid #eee;}
.order_list{display:block;}
.order_item{border-bottom:1upx solid #eee;line-height:60upx;color:#333;padding:10upx 20upx;}
.order_img{width:60upx;height:60upx;}
.order_img image{width:60upx;height:60upx;}

.quhuo{background: url('https://www.dingecai.com/data/weapp/images/quhuo.png') top center no-repeat #fafafa;background-size:100upx 100upx;}
.order_title{}
.title_name{font-size:28upx;}
.shop_title{font-size:28upx;font-weight: 700;}
.hezong{color:#f00;}
.order_nums{width:100upx;text-align:right;font-size:24upx;}
.order_amount{width:150upx;text-align:right;font-size:28upx;}

.fee_list{width:100%;}
.fee_item{border-bottom: 1upx solid #eee;line-height:70upx;padding:10upx 0;}
.fee_name{padding-left:20upx;font-size:28upx;}
.fee_num{text-align: right;padding-right:20upx;}
.all_amount{font-size:28upx;font-weight:bold;}
.all_amount text{color:#f00;}
.disamount{color:#e50011}

.ps_list{width:100%;}
.ps_item{border-bottom:1upx solid #eee;font-size:24upx;color:#666;padding:20upx;}
.item_name{font-size:28upx;color:#333;width:200upx;}
.item_val{text-align:right;font-size:28upx;}
.item_detail{text-align:right;font-size:28upx;}

.popbg{background:rgba(0,0,0,.8);position:fixed;top:0;right:0;bottom:0;left:0;z-index:100;}
.pop_orderqr{width:500upx;background:#fff;border-radius:10upx;position:fixed;top:200upx;left:105upx;right:105upx;padding:20upx;z-index:1000;}
.pop_orderqr image{width:500upx;height:500upx;display:block;}
</style>
