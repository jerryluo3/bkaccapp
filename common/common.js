const baseUrl = "https://www.bkacc.com/";
const apiUrl = "https://www.bkacc.com/weapp/";
const sjApiUrl = "https://www.bkacc.com/weappsj/";
const appVerson = '1.1.0';
const address = [];
const isused = 0;
const titleHeight = 0;
const statusBarHeight = 0;
const naviBarHeight = 0;
const sayHi = function(){
 console.log('hi');
}

const getUserInfo = function(){
 var that = this
 var userInfo = uni.getStorageSync('userInfo');
 uni.request({
 	url: apiUrl + 'user/getUserInfo',
 	method: 'GET',
 	data: {
 		userid:userInfo.mem_id
 	},
 	success: res => {
 		//console.log("res",res)
 		var userInfo = res.data.userInfo
		that.userInfo = userInfo
		//console.log("userInfo",userInfo)
 		uni.setStorageSync('userInfo',userInfo);
 		uni.setStorageSync('uid',userInfo.mem_id);
 	},
 	fail: () => {},
 	complete: () => {}
 });
}


export default{
 baseUrl,
 apiUrl,
 sjApiUrl,
 appVerson,
 sayHi,
 address,
 isused,
 titleHeight,
 statusBarHeight,
 naviBarHeight,
 getUserInfo
}