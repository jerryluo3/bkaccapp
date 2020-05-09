<template>
	<view class="page">	
		<view class="search uni-flex">
			<view class="search_img"><image src="../../static/images/search.png"></image></view>
			<view class="uni-flex-item"><input class="search_txt" maxlength="10" :value="keys" @focus="inputfocus" @blur="inputblur" @input="search" placeholder="请输入您的收货地址" /></view>
			<view class="search_del" v-if="keys != ''" @tap="resetkeys"><image src="../../static/images/del.png"></image></view>
		</view>
		<view class="searching" v-if="search_list != ''">
			<view class="fujin_list">
				<view class="fujin_item" v-for="(item,index) in search_list" :key="index" @tap="chooseAddr" :data-address="item.address" :data-location="item.location" :data-name="item.name">
					<view class="tname">{{item.name}}</view>
					<view class="taddress">{{item.address}}</view>
				</view>
			</view>
		</view>
		<view class="default_res" v-else>
			<view class="dingwei">
				<view class="dingwei_title">当前地址</view>
				<view class="dingwei_info uni-flex">
					<view class="uni-flex-item" v-if="address != ''" @tap="chooseAddr" :data-address="address"  :data-location="lng+','+lat" :data-name="posname">
						<view class="tname">{{ posname }}</view>
						<view class="taddress">{{address}}</view>
					</view>
					<view class="relocation" @tap="getLocation">重新定位</view>
				</view>
			</view>
			<view class="fujin">
				<view class="fujin_title">我的地址</view>
				<view class="fujin_list">
					<view class="fujin_item" v-for="(item,index) in address_list" :key="index" @tap="chooseAddr" :data-address="item.ua_address"  :data-location="item.ua_lng+','+item.ua_lat" :data-name="item.ua_title">
						<view class="tname">{{item.ua_title}}</view>
						<view class="taddress">{{item.ua_address}}</view>
					</view>
				</view>
			</view>
			<view class="fujin">
				<view class="fujin_title">附近</view>
				<view class="fujin_list">
					<view class="fujin_item" v-for="(item,index) in addr_list" :key="index" @tap="chooseAddr" :data-address="item.address" :data-location="item.location" :data-name="item.name">
						<view class="tname">{{item.name}}</view>
						<view class="taddress">{{item.address}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mask" v-if="searching == 1"></view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				lng:'',	//当前位置的经度
				lat:'',		//当前位置的纬度
				addr_list:[],		//附件列表
				address:[],
				search_list:[],		//搜索列表
				searching:0,		//搜索中
				keys:'',			//搜索关键字
				temp:'123',
				address_list:[],	//用户收货地址
				posname:'',
				
				
				scrollTop:0,		//滚动高度
				header_bg_alpha:0.6,	//头部背景色透明度
				currentPagesLen:1,	//页面数量，看是否返回
				
				info:{
					'bg_color':'255,255,255',
					'bg_alpha':1,
					'delta':2
				},
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
			};
		},
		onLoad() {
			var that = this
			that.getLocation();
			that.getAddressList();
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			
		},
		
		onPullDownRefresh:function(){
		  var that = this
		  uni.showNavigationBarLoading();
		  
		  that.getLocation();
		  that.getAddressList();
		  console.log('下拉刷新中...');		  
		  uni.hideNavigationBarLoading();
		  uni.stopPullDownRefresh();
		},
		// onPageScroll(e) {
		// 	let that = this
		// 	that.scrollTop = e.scrollTop
		// 	if(e.scrollTop < 100){
		// 		that.header_bg_alpha = e.scrollTop/100
		// 	}else{
		// 		that.header_bg_alpha = 1
		// 	}
		// 	console.log(that.header_bg_alpha)
		// },
		methods: {
			//重置搜索
			resetkeys(){
				var that = this
				that.searching = 0;
				that.search_list = [];
				that.keys = '';
			},
			//搜索
			search(e){
				var that = this
				var keys = e.detail.value
				console.log(keys);
				if(keys != ''){
					that.keys = keys;
					uni.request({
						url: common.apiUrl + 'location/searchAddress',
						method: 'GET',
						data: {
							keys:keys
						},
						success: res => {
							that.search_list = res.data.result
							if(res.data.result != '' ){
								that.searching = 0;
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				
			},
			//搜索中
			inputfocus(){
				var that = this
				that.searching = 1;
			},
			//结束搜索
			inputblur(){
				var that = this
				that.searching = 0;
			},
			//选择地址
			chooseAddr(e){
				var that = this
				var location = e.currentTarget.dataset.location;
				var address = e.currentTarget.dataset.address;
				var posname = e.currentTarget.dataset.name;
				var userposition = uni.getStorageSync('userposition');
				var pos_arr = location.split(',')
				
				
				uni.setStorageSync('lng',pos_arr[0]);
				uni.setStorageSync('lat',pos_arr[1]);
				uni.setStorageSync('posname',posname);
				uni.setStorageSync('posaddr',address);
				var ntime = (Date.parse(new Date()) / 1000);//当前时间戳
				uni.setStorageSync('postime',ntime);
				
				uni.reLaunch({
					url: '/pages/index/index?resetpos=1'
				});
			},
			
			//获取当前位置
			getLocation(){
				var that = this
				uni.getLocation({
				    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				    success: function (res) {
				        const lat = res.latitude;
				        const lng = res.longitude;
						that.lat = lat
						that.lng = lng
				        console.log(res)
				        console.log(lat,lng)
						uni.request({
							url: common.apiUrl + 'location/latlng2addr',
							method: 'GET',
							data: {
								lat:lat,
								lng:lng
							},
							success: res => {
								console.log(res)
								var data = res.data.address
								that.address = data.address
								that.addr_list = data.pois;
								that.posname = data.aois[0].name
								uni.setStorageSync('lng',lng);
								uni.setStorageSync('lat',lat);
								uni.setStorageSync('posname',that.posname);
								uni.setStorageSync('posaddr',that.address);	
							},
							fail: () => {},
							complete: () => {}
						});
				    }
				});
			},
			//获取用户地址
			getAddressList(){
				var that = this
				var userid = uni.getStorageSync('userid');
				uni.request({
					url: common.apiUrl + 'location/getAddressList',
					method: 'GET',
					data: {
						userid:userid
					},
					success: res => {
						console.log(res);
						that.address_list = res.data.address_list
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.header_fixed{position:fixed;top:0;}
	.header{width:100%;padding:10upx 0;border-bottom:1upx solid #b4b4b5;height:60upx;line-height:60upx;background:#fefefe;}
	.header .kefu{text-align:center;}
	.header .sendPos{padding:0 20upx;}
	.header .sendPos .sendPos_img,.header .sendPos .sendPos_img image{width:120upx;height:27upx;}
	.header .sendPos .sendPos_img{text-align:center;padding-top:5upx;display:inline-block;}
	.header .sendPos .sendPos_img image{padding-top:5upx;}
	.header .sendPos .sendAddr{display: inline-block;color:#595757;font-size:28upx;padding-left:8upx;vertical-align: top;}
	.header .sendPos .sendAddrDetail{display: inline-block;}
	.header .sendPos .sendAddrDetail image{width:26upx;height:15upx;margin:5upx;}
	.header .search{width:240upx;margin-right:20upx;border:1upx solid #878787;text-align:center;font-size:28upx;border-radius:60upx;color:#595757;}
	.header .search image{width:40upx;height:40upx;display:inline-block;margin-top:8upx; vertical-align:top;}
	.h_80{width:100%;height:80upx;display:block;}
	
	page{background:#fff;}
	.search{margin:20upx;background:#f5f5f5;border-radius:60upx;height:60upx;line-height:60upx;}
	.search_img{width:40upx;}
	.search_img image{width:36upx;height:36upx;margin:12upx 20upx;}
	.search_txt{padding:0 20upx;line-height:60upx;height:60upx;}
	.search_del{padding:0 10upx;}
	.search_del image{width:36upx;height:36upx;margin:12upx;}
	
	.dingwei{width:100%;}
	.dingwei_title{background:#f5f5f5;padding:0 20upx;height:60upx;line-height:60upx;color:#8d8d8d;}
	.dingwei_info{padding:20upx;color:#999;}
	.tname{font-size:32upx;font-weight:bold;}
	.taddress{font-size:28upx;}
	.fujin{width:100%;}
	.fujin_title{background:#f5f5f5;padding:0 20upx;height:60upx;line-height:60upx;color:#8d8d8d;}
	.fujin_list{padding:20upx;}
	.fujin_item{border-bottom:1upx solid #eee;padding:20upx 0;font-size:28upx;color:#999;}
	
	.mask{width:100%;height:100%;position:fixed;background-color:rgba(0,0,0,0.5);top:100upx;z-index:10;}
</style>
