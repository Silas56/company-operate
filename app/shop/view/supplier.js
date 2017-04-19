myApp.controller('supplier', function($scope, ngDialog, $rootScope, $routeParams, $http) {
	$scope.timeDown = true;
	$scope.saleDown = true;
	$scope.countDown = true;
	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.param = {};

	$scope.onSearch = function() {
		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;
		$scope.param.shopCode = $routeParams.shopCode;
		var url = ctx + 'shop/getSupplierStatistics.json';
		$http.post(url, $scope.param).success(function(data) {
			$scope.suppliers = data.pageInfo.supplierStatistics;
			$scope.paginationConf = {
				currentPage: $scope.param.pageNum,
				totalItems: data.pageInfo.total,
				itemsPerPage: $scope.param.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		})
	}

	$scope.descFun = function(value) {
		if (value == 'timeDown') {
			$scope.timeDown = !$scope.timeDown;
			$scope.param.orderField = "joined_time";
			if ($scope.timeDown) {
				$scope.param.orderValue = "DESC";
			} else {
				$scope.param.orderValue = "ASC";
			}
		}
		if (value == 'saleDown') {
			$scope.saleDown = !$scope.saleDown;
			$scope.param.orderField = "saleCount";
			if ($scope.saleDown) {
				$scope.param.orderValue = "DESC";
			} else {
				$scope.param.orderValue = "ASC";
			}
		}
		if (value == 'countDown') {
			$scope.countDown = !$scope.countDown;
			$scope.param.orderField = "unSaleCount";
			if ($scope.countDown) {
				$scope.param.orderValue = "DESC";
			} else {
				$scope.param.orderValue = "ASC";
			}
		}
		$scope.onSearch();
	}
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);
})