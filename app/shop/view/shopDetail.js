/**
 * Created by dengrunquan on 16/4/22.
 */
myApp.controller('shopDetail',function($scope, ngDialog,$http,$routeParams){

    $scope.detail = {};
    $scope.detail.shopCode = $routeParams.shopCode;
    $scope.detail.shopType = $routeParams.shopType;
    $scope.detail.editType = $routeParams.editType;

	$scope.freezeParam = {};
	$scope.showImg = 0;
	if ($routeParams.editType == 'check') {
		$scope.returnUrl = 'shop/check';
	} else if ($routeParams.editType == 'manage') {
		$scope.returnUrl = '/shop/manage';
	}
	$scope.addressPShow = true;
	$scope.addressCShow = true;
	$scope.addressZShow = true;
	$scope.addressAShow = true;
	//配置日志分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
	//基本信息

	$scope.onSearch = function() {
		if ($scope.detail.editType == 'check') {
			$scope.shopType = 1;
		} else {
			$scope.shopType = 2;
		}
		var basicUrl = ctx + "shop/queryShopInfo.json?shopCode=" + $routeParams.shopCode + "&shopType=" + $scope.shopType;
		$http.get(basicUrl).success(function(data) {
			console.log(data.isActive,'data');
			if (data.isActive == 2) {
				$scope.detail.canFreeze = "no";
			} else {
				$scope.detail.canFreeze = "yes";
			}
			$scope.basicInfo = data;
			$scope.showImg = 1;
			if ($scope.basicInfo.shopLogoImg) {} else {
				$scope.basicInfo.shopLogoImg = "../../../img/defaultPic.jpg";
			}
			if (isBlank($scope.basicInfo.province)) {
				$scope.addressPShow = false;
			}
			if (isBlank($scope.basicInfo.city)) {
				$scope.addressCShow = false;
			}
			if (isBlank($scope.basicInfo.zone)) {
				$scope.addressZShow = false;
			}
			if (isBlank($scope.basicInfo.address)) {
				$scope.addressAShow = false;
			}
			if (!isBlank($scope.basicInfo.shopStatus)) {
				if ($scope.basicInfo.isActive == 1) {
					$scope.basicInfo.shopStatusName = "已激活";
				}else if($scope.basicInfo.isActive == 2){
                    $scope.basicInfo.shopStatusName = "已冻结";
				}else{
                    $scope.basicInfo.shopStatusName = "未知";
				}
			}
//			for (var i = 0; i < $scope.basicInfo.mobileList.length; i++) {
//				if ($scope.basicInfo.mobileList[i].isdefault) {
//					$scope.phoneDefault = $scope.basicInfo.mobileList[i].mobile;
//					break;
//				}
//			}
		});

	}

	$scope.logSearch = function() {
		var logUrl = ctx + "shop/queryShopFreezeLog.json?shopCode=" + $routeParams.shopCode + "&pageSize=" + $scope.paginationConf.itemsPerPage + "&pageNum=" + $scope.paginationConf.currentPage;
		$http.get(logUrl).success(function(data) {
			$scope.logRecords = data.shopLogList;
			for (var i = 0; i < $scope.logRecords.length; i++) {
				if (!isBlank($scope.logRecords)) {
					if ($scope.logRecords[i].status == 1) {
						$scope.logRecords[i].statusName = "状态更改为：审核中"
					}
					if ($scope.logRecords[i].status == 2) {
						$scope.logRecords[i].statusName = "状态更改为：正常营业"
					}
					if ($scope.logRecords[i].status == 3) {
						$scope.logRecords[i].statusName = "状态更改为：审核未通过"
					}
					if ($scope.logRecords[i].status == 4) {
						$scope.logRecords[i].statusName = "状态更改为：暂停营业"
					}
					if ($scope.logRecords[i].status == 5) {
						$scope.logRecords[i].statusName = "状态更改为：已冻结"
					}
				}
			}
			$scope.paginationConf = {
				currentPage: $scope.paginationConf.currentPage,
				totalItems: data.total,
				itemsPerPage: $scope.paginationConf.itemsPerPage,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function() {}
			};
		})
	}

	$scope.openShopEditDialog = function() {
		ngDialog.open({
			template: 'app/shop/view/shopBasicInfoEditDialog.html',
			scope: $scope,
			closeByDocument: false
		});
	};

	$scope.onSearch();
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.logSearch);


});