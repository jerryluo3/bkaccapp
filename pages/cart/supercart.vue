<template>
	<view class="page">
	
		<view class="order_block">
			<view class="user_info">
				<view class="weui-flex info_row">
					<view class="info_row_ico"><image src="../../static/images/order_ico_user.png" mode=""></image></view>
					<view class="info_row_title">姓　　名:</view>
					<view class="weui-flex__item"><input type="text" class="order_text" :value="userInfo.users_nickname" @input="setNickname" placeholder="请输入姓名" /></view>
				</view>
				<view class="weui-flex info_row">
					<view class="info_row_ico"><image src="../../static/images/order_ico_mobile.png" mode=""></image></view>
					<view class="info_row_title">手机号码:</view>
					<view class="weui-flex__item"><input type="text" class="order_text" :value="userInfo.users_mobile" @input="setMobile" placeholder="请输入手机号码" /></view>
				</view>
				<view class="weui-flex info_row noborder">
					<view class="info_row_ico"><image src="../../static/images/order_ico_bizhu.png" mode=""></image></view>
					<view class="info_row_title">备　　注:</view>
					<view class="weui-flex__item"><input type="text" class="order_text" value="" @input="setContent" placeholder="请输入备注" /></view>
				</view>
			</view>
		</view>
		
		<view class="order_block">
			<view class="order_block_title">商品信息</view>
			<view class="order_goods weui-flex">
				<view class="order_goods_img"><image v-if="goods.goods_picture" :src="baseUrl + goods.goods_picture" mode=""></image></view>
				<view class="order_goods_title weui-flex__item">{{ goods.goods_title }}</view>
			</view>
			<view class="order_goods_attr weui-flex" v-if="guige != ''">
				<view class="order_goods_guige weui-flex__item">{{ guige[guige_key][0] }}</view>
				<view class="order_goods_price">¥{{ guige[guige_key][1] }}</view>
			</view>
			<view class="order_goods_attr weui-flex" v-else>
				<view class="order_goods_guige weui-flex__item"></view>
				<view class="order_goods_price">¥{{ goods.goods_price }}</view>
			</view>
			<view class="order_goods_nums weui-flex">
				<view class="order_goods_nums_words weui-flex__item">购买数量:</view>
				<view class="nums_block">
					<view class="nums_block_sub" @click="subNums">-</view>
					<view class="nums_block_nums">{{ nums }}</view>
					<view class="nums_block_add" @click="addNums">+</view>
				</view>
			</view>
		</view>
		
		<view class="order_block">
			<view class="order_block_title gray_color">友情提示</view>
			<view class="order_tips">
				<view class="order_tips_row gray_color">1.特推商品如无特殊说明默认下单后需到店消费。</view>
				<view class="order_tips_row gray_color">2.因为商品特殊性，下单后不支持退款。</view>
				<view class="order_tips_row gray_color">3.特推商品折扣不能和VIP折扣叠加使用。</view>
			</view>
		</view>
				
		<view class="uni-flex check_bar">
			<view class="uni-flex-item check_bar_info">
				<view class="total_fee">¥{{ total_amount }}</view>
			</view>
			<view class="check_order" @click="checkOrder">确认下单</view>
		</view>
		
		
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
				baseUrl:common.baseUrl,
				userInfo:[],
				
				id:0,
				goods:[],
				guige:'',
				guige_key:-1,
				total_amount:0,
				nums:1,
				
				nickname:'',		//姓名
				mobile:'',			//手机
				content:'',			//备注
								
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				
				info:{
					bg_color:'255,255,255',
					bg_alpha:1,
					delta:2,
					icon_color:'undefined'
				},
			};
		},
		
		onLoad(option) {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');			
			if(userInfo.users_id > 0){
				that.userInfo = userInfo
			}else{
				that.checkLogin();
				return false;
			}
			var id = option.id
			var guige_key = option.guige_key
			//id = 2;
			//guige_key = 1;
			that.id = id
			that.guige_key = guige_key
			
			console.log('titleHeight',common.titleHeight)
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;			
			
			that.getGoodsInfo();
			
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
			
			that.getGoodsInfo();
						
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		
		methods: {
			setNickname(e){
				var that = this
				var nickname = e.detail.value
				that.nickname = nickname
			},
			setMobile(e){
				var that = this
				var mobile = e.detail.value
				that.mobile = mobile
			},
			setContent(e){
				var that = this
				var content = e.detail.value
				that.content = content
			},
			//下单
			checkOrder(){
				var that = this
				var nickname = that.nickname ? that.nickname : that.userInfo.users_nickname;
				var mobile = that.mobile ? that.mobile : that.userInfo.users_mobile;
				var content = that.content;
				
				
				console.log("nickname",nickname)
				console.log("mobile",mobile)
				console.log("content",content)
				
				if(nickname == ''){
					uni.showToast({
						title: '请输入姓名',
						duration:1500,
						icon:'none'
					});
					return false
				}
				if(mobile == ''){
					uni.showToast({
						title: '请输入手机号码',
						duration:1500,
						icon:'none'
					});
					return false
				}
				var tjuid = uni.getStorageSync('tjuid');
				var guige = that.guige
				var guige_key = that.guige_key
				if(guige != '' && guige_key  > -1){
					var commission = guige[guige_key][4]
				}else{
					var commission = that.goods.goods_commission
				}
				
				uni.request({
					url: common.apiUrl + 'orders/checkSuperOrder',
					method: 'GET',
					data: {
						userid:that.userInfo.users_id,						
						goods_id:that.id,
						guige_key:that.guige_key,
						nums:that.nums,
						nickname:nickname,
						mobile:mobile,
						content:content,
						tjuid:tjuid,
						commission:commission,
					},
					success: res => {
						uni.showToast({
							title: '操作成功',
							duration: 1500,
							icon:'success'
						});
						var order_no = res.data.order_no;
						console.log('order_no1',order_no)
						//that.getUserInfo();
						
						uni.reLaunch({
							url: '/pages/orders/orders?id='+order_no+'&act=payfee&otype=super',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			//获取商品信息
			getGoodsInfo(){
				var that = this
				uni.request({
					url: common.apiUrl + 'shop/getSuperGoodsInfo',
					method: 'GET',
					data: {
						id:that.id
					},
					success: res => {
						var data = res.data
						that.goods = data.goods
						that.guige = data.guige
						that.stocks = res.data.goods.goods_stocks
						that.guige = res.data.guige
						that.picList = res.data.pics_list
						that.limitnums = res.data.goods.goods_maxnums
						that.canbuy = res.data.canbuy
						that.online = res.data.online
						
						that.updateAmount();
						
						uni.setNavigationBarTitle({
						    title: data.goods.goods_title
						});
						// #ifdef H5
						if (that.$wechat ) {  
							 var g_price = data.goods.goods_price > 0 ? '商品价格：¥ '.data.goods.goods_price : '来电咨询'
						     that.$wechat.share({  
						          title:data.goods.goods_title,
								  desc: data.goods.goods_price > 0 ? '商品价格：¥ '.data.goods.goods_price : '来电咨询',  
						          img: that.baseUrl + goods.goods_picture
						    });  
						}  
						// #endif
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//更新总金额
			updateAmount(){
				var that = this
				var total_amount = that.total_amount
				var nums = that.nums
				var guige = that.guige
				var guige_key = that.guige_key
				if(guige != ''){
					var price = guige[guige_key][1]
				}else{
					var price = that.goods.goods_price
				}
				total_amount = nums*price;
				that.total_amount = total_amount
			},
			
			//增加数量
			addNums(){
				var that = this
				var goods_stocks = that.goods.goods_stocks
				var nums = that.nums
				if(nums < goods_stocks){
					that.nums = nums+1
					that.updateAmount();
				}
			},
			//减少数量
			subNums(){
				var that = this
				var goods_stocks = that.goods.goods_stocks
				var nums = that.nums
				if(nums > 1){
					that.nums = nums-1
					that.updateAmount();
				}
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
		},
		
	}
</script>

<style>
.order_block{background:#fff;background:#fff;margin:20upx;padding:20upx;}
.order_block_title{line-height:60upx;line-height:60upx;font-size:28upx;font-weight: 700;}
.user_info{}
.info_row{border-bottom:1upx solid #eee;height:80upx;line-height:80upx;}
.info_row_ico{width:40upx;height:40upx;padding:20upx;text-align: center;}
.info_row_ico image{width:40upx;height:40upx;display: block;}
.info_row_title{line-height:80upx;font-size:28upx;width:150upx;color:#666;}
.order_text{height:80upx;line-height: 80upx;font-size:28upx;}

.order_goods{padding:20upx 0;border-bottom:1upx solid #fafafa;}
.order_goods_img,.order_goods_img image{width:100upx;height:100upx;}
.order_goods_title{padding-left:20upx;}
.order_goods_attr{border-bottom:1upx solid #fafafa;height:80upx;}
.order_goods_guige{line-height:80upx;font-size:28upx;}
.order_goods_price{line-height:80upx;font-size:28upx;color:#f00;}
.nums_block{background:#eee;border:1upx solid #eee;margin-top:20upx;}
.nums_block view{display: inline-block; vertical-align: middle;font-size:32upx;}
.order_goods_nums_words{line-height:60upx;margin-top:20upx;font-size:28upx;}
.nums_block_sub,.nums_block_add{width:60upx;line-height:60upx;text-align:center;}
.nums_block_nums{background:#fff;width:80upx;text-align: center;}

.noborder{border:none;}
.gray_color{color:#999;}


.h_100{width:100%;height:100upx;display: block;}

.check_bar{background:#f99000;height:100upx;line-height:100upx;position:fixed;bottom:0;color:#fff;width:100%;z-index:888;}
.check_bar_info{padding-left:30upx;line-height:100upx;}
.check_order{background:#fdd108;font-size:32upx;text-align:center;width:250upx;line-height:100upx;color:#008085;}
.total_fee{font-size:40upx;font-weight: bold;display:inline-block;}
.total_disamount{display:inline-block; vertical-align: middle;margin-left:20upx;padding-left:20upx;color:#ccc;height:24upx;line-height:24upx;}
.canpeisong{color:#f00;font-size:20upx;padding-bottom:10upx;}

.check_beizhu{background:#008085;font-size:32upx;text-align:center;width:100%;line-height:80upx;color:#fff;}

</style>
