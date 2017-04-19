/**
 * Created by dengrunquan on 16/4/18
 */
myApp.controller('comment', function($scope, $http, $filter, ngDialog) {


	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.param = {
		'status': 0 //初始化  默认选中"全部"
	};
	$scope.isList = true;

	//查询
	$scope.onSearch = function() {
		var url = ctx + 'order/queryOrderEvaluationComments.json';

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

		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;


		$http.post(url, $scope.param).success(function(data) {
			$scope.comments = data.evaluationComments;
			$scope.paginationConf = {
				currentPage: $scope.param.pageNum,
				totalItems: data.total,
				itemsPerPage: $scope.param.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	};

	$scope.setUnable = function(code){
		$scope.unableCode = code;
		ngDialog.open({
			template: 'app/order/comment/commentUnable.html',
			scope: $scope,
			closeByDocument: false
		});
	}

	/***************************************************************
	         当页码和页面记录数发生变化时监控后台查询
	         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
	         ***************************************************************/
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);
});