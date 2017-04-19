
myApp.controller('tribeActive', function($scope,$rootScope, $http, ngDialog,$rootScope) {

	 $scope.setTribeStatus=function(){
// console.log($rootScope.tribeids);
//  		$scope.activeRemarks = $scope.activeRemarks==="输入限定200字数"?"":$scope.activeRemarks;
         console.log($scope.activeRemarks.length,"$scope.activeRemarks.length");
 		if($scope.activeRemarks.length>200){
            showMessage(ngDialog, "输入字数不能大于200！");
            return;
		}
		if (isBlank($scope.activeRemarks)) {
			showMessage(ngDialog, "激活理由不能为空！");
			return;
		}

		var tribeids = $rootScope.tribeids;
		var url = "/operateManage/api/tribe/changeTribeStatus.json"
		var tribeFreezeParams={};
			tribeFreezeParams.tribeCode=tribeids;
			tribeFreezeParams.tribeStatus = 1;
			tribeFreezeParams.remark = $scope.activeRemarks;
// console.log(tribeFreezeParams)
			
		$http.post(url,tribeFreezeParams).then(function(res){
// console.log(res.data.code)
			if(res.data.code ==100){
				showMessage(ngDialog,"激活成功")
			}
		},function(err){
// console.log(err)
		})
	 		$rootScope.tribeActiveStatus = false;
			$rootScope.tribeFreezeStatus = true;
	 		$scope.closeThisDialog();
	 }
});