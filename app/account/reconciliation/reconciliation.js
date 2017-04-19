myApp.controller('reconciliation', function($scope, $rootScope, ngDialog, $timeout, $http, $filter) {
	$scope.showUndeal = 1;
	$scope.showUnchecked = 0;
	$scope.showChecked = 0;
	$scope.param = {};
	$scope.liChangeCheck = function(liClass) {
		$scope.showUndeal = 0;
		$scope.showUnchecked = 0;
		$scope.showChecked = 0;
		if (liClass == "undeal") {
			$scope.showUndeal = 1;
			$scope.onsearchUndeal();
		} else if (liClass == "unchecked") {
			$scope.showUnchecked = 1;
			$scope.onsearchAccounted();
		} else if (liClass == "checked") {
			$scope.showChecked = 1;
			$scope.onSearchNotAccount();
		}
	}

	$scope.onSearch = function() {
		if ($scope.param.startBusinessTime) {
			$scope.param.startBusinessTime = $filter('date')($scope.param.startBusinessTime, 'yyyy-MM-dd');
		}
		if ($scope.param.endBusinessTime) {
			$scope.param.endBusinessTime = $filter('date')($scope.param.endBusinessTime, 'yyyy-MM-dd');
		}
		if ($scope.param.dealStartTime) {
			$scope.param.dealStartTime = $filter('date')($scope.param.dealStartTime, 'yyyy-MM-dd');
		}
		if ($scope.param.dealEndTime) {
			$scope.param.dealEndTime = $filter('date')($scope.param.dealEndTime, 'yyyy-MM-dd');
		}
		if (isBlankTime($scope.param.startBusinessTime, $scope.param.endBusinessTime)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if (isBlankTime($scope.param.dealStartTime, $scope.param.dealEndTime)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if ($scope.showUndeal == 1) {
			$scope.onsearchUndeal();
		} else if ($scope.showUnchecked == 1) {
			$scope.onsearchAccounted();
		} else if ($scope.showChecked == 1) {
			$scope.onSearchNotAccount();
		}
	}

	$scope.onsearchUndeal = function() {
		var undealUrl = ctx + 'account/queryAccountCheckingList.json';
		$scope.param.accountType = 0;
		$scope.param.pageNum = $scope.paginationConfUndeal.currentPage;
		$scope.param.pageSize = $scope.paginationConfUndeal.itemsPerPage;
		$http.post(undealUrl, $scope.param).success(function(data) {
			if (data.accountCheckings != null) {
				$scope.undeals = data.accountCheckings.accountCheckingList;
				for (var i = 0; i < $scope.undeals.length; i++) {
					if ($scope.undeals[i].tradeMethod == "ALIPAY") {
						$scope.undeals[i].tradeMethodName = "支付宝支付";
					}
					if ($scope.undeals[i].tradeMethod == "WXPAY") {
						$scope.undeals[i].tradeMethodName = "微信支付";
					}
					if ($scope.undeals[i].tradeMethod == "UIONPAY") {
						$scope.undeals[i].tradeMethodName = "银联支付";
					}
					if ($scope.undeals[i].tradeMethod == "JDPAY") {
						$scope.undeals[i].tradeMethodName = "京东支付";
					}
					if ($scope.undeals[i].tradeMethod == "OFFLINEPAY") {
						$scope.undeals[i].tradeMethodName = "线下支付";
					}
				}
				$scope.paginationConfUndeal = {
					currentPage: $scope.param.pageNum,
					totalItems: data.accountCheckings.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				}
			} else {
				$scope.undeals = {};
			}
			//			$scope.onsearchAccounted();
		});
	}

	$scope.onsearchAccounted = function() {
		//成功入账
		var accountedUrl = ctx + 'account/queryAccountCheckingList.json';
		$scope.param.accountType = 1;
		$scope.param.pageNum = $scope.paginationConfUnchecked.currentPage;
		$scope.param.pageSize = $scope.paginationConfUnchecked.itemsPerPage;
		$http.post(accountedUrl, $scope.param).success(function(data) {
			if (data.accountCheckings != null) {
				$scope.accounteds = data.accountCheckings.accountCheckingList;
				for (var i = 0; i < $scope.accounteds.length; i++) {
					if ($scope.accounteds[i].tradeMethod == "ALIPAY") {
						$scope.accounteds[i].tradeMethodName = "支付宝支付";
					}
					if ($scope.accounteds[i].tradeMethod == "WXPAY") {
						$scope.accounteds[i].tradeMethodName = "微信支付";
					}
					if ($scope.accounteds[i].tradeMethod == "UIONPAY") {
						$scope.accounteds[i].tradeMethodName = "银联支付";
					}
					if ($scope.accounteds[i].tradeMethod == "JDPAY") {
						$scope.accounteds[i].tradeMethodName = "京东支付";
					}
					if ($scope.accounteds[i].tradeMethod == "OFFLINEPAY") {
						$scope.accounteds[i].tradeMethodName = "线下支付";
					}
				}
				$scope.paginationConfUnchecked = {
					currentPage: $scope.param.pageNum,
					totalItems: data.accountCheckings.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				}
			} else {
				$scope.accounteds = {};
			}
			//			$scope.onSearchNotAccount();
		});
	}

	$scope.onSearchNotAccount = function() {
		//对账不平参数
		var notAccountUrl = ctx + 'account/queryAccountCheckingList.json';
		$scope.param.accountType = 2;
		$scope.param.pageNum = $scope.paginationConfChecked.currentPage;
		$scope.param.pageSize = $scope.paginationConfChecked.itemsPerPage;
		$http.post(notAccountUrl, $scope.param).success(function(data) {
			if (data.accountCheckings != null) {
				$scope.notAccounteds = data.accountCheckings.accountCheckingList;
				for (var i = 0; i < $scope.notAccounteds.length; i++) {
					if ($scope.notAccounteds[i].tradeMethod == "ALIPAY") {
						$scope.notAccounteds[i].tradeMethodName = "支付宝支付";
					}
					if ($scope.notAccounteds[i].tradeMethod == "WXPAY") {
						$scope.notAccounteds[i].tradeMethodName = "微信支付";
					}
					if ($scope.notAccounteds[i].tradeMethod == "UIONPAY") {
						$scope.notAccounteds[i].tradeMethodName = "银联支付";
					}
					if ($scope.notAccounteds[i].tradeMethod == "JDPAY") {
						$scope.notAccounteds[i].tradeMethodName = "京东支付";
					}
					if ($scope.notAccounteds[i].tradeMethod == "OFFLINEPAY") {
						$scope.notAccounteds[i].tradeMethodName = "线下支付";
					}
				}
				$scope.paginationConfChecked = {
					currentPage: $scope.param.pageNum,
					totalItems: data.accountCheckings.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				}
			} else {
				$scope.notAccounteds = {};
			}
		});
	}

	$scope.paginationConfUndeal = {
		currentPage: 1,
		totalItems: 0,
		itemsPerPage: 10,
		pagesLength: 8,
		perPageOptions: [10, 20, 30, 40, 50],
		onChange: function() {}
	};

	$scope.paginationConfUnchecked = {
		currentPage: 1,
		totalItems: 0,
		itemsPerPage: 10,
		pagesLength: 8,
		perPageOptions: [10, 20, 30, 40, 50],
		onChange: function() {}
	};

	$scope.paginationConfChecked = {
		currentPage: 1,
		totalItems: 0,
		itemsPerPage: 10,
		pagesLength: 8,
		perPageOptions: [10, 20, 30, 40, 50],
		onChange: function() {}
	};
	$scope.deal = function(tradeTime, outTradeNo, orderCode, tradeMethod, tradeMethodName, tradeAmount, invoiceId, businessType, outTradeNo) {
		$scope.toDealParam = {};
		$scope.toDealParam.tradeTime = tradeTime;
		$scope.toDealParam.outTradeNo = outTradeNo;
		$scope.toDealParam.orderCode = orderCode;
		$scope.toDealParam.tradeMethod = tradeMethod;
		$scope.toDealParam.tradeMethodName = tradeMethodName;
		$scope.toDealParam.tradeAmount = tradeAmount;
		$scope.toDealParam.invoiceId = invoiceId;
		$scope.toDealParam.businessType = businessType;
		$scope.toDealParam.outTradeNo = outTradeNo;
		ngDialog.open({
			template: 'app/account/reconciliation/reconciliationDeal.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	$scope.toUnfairDeal = function(tradeTime, outTradeNo, orderCode, tradeMethod, tradeMethodName, tradeAmount, invoiceId, businessType, outTradeNo, checkStatus) {
		$scope.toUnfairDealParam = {};
		$scope.toUnfairDealParam.tradeTime = tradeTime;
		$scope.toUnfairDealParam.outTradeNo = outTradeNo;
		$scope.toUnfairDealParam.orderCode = orderCode;
		$scope.toUnfairDealParam.tradeMethod = tradeMethod;
		$scope.toUnfairDealParam.tradeMethodName = tradeMethodName;
		$scope.toUnfairDealParam.tradeAmount = tradeAmount;
		$scope.toUnfairDealParam.invoiceId = invoiceId;
		$scope.toUnfairDealParam.businessType = businessType;
		$scope.toUnfairDealParam.outTradeNo = outTradeNo;
		$scope.toUnfairDealParam.checkStatus = checkStatus;
		ngDialog.open({
			template: 'app/account/reconciliation/reconciliationToUnfairDeal.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	$scope.checkResult = function(outTradeNo, orderCode, tradeTime, businessType, invoiceId) {
		$scope.toResultParam = {};
		$scope.toResultParam.outTradeNo = outTradeNo;
		$scope.toResultParam.orderCode = orderCode;
		$scope.toResultParam.tradeTime = tradeTime;
		$scope.toResultParam.businessType = businessType;
		$scope.toResultParam.invoiceId = invoiceId;
		ngDialog.open({
			template: 'app/account/reconciliation/reconciliationCheckResult.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	$scope.export = function() {
		if ($scope.showUndeal == 1) {
			$scope.param.accountType = 0;
			$scope.param.pageNum = $scope.paginationConfUndeal.currentPage;
			$scope.param.pageSize = $scope.paginationConfUndeal.itemsPerPage;
		} else if ($scope.showUnchecked = 1) {
			$scope.param.accountType = 1;
			$scope.param.pageNum = $scope.paginationConfUnchecked.currentPage;
			$scope.param.pageSize = $scope.paginationConfUnchecked.itemsPerPage;
		} else if ($scope.showChecked = 1) {
			$scope.param.accountType = 2;
			$scope.param.pageNum = $scope.paginationConfChecked.currentPage;
			$scope.param.pageSize = $scope.paginationConfChecked.itemsPerPage;
		}
		//		$http.post(url, $scope.param).success(function(data) {
		//		})

		if ($scope.param.startBusinessTime) {
			$scope.sBT = $scope.param.startBusinessTime;
		} else {
			$scope.sBT = "";
		}
		if ($scope.param.endBusinessTime) {
			$scope.eBT = $scope.param.endBusinessTime;
		} else {
			$scope.eBT = "";
		}
		if ($scope.param.businessChannel) {
			$scope.bC = $scope.param.businessChannel;
		} else {
			$scope.bC = "";
		}
		if ($scope.param.orderCode) {
			$scope.oC = $scope.param.orderCode;
		} else {
			$scope.oC = "";
		}
		if ($scope.param.busiSN) {
			$scope.bSN = $scope.param.busiSN;
		} else {
			$scope.bSN = "";
		}

		var url = ctx + 'account/exportAccountCheckingList.json?accountType=' + $scope.param.accountType + "&pageNum=" + $scope.param.pageNum + "&pageSize=" +
			$scope.param.pageSize + "&startBusinessTime=" + $scope.sBT + "&endBusinessTime=" + $scope.eBT +
			"&businessChannel=" + $scope.bC + "&orderCode=" + $scope.oC + "&busiSN=" + $scope.bSN;
		window.open(url);
	}

	$scope.$watch('paginationConfUndeal.currentPage + paginationConfUndeal.itemsPerPage+paginationConfUnchecked.currentPage + paginationConfUnchecked.itemsPerPage+paginationConfChecked.currentPage + paginationConfChecked.itemsPerPage', $scope.onSearch);
})