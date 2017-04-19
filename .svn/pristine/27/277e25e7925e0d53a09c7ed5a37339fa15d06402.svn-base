myApp.controller('refundDetail', function($scope, $http, ngDialog) {
    $scope.tribeData = $scope.tribeDatas;
    $scope.switchStatusTribe = function(num){
        if(num == 1){
            return "未处理"
        }else if(num == 2){
            return "银行处理中";
        }else if(num == 3){
            return "处理失败";
        }else if(num == 4){
            return "处理成功" ;
        }else{
            return "未知";
        }
    }
})