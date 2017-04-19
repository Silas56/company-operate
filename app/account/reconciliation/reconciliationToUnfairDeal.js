myApp.controller('reconciliationToUnfairDeal', function($scope, $http, ngDialog) {
	$scope.param = {};
	$scope.channelSelectParam = {};
	$scope.amountInputParam = {};
	$scope.channelHide = false;
	$scope.channelShow = true;
	$scope.amountHide = false;
	$scope.amountShow = true;
	$scope.param.fee = "0.00";
	$scope.param.tradeAmount = $scope.toUnfairDealParam.tradeAmount;
	$scope.amountInputParam.inputValue = $scope.toUnfairDealParam.tradeAmount;
	$scope.param.tradeMethod = $scope.toUnfairDealParam.tradeMethod;
	$scope.tradeMethod = $scope.toUnfairDealParam.tradeMethod;
	$scope.changeDivHide = function(value, isReturn) {
		if (value == 'channel') {
			if (isReturn == 0) {} else {
				$scope.tradeMethod = $scope.param.tradeMethod;
			}
			$scope.channelHide = !$scope.channelHide;
			$scope.channelShow = !$scope.channelShow;
		}
		if (value == 'amount') {
			var value = $scope.param.tradeAmount;
			var length = $scope.param.tradeAmount.length;
			var first = value.indexOf("."); //判断第一个小数点所在位置
			var last = value.lastIndexOf("."); //判断最后一个小数点所在的位置
			var temp_length = value.split(".").length - 1; //含有.的个数
			if (!isNaN(value) && (temp_length == 1) && (first == last) && (length - last == 1)) {
				$scope.tradeAmount = $scope.param.tradeAmount + "00";
			} else if (!isNaN(value) && (temp_length == 1) && (first == last) && (length - last == 2)) {
				$scope.tradeAmount = $scope.param.tradeAmount + "0";
			}
			$scope.amountHide = !$scope.amountHide;
			$scope.amountShow = !$scope.amountShow;
		}
	}

	$scope.channelSure = function() {
		if ($scope.tradeMethod == "ALIPAY") {
			$scope.param.tradeMethod = "ALIPAY";
			$scope.toUnfairDealParam.tradeMethodName = "支付宝支付";
		}
		if ($scope.tradeMethod == "WXPAY") {
			$scope.param.tradeMethod = "WXPAY";
			$scope.toUnfairDealParam.tradeMethodName = "微信支付";
		}
		if ($scope.tradeMethod == "UIONPAY") {
			$scope.param.tradeMethod = "UIONPAY";
			$scope.toUnfairDealParam.tradeMethodName = "银联支付";
		}
		if ($scope.tradeMethod == "JDPAY") {
			$scope.param.tradeMethod = "JDPAY";
			$scope.toUnfairDealParam.tradeMethodName = "京东支付";
		}
		if ($scope.tradeMethod == "OFFLINEPAY") {
			$scope.param.tradeMethod = "OFFLINEPAY";
			$scope.toUnfairDealParam.tradeMethodName = "线下支付";
		}
		$scope.channelHide = !$scope.channelHide;
		$scope.channelShow = !$scope.channelShow;
	}

	$scope.amountSure = function() {
		if (IsNum($scope.param.tradeAmount)) {
			showMessage(ngDialog, "交易金额只能填写数字！", function() {});
			return;
		}
		var value = $scope.tradeAmount
		var length = $scope.tradeAmount.length;
		var first = value.indexOf("."); //判断第一个小数点所在位置
		var last = value.lastIndexOf("."); //判断最后一个小数点所在的位置
		var temp_length = value.split(".").length - 1; //含有.的个数
		if (temp_length != 0) {
			if (!isNaN(value) && (temp_length == 1 || temp_length == 0) && (first == last) && (length - last <= 3)) {} else {
				showMessage(ngDialog, "交易金额只能保留两位小数！", function() {});
				return;
			}
		}
		$scope.amountInputParam.inputValue = $scope.tradeAmount;
		$scope.param.tradeAmount = $scope.tradeAmount;
		$scope.amountHide = !$scope.amountHide;
		$scope.amountShow = !$scope.amountShow;
	}

	$scope.submit = function() {
		var url = ctx + 'account/reconciliation.json';
		$scope.param.invoiceId = $scope.toUnfairDealParam.invoiceId;
		$scope.param.businessType = $scope.toUnfairDealParam.businessType;
		$scope.param.outTradeNo = $scope.toUnfairDealParam.outTradeNo;
		$scope.param.checkStatus = 1;
		if ($scope.param.fee == "0.00") {
			$scope.param.fee = 0;
		}
		if (isBlank($scope.param.tradeAmount)) {
			showMessage(ngDialog, "交易金额不能为空！", function() {});
			return;
		}
		if (IsNum($scope.param.fee)) {
			showMessage(ngDialog, "手续费只能填数字！", function() {});
			return;
		}
		var value = $scope.param.fee
		var length = $scope.param.fee.length;
		if (!isBlank(length)) {
			var first = value.indexOf("."); //判断第一个小数点所在位置
			var last = value.lastIndexOf("."); //判断最后一个小数点所在的位置
			var temp_length = value.split(".").length - 1; //含有.的个数
			if (temp_length != 0) {
				if (!isNaN(value) && (temp_length == 1 || temp_length == 0) && (first == last) && (length - last <= 3)) {} else {
					showMessage(ngDialog, "手续费只能保留两位小数！", function() {});
					return;
				}
			}

		}
		if (isBlank($scope.param.fee) && $scope.param.fee != 0) {
			showMessage(ngDialog, "手续费不能为空！", function() {});
			return;
		}
		if (parseInt($scope.param.tradeAmount) < parseInt($scope.param.fee)) {
			showMessage(ngDialog, "手续费不能大于交易金额！", function() {});
			return;
		}
		$http.post(url, $scope.param).success(function(data) {
			showMessage(ngDialog, data.msg, function() {
				$scope.closeThisDialog();
				$scope.onSearch();
			});
		})
	}
})