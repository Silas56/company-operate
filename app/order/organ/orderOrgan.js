myApp.controller('orderOrgan', function($scope, $http, $filter, ngDialog) {

	$scope.undeal = true;
	$scope.deal = false;
	//配置分页基本参数
	$scope.paginationConf1 = {
		itemsPerPage: 10,
		currentPage: 1
	};

	//配置分页基本参数
	$scope.paginationConf2 = {
		currentPage: 1,
		itemsPerPage: 10
	};

	//条件
	$scope.param = {};
	$scope.param.orderField = "refundTime";
	$scope.param.orderValue = "desc";

	$scope.orderTimeDown1 = true;
	$scope.refundTimeDown1 = true;

	$scope.orderTimeDown12 = true;
	$scope.refundTimeDown2 = true;
	
	$scope.changeTab = function(value) {
		$scope.undeal = false;
		$scope.deal = false;
		if (value == "undeal") {
			$scope.undeal = true;
		}
		if (value == "deal") {
			$scope.deal = true;
		}
		$scope.onSearch();
	}
	//查询
	$scope.onSearch = function() {
		if($scope.undeal){
			$scope.onSearch1();
		}else if($scope.deal){
			$scope.onSearch2();
		}
		
	};

	$scope.onSearch1 = function() {
		var url = ctx + 'order/queryOperateArbitrationRefundOrder.json';

		//条件
		if ($scope.param.refundTimeStart) {
			$scope.param.refundTimeStart = $filter('date')($scope.param.refundTimeStart, 'yyyy-MM-dd');
		}
		if ($scope.param.refundTimeEnd) {
			$scope.param.refundTimeEnd = $filter('date')($scope.param.refundTimeEnd, 'yyyy-MM-dd');
		}

		if (isBlankTime($scope.param.refundTimeStart, $scope.param.refundTimeEnd)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}


		var param1 = jQuery.extend({}, $scope.param);

		//未处理
		param1.arbitratorResult = 0;
		param1.pageNum = $scope.paginationConf1.currentPage;
		param1.pageSize = $scope.paginationConf1.itemsPerPage;
		$http.post(url, param1).success(function(data) {
			$scope.orders1 = data.queryOperateByOrderArbitrationRefundList;
			$scope.paginationConf1 = {
				currentPage: param1.pageNum,
				totalItems: data.total,
				itemsPerPage: param1.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	}

	$scope.onSearch2 = function() {
		var url = ctx + 'order/queryOperateArbitrationRefundOrder.json';


		if ($scope.param.refundTimeStart) {
			$scope.param.refundTimeStart = $filter('date')($scope.param.refundTimeStart, 'yyyy-MM-dd');
		}
		if ($scope.param.refundTimeEnd) {
			$scope.param.refundTimeEnd = $filter('date')($scope.param.refundTimeEnd, 'yyyy-MM-dd');
		}


		var param2 = jQuery.extend({}, $scope.param);

		//己处理
		param2.arbitratorResult = 1;
		param2.pageNum = $scope.paginationConf2.currentPage;
		param2.pageSize = $scope.paginationConf2.itemsPerPage;

		$http.post(url, param2).success(function(data) {
			$scope.orders2 = data.queryOperateByOrderArbitrationRefundList;
			$scope.paginationConf2 = {
				currentPage: param2.pageNum,
				totalItems: data.total,
				itemsPerPage: param2.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	};

	//过滤套餐规格
	$scope.fiterSpec = function(value){
		if(!value){
			return '';
		}else{
			return value + '+';
		}
	};

	//仲裁
	$scope.organEditDialog = function(orderCode, orderStatus, refundCode, editType, status,refundReason,refundReasonDes,sellerRejectReasonDes,shopName) {
		if(refundReason == 0){
			refundReason = "未知";
		}
		if(refundReason == 1){
			refundReason = "填写信息错误";
		}
		if(refundReason == 2){
			refundReason = "重复预订";
		}
		if(refundReason == 3){
			refundReason = "不想买了";
		}
		if(refundReason == 4){
			refundReason = "其他";
		}
		$scope.editData = {
			"orderCode": orderCode,
			"orderStatus": orderStatus,
			"refundCode": refundCode,
			"editType": editType,
			"ListStatus": status,
			"refundReason":refundReason,
			"refundReasonDes":refundReasonDes,
			"sellerRejectReasonDes":sellerRejectReasonDes,
			"shopName":shopName
		};
		ngDialog.open({
			template: 'app/order/organ/orderOrganEdit.html',
			scope: $scope,
			closeByDocument:false
		});
	};


	/***************************************************************
	         当页码和页面记录数发生变化时监控后台查询
	         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
	         ***************************************************************/
	$scope.$watch('paginationConf1.currentPage + paginationConf1.itemsPerPage+paginationConf2.currentPage + paginationConf2.itemsPerPage', $scope.onSearch);

	$scope.descFun1 = function(value, myasc) {
		$scope.param.orderField = value;
		$scope.param.orderValue = myasc;
		if (value == 'orderTime') {
			$scope.orderTimeDown1 = !$scope.orderTimeDown1;
		} else if (value == 'refundTime') {
			$scope.refundTimeDown1 = !$scope.refundTimeDown1;
		}
		$scope.onSearch1();
	}

	$scope.descFun2 = function(value, myasc) {
		$scope.param.orderField = value;
		$scope.param.orderValue = myasc;
		if (value == 'orderTime') {
			$scope.orderTimeDown2 = !$scope.orderTimeDown2;
		} else if (value == 'refundTime') {
			$scope.refundTimeDown2 = !$scope.refundTimeDown2;
		}
		$scope.onSearch2();
	}
})