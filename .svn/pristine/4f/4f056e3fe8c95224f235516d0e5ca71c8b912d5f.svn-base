myApp.controller('addFilterWord', function($scope, $http, ngDialog) {

    $scope.add = function () {
        var word = $scope.addingFilterWord;
        if(word) {
            var first = window.firstLetter(word.substring(0, 1));
            var url = ctx + 'evaluate/addFilterWord.json?letter='+first+'&keyWord='+word;
            $http.post(url)
            .success(function(data) {
                if(data.respCode == 100) {
                    $scope.onSearch();
                    $scope.closeThisDialog();
                    showMessage(ngDialog, '添加成功');
                }else {
                    showMessage(ngDialog, data.respDes);
                }
            });
        }else {
            showMessage(ngDialog, "请填写滤词!");
        }
    }
});