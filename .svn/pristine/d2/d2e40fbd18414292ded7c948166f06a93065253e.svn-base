/**
 * Created by dengrunquan on 16/4/23.
 */
/**
 * 显示输入输出日志
 */
myApp.factory('loginInfoPrintIpt', [function() {
	var loginInfoPrintIpt = {
		request: function(config) {
			// if (config.data) {
			// 	console.debug(config.data);
			// }
			return config;
		},
		response: function(response) {
			// console.debug(response);
			return response;
		}
	};
	return loginInfoPrintIpt;
}]);

/**
 * overlay
 */
myApp.factory('overlayIpt', ['$q', function() {
	var overlayIpt = {
		request: function(config) {
			overlay();
			return config;
		},
		response: function(response) {
			deloverlay();
			return response;
		}
	};
	return overlayIpt;
}]);


/**
 * 授权认证
 */
myApp.factory('authIpt', ['$injector', '$q', function($injector, $q) {
	var authIpt = {
		ignores: [ //这个数组记录的地址都不弹窗提示
			'/operateManage/api/order/checkOrderList.json'
		],
		response: function(response) {
			if (response.data  && response.data.code) {
				// if(response.data.code!=100&&response.data.code!=102&&response.data.code!=404){
				// 	response.data.code =!response.data.code;
				// }
				// var code =code?response.data.code:response.data;
				var code = response.data.code;
				if (code == 403) {
					//var ngDialog = $injector.get('ngDialog');
					//showMessage(ngDialog, "你没有登录，请重新登录。", function() {
						//提示
						var loginUrl = ctx + "gotoLogin";
						window.location = loginUrl;
					//});
				} else if(code == 405){
					var ngDialog = $injector.get('ngDialog');
					showMessage(ngDialog,"对不起，该用户未授权登录，请联系客服人员QQ:800071678！",function() {
						var loginUrl = ctx + "gotoLogout";
						window.location = loginUrl;
					});
					retrun;
				 } 
				 else if (code != 100 && code != 102 && code != 404&&code !=00001&&code!=203&&code!=200&&code!=905&&code!=202) {
					var url = response.config.url;
					var auth = $injector.get('authIpt');
					for(var i = auth.ignores.length - 1; i >= 0; i--) {
						if(url.indexOf(auth.ignores[i]) > -1) return response;
					}
					var ngDialog = $injector.get('ngDialog');
					// $injector.get('ngDialog').showMessage(ngDialog, response.data.msg);
					showMessage(ngDialog, response.data.msg);
				}else{
					return response;
				} 


			}
			return response;
		},
		responseError: function(err) {
			deloverlay();
			var ngDialog = $injector.get('ngDialog');
			if(isBlank(err.statusText)){
				showMessage(ngDialog, "抱歉，此网页暂时无法访问");
			}else{
				showMessage(ngDialog, err.statusText);
			}
			return $q.reject(err);
		}
	};
	return authIpt;
}]);

//设置所有ajax的默认值
myApp.factory('requestHeadersss',function () {
    return {
        request: function(config){
            config.headers = config.headers || {};
                config.headers.asyncRequest = 'json';
            return config;
        }
    };
});
//myApp.factory('MyRequests', function($http, $cookieStore) {
//	return {
//		request: function(method, url, data, okCallback, koCallback) {
//			$http({
//				timeout:10000,
//				method: method,
//				url: url,
//				data: data
//			}).success(okCallback).error(koCallback);
//		},
//		authentifiedRequest: function(method, url, data, okCallback, koCallback) {
//			$http({
//				timeout:10000,
//				method: method,
//				url: url,
//				data: data,
//				headers: {
//					'Authorization': $cookieStore.get('token')
//				}
//			}).success(okCallback).error(koCallback);
//		}
//	}
//});


myApp.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('loginInfoPrintIpt');
	$httpProvider.interceptors.push('overlayIpt');
	$httpProvider.interceptors.push('authIpt');
    $httpProvider.interceptors.push('requestHeadersss');
}]);



//遮罩层处理
var overlay = function() {
	var docHeight = $(document).height(); //获取窗口高度

	$('body').append('<div id="overlay"></div>');

	$('#overlay').height(docHeight).css({
		'opacity': .5, //透明度
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'background-color': '#f5f5f5',
		'width': '100%',
		'z-index': 5000 //保证这个悬浮层位于其它内容之上
	});

	$('body').append("<div id='overlayLodingImg'><img width='50px' src='img/overlayLoading.gif'></div>");
	$("#overlayLodingImg").css({
		'position': 'absolute',
		'background-color': '#c1c1c1',
		'width': '50px',
		'height': '50px',
		'z-index': 5001,
		'border-radius': '5px',
		'top': '250px',
		'left': '650px'
	});

};

var deloverlay = function() {
	$('#overlay').remove();
	$('#overlayLodingImg').remove();
};