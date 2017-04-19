myApp.controller('editShopType', function($scope, $http, ngDialog, $routeParams) {
	$scope.param = {};
	$scope.param.code = $scope.code;
	$scope.param.orgSkeletionName = $scope.shopTypeBean.orgSkeletionName;
	$scope.param.desciption = $scope.shopTypeBean.desciption;
	if(!isBlank($scope.shopTypeBean.serviceRate) && $scope.shopTypeBean.serviceRate !=0){
		$scope.serviceRateMid = parseInt($scope.shopTypeBean.serviceRate * 1000)/10;
		$scope.freeServiceRate = 2;
		$scope.service = true;
	}else{
		$scope.freeServiceRate = 1;
		$scope.service = false;
	}
	//配置分页基本参数

	$scope.checkChange = function(money) {
		if (money == "free") {
			$scope.service = false;
			$scope.wrongFormat = false;
			$scope.param.serviceRate = "";
		} else if (money == "notFree") {
			$scope.service = true;
			$scope.wrongFormat = true;
		}
	}

	$scope.submit = function() {
		var url = ctx + 'shop/updateShopType.json';
		if (isBlank($scope.param.orgSkeletionName)) {
			showMessage(ngDialog, "店铺类型名称不能为空!", function() {
			});
			return;
		}
		if (isBlank($scope.param.desciption)) {
			showMessage(ngDialog, "店铺类型描述不能为空!", function() {
			});
			return;
		}
		if (isBlank($scope.param.remarks)) {
			showMessage(ngDialog, "变更理由不能为空!", function() {
			});
			return;
		}
		if (IsNum2($scope.serviceRateMid) || $scope.serviceRateMid <= 0) {
			showMessage(ngDialog, "新服务费率只能为大于0的纯数字,且最多有一位小数！", function() {});
			return;
		}
		if (parseInt($scope.serviceRateMid) >= 100) {
			showMessage(ngDialog, "新服务费率不能大于等于100！", function() {});
			return;
		}
		if ($scope.serviceRateMid == "") {
			$scope.param.serviceRate = 0;
		} else {
			$scope.param.serviceRate = parseInt($scope.serviceRateMid*100)/ 10000;
		}
		if($scope.freeServiceRate == 1){
			$scope.param.serviceRate = 0;
		}
		$http.post(url, $scope.param).success(function(data) {
			showMessage(ngDialog, data.msg, function() {
				$scope.onSearch();
				$scope.closeThisDialog();
			});
		});
	}

	//条件
	var url = ctx + 'shop/queryShopLog.json';
})