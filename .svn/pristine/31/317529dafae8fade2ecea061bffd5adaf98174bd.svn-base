/**
 * Created by dengrunquan on 16/4/19.
 */
myApp.controller('orderView', function($scope, $http, $routeParams, ngDialog) {
	$scope.hasArbitrateAmount = true;
	$scope.hasRefundMoney1 = true;
	$scope.hasRefundMoney2 = true;
	$scope.hasSellerRefundMemo = true;
	$scope.hasArbitrationRefundMemo = true;
	//returnUrl
	if ($routeParams.returnUrl == 'list') {
		$scope.returnUrl = 'order/list';
	} else if ($routeParams.returnUrl == 'organ') {
		$scope.returnUrl = 'order/organ';
	} else if($routeParams.returnUrl == 'account'){
		$scope.returnUrl = 'account/withdrawals';
	}
	if($routeParams.distributionType == 1){
		$scope.showDevide = true;
	}

	//订单信息
	$scope.order = {};
	$scope.productType = null;//产品类型
	$scope.validTimeTit = null;//根据产品类型定义的日期
	var url = ctx + 'order/queryOperateOrderDetails.json?orderCode=' + $routeParams.orderCode + '&orderStatus=' + $routeParams.orderStatus;
	$http.get(url).success(function(response) {
		console.info(response);
		$scope.order = response;
        $scope.productType = $scope.order.operateOrderProductInfoList[0].productType;//获取产品类型

        if( $scope.productType == 1 ){
            //线路
            $scope.validTimeTit = '出行日期';
        }else if( $scope.productType == 3 ){
			//门票
			$scope.validTimeTit = '入住日期';
		}else{
            $scope.validTimeTit = '使用日期';
		}

		if((isBlank($scope.order.operateOrderRefundInfo.arbitrateAmount) || $scope.order.operateOrderRefundInfo.arbitrateAmount == 'null') && $scope.order.operateOrderRefundInfo.arbitrateAmount !=0) {
			$scope.hasArbitrateAmount = false;
			$scope.hasRefundMoney1 = false;
		}if($scope.order.operateOrderRefundInfo.arbitrateAmount == "null"){
			$scope.order.operateOrderRefundInfo.arbitrateAmount = "";
			$scope.hasRefundMoney1 = false;
		}if($scope.order.operateOrderRefundInfo.refundAmount == "null"){
			$scope.order.operateOrderRefundInfo.refundAmount = "";
			$scope.hasRefundMoney2 = false;
		}
		if(isBlank($scope.order.operateOrderRefundInfo.sellerRefundMemo)){
			$scope.hasSellerRefundMemo = false;
		}
		if(isBlank($scope.order.operateOrderRefundInfo.arbitrationRefundMemo)){
			$scope.hasArbitrationRefundMemo = false;
		}
		if($scope.order.orderStatus == 8){
			if($scope.order.operateOrderRefundInfo.refundStatus == 0){
				$scope.order.orderStatusName = "交易成功";
			}else if($scope.order.operateOrderRefundInfo.refundStatus == 1){
				$scope.order.orderStatusName = "交易成功仲裁退款中";
			}else if($scope.order.operateOrderRefundInfo.refundStatus == 2){
				$scope.order.orderStatusName = "交易成功仲裁退款拒绝";
			}else if($scope.order.operateOrderRefundInfo.refundStatus == 3){
				$scope.order.orderStatusName = "交易成功仲裁取消";
			}else if($scope.order.operateOrderRefundInfo.refundStatus == 4){
				$scope.order.orderStatusName = "交易成功退款成功";
			}
		}
		if (!isBlank($scope.order.operateOrderSerialInfo)) {
			for (var i = 0; i < $scope.order.operateOrderSerialInfo.length; i++) {
				var orderBean = $scope.order.operateOrderSerialInfo[i];
				if (orderBean.payStatus == 0) {
					orderBean.statusName = "未知";
				} else if (orderBean.payStatus == 1) {
					orderBean.statusName = "完成";
				} else if (orderBean.payStatus == 2) {
					orderBean.statusName = "未完成";
				} else {
					orderBean.statusName = orderBean.payStatus;
				}
			}
		}
		if (!isBlank($scope.order.operateOrderRefundArbitrationList)) {
			for (var i = 0; i < $scope.order.operateOrderRefundArbitrationList.length; i++) {
				var refundBean = $scope.order.operateOrderRefundArbitrationList[i];
				if (refundBean.payStatus == 0) {
					refundBean.statusName = "未知";
				} else if (refundBean.payStatus == 1) {
					refundBean.statusName = "完成";
				} else if (refundBean.payStatus == 2) {
					refundBean.statusName = "未完成";
				} else {
					refundBean.statusName = refundBean.payStatus;
				}
			}
		}
		if(!isBlank($scope.order.operateOrderOtherInfo.commissionSettledStatus)){
			if($scope.order.operateOrderOtherInfo.commissionSettledStatus == 0){
				$scope.order.operateOrderOtherInfo.commissionSettledStatus = "未知"
			}
			if($scope.order.operateOrderOtherInfo.commissionSettledStatus == 1){
				$scope.order.operateOrderOtherInfo.commissionSettledStatus = "未分佣"
			}
			if($scope.order.operateOrderOtherInfo.commissionSettledStatus == 2){
				$scope.order.operateOrderOtherInfo.commissionSettledStatus = "已分佣"
			}
		}
	});

	/* 根据产品类型来定义出行日期标题 */
	$scope.fiterGoTime = function(){

	}

	/**
	//交易记录
	$scope.record = {};
	var url = ctx+'order/queryOrderBusinessLog.json?orderCode='+$routeParams.orderCode
	$http.get(url).success(function(response){
	    console.info(response);
	    $scope.record = response;
	});
    
	//操作日志
	$scope.note = {};
	var url = ctx+'order/queryOrderOperationLog.json?orderCode='+$routeParams.orderCode
	$http.get(url).success(function(response){
	    console.info(response);
	    $scope.note = response;
	});
	 **/

});