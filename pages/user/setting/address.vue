<template>
	<view class="page">
		<view class="main">
			<view class="address_list">
				<view class="address_item" v-for="(item,index) in addressList" :key="index">
					<view class="weui-flex address_mess">
						<view class="weui-flex__item">
							<view class="address_detail">{{item.ua_address}}</view>
							<view class="address_info">{{item.ua_name}}({{item.ua_sex}})  {{item.ua_mobile}}</view>
						</view>
						<view class="choose_btn" @tap="chooseaddress" :data-id="item.ua_id" v-if="tfrom == 'cart'">选择</view>
					</view>
					<view class="weui-flex btn_row">
						<view class="weui-flex__item" @tap="setdefault" :data-id="item.ua_id" :data-isdefault="item.ua_isdefault">
							<view class="default_btn" :class="item.ua_isdefault == 1 ? 'isdefault' : ''">设为默认</view>
						</view>
						<view class="btns">
							<view class="option_btn edit" @tap="editaddress" :data-id="item.ua_id">编辑</view>
							<view class="option_btn del" @tap="deladdress" :data-id="item.ua_id">删除</view>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="addaddress" @tap="addaddress">新增地址</view>
		</view>
	</view>
	
</template>

<script>
	import common from '../../../common/common.js'
	
	export default {
		data() {
			return {
				userid:'',
				userInfo:[],
				addressList:[],
				tfrom:'',		//来自
				info:{},
				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			};
		},
		onLoad(option) {
			var that = this
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			var tfrom = option.from;
			if(tfrom != '' || tfrom != 'undefined'){
				that.tfrom = tfrom
			}
			
			that.userid = userid
			that.userInfo = userInfo
			if(userInfo == ''){
				uni.redirectTo({
					url: '/pages/userlogin/userlogin'
				});
			}
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			that.getAddressList();
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			console.log('下拉刷新中...');	
			var userid = uni.getStorageSync('userid');
			var userInfo = uni.getStorageSync('userInfo');
			that.userid = userid
			that.userInfo = userInfo
			that.getAddressList();
			
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		
		methods:{
			//选择地址
			chooseaddress(e){
				var that = this
				var id = e.currentTarget.dataset.id
				var shopid = uni.getStorageSync('shopid');
				console.log("id",id);
				uni.request({
					url: common.apiUrl+'user/getAddress',
					method: 'GET',
					data: {
						id:id,
						shopid:shopid
					},
					success: res => {
						var data = res.data
						console.log("data",data);
						if(data.code == 0){
							
							if(data.address != ''){
								
								if(data.isused == 1){
									uni.showToast({
										title: '此地址不在配送范围内',
										duration: 1000,
										icon :'none'
									})
									return false
								}else{
									var address = data.address;
									common.address = address;
									common.isused = data.isused
									//uni.setStorageSync('address',address);
									uni.navigateBack();
								}
								
							}
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//编辑地址
			editaddress(e){
				var that = this
				var id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '/pages/user/setting/editaddress?id='+id,
					success: res => {
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//设置默认地址
			setdefault(e){
				let that = this
				var id = e.currentTarget.dataset.id
				var isdefault = e.currentTarget.dataset.isdefault
				if(isdefault == 1){
					return false;
				}
				var userInfo = uni.getStorageSync('userInfo');
				uni.showModal({
					title: '提示',
					content: '确定要设为默认地址吗？',
					success: res => {
						uni.request({
							url: common.apiUrl+'user/setdefault',
							method: 'GET',					
							data: {
								id:id,
								userid:userInfo.users_id
							},
							success: res => {
								if(res.data.code == 0){
									uni.showToast({
										title: '操作成功',
										duration: 1500,
										icon:'success'
									});
									that.getAddressList();
								}
							},
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//删除地址
			deladdress(e){
				let that = this
				var id = e.currentTarget.dataset.id
				uni.showModal({
					title: '提示',
					content: '确定要删除地址吗？',
					success: res => {
						if (res.confirm) {
							uni.request({
								url: common.apiUrl+'user/deladdress',
								method: 'GET',					
								data: {
									id:id
								},
								success: res => {
									if(res.data.code == 0){
										uni.showToast({
											title: '操作成功',
											duration: 1500,
											icon:'success'
										});
										that.getAddressList();
									}
								},
							});
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//新增地址
			addaddress(){
				var that = this
				uni.navigateTo({
					url: '/pages/user/setting/editaddress',
					success: res => {
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//地址列表
			getAddressList(){
				var that = this
				var userid = uni.getStorageSync('userid');
				uni.request({
					url: common.apiUrl+'location/getAddressList',
					method: 'GET',
					data: {
						userid:userid
					},
					success: res => {
						console.log("addressList",that.addressList);
						if(res.data.code == 0){
							that.addressList = res.data.address_list
							
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
.address_list{width:100%;margin-bottom:100upx;}
.address_item{background:#fff;border-bottom:1upx solid #eee;padding:20upx;line-height:40upx;margin-bottom:20upx;}
.address_item .address_detail{font-weight: bold;color:#333;font-size:32upx;}
.address_item .address_info{color:#666;font-size:28upx;}
.address_op{width:100upx;text-align:center;}
.address_op image{width:60upx;height:60upx;margin:20upx;}
.btn_row{border-top:1upx solid #eee;padding:10upx 0 0;}
.option_btn{display:inline-block;margin-left:20upx;line-height:50upx;border:1upx solid #ddd;padding:0 20upx;font-size:28upx;border-radius:50upx;}
.default_btn{line-height:50upx;border:1upx solid #ddd;padding:0 20upx;font-size:28upx;display:inline-block;border-radius:50upx;}
.isdefault{background:#ff643d;color:#fff;border:1upx solid #ff643d;}
.address_mess{padding-bottom:20upx;}
.choose_btn{line-height:50upx;border:1upx solid #ddd;padding:0 20upx;font-size:28upx;display:inline-block;border-radius:6upx;height:50upx;background:#fafafa;margin-top:20upx;}

.addaddress{background:#00aafa;color:#fff;position:fixed;bottom:0;width:100%;height:100upx;line-height:100upx;text-align: center;font-size:32upx;}



</style>
