myApp.controller('insideAuthorize', function($scope, $http, ngDialog) {

	$scope.searchRole = function() {
		$scope.param = {};
		//条件
		$scope.param.pageNum = 1;
		$scope.param.pageSize = 10000;

		var url = ctx + 'shop/queryRoleForShopList.json?pageNum=1'+'&pageSize=10000';
		$http.get(url).success(function(data) {
			if (data.shopRoleManagerPage) {
				if (data.shopRoleManagerPage.shopRoleManagerBean) {
					$scope.roleList = data.shopRoleManagerPage.shopRoleManagerBean;

				}
			}
		});
	};

	$scope.searchRole();


	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	$scope.param = {};

	/**
	 * 查询
	 */
	$scope.onSearch = function() {
		//条件
		var paramValue = "";
		paramValue = paramValue + "pageNum=" + $scope.paginationConf.currentPage;
		paramValue = paramValue + "&pageSize=" + $scope.paginationConf.itemsPerPage;
		if ($scope.param.roleCode) {
			paramValue = paramValue + "&roleCode=" + $scope.param.roleCode;
		}
		if ($scope.param.mobile) {
			paramValue = paramValue + "&mobile=" + $scope.param.mobile;
		}
		if ($scope.param.nickName) {
			paramValue = paramValue + "&nickName=" + $scope.param.nickName;
		}
		if ($scope.param.status) {
			paramValue = paramValue + "&status=" + $scope.param.status;
		}
		if (isBlankTime($scope.param.authTimeStart,$scope.param.authTimeEnd)) {
			showMessage(ngDialog, "时间的查询条件不能只选择开始时间或者结束时间！", function() {});
			return;
		}
		if ($scope.param.authTimeStart) {
			paramValue = paramValue + "&authTimeStart=" + $scope.param.authTimeStart;
		}
		if ($scope.param.authTimeEnd) {
			paramValue = paramValue + "&authTimeEnd=" + $scope.param.authTimeEnd;
		}

		var url = ctx + 'shop/queryShopManagerList.json?' + paramValue;
		console.info(url);
		$http.get(url).success(function(data) {
			if (data.shopUserManagerPage) {
				$scope.userList = data.shopUserManagerPage.shopUserManagerBeans;
				for (var i in $scope.userList) {
					var user = $scope.userList[i];
					user.statusName = getUserStatusName(user.status);
					user.roleNames = user.shopRoleManagerBeans[0].roleName;
					user.roleCode = user.shopRoleManagerBeans[0].roleCode;
					if (user.memo == "undefined") {
						user.memoName = "";
					} else {
						user.memoName = user.memo;
					}
				}
				$scope.paginationConf = {
					currentPage: $scope.paginationConf.currentPage,
					totalItems: data.shopUserManagerPage.total,
					itemsPerPage: $scope.paginationConf.itemsPerPage,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			} else {
				$scope.userList = {};
				$scope.paginationConf = {
					currentPage: $scope.paginationConf.currentPage,
					totalItems: 0,
					itemsPerPage: $scope.paginationConf.itemsPerPage,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			}

		});
	};

	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);


	/**
	 * 编辑角色窗口
	 * @param roleCode
	 */
	$scope.authEditDialog = function(userOutCode, callName, roleCode) {
		var editType = "create";
		if (userOutCode) {
			editType = "edit";
		}
		$scope.editData = {
			"userOutCode": userOutCode,
			"editType": editType,
			"callName": callName,
			"roleCode": roleCode
		};
		var result = ngDialog.open({
			template: 'app/user/insideAuthorize/insideAuthorizeEdit.html',
			scope: $scope,
			closeByDocument:false
		});
		//      if(result){
		//          $scope.onSearch();
		//      }
	};

	/**
	 * 删除
	 */
	$scope.delAuth = function(userOutCode, roleCode) {
		confirmDialog(ngDialog, "移除后，账号将无法登录运营后台，是否确认？", function() {
			var url = ctx + 'shop/deleteUserForShop.json?roleCode=' + roleCode + "&userOutCode=" + userOutCode;
			$http.get(url).success(function(data) {
				if (data.code == 100) {
					$scope.onSearch();
				}
			});
		});
	}

	$scope.filterCallName = function(str){
		if(str == 'undefined') return '';
		return str;
	}
})
