/**
 * Created by dengrunquan on 16/4/12.
 */

myApp.controller('shopCheck', function($scope, $http, $filter, ngDialog ,$timeout) {
	$scope.applyDesc = "desc";
	$scope.applyDown = true;

	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.param = {};

	//查询
	$scope.onSearch = function() {
		//条件
		var url = ctx + 'shop/queryAuditShopList.json';

		if ($scope.param.startApplyDate) {
			$scope.param.startApplyDate = $filter('date')($scope.param.startApplyDate, 'yyyy-MM-dd');
		}
		if ($scope.param.endApplyDate) {
			$scope.param.endApplyDate = $filter('date')($scope.param.endApplyDate, 'yyyy-MM-dd');
		}
		if ($scope.param.startDealDate) {
			$scope.param.startDealDate = $filter('date')($scope.param.startDealDate, 'yyyy-MM-dd');
		}
		if ($scope.param.endDealDate) {
			$scope.param.endDealDate = $filter('date')($scope.param.endDealDate, 'yyyy-MM-dd');
		}
		if (isBlankTime($scope.param.startApplyDate, $scope.param.endApplyDate)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if (isBlankTime($scope.param.startDealDate, $scope.param.endDealDate)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}

		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;

		// console.info($scope.param);
		$http.post(url, $scope.param).success(function(data) {
			// console.info(data);
			$scope.shopchecks = data.shopBeans;
			if (!isBlank(data.shopBeans)) {
				for (var i = 0; i < data.shopBeans.length; i++) {
					//checkStatus
					var shopcheck = $scope.shopchecks[i];
					var checkStatus = '没定义';
					if (shopcheck.checkStatusCode == 1) {
						checkStatus = "审核中";
					} else if (shopcheck.checkStatusCode == 2) {
						checkStatus = "正常营业";
					} else if (shopcheck.checkStatusCode == 3) {
						checkStatus = "审核未通过";
					} else if (shopcheck.checkStatusCode == 4) {
						checkStatus = "暂停营业";
					} else if (shopcheck.checkStatusCode == 5) {
						checkStatus = "已冻结";
					}
					shopcheck.checkStatusName = checkStatus;

					//channelType
					shopcheck.channelName = '没定义';
					if (shopcheck.channelCode == 0) {
						shopcheck.channelName = 'PC';
					} else if (shopcheck.channelCode == 1) {
						shopcheck.channelName = 'WEBAPP';
					} else if (shopcheck.channelCode == 2) {
						shopcheck.channelName = 'APP';
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
		})
	};

	$scope.descFun = function() {
		$scope.applyDown = !$scope.applyDown;
		//		$scope.param.sortField = "createTime";
		if ($scope.applyDesc == "asc") {
			$scope.param.sortType = "desc";
			$scope.applyDesc = "desc";
		} else {
			$scope.param.sortType = "asc";
			$scope.applyDesc = "asc";;
		}
		$scope.onSearch();
	}

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);
});