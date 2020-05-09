<template>
	<view class="page">
		<view class='search_block'>
		  <view class="weui-flex">     
		      <view class="weui-flex__item"><input placeholder="请输入搜索内容" :value="keys" @input="inputsearch" name="keys" maxlength='-1' class="input_txt" ></input></view>
		      <view class="search_btn" @click='getSearchShopList'>
		        <button plain="true" form-type="submit" style='border:none;color:#000;width:40rpx;line-height:40rpx;height:40rpx;margin:0;padding:0;' ><image src='../../static/images/search.png'></image></button>
		      </view>
		    </view>
		</view>
		
		<view class="shop_list">
			<view class="shop_item weui-flex" v-for="(item,index) in shopList" :key="index">
				<view class="shop_logo" @click="jumpUrl" :data-url="'/pages/merchant/shop?id='+item.shop_id"><image :src="baseUrl + item.shop_picture" mode=""></image></view>
				<view class="weui-flex__item">
					<view class="shop_title" @click="jumpUrl" :data-url="'/pages/merchant/shop?id='+item.shop_id">{{ item.shop_title }}</view>
					<view class="weui-flex" @click="phoneContact" :data-mobile="item.shop_mobile">
						<view class="shop_info_ico"><image src="../../static/images/phone.png" mode=""></image></view>
						<view class="shop_mobile weui-flex__item">联系商家</view>
						<view class="shop_info_desc" v-if="item.distance < 1">{{ item.distance*1000 }}m</view>
						<view class="shop_info_desc" v-else>{{ item.distance }}km</view>
					</view>					
					<view class="weui-flex" @click="goaddr" :data-index="index">
						<view class="shop_info_ico"><image src="../../static/images/addr.png" mode=""></image></view>
						<view class="shop_addr weui-flex__item">{{ item.shop_address }}</view>
					</view>
					<view class="shop_tags" v-if="item.shopTags != ''">
						<view class="shop_tags_item" v-for="(items,indexs) in item.shopTags " :key="indexs">{{ items }}</view>
					</view>
					<view class="shop_zhuying">{{ item.shop_zhuying }}</view>
				</view>
			</view>
			<view class="isall" v-if="isall == 1">
				<text>我是有底线的</text>
			</view>
		</view>
		
	</view>
</template>

<script>
import common from '../../common/common.js'
	
export default {
	data() {
		return {
			baseUrl:common.baseUrl,
			info:{
				bg_color:'255,255,255',
				bg_alpha:1,
				delta:1,
			},
			scrollTop:0,		//滚动高度
			header_bg_alpha:0,	//头部背景色透明度
			currentPagesLen:1,	//页面数量，看是否返回
			titleHeight:0,
			statusBarHeight:0,
			naviBarHeight:0,
			
			fid:0,					//大类ID
			cid:0,					//小类ID
			tempCurrentCatList:[],	//切换类别时的临时数组
			currentCatList:[],		//当前滚动的类别列表
			bigCatList:[],			//大类别列表
			subCatList:[],			//小类列表
			cindex:-1,				//当前选择中类别
			findex:0,				//弹出层切换类别参数
			scrollLeft:0,			//子栏目滚动距离
			
			keys:'',				//关键字
			
			shopList:[],			//店铺列表
			canbuy:0,
			isall:0,				//是否显示完
			page:0,					//当前页码
			pop_category:false
		};
	},
	onLoad(e) {
		var that = this
		
		that.titleHeight = common.titleHeight;
		that.statusBarHeight = common.statusBarHeight;
		that.naviBarHeight = common.naviBarHeight;
		
		//that.getSearchShopList();		
	},
	
	onPullDownRefresh:function(){
	  var that = this
	  uni.showNavigationBarLoading();
	  
	  that.resetAttr();
	  //搜索店铺列表
	  //that.getSearchShopList();
	  
	  console.log('下拉刷新中...');		  
	  uni.hideNavigationBarLoading();
	  uni.stopPullDownRefresh();
	},
	onShareAppMessage(res) {
		var that = this
		if (res.from === 'button') {// 来自页面内转发按钮
		  console.log(res.target)
		}
		var userInfo = uni.getStorageSync('userInfo');
		if(userInfo.users_id > 0){
			var shareUrl = '/pages/merchant/merchant?tjuid='+userInfo.users_id
		}else{
			var shareUrl = '/pages/merchant/merchant'
		}
		return {
		  title: '本地优选生活信息平台-凡迪优品',
		  path: shareUrl,
		}
	},
	onReachBottom() {
		var that = this
		that.loadmore();
	},
	methods: {
		inputsearch(e){
		  var that = this
		  var keys = e.detail.value;
		  if (keys != that.keys) {
			that.keys = keys
			that.resetAttr();
		  } else {
		    return false
		  }
		  
		},
		//重置参数
		resetAttr(){
			var that = this
			that.page = 0;
			that.isall = 0;
			that.shopList = []
		},
		
		//加载更多
		loadmore(){
			var that = this
			that.page = that.page+1;
			that.getSearchShopList();
		},
		//搜索店铺列表
		getSearchShopList(){
			var that = this
			var lng = uni.getStorageSync('lng');
			var lat = uni.getStorageSync('lat');
			if(that.keys == ''){
				uni.showToast({
					title:'请输入搜索内容',
					duration:1500,
				})
				return false
			}
			
			uni.request({
				url: common.apiUrl + 'shop/getSearchShopList',
				method: 'GET',
				data: {
					keys:that.keys,
					lng:lng,
					lat:lat,
					page:that.page+1
				},
				success: res => {
					var data = res.data
					console.log(data)
					var shopList = data.shop_list
					for(var i=0;i<shopList.length;i++){
						that.shopList.push(shopList[i])
					}						
					that.isall = data.isall
					that.canbuy = data.canbuy
					console.log("shopList",that.shopList)
				},
				fail: () => {},
				complete: () => {}
			});
		},
		//电话联系
		phoneContact(e){
			var that = this
			var index = e.currentTarget.dataset.index
			var shopList = that.commendShopList
			var mobile = e.currentTarget.dataset.mobile
			uni.makePhoneCall({
				phoneNumber: mobile 
			});
		},
		//一键导航
		goaddr(e){
			var that = this
			var index = e.currentTarget.dataset.index
			var shopList = that.shopList
			var lat = shopList[index].shop_lat
			var lng = shopList[index].shop_lng
			
			console.log(parseFloat(lat));
			console.log(parseFloat(lng));
			uni.openLocation({
				latitude: parseFloat(lat),
				longitude: parseFloat(lng),
				success: function () {
					console.log('success');
				}
			});
		},
		navBack(){
			uni.navigateBack({
				delta:1
			})
		},
		navHome(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		//跳转
		jumpUrl(e){
			var that = this
			if(that.canbuy == 1){
				var url = e.currentTarget.dataset.url
				uni.navigateTo({
					url:url,
				});
			}
			
		}
	}
}
</script>

<style>
.search_block{padding:20rpx 0;display:block;background:#fff;}
.search_btn{padding:10rpx 20rpx;}
.search_btn image{width:40rpx;height:40rpx;}
.input_txt{background:#e5e5e5;margin:0 20rpx;padding:0 20rpx;display:block;border-radius:30rpx;height:60rpx;line-height:60rpx;font-size:28rpx;color:#555;}

.commend_keys{display:block;font-size:28rpx;}
.commend_keys_title{padding:20rpx;font-size:24rpx;}
.commend_keys_list{padding:0 20rpx;}
.keys_item{border:1rpx solid #ddd;padding:10rpx 20rpx;border-radius:40rpx;display:inline-block;margin:0 10rpx;}

/****店铺列表***/

.shop_list{width:100%;background:#fff;padding-bottom:20upx;}
/*  #ifdef  H5  */
.shop_list{top:80upx;}
/*  #endif */
.shop_item{padding:20upx;}
.shop_logo{width:170upx;height:170upx;border-radius: 6upx;border:1upx solid #eee;margin-right:20upx;}
.shop_logo image{width:170upx;height:170upx;border-radius: 6upx;}
.shop_title{font-size:32upx;font-weight: 700;}
.shop_addr{color:#666;padding:10upx 0;}
.shop_tags{padding:10upx 0;}
.shop_tags_item{border:1upx solid #d9d9d9;color:#ff6408;margin-right:10upx;padding:0 5upx;display:inline-block;font-size:20upx;border-radius:4upx;}
.shop_mobile{color:#f40;font-size:28upx;line-height:60upx;}
.shop_zhuying{background:#f7fbfd;color:#819caa;padding:5upx 10upx;border-radius: 6upx;}
.shop_info_ico{width:30upx;height:30upx;padding:15upx;}
.shop_info_ico image{width:30upx;height:30upx;display: block;}
.shop_info_desc{line-height:60upx;color:#999}

/****全部***/
.isall{width:100%;text-align:center;color:#ccc;margin:20upx 0;border-bottom:1upx solid #f1f1f1;height:20upx;}
.isall text{padding:0 40upx;background:#fff;position:relative;line-height:40upx;}
</style>
