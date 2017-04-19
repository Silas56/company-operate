/**
 * Created by dengrunquan on 16/7/6
 */
myApp.controller('clearing', function($scope, $http, $filter, ngDialog) {

	//设置年份的选择 
	var yearsArr = [];
	var startYear= 2016;//起始年份 
	var endYear=new Date().getFullYear();//结束年份 
	for (var i=startYear;i<=endYear;i++) {
		yearsArr.push(i);
	}

	$scope.getDay = function(day){  
       var today = new Date();  
       var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
       today.setTime(targetday_milliseconds);    
       var tYear = today.getFullYear();  
       var tMonth = today.getMonth();  
       var tDate = today.getDate();  
       tMonth = (tMonth + 1).toString().length == 1 ? "0" + (tMonth + 1) : (tMonth + 1);
       tDate =  tDate.toString().length == 1 ? "0" + tDate : tDate;
       return tYear+"."+tMonth+"."+tDate;  
	}  

	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};

	//初始化值
	$scope.dateShow = false;
	$scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
	$scope.selectedMonths = 1;
	$scope.years = yearsArr;
	$scope.selectedYears = endYear;
	$scope.timeRange = $scope.getDay(-3)+'-'+$scope.getDay(-1);

	//查询条件
	$scope.param = {
		'saleType': 0,
		'queryType': 1
	};

	$scope.timeTypeChange = function() {
		if ($scope.param.queryType == "4") {
			$scope.dateShow = true;
			$scope.param.startOrderTime = $scope.selectedYears+'-'+$scope.selectedMonths;
			$scope.param.endOrderTime = $scope.selectedYears+'-'+$scope.selectedMonths;
		} else {
			$scope.dateShow = false;
			$scope.param.startOrderTime = '';
			$scope.param.endOrderTime = '';
		}
	}

	$scope.yChange = function() {
		$scope.param.startOrderTime = $scope.selectedYears+'-'+$scope.selectedMonths;
		$scope.param.endOrderTime = $scope.selectedYears+'-'+$scope.selectedMonths;
	}

	$scope.mChange = function() {
		$scope.param.startOrderTime = $scope.selectedYears+'-'+$scope.selectedMonths;
		$scope.param.endOrderTime = $scope.selectedYears+'-'+$scope.selectedMonths;
	}

	//查询
	$scope.onSearch = function() {

		if ($scope.param.queryType == "1") {
			$scope.timeRange = $scope.getDay(-3)+'-'+$scope.getDay(-1);
		}
		if ($scope.param.queryType == "2") {
			$scope.timeRange = $scope.getDay(-7)+'-'+$scope.getDay(-1);
		}
		if ($scope.param.queryType == "3") {
			$scope.timeRange = $scope.getDay(-30)+'-'+$scope.getDay(-1);
		}
		if ($scope.param.queryType == "4") {
			$scope.timeRange = $scope.selectedYears+'.'+ (($scope.selectedMonths).toString().length == 1 ? '0'+ $scope.selectedMonths : $scope.selectedMonths) +'.01-'+$scope.selectedYears+'.'+ (($scope.selectedMonths).toString().length == 1 ? '0'+ $scope.selectedMonths : $scope.selectedMonths)+'.'+(new Date($scope.selectedYears, $scope.selectedMonths, 0).getDate());
		}

		var url = ctx + 'settlement/queryTransportSettlementList.json';
	
		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;

		$http.post(url, JSON.stringify($scope.param)).success(function(data) {
			$scope.lists = data.page.list;
			$scope.paginationConf = {
				currentPage: $scope.param.pageNum,
				totalItems: data.page.total,
				itemsPerPage: $scope.param.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	};


	/***************************************************************
	         当页码和页面记录数发生变化时监控后台查询
	         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
	         ***************************************************************/
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);
});