/**
 * Created by dengrunquan on 16/4/22.
 */
myApp.controller('shopFund', function($scope, $http, $routeParams, ngDialog) {
	//资金账号
	$scope.detail = {};
	$scope.detail.shopCode = $routeParams.shopCode;
	$scope.detail.shopType = $routeParams.shopType;
	$scope.detail.editType = $routeParams.editType;
	$scope.hasChannel = true;
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};

	$scope.fundSearch = function() {
		var basicUrl = ctx + "shop/queryShopAccountInfo.json?shopCode=" + $routeParams.shopCode;
		$http.get(basicUrl).success(function(data) {
			console.info(data);
			$scope.funds = data;
			$scope.funds.servcieRate = parseInt($scope.funds.servcieRate * 1000) / 10;
			if (!isBlank($scope.funds.accountInfo.accountNum)) {
				$scope.hasChannel = true;
				$scope.funds.accountInfo.accountNum = $scope.funds.accountInfo.accountNum.substring(0, 3) + "***********" + $scope.funds.accountInfo.accountNum.substring($scope.funds.accountInfo.accountNum.length - 4, $scope.funds.accountInfo.accountNum.length);
			}else{
				$scope.hasChannel = false;
			}
		});

		//配置分页基本参数
		$scope.recordParam = {};
		$scope.recordParam.shopCode = $routeParams.shopCode;
		$scope.recordParam.pageNum = $scope.paginationConf.currentPage;
		$scope.recordParam.pageSize = $scope.paginationConf.itemsPerPage;
		var recordUrl = ctx + "account/queryUserGetCashList.json";
		$http.post(recordUrl, $scope.recordParam).success(function(data) {
			console.info(data);
			if (!isBlank(data.withDrawRecordPage)) {
				$scope.records = data.withDrawRecordPage.withDrawRecordBeans;
				for (var i = 0; i < $scope.records.length; i++) {
					if ($scope.records[i].status == 1) {
						$scope.records[i].statusName = "未处理";
					}
					if ($scope.records[i].status == 2) {
						$scope.records[i].statusName = "银行处理中";
					}
					if ($scope.records[i].status == 3) {
						$scope.records[i].statusName = "处理失败";
					}
					if ($scope.records[i].status == 4) {
						$scope.records[i].statusName = "处理成功";
					}
				}
				$scope.paginationConf = {
					currentPage: $scope.recordParam.pageNum,
					totalItems: data.withDrawRecordPage.total,
					itemsPerPage: $scope.recordParam.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			} else {
				$scope.paginationConf = {
					currentPage: $scope.recordParam.pageNum,
					totalItems: 0,
					itemsPerPage: $scope.recordParam.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			}
		});
	}

	$scope.fundSearch();

	$scope.fundSet = function() {
		ngDialog.open({
			template: 'app/shop/view/fundSet.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	$scope.fundChangeRecord = function() {
		ngDialog.open({
			template: 'app/shop/view/fundChangeRecord.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.fundSearch);
});