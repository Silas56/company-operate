myApp.controller('productIndex', function($scope, $http, ngDialog) {

    //初始化
    $scope.productSpecialList = ''; //产品类型数据集合初始化
    $scope.productName = '';//产品名称初始化
    $scope.shopName = '';//所属商家初始化
    $scope.tribeName = '';//部落名称初始化
    //初始化


    //获取产品分类列表

    var productClassUrl = ctx + 'common/getPrdTypes.json';

    //获取产品列表
    var url = ctx + 'product/querySPUList.json';


    $http.get(productClassUrl).success(function(res) {
        $scope.productClassList = res.prdTypes; //产品类型数据集合
    })

    //获取产品分类列表

    $scope.visitStatus = 0;//初始化产品状态值

    //获取产品种类列表

    var productSpecialUrl = ctx + 'common/getPrdTypesById.json';

    $scope.productChange = function(typeId) {
        if (typeof typeId === 'number') {
            $http.get(productSpecialUrl, {
                params: {
                    parentId: typeId
                }
            }).success(function(res) {
                $scope.productSpecialList = res.prdTypes;
            })
        } else {
            $scope.productSpecialList = '';
            return false;
        }
    };


    //分页空间配置项

    $scope.paginationConf = {
        itemsPerPage: 10,
        currentPage: 1
    };

    $scope.param = {};
    $scope.param.productName = ''; //产品名称
    $scope.param.shopName = ''; //所属商家
    $scope.param.tribeName = ''; //部落名称
    $scope.param.parentId = ''; //产品一级分类
    $scope.param.categoryId = ''; //产品种类id
    $scope.param.visitStatus = ''; //产品状态

    //分页空间配置项


    //搜索查询
    $scope.search = function() {

        if( !$scope.productClassVal ){
            $scope.productSpecial = null;
            $scope.param.parentId = $scope.param.categoryId = ''; //产品一级分类、产品种类id重置
        }else{
            $scope.param.parentId = $scope.productClassVal ? $scope.productClassVal.typeId : ''; //产品一级分类
            $scope.param.categoryId = $scope.productSpecial ? $scope.productSpecial.typeId : ''; //产品种类id
        }

        $scope.param.visitStatus = $scope.visitStatus; //设置产品状态值

        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");//正则匹配特殊字符
        if ($scope.param.productName.length > 50 || $scope.param.shopName.length > 50 || $scope.param.tribeName.length > 50) {
            showMessage(ngDialog, '产品名称，所属商家，部落名称不得超过50字');
        } else {
            if( pattern.test($scope.productName) || pattern.test($scope.shopName) || pattern.test($scope.tribeName) ){
                showMessage(ngDialog, '产品名称，所属商家，部落名称不得包含特殊字符');
            }else{
                $scope.param.productName = $scope.productName;//产品名称
                $scope.param.shopName = $scope.shopName; //所属商家
                $scope.param.tribeName = $scope.tribeName; //部落名称
                $scope.onsearch();
            }


        }
    }


    $scope.onsearch = function() {
        $scope.datas = '';//清空内容
        $scope.param.pageNum = $scope.paginationConf.currentPage;
        $scope.param.pageSize = $scope.paginationConf.itemsPerPage;

        $http.get(url + '?pageNum=' + $scope.param.pageNum + '&pageSize=' + $scope.param.pageSize + '&productName=' + $scope.param.productName + '&shopName=' + $scope.param.shopName + '&tribeName=' + $scope.param.tribeName + '&parentId=' + $scope.param.parentId + '&categoryId=' + $scope.param.categoryId + '&visitStatus=' + $scope.param.visitStatus).success(function(res) {
            $scope.param.pageNum = $scope.paginationConf.currentPage;
            $scope.param.pageSize = $scope.paginationConf.itemsPerPage;
            if (res.list) {
                $scope.datas = res.list;
                $scope.paginationConf = {
                    currentPage: $scope.param.pageNum,
                    totalItems: res.total,
                    itemsPerPage: $scope.param.pageSize,
                    pagesLength: 8,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function() {}
                };
            } else {
                $scope.paginationConf = {
                    currentPage: $scope.param.pageNum,
                    totalItems: 0,
                    itemsPerPage: $scope.param.pageSize,
                    pagesLength: 8,
                    perPageOptions: [10, 20, 30, 40, 50],
                    onChange: function() {}
                }
            }
        })
    }

    //获取产品种类列表


    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onsearch)


    $scope.changeStatus = function(status) {
        if (status == 1) {
            return '上架';
        } else if (status == 2) {
            return '下架';
        } else {
            return '未知'
        }
    }

    //产品状态
    $scope.isFreeze = function(status) {
        if (status == 1) {
            return '冻结';
        } else if (status == 2) {
            return '解除冻结';
        } else {
            return '未知状态'
        }
    };

    //分销状态
    $scope.changeDistribute = function(status) {
        if( status == 1 ) {
            return '开启分销';
        }else if( status == 2 ){
            return '不分销';
        }else{
            return '未知';
        }
    };

    $scope.openwin = function(user, status) {
        console.log(user,'冻结');
        if (status) {
            if (status == 1) {
                $scope.formData = { 'productCode': user.code, 'optType': 2, 'shopCode': user.shopCode }
            } else if (status == 2) {
                $scope.formData = { 'productCode': user.code, 'optType': 1, 'shopCode': user.shopCode }
            }
            var result = ngDialog.open({
                template: 'app/product/productManage/productChange.html',
                scope: $scope,
                closeByDocument: false
            });
        }
    }



    $scope.copy = function() {
        var clipboard = new Clipboard('.copy_link');
        clipboard.on('success', function() {
            showMessage(ngDialog,'复制成功');
            clipboard.destroy();
        })
    }

    // 二维码
    $scope.qrcode = function(index, link) {
        var dom = document.getElementById('qrcode_' + index);
        angular.element(dom).empty().qrcode({
            render: "canvas", //table方式 
            width: 150, //宽度 
            height: 150, //高度 
            text: link //任意内容 
        });
    }
})