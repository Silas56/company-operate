
myApp.controller('changeTribe', function($scope,$rootScope, $http,$location, ngDialog) {
	$scope.changeTribe={};
	$scope.warmInfos = false;
	$scope.warmRemark = false;

	$scope.setTribeStatus=function(){
	console.log($scope.changeTribe.remarks.length,"$scope.changeTribe.remarks");
// console.log($scope.changeTribe)
		if(!(/^1[3|4|5|8][0-9]\d{8}$/.test($scope.changeTribe.mobile))){ 
			$scope.warmInfos=true; 
			return;		
		}else if($scope.changeTribe.remarks==""||$scope.changeTribe.remarks == undefined){
			$scope.warmRemark = true;
			return;
		}else if($scope.changeTribe.remarks.length>200){
            showMessage(ngDialog, "输入字数不能大于200！");
			return;
		}
		// if($scope.changeTribe.remarks.length>200){
         //    showMessage(ngDialog, "输入字数不能大于200！");
         //    return;
		// }
		
		$rootScope.changeRemarks = $scope.changeTribe.remarks;
		

		var url = "/operateManage/api/user/getUserByMobile?mobile="+$scope.changeTribe.mobile+"";
		$http.get(url).then(function(res){
// console.log(res,"xiugaibuluoxignx")
			if(res.data.code==100){
				$rootScope.chifeMan = res.data.userBean.nickName;
			    $rootScope.mobile = res.data.userBean.mobile;
				$rootScope.chifeCode = res.data.userBean.outCode;
				$scope.closeThisDialog();
				
			}else if(res.data.code == 102){
				showMessage(ngDialog,res.data.msg);
			}
		},function(err){
// console.log(err)
		})

	}
});