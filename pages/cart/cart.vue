<template>
	<view class="page">

		<view class="main_content">
			<view class="cart_info" style="margin-top:20upx;">
				<view class="weui-flex">
					<block v-for="(item,index) in sendArray" :key="index">
						<view class="weui-flex__item ps_type" :class="sendindex == 0 ? 'ps_type_active' : ''" @click="chooseSendType" data-sendindex="0" v-if="item == '配送'">配送</view>
						<view class="weui-flex__item ps_type" :class="sendindex == 1 ? 'ps_type_active' : ''" @click="chooseSendType" data-sendindex="1" v-if="item == '自取'">自取</view>						
					</block>					
				</view>
				<view class="ps_type_content">
					<view class="ps_type_tips" v-if="sendindex == -1">请选择配送方式</view>
					<view class="ps_type_ps" v-else-if="sendindex == 0">
						<view class="address" @tap="chooseAddress" v-if="address == '' || address == null">
							<view class="no_address">请选择收货地址 ></view>
						</view>
						<view class="address" @tap="chooseAddress" v-else>
							<view class="address_title">{{address.ua_address}} <text>></text></view>
							<view class="address_info">{{address.ua_name}} ({{address.ua_sex}}) {{address.ua_mobile}}</view>
						</view>
						<view class="canpeisong" v-if="canpeisong == 1">当前地址不在配送范围内，请重新选择地址</view>
					</view>
					<view class="ps_type_tips" v-else>您选择的是自取</view>
				</view>
			</view>
			
			
			<view class="ps_time">
				<view class="ps_time_item uni-flex underline">
					<view class="uni-flex-item">
						<view class="ps_time_ltitle">预约送达时间</view>
						<view class="ps_time_ltips">根据实际情况预约送达时间，请确保该时间有签收人</view>
					</view>
					<view class="uni-flex-item ps_time_rdesc">					
						<picker mode="multiSelector" :value="dindex" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :range="dateArr">
							<view class="tui-picker-detail">
							  
							  <view v-if="dateArr !=''">
								  <view class="">{{dateArr[0][dindex[0]]}}</view>
								  <view class="">{{dateArr[1][dindex[1]]}}</view>
							  </view>
							  
							</view>
						</picker>
						
					</view>
					<view class="ps_time_more"><image src="../../static/images/right_jt_gray.png"></image></view>
				</view>				
			</view>
						
			<view class="cart_info" v-if="goodsList != ''">
				<view class="cart_info_title">普通商品</view>
				<view class="cart_shop" v-for="(item,index) in goodsList" :key="index">
					<view class="cart_shop_title">{{ item.shop_title }}</view>
					<view class="cart_list">
						<view class="cart_item uni-flex" v-for="(sitem,sindex) in item.goods_list" :key="sindex">
							<view class="goods_img"><image :src="sitem.goods_picture"></image></view>
							<view class="goods_title uni-flex-item">{{sitem.goods_title}}
								<text class="goods_guige">{{ sitem.guige_name }}</text>
							</view>
							<view class="goods_nums"><text>x</text>{{sitem.nums}}</view>
							<view class="goods_price">¥{{sitem.subamount}}</view>
							<view class="goods_del" @click="delgoods" :data-index="sindex">删除</view>
						</view>
					</view>
				</view>
				
				
				<view class="hongbao uni-flex" style="border-top:1upx solid #eee;border-bottom:none">
					<view class="uni-flex-item hongbao_words">商品金额</view>
					<view class="sub_taotal_amount">
						¥<text class="fee">{{allamount}}</text>
					</view>
				</view>
			</view>
						
			<view class="cart_info">
				<view class="fee_list">
					<view class="fee_row uni-flex">
						<view class="fee_name">包装费</view>
						<view class="fee_title uni-flex-item">盒子/袋子</view>
						<view class="fee_price">¥0</view>
					</view>
					<view class="fee_row uni-flex">
						<view class="fee_name">配送费</view>
						<view class="fee_title uni-flex-item">{{ sendArray[sendindex] }}</view>
						<view class="fee_price" v-if="sendindex == 1">¥ 0</view>
						<view class="fee_price" v-else><span v-if="dis_delivery_fee > 0">¥{{ dis_delivery_fee }}</span>¥{{ delivery_fee }}</view>
					</view>
				</view>
							
			</view>		
					
			<view class="cart_info">
				<view class="ps_time_item uni-flex" @click="showBeizhuCouponPopup">
					<view class="uni-flex-item">
						<view class="ps_time_ltitle">订单备注</view>
					</view>
					<view class="uni-flex-item ps_time_rdesc">
						{{ beizhu ? beizhu : '添加备注' }}
					</view>
					<view class="ps_time_more"><image src="../../static/images/right_jt_gray.png"></image></view>
				</view>
				<!-- <view class="beizhu">
					<textarea placeholder-style="color:#666;" @input="setbeizu" class="beizhu_txt" placeholder=" " />
				</view> -->
			</view>
			
			<view class="cart_info">
				<view class="cart_info_title">支付方式</view>
				<radio-group @change="paytypeChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in paytypes" :key="item.value">
						<view>
							<radio :value="item.value" :checked="item.checked" />
						</view>
						<view style="font-size:32upx;">{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			
				
			<view class="h_100"></view>
			
		</view>
		
		<view class="uni-flex check_bar cart_disable" v-if="qisong_cha > 0">
			<view class="uni-flex-item check_bar_info">
				<view class="total_fee">¥{{payamount > n_payamount && n_payamount > 0 ? n_payamount : payamount }}</view>
			</view>
			<view class="check_order">差¥{{ qisong_cha }}起送</view>
		</view>
		<view class="uni-flex check_bar" v-else>
			<view class="uni-flex-item check_bar_info">
				<view class="total_fee">¥{{payamount > n_payamount && n_payamount > 0 ? n_payamount : payamount }}</view>
				<view class="total_disamount" v-if="(allamount < delivery_free) && sendindex == 0">(满{{ delivery_free }}免运费)</view>
			</view>
			<view class="check_order" @tap="checkOrder">确认下单</view>
		</view>
		
		
		
		<!-- 居中 -->
		<uni-popup :show="showBeizhuPopupCoupon" :type="popType" v-on:hidePopup="hideBeizhuPopup">
			<view class="beizhu"><textarea placeholder-style="color:#666;" @input="setbeizu" class="beizhu_txt" placeholder="请填写备注" /></view>
			<view class="check_beizhu" @click="hideBeizhuPopup">确认</view>
		</uni-popup>
		
	</view>
	
</template>

<script>
	import common from '../../common/common.js'
	import dateTimePicker from '../../common/dateTimePicker.js'
	import util from '../../common/util.js'
	import uniPopup from '../../components/uni-popup.vue';
	
	export default {
		data() {
			return {
				baseurl:common.baseUrl,
				mycartList:[],	//购物车
				goodsList:[],	//商品列表
				activityList:[],	//限时特价列表
				activity:[],		//活动
				picList:[],
				cartListt:[],
				ids_arr:[],
				nums_arr:[],
				price_arr:[],
				title_arr:[],
				payamount:0,		//实际支付金额
				allamount:0,		//商品总价
				goodsamount:0,
				totalamount:0,
				totalnums:0,
				delivery_free:0,			//满多少免运费
				bz_fee:0,			//包装费
				ps_fee:0,
				disamount:0,		//已优惠
				address:[],			//地址
				ps_time:'',			//预约配送时间
				paytype:1,			//支付方式
				userid:'',
				beizhu:'',			//订单备注
				date: '',
				time: '',
				dateTimeArray: null,
				dateTime: null,
				dateTimeArray1: null,
				dateTime1: null,
				startYear: 2019,
				endYear: 2020,
				isyuyue:0,
				canpeisong:0,		//地址是否可配送
				coupon_nums:0,		//可用优惠券数量
				coupon:[],			//当前使用优惠券
				coupon_list:[],
				popType: 'middle',
				showPopupCoupon: false,
				showBeizhuPopupCoupon: false,
				showPopShopCoupon:false,
				zengpin:[],				//赠品
				zengpin_choose:0,		//选择的赠品
				dateArr:[],
				dindex:[0,0],
				timeArr:[],
				dayArr:['今日','明日'],
				//timeArr:['08:00-08:30','08:30-09:00','09:00-09:30','09:30-10:00','10:30-11:00','11:00-11:30','11:30-12:00','12:00-12:30','12:30-13:00','13:00-13:30','13:30-14:00','14:00-14:30','14:30-15:00','15:00-15:30','15:30-16:00','16:00-16:30','16:30-17:00','17:00-17:30','17:30-18:00','18:00-18:30','18:30-19:00'],
				arr:[["a","b"], ["c","d"]],
				delivery_fee:0,		//配送费
				dis_delivery_fee:[],		//运费减免
				
				mayneedList:[],		//您的可能需要商品列表
				couponHuodong:[],	//订单金额满返优惠券活动
				l_amount:0,			//满返优惠券差额
				couponHuodong_status:0,		//是否达成优惠券满减
				n_payamount:0,
				sendArray:[],
				sendindex:0,
				
				shop:[],				//店铺信息
				qisong_cha:0,			//起送差额度
				
				shop_coupon_list:[],		//店铺优惠券列表
				shop_coupon_arr:[],			//已选择店铺优惠券
				coupon_shopid:'',			//当前优惠券对应的店铺ID
				
				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				
				info:{
					bg_color:'255,255,255',
					bg_alpha:1,
					delta:2,
					icon_color:'undefined'
				},
				
				paytypes: [{
						value: '1',
						name: '在线支付',
						checked: 'true',
					},
					// {
					// 	value: '0',
					// 	name: '货到付款',
					// },					
				],
			};
		},
		
		onLoad() {
			var that = this
			var userid = uni.getStorageSync('userid');
			if(userid > 0){
				that.userid = userid
			}else{
				that.checkLogin();
				return false;
			}	
			var mycartList = uni.getStorageSync('mycartList');
			if(mycartList == ''){
				uni.redirectTo({
					url: '/pages/index/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				return false
			}else{
				//that.updateCartPrice();	//更新商品实时价格
				//that.getCartGoodsList();
			}
			//console.log('address',common.address)
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			that.getCartGoodsList();
			//获取默认配送地址
			that.getDefaultAddress();

			that.getDateArr();
			
		},
		onShow() {
			var that = this
			that.getDefaultAddress();
		},
		
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');
			//console.log('address',common.address)
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			that.userid = userid
			that.userInfo = userInfo
			
			//that.updateCartPrice();	//更新商品实时价格
			
			//that.recountCart();
			
			//uni.setStorageSync('address','');
			that.getCartGoodsList();
			that.getDefaultAddress();
						
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		
		methods: {
			paytypeChange: function(evt) {
				// for (let i = 0; i < this.paytypes.length; i++) {
				// 	if (this.paytypes[i].value === evt.target.value) {
				// 		this.paytype = this.paytypes[i].value;
				// 		break;
				// 	}
				// }
				var that = this
				that.paytype = evt.target.value
			},
			//删除购物车中的商品
			delgoods(e){
				var that = this
				var sindex = e.currentTarget.dataset.sindex
				
				uni.showModal({
					title: '提示',
					content: '确定要删除商品吗？',
					success: res => {
						if(res.confirm){
							var mycartList = uni.getStorageSync('mycartList');
							mycartList.splice(sindex,1);
							var timestamp = Date.parse(new Date());
							var expire = timestamp + 3600000
							uni.setStorageSync('mycartList', mycartList);
							uni.setStorageSync('mycartList_expire', expire);
							
							that.getCartGoodsList();
						}
					},
				});
			},
			//切换配送方式
			chooseSendType(e){
				var that = this
				var t_sendindex = e.currentTarget.dataset.sendindex
				var sendindex = that.sendindex
				that.sendindex = sendindex == t_sendindex ? -1 : t_sendindex
				//that.dis_delivery_fee = t_sendindex == 1 ? that.delivery_fee : 0;
				//that.getCartGoodsList();
			},
			//切换配送方式
			bindPickerChange(e){
				let that = this				
				let index = e.target.value
				that.sendindex = index
				//that.getCartGoodsList();
			},
				
			
			//选择可能需要商品
			toggleChoonse(e){
				let that = this
				let mayneedList = that.mayneedList
				let index = e.currentTarget.dataset.index
				let selected  = mayneedList[index]['selected']
				let t_selected = selected == 1 ? 0 : 1
				that.mayneedList[index]['selected'] = t_selected
				let op = selected == 1 ? 'subOne' : 'addOne'
				console.log("op",op);
				that.operate(e,op);
			},
			
			//加入购物车
			operate(e,op){
				//wx.setStorageSync('mycartList', '');
				var that = this
				var target = e.currentTarget.dataset
				var id = target.id;
				var index = target.index;
				//var op = target.op;
				var price = target.price;
				var title = target.title;
				var is_activity = target.activity;
				var temai = target.temai;
				var stocks = target.stocks;
				var goodsList = that.goodsList;
				var mycartList = uni.getStorageSync('mycartList');
				var shop_online = target.shoponline
				var newUserGoodsId = that.newUserGoodsId
				var userInfo = uni.getStorageSync('userInfo');
				
				if(shop_online == 0){
					uni.showToast({
						title:'此店已打烊',
						duration:1500,
						icon:'none'
					})
					return false
				}
				
				if(temai == 1 && stocks == 0){
					uni.showToast({
						title:'库存不足',
						duration:1500,
						icon:'none'
					})
					return false
				}
				// console.log(mycartList);
				// console.log(id);
				// return false
				
				var ishas = 0;
				
				if (op == 'addOne'){//添加	
					
						var currentTime = new Date().getTime();
						var tnowtime = currentTime/1000;
						var activity = that.activity
												
						var t_temai = 0;
						for(var i=0;i<mycartList.length;i++){
							if(mycartList[i][0] == id && mycartList[i][4] == that.guige_sel_v){
								
								if(  temai == 1 ){
									uni.showToast({
										title:'特卖商品限购一件',
										duration:1500,
										icon:'none'
									})
									return false
								}else if( stocks < goodsList[index]['nums'] && temai == 1){
									uni.showToast({
										title:'库存不足',
										duration:1500,
										icon:'none'
									})
									return false
								}
								mycartList[i][1]++;							
								ishas = 1;
								//goodsList[index]['nums']++;
							}
							t_temai += mycartList[i][8];
						}
						
						if(t_temai > 0 && temai == 1){
							uni.showToast({
								title:'特卖商品限购一件',
								duration:1500,
								icon:'none'
							})
							return false
						}
						console.log('ishas',ishas)
						if(ishas == 0){
							var temparr = [];
							temparr.push(id);
							temparr.push(1);
							temparr.push(price);
							temparr.push(title);
							temparr.push(that.guige_sel_v);
							temparr.push(that.attr_sel_v);
							temparr.push(is_activity);
							temparr.push(price);
							temparr.push(temai);
							//goodsList[index]['nums'] = 1;
							mycartList.push(temparr);
						}
						
						
				}
				if(op == 'subOne'){
					for(var i=0;i<mycartList.length;i++){
						if(mycartList[i][0] == id){
							mycartList[i][1]--;
							ishas = 1;
							goodsList[index]['nums']--;
							if(mycartList[i][1] == 0){
								mycartList.splice(i,1);
								goodsList[index]['nums'] = 0;
							}
						}
					}
				}
				console.log(mycartList);
								
				//wx.setStorageSync('mycartList', mycartList);
				var timestamp = Date.parse(new Date());
				var expire = timestamp + 3600000
				uni.setStorageSync('mycartList', mycartList);
				uni.setStorageSync('mycartList_expire', expire);
				
				that.getCartGoodsList();
				
			},
			
			
			//获取预约时间数据
			getDateArr(){
				var that = this
				uni.request({
					url: common.apiUrl + 'cart/getDateArr',
					method: 'GET',
					data: {},
					success: res => {
						//console.log("dateArr",res.data)
						//console.log("timearr",res.data.timearr)
						that.dateArr = res.data.dateArr
						that.timeArr = res.data.timearr
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			bindMultiPickerChange (e) {
				var that = this
				console.log('picker发送选择改变，携带值为', e.detail.value)
				//console.log(e.detail.value);
				that.dindex = e.detail.value
			},
			bindMultiPickerColumnChange (e) {
				var that = this
				console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
				var dateArr = that.dateArr
				var dindex = that.dindex
				
				dindex[e.detail.column] = e.detail.value;
				if (e.detail.column == 0) {
					console.log('aaa')
				  var ta = dateArr[0];
				  dateArr = [];
				  dateArr[0] = ta
				  dateArr[1] = that.timeArr[e.detail.value]
				}
				that.dateArr = dateArr
				that.dindex = dindex
				//console.log("dindex",dindex)
				//console.log(dindex)
			},
			//计算购物车总价
			recountCart(){
				var that = this
				var mycartList = uni.getStorageSync('mycartList');
				
				that.mycartList = mycartList != '' ? mycartList : []
				var ids_arr = [];
				var totalnums = 0,totalamount=0;
				
				for (let j = 0; j < mycartList.length; j++) {
				  totalnums += mycartList[j][1];
				  //var tt = parseFloat(nums_arr[j]) * parseFloat(price_arr[j]);
				  var k = ids_arr.indexOf(mycartList[j][0]);
				  if(k == -1){
					  ids_arr.push(mycartList[j][0]);
				  }
				  totalamount += mycartList[j][1]*mycartList[j][2];
				}
				that.ids_arr = ids_arr;
				
				totalamount = Math.round(totalamount * 100) / 100;
				that.mycartList = uni.getStorageSync('mycartList');
				
				
				that.totalnums = totalnums;
				that.goodsamount = totalamount;
				that.totalamount = (totalamount+that.bz_fee+that.ps_fee).toFixed(2);
			},
			
			
			//更新商品实时价格
			updateCartPrice(){
				var that = this
				var mycartList = uni.getStorageSync('mycartList');
				uni.request({
					url: common.apiUrl + 'updateCartPrice',
					method: 'GET',
					data: {
						mycartList:mycartList
					},
					success: res => {
						var mycartList = res.data.mycartList
						uni.setStorageSync('mycartList',mycartList);
						
						that.mycartList = mycartList != '' ? mycartList : []
						
						that.recountCart();
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//重新计算购物车中的商品总价
			recountCartGoodsamount(){
				var that = this
				var goodsList = that.goodsList				
				//原商品总价
				var t_amount = 0;
				for(var i=0;i<goodsList.length;i++){
					t_amount += goodsList[i].subamount
				}
				var shop_coupon_arr = that.shop_coupon_arr
				var t_dis = 0;
				for(var j=0;j<shop_coupon_arr.length;j++){
					if(shop_coupon_arr[j] != '' && typeof(shop_coupon_arr[j]) != 'undefined'){
						
						t_dis = parseFloat(t_dis) + parseFloat(shop_coupon_arr[j][1])
					}
				}
				console.log(t_dis);
				var allamount = t_amount-t_dis	
				
				that.allamount = allamount.toFixed(2)
				var payamount = that.payamount-t_dis
				that.payamount = payamount.toFixed(2)
				that.qisong_cha = that.shop.shop_qisong - payamount
				
				console.log("qisong_cha",that.qisong_cha)
				console.log("allamount",allamount)
				console.log("payamount",payamount)
			},
			
			//选择优惠券
			chooseCoupon(e){
				var that = this
				
				var index = e.currentTarget.dataset.index
				var coupon_list = that.coupon_list
				that.coupon = coupon_list[index];
				//console.log(that.coupon);
				console.log(that.payamount);				
				var n_payamount = parseFloat(that.payamount - that.coupon.uc_amount)
				n_payamount = n_payamount.toFixed(2);
				console.log(n_payamount);
				if(n_payamount < 0){
					that.n_payamount = 0;
				}else{
					that.n_payamount = n_payamount
				}
				//that.recountCouponHuodongLamount();
				that.hidePopup();
			},
			//不使用优惠券
			unChooseCoupon(){
				var that = this
				var coupon = that.coupon
				if(coupon !=''){
					var n_payamount = that.payamount + that.coupon.uc_amount
					n_payamount = n_payamount.toFixed(2);
					if(n_payamount < 0){
						that.n_payamount = 0;
					}else{
						that.n_payamount = n_payamount
					}
					that.coupon = []
				}
				that.hidePopup();
			},
			//关闭popup
			hidePopup(){
				var that = this
				that.showPopupCoupon = false
			},
			//关闭popup
			hidePopShopCoupon(){
				var that = this
				that.showPopShopCoupon = false
				that.coupon_shopid = '';
			},
			//弹出优惠券列表
			showCouponPopup(){
				var that = this
				that.showPopupCoupon = true;
			},
			//弹出优惠券列表
			showShopCouponPopup(){
				var that = this
				that.showPopShopCoupon = true;
			},
			//关闭popup
			hideBeizhuPopup(){
				var that = this
				that.showBeizhuPopupCoupon = false
			},
			showBeizhuCouponPopup(){
				var that = this
				that.showBeizhuPopupCoupon = true;
			},
			//获取可用优惠券
			getCanuseCoupon(){
				var that = this
				var totalamount = that.totalamount;
				console.log("totalamount",totalamount)
				var uid = uni.getStorageSync('userid');
				var marketid = uni.getStorageSync('marketid');
				uni.request({
					url: common.apiUrl + 'getCanuseCoupon',
					method: 'GET',
					data: {
						uid:uid,
						marketid:marketid,
						totalamount:totalamount
					},
					success: res => {
						//console.log("coupon",res);
						
						that.coupon_nums = res.data.coupon_nums
						that.coupon_list = res.data.coupon_list
						var coupon_list = res.data.coupon_list
						that.coupon_list = coupon_list
						if(coupon_list != ''){
							//that.coupon = res.data.coupon_list[0];
							if(coupon_list != '' && coupon_list[0].uc_amount > 0){
								//that.totalamount -= that.coupon.uc_amount
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//检测当前地址是否可用
			checkAddressCanUse(){
				var that = this
				var marketid = uni.getStorageSync('marketid');
				var addr = that.address.ua_address
				//console.log('addr',addr);
				if(addr != ''){
					uni.request({
						url: common.apiUrl + 'checkAddressCanUse',
						method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
						data: {
							marketid:marketid,
							addr:addr
						},
						success: res => {
							console.log(res)
							that.isused = res.data.isused;
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			
			changeDateTime1(e) {
				var that = this
				that.dateTime1 = e.detail.value
				that.isyuyue = 1;
				console.log(that.dateTime1);
			  },
			  
			  changeDateTimeColumn1(e) {
				var that = this
				var arr = that.dateTime1, dateArr = that.dateTimeArray1;

				arr[e.detail.column] = e.detail.value;
				dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

				that.dateTimeArray1 = dateArr,
				that.dateTime1 = arr
				
			  },
			 
			 //填写备注
			 setbeizu(e){
				var that = this
				 that.beizhu = e.detail.value;
			 },
			
			//确定下单
			checkOrder(){
				var that = this
				var ids_arr = that.ids_arr
				var address = that.address
				//var ps_time = that.ps_time
				var ps_time = that.dindex[0]
				var ps_time_para = that.dateArr[1][that.dindex[1]]
				var paytype = that.paytype
				var beizhu = that.beizhu
				var delivery_fee = that.sendindex == 0 ? that.delivery_fee : 0
				var couponHuodong_status = that.couponHuodong_status
				var mycartList = that.mycartList
				//var isyuyue = that.isyuyue
				//var dateTimeArray1 = that.dateTimeArray1
				//var dateTime1 = that.dateTime1
				//ps_time = isyuyue == 1 ? dateTimeArray1[0][dateTime1[0]]+'-'+dateTimeArray1[1][dateTime1[1]]+'-'+dateTimeArray1[2][dateTime1[2]]+' '+dateTimeArray1[3][dateTime1[3]]+':'+dateTimeArray1[4][dateTime1[4]] : ps_time
				
				// console.log("paytype",paytype)
				// return false
				
				var shopid = uni.getStorageSync('shopid');
				var userid = that.userid
				if(userid == '' || typeof userid == 'undefined' ){
					uni.showToast({
						title: '您购物车中没有商品',
						duration: 1000,
						icon :'none',
						success() {
							setTimeout(function(){
								uni.navigateTo({
									url: '/pages/userlogin/userlogin',
								});
							},1000)
						}
					});
					return false
				}
		
				
				var mycartList = uni.getStorageSync('mycartList');
				if(mycartList == ''){
					uni.showToast({
						title: '您购物车中没有商品',
						duration: 1000,
						icon :'none'
					});
					return false
				}
				
				if(that.sendindex == -1){
					uni.showToast({
						title: '请选择配送方式',
						duration: 1000,
						icon :'none'
					});
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
					return false
				}else if(that.sendindex == 0){
					if(address == '' || address == null){
						uni.showToast({
							title: '请选择地址',
							duration: 1000,
							icon :'none'
						});
						return false
					}
					if(that.canpeisong == 1){
						uni.showToast({
							title: '当前地址不在配送范围',
							duration: 1000,
							icon :'none'
						});
						return false
					}
				}

				
				
				
				uni.showLoading({
					title: '下单中'
				});
				
// 				console.log("mycartList1",mycartList)
// 				return false
				
				
				uni.request({
					url: common.apiUrl + 'orders/checkOrder',
					method: 'GET',
					data: {
						userid:that.userid,
						mycartList:mycartList,
						addressid:address.ua_id,
						ps_time:ps_time,
						ps_time_para:ps_time_para,
						paytype:paytype,
						ps_type:that.sendindex,			//配送方式						
						beizhu:beizhu,
						delivery_fee:delivery_fee,
						shopid:shopid
					},
					success: res => {
						//console.log(res);
						uni.removeStorageSync('ids_arr');
						uni.removeStorageSync('mycartList');
						uni.removeStorageSync('mycartList_expire');
						
						uni.hideLoading();
												
						uni.showToast({
							title: '操作成功',
							duration: 1500,
							icon:'success'
						});
						var order_no = res.data.order_no;
						console.log('order_no1',order_no)
// 						var userInfo = uni.getStorageSync('userInfo');
// 						if(userInfo.isnew == 1){
// 							userInfo.isnew = 0;
// 							uni.setStorageSync('userInfo',userInfo);
// 						}
						that.getUserInfo();
						
						if(paytype == 1){
							var url = '/pages/orders/orders?id='+order_no+'&act=payfee'
						}else{
							var url = '/pages/orders/orders?id='+order_no
						}
						uni.reLaunch({
							url: url,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: () => {},
					complete: () => {}
				});
				
				
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
			
			//选择地址
			chooseAddress(){
				uni.navigateTo({
					url: '/pages/user/setting/address?from=cart',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			//获取默认配送地址
			getDefaultAddress(){
				var that = this
				var userid = uni.getStorageSync('userid');
				var shopid = uni.getStorageSync('shopid');
				var address = common.address;
								
				if(address != ''){					
					that.address = address
					that.canpeisong = common.isused
				}else{
					console.log('shopid',shopid);
					uni.request({
						url: common.apiUrl + 'user/getDefaultAddress',
						method: 'GET',
						data: {
							shopid:shopid,
							userid:userid
						},
						success: res => {
							//console.log(res);
							var data = res.data;
							if(data.code == 0){
								console.log("data",data)
								that.address = data.address
								common.address = data.address
								common.isused = data.isused
								that.canpeisong = data.isused
								//if(that.address != ''){
									//uni.setStorageSync('address',that.address);
								//}
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				
				
			},
			
			//用户登录
			checkLogin(){
				var that = this
				var userid = uni.getStorageSync('userid');
				if(!userid){
					console.log('还没有登录');
					uni.navigateTo({
						url: '/pages/userlogin/userlogin',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else{
					console.log('已经登录');
				}
			},
			//购物车中的商品列表
			getCartGoodsList(){
				var that = this
				//var ids_arr = that.ids_arr;
				//var nums_arr = that.nums_arr;
				//var ids = ids_arr.join(',');
				var userid = uni.getStorageSync('userid');
				var shopid = uni.getStorageSync('shopid');
				var mycartList = uni.getStorageSync('mycartList');
				
				uni.request({
					url: common.apiUrl+'cart/getCartGoodsList',
					method: 'GET',
					data: {
						userid:userid,
						mycartList:mycartList,
						shopid:shopid
					},
					success: res => {
						console.log("res1",res);
						var goodsList = res.data.goodsList;
						var disamount = res.data.disamount;
						var allamount = res.data.allamount;
						var payamount = res.data.payamount;
						var totalamount = res.data.payamount;
						var delivery_free = res.data.delivery_free;
						
						if(that.sendindex > 0){
							payamount = payamount-res.data.delivery_fee;
						}
						payamount = payamount.toFixed(2);
						console.log('payamount',payamount)
						
						
						that.sendArray = res.data.sendArray;
						that.goodsList = goodsList;
						that.disamount = disamount;
						that.allamount = allamount;
						that.totalamount = totalamount;
						that.payamount = payamount < 0 ? 0 : payamount;
						that.delivery_fee = res.data.delivery_fee;
						//运费减免
						that.dis_delivery_fee = res.data.dis_delivery_fee
						that.delivery_free = delivery_free;
						
						that.paytypes = res.data.paytypes
						that.paytype = res.data.paytypes[0]['value']
						console.log("paytype",that.paytype)
						
						that.shop = res.data.shop;
						var qisong_cha = that.shop.shop_qisong - payamount
						console.log("qisong_cha",qisong_cha)
						
						
						that.recountCartGoodsamount();
					},
					fail: () => {},
					complete: () => {}
				});
			},
		},
		components: {
			uniPopup
		}
		
	}
</script>

<style>

page{background:#f5f5f5;}
.main_bg{width:100%;}
.main_bg image{width:100%;}
.main_content{position:absolute;top:0;left:0;widthhh:96%;z-index:10px;padding:2%;}
.ps_type{background:#eee;text-align: center;height:80upx;line-height:80upx;font-size:32upx;margin:0 10upx;color:#333;}
.ps_type_content{padding:10upx 0;}
.ps_type_tips{font-size:28upx;text-align: center;}
.ps_type_active{background:#f40;color:#fff;}

.address{color:#fff;margin-bottom:20upx;color:#000}
.address .no_address{font-size:38upx;font-weight: bold;}
.address .address_title{font-size:38upx;font-weight: bold;}
.address .address_title text{font-size:24upx;font-weight: normal;}
.address .address_info{font-size:24upx;}

.ps_time{background:#fff;padding:10upx 30upx;display:block;margin-bottom:20upx;}
.ps_time_item{padding:20upx 0;}
.ps_time_ltitle{font-size:32upx;font-weight:bold;color:#111;}
.ps_time_ltips{font-size:20upx;color:#777;}
.ps_time_rdesc{text-align:right;width:200upx;color:#ff8400}
.ps_time_rdesc text{font-size:24upx;}
.ps_time_more{width:50upx;}
.ps_time_more image{width:30upx;height:30upx;margin:10upx;}
.underline{border-bottom:1upx solid #eee;}

.cart_info{background:#fff;padding:20upx 30upx;-webkit-box-shadow:0 2upx 5upx #ccc;-moz-box-shadow:0 2upx 5upx #ccc;box-shadow:0 2upx 5upx #ccc;margin-bottom:20upx;}
.cart_info_title{border-bottom:1upx solid #eee;height:80ux;line-height: 80upx;font-weight: bold;font-size:32upx;}
.cart_shop{background:#fafafa;margin:20upx 0;padding:20upx;}
.cart_shop_title{font-size:28upx;font-weight: 700;height:60upx;line-height:60upx;}
.cart_shop_option{border-top:1upx solid #ddd;padding:10upx 0;line-height:50upx;}
.cart_coupon_btn{background:#C99F00; color:#fff;height:50upx;line-height:50upx;width:200upx;text-align: center;}
.cart_coupon_disinfo{text-align: right;line-height:50upx;color:#f40;}
.cart_list{}
.cart_item{padding:10upx 0;line-height:60upx;}
.goods_img{width:60upx;height:60upx;border:1upx solid #eee;margin-right:20upx;}
.goods_img image{width:60upx;height:60upx;}
.goods_title{font-size:28upx;}
.goods_nums{font-size:24upx;padding-left:10upx;}
.goods_nums text{font-size:20upx;}
.goods_price{padding:0 0 0 40upx;font-weight: bold;}
.goods_ico{width:50upx;padding-left:30upx;}
.goods_ico image{width:50upx;height:50upx;}
.goods_del{background:#fafafa;padding:0 10upx;margin-left:20upx;line-height:50upx;}

.fee_list{border-bottom:1upx solid  #eee;}
.fee_row{padding:20upx 0;line-height:60upx;}
.fee_tips{font-size:24upx;color:#666;line-height:40upx;}
.fee_name{background:#fff6ce;color:#bc7700;border:1upx solid #e4c28d;font-size:20upx;height:20upx;line-height:20upx;padding:5upx;margin:5upx 20upx 0 0;}
.fee_price{font-weight: bold;}
.fee_price span{text-decoration: line-through;color:#f00;padding-right:10upx;}

.hongbao{padding:20upx 0;line-height:60upx;border-bottom:1upx solid #eee;}
.hongbao_words{font-weight: bold;font-size:32upx;}
.hongbao_desc{text-align:right;}
.hongbao_desc .noaddress{background:#fdd108;color:#000;font-size:24upx;height:40upx;line-height:40upx;padding:5upx 10upx;}
.hongbao_desc .hasaddress{color:#aaa;}
.hongbao_desc .hascoupon{color:#ff643d;font-weight: bold;}
.hongbao_desc .hasaddress image{width:30upx;height:30upx;display:inline-block;margin:10upx;vertical-align: middle;}

.sub_taotal{padding:20upx 0;line-height:60upx;font-size:32upx;}
.sub_taotal_desc{color:#aaa;}
.sub_taotal_desc image{width:24upx;height:24upx;display: inline-block; vertical-align: middle;}
.sub_taotal_amount{text-align: right;}
.sub_taotal_amount .fee{font-size: 36upx;font-weight: bold;}

.beizhu{width:100%;}
.beizhu_txt{background:#fafafa;border:1upx solid #f2f2f2;border-radius:6upx;margin:20upx 0 0;width:96%;padding:2%;height:200upx;}

.h_100{width:100%;height:100upx;display: block;}

.check_bar{background:#f99000;height:100upx;line-height:100upx;position:fixed;bottom:0;color:#fff;width:100%;z-index:888;}
.check_bar_info{padding-left:30upx;line-height:100upx;}
.check_order{background:#fdd108;font-size:32upx;text-align:center;min-width:250upx;line-height:100upx;color:#008085;}
.total_fee{font-size:40upx;font-weight: bold;display:inline-block;}
.total_disamount{display:inline-block; vertical-align: middle;margin-left:20upx;padding-left:20upx;color:#ccc;height:24upx;line-height:24upx;}
.canpeisong{color:#f00;font-size:20upx;padding-bottom:10upx;}

.check_beizhu{background:#008085;font-size:32upx;text-align:center;width:100%;line-height:80upx;color:#fff;}

.uni-popup-middle{width:700upx;height:800upx;padding:10upx;position:fixed;}
.coupon_list{width:100%;max-height:800upx;overflow:scroll}
.coupon_item{background:#efefd9;margin:2%;height:120upx;}
.coupon_unused{background:#666;color:#fff;width:100%;text-align:center;font-size:32upx;line-height:60upx;}
.coupon_amount{text-align:center;padding:0 20upx;line-height:120upx;font-size:40upx;font-weight: bold;color:#ff643d}
.coupon_amount text{font-size:20upx;}
.coupon_info{text-align:left;}
.coupon_title{fotn-size:30upx;padding-top:20upx;}
.coupon_expired{font-size:24upx;color:#777;}
.coupon_choose{padding:0 20upx;height:120upx;line-height:120upx;background:#dadac4;}
.coupon_choose_in{background:#ff643d;color:#fff;}
.unchoose{background: #C99F00;color: #fff;text-align:center;height:60upx;line-height:60upx;padding:10upx 0;margin: 2%;}

.couponhuodong_block{margin-bottom:20upx;padding:20upx;background:#D5EAD7;font-size:28upx;border-radius:6upx;}
.couponhuodong_fanquan{background:#E50011;color:#fff;border-radius:40upx;height:40upx;line-height:40upx;padding:0 10upx;font-size:20upx;}
.couponhuodong_name{font-size:28upx;padding:0 10upx;}

.zengpin_list{padding-top:20upx;}
.zengpin_item{text-align:center;}
.zengpin_item .goods_img{width:150upx;height:150upx;margin:0 auto;}
.zengpin_item .goods_img image{width:150upx;height:150upx;}
.zengpin_item .goods_title{font-size:22upx;line-height:40upx;}
.zengpin_item .goods_price{padding:0;margin:0;}
.zengpin_item .goods_xuanze{width:40upx;height:40upx;margin:0 auto;}
.zengpin_item .goods_xuanze image{width:40upx;height:40upx;}
.cart_disable{background:#008085;}

</style>
