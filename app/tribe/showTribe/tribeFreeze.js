
myApp.controller('tribeFreeze', function($scope,$rootScope,$http, ngDialog) {

	$scope.setTribeStatus=function(){
// console.log($rootScope.tribeids);
		var tribeids = $rootScope.tribeids;
        console.log($scope.freezeRemarks,"$scope.freezeRemarks");
		// $scope.freezeRemarks = $scope.freezeRemarks==="输入限定200字数"?"":$scope.freezeRemarks;
		if($scope.freezeRemarks.length>200){
            showMessage(ngDialog, "输入字数不能大于200！");
            return;
		}
		if (isBlank($scope.freezeRemarks)) {
			showMessage(ngDialog, "冻结理由不能为空！");
			return;
		}

		var url = "/operateManage/api/tribe/changeTribeStatus.json"
		var tribeFreezeParams={};
			tribeFreezeParams.tribeCode=tribeids;
			tribeFreezeParams.tribeStatus = 2;
			tribeFreezeParams.remark = $scope.freezeRemarks;
			
		$http.post(url,tribeFreezeParams).then(function(res){
// console.log(res.data.code);
			if(res.data.code==100){
				showMessage(ngDialog,"冻结成功")
			}
		},function(err){
// console.log(err)
		})
		$rootScope.tribeActiveStatus = true;
		$rootScope.tribeFreezeStatus = false;
		$scope.closeThisDialog();
	}
});