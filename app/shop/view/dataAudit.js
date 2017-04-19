myApp.controller('dataAudit', function($scope, $rootScope, ngDialog, $timeout, $http, $routeParams) {
	$scope.param = {};
	$scope.code = "";
	if ($routeParams.shopCode == "") {
		$scope.code = $routeParams.shopOutCode;
	} else {
		$scope.code = $routeParams.shopCode;
	}

	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};

	$scope.auditSearch = function() {
		var authUrl = ctx + "shop/queryShopAuthenticationStatus.json?shopCode=" + $routeParams.shopCode;
		$http.get(authUrl).success(function(data) {
			$scope.authStatusBean = data;
			$scope.param.status = $scope.authStatusBean.authenticationStatus;
		})
		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;
		var basicUrl = ctx + "shop/queryShopAuthenticationLog.json?shopCode=" + $routeParams.shopCode + "&pageSize=" + $scope.param.pageSize + "&pageNum=" + $scope.param.pageNum;
		$http.get(basicUrl).success(function(data) {
			console.info(data);
			$scope.audits = data.shopLogList;
			if (!isBlank(data.shopLogList)) {
				for (var i = 0; i < $scope.audits.length; i++) {
					if ($scope.audits[i].auditStatus == 1) {
						$scope.audits[i].auditStatusName = "审核中"
					}
					if ($scope.audits[i].auditStatus == 2) {
						$scope.audits[i].auditStatusName = "正常营业"
					}
					if ($scope.audits[i].auditStatus == 3) {
						$scope.audits[i].auditStatusName = "审核未通过"
					}
					if ($scope.audits[i].auditStatus == 4) {
						$scope.audits[i].auditStatusName = "暂停营业"
					}
					if ($scope.audits[i].auditStatus == 5) {
						$scope.audits[i].auditStatusName = "已冻结"
					}
					if($scope.audits[i].status == 1){
						$scope.audits[i].statusName = "未认证";
					}
					if($scope.audits[i].status == 2){
						$scope.audits[i].statusName = "已认证";
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
	}

	$scope.submit = function() {
		var url = ctx + "shop/updateAndSavaAuthenticationStatus.json"
		$scope.param.shopCode = $routeParams.shopCode;
		if (isBlank($scope.param.status)) {
			showMessage(ngDialog, "认证状态不能为空！", function() {});
			return;
		}
		if (isBlank($scope.param.remark)) {
			showMessage(ngDialog, "备注不能为空！", function() {});
			return;
		}
		$http.post(url, $scope.param).success(function(data) {
			showMessage(ngDialog, data.msg, function() {
				$scope.auditSearch();
			});
		});
	}

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.auditSearch);
})