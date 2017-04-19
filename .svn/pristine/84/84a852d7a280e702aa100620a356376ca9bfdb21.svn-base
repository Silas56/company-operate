/**
 * Created by dengrunquan on 16/4/12.
 */
myApp.controller('shopManage', function($scope, $rootScope, ngDialog, $timeout, $http, $filter) {

	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};

	//条件
	$scope.param = {};
	$scope.createDesc = "desc";
	$scope.createDown = true;
	$scope.changeDesc = "desc";
	$scope.changeDown = true;

	//查询
	$scope.onSearch = function() {
		var url = ctx + 'shop/queryBusiShopList.json';


		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;
		if ($scope.param.startShopUpdatedTime) {
			$scope.param.startShopUpdatedTime = $filter('date')($scope.param.startShopUpdatedTime, 'yyyy-MM-dd');
		}
		if ($scope.param.endShopUpdatedTime) {
			$scope.param.endShopUpdatedTime = $filter('date')($scope.param.endShopUpdatedTime, 'yyyy-MM-dd');
		}
		if ($scope.param.startAuthenticationTime) {
			$scope.param.startAuthenticationTime = $filter('date')($scope.param.startAuthenticationTime, 'yyyy-MM-dd');
		}
		if ($scope.param.endAuthenticationTime) {
			$scope.param.endAuthenticationTime = $filter('date')($scope.param.endAuthenticationTime, 'yyyy-MM-dd');
		}
		if ($scope.param.startCreateTime) {
			$scope.param.startCreateTime = $filter('date')($scope.param.startCreateTime, 'yyyy-MM-dd');
		}
		if ($scope.param.endCreateTime) {
			$scope.param.endCreateTime = $filter('date')($scope.param.endCreateTime, 'yyyy-MM-dd');
		}
		if (isBlankTime($scope.param.startShopUpdatedTime,$scope.param.endShopUpdatedTime)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if (isBlankTime($scope.param.startAuthenticationTime,$scope.param.endAuthenticationTime)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if (isBlankTime($scope.param.startCreateTime,$scope.param.endCreateTime)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}

		$http.post(url, $scope.param).success(function(data) {
			if (data.shopManagePage) {
				$scope.shopBeans = data.shopManagePage.shopBeans;

				if (!isBlank($scope.shopBeans)) {
					for (var i = 0; i < $scope.shopBeans.length; i++) {
						var shopManage = $scope.shopBeans[i];
						//shopType
						if (shopManage.shopType == 1) {
							shopManage.shopTypeName = '酷鸟商家';
						} else if (shopManage.shopType == 2) {
							shopManage.shopTypeName = '酷鸟分销商';
						} else {
							shopManage.shopTypeName = '没定义';
						}
						//authenticationStatus
						if (shopManage.authenticationStatus == 1) {
							shopManage.authenticationStatusName = '未实名认证';
						} else if (shopManage.authenticationStatus == 2) {
							shopManage.authenticationStatusName = '已实名认证';
						} else {
							shopManage.authenticationStatusName = '没定义';
						}
						//shopStatus
						if (shopManage.shopStatus == 1) {
							shopManage.shopStatusName = '审核中';
						} else if (shopManage.shopStatus == 2) {
							shopManage.shopStatusName = '正常营业';
						} else if (shopManage.shopStatus == 3) {
							shopManage.shopStatusName = '审核未通过';
						} else if (shopManage.shopStatus == 4) {
							shopManage.shopStatusName = '暂停营业';
						} else if (shopManage.shopStatus == 5) {
							shopManage.shopStatusName = '已冻结';
						} else {
							shopManage.shopStatusName = '没定义';
						}
						//channelType
						if (shopManage.channel == 0) {
							shopManage.channelName = 'PC';
						} else if (shopManage.channel == 1) {
							shopManage.channelName = 'WEBAPP';
						} else if (shopManage.channel == 2) {
							shopManage.channelName = 'APP';
						} else {
							shopManage.channelName = '没定义';
						}
					}
				}
				$scope.paginationConf = {
					currentPage: $scope.param.pageNum,
					totalItems: data.shopManagePage.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			}

		});
	};

	$scope.descFun = function(value) {
		if (value == 'createTime') {
			$scope.createDown = !$scope.createDown;
			$scope.param.sortField = "createTime";
			if ($scope.createDesc == "asc") {
				$scope.param.sortType = "desc";
				$scope.createDesc = "desc";
			} else {
				$scope.param.sortType = "asc";
				$scope.createDesc = "asc";;
			}
		} else if (value == 'changeTime') {
			$scope.changeDown = !$scope.changeDown;
			$scope.param.sortField = "lastUpdatedTime";
			if ($scope.changeDesc == "asc") {
				$scope.param.sortType = "desc";
				$scope.changeDesc = "desc";
			} else {
				$scope.param.sortType = "asc";
				$scope.changeDesc = "asc";;
			}
		}
		$scope.onSearch();
	}



	/***************************************************************
	         当页码和页面记录数发生变化时监控后台查询
	         如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
	         ***************************************************************/
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);


});