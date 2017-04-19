/**
 * Created by dengrunquan on 16/4/26.
 */
myApp.controller('userStatusChange', function($scope, $http, ngDialog) {

	/**
	 * 更新用户状态
	 */
	if ($scope.formData.status == 1) {
		$scope.freeze = false;
	} else if ($scope.formData.status == 2) {
		$scope.freeze = true;
	}
	$scope.setUserStatus = function() {
		var myurl = ctx + 'user/updateUserStatus.json';
		if ($scope.formData.remarks.length > 200) {
			showMessage(ngDialog, "备注字数不可超过200！", function() {
			});
			return;
		}
		$http.post(myurl, $scope.formData).success(function(data) {
			if (data.code == 100) {
				$scope.closeThisDialog();
				$scope.onSearch();
			}
		});
	}
});