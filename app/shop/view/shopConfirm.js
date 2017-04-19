/**
 * Created by dengrunquan on 16/4/22.
 */
myApp.controller('shopConfirm', function($scope, ngDialog, $http, $routeParams, $window) {

	$scope.param = {};
	$scope.audit = {};
	$scope.audit.show = false;
	$scope.isThrough = false;
	$scope.param.shopCode = $routeParams.shopCode;
	//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};

	$scope.search = function() {
		//审核信息
		var authUrl = ctx + "shop/queryShopAuthenticationStatus.json?shopCode=" + $routeParams.shopCode;
		$http.get(authUrl).success(function(data) {
			$scope.authStatusBean = data;
			if ($scope.authStatusBean.auditName == "正常营业") {
				$scope.isThrough = true;
			} else {
				$scope.isThrough = false;
			}
		})
		var auditUrl = ctx + "shop/queryAuditRecordsByShopCode.json?shopCode=" + $routeParams.shopCode + "&pageSize=" + $scope.paginationConf.itemsPerPage + "&pageNum=" + $scope.paginationConf.currentPage;
		$http.get(auditUrl).success(function(data) {
			console.info(data);
			$scope.auditRecords = data;
			if (!isBlank(data.shopAuditRecordsList)) {
				for (var i = 0; i < data.shopAuditRecordsList.length; i++) {
					if ($scope.auditRecords.shopAuditRecordsList[i].auditStatus == 1) {
						$scope.auditRecords.shopAuditRecordsList[i].auditStatusName = "审核中";
					}
					if ($scope.auditRecords.shopAuditRecordsList[i].auditStatus == 2) {
						$scope.auditRecords.shopAuditRecordsList[i].auditStatusName = "正常营业";
					}
					if ($scope.auditRecords.shopAuditRecordsList[i].auditStatus == 3) {
						$scope.auditRecords.shopAuditRecordsList[i].auditStatusName = "审核未通过";
					}
					if ($scope.auditRecords.shopAuditRecordsList[i].auditStatus == 4) {
						$scope.auditRecords.shopAuditRecordsList[i].auditStatusName = "暂停营业";
					}
					if ($scope.auditRecords.shopAuditRecordsList[i].auditStatus == 5) {
						$scope.auditRecords.shopAuditRecordsList[i].auditStatusName = "已冻结";
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
		});
	}

//	$scope.search();
	///shop/updateAndSaveAuditRecord.json
	// *shopCode<String> : 店铺编码
	// auditCreateTime<String> : *auditStatus<Integer> : 审核状态
	// operator<String> : *remark<String> : 审核备注
	$scope.update = function() {
		var url = ctx + "shop/updateAndSaveAuditRecord.json";
		if (isBlank($scope.param.remark)) {
			showMessage(ngDialog, "备注不能为空！", function() {});
			return;
		}
		$http.post(url, $scope.param).success(function(data) {
			if (data.code == 100) {
				showMessage(ngDialog, "操作成功！", function() {
					var href = getRootPath();
					$window.location.href = href;
				});
			} else {
				showMessage(ngDialog, data.msg, function() {});
			}

		});
	}

	$scope.changeAudit = function() {
		if ($scope.param.auditStatus == 2) {
			$scope.audit.show = true;
		} else {
			$scope.audit.show = false;
		}
	}
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search);

});