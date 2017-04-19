/**
 * Created by dengrunquan on 16/4/18.
 */
myApp.controller('orderStatic', function($scope, $http, $filter, ngDialog) {

	//初始化值
	$scope.timeType = "1";
	$scope.dateShow = false;
	$scope.dateIllegle = false;
	$scope.weightSpan1 = 1;
	$scope.weightSpan3 = 1;
	$scope.weightSpan6 = 1;
	$scope.timeTypeChange = function() {
		if ($scope.timeType == "4") {
			$scope.dateShow = true;
		} else {
			$scope.dateShow = false;
		}
	}

	$scope.shop = {
		"shopType": 1
	};
	$scope.prod = {
		"parentId": 1
	};
	$scope.site = {
		"parentId": 1
	};

	//统计日期
	$scope.currDate = GetDateStr(-1);

	//查询
	$scope.onSearch = function($param) {
		// 默认销量统计
		if ("salcCount" == $param || "channel" == $param || undefined == $param)
		{
			$scope.requeryVolumn();
		}
		if ("shop" == $param)
		{
			$scope.requeryShop();
		}
		if ("product" == $param)
		{
			$scope.requeryProd();
		}
		if ("site" == $param)
		{
			$scope.requerySite()
		}
	};

	//销售统计
	$scope.requeryVolumn = function() {
		//参数
		var param = {
			"timeType": $scope.timeType
		};
		if ($scope.timeType == "4") {
			param.queryStartTime = $filter('date')($scope.queryStartTime, 'yyyy-MM-dd');
			param.queryEndTime = $filter('date')($scope.queryEndTime, 'yyyy-MM-dd');
			if (isBlankTime(param.queryStartTime, param.queryEndTime)) {
				showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
				return;
			}
			if (GetDateDiff(param.queryStartTime, param.queryEndTime) + 1 > 180) {
				showMessage(ngDialog, "查询范围只限定在180天内！", function() {
					$scope.dateIllegle = true;
				});
				return;
			}
			$scope.requeryShop();
			$scope.currDate = param.queryStartTime + "~" + param.queryEndTime;
		} else {
			if ($scope.timeType == "1") {
				$scope.currDate = GetDateStr(-1);
			}
			if ($scope.timeType == "2") {
				var date1 = GetDateStr(-7);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
			if ($scope.timeType == "3") {
				var date1 = GetDateStr(-31);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
		}

		//销售统计
		var url1 = ctx + 'order/queryOrderVolumeAndChannelStatistical.json';
		$http.post(url1, param).success(function(response) {
			if (response.queryOrderVolumeStatisticsList) {
				//销量统计

				$scope.volumeCount1 = response.volumeCount;
				$scope.priceSum1 = response.priceSum;
				$scope.labels1 = ['', '自销订单', '', '分销订单', '', ''];
				$scope.series1 = ['销售统计'];
				if (response.queryOrderVolumeStatisticsList[1]) {
					$scope.data1 = [
						['', response.queryOrderVolumeStatisticsList[1].countOrder, '', response.queryOrderVolumeStatisticsList[0].countOrder, '', '', ]
					];
				} else {
					$scope.data1 = [
						['', response.queryOrderVolumeStatisticsList[0].countOrder, '', '', '', '', ]
					];
				}

				//渠道
				$scope.labels2 = ["自销", "分销"];
				if (response.queryOrderVolumeStatisticsList[1]) {
					$scope.data2 = [response.queryOrderVolumeStatisticsList[1].priceOrder, response.queryOrderVolumeStatisticsList[0].priceOrder];
				} else {
					$scope.data2 = [response.queryOrderVolumeStatisticsList[0].priceOrder, ''];
				}

			} else {
				$scope.volumeCount1 = 0;
				$scope.priceSum1 = 0;
				$scope.labels1 = [];
				$scope.series1 = [];
				$scope.data1 = [
					[]
				];
				//渠道
				$scope.labels2 = [];
				$scope.data2 = [];
			}
		});
	}



	//店铺
	$scope.requeryShop = function(orderField, num) {
		//参数
		if (num == 1) {
			$scope.weightSpan1 = 1;
			$scope.weightSpan2 = 0;
		}
		if (num == 2) {
			$scope.weightSpan1 = 0;
			$scope.weightSpan2 = 1;
		}
		var param = {
			"timeType": $scope.timeType
		};
		if ($scope.timeType == "4") {
			if (isBlankTime(param.queryStartTime, param.queryEndTime)) {
				showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
				return;
			}
			param.queryStartTime = $filter('date')($scope.queryStartTime, 'yyyy-MM-dd');
			param.queryEndTime = $filter('date')($scope.queryEndTime, 'yyyy-MM-dd');
			if (GetDateDiff(param.queryStartTime, param.queryEndTime) + 1 > 180) {
				showMessage(ngDialog, "查询范围只限定在180天内！", function() {
					$scope.dateIllegle = true;
				});
				return;
			}
			$scope.requeryProd();
			$scope.currDate = param.queryStartTime + "~" + param.queryEndTime;
		} else {
			if ($scope.timeType == "1") {
				$scope.currDate = GetDateStr(-1);
			}
			if ($scope.timeType == "2") {
				var date1 = GetDateStr(-7);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
			if ($scope.timeType == "3") {
				var date1 = GetDateStr(-31);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
		}

		if (orderField == null) {
			orderField = "volumeCount";
		}
		param.shopType = $scope.shop.shopType;

		param.orderField = orderField;
		param.orderValue = "desc";

		var url = ctx + 'order/queryOrderShopStatistical.json';
		$http.post(url, param).success(function(response) {
			$scope.labels3 = [];
			$scope.series3 = ['店铺'];
			$scope.data3 = [];
			if (response.queryOrderShopStatisticsList) {
				var sdata = [];
				for (var i = 0; i < response.queryOrderShopStatisticsList.length; i++) {
					$scope.labels3[i] = response.queryOrderShopStatisticsList[i].shopName;
					if (orderField == 'volumeCount') {
						sdata[i] = response.queryOrderShopStatisticsList[i].volumeCount;
					} else {
						sdata[i] = response.queryOrderShopStatisticsList[i].priceSum;
					}
				}
				$scope.data3[0] = sdata;
			}
		});
	};

	//产品
	$scope.requeryProd = function(orderField, num) {
		//参数
		if (num == 3) {
			$scope.weightSpan3 = 1;
			$scope.weightSpan4 = 0;
			$scope.weightSpan5 = 0;
		}
		if (num == 4) {
			$scope.weightSpan3 = 0;
			$scope.weightSpan4 = 1;
			$scope.weightSpan5 = 0;
		}
		if (num == 5) {
			$scope.weightSpan3 = 0;
			$scope.weightSpan4 = 0;
			$scope.weightSpan5 = 1;
		}
		var param = {
			"timeType": $scope.timeType
		};
		if ($scope.timeType == "4") {
			if (isBlankTime(param.queryStartTime, param.queryEndTime)) {
				showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
				return;
			}
			param.queryStartTime = $filter('date')($scope.queryStartTime, 'yyyy-MM-dd');
			param.queryEndTime = $filter('date')($scope.queryEndTime, 'yyyy-MM-dd');
			if (GetDateDiff(param.queryStartTime, param.queryEndTime) + 1 > 180) {
				showMessage(ngDialog, "查询范围只限定在180天内！", function() {
					$scope.dateIllegle = true;
				});
				return;
			}
			$scope.requerySite();
			$scope.currDate = param.queryStartTime + "~" + param.queryEndTime;
		} else {
			if ($scope.timeType == "1") {
				$scope.currDate = GetDateStr(-1);
			}
			if ($scope.timeType == "2") {
				var date1 = GetDateStr(-7);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
			if ($scope.timeType == "3") {
				var date1 = GetDateStr(-31);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
		}

		if (orderField == null) {
			orderField = "volumeCount";
		}
		param.parentId = $scope.prod.parentId;

		param.orderField = orderField;
		param.orderValue = "desc";

		console.info(param);
		var url = ctx + 'order/queryOrderProductStatistical.json';
		$http.post(url, param).success(function(response) {
			$scope.labels4 = [];
			$scope.series4 = ['产品'];
			$scope.data4 = [];
			if (response.queryOrderProductStatistics) {
				var sdata = [];
				for (var i = 0; i < response.queryOrderProductStatistics.length; i++) {
					var prodName = response.queryOrderProductStatistics[i].productName;
					if (prodName.length > 10) {
						$scope.labels4[i] = prodName.substring(0, 10);
					} else {
						$scope.labels4[i] = prodName;
					}
					if (orderField == 'volumeCount') {
						sdata[i] = response.queryOrderProductStatistics[i].volumeCount;
					} else if (orderField == 'priceSum') {
						sdata[i] = response.queryOrderProductStatistics[i].priceSum;
					} else {
						sdata[i] = response.queryOrderProductStatistics[i].joinerCount;
					}
				}
				$scope.data4[0] = sdata;
			}
		});

	};

	//目的地
	$scope.requerySite = function(orderField, num) {
		//参数
		if (num == 6) {
			$scope.weightSpan6 = 1;
			$scope.weightSpan7 = 0;
			$scope.weightSpan8 = 0;
		}
		if (num == 7) {
			$scope.weightSpan6 = 0;
			$scope.weightSpan7 = 1;
			$scope.weightSpan8 = 0;
		}
		if (num == 8) {
			$scope.weightSpan6 = 0;
			$scope.weightSpan7 = 0;
			$scope.weightSpan8 = 1;
		}
		var param = {
			"timeType": $scope.timeType
		};
		if ($scope.timeType == "4") {
			if (isBlankTime(param.queryStartTime, param.queryEndTime)) {
				showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
				return;
			}
			param.queryStartTime = $filter('date')($scope.queryStartTime, 'yyyy-MM-dd');
			param.queryEndTime = $filter('date')($scope.queryEndTime, 'yyyy-MM-dd');
			if (GetDateDiff(param.queryStartTime, param.queryEndTime) + 1 > 180) {
				showMessage(ngDialog, "查询范围只限定在180天内！", function() {
					$scope.dateIllegle = true;
				});
				return;
			}
			$scope.currDate = param.queryStartTime + "~" + param.queryEndTime;
		} else {
			if ($scope.timeType == "1") {
				$scope.currDate = GetDateStr(-1);
			}
			if ($scope.timeType == "2") {
				var date1 = GetDateStr(-7);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
			if ($scope.timeType == "3") {
				var date1 = GetDateStr(-31);
				var date2 = GetDateStr(-1);
				$scope.currDate = date1 + "~" + date2;
			}
		}

		if (orderField == null) {
			orderField = "volumeCount";
		}
		param.parentId = $scope.site.parentId;

		param.orderField = orderField;
		param.orderValue = "desc";

		console.info(param);

		var url = ctx + 'order/queryOrderSiteStatistical.json';
		$http.post(url, param).success(function(response) {
			$scope.labels5 = [];
			$scope.series5 = ['目的地'];
			$scope.data5 = [];
			if (response.queryOrderSiteStatistics) {
				var sdata = [];
				for (var i = 0; i < response.queryOrderSiteStatistics.length; i++) {
					$scope.labels5[i] = response.queryOrderSiteStatistics[i].siteName;
					if (orderField == 'volumeCount') {
						sdata[i] = response.queryOrderSiteStatistics[i].volumeCount;
					} else if (orderField == 'priceSum') {
						sdata[i] = response.queryOrderSiteStatistics[i].priceSum;
					} else {
						sdata[i] = response.queryOrderSiteStatistics[i].joinerCount;
					}
				}
				$scope.data5[0] = sdata;
			}
		});
	};
	$scope.onSearch();

	function GetDateDiff(startDate, endDate) {
		var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
		var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
		var dates = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24);
		return dates;
	}
});