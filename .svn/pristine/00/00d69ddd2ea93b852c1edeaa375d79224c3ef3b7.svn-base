myApp.controller('commentDetail', function($scope, $http,$rootScope,$routeParams, $filter, ngDialog) {
	$scope.param = {};
	$scope.isList = false;
	var url = ctx + 'order/queryEvaluationCommentDetail.json?code=' +$routeParams.code
	$scope.startObj = new Object();
	$http.get(url).success(function(data) {
		if(data.evaluationComments){
			$scope.commentDetail = data.evaluationComments[0];
		}
	});
	
	$scope.setUnable = function(){
		$scope.unableCode = $routeParams.code;
		ngDialog.open({
			template: 'app/order/comment/commentUnable.html',
			scope: $scope,
			closeByDocument: false
		});
	}
})