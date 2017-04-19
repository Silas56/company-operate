myApp.controller('fundSet', function($scope, $http, ngDialog, $routeParams) {
	$scope.setParam = {};
	$scope.setParam.shopCode = $routeParams.shopCode;
	$scope.serviceRateMid = "";
	$scope.funds.servcieRateSetNow = parseInt($scope.funds.servcieRate * 1000) / 1000
	$scope.set = function() {
		var seeUrl = ctx + "shop/updateShopServiceRate.json";
		if (isBlank($scope.serviceRateMid)) {
			showMessage(ngDialog, "新服务费率不能为空！", function() {});
			return;
		}
		if (IsNum2($scope.serviceRateMid) && $scope.serviceRateMid != 0) {
			showMessage(ngDialog, "新服务费率只能为大于等于0的纯数字,且最多有一位小数！", function() {});
			return;
		}
		if (parseInt($scope.serviceRateMid) >= 100) {
			showMessage(ngDialog, "新服务费率不能大于等于100！", function() {});
			return;
		}
		if (isBlank($scope.setParam.remark)) {
			showMessage(ngDialog, "变更理由不能为空！", function() {});
			return;
		}
		$scope.setParam.serviceRate = $scope.serviceRateMid * 10000 / 100 / 10000;
		$http.post(seeUrl, $scope.setParam).success(function(data) {
			showMessage(ngDialog, data.msg, function() {
				if (data.code == 100) {
					$scope.closeThisDialog();
					$scope.fundSearch();
				}
			});
		});
	}
})