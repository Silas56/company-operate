myApp.controller('platformUser', function($scope, $http,ngDialog) {
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
		$scope.param.pageNum = $scope.paginationConf.currentPage;
		$scope.param.pageSize = $scope.paginationConf.itemsPerPage;

		var url = ctx + 'user/queryAllUser.json';
		$http.post(url, $scope.param).success(function(data) {
			if(data.allUserPage){
				$scope.userList = data.allUserPage.allUserBeans;
				for(var i in $scope.userList){
					var user = $scope.userList[i];
					user.statusName = getUserStatusName(user.status);
				}
				$scope.paginationConf = {
					currentPage: $scope.param.pageNum,
					totalItems: data.allUserPage.total,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function() {}
				};
			}else {
				$scope.userList = {};
				$scope.paginationConf = {
					currentPage: $scope.param.pageNum,
					totalItems: 0,
					itemsPerPage: $scope.param.pageSize,
					pagesLength: 8,
					perPageOptions: [10, 20, 30, 40, 50],
					onChange: function () {
					}
				}
			}

		});
	};

	/**
	 * 修改状态
	 * @param status
     */
	$scope.changeStatus = function(userCode,status){
		if(status){
			//激活
			if(status == 2){
				$scope.formData = {"userCode":userCode,"status":1};
			}
			//冻结
			else if(status == 1){
				$scope.formData = {"userCode":userCode,"status":2};
			}
			var result = ngDialog.open({
					template: 'app/user/platformUser/userStatusChange.html',
					scope: $scope,
					closeByDocument:false
			});
		}

	}
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);
});