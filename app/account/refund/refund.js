myApp.controller('refund', function($scope, $http, ngDialog, $filter, $rootScope) {

	//页面切换
	$scope.data = {
		current : 1
	}
	$scope.action={
        setCurrent:function(param){
            $scope.data.current=param;
        },
	}
    //配置分页基本参数
    $scope.paginationConfForShop = {
        itemsPerPage: 10,
        currentPage: 1
    };


//	店铺提现列表
    $scope.paramForShop={};
    $scope.clearShopParams = function(){
        $scope.paramForShop.shopName = "";
        $scope.paramForShop.startTime = "";
        $scope.paramForShop.endTime = "";
        $scope.paramForShop.status = "";
    }
    $scope.searchShopList=function () {
         var url = ctx + 'account/queryMoreShopDrawCashList.json';
        if ($scope.paramForShop.startTime) {
            $scope.paramForShop.startTime = $filter('date')($scope.paramForShop.startTime, 'yyyy-MM-dd');
        }
        if ($scope.paramForShop.endTime) {
            $scope.paramForShop.endTime = $filter('date')($scope.paramForShop.endTime, 'yyyy-MM-dd');
        }
        if (isBlankTime($scope.paramForShop.startTime, $scope.paramForShop.endTime)) {
            showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
            return;
        }
        $scope.paramForShop.shopName = $scope.paramForShop.shopName;
        $scope.paramForShop.startTime = $scope.paramForShop.startTime;
        $scope.paramForShop.endTime = $scope.paramForShop.endTime;
        $scope.paramForShop.status = $scope.paramForShop.status;
        $scope.paramForShop.pageNum = $scope.paginationConfForShop.currentPage;
        $scope.paramForShop.pageSize = $scope.paginationConfForShop.itemsPerPage;
        console.log($scope.paramForShop)
        $http.post(url,$scope.paramForShop).success(function(data){
            console.log(data)
            if(data.code==102){
                $scope.refundForShopLists = data.withDrawRecordPage.withDrawRecordBeans;
                $scope.paginationConfForShop = {
                    currentPage: $scope.paramForShop.pageNum,
                    totalItems: data.withDrawRecordPage.total,
                    itemsPerPage: $scope.paramForShop.pageSize,
                    pagesLength: 8,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function() {}
                };
            } else if(data.code==100){
                $scope.refundForShopLists = data.withDrawRecordPage.withDrawRecordBeans;
                $scope.paginationConfForShop = {
                    currentPage: $scope.paramForShop.pageNum,
                    totalItems: data.withDrawRecordPage.total,
                    itemsPerPage: $scope.paramForShop.pageSize,
                    pagesLength: 8,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function() {}
                };
            }else {
                showMessage(ngDialog,data.msg);
                return;
            }
        }).error(function (err) {
            console.log(err)
        })
    //    clear searchParams
    //     $scope.clearShopParams();


    }
     $scope.$watch('paginationConfForShop.currentPage + paginationConfForShop.itemsPerPage',$scope.searchShopList);
//    部落提现列表
    $scope.paramForTribe={};
    $scope.clearTribeParams = function(){
        $scope.paramForTribe.shopName = "";
        $scope.paramForTribe.startTime = "";
        $scope.paramForTribe.endTime = "";
        $scope.paramForTribe.status = "";
    }
    $scope.paginationConfForTribe = {
        itemsPerPage: 10,
        currentPage: 1
    };
	$scope.searchTribeList =  function () {
        var url = ctx + 'account/queryTribeWithdrawList.json';
        if ($scope.paramForTribe.startTime) {
            $scope.paramForTribe.startTime = $filter('date')($scope.paramForTribe.startTime, 'yyyy-MM-dd');
        }
        if ($scope.paramForTribe.endTime) {
            $scope.paramForTribe.endTime = $filter('date')($scope.paramForTribe.endTime, 'yyyy-MM-dd');
        }
        if (isBlankTime($scope.paramForTribe.startTime, $scope.paramForTribe.endTime)) {
            showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
            return;
        }
        $scope.paramForTribe.shopName = $scope.paramForTribe.shopName;
        $scope.paramForTribe.startTime = $scope.paramForTribe.startTime;
        $scope.paramForTribe.endTime = $scope.paramForTribe.endTime;
        $scope.paramForTribe.status = $scope.paramForTribe.status;
        $scope.paramForTribe.pageNum = $scope.paginationConfForTribe.currentPage;
        $scope.paramForTribe.pageSize = $scope.paginationConfForTribe.itemsPerPage;
        console.log($scope.paramForTribe)
        $http.post(url,$scope.paramForTribe).success(function(data){
            console.log(data,"部落提现列表");
            if(data.code==102){
                $scope.refundForTribeLists = data.withDrawRecordPage.withDrawRecordBeans;
                $scope.paginationConfForTribe = {
                    currentPage: $scope.paramForTribe.pageNum,
                    totalItems: data.withDrawRecordPage.total,
                    itemsPerPage: $scope.paramForTribe.pageSize,
                    pagesLength: 8,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function() {}
                };
            } else if(data.code==100){
                $scope.refundForTribeLists = data.withDrawRecordPage.withDrawRecordBeans;
                $scope.paginationConfForTribe = {
                    currentPage: $scope.paramForTribe.pageNum,
                    totalItems: data.withDrawRecordPage.total,
                    itemsPerPage: $scope.paramForTribe.pageSize,
                    pagesLength: 8,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function() {}
                };
            }else {
                showMessage(ngDialog,data.msg)
            }
        }).error(function (err) {
            console.log(err)
        })
    //    clear search tribeParams
    //     $scope.clearTribeParams();
    }
    $scope.$watch('paginationConfForTribe.currentPage + paginationConfForTribe.itemsPerPage',$scope.searchTribeList);
    //查看店铺详情
    $scope.openShopDetail = function (shopData) {
        $scope.shopDatas = shopData;
        ngDialog.open({
             template: 'app/account/refund/refundFailDetail.html',
            scope: $scope,
            closeByDocument: false
        });
    }
    //查看部落详情
    $scope.openTribeDetail = function (tribeData) {
        $scope.tribeDatas = tribeData;
        ngDialog.open({
             template: 'app/account/refund/refundDetail.html',
            scope: $scope,
            closeByDocument: false
        });
    }
	//	==================end===========================
//	$scope.undeal = true;
	$scope.accounted = true;
	$scope.fail = false;
	$scope.undealpaginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.cashEdpaginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.cashFailpaginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	var url = ctx + 'account/queryMoreShopDrawCashList.json';
	$scope.param = {};
	$scope.undealParam = {};
	$scope.cashedParam = {};
	$scope.cashFailParam = {};
	$scope.onSearch = function() {
		if ($scope.param.startTime) {
			$scope.param.startTime = $filter('date')($scope.param.startTime, 'yyyy-MM-dd');
		}
		if ($scope.param.endTime) {
			$scope.param.endTime = $filter('date')($scope.param.endTime, 'yyyy-MM-dd');
		}
		if (isBlankTime($scope.param.startTime, $scope.param.endTime)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
//		if ($scope.undeal) {
//			$scope.onSearch1();
//		}
		if ($scope.accounted) {
			$scope.onSearch2();
		}
		if ($scope.fail) {
			$scope.onSearch3();
		}
	}
	$scope.onSearch2 = function() {
		$scope.cashedParam.pageNum = $scope.cashEdpaginationConf.currentPage;
		$scope.cashedParam.pageSize = $scope.cashEdpaginationConf.itemsPerPage;
		$scope.cashedParam.shopName = $scope.param.shopName;
		$scope.cashedParam.startTime = $scope.param.startTime;
		$scope.cashedParam.endTime = $scope.param.endTime;
		$scope.cashedParam.channelCode = $scope.param.channelCode;
		$scope.cashedParam.bankTradeNo = $scope.param.bankTradeNo;
		$scope.cashedParam.acceptId = $scope.param.acceptId;
		$scope.cashedParam.status = 4;

		$http.post(url, $scope.cashedParam).success(function(data) {
			console.info(data);
			$scope.casheds = data.withDrawRecordPage.withDrawRecordBeans;
			$scope.cashEdpaginationConf = {
				currentPage: $scope.cashedParam.pageNum,
				totalItems: data.withDrawRecordPage.total,
				itemsPerPage: $scope.cashedParam.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	}

	$scope.onSearch3 = function() {
		$scope.cashFailParam.pageNum = $scope.cashFailpaginationConf.currentPage;
		$scope.cashFailParam.pageSize = $scope.cashFailpaginationConf.itemsPerPage;
		$scope.cashFailParam.shopName = $scope.param.shopName;
		$scope.cashFailParam.startTime = $scope.param.startTime;
		$scope.cashFailParam.endTime = $scope.param.endTime;
		$scope.cashFailParam.channelCode = $scope.param.channelCode;
		$scope.cashFailParam.bankTradeNo = $scope.param.bankTradeNo;
		$scope.cashFailParam.acceptId = $scope.param.acceptId;
		$scope.cashFailParam.status = 3;

		$http.post(url, $scope.cashFailParam).success(function(data) {
			console.info(data);
			$scope.cashFails = data.withDrawRecordPage.withDrawRecordBeans;
			$scope.cashFailpaginationConf = {
				currentPage: $scope.cashFailParam.pageNum,
				totalItems: data.withDrawRecordPage.total,
				itemsPerPage: $scope.cashFailParam.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	}


	$scope.openDetail = function(cardholder, shopName, settledAmt, bankCardName, bankCardNo, channelSource, accountId, remark, applicantName, failOrSuccess, bankTradeNo, counterFee,acceptId) {
		$scope.openDetailParam = {};
		$scope.openDetailParam.cardholder = cardholder;
		$scope.openDetailParam.shopName = shopName;
		$scope.openDetailParam.settledAmt = settledAmt;
		$scope.openDetailParam.bankCardName = bankCardName;
		$scope.openDetailParam.bankCardNo = bankCardNo;
		$scope.openDetailParam.channelSource = channelSource;
		$scope.openDetailParam.accountId = accountId;
		$scope.openDetailParam.remark = remark;
		$scope.openDetailParam.applicantName = applicantName;
		$scope.openDetailParam.failOrSuccess = failOrSuccess;
		$scope.openDetailParam.bankTradeNo = bankTradeNo;
		$scope.openDetailParam.counterFee = counterFee;
		$scope.openDetailParam.acceptId = acceptId;
		ngDialog.open({
			template: 'app/account/refund/refundDetail.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	$scope.openDeal = function(cardholder, shopName, settledAmt, bankCardName, bankCardNo, channelSource, accountId, settledAmt, remark, acceptId, applicantName) {
		$scope.openDealParam = {};
		$scope.openDealParam.cardholder = cardholder;
		$scope.openDealParam.shopName = shopName;
		$scope.openDealParam.settledAmt = settledAmt;
		$scope.openDealParam.bankCardName = bankCardName;
		$scope.openDealParam.bankCardNo = bankCardNo;
		$scope.openDealParam.channelSource = channelSource;
		$scope.openDealParam.accountId = accountId;
		$scope.openDealParam.settledAmt = settledAmt;
		$scope.openDealParam.remark = remark;
		$scope.openDealParam.acceptId = acceptId;
		$scope.openDealParam.applicantName = applicantName;
		ngDialog.open({
			template: 'app/account/refund/refundDeal.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	$scope.changeTab = function(value) {
//		$scope.undeal = false;
		$scope.accounted = false;
		$scope.fail = false;
//		if (value == "undeal") {
//			$scope.undeal = true;
//		}
		if (value == "accounted") {
			$scope.accounted = true;
		}
		if (value == "fail") {
			$scope.fail = true;
		}
		$scope.onSearch();
	}
    $scope.switchStatusString = function(num){
	    if(num == 1){
	        return "未处理"
        }else if(num == 2){
	        return "银行处理中";
        }else if(num == 3){
            return "处理失败";
        }else if(num == 4){
            return "处理成功" ;
        }else{
            return "未知";
        }
    }

	// $scope.$watch('cashEdpaginationConf.currentPage + cashEdpaginationConf.itemsPerPage+cashFailpaginationConf.currentPage + cashFailpaginationConf.itemsPerPage', $scope.onSearch);
})