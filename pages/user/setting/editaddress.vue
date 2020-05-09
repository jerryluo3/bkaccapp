<template>
	<view class="page">

		<view class="main">
			<form @submit="formSubmit">
			<view class="row weui-flex">
				<view class="row_name">联系人</view>
				<view class="weui-flex__item">
					<input class="inputtxt" style="height:80upx;line-height:80upx" name="ua_name" v-model="uname" focus placeholder="姓名" />
					<view class="sex">
						<view class="sex_item" @tap="setsex" data-value="先生" :class="{'active':(sex == '先生')}">先生</view>
						<view class="sex_item" @tap="setsex" data-value="女士" :class="{'active':(sex == '女士')}">女士</view>
					</view>
				</view>
			</view>
			<view class="row weui-flex">
				<view class="row_name">电话</view>
				<view class="weui-flex__item">
					<input class="inputtxt" name="ua_mobile" v-model="mobile" placeholder="电话" />
				</view>
			</view>
			<view class="row weui-flex">
				<view class="row_name">地址</view>
				<view class="weui-flex__item" style="position:relative;">
					<view class="openmap" @tap="openmap"><image src="../../../static/user/addr.png"></image></view>
					<!-- <input class="inputtxt inputaddr" name="ua_address" v-model="title" placeholder="地址" /> -->
					<textarea class="inputtxt inputaddr" name="ua_address" v-model="address" placeholder="地址"></textarea>
				</view>
			</view>
			<view class="row weui-flex">
				<view class="row_name">门牌号</view>
				<view class="weui-flex__item">
					<input class="inputtxt" name="ua_number" v-model="number" placeholder="门牌号" />
				</view>
			</view>
			<view class="row weui-flex">
				<view class="row_name">标签</view>
				<view class="weui-flex__item">
					<view class="tags">
						<view class="tags_item" @tap="settag" data-value="家" :class="{'active':(tag == '家')}">家</view>
						<view class="tags_item" @tap="settag" data-value="公司" :class="{'active':(tag == '公司')}">公司</view>
					</view>
				</view>
			</view>
			
			
			<button formType="submit" class="form_btn">保存</button>
			
			</form>
		</view>
	</view>
	
</template>

<script>
	import common from '../../../common/common.js'
	
	export default {
		data() {
			return {
				uname:'',
				sex:'',
				mobile:'',
				title:'',
				address:'',				
				lat:'',
				lng:'',
				number:'',
				tag:'',	
				id:'',
				userid:'',
				info:{},
				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			};
		},
		onLoad(options) {
			var that = this
			var id = options.id
			console.log("id",id);
			var userid = uni.getStorageSync('userid');
			that.userid = userid;
			
			var currentPages = getCurrentPages()
			that.info.delta = currentPages.length
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			
			if (id > 0) {
			  //修改地址
			  that.id = id
			  
			  that.getAddress(id);
			}
		},
		methods:{
			
			formSubmit(e){
				console.log(e);
				var that = this
				var ua_name = that.uname
				var ua_mobile = that.mobile
				var ua_title = that.title
				var ua_address = that.address
				var ua_lat = that.lat
				var ua_lng = that.lng
				var ua_number = that.number
				var ua_sex = that.sex
				var ua_tag = that.tag
				
				if(ua_name == ''){
					uni.showToast({
						title: '请输入姓名',
						duration: 1000,
						icon :'none'
					});
					return false
				}
				if(ua_mobile == ''){
					uni.showToast({
						title: '请输入电话',
						duration: 1000,
						icon :'none'
					});
					return false
				}
				if(ua_address == '' ){
					uni.showToast({
						title: '请选择地址',
						duration: 1000,
						icon :'none'
					});
					return false
				}
				
				uni.showLoading({
					title: '处理中'
				});
				
				uni.request({
					url: common.apiUrl + 'user/saveAddress',
					method: 'GET',
					data: {
						userid:that.userid,
						id:that.id,
						ua_name:ua_name,
						ua_mobile:ua_mobile,
						ua_title:ua_title,
						ua_address:ua_address,
						ua_lat:ua_lat,
						ua_lng:ua_lng,
						ua_number:ua_number,
						ua_sex:ua_sex,
						ua_tag:ua_tag
					},
					success: res => {
						console.log(res)
						if(res.data.code == 0){
							uni.showToast({
								title: '操作成功',
								duration: 1500,
								icon:'success'
							});
							uni.navigateBack({
								delta: 2
							});
						}else{
							uni.showToast({
								title: res.data.msg,
								duration: 1500,
								icon:'none'
							});
							return false
						}
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//打开地图
			openmap(){
				var that = this
				uni.chooseLocation({
					success: function (res) {
						that.title = res.name
						that.address = res.address
						that.lat = res.latitude
						that.lng = res.longitude
// 						console.log('位置名称：' + res.name);
// 						console.log('详细地址：' + res.address);
// 						console.log('纬度：' + res.latitude);
// 						console.log('经度：' + res.longitude);
					}
				});
			},
			//选择姓别
			setsex(e){
				var that = this;
				that.sex = e.currentTarget.dataset.value ;
			},
			
			//选择标签
			settag(e){
				var that = this;
				that.tag = e.currentTarget.dataset.value ;
			},
			
			//获取地址
			getAddress(id){
				var that = this
				uni.request({
					url: common.apiUrl+'user/getUserAddres',
					method: 'GET',
					data: {
						id:id
					},
					success: res => {
						var data = res.data
						if(data.code == 0){
							that.uname = data.address.ua_name;
							that.sex = data.address.ua_sex;
							that.mobile = data.address.ua_mobile;
							that.title = data.address.ua_title;
							that.address = data.address.ua_address;
							that.lat = data.address.ua_lat;
							that.lng = data.address.ua_lng;
							that.number = data.address.ua_number;
							that.tag = data.address.ua_tag;
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
.row{border-bottom:1upx solid #eee;background:#fff;padding:20upx;line-height:60upx;}
.row_name{font-weight: bold;color:#333;width:160upx;font-size:32upx;}
.inputtxt{color:#333;font-size:32upx;}
.inputaddr{width:500upx;height:100upx;line-height:50upx;}
.sex{width:100%;padding-top:20upx;border-top:1upx solid #eee;}
.sex_item{display:inline-block;border:1upx solid #eee;margin-right:10upx;padding:0 20upx;line-height:50upx;color:#555;border-radius: 6upx;font-size:32upx;}
.tags_item{display:inline-block;border:1upx solid #eee;margin-right:10upx;width:100upx;text-align:center;line-height:50upx;color:#555;border-radius: 6upx;font-size:32upx;}
.active{border:1upx solid #00B26A;color:#00B26A;}
.openmap{position:absolute;top:0;right:0;bottom:0;z-index:10;text-align: right;width:100upx;}
.openmap image{width:40upx;height:40upx;margin:10upx 0 0 0;}

.form_btn{background:#00aafa;color:#fff;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
</style>
