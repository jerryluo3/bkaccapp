<template>
	<view class="page">

		<view class="order_header">
			<view class="order_status">{{ status }}</view>
			<button class="order_pay" open-type="getUserInfo" @tap="authpay" v-if="(userInfo.users_openid == null || userInfo.users_openid == '') && order.order_status == 0">授权并支付</button>
			<button class="order_pay" @tap="payfee" v-else-if="userInfo.users_openid != null && userInfo.users_openid != '' && order.order_status == 0">马上支付</button>
		</view>
		<view class="order_block">
			<view class="contact_btn weui-flex">
				<view class="weui-flex__item" v-if=" order.order_status == 1"><button class="order_qishou" @click="orderQRCode">核销码</button></view>
				<view class="weui-flex__item" v-if="maishou != ''"><button class="order_maishou" @click="contactMaishou">联系客服</button></view>
			</view>
		</view>
		<view class="order_block">
			<view class="order_block_tilte">商品信息</view>
			<view class="order_list">
				<view class="order_item weui-flex">
					<view class="order_title weui-flex__item">
						<view class="title_name">{{order.order_title}}</view>
						<view class="guige" v-if="order.order_guige != ''">规格：{{order.order_guige}}</view>
					</view>
					<view class="order_nums">x{{order.order_nums}}</view>
					<view class="order_amount">
						<view>¥{{order.order_price}}</view>
					</view>
				</view>
			</view>
			<view class="fee_list">				
				<view class="fee_item weui-flex">
					<view class="weui-flex__item fee_name"></view>
					<view class="weui-flex__item fee_num all_amount">合计：¥{{order.order_amount}}</view>
				</view>
			</view>
		</view>
		
		<view class="order_block">
			<view class="order_block_tilte">商户信息</view>
			<view class="ps_list">
				<view class="ps_item weui-flex">
					<view class="item_name">商户名称</view>
					<view class="weui-flex__item item_val">{{order.shop_title }}</view>
				</view>
				<view class="ps_item weui-flex" @click="daohang">
					<view class="item_name">商户地址</view>
					<view class="weui-flex__item item_val">{{order.shop_address}} <span class="link">[去这里]</span></view>
				</view>
				<view class="ps_item weui-flex">
					<view class="item_name">营业时间</view>
					<view class="weui-flex__item item_val">{{order.shop_worktime}}</view>
				</view>
				
			</view>
		</view>
		
		<view class="order_block">
			<view class="order_block_tilte">订单信息</view>
			<view class="ps_list">
				<view class="ps_item weui-flex">
					<view class="item_name">订单号</view>
					<view class="weui-flex__item item_val">{{order.order_no}}</view>
				</view>
				<view class="ps_item weui-flex">
					<view class="item_name">支付方式</view>
					<view class="weui-flex__item item_val">在线支付</view>
				</view>
				<view class="ps_item weui-flex">
					<view class="item_name">下单时间</view>
					<view class="weui-flex__item item_val">{{order.addtime}}</view>
				</view>
				
			</view>
		</view>
				
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
				order:[],
				orderno:'',				
				maishou:[],			//买手信息
				coupon_disamount:0,	//优惠券减免
				orderQR:'',			//订单二维码
				showOrderQR:false,	//是否显示核销码
				status:'待支付',
				ntime:'',
				
				info:{
					delta:2,
				},
				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				superTitleHeight:0,
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
			that.getOrderInfo();
			
			var ntime = (Date.parse(ntime) / 1000);//当前时间戳
			that.ntime = ntime
			
			var act = e.act;
			if(act == 'payfee'){
				that.payfee();
			}
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			that.superTitleHeight = common.titleHeight + 50;
			// #ifdef H5
			that.titleHeight = 0;
			// #endif
			
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
		onShareAppMessage(res) {
			var that = this
			if (res.from === 'button') {// 来自页面内转发按钮
			  //console.log(res.target)
			}
			var userInfo = uni.getStorageSync('userInfo');
			var goods_id = that.order.goods_id
			var tuanid = that.order.order_tuanid
			var url = '/pages/tuan/tuanview?id='+goods_id+'&tuanid='+tuanid;
			var imageUrl = common.baseUrl + that.order.goods_picture
				
			
			var shareUrl = url
			console.log(shareUrl);
			return {
			  title: that.order.goods_title,
			  path: shareUrl,
			  imageUrl:imageUrl
			}
		},
		methods:{
			//导航
			daohang(){
				var that = this
				var lat = parseFloat(that.order.shop_lat)
				var lng = parseFloat(that.order.shop_lng)
				uni.openLocation({
					latitude: lat,
					longitude: lng,
					success: function () {
						console.log('success');
					}
				});
			},
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
										title: res.msg,
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
						order_no:orderno,
						otype:1
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
									content: '支付成功',
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										setTimeout(function () {
											// uni.reLaunch({
											//   url: '/pages/orders/tuaninfo?id='+that.orderno
											// })
											that.getOrderInfo();
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
				console.log("orderno",orderno);
				uni.request({
					url: common.apiUrl+'orders/getSuperOrderInfo',
					method: 'GET',
					data: {
						orderno:orderno
					},
					success: res => {
						console.log("res",res);
						that.order = res.data.order
						that.addtime = res.data.order.addtime
						that.status = res.data.status
						console.log(that.addtime);
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
.order_header{background:#fff;padding:30upx;text-align:center;margin-bottom:20upx;}
.order_status{font-size:36upx;font-weight:bold;}
.order_status_tip{font-size:28upx;color:#666;padding:20upx 0;}
.order_pay{background:#fdd108;color:#008085;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
.order_cancel{background:#c40;color:#fff;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
.order_maishou{background:#00B26A;color:#fff;height:70upx;line-height:70upx;border-radius:6upx;text-align:center;margin:3%;font-size:28upx;}
.order_qishou{background:#1286E9;color:#fff;height:70upx;line-height:70upx;border-radius:6upx;text-align:center;margin:3%;font-size:28upx;}

.quhuo{background: url('https://www.dingecai.com/data/weapp/images/quhuo.png') top center no-repeat #fafafa;background-size:100upx 100upx;}

.tuan_info{background:#fff;text-align:center;padding:20upx 0;margin-bottom:20upx;}
.tuan_price{font-size:36upx;color:#f40;}
.tuan_btns{padding:20upx 0;}
.tuan_btn{font-size:32upx;height:80upx;line-height:80upx;padding:0 40upx;display:inline-block;margin:0 5upx;background:#eee;color:#666;}
.tuan_status{background:#00797F;color:#fff;}
.tuan_kaituan{background:#f40;color:#fff;}
.tuan_cantuan{background:#90257A;color:#fff;}

.order_block{background:#fff;width:100%;margin-bottom:20upx;}
.order_block_tilte{height:80upx;line-height:80upx;font-size:32upx;font-weight:bold;text-indent:20upx;border-bottom:1upx solid #eee;}
.order_list{display:block;}
.order_item{border-bottom:1upx solid #eee;line-height:60upx;color:#333;padding:10upx 20upx;}
.order_img{width:60upx;height:60upx;}
.order_img image{width:60upx;height:60upx;}
.order_title{}
.title_name{font-size:28upx;}
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

.share_btn{background:#FFB400;color:#fff;height:100upx;line-height:100upx;margin:20upx;text-align: center;position:relative;font-size:32upx;font-weight: 700;display:block;border-radius:100upx;}

.link{color:#007AFF;}
</style>
