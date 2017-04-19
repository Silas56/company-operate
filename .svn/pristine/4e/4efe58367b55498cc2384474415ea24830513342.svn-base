myApp.controller('fundChangeRecord', function($scope, $rootScope, ngDialog, $timeout,$http, $routeParams) {
	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.onSearch = function() {
		var url = ctx + "shop/queryShopTypeLog.json?orgSkeletionCode=" + $routeParams.shopCode + "&pageSize=" + $scope.paginationConf.itemsPerPage + "&pageNum=" + $scope.paginationConf.currentPage;
		$http.get(url).success(function(data) {
			$scope.shopLogs = data.shopLogList;
			$scope.paginationConf = {
				currentPage: $scope.paginationConf.currentPage,
				totalItems: data.total,
				itemsPerPage: $scope.paginationConf.itemsPerPage,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		});
	}
	
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);
})