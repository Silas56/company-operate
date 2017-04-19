/***************各种校验公共方法******************/

/**********************校验日期开始时间小于结束时间****************************/

var checkTimeValid = function(startdate, enddate) {
	if (!isBlank(startdate)) {
		var startdate = FormatDate(startdate);
		var arr = startdate.split("-");
		var starttime = new Date(arr[0], arr[1], arr[2]);
		var starttimes = starttime.getTime();
	}
	if (!isBlank(enddate)) {
		var enddate = FormatDate(enddate);
		var arrs = enddate.split("-");
		var lktime = new Date(arrs[0], arrs[1], arrs[2]);
		var lktimes = lktime.getTime();
	}

	if (starttimes > lktimes) {
		return false;
	} else
		return true;
}

/**********************非空校验****************************/
var isBlankTime = function(param1,param2){
	if(!isBlank(param1) && isBlank(param2)){
		return true;
	}
	if(isBlank(param1) && !isBlank(param2)){
		return true;
	}
}


var isBlank = function(param) {
	if (param == "" || param == null || param == undefined) {
		return true;
	}
	return false;
}

/***************************日期格式化*********************************/
function FormatDate(strTime) {
	if (!isBlank(strTime)) {
		var date = new Date(strTime);
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	}
}

/**
 * 判断数字（可带小数），校验不通过返回true
 */
var IsNum = function(param) {
	var idReg = /^\d+(\.\d+)?$/;
	if (param != "" && param != null && !idReg.test(param)) {
		return true;
	}
	return false;
};

/**
 * 判断数字（可带1位小数），校验不通过返回true
 */
var IsNum2 = function(param){
	var idReg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1})?$/;
	if(param!="" && param!=null && !idReg.test(param)) {
		return true;
	}
	return false;
}

/**
 * 判断数字（可带2位小数），校验不通过返回true
 */
var IsNum3 = function(param){
	var idReg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1})?$/;
	if(param!="" && param!=null && !idReg.test(param)) {
		return true;
	}
	return false;
}

var IsNumOrC = function(param) {
	var idReg = /^[A-Za-z0-9]+$/;
	if (param != "" && param != null && !idReg.test(param)) {
		return true;
	}
	return false;
}

function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    var jing = curWwwPath.indexOf("#");
    curWwwPath = curWwwPath.substring(0,jing);
    curWwwPath += "#/shop/check"
    return(curWwwPath);
}

