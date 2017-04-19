myApp.controller('commentUnable', function($scope, $http, $filter, ngDialog) {
	var url = ctx + 'order/expireOrderEvaluationComment.json?code=' + $scope.unableCode
	$scope.param = {};
	$scope.set =function(){
		$http.post(url, $scope.param).success(function(data) {
			if (data.respCode == 100) {
				showMessage(ngDialog, '操作成功！', function() {
					$scope.closeThisDialog();
					if($scope.isList){
						$scope.onSearch();
					}else{
						window.location.href=''
					}
				});
			}
		})
	}
})