myApp.controller('reconciliationDeal', function($scope, $http, ngDialog) {
	$scope.param = {};
	$scope.isShowDiv = false;
	$scope.param.checkStatus = 2;
	$scope.param.fee = "0.00";
	$scope.sureSubmit = function() {
		var url = ctx + 'account/reconciliation.json'
		$scope.param.invoiceId = $scope.toDealParam.invoiceId;
		$scope.param.businessType = $scope.toDealParam.businessType;
		$scope.param.outTradeNo = $scope.toDealParam.outTradeNo;
		$scope.param.tradeAmount = $scope.toDealParam.tradeAmount;
		$scope.param.tradeMethod = $scope.toDealParam.tradeMethod;
		if ($scope.param.checkStatus == 1) {
			if (isBlank($scope.param.fee)) {
				showMessage(ngDialog, "手续费不能为空！", function() {});
				return;
			} else {
				if (IsNum($scope.param.fee)) {
					showMessage(ngDialog, "手续费只能填数字！", function() {});
					return;
				}
				if ($scope.toDealParam.tradeAmount*1 < $scope.param.fee*1) {
					showMessage(ngDialog, "手续费不能大于交易金额！", function() {});
					return;
				}
				var value = $scope.param.fee
				var length = $scope.param.fee.length;
				var first = value.indexOf("."); //判断第一个小数点所在位置
				var last = value.lastIndexOf("."); //判断最后一个小数点所在的位置
				var temp_length = value.split(".").length - 1; //含有.的个数
				if (!isNaN(value) && (temp_length == 1 || temp_length == 0) && (first == last) && (length - last <= 3)) {
				} else {
					showMessage(ngDialog, "手续费只能保留两位小数！", function() {});
					return;
				}
			}
		}
		if($scope.param.fee == "0.00"){
			$scope.param.fee = 0;
		}
		$http.post(url, $scope.param).success(function(data) {
			showMessage(ngDialog, data.msg, function() {
				$scope.closeThisDialog();
				$scope.onSearch();
			});
		});
	}

	$scope.showDiv = function(value) {
		if (value == 1) {
			$scope.isShowDiv = true;
		} else {
			$scope.isShowDiv = false;
		}

	}
})