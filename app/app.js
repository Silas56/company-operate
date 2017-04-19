// spring mvc data prefix
// 顶级路由
var ctx = '/operateManage/api/';

// define our application and pull in ngRoute and ngAnimate
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngDialog', 'tm.pagination', 'chart.js', 'ui.bootstrap', 'RecursionHelper']).value(
	'version', '0.1'
);

// 设置所有dialog的默认值
myApp.config(['ngDialogProvider', function (ngDialogProvider) {
	ngDialogProvider.setDefaults({
		className: 'ngdialog-theme-default',
		plain: false,
		showClose: true,
		closeByDocument: true,
		closeByEscape: true,
		appendTo: false,
		preCloseCallback: function () { }
	});
}]);

// 
// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
// 路由设置
myApp.config(function ($routeProvider) {

	$routeProvider
		/**
		 * 店铺管理
		 */
		.when('/shop/manage', {
			templateUrl: 'app/shop/manage/shopManage.html'
		})
		.when('/shop/func', {
			templateUrl: 'app/shop/func/shopFunc.html'
		})
		.when('/shop/check', {
			templateUrl: 'app/shop/check/shopCheck.html'
		})
		.when('/shop/detail/:shopCode/:shopType/:channelCode/:editType', {
			templateUrl: 'app/shop/view/shopDetail.html'
		})

		/**
		 * 订单管理
		 */
		.when('/order/list', {
			templateUrl: 'app/order/list/orderList.html'
		})
		.when('/order/static', {
			templateUrl: 'app/order/static/orderStatic.html'
		})
		.when('/order/organ', {
			templateUrl: 'app/order/organ/orderOrgan.html'
		})
		.when('/order/view/:orderCode/:orderStatus/:returnUrl/:distributionType', {
			templateUrl: 'app/order/view/orderView.html'
		})
		.when('/order/comment', {
			templateUrl: 'app/order/comment/comment.html'
		})
		.when('/order/commentDetail/:code', {
			templateUrl: 'app/order/comment/commentDetail.html'
		})
		.when('/order/clearing', {
			templateUrl: 'app/order/clearing/clearing.html'
		})
		.when('/order/clearingError', {
			templateUrl: 'app/order/clearingError/clearingError.html'
		})

		/**
		 * 账号
		 */
		.when('/user/platformUser', {
			templateUrl: 'app/user/platformUser/platformUser.html'
		})
		.when('/user/insideAuthorize', {
			templateUrl: 'app/user/insideAuthorize/insideAuthorize.html'
		})
		.when('/user/insideStarf', {
			templateUrl: 'app/user/insideStarf/insideStarf.html'
		})


		/**
		 * 部落
		 */
		.when('/tribe/tribeIndex', {
			templateUrl: 'app/tribe/tribeIndex/tribe.html'
		})
		.when('/tribe/addTribe', {
			templateUrl: 'app/tribe/addTribe/addTribe.html'
		})
		.when('/tribe/showTribe/:tribeid' , {							//这一块实现有难度，前期解决方案自己模拟数据
			templateUrl: 'app/tribe/showTribe/showTribe.html'
		})

		/**
		 * 财务
		 */
		.when('/account/reconciliation', {
			templateUrl: 'app/account/reconciliation/reconciliation.html'
		})
		.when('/account/refund', {
			templateUrl: 'app/account/refund/refund.html'
		})
		.when('/account/withdrawals', {
			templateUrl: 'app/account/withdrawals/withdrawals.html'
		})
		.when('/order/view/:orderCode/:orderStatus/:returnUrl/:distributionType', {
			templateUrl: 'app/order/view/orderView.html'
		})

		/**
		 * 产品
		 */
		.when('/product/productManage', {
			templateUrl: 'app/product/productManage/productIndex.html'
		})
		.when('/product/productManage/productDetail/:productCode/:shopCode/',{
			templateUrl:'app/product/productManage/productDetail.html'
		})

		/**
		 * 数据中心
		 */
		.when('/data/comment', {
			templateUrl: 'app/datacenter/filter/filterWords.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});