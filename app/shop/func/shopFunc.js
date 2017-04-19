/**
 * Created by dengrunquan on 16/4/12.
 */
myApp.controller('shopfunc', function($scope, $http, $filter, ngDialog) {
	$scope.param = {};
	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};

	//查询
	$scope.onSearch = function() {

		var url = ctx + 'shop/queryAllShopType.json';
		$http.get(url).success(function(data) {
			$scope.funcInfos = data.allShopTypeList;
			for (var i = 0; i < $scope.funcInfos.length; i++) {
				$scope.funcInfos[i].serviceRate = parseInt($scope.funcInfos[i].serviceRate * 1000) / 10;
			}
		});
	};

	$scope.onSearch();

	$scope.addShopType = function() {
		ngDialog.open({
			template: 'app/shop/func/addShopType.html',
			scope: $scope,
			closeByDocument: false
		});
	};

	$scope.editShopType = function(code) {
		var recordFlag = false;
		var detailFlag = false;
		var recordUrl = ctx + 'shop/queryShopTypeLog.json?orgSkeletionCode=' + code + "&pageSize=" + $scope.paginationConf.itemsPerPage + "&pageNum=" + $scope.paginationConf.currentPage;

		//变更日志
		$http.get(recordUrl).success(function(data) {
			recordFlag = true;
			$scope.shopLogLists = data.shopLogList;
			$scope.paginationConf = {
				currentPage: $scope.param.pageNum,
				totalItems: data.total,
				itemsPerPage: $scope.param.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};

			if (recordFlag && detailFlag) {
				ngDialog.open({
					template: 'app/shop/func/editShopType.html',
					scope: $scope,
					closeByDocument: false
				});
			}
		});

		//店铺详情查询
		var detailUrl = ctx + 'shop/queryShopTypeDetail.json?orgSkeletionCode=' + code;
		$http.get(detailUrl).success(function(data) {
			detailFlag = true;
			$scope.code = code;
			$scope.shopTypeBean = data.shopTypeBean;

			if (recordFlag && detailFlag) {
				ngDialog.open({
					template: 'app/shop/func/editShopType.html',
					scope: $scope
				});
			}
		});
	}
});