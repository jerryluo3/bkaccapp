<template>
	<view class="page">
		<view class='search_block'>
		  <view class="weui-flex">     
		      <view class="weui-flex__item"><input placeholder="请输入搜索内容" :value="keys" @input="inputsearch" name="keys" maxlength='-1' class="input_txt" ></input></view>
		      <!-- <view class="search_btn" @click='setSearch'>
		        <button plain="true" form-type="submit" style='border:none;color:#000;width:40rpx;line-height:40rpx;height:40rpx;margin:0;padding:0;' ><image src='../../static/images/search.png'></image></button>
		      </view> -->
		    </view>
		</view>
		
		
		<view class="goods_list">
			<view class="goods_item weui-flex" v-for="(item,index) in goodsList" :key="index">
				<view class="goods_picture" @click="jumpUrl" :data-url="'/pages/merchant/goods?id='+item.goods_id"><image v-if="item.goods_picture" :src="baseUrl + item.goods_picture" mode="aspectFill"></image></view>
				<view class="goods_info weui-flex__item">
					<view class="goods_title" @click="jumpUrl" :data-url="'/pages/merchant/goods?id='+item.goods_id">{{ item.goods_title }}</view>
					<view class="goods_tags" v-if="item.goodsTags != ''">
						<view class="goods_tags_item" v-for="(items,indexs) in item.goodsTags " :key="indexs">{{ items }}</view>
					</view>
					
					<view class="weui-flex">
						<view class="weui-flex__item">
							<view class="goods_price" v-if="shop.shop_type == 1 && shop.shop_allowview == 1">¥ {{ item.goods_price }}</view>
							<view class="goods_shenqingprice" v-else-if="shop.shop_type == 1 && shop.shop_allowview == 0" @click="shenqingView">申请查看价格</view>
							<view class="goods_price" v-else-if="shop.shop_type == 0 && item.goods_price > 0">¥ {{ item.goods_price }}</view>
							<view class="goods_price" v-else @click="contactShop">来电咨询</view>
						</view>
						<view class="goods_option" v-if=" (shop.shop_type == 1 && shop.shop_allowview == 1) || (shop.shop_type == 0 && item.goods_price > 0 && canbuy == 1 )">
							<view class="goods_btn goods_add" @tap="operate" :data-op="'addOne'" :data-price="item.goods_price" :data-id="item.goods_id" :data-index="index" :data-title="item.goods_title" :data-stocks="item.goods_stocks"><image src="../../static/images/add.png"></image></view>
						</view>
					</view>
				</view>
			</view>
			<view class="isall" v-if="isall == 1">
				<text>我是有底线的</text>
			</view>
		</view>
		
		<!--购物车开始-->
		<view class="uni-flex pop_cart cart_disable" :class="totalamount > 0 ? '' : 'pop_disable'" v-if="totalnums > 0 && qisong_cha > 0">
			<view class="pop_cart_ico" @tap="toggleCartInfo">
				<image src="../../static/images/cart_ico.png"></image>
				<text>{{totalnums}}</text>
			</view>
			<view class="uni-flex-item pop_cart_info" @tap="toggleCartInfo">
				<view class="empty_info">
					<view class="totalamount" v-if="totalamount > 0">¥ <text>{{totalamount}}</text></view>
					<view class="qisong" v-else>未选择商品</view>
				</view>
			</view>
			<view class="pop_cart_btn">差¥{{ qisong_cha }}起送</view>
		</view>
		<view class="uni-flex pop_cart" :class="totalamount > 0 ? '' : 'pop_disable'" v-else-if="totalnums > 0 && qisong_cha <= 0">
			<view class="pop_cart_ico" @tap="toggleCartInfo">
				<image src="../../static/images/cart_ico.png"></image>
				<text>{{totalnums}}</text>
			</view>
			<view class="uni-flex-item pop_cart_info" @tap="toggleCartInfo">
				<view class="empty_info">
					<view class="totalamount" v-if="totalamount > 0">¥ <text>{{totalamount}}</text></view>
					<view class="qisong" v-else>未选择商品</view>
				</view>
			</view>
			<view class="pop_cart_btn" @tap="checkout">立即下单</view>
		</view>
		
		<view class="pop_mask" @tap="toggleCartInfo" v-if="opened == true"></view>
		<view class="pop_cart_block" v-if="opened == true">
			<view  class="pop_cart_block_title uni-flex">
				<view class="uni-flex-item pop_cart_btitle">已选商品 <text>({{totalnums}}件)</text></view>
				<view class="pop_cart_block_clear" @tap="clearCart"><image src="../../static/images/clear.png"></image>清空</view>
			</view>
			<view class="cartinfo_list">
				<view class="uni-flex cartinfo_item" v-for="(item,index) in mycartList" :key="index">
					<view class="uni-flex-item">
						<view class="cartinfo_title">{{item[4]}}</view>
						<view class="cartinfo_guige">{{item[6]}}</view>
					</view>
					<view class="cartinfo_price">¥{{item[3]}}</view>
					
					<view class="cartinfo_btns">
						<view class="uni-flex">
							<view class="uni-flex-item goods_btn goods_sub" @tap="opcart" :data-op="'subOne'" :data-price="item[3]" :data-index="index" :data-id="item[1]" :data-title="item[4]"><image src="../../static/images/sub.png"></image></view>
							<view class="goods_nums">{{item[2]}}</view>
							<view class="uni-flex-item goods_btn goods_add" @tap="opcart" :data-op="'addOne'" :data-price="item[3]" :data-index="index" :data-id="item[1]" :data-title="item[4]"><image src="../../static/images/add.png"></image></view>
						</view>
						
					</view>
				</view>
			</view>			
		</view>
		
		<view class="pop_bg" :class="hideitem == 1 ? 'hideitem' : ''" @click='closePopCart' id="pop_bg"></view>
		<view class="pop_carts" :class="hideitem == 1 ? 'hideitem' : ''">
		  <view class='weui-flex pop_cart_title'>
			<view class="pop_cart_img"><image v-if="goods.goods_picture" :src='baseUrl+goods.goods_picture'></image></view>
			<view class="weui-flex__item pop_cart_mtitle">
			  <view class="goods_redprice pop_price" v-if=" guige_price == 0 ">
				<view>￥{{ goods.goods_price }}</view>
			  </view>
			  <view class="goods_redprice pop_price" v-else>￥{{guige_price}}</view>
			  <view class="goods_guige" style='font-size:24upx;' v-if=" guige_name == '' ">请选择 规格</view>
			  <view class="goods_guige" v-else>已选择 {{guige_name}}  库存 {{ guige_stocks }}</view>
			</view>
			<view class="pop_cart_close" @click='closePopCart'><image src='../../static/images/pop_close.png'></image></view>
		  </view>
		  <view class='pop_cart_guige'>
		  			<view class="pop_cart_guige_title">规格</view>
		  			<block v-for="(item,index) in guige" :key="index">
		  			<view class='pop_cart_guige_item' :class="guige_key == index ? 'guige_itemin' : ''" :data-key="index" :data-guige=" item[0] " :data-price=" item[1] " :data-stocks=" item[3] " @click='chooseGuige'>{{ item[0] }}</view>
		  			</block>       
		  </view>
		  <view class="weui-flex pop_cart_nums">
			  <view class='weui-flex__item tnums'>数量</view>
			  <view class='pop_cart_nums_btns'>
				<view class="nums_jian" @click='cartNumsJIAN' v-if=" nums > 1"><image src='../../static/images/jian.png'></image></view>
				<view class="nums_jian gray_bg" @click='cartNumsJIAN' v-else><image src='../../static/images/jian_disable.png'></image></view>
				<input type='number' class='nums' :value=' nums ' bindblur="updateCartNums" />
				<view class="nums_jia" @click='cartNumsADD' v-if=" (limitnums > 0 && nums < limitnums) || (limitnums == 0 && nums > 0) "><image src='../../static/images/jia.png'></image></view>
				<view class="nums_jia gray_bg" @click='cartNumsADD' v-else><image src='../../static/images/jia_disable.png'></image></view>
			  </view>
		  </view>
		  <view class='pop_cart_submit' @click='addToCart'>确定</view>
		</view>
		
		<!--购物车结束-->
		
		
		<!--申请查看表单-->
		<view class="pop_bg" :class="showForm ? '' : 'hideitem'" @click='toggleForm'></view>
		<view class="form_block" :class="showForm ? '' : 'hideitem'">
			<form @submit="formSubmit">
			<view class="form_item weui-flex">
				<view class="weui-flex__item">
					<input class="form_input" type="text" name="title" value="" focus placeholder="店铺名称" />
				</view>
			</view>
			<view class="form_item weui-flex">
				<view class="weui-flex__item">
					<input class="form_input" type="text" name="addr" value="" focus placeholder="店铺地址" />
				</view>
			</view>
			<view class="form_item weui-flex">
				<view class="weui-flex__item">
					<input class="form_input" type="text" name="contacter" value="" focus placeholder="联系人" />
				</view>
			</view>
			<view class="form_item weui-flex">
				<view class="weui-flex__item">
					<input class="form_input" type="number" name="mobile" :value="userInfo.users_mobile" focus placeholder="手机号" />
				</view>
			</view>
			<button formType="submit" class="form_btn">提交 申请查看价格</button>
			</form>
		</view>
		
	</view>
</template>

<script>
import common from '../../common/common.js'
	
export default {
	data() {
		return {
			baseUrl:common.baseUrl,		
			userInfo:[],
			shopid:0,				//店铺ID
			shop:[],				//店铺信息
			qisong_cha:0,			//起送价
			keys:'',				//关键字
			
			goodsList:[],			//商品列表
			canbuy:0,
			isall:0,				//是否全部
			page:0,
			
			mycartList:[],			//购物车
			totalnums:0,			//总数量
			totalamount:0.00,		//总金额
			opened:false,			//是否弹出购物车信息
			
			goods:[],				//当前选择商品
			hideitem:1,
			guige:[],
			guige_name:'',       //选择的规格名称
			guige_key: -1,     //选中的规格键值
			guige_price:0,         //选中规格的价格
			guige_stocks:0,
			nums:1,
			
			showForm:false,
		};
	},
	onLoad(option) {
		var that = this
		
		var shopid = option.id
		that.shopid = shopid
		var userInfo = uni.getStorageSync('userInfo');
		if(userInfo != ''){
			that.userInfo = userInfo
		}
		uni.setStorageSync('shopid', shopid);
		
		var mycartList = uni.getStorageSync('mycartList');
		var timestamp = Date.parse(new Date());
		var mycartList_expire = uni.getStorageSync('mycartList_expire');
		if( timestamp > mycartList_expire && mycartList){
			//过期
			uni.setStorageSync('mycartList', '');
			uni.setStorageSync('mycartList_expire', '');
		}
		that.mycartList = mycartList != '' ? mycartList : []
		
		//获取店铺信息
		that.getShopInfo();	
		
		that.getSearchGoodsList();		
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
		//购物车数量加
		cartNumsADD:function(){
			var that = this
			var nums = that.nums
			var limitnums = that.limitnums
			var stocks = that.guige_stocks
			var guige_key = that.guige_key
			if(guige_key == -1){
				uni.showToast({ title: '请先选择规格',icon: 'loading',duration: 1000 })
				return false
			}
			
			if(limitnums > 0){
			  //有限购
			  if(nums < limitnums){
				if(nums < stocks){
				  //有库存
				  nums++
				  that.nums = nums
				}else{
				  //库存存不足
				  uni.showToast({ title: '库存不足',icon: 'loading',duration: 1000 })
				  return false
				}        
			  }else{
				//超过限购数量
				uni.showToast({ title: '超过限购数量', icon: 'loading', duration: 1000 })
				return false
			  }
			}else{
			  if (nums < stocks) {
				//有库存
				nums++
				that.nums = nums
			  } else {
				//库存存不足
				uni.showToast({ title: '库存不足', icon: 'loading', duration: 1000 })
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
			var stocks = that.guige_stocks
		
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
			var stocks = that.guige_stocks
			
			if (nums > 0){
			  if (limitnums > 0) {
				//有限购
				if (nums <= limitnums) {
				  if (nums <= stocks) {
					//有库存          
					that.nums =  nums
				  } else {
					//库存存不足
					uni.showToast({ title: '库存不足', icon: 'loading', duration: 1000 })
					that.nums =  stocks
					return false
				  }
				} else {
				  //超过限购数量
				  uni.showToast({ title: '超过限购数量', icon: 'loading', duration: 1000 })
				  that.nums =  limitnums
				  return false
				}
			  } else {
				if (nums <= stocks) {
				  //有库存        
				  that.nums =  nums
				} else {
				  //库存存不足
				  uni.showToast({ title: '库存不足', icon: 'loading', duration: 1000 })
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
			
			if (key == that.guige_key){
				that.guige_name = ''
				that.guige_key = -1
				that.guige_price = 0
				that.guige_stocks = 0
			}else{
				that.guige_name = guige
				that.guige_key = key
				that.guige_price = price
				that.guige_stocks = that.guige[key][3]
			}
			
		  },
		//关闭弹出层
		  closePopCart:function(){
			var that = this
			that.hideitem = 1;
			that.guige_name = ''
			that.guige_key = -1
			that.guige_price = 0
			that.guige_stocks = 0;
			that.nums = 1;
		  },
		
		  //弹出
		  popCart:function(){
			var that = this
			that.hideitem = 0;
		  },
		  
		  //加入购物车
		  addToCart:function(){
			var that = this
			that.checkAttr();
			if (that.guige_key == -1) {
			  wx.showToast({
				title: '请选择规格',
				icon: 'none',
				duration: 1000
			  })
			  return false
			}
		
		   
		
			var userInfo = uni.getStorageSync("userInfo");
			var id = that.goods.goods_id;
			var title = that.goods.goods_title;
			var nums = that.nums;
			var guige_name = that.guige_name;
			var price = that.guige_price;
		
			
			if (userInfo.users_id > 0) {
			  
			  uni.showToast({
				title: '加载中',
				icon: 'loading',
				duration: 1000
			  })
			  var guige = that.guige
			  var kindex = that.guige_key;
			  var stocks = guige[kindex][3];
			  var mycartList = that.mycartList;
			  var userInfo = uni.getStorageSync('userInfo');
			  
			  
			  if( stocks <= 0 || stocks < nums){
			  	uni.showToast({
			  		title:'库存不足',
			  		duration:1500,
			  		icon:'none'
			  	})
			  	return false
			  }
			  
			  var ishas = 0;
			  console.log("stocks",stocks)
			  for(var i=0;i<mycartList.length;i++){
			  	if(mycartList[i][1] == id && mycartList[i][5] == kindex){
					var tnum = mycartList[i][2]
					var t_nums = tnum +nums 
					console.log("t_nums",t_nums)
			  		if( stocks < t_nums){
			  			uni.showToast({
			  				title:'库存不足',
			  				duration:1500,
			  				icon:'none'
			  			})
			  			return false
			  		}
			  		mycartList[i][2] = mycartList[i][2] + nums;							
			  		ishas = 1;
			  	}
			  }
			  	
			  	console.log("mycartList",mycartList)				
			  if(ishas == 0){
			  	var temparr = [];
			  	temparr.push(that.goods.goods_shopid);		//店铺ID
			  	temparr.push(id);						//商品ID
			  	temparr.push(nums);						//数量
			  	temparr.push(price);					//价格
			  	temparr.push(title);					//标题
			  	temparr.push(kindex);					//规格KEY
			  	temparr.push(guige_name);				//规格名称
			  	console.log(temparr)
			  	mycartList.push(temparr);
			  }
			  console.log(mycartList);
			  
			  that.updateCartInfo();
			  
			  //wx.setStorageSync('mycartList', mycartList);
			  var timestamp = Date.parse(new Date());
			  var expire = timestamp + 3600000
			  uni.setStorageSync('mycartList', mycartList);
			  uni.setStorageSync('mycartList_expire', expire);
			  that.closePopCart();
		
			} else {
			  //app.checkUserLogin();
			  uni.showModal({
				title: '提示',
				showCancel: false,
				content: '亲，您还没有登录，现在去登录',
				success: function (res) { 
				  uni.navigateTo({
					url: '/pages/user/login?tfrom=goods&id='+that.id
				  })
				}
			  })
		
			}
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
		//下单,到购物车确认页面
		checkout(){
			var that = this
			var userInfo = uni.getStorageSync('userInfo');
			var mycartList = that.mycartList;
			if(userInfo == ''){
				uni.navigateTo({
					url: '/pages/userlogin/userlogin'
				});
				return false;
			}else{				
				setTimeout(function(){
					uni.navigateTo({
						url: '/pages/cart/cart'
					});
				},1000);
				
				
			}
			
		},
		//操作购物车信息
		opcart(e){
			var that = this
			var target = e.currentTarget.dataset
			var id = target.id;
			var index = target.index;
			var op = target.op;
			var price = target.price;
			var title = target.title;
			var stocks = target.stocks;
			var goodsList = that.goodsList;
			var mycartList = that.mycartList;
			var userInfo = uni.getStorageSync('userInfo');			
			var ishas = 0;
			
			var currentTime = new Date().getTime();
			var tnowtime = currentTime/1000;
			var activity = that.activity
			
			
			if (op == 'addOne'){//添加
				if( stocks <= goodsList[index]['nums'] ){
					uni.showToast({
						title:'库存不足',
						duration:1500,
						icon:'none'
					})
					return false
				}
				mycartList[index][2]++;
			}
			if(op == 'subOne'){
				mycartList[index][2]--
				if(mycartList[index][2] == 0){
					mycartList.splice(index,1);
				}
			}
			
			
			that.updateCartInfo();
			
			that.mycartList = mycartList
			if(mycartList == ''){
				that.opened = false
			}
			
			//wx.setStorageSync('mycartList', mycartList);
			var timestamp = Date.parse(new Date());
			var expire = timestamp + 3600000
			uni.setStorageSync('mycartList', mycartList);
			uni.setStorageSync('mycartList_expire', expire);
			
			//that.getGoodsList();
			
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
			var goodsList = that.goodsList;
			var mycartList = that.mycartList;
			var userInfo = uni.getStorageSync('userInfo');
			
			that.goods = goodsList[index]
			that.guige = goodsList[index]['goods_guige']
			
			
			if( stocks <= 0){
				uni.showToast({
					title:'库存不足',
					duration:1500,
					icon:'none'
				})
				return false
			}
			if(goodsList[index]['goods_guige'] != '' || goodsList[index]['goods_guige'] != ''){
				that.popCart();
				return false;
			}
			
			var ishas = 0;
			
			if (op == 'addOne'){//添加
					console.log("goodsList",goodsList);
					console.log("index",index);				
					
					var t_temai = 0;
					for(var i=0;i<mycartList.length;i++){
						if(mycartList[i][1] == id){
							if( stocks <= goodsList[index]['nums']){
								uni.showToast({
									title:'库存不足',
									duration:1500,
									icon:'none'
								})
								return false
							}
							mycartList[i][2]++;							
							ishas = 1;
							goodsList[index]['nums']++;
						}
					}
						
						console.log("mycartList",mycartList)				
					if(ishas == 0){
						var temparr = [];
						temparr.push(that.shop.shop_id);		//店铺ID
						temparr.push(id);						//商品ID
						temparr.push(1);						//数量
						temparr.push(price);					//价格
						temparr.push(title);					//标题
						goodsList[index]['nums'] = 1;
						console.log(temparr)
						mycartList.push(temparr);
					}
					
					
			}
			if(op == 'subOne'){
				for(var i=0;i<mycartList.length;i++){
					if(mycartList[i][1] == id){
						mycartList[i][2]--;
						ishas = 1;
						goodsList[index]['nums']--;
						if(mycartList[i][2] == 0){
							mycartList.splice(i,1);
							goodsList[index]['nums'] = 0;
						}
					}
				}
			}
			console.log(mycartList);
			
			that.goodsList = goodsList;
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
			  
			  totalnums += mycartList[j][2];
			  //var tt = parseFloat(nums_arr[j]) * parseFloat(price_arr[j]);				 
			  totalamount += mycartList[j][2]*mycartList[j][3];
			  var t_amount = mycartList[j][2]*mycartList[j][3];
			  t_amount = t_amount.toFixed(2)
			}		
			totalamount = Math.round(totalamount * 100) / 100;		
		
			that.totalnums = totalnums;
			that.totalamount = totalamount;
			var qisong_cha = that.shop.shop_qisong - totalamount
			that.qisong_cha = qisong_cha.toFixed(2)
			console.log("qisong_cha",qisong_cha)
			
		},
		
		//弹出或隐藏购物车信息
		toggleCartInfo(){
			var that = this
			var opened = that.opened;
			that.opened = opened == true ? false : true;
			
		},
		
		//清空购物车
		clearCart(){
			var that = this
			uni.showModal({
				title: '提示',
				content: '确定要清空吗？',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
						uni.removeStorageSync('mycartList');
						uni.removeStorageSync('mycartList_expire');
						that.mycartList = [];
						that.opened = false
						that.peisong = false;
						that.totalamount = 0;
						that.totalnums = 0;
						that.getShopGoodsList();
						console.log('aa');
						that.updateCartInfo();
						
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		
		//联系商家
		contactShop(){
			var that = this
			var shop_mobile = that.shop.shop_mobile
			uni.makePhoneCall({
				phoneNumber:shop_mobile
			})
		},
		//获取店铺信息
		getShopInfo(){
			var that = this
			var shopid = that.shopid
			var userInfo = uni.getStorageSync('userInfo');
			if(shopid == '' || shopid == 0){
				return false
			}
			uni.request({
				url: common.apiUrl + 'shop/getShopInfo',
				method: 'GET',
				data: {
					shopid:shopid,
					userid:userInfo.users_id
				},
				success: res => {
					that.shop = res.data.shop
					var shop = res.data.shop
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
		//申请查看
		shenqingView(){
			var that = this
			var userInfo = uni.getStorageSync('userInfo');
			console.log("userInfo",userInfo.users_id)
			if(userInfo.users_id  > 0 ){
				that.toggleForm();
				
			}else{
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '亲，您还没有登录，现在去登录',
					success: function (res) { 
					  uni.navigateTo({
						url: '/pages/userlogin/userlogin?tfrom=products&id='+that.shopid,
						success:function(res){
							console.log(res);
						}
					  })
					}
				})
			}
		},
		
		//提交申请查看表单
		formSubmit(e){
			var that = this
			var data = e.detail.value;
			var title = data.title
			var addr = data.addr
			var contacter = data.contacter
			var mobile = data.mobile
			//检测是否有推荐人
			var userInfo = uni.getStorageSync('userInfo');
			console.log('aaa');
			
			if(title == ''){					
				uni.showToast({
					title: '请输入店铺名称',duration: 1500,icon :'none'
				});
				return false
			}
			
			if(addr == ''){
				uni.showToast({
					title: '请输入店铺地址',duration: 1500,icon :'none'
				});
				return false
			}
			
			if(contacter == ''){
				uni.showToast({
					title: '请输入联系人',duration: 1500,icon :'none'
				});
				return false
			}
			
			if(mobile.length != 11){
				uni.showToast({
					title: '请输入联系人手机',duration: 1500,icon :'none'
				});
				return false
			}
			
			uni.showLoading({
				title: '提交中'
			});
			
			uni.request({
				url: common.apiUrl + 'shop/shenqingViewShopPrice',
				method: 'GET',
				data: {
					shopid:that.shopid,
					userid:userInfo.users_id,
					title:title,
					addr:addr,
					contacter:contacter,
					mobile:mobile,
				},
				success: res => {
					uni.hideLoading();
					var data = res.data
					console.log(data);
					if(data.code == 0){						
						uni.showToast({
							title: '提交成功，等待审核',
							duration: 1500,
							icon:'success'
						});
						setTimeout(function(){
							that.toggleForm();							
						},1500)
					}else{
						uni.showToast({
							title: data.msg,
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
			
			
		
		
		toggleForm(){
			var that = this
			that.showForm = !that.showForm;
		},
		
		inputsearch(e){
		  var that = this
		  var keys = e.detail.value;
		  if (keys != that.keys) {
			that.keys = keys
			that.resetAttr();
			that.getSearchGoodsList();
			console.log(that.keys);
		  } else {
		    return false
		  }
		  
		  
		},
		//重置参数
		resetAttr(){
			var that = this
			that.page = 0;
			that.isall = 0;
			that.goodsList = []
		},
		
		//加载更多
		loadmore(){
			var that = this
			that.page = that.page+1;
			that.getSearchGoodsList();
		},
		//搜索店铺列表
		getSearchGoodsList(){
			var that = this
			if(that.keys == ''){
				uni.showToast({
					title:'请输入搜索内容',
					icon:'loading',
					duration:1500,
				})
				return false
			}
			
			uni.request({
				url: common.apiUrl + 'shop/getSearchGoodsList',
				method: 'GET',
				data: {
					keys:that.keys,
					shopid:that.shopid,
					page:that.page+1
				},
				success: res => {
					var data = res.data
					console.log(data)
					var goodsList = data.goods_list
					for(var i=0;i<goodsList.length;i++){
						that.goodsList.push(goodsList[i])
					}						
					that.isall = data.isall
					that.canbuy = data.canbuy
					console.log("goodsList",that.goodsList)
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

/******商品列表********/

.goods_list{padding:1%;}
.goods_item{padding:2%;width:42.5%;display: inline-block; vertical-align: top;height:530upx;background:#fff;margin:1%;box-shadow:0 3upx 3upx #eee;}
.goods_picture{height:350upx;}
.goods_picture image{width:100%;height:100%;}
.goods_title{font-size:32upx;line-height:40upx;height:80upx;margin:10upx 0;overflow: hidden;}
.goods_price{font-size:32upx;font-weight:700;color:#f40;height:60upx;line-height:60upx;}
.goods_shenqingprice{background:#f40;color:#fff;border-radius:6upx;height:50upx;line-height:50upx;padding:0 10upx;display:inline-block;}
.goods_btn,.goods_btn image{width:50upx;height:50upx;border-radius:50%;}
.goods_btn{border:4upx solid #00aafa;border-radius:50%;display:inline-block;vertical-align:top;}
.goods_nums{width:60upx;text-align:center;line-height:60upx;display:inline-block;vertical-align:top;}
.goods_add{background:#00aafa;}
.goods_sub{}
.goods_tags{padding:10upx 0;}
.goods_tags_item{border:1upx solid #d9d9d9;color:#ff6408;margin-right:10upx;padding:0 5upx;display:inline-block;font-size:20upx;border-radius:4upx;}

/****全部***/
.isall{width:100%;text-align:center;color:#ccc;margin:20upx 0;border-bottom:1upx solid #f1f1f1;height:20upx;}
.isall text{padding:0 40upx;background:#fff;position:relative;line-height:40upx;}

/******购物车*******/
.pop_mask{width:750upx;height:100%;position:absolute;background-color:rgba(0,0,0,0.5);bottom:100upx;}
.pop_cart_block{background:#fff;z-index:100000;position:absolute;bottom:100upx;max-height:600upx;width:750upx;}
.pop_cart_block_title{background:#fafafa;height:80upx;line-height:80upx;padding:0 2%;}
.pop_cart_block_title .pop_cart_btitle{font-weight:bold;font-size:32upx;line-height:80upx;}
.pop_cart_block_title .pop_cart_btitle text{font-size:24upx;font-weight: normal;color:#777;}
.pop_cart_block_clear image{width:30upx;height:30upx;vertical-align:top;display:inline-block;margin-top:22upx;}
.pop_cart_block_clear{width:120upx;text-align:center;color:#777;line-height:80upx;}
.cartinfo_list{margin:20upx 0;width:100%;overflow: scroll;max-height:500upx;}
.cartinfo_item{border-bottom:1upx solid #eee;padding:20upx;}
.cartinfo_item .cartinfo_title{font-weight: bold;font-size:28upx;}
.cartinfo_item .cartinfo_price{color: #e50011;font-weight: bold;width:150upx;text-align:center;line-height:60upx;font-size:28upx;}
.cartinfo_item .cartinfo_guige{font-size:24upx;color:#aaa;}
.cartinfo_btns{width:200upx;position:relative;}
.cartinfo_btns .goods_btn,.cartinfo_btns .goods_btn image{border-radius:50%;width:50upx;height:50upx;}
.cartinfo_btns .goods_btn{border:4upx solid #00aafa;border-radius:50%;}
.cartinfo_btns .goods_nums{width:60upx;text-align:center;position:absolute;left:60upx;line-height:50upx;font-size:28upx;}
.cartinfo_btns .goods_add{background:#00aafa;position:absolute;right:20upx;}
.cartinfo_btns .goods_sub{position:absolute;left:0;}

.pop_cart{width:750upx;height:100upx;line-height:100upx;background:#f99000;position: fixed;bottom:0;z-index:1000;color:#fff;text-align:center;}
.pop_cart_ico{padding:80upx;padding:0 30upx;position:relative;}
.pop_cart_ico image{width:70upx;height:60upx;margin-top:25upx;}
.pop_cart_ico text{position:absolute;background:#fdd108;color:#008085;text-align:center;width:40upx;height:40upx;line-height:40upx;font-size:24upx;border-radius:50%;top:10upx;right:5upx;}
.pop_cart_btn{background:#fdd108;color:#008085;min-width:200upx;line-height:100upx;font-size:28upx;font-weight: bold;}
.pop_cart_info{text-align:left;padding-left:10upx;}
.pop_cart_info .empty_info{display:block;line-height:40upx;}
.pop_cart_info .empty_info .totalamount{font-weight:bold;font-size:32upx;line-height:100upx;text-indent:10upx;}
.pop_cart_info .empty_info .totalamount text{font-size:36upx;}
.pop_cart_info .empty_info .all_disamount{font-size:24upx;font-weight:normal;padding-left:20upx;}
.pop_cart_info .empty_info .qisong{font-size:28upx;padding-top:25upx;}
.pop_cart_info .empty_info .ps_fee{font-size:20upx;line-height:30upx;color:#9f9fa0;}
.pop_disable{ -webkit-filter: grayscale(100%);-moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); _filter:none; }
.cart_disable{background:#008085;}

/****全部***/
.isall{width:100%;text-align:center;color:#ccc;margin:20upx 0;border-bottom:1upx solid #f1f1f1;height:20upx;}
.isall text{padding:0 40upx;position:relative;line-height:40upx;}

.pop_bg{background-color:rgba(0, 0, 0, 0.3);width:100%;position:fixed;z-index:10;top:0;bottom:0;left:0;right:0;}
.pop_carts{background:#fff;width:100%;position:fixed;bottom:100upx;z-index:2000;}
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

/******form_block******/
.form_block{width:90%;background:#fff;padding:5%;position:fixed;bottom:0;z-index:111111}
.form_item{border-bottom:1upx solid #eee;height:80upx;line-height:80upx;padding:10upx;}
.form_input{height:80upx;line-height:80upx;padding:0 3%;font-size:36upx;}
.form_btn{background:#ff8400;color:#fff;margin:3%;height:100upx;line-height:100upx;border-radius:6upx;text-align:center;font-size:32upx;font-weight:bold;}
</style>
