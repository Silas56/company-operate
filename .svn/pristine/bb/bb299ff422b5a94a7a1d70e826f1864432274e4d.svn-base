myApp.controller('withdrawals', function($scope, $rootScope, ngDialog, $timeout, $http, $filter) {
	$scope.showUndeal = 1;
	$scope.showDeal = 0;
	$scope.param = {};
	$scope.param.refundType = 0;
	$scope.liChangeCheck = function(liClass) {
		$scope.showUndeal = 0;
		$scope.showDeal = 0;
		if (liClass == "undeal") {
			$scope.showUndeal = 1;
			$scope.onSearch2();

		} else if (liClass == "deal") {
			$scope.showDeal = 1;
			$scope.onSearch1();
		}
	}

	//分页初始化
	$scope.paginationConfUndeal = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.paginationConfdeal = {
		itemsPerPage: 10,
		currentPage: 1
	};

	$scope.onSearch = function() {
		if ($scope.param.startApplyDate) {
			$scope.param.startApplyDate = $filter('date')($scope.param.startApplyDate, 'yyyy-MM-dd');
		}
		if ($scope.param.endApplyDate) {
			$scope.param.endApplyDate = $filter('date')($scope.param.endApplyDate, 'yyyy-MM-dd');
		}
		if (isBlankTime($scope.param.startApplyDate,$scope.param.endApplyDate)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if(isBlank($scope.param.payMethod)){
			$scope.param.payMethod = "all";
		}
		if ($scope.showUndeal == 1) {
			$scope.onSearch2();

		} else if ($scope.showDeal == 1) {
			$scope.onSearch1();
		}
	}

	$scope.onSearch1 = function() {
		if ($scope.showUndeal == 1) {
			$scope.param.status = 2;
		} else {
			$scope.param.status = 1;
		}
		var url = ctx + 'account/queryRefundList.json'
		$scope.param.pageNum = $scope.paginationConfUndeal.currentPage;
		$scope.param.pageSize = $scope.paginationConfUndeal.itemsPerPage;
		$http.post(url, $scope.param).success(function(data) {
			console.info(data);
			if ($scope.showUndeal == 1) {
				$scope.undeals = data.refundsPageInfo.refunds;
				$scope.paginationConfUndeal = {
					currentPage: $scope.param.pageNum,
					totalItems: data.refundsPageInfo.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			} else {
				$scope.deals = data.refundsPageInfo.refunds;
				$scope.paginationConfdeal = {
					currentPage: $scope.param.pageNum,
					totalItems: data.refundsPageInfo.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			}
			for (var i = 0; i < data.refundsPageInfo.refunds.length; i++) {
				var dataStatus = data.refundsPageInfo.refunds[i]
				if (dataStatus.payMethod == 0) {
					dataStatus.payMethodName = "未知";
				}
				if (dataStatus.payMethod == "ALIPAY") {
					dataStatus.payMethodName = "支付宝";
				}
				if (dataStatus.payMethod == "WXPAY") {
					dataStatus.payMethodName = "微信";
				}
				if (dataStatus.refundType == 1) {
					dataStatus.refundTypeName = "商家退款";
				}
				if (dataStatus.refundType == 2) {
					dataStatus.refundTypeName = "仲裁退款";
				}
				if (dataStatus.orderStatus == 0) {
					dataStatus.orderStatusName = "未知";
				}
				if (dataStatus.orderStatus == 1) {
					dataStatus.orderStatusName = "待支付-待确认";
				}
				if (dataStatus.orderStatus == 2) {
					dataStatus.orderStatusName = "待支付 - 已确认";
				}
				if (dataStatus.orderStatus == 3) {
					dataStatus.orderStatusName = "已取消";
				}
				if (dataStatus.orderStatus == 4) {
					dataStatus.orderStatusName = "已支付 - 已确认";
				}
				if (dataStatus.orderStatus == 5) {
					dataStatus.orderStatusName = "交易关闭 - 等待退款";
				}
				if (dataStatus.orderStatus == 6) {
					dataStatus.orderStatusName = "交易关闭 - 仲裁退款中";
				}
				if (dataStatus.orderStatus == 7) {
					dataStatus.orderStatusName = "交易关闭 - 退款成功";
				}
				if (dataStatus.orderStatus == 8) {
					dataStatus.orderStatusName = "交易成功 - 仲裁退款成功";
				}
				if (dataStatus.orderStatus == 9) {
					dataStatus.orderStatusName = "交易关闭 - 仲裁退款成功";
				}
				if (dataStatus.orderStatus == 10) {
					dataStatus.orderStatusName = "交易成功 - 仲裁退款拒绝";
				}
			}
		});
	}
	$scope.onSearch2 = function() {
		if ($scope.showUndeal == 1) {
			$scope.param.status = 2;
		} else {
			$scope.param.status = 1;
		}
		var url = ctx + 'account/queryRefundList.json'
		$scope.param.pageNum = $scope.paginationConfdeal.currentPage;
		$scope.param.pageSize = $scope.paginationConfdeal.itemsPerPage;
		$http.post(url, $scope.param).success(function(data) {
			console.info(data);
			if ($scope.showUndeal == 1) {
				$scope.undeals = data.refundsPageInfo.refunds;
				$scope.paginationConfUndeal = {
					currentPage: $scope.param.pageNum,
					totalItems: data.refundsPageInfo.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			} else {
				$scope.deals = data.refundsPageInfo.refunds;
				$scope.paginationConfdeal = {
					currentPage: $scope.param.pageNum,
					totalItems: data.refundsPageInfo.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			}
			for (var i = 0; i < data.refundsPageInfo.refunds.length; i++) {
				var dataStatus = data.refundsPageInfo.refunds[i]
				if (dataStatus.payMethod == 0) {
					dataStatus.payMethodName = "未知";
				}
				if (dataStatus.payMethod == 2) {
					dataStatus.payMethodName = "支付宝";
				}
				if (dataStatus.payMethod == 3) {
					dataStatus.payMethodName = "微信";
				}
				if (dataStatus.refundType == 1) {
					dataStatus.refundTypeName = "商家退款";
				}
				if (dataStatus.refundType == 2) {
					dataStatus.refundTypeName = "仲裁退款";
				}
				if (dataStatus.orderStatus == 0) {
					dataStatus.orderStatusName = "未知";
				}
				if (dataStatus.orderStatus == 1) {
					dataStatus.orderStatusName = "待支付-待确认";
				}
				if (dataStatus.orderStatus == 2) {
					dataStatus.orderStatusName = "待支付 - 已确认";
				}
				if (dataStatus.orderStatus == 3) {
					dataStatus.orderStatusName = "已取消";
				}
				if (dataStatus.orderStatus == 4) {
					dataStatus.orderStatusName = "已支付 - 已确认";
				}
				if (dataStatus.orderStatus == 5) {
					dataStatus.orderStatusName = "交易关闭 - 等待退款";
				}
				if (dataStatus.orderStatus == 6) {
					dataStatus.orderStatusName = "交易关闭 - 仲裁退款中";
				}
				if (dataStatus.orderStatus == 7) {
					dataStatus.orderStatusName = "交易关闭 - 退款成功";
				}
				if (dataStatus.orderStatus == 8) {
					dataStatus.orderStatusName = "交易成功 - 仲裁退款成功";
				}
				if (dataStatus.orderStatus == 9) {
					dataStatus.orderStatusName = "交易关闭 - 仲裁退款成功";
				}
				if (dataStatus.orderStatus == 10) {
					dataStatus.orderStatusName = "交易成功 - 仲裁退款拒绝";
				}
			}
		});
	}

	$scope.openDeal = function(orderCode, applicant, applyTime, refundAmount, orderStatus, refundType, operator, payMethod, serialNum, paymentCode) {
		$scope.openDealParam = {};
		$scope.openDealParam.orderCode = orderCode;
		$scope.openDealParam.applicant = applicant;
		$scope.openDealParam.applyTime = applyTime;
		$scope.openDealParam.refundAmount = refundAmount;
		$scope.openDealParam.orderStatus = orderStatus;
		$scope.openDealParam.refundType = refundType;
		$scope.openDealParam.operator = operator;
		$scope.openDealParam.payMethod = payMethod;
		$scope.openDealParam.serialNum = serialNum;
		$scope.openDealParam.paymentCode = paymentCode;
		ngDialog.open({
			template: 'app/account/withdrawals/withdrawalsDeal.html',
			scope: $scope,
			closeByDocument:false
		});
	}

	$scope.checkResult = function(orderCode, applicant, applyTime, refundAmount, orderStatusName, refundType, operator, payMethodName, serialNum,comment) {
		$scope.checkResultParam = {};
		$scope.checkResultParam.orderCode = orderCode;
		$scope.checkResultParam.applicant = applicant;
		$scope.checkResultParam.applyTime = applyTime;
		$scope.checkResultParam.refundAmount = refundAmount;
		$scope.checkResultParam.orderStatusName = orderStatusName;
		$scope.checkResultParam.refundType = refundType;
		$scope.checkResultParam.operator = operator;
		$scope.checkResultParam.payMethodName = payMethodName;
		$scope.checkResultParam.serialNum = serialNum;
		$scope.checkResultParam.comment = comment;
		ngDialog.open({
			template: 'app/account/withdrawals/withdrawalsResult.html',
			scope: $scope,
			closeByDocument:false
		});
	}
	$scope.$watch('paginationConfUndeal.currentPage + paginationConfUndeal.itemsPerPage', $scope.onSearch1);
	$scope.$watch('paginationConfdeal.currentPage + paginationConfdeal.itemsPerPage', $scope.onSearch2);
})