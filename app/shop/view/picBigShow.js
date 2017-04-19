myApp.controller('picBigShow', function($scope, $routeParams) {
	$scope.changePic = function(value){
		for(var i = 0;i<$scope.picArr.length;i++){
			if($scope.imgSrc == $scope.picArr[i]){
				if(value == 1){
					if(i == 0){
						$scope.imgSrc = $scope.picArr[$scope.picArr.length-1];
						$scope.imgName = $scope.picNameArr[$scope.picArr.length-1];
					}else{
						$scope.imgSrc = $scope.picArr[i-1];
						$scope.imgName = $scope.picNameArr[i-1];
					}
					return;
				}else{
					if(i == $scope.picArr.length - 1){
						$scope.imgSrc = $scope.picArr[0];
						$scope.imgName = $scope.picNameArr[0];
					}else{
						$scope.imgSrc = $scope.picArr[i+1];
						$scope.imgName = $scope.picNameArr[i+1];
					}
					return;
				}
			}
		}
	}
	
	$scope.domnloadPic = function(){
		var url = ctx + 'shop/downloadImage.json?url=' + $scope.imgSrc
		window.open(url);
	}
})