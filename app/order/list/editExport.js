myApp.controller('exportEdit', function($scope, $http, ngDialog) {
	var yearsArr = [];
	var startYear= 2016;//起始年份 
	var endYear=new Date().getFullYear();//结束年份 
	for (var i=startYear;i<=endYear;i++) {
		yearsArr.push(i);
	}
	var checkCache = {};

	$scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
	$scope.selectedMonths = 1;
	$scope.years = yearsArr;
	$scope.selectedYears = endYear;

	$scope.yChange = function() {
		$scope.selectedYears = $scope.selectedYears;
		$scope.checkData();
	}

	$scope.mChange = function() {
		$scope.selectedMonths = $scope.selectedMonths;
		$scope.checkData();
	}

	//检测选择时间范围是否有数据
	$scope.checkData = function() {

		if ($scope.selectedYears && $scope.selectedMonths) {
			$scope.oET = $scope.oST = $scope.selectedYears+ '-' + $scope.selectedMonths;
		} else {
			$scope.oET =  $scope.oST = "";
		}

		var checkDataUrl1 = ctx + 'order/checkOrderList.json?orderStartTime=' + $scope.oST + "&orderEndTime=" + $scope.oET;
		if(checkCache[$scope.oET]) {
			$scope.code = checkCache[$scope.oET];
		}else {
			$http.get(checkDataUrl1).success(function(data) {
				checkCache[$scope.oET] = data.code;
				$scope.code = data.code;
			});
		}
	}
	$scope.checkData();

	//导出
	$scope.export = function() {
		var url = ctx + 'order/exportOrderList.json?orderStartTime=' + $scope.oST + "&orderEndTime=" + $scope.oET;
		window.open(url);
	}

});