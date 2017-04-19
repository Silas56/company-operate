myApp.controller('productChange', function($scope,$http,ngDialog){
	if($scope.formData.optType == 1){
		$scope.freeze = false;
	}else if($scope.formData.optType == 2){
		$scope.freeze = true;
	}

	$scope.setUserStatus = function(){
		var url = ctx + 'product/updateSPUStatus.json';
		if( $scope.formData.optReason.length > 200 ){
			showMessage(ngDialog, "备注字数不可超过200！", function() {
			});
			return;
		}
		$http.post(url,$scope.formData).success(function(data){
			if( data.code == 100 ){
				$scope.closeThisDialog();
				window.location.reload();
			}
		})
	}
})