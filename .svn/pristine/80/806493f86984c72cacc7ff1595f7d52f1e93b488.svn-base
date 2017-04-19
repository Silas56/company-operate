myApp.controller('productDevide', function($scope, ngDialog, $rootScope, $http, $routeParams) {
	$scope.param = {};
	$scope.privateparam = {};
	$scope.isopen = true;
	$scope.productDown1 = true;
	$scope.saleDown1 = true;
	$scope.productDown2 = true;
	$scope.saleDown2 = true;
	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.privatepaginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};


	var basicUrl = ctx + "shop/queryShopProvider.json";

	$scope.onSearch1 = function() {
		$scope.param.shopCode = $routeParams.shopCode;
		$scope.param.groupType = 1;
		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;
		$http.post(basicUrl, $scope.param).success(function(data) {
			console.info(data);
			$scope.providers = data.shopPageInfo.saleShops;
			$scope.paginationConf = {
				currentPage: $scope.param.pageNum,
				totalItems: data.shopPageInfo.total,
				itemsPerPage: $scope.param.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	}


	$scope.onSearch2 = function() {
		$scope.privateparam.shopCode = $routeParams.shopCode;
		$scope.privateparam.groupType = 2;
		$scope.privateparam.pageNum = $scope.privatepaginationConf.currentPage;
		$scope.privateparam.pageSize = $scope.privatepaginationConf.itemsPerPage;
		$http.post(basicUrl, $scope.privateparam).success(function(data) {
			console.info(data);
			$scope.privateDatas = data.shopPageInfo.saleShops;
			$scope.privatepaginationConf = {
				currentPage: $scope.privateparam.pageNum,
				totalItems: data.shopPageInfo.total,
				itemsPerPage: $scope.privateparam.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	}
	$scope.changePrivate = function(value) {
		if (value == 1) {
			$scope.isopen = true;
		} else {
			$scope.isopen = false;
		}
	}

	$scope.descFun = function(value) {
		if (value == 'productCount1') {
			$scope.productDown1 = !$scope.productDown1;
			$scope.param.orderField = "salingCount";
			if ($scope.productDown1) {
				$scope.param.orderValue = "DESC";
			} else {
				$scope.param.orderValue = "ASC";
			}
		}
		if (value == 'productCount2') {
			$scope.productDown2 = !$scope.productDown2;
			$scope.privateparam.orderField = "salingCount";
			if ($scope.productDown2) {
				$scope.privateparam.orderValue = "DESC";
			} else {
				$scope.privateparam.orderValue = "ASC";
			}
		}
		if (value == 'productSale1') {
			$scope.saleDown1 = !$scope.saleDown1;
			$scope.param.orderField = "monthlySaleCount";
			if ($scope.saleDown1) {
				$scope.param.orderValue = "DESC";
			} else {
				$scope.param.orderValue = "ASC";
			}
		}
		if (value == 'productSale2') {
			$scope.saleDown2 = !$scope.saleDown2;
			$scope.privateparam.orderField = "monthlySaleCount";
			if ($scope.saleDown2) {
				$scope.privateparam.orderValue = "DESC";
			} else {
				$scope.privateparam.orderValue = "ASC";
			}
		}
		if ($scope.isopen) {
			$scope.onSearch1();
		} else {
			$scope.onSearch2();
		}

	}
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch1);
	$scope.$watch('privatepaginationConf.currentPage + privatepaginationConf.itemsPerPage', $scope.onSearch2);
})