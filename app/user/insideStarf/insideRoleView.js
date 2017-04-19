/**
 * Created by dengrunquan on 16/4/26.
 */
myApp.controller('insideRoleView',function($scope,$http,ngDialog) {

    $scope.formData = {};
	$scope.isEdit = false;
	if(!isBlank($scope.editData.roleCode) && $scope.editData.roleCode!="undefined"){
		$scope.isEdit = true;
	}


    //查询资源树
    var url = ctx + 'permission/queryShopPermission.json';
    $http.get(url).success(function (data) {
        console.log(data.treeNodes,"data.treeNodes")
        $scope.treeNodes = data.treeNodes;
        //查询角色明细
        if($scope.editData.roleCode){
            var url = ctx + 'shop/getRoleForShopInfo.json?roleCode='+$scope.editData.roleCode;
            $http.get(url).success(function (data) {
                if (data.shopCustomRoleBean) {
                    $scope.formData.roleCode = data.shopCustomRoleBean.roleCode;
                    $scope.formData.roleName = data.shopCustomRoleBean.roleName;
                    $scope.formData.memo = data.shopCustomRoleBean.memo;
                    if(data.shopCustomRoleBean.resourceCodes){
                        $scope.setAuthChecked($scope.treeNodes,data.shopCustomRoleBean.resourceCodes);
                    }
                }
            });
        }
    });

    /**
     * 设置checked
     */
    $scope.setAuthChecked = function(treeNodes,checkeds){
        if(treeNodes){
            for(var i in treeNodes){
                var tree = treeNodes[i];
                tree.checked = false;
                if(contains(checkeds,tree.resourceCode)){
                    tree.checked = true;
                }
                $scope.setAuthChecked(tree.children,checkeds);
            }
        }
    }



    /**
     * 保存角色
     */
    $scope.saveRole = function(){
        if (isBlank($scope.formData.roleName)) {
            showMessage(ngDialog, "角色名称不能为空！");
            return;
        }
        $scope.formData.resourceCodes = $scope.getAuthArray();
        if(isBlank($scope.formData.resourceCodes) || $scope.formData.resourceCodes.length ==0){
            showMessage(ngDialog, "角色资源不能为空！");
            return;
        }
        if($scope.formData.roleCode){
            $scope.updateUserForShop();
        }else{
            $scope.createUserForShop();
        }
        $scope.closeThisDialog();
    }

    /**
     * 创建角色
     */
    $scope.createUserForShop = function(){

        var url = ctx + 'shop/createRoleForShop.json';
        $http.post(url, $scope.formData).success(function(data) {
            if(data.code == 100){
                $scope.onSearch();
            }

        });

    }

    /**
     * 更新角色
     */
    $scope.updateUserForShop = function(){
        var url = ctx + 'shop/updateRoleForShop.json';
        $http.post(url, $scope.formData).success(function(data) {
            if(data.code == 100){
                $scope.onSearch();
            }
        });
    }

    /**
     * 得到权限数组的值
     */
    $scope.getAuthArray = function(){
        var result = [];
        $("input[type=checkbox][name=authResDatas]:checked").each(function(){ //由于复选框一般选中的是多个,所以可以循环输出
            result.push($(this).val());
        });
        return result;
    }
});