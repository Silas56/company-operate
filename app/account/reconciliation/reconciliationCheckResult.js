myApp.controller('reconciliationCheckResult', function($scope, $http, ngDialog) {
	var url = ctx + 'account/queryOrderAccountDetail.json?invoiceId=' + $scope.toResultParam.invoiceId + "&businessType=" + $scope.toResultParam.businessType
	$http.get(url).success(function(data) {
		$scope.detailBean = data;
		if($scope.detailBean.checkStatus == 0){
			$scope.detailBean.checkStatusName = '未对账'
		}
		if($scope.detailBean.checkStatus == 1){
			$scope.detailBean.checkStatusName = '对账成功'
		}
		if($scope.detailBean.checkStatus == 2){
			$scope.detailBean.checkStatusName = '对账不平'
		}
		if (data.tradeMethod == "ALIPAY") {
			$scope.detailBean.tradeMethodName = "支付宝支付";
		}
		if (data.tradeMethod == "WXPAY") {
			$scope.detailBean.tradeMethodName = "微信支付";
		}
		if (data.tradeMethod == "UIONPAY") {
			$scope.detailBean.tradeMethodName = "银联支付";
		}
		if (data.tradeMethod == "JDPAY") {
			$scope.detailBean.tradeMethodName = "京东支付";
		}
		if (data.tradeMethod == "OFFLINEPAY") {
			$scope.detailBean.tradeMethodName = "线下支付";
		}
	});
})