myApp.controller('insideStarf', function($scope, $http,ngDialog,$location) {

    $scope.onSearch = function() {
        $scope.param = {};
        //条件
        $scope.param.pageNum = 1;
        $scope.param.pageSize = 100000;
        var url = ctx + 'shop/queryRoleForShopList.json?pageNum='+$scope.param.pageNum+'&pageSize='+$scope.param.pageSize;
        $http.get(url).success(function (data) {
            if (data.shopRoleManagerPage) {
                if (data.shopRoleManagerPage.shopRoleManagerBean) {
                    $scope.roleList = data.shopRoleManagerPage.shopRoleManagerBean;
                }
            }
        });
        $location.path('/user/insideStarf');
    }

    $scope.onSearch();


    /**
     * 编辑角色窗口
     * @param roleCode
     */
    $scope.roleEditDialog= function (roleCode) {
        $scope.editData = {"roleCode":roleCode};
        var result = ngDialog.open({
            template: 'app/user/insideStarf/insideRoleView.html',
            scope: $scope,
            closeByDocument:false
        });
    };




    /**
     * 删除角色
     */
    $scope.deleteRoleForShop = function(roleCode) {
        confirmDialog(ngDialog, "是否删除角色？", function () {
                var url = ctx + 'shop/deleteRoleForShop.json?roleCode='+roleCode;
                $http.get(url).success(function (data) {
                    // console.log(data,"删除角色返回的数据");
                    if (data.code == 100) {
                        $scope.onSearch();
                        console.log("request success")
                    }else {
                        confirmDialog(ngDialog,data.msg)
                    }
                });
                console.log(roleCode)
        });

    };
});