/**
 * Created by dengrunquan on 16/4/26.
 */
myApp.controller('insideAuthorizeEdit', function($scope, $http, ngDialog) {
	$scope.formData = {
		// "callName": $scope.editData.callName,
		"roleCode": $scope.editData.roleCode
	};
	if(isBlank($scope.formData.callName) || $scope.formData.callName=="undefined"){
		$scope.formData.memo = "";
	}
	// if(!isBlank($scope.editData.callName)){
	// 	$scope.formData.callName = $scope.editData.callName;
	// }
	/**
	 * 保存用户角色
	 */
	$scope.saveAuthorize = function() {

		if (isBlank($scope.formData.roleCode)) {
			showMessage(ngDialog, "角色不能为空！");
			return;
		}

		if ($scope.editData.editType == 'edit') {
			$scope.updateAuthorize();
		} else {
			$scope.createAuthorize();
		}
	}

	/**
	 * 创建用户角色
	 */
	 $scope.formData.callName = "字数为20字内";
	 $scope.editName=function(){
	 	$scope.formData.callName = "";
	 }
	$scope.createAuthorize = function() {

		if (isBlank($scope.formData.mobile)) {
			showMessage(ngDialog, "授权用户不能为空！");
			return;
		}

		$scope.formData.callName =$scope.formData.callName=="字数为20字内"?"":$scope.formData.callName
		if(isBlank($scope.formData.callName)){
			showMessage(ngDialog, "姓名不能为空！");
			return;
		}
		if (!isBlank($scope.formData.callName)) {
			if ($scope.formData.callName.length > 20) {
				showMessage(ngDialog, "姓名字数限制在20字以内！", function() {});
				return;
			}
		}
		var url = ctx + 'shop/createUserForShop.json?userOutCode=' +
			$scope.formData.userOutCode +
			"&callName=" + $scope.formData.callName +
			"&roleCode=" + $scope.formData.roleCode;
		$http.get(url).success(function(data) {
			if (data.code == 100) {
				showMessage(ngDialog, data.msg, function() {
					$scope.closeThisDialog();
					$scope.onSearch();
				});
			}
		});
	}

	/**
	 * 更新用户角色
	 */
	$scope.updateAuthorize = function() {
//		if ($scope.formData.callName.length > 20) {
//			showMessage(ngDialog, "字数限制在20字以内！", function() {
//			});
//			return;
//		}
		var url = ctx + 'shop/updateUserForShop.json?userOutCode=' +
			$scope.editData.userOutCode +
			// "&callName=" + $scope.formData.callName +
			"&roleCode=" + $scope.formData.roleCode;
		$http.get(url).success(function(data) {
			if (data.code == 100) {
				showMessage(ngDialog, data.msg, function() {
					$scope.closeThisDialog();
					$scope.onSearch();
				});
			}
		});
	}

	/**
	 * 得到账号
	 */
	$scope.getUserOutCode = function() {
		if ($scope.formData.mobile) {
			if ($scope.formData.mobile.length == 11) {
				var url = ctx + "user/getUserByMobile.json?mobile=" + $scope.formData.mobile;
				$http.get(url).success(function(data) {
					if (data.code == 100) {
						$scope.formData.userOutCode = data.userBean.outCode;
					}
				});
			}
		}

	}
});
