myApp.controller('addShopType', function($scope, $http, ngDialog) {
	$scope.author = {
		show: false
	}
	$scope.product = {
		show: false
	}
	$scope.param = {};
	$scope.service = false;
	$scope.wrongFormat = true;
	//	$scope.param.serviceRate = 3.0;
	if ($scope.param.serviceRate > 99 || $scope.param.serviceRate < 1) {
		$scope.wrongFormat = true;
	}
	$scope.showAuthor = function(value) {
		if (value == 'isAuthor') {
			$scope.author.show = !$scope.author.show;
		}
		if (value == 'isProduct') {
			$scope.product.show = !$scope.product.show;
		}
	}


	$scope.checkChange = function(money) {
		if (money == "free") {
			$scope.service = false;
			$scope.param.serviceRate = "";
		} else if (money == "notFree") {
			$scope.service = true;
		}
	}

	$scope.submit = function() {
		var url = ctx + 'shop/addShopType.json';
		if (isBlank($scope.param.orgSkeletionName)) {
			showMessage(ngDialog, "店铺类型名称不能为空!", function() {});
			return;
		}
		if (isBlank($scope.param.desciption)) {
			showMessage(ngDialog, "店铺类型描述不能为空!", function() {});
			return;
		}
		if ($scope.service) {
			if (isBlank($scope.param.serviceRate) && $scope.service) {
				showMessage(ngDialog, "店铺服务费率不能为空!", function() {});
				return;
			}
			if (IsNum2($scope.param.serviceRate) || $scope.param.serviceRate <= 0) {
				showMessage(ngDialog, "新服务费率只能为大于0的纯数字,且最多有一位小数！", function() {});
				return;
			}
			if (parseInt($scope.param.serviceRate) >= 100) {
				showMessage(ngDialog, "新服务费率不能大于等于100！", function() {});
				return;
			}
		}
		if (isBlank($scope.param.serviceRate)) {
			$scope.param.serviceRate = 0;
		} else {
			$scope.param.serviceRate = parseInt($scope.param.serviceRate * 100) / 10000;
		}
		$http.post(url, $scope.param).success(function(data) {
			if (data.code == 100) {
				showMessage(ngDialog, '操作成功！', function() {
					$scope.closeThisDialog();
					$scope.onSearch();
				});
			}
			//			showMessage(ngDialog, data.msg, function() {
			//				if (data.code == 100) {
			//					$scope.onSearch();
			//					$scope.closeThisDialog();
			//				}
			//			});
		});

	}

})