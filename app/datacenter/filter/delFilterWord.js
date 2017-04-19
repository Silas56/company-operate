myApp.controller('delFilterWord', function($scope, $http, ngDialog) {

    $scope.del = function () {
        var word = $scope.curDelWord;
        var url = ctx + 'evaluate//delFilterWord.json?keyWord='+word;
        $http.post(url)
        .success(function(data) {
            if(data.respCode == 100) {
                $scope.onSearch();
                $scope.closeThisDialog();
                showMessage(ngDialog, '删除成功！');
            }else {
                showMessage(ngDialog, data.respDes);
            }
        });
    }
});