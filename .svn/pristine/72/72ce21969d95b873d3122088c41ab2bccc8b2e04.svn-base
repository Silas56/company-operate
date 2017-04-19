myApp.controller('productDetail', function($scope, $http, $routeParams, ngDialog) {

    //分页空间配置项

    $scope.paginationConf = {
        itemsPerPage: 10,
        currentPage: 1
    };

    $scope.param = {};

    //分页空间配置项

    var productCode = $routeParams.productCode,

        shopCode = $routeParams.shopCode,

        url = ctx + 'product/querySPUInfo.json' + '?productCode=' + productCode + '&shopCode=' + shopCode; //产品的详细信息

    operateUrl = ctx + 'product/queryOptLog.json?productCode=' + productCode; //查看操作日志


    //获取产品详细信息
    $http.get(url).success(function(data) {
        $scope.data = data;
        console.log($scope.data, '详细信息');
        angular.element('#qrcode').qrcode({
            render: 'canvas',
            width: 150,
            height: 150,
            text: data.spuaddr
        })
    })


    //日志分页操作
    $scope.operate = function() {
        $scope.param.pageNum = $scope.paginationConf.currentPage;
        $scope.param.pageSize = $scope.paginationConf.itemsPerPage;

        $http.get(operateUrl + '&pageNum=' + $scope.param.pageNum + '&pageSize=' + $scope.param.pageSize).success(function(res) {
            console.log(res, '操作日志');
            if (res.list) {
                $scope.operateDatas = res.list;
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
    //日志分页操作

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage',$scope.operate)


    //产品状态
    $scope.isUpDown = function(num) {
        if (num == 1) {
            return '上架'
        } else if (num == 2) {
            return '下架'
        } else {
            return '未知'
        }
    }

    //冻结、解除冻结
    $scope.isFreeze = function(status) {
        if (status == 1) {
            return '冻结';
        } else if (status == 2) {
            return '解除冻结';
        } else {
            return '未知状态'
        }
    }

    //是否分销
    $scope.isDistribute = function(status) {
        if (status == 1) {
            return '是'
        } else {
            return '否'
        }
    }

    //复制链接
    $scope.copy = function() {
        var clipboard = new Clipboard('.copy_link');
        clipboard.on('success', function() {
            showMessage(ngDialog,'复制成功');
            clipboard.destroy();
        })
    }


    //是否冻结
    $scope.openwin = function(user, status) {
        if (status) {
            if (status == 1) {
                $scope.formData = { 'productCode': user.productCode, 'optType': 2, 'shopCode': user.shopCode }
            } else if (status == 2) {
                $scope.formData = { 'productCode': user.productCode, 'optType': 1, 'shopCode': user.shopCode }
            }
            var result = ngDialog.open({
                template: 'app/product/productManage/productChange.html',
                scope: $scope,
                closeByDocument: false
            });
        }
    }

    //过滤操作类型
    $scope.fiterOperateStatus = function(value){
        if( value == 1 ){
            return '解冻产品';
        }else if( value == 2 ){
            return '冻结产品';
        }else if( value == 3 ){
            return '发布产品';
        }else{
            return '未知';
        }
    }
})
