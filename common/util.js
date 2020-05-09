function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = parseInt(time % 60)
	var second = time
	
	// var ntime = []
	// ntime.push(hour)
	// ntime.push(minute)
	// ntime.push(second)
	// return ntime

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	})
}

function formatUnixtimestamp (unixtimestamp){
        var unixtimestamp = new Date(unixtimestamp);
        var year = 1900 + unixtimestamp.getYear();
        var month = "0" + (unixtimestamp.getMonth() + 1);
        var date = "0" + unixtimestamp.getDate();
        var hour = "0" + unixtimestamp.getHours();
        var minute = "0" + unixtimestamp.getMinutes();
        var second = "0" + unixtimestamp.getSeconds();
        return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
            + " " + hour.substring(hour.length-2, hour.length) + ":"
            + minute.substring(minute.length-2, minute.length)
 }
 
function getDateTime(){
	var oDay = new Date()
	var year = 1900 + oDay.getYear();
	var month = "0" + (oDay.getMonth() + 1);
	var date = "0" + oDay.getDate();
	return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
}

function ArrayExtractToObjectWithKey(array, key) {

  let result = new Object()

  for (let i = 0, len = array.length; i < len; i++) {

    let newkey = array[i][key]
    result[newkey] = { ...array[i] }

  }

  return result

}

function hidePhoneNumber(phone){
  //return phone.substr(0, 3) + '****' + phone.substr(7);
  //var phone = phone.toString();
  if (typeof phone == 'undefined' || phone == null){
    return '';
  }else{
    return phone.replace(/^(\d{4})\d{4}(\d+)/, "$1****$2");
  }
  //return '123'
};


function ObjectToArray(object){
  var res = new Array()

  for (var key in object) {

    res.push(object[key])

  }
  return res
}

function isPoneAvailable(phone) {
	var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
	if (!myreg.test(phone)) {
		return false;
	} else {
		return true;
	}
}



function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

module.exports = {
	formatTime: formatTime,
	formatUnixtimestamp:formatUnixtimestamp,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	ObjectToArray:ObjectToArray,
	ArrayExtractToObjectWithKey:ArrayExtractToObjectWithKey,
	isPoneAvailable:isPoneAvailable,
	hidePhoneNumber:hidePhoneNumber,
	getDateTime:getDateTime
}
