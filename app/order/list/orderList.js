/**
 * Created by dengrunquan on 16/4/18
 */
myApp.controller('orderList', function($scope, $http, $filter, ngDialog) {


	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};

	$scope.orderTimeDown = true;
	$scope.orderAmountDown = true;

	//条件
	$scope.param = {};
	$scope.param.orderField = "orderTime";
	$scope.param.orderValue = "desc";


	//查询
	$scope.onSearch = function() {
		var url = ctx + 'order/queryOperateOrder.json';

		if ($scope.param.orderTimeStart) {
			$scope.param.orderTimeStart = $filter('date')($scope.param.orderTimeStart, 'yyyy-MM-dd');
		}
		if ($scope.param.orderTimeEnd) {
			$scope.param.orderTimeEnd = $filter('date')($scope.param.orderTimeEnd, 'yyyy-MM-dd');
		}
		if ($scope.param.consumeTimeStart) {
			$scope.param.consumeTimeStart = $filter('date')($scope.param.consumeTimeStart, 'yyyy-MM-dd');
		}
		if ($scope.param.consumeTimeEnd) {
			$scope.param.consumeTimeEnd = $filter('date')($scope.param.consumeTimeEnd, 'yyyy-MM-dd');
		}
		
		if (isBlankTime($scope.param.orderTimeStart, $scope.param.orderTimeEnd)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if (isBlankTime($scope.param.consumeTimeStart, $scope.param.consumeTimeEnd)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}

		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;


		$http.post(url, $scope.param).success(function(data) {
			$scope.orders = data.queryOperateByOrderList;
			if(data.queryOperateByOrderList){
				for(var i = 0;i<data.queryOperateByOrderList.length;i++){
				if(data.queryOperateByOrderList[i].orderStatus == 3){
					data.queryOperateByOrderList[i].consumeTime = "";
				}
			}
			}
			$scope.paginationConf = {
				currentPage: $scope.param.pageNum,
				totalItems: data.total,
				itemsPerPage: $scope.param.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	};

	//导出
	$scope.exportEditDialog = function() {
		ngDialog.open({
			template: 'app/order/list/editExport.html',
			scope: $scope,
			closeByDocument:false
		});
	}

	//仲裁
	$scope.organEditDialog = function(orderCode, orderStatus, refundCode, editType, status) {
		$scope.editData = {
			"orderCode": orderCode,
			"orderStatus": orderStatus,
			"refundCode": refundCode,
			"editType": editType,
			"ListStatus": status
		};
		ngDialog.open({
			template: 'app/order/organ/orderOrganEdit.html',
			scope: $scope,
			closeByDocument: false
		});
	};

	$scope.organEditDialogView = function(orderCode, orderStatus, refundCode, editType, status) {
		$scope.editData = {
			"orderCode": orderCode,
			"orderStatus": orderStatus,
			"refundCode": refundCode,
			"editType": editType,
			"ListStatus": status
		};
		ngDialog.open({
			template: 'app/order/organ/orderOrganEdit.html',
			scope: $scope,
			closeByDocument: false
		});
	};

	/***************************************************************
	         当页码和页面记录数发生变化时监控后台查询
	         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
	         ***************************************************************/
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);


	$scope.descFun = function(value, myasc) {
		$scope.param.orderField = value;
		$scope.param.orderValue = myasc;
		if (value == 'orderTime') {
			$scope.orderTimeDown = !$scope.orderTimeDown;
		} else if (value == 'orderAmount') {
			$scope.orderAmountDown = !$scope.orderAmountDown;
		}
		$scope.onSearch();
	}


});