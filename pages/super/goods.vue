<template>
	<view class="page">

		<swiper class="swiper" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item class="turnpic">
				<image v-if="goods.goods_picture" :src="baseUrl+goods.goods_picture"  mode="aspectFit" style="width:100%;height:100%;"></image>
			</swiper-item>
			<swiper-item class="turnpic" v-for="(item,index) in picList" :key="index">
				<image :src="baseUrl+item"  mode="aspectFit" style="width:100%;height:100%;"></image>
			</swiper-item>
		</swiper>
		<view class="goods_info">
			<view class=" weui-flex">
				<view class="goods_price weui-flex__item">					
					<view class="price_info">
						<view class="price" v-if="goods.goods_price > 0"><text>¥</text>{{  guige_price > 0 ? guige_price : goods.goods_price}}</view>
						<view class="price" v-else  @click='callphone' :data-phone=" goods.shop_mobile ? goods.shop_mobile : '0573-82082008' ">来电咨询</view>
					</view>
					<view class="stock_info">
						<text>已售出：{{goods.goods_sales}}</text><text>库存：{{goods.goods_stocks}}</text>
					</view>
				</view>
				<view class="share"  @click="popShare"><image src="../../static/images/share1.png" mode=""></image></view>
			</view>
			<view class="goods_title">{{goods.goods_title}}</view>
			<view class="goods_desc">{{goods.goods_desc}}</view>
			
		</view>
		
		<view class="hotline weui-flex" @click='goshop' :data-shopid=" goods.goods_shopid " v-if="canbuy == 1">
			<view class="shop_ico"><image src='../../static/images/link.png'></image></view>
			<view class="shop_title weui-flex__item">{{ goods.shop_title }}</view>
			<view class="shop_btn">进入店铺</view>
		</view>
		
		<view class="goods_guige" v-if="guige != ''">
			<view class="goods_guige_title">商品规格</view>
			<view class="goods_guige_list">
				<view class="goods_guige_item" v-for="(item,index) in guige" :key="index" :class="guige_key == index ? 'guige_in' : ''" @click="chooseGuige" :data-key="index" :data-guige=" item[0] " :data-price=" item[1] " :data-stocks=" item[3] " :data-fanxian=" item[4] ">{{ item[0] }}</view>
			</view>
		</view>
		
		
		<view class="goods_descrition">
			<view class="goods_des_title">商品详情</view>
			<view class="goods_des_content">
				<rich-text :nodes="goods.goods_content"></rich-text>
			</view>
		</view>
		
		<view class='weui-flex btn_block'>
		  <view class='btn_block_item border_right_gray' @click='gohome'>
			<image src='../../static/images/home.png'></image>
			<text>首页</text>
		  </view>
		  <view class='btn_block_item border_right_gray' @click='calling' :data-phone=" goods.shop_mobile ">
			<image src='../../static/images/mobile.png'></image>
			<text>电话</text>
		  </view>
		  
		  <view class="weui-flex__item">
			<view class="addtocart" v-if="goods.goods_price > 0 && canbuy == 1" @click="addToCart" :data-id="goods.goods_id" :data-title="goods.goods_title" :data-price="goods.goods_price" :data-stocks="goods.goods_stocks">立即购买</view>
			<view class='addtocart addtocart_disable' v-else>来电咨询</view>
		  </view>
		</view>
		
		<view class='pop_bg' v-if="popshare == ''" @click='closeShare'></view>
		<view class='popShare' v-if="popshare == ''">
		  <view class='popShareC  weui-flex '>
			<view class='weui-flex__item popShareC_row'>
			  <view class="share_btn"><button open-type="share" style='position: absolute;top:0;right:0;left:0;bottom:0;width:100%;opacity:0;'></button></view>
			  <view class='popShareC_img'><image src='../../static/images/weixin.png'></image></view>
			  <view class='popShareC_btn'>分享给朋友</view>
			</view>
			<view class='weui-flex__item popShareC_row' @click='popShareHB'>
			  <view class='popShareC_img'><image src='../../static/images/haibao.png'></image></view>
			  <view class='popShareC_btn'>生成分享海报</view>
			</view>
		  </view>
		  <view class='popShareClose' @click='closeShare'>关闭</view>
		</view>
		
		
		<view class='popbg' v-if="popsharehb == ''" @click='closeSharehb'></view>
		<view class='shareHB' v-if="popsharehb == ''">
		  <view class='shareHB_c'>
			<image v-f="shareImg" :src='baseUrl + shareImg' style='width:100%;height:1050rpx;display:block'></image>
		  </view>
		  <view v-if="shareImg" class='shareBtn' @click='save'>保存图片</view>
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
				id:'',
				userInfo:[],
				goods:[],		//商品信息
				indicatorDots: true,
				indicatorColor: 'rgba(0, 0, 0, .3)',
				indicatorActiveColor:'#ffffff',
				autoplay: true,
				interval: 4000,
				duration: 500,
				picList:[],
				comment_list:[],    //评论列表
				cartnums:0,         //购物车中的商品数量
				stocks:0,           //库存
				hideitem:1,
				guige:[],
				guige_name:'',       //选择的规格名称
				guige_key: -1,     //选中的规格键值
				guige_price:0,         //选中规格的价格
				guige_common_price:0,
				guige_fanxian:0,
				guige_fencheng:0,       //分成
				limitnums:0,             //商品限购，大于0表示限购
				nums:1            ,//购买数量
				pophide: 'hide',
				popshare: 'hide',
				popsharehb: 'hide',
				shareImg:'',
				canbuy:1,		//能否下单
				
				info:{
					bg_color:'0,0,0',
					bg_alpha:0.1,
					delta:2,
					icon_color:'undefined'
				},
				
				mycartList:[],			//购物车
				totalnums:0,			//总数量
				totalamount:0.00,		//总金额
				
				online:1,			//是否可正常下单
				
				titleHeight:0,
				statusBarHeight:0,
				naviBarHeight:0,
				
			}
		},
		onLoad(option) {
			var that = this
			var id = option.id
			//id = 2;
			that.id = id;
			that.userInfo = uni.getStorageSync('userInfo');
			
			var tjuid = option.tjuid
			if(tjuid > 0){
				uni.setStorageSync('tjuid',tjuid);
			}
			
			that.titleHeight = common.titleHeight;
			that.statusBarHeight = common.statusBarHeight;
			that.naviBarHeight = common.naviBarHeight;
			
			that.getGoodsInfo();
			that.getCartNums();
			
			var mycartList = uni.getStorageSync('mycartList');
			var timestamp = Date.parse(new Date());
			var mycartList_expire = uni.getStorageSync('mycartList_expire');
			if( timestamp > mycartList_expire && mycartList){
				//过期
				uni.setStorageSync('mycartList', '');
				uni.setStorageSync('mycartList_expire', '');
			}
			that.mycartList = mycartList != '' ? mycartList : []
			
			setTimeout(function(){
				that.updateCartInfo();
			},1000)
		},
		onPageScroll(e) {
			let that = this
			that.scrollTop = e.scrollTop
			if(e.scrollTop < 70){
				that.info.bg_alpha = e.scrollTop/100
				that.info.icon_color = 'undefined'
				wx.setNavigationBarColor({
				   frontColor:"#000000",
				   backgroundColor:'#000000'
				});
			}else{				
				that.info.bg_alpha = 0.7
				that.info.icon_color = 'white'
				wx.setNavigationBarColor({
				   frontColor:"#ffffff",
				   backgroundColor:'#ffffff'
				});
			}
			
			//console.log(that.header_bg_alpha)
		},
		onPullDownRefresh() {
			var that = this
			uni.showNavigationBarLoading();
			
			that.getGoodsInfo();
			
			uni.hideNavigationBarLoading();
			uni.stopPullDownRefresh();
		},
		onShareAppMessage(res) {
			var that = this
			if (res.from === 'button') {// 来自页面内转发按钮
			  console.log(res.target)
			}
			var userInfo = uni.getStorageSync('userInfo');
			var goods = that.goods
			if(userInfo.users_id > 0){
				var shareUrl = '/pages/super/goods?id='+that.id+'&tjuid='+userInfo.users_id
			}else{
				var shareUrl = '/pages/super/goods?id='+that.id
			}
			var share_price = that.goods.goods_price > 0 ? '¥'+ that.goods.goods_price : ''
			return {
			  title: that.goods.goods_title + share_price +' - '+goods.shop_title,
			  path: shareUrl,
			}
		},
		methods: {
			goodsoperate(e){
				var that = this
				console.log(e);
				that.operate(e);
			},
			//加入购物车
			operate(e){
				//wx.setStorageSync('mycartList', '');
				var that = this
				var target = e.currentTarget.dataset
				var id = target.id;
				var sindex = target.sindex;
				var index = target.index;
				var op = target.op;
				var price = target.price;
				var title = target.title;
				var stocks = target.stocks;
				var mycartList = that.mycartList;
				var userInfo = uni.getStorageSync('userInfo');
				
				
				if( stocks <= 0){
					uni.showToast({
						title:'库存不足',
						duration:1500,
						icon:'none'
					})
					return false
				}
				
				var ishas = 0;
				
				if (op == 'addOne'){//添加
						console.log("index",index);				
						
						var t_temai = 0;
						for(var i=0;i<mycartList.length;i++){
							if(mycartList[i][0] == id){
								mycartList[i][1]++;							
								ishas = 1;
							}
						}
							
							console.log("mycartList",mycartList)				
						if(ishas == 0){
							var temparr = [];
							temparr.push(id);						//商品ID
							temparr.push(1);						//数量
							temparr.push(price);					//价格
							temparr.push(title);					//标题
							console.log(temparr)
							mycartList.push(temparr);
						}
						
						
				}
				if(op == 'subOne'){
					for(var i=0;i<mycartList.length;i++){
						if(mycartList[i][1] == id){
							mycartList[i][2]--;
							ishas = 1;
							if(mycartList[i][2] == 0){
								mycartList.splice(i,1);
							}
						}
					}
				}
				console.log(mycartList);
				
				that.updateCartInfo();
				
				//wx.setStorageSync('mycartList', mycartList);
				var timestamp = Date.parse(new Date());
				var expire = timestamp + 3600000
				uni.setStorageSync('mycartList', mycartList);
				uni.setStorageSync('mycartList_expire', expire);
				
			},
			
			//更新购物车信息
			updateCartInfo(){
				var that = this
				var totalamount = 0;
				var totalnums = 0;
				var mycartList = that.mycartList;
				//var activity = that.activity
							
				var all_dis = 0;
				for (let j = 0; j < mycartList.length; j++) {
				  
				  totalnums += mycartList[j][1];
				  //var tt = parseFloat(nums_arr[j]) * parseFloat(price_arr[j]);				 
				  totalamount += mycartList[j][1]*mycartList[j][2];
				  var t_amount = mycartList[j][1]*mycartList[j][2];
				  t_amount = t_amount.toFixed(2)
				}		
				totalamount = Math.round(totalamount * 100) / 100;		
			
				that.totalnums = totalnums;
				that.totalamount = totalamount;
				
			},
			popShare: function () {
				var that = this
				that.popshare= '';
			},

			closeShare: function () {
				var that = this
				that.popshare= 'hide';
			},

			popShareHB: function () {
				var that = this
				that.popshare= '';
				that.popsharehb= '';
				that.getShareHB();
			},

			closeSharehb: function () {
				var that = this
				that.popshare= 'hide';
				that.popsharehb= 'hide';
			},

			getShareHB: function () {
				var that = this
				that.getGoodsQR();
			},

			getGoodsQR: function () {
				var that = this
				var userInfo = uni.getStorageSync("userInfo");
				var url = common.baseUrl + 'sharepic/getSuperGoodsShareImg';
				uni.showToast({
					title: '加载数据中',
					icon: 'loading',
					duration: 1000
				})
				uni.request({
					url: url,
					data: {
						goodsid: that.goods.goods_id,
						uid: userInfo.users_id,
					},
					method: 'GET',
					success: function (res) {
						console.log(res);
						that.shareImg = res.data.result
						that.popsharehb = '';
					}

				});
			},

			save: function () {
				var that = this
				uni.showToast({
					title: '处理中',
					icon: 'loading',
					duration: 1000
				})
				uni.downloadFile({
					url: that.baseUrl + that.shareImg,
					success: function (res) {
						var tempFilePath = res.tempFilePath
						uni.getSetting({
							success(res) {
								if (!res.authSetting['scope.writePhotosAlbum']) {
									uni.authorize({
										scope: 'scope.writePhotosAlbum',
										success() {
											console.log('授权成功');
											uni.saveImageToPhotosAlbum({
												filePath: tempFilePath,
												success(res) {
													uni.showModal({
														title: '保存成功',
														content: '您可以用相册中的图片分享到朋友圈啦',
														showCancel: false,
														success: function (res) {
															that.closeShare();
															that.closeSharehb();
														}
													})
												},
											})
										},
										fail() {
											console.log('授权失败');
										}
									})
								} else {
									//console.log('保存图片')
									//console.log(tempFilePath);
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success(res) {
											uni.showModal({
												title: '保存成功',
												content: '您可以用相册中的图片分享到朋友圈啦',
												showCancel: false,
												success: function (res) {
													that.closeShare();
													that.closeSharehb();
												}
											})
										},
										fail(res) {
											console.log(res)
										},
										complete(res) {
											console.log(res)
										}
									})
								}

							}
						})
					}
				})

			},
			//关闭弹出层
			  closePopCart:function(){
				var that = this
				that.hideitem = 1;
			  },

			  //弹出
			  popCart:function(){
				var that = this
				that.hideitem = 0;
			  },
			  
			  //加入购物车
			  addToCart:function(){
				var that = this
				//that.checkAttr();
				if (that.guige_key == -1 && that.guige != '') {
				  wx.showToast({
					title: '请选择规格',
					icon: 'none',
					duration: 1000
				  })
				  return false
				}
				
				uni.navigateTo({
				  url: '/pages/cart/supercart?id='+that.goods.goods_id+'&guige_key='+that.guige_key
				})
			   
			  },

			  //参数验证
			  checkAttr:function(){
				var that = this

				if(that.guige_name == ''){
				  uni.showToast({
					title: '请选择规格',
					icon: 'loading',
					duration: 1000
				  })
				  return false
				}else{
				  return true
				}
				
			  
			  },
			  
			  //获取购物车中商品数量
			  getCartNums:function(){
				var that = this
				var userInfo = wx.getStorageSync("userInfo");
				var uid = userInfo.mem_id
				if(uid > 0){
					uni.request({
						url: common.apiUrl + 'getCartNums',
						header: {
						  "Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'POST',
						data: {
							uid:uid
						},
						success: res => {
							that.cartnums = res.data.cartnums
						},
						fail: () => {},
						complete: () => {}
					});				  
				}else{
				  that.cartnums = 0;
				}
			  },
			  
			  //购物车数量加
			  cartNumsADD:function(){
				var that = this
				var nums = that.nums
				var limitnums = that.limitnums
				var stocks = that.stocks
				
				if(limitnums > 0){
				  //有限购
				  if(nums < limitnums){
					if(nums < stocks){
					  //有库存
					  nums++
					  that.nums = nums
					}else{
					  //库存存不足
					  wx.showToast({ title: '库存不足',icon: 'loading',duration: 1000 })
					  return false
					}        
				  }else{
					//超过限购数量
					wx.showToast({ title: '超过限购数量', icon: 'loading', duration: 1000 })
					return false
				  }
				}else{
				  if (nums < stocks) {
					//有库存
					nums++
					that.nums = nums
				  } else {
					//库存存不足
					wx.showToast({ title: '库存不足', icon: 'loading', duration: 1000 })
					return false
				  }
				  
				}
				//console.log(that.data.nums)
			  },

			  //购物车数量减
			  cartNumsJIAN: function () {
				var that = this
				var nums = that.nums
				var limitnums = that.limitnums
				var stocks = that.stocks

				if(nums > 1){
				  nums--
				  that.nums =  nums
				}else{
				  return false;
				}
			  },

			  //手动更新数量
			  updateCartNums:function(e){
				var that = this
				var nums = parseInt(e.detail.value);
				var limitnums = that.limitnums
				var stocks = that.stocks
				
				if (nums > 0){
				  if (limitnums > 0) {
					//有限购
					if (nums <= limitnums) {
					  if (nums <= stocks) {
						//有库存          
						that.nums =  nums
					  } else {
						//库存存不足
						wx.showToast({ title: '库存不足', icon: 'loading', duration: 1000 })
						that.nums =  stocks
						return false
					  }
					} else {
					  //超过限购数量
					  wx.showToast({ title: '超过限购数量', icon: 'loading', duration: 1000 })
					  that.nums =  limitnums
					  return false
					}
				  } else {
					if (nums <= stocks) {
					  //有库存        
					  that.nums =  nums
					} else {
					  //库存存不足
					  wx.showToast({ title: '库存不足', icon: 'loading', duration: 1000 })
					  return false
					}

				  }
				}else{
				  that.nums =  1
				}
			  },
			  
			//选择规格
			  chooseGuige:function(e){
				var that = this
				var key = e.currentTarget.dataset.key
				var guige = e.currentTarget.dataset.guige
				var price = e.currentTarget.dataset.price
				var fanxian = parseFloat(e.currentTarget.dataset.fanxian)
				// console.log("fanxian:" + guige_fanxian);
				// console.log("key:" + key);
				// console.log("guige_key:" + that.guige_key);
				if (key == that.guige_key){
					that.guige_name = ''
					that.guige_key = -1
					that.guige_price = 0
					that.guige_fanxian = 0
				}else{
					that.guige_name = guige
					that.guige_key = key
					that.guige_price = price
					that.guige_fanxian = fanxian				 
				}
				
			  },
			//返回首页
			  gohome:function(){
				uni.switchTab({
				  url: '/pages/index/index'
				})
			  },
			  
			  calling: function (e) {
				var phone = e.currentTarget.dataset.phone
				uni.makePhoneCall({
				  phoneNumber: phone //
				})
			  },
			  //跳转店铺
			  goshop(e){
				 var shopid = e.currentTarget.dataset.shopid 
				 uni.navigateTo({
				   url: '/pages/merchant/shop?id='+shopid
				 })
			  },

			  //跳转购物车
			  gotocart:function(){
				  var that = this
				  var totalnums = that.totalnums
				  if(totalnums == 0){
					  return false
				  }
				uni.navigateTo({
				  url: '/pages/cart/cart'
				})
			  },
			
			callphone: function (e) {
				var phone = e.currentTarget.dataset.phone
				uni.makePhoneCall({
				  phoneNumber: phone //
				})
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
						uni.setNavigationBarTitle({
						    title: data.goods.goods_title
						});
						// #ifdef H5
						if (that.$wechat ) {  
							 var g_price = data.goods.goods_price > 0 ? '商品价格：¥ '+data.goods.goods_price : '来电咨询'
						     that.$wechat.share({  
						          title:data.goods.goods_title,
								  desc: g_price,  
						          img: that.baseUrl + data.goods.goods_picture
						    });  
						}  
						// #endif
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			//获取商品评论
			getGoodsCommentList(){
				var that = this
				uni.request({
					url: common.apiUrl + 'getGoodsCommentList',
					method: 'GET',
					data: {
						goodsid:that.id
					},
					success: res => {
						var data = res.data
						that.comment_list = data.comment_list
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style>

.swiper{width:100%;height:375upx;}
.swiper .turnpic image{width:100%;height:375upx;display:block;}
.goods_info{background:#fff;padding:20upx;margin-bottom:20upx;}
.goods_title{font-size:32upx;line-height:40upx;display:block;margin-bottom:10upx;}
.goods_desc{color:#00b3b1;font-size:24upx;height:60upx;line-height:30upx;overflow: hidden;}
.goods_price{color:#E50011;padding: 0 10upx 20upx;}
.goods_price .price{font-size:36upx;font-weight:bold;display:inline-block;}
.goods_price text{font-weight:normal;font-size:28upx;}
.goods_price .delprice{font-size:28upx;color:#aaa;text-decoration:line-through;display:inline-block;padding-left:10upx;}

.goods_descrition{background:#fff;}
.goods_des_title{height:80upx;line-height:80upx;font-size:32upx;font-weight:bold;text-indent:20upx;background:#fafafa;}
.goods_des_content{padding:20upx;padding-bottom:120upx;}
.goods_des_content image{width:100%;}

.goods_guige{margin-bottom:20upx;background:#fff;}
.goods_guige_title{height:80upx;line-height:80upx;font-size:32upx;font-weight:bold;text-indent:20upx;background:#fafafa;}
.goods_guige_list{padding:20upx;}
.goods_guige_item{padding:20upx;line-height:40upx;border:1upx solid #ccc;border-radius: 6upx;display:inline-block;margin:10upx;}
.guige_in{background:#dc2f25;color:#fff;border:1upx solid #dc2f25;}

.share{width:60upx;}
.share image{width:60upx;height:60upx;}

.stock_info{font-size:24upx;color:#888;}
.stock_info text{padding-right:10upx;font-size:24upx;}

.hotline{background:#fff;padding:20upx;margin:20upx 0;}
.hotline image{width:50upx;height:50upx;display:inline-block; vertical-align: middle;}
.hotline text{display:inline-block;vertical-align: middle;padding-left:20upx;font-size:32upx;}
.hotline .more{width:40upx;height:40upx;float:right;padding-top:10upx;}
.shop_title{font-size:32upx;padding:0 10upx;}
.shop_btn{border:1upx solid #eee;line-height:50upx;padding:0 30upx;background:#fafafa;}

.goods_content{display: block;padding:10upx;margin-bottom:20upx;background:#fff;}
.goods_content_title{border-bottom:1upx solid #ddd;font-size:28upx;color:#333;line-height:60upx;}
.goods_content_main{display: block;font-size:28upx;color:#000;padding:20upx 0;}
.goods_content_main image{width:100%;display:block;}


/*********comment*********/
.goods_comment{background:#fff;padding:10upx 15upx;margin-bottom:20upx;font-size:24upx;color:#aaa;}
.goods_comment_title{border-bottom:1upx solid #eee;line-height:80upx;height:80upx;}
.title_name{font-size:28upx;color:#333;}
.comment_title_more{padding:0 10upx;}
.comment_info{padding:20upx 0;}
.comment_user{color:#333;font-size:28upx;}
.comment_user image{width:40upx;height:40upx;border-radius:50%;margin-right:10upx; vertical-align:middle}
.comment_time{padding:0 10upx;}
.comment_desc{color:#666;padding:10upx 0;}

.goods_comment_row{border-bottom:1px solid #eee;padding:20upx 0;}
.comment_img{width:100upx;height:100upx;display: inline-block;margin-right:10upx;border:1upx solid #eee;}
.comment_img image{width:100upx;height:100upx;}

.sharebg{background-color:rgba(0, 0, 0, 0.3);width:100%;position:fixed;z-index:10;top:0;bottom:0;left:0;right:0;}
.shareHB{width:80%;margin:4% 10%;position:fixed;z-index:10000;top:0;}
.shareHB_c{background:#fff;}
.shareBtn{position:absolute;left:35%;bottom:-80upx;width:30%;text-align:center;height:60upx;line-height:60upx;color:#000;font-size:32upx;background:#fff;}


.popShare{background:#fff;position:fixed;width:100%;bottom:0;z-index:1000;}
.popShareC{background:#f2f2f2;text-align:center;width:100%;padding:40upx 0;}
.popShareC_row{position:relative;}
.popShareC_img{width:100upx;height:100upx;padding:20upx;border-radius:50%;background:#fff;margin:0 auto;}
.popShareC_img image{width:100upx;height:100upx;}
.popShareC_btn{background:#fff;border:1upx solid #ccc;width:200upx;text-align:center;font-size:28upx;font-weight:bold;margin:20upx auto;height:60upx;line-height:60upx;border-radius:8upx;}
.popShareClose{width:100%;height:100upx;line-height:100upx;text-align:center;font-size:32upx;}


.btn_block{position:fixed;bottom:0;height:100upx;width:100%;background:#fafafa;color:#888;}
.btn_block_item{width:120upx;text-align:center;position:relative;}
.btn_block_item image{width:50upx;height:50upx;display:block;margin:4px auto 0;}
.btn_block_item text{font-size:24upx;display:block;}
.btn_block_item .cart_nums_t{position:absolute;top:10upx;right:15upx;background:#dc2f25;color:#fff;border-radius:50%;font-size:24upx;padding:0 12upx;}
.border_right_gray{border-right:1upx solid #eee;}
.kefu_btn{position:absolute;top:0;left:0;right:0;bottom:0;}
.addtocart{background:#dc2f25;color:#fff;text-align:center;display:block;height:100upx;line-height:100upx;font-size:32upx;}
.addtocart_disable{background:#666;color:#fff;}

.pop_bg{background-color:rgba(0, 0, 0, 0.3);width:100%;position:fixed;z-index:10;top:0;bottom:0;left:0;right:0;}
.pop_cart{background:#fff;width:100%;position:fixed;bottom:0;z-index:100;}
.pop_cart_title{border-bottom:1upx solid #eee;padding:10upx;}
.pop_cart_img{width:200upx;height:200upx;margin-top:-80upx;-webkit-box-shadow:3upx 3upx 3upx #ccc;-moz-box-shadow:3upx 3upx 3upx #ccc;box-shadow:3upx 3upx 3upx #ccc;padding:6upx;background:#fff;border-radius:6upx;}
.pop_cart_img image{width:200upx;height:200upx;display:block;}

.pop_cart_mtitle{font-size:24upx;padding:10upx 0 0 20upx;}
.pop_price{font-size:36upx;}
.pop_price view{font-size:36upx;}
.delprice{font-size:28upx;color:#aaa;text-decoration:line-through}

.pop_cart_close{width:40upx;}
.pop_cart_close image{width:40upx;height:40upx;}
.hideitem{display: none;}

.pop_cart_guige{padding:20upx;border-bottom:1upx solid #eee;}
.pop_cart_guige_title{font-size:28upx;margin:0 0 20upx;}
.pop_cart_guige_item{background:#eee;color:#333;padding:10upx 20upx;margin:10upx;display:inline-block;font-size:24upx;border-radius:6upx;}
.guige_itemin{background:#dc2f25;color:#fff;}

.pop_cart_nums{margin-bottom:30upx;padding:20upx;border-bottom:1upx solid #eee;font-size:28upx;line-height:40upx;}
.pop_cart_nums .tnums{font-size:28upx;}
.pop_cart_nums_btns{width:200upx;}
.nums_jian,.nums_jia{background:#ccc;color:#000;width:50upx;height:50upx;line-height:50upx;text-align:center;font-size:24upx;display:inline-block; vertical-align:middle}
.gray_bg{background:#f5f5f5;}
.nums_jian image,.nums_jia image{width:30upx;height:30upx;margin:10upx;}
.nums{display: inline-block;width:80upx;height:50upx;line-height:50upx;text-align:center;background:#eee;margin:0 2upx;border:none;vertical-align:middle}

.pop_cart_submit{height:100upx;line-height:100upx;width:100%;text-align:center;color:#fff;background:#dc2f25;font-size:32upx;}

.popbg{background-color:rgba(0, 0, 0, 0.3);width:100%;position:fixed;z-index:2000;top:0;bottom:0;left:0;right:0;}

.redfont{color:#dc2f25;padding-left:10upx;}

.goods_price_block{padding:10px 20upx 0;background:#fff;}
.goods_price{display:block;}
.goods_price_item{display:inline-block;font-size:28upx;margin-right:10upx;}
.goods_redprice{color:#dc2f25;}
.goods_stocks{font-size:24upx;color:#888;}
.big_price{font-size:34upx;}

</style>
