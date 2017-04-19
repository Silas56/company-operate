/**
 * Created by dengrunquan on 16/4/20.
 */
/**
 * 日期加减
 * @param AddDayCount
 * @returns {string}
 * @constructor
 */
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
}


/**
 * 显示窗口
 * @param ngDialog
 * @param msg
 * @param confirmFunc
 * @param cancelFunc
 */
function showMessage(myDialog,msg,confirmFunc,cancelFunc){

    var temp = "<div>" +
        "<div class='window-header' style='width: 450px;'>提示</div>" +
        "<div class='pt20'><span>"+msg+"</span></div>" +
        "<div class='pt20 text-center'><a class='checkA' style='padding: 6px 37px;' ng-click='confirm()'>关闭</a></div>" +
        "</div>"

    myDialog.openConfirm({
        template: temp,
        plain: true,
        closeByEscape: false,
        closeByDocument: false
    }).then(function (value) {
        if(confirmFunc){
            confirmFunc(value);
        }
    }, function (reason) {
        if(cancelFunc){
            cancelFunc(reason);
        }

    });
}


/**
 * 确认框
 * @param ngDialog
 * @param msg
 * @param confirmFunc
 * @param cancelFunc
 */
function confirmDialog(myDialog,msg,confirmFunc,cancelFunc){
    var temp = "<div>" +
        "<div class='window-header' style='width: 450px;'>请确认</div>" +
        "<div class='pt20'><span>"+msg+"</span></div>" +
        "<div class='pt30 text-center'>" +
        "<a class='checkA' style='padding: 6px 37px;' ng-click='confirm()'>确定</a>"+
        "<a class='checkA' style='padding: 6px 37px;margin-left:5px' ng-click='closeThisDialog()'>取消</a>"+
        "</div>" +
        "</div>";




    myDialog.openConfirm({
        template: temp,
        plain: true,
        closeByEscape: false,
        closeByDocument: false
    }).then(function (value) {
        if(confirmFunc){
            confirmFunc(value);
        }
    }, function (reason) {
        if(cancelFunc){
            cancelFunc(reason);
        }
    });
}

/**
 * 是否包括
 * @param arr
 * @param obj
 * @returns {boolean}
 */
function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}