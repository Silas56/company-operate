myApp.controller('withdrawalsDeal', function($scope, $rootScope, ngDialog, $timeout, $http) {
	$scope.param = {};
	$scope.param.code = $scope.openDealParam.paymentCode;
	$scope.param.orderCode = $scope.openDealParam.orderCode;
	$scope.sureSubmit = function() {
		var url = ctx + 'account/refund.json'
		if (isBlank($scope.param.payMethod)) {
			showMessage(ngDialog, "交易渠道不能为空！", function() {});
			return;
		}
		if (isBlank($scope.param.tradeCode)) {
			showMessage(ngDialog, "业务流水号不能为空！", function() {});
			return;
		}
		if (IsNumOrC($scope.param.tradeCode)) {
			showMessage(ngDialog, "业务流水号只能输入数字与字母！", function() {});
			return;
		}
		if (isBlank($scope.param.comment)) {
			showMessage(ngDialog, "备注不能为空！", function() {});
			return;
		}
		$http.post(url, $scope.param).success(function(data) {
			showMessage(ngDialog, data.msg, function() {
				$scope.closeThisDialog();
				$scope.onSearch();
			});
		})
	}
	if ($scope.openDealParam.orderStatus == 1) {
		$scope.openDealParam.orderStatusName = "待支付-待确认";
	}
	if ($scope.openDealParam.orderStatus == 2) {
		$scope.openDealParam.orderStatusName = "待支付 - 已确认";
	}
	if ($scope.openDealParam.orderStatus == 3) {
		$scope.openDealParam.orderStatusName = "已取消";
	}
	if ($scope.openDealParam.orderStatus == 4) {
		$scope.openDealParam.orderStatusName = "已支付 - 已确认";
	}
	if ($scope.openDealParam.orderStatus == 5) {
		$scope.openDealParam.orderStatusName = "交易关闭 - 等待退款";
	}
	if ($scope.openDealParam.orderStatus == 6) {
		$scope.openDealParam.orderStatusName = "交易关闭 - 仲裁退款中";
	}
	if ($scope.openDealParam.orderStatus == 7) {
		$scope.openDealParam.orderStatusName = "交易关闭 - 退款成功";
	}
	if ($scope.openDealParam.orderStatus == 8) {
		$scope.openDealParam.orderStatusName = "交易成功 - 仲裁退款成功";
	}
	if ($scope.openDealParam.orderStatus == 9) {
		$scope.openDealParam.orderStatusName = "交易关闭 - 仲裁退款成功";
	}
	if ($scope.openDealParam.orderStatus == 10) {
		$scope.openDealParam.orderStatusName = "交易成功 - 仲裁退款拒绝";
	}
})