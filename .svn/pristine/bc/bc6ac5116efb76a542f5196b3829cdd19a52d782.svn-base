/**
 * Created by dengrunquan on 16/4/20.
 */
myApp.controller('orderOrganEdit', function($scope, $http, ngDialog) {

	//console.info($scope.editData);
	//仲裁信息

	//订单信息
	$scope.order = {};
	$scope.organData = {};
	$scope.organData.approveResult = 1;
	$scope.moneyHide = false;
	var url = ctx + 'order/queryOperateOrderDetails.json?orderCode=' + $scope.editData.orderCode + '&orderStatus=' + $scope.editData.orderStatus;
	$http.get(url).success(function(response) {
		if (response.operateOrderRefundInfo) {
			response.operateOrderRefundInfo.refundStatusName = getrefundStatusName(response.operateOrderRefundInfo.refundStatus);
		}
		$scope.order = response;
		$scope.arbitrationOperatorName = response.operateOrderRefundInfo.arbitrationOperatorName;
		if($scope.order.operateOrderRefundInfo.refundReason == 0){
			$scope.order.operateOrderRefundInfo.refundReason = "未知";
		}
		if($scope.order.operateOrderRefundInfo.refundReason == 1){
			$scope.order.operateOrderRefundInfo.refundReason = "填写信息错误";
		}
		if($scope.order.operateOrderRefundInfo.refundReason == 2){
			$scope.order.operateOrderRefundInfo.refundReason = "重复预订";
		}
		if($scope.order.operateOrderRefundInfo.refundReason == 3){
			$scope.order.operateOrderRefundInfo.refundReason = "不想买了";
		}
		if($scope.order.operateOrderRefundInfo.refundReason == 4){
			$scope.order.operateOrderRefundInfo.refundReason = "其他";
		}
	});

	//退款
	$scope.refundOrgan = function() {
		var refundType = $scope.order.operateOrderRefundInfo.refundType;
		//if(refundType && refundType == 2){
		var url = "";
		var param = {};
		if ($scope.editData.ListStatus == 12) {
			url = ctx + "order/arbitrateServiceRefund.json";
			param.refundCode = $scope.editData.refundCode;
		} else if ($scope.editData.ListStatus == 6) {
			url = ctx + "order/arbitrateRefundOrder.json";
			param.orderCode = $scope.editData.orderCode;
		}
		param.refundType = refundType;
		param.refundCode = $scope.editData.refundCode;
		param.arbitrationOperatorName = $scope.arbitrationOperatorName;

		param.approveResult = $scope.organData.approveResult;
		param.arbitrateRefundAmount = $scope.organData.arbitrateRefundAmount;
		if (param.approveResult == 1) {
			param.approveDes = $scope.organData.approveDes;
		} else {
			param.approveDes = $scope.organData.approveDes;
		}

		if ($scope.checkParam()) {
			return;
		}

		$http.post(url, param).success(function(data) {
			if (data.code == 100) {
				showMessage(ngDialog, "操作成功。", function() {
					//提示
					$scope.closeThisDialog();
					$scope.onSearch();
				});
			}
		});
		/**}else{
		    var url = ctx+ "order/arbitrateRefundOrder.json";
		    var param = {};
		    param.orderCode = $scope.editData.orderCode;
		    param.refundType = refundType;

		    param.approveResult = $scope.organData.approveResult;
		    param.arbitrateRefundAmount = $scope.organData.arbitrateRefundAmount;
		    if(param.approveResult == 1){
		        param.approveDes = $scope.organData.approveDes;
		    }else{
		        param.rejectReason = $scope.organData.approveDes;
		    }

		    console.info(param);
		    $http.post(url,param).success(function(data){
		        if(data.code == 100){
		            alert("操作成功");
		            closeThisDialog();
		        }else{
		            alert(data.msg);
		        }
		    });
		}**/

	};

	$scope.checkParam = function() {
		if ($scope.organData.approveResult == 1) {
			if ($scope.organData.approveDes == "" || $scope.organData.approveDes == undefined) {
				showMessage(ngDialog,"仲裁备注不能为空！");
				return true;
			}
		}
	}

	$scope.agreeRefundChange = function(value) {
		if (value == 'agree') {
			$scope.moneyHide = false;
		} else if (value == 'disagree') {
			$scope.moneyHide = true;
		}
	}

});