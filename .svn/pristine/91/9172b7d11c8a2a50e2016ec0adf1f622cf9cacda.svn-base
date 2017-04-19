myApp.controller('refundDeal', function($scope, $http, ngDialog) {
	$scope.showParam = {};
	$scope.param = {};
	$scope.showParam.success = true;
	$scope.showParam.fail = false;
	$scope.param.accountId = $scope.openDealParam.accountId;
	$scope.param.acceptId = $scope.openDealParam.acceptId;
	$scope.param.isSuccess = 100;
	$scope.submit = function() {
		var url = ctx + 'account/onlineWithDraw.json'
		if ($scope.showParam.success) {
			if (isBlank($scope.param.sourceSystem)) {
				showMessage(ngDialog, "交易渠道不能为空！", function() {});
				return;
			}
			if (isBlank($scope.param.counterFee)) {
				showMessage(ngDialog, "手续费不能为空！", function() {});
				return;
			}
			if (isBlank($scope.param.outTradeNo)) {
				showMessage(ngDialog, "业务流水号不能为空！", function() {});
				return;
			}
			if (isBlank($scope.param.remark)) {
				showMessage(ngDialog, "操作备注不能为空！", function() {});
				return;
			}
		} else {
			if (isBlank($scope.param.outTradeNo)) {
				showMessage(ngDialog, "业务流水号不能为空！", function() {});
				return;
			}
			if (isBlank($scope.param.remark)) {
				showMessage(ngDialog, "操作备注不能为空！", function() {});
				return;
			}
		}
		$http.post(url, $scope.param).success(function(data) {
			showMessage(ngDialog, data.msg, function() {
				$scope.closeThisDialog();
				$scope.onSearch();
			});
		})
	}
	$scope.changeCash = function(value) {
		if (value == "success") {
			$scope.showParam.success = true;
			$scope.showParam.fail = false;
		} else if (value == "fail") {
			$scope.showParam.success = false;
			$scope.showParam.fail = true;
		}

	}
})