myApp.controller('shopBasicInfoEditDialog', function($scope, $http, ngDialog, $routeParams) {
	$scope.freezeParam = {};
	$scope.notFreezeParam = {};
	$scope.editShopStatus = function() {
		var freezeUrl = ctx + "shop/updateAndSaveShopStatus.json";
		$scope.freezeParam.status = 5;
		$scope.freezeParam.shopCode = $routeParams.shopCode;
		if (!isBlank($scope.freezeParam.remark)) {
			if ($scope.freezeParam.remark.length > 200) {
				showMessage(ngDialog, "冻结理由不可超过200字！", function() {});
				return;
			}
		}else{
			showMessage(ngDialog, "冻结理由不能为空！", function() {});
			return;
		}
		$http.post(freezeUrl, $scope.freezeParam).success(function(data) {
			showMessage(ngDialog, data.msg, function() {});
			$scope.detail.canfreeze = "no";
			$scope.closeThisDialog();
			$scope.onSearch();
		});
	}

	$scope.shopStatus = function() {
		var notFreezeUrl = ctx + "shop/updateAndSaveShopStatus.json";
		$scope.notFreezeParam.status = 2;
		$scope.notFreezeParam.shopCode = $routeParams.shopCode;
		if (!isBlank($scope.notFreezeParam.remark)) {
			if ($scope.notFreezeParam.remark.length > 200) {
				showMessage(ngDialog, "激活理由不可超过200字！", function() {});
				return;
			}
		}else{
			showMessage(ngDialog, "激活理由不能为空！", function() {});
			return;
		}
		$http.post(notFreezeUrl, $scope.notFreezeParam).success(function(data) {
//			alert(data.msg);
			showMessage(ngDialog, data.msg, function() {});
			$scope.detail.canfreeze = "yes";
			$scope.closeThisDialog();
			$scope.onSearch();
		})
	};
})