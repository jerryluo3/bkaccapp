<template>
	<view class="page">
		<!-- #ifdef MP-WEIXIN -->
		<page-head :info="info"></page-head>
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<!-- #endif -->
		
		<view class="map">
			<map id="myMap" style="width: 100%; height: 500upx;" :latitude="latitude" :longitude="longitude" scale='18' :markers="markers" show-location></map>
		</view>
		
		<view class="daohang" @click="daohang">一键导航</view>
		
		<view class="contact_info">
			<view class="contact_title">{{ shop.shop_title }}</view>
			<view class="contact_content">
				<view class="contact_row">{{ shop.shop_address }}</view>
				<view class="contact_row">营业时间:{{ shop.shop_worktime }}</view>
				<view class="contact_row" @click="phoneContact" :data-mobile="shop.shop_mobile">服务热线:{{ shop.shop_mobile }}</view>
				<view class="contact_row">主营业务:{{ shop.shop_zhuying }}</view>
			</view>
		</view>
		
		<view class="page_blank" :style=" 'height:'+titleHeight +'px' "></view>
		<page-menu :menu="menu"></page-menu>
		
		
	</view>
</template>

<script>
import common from '../../common/common.js'
import util from '../../common/util.js'
 
export default {  
	data() {	
		return {
			latitude: 30.808004,
			longitude: 120.756700,	
		    markers: [{	
					id: 0,	
					iconPath: "/static/images/pos_ico.png",	
					latitude: 30.808004,	
					longitude: 120.756700,	
					title: 'aaa',	
					label: {	
						content: 'aaa',		
						color: '#00aafa'	
					},			
					width: 30,			
					height: 30			
			}],
			menu:{
				mindex:4,
				shopid:0,
				shop:[],
			},
			
			shopid:0,
			shop:[],
			contact:[],		
			
			info:{
				bg_color:'0,170,250',
				bg_alpha:1,
				delta:2,
				icon_color:'white',
				shpid:0,
			},
		}
	}, 
	 
	onLoad(option) {  
		var that = this
		var shopid = option.id
		// shopid = 14;
		
		if(shopid > 0){
			that.menu.shopid = shopid
			that.shopid = shopid
			uni.setStorageSync('shopid', shopid);
			//获取店铺信息
			that.getShopInfo();
		}
		
		var pages = getCurrentPages();
		that.info.delta = pages.length
		
		that.titleHeight = common.titleHeight;
		that.statusBarHeight = common.statusBarHeight;
		that.naviBarHeight = common.naviBarHeight;
	},  
	onShareAppMessage(res) {
		var that = this
		if (res.from === 'button') {// 来自页面内转发按钮
		  console.log(res.target)
		}
		var userInfo = uni.getStorageSync('userInfo');
		var shopid = that.shopid
		if(userInfo.users_id > 0){
			var shareUrl = '/pages/merchant/contact?id='+shopid+'&tjuid='+userInfo.users_id
		}else{
			var shareUrl = '/pages/merchant/contact?id='+shopid
		}
		return {
		  title: that.shop.shop_title,
		  path: shareUrl,
		}
	},
	methods: { 
		//电话联系
		phoneContact(e){
			var that = this
			var mobile = e.currentTarget.dataset.mobile
			uni.makePhoneCall({
			    phoneNumber: mobile 
			});
		},
		daohang(){
			var that = this
			var shop = that.shop
			console.log(shop)
			uni.openLocation({
			    latitude: parseFloat(shop.shop_lat),
			    longitude: parseFloat(shop.shop_lng),
			    success: function () {
			        console.log('success');
			    }
			});
		},
		//获取店铺信息
		getShopInfo(){
			var that = this
			var shopid = that.shopid
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopInfo',
				method: 'GET',
				data: {
					shopid:shopid
				},
				success: res => {
					that.shop = res.data.shop
					that.menu.shop = res.data.shop
					that.latitude = res.data.shop.shop_lat
					that.longitude = res.data.shop.shop_lng
					that.markers[0].latitude = res.data.shop.shop_lat
					that.markers[0].longitude = res.data.shop.shop_lng
					that.markers[0].title = res.data.shop.shop_mobile
					that.markers[0].label.content = res.data.shop.shop_title
					//console.log('markers',that.markers)
					var shop = res.data.shop
					uni.setNavigationBarTitle({
					    title: shop.shop_title
					});
					// #ifdef H5
					if (that.$wechat ) {  
						//var share_url = baseUrl + 'h5/#/pages/merchant/shop?id='+shopid
					     that.$wechat.share({  
					          title:shop.shop_title,
							  desc: shop.shop_zhuying,  
					          img: that.baseUrl + shop.shop_picture
					    });  
					}  
					// #endif
				},
				fail: () => {},
				complete: () => {}
			});
		},
		getSystemInfo() {  
			return new Promise((res, rej) => {  
				uni.getSystemInfo({  
					success(data) {  
						res(data);  
					}  
				})  
			})  
		}  
	}  
}  
</script>

<style>
page{background:#fff;}

.daohang{width:400upx;margin:60upx auto;background:#f40;color:#fff;font-size:32upx;font-weight: 700;text-align: center;height:80upx;line-height:80upx;border-radius: 80upx;}

.contact_info{padding:30upx;}
.contact_title{font-size:48upx;font-weight: 700;line-height: 60upx;margin-bottom:20upx;}
.contact_content{padding:10upx 0;}
.contact_row{line-height:50upx;font-size:32upx;padding:5upx 0;color:#666;}


</style>
