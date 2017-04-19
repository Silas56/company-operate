/**
 * Created by JOY on 16/12/22.
 */

myApp.controller('tribeIndex', function($scope, $http, $filter, ngDialog ,$timeout) {
	$scope.applyDesc = "desc";
	$scope.applyDown = true;
//配置分页基本参数
	$scope.paginationConf = {
		itemsPerPage: 10,
		currentPage: 1
	};
//部落查询================================================================
$scope.tribeSearch={};
$scope.tribeSearch.tribeName="";
$scope.tribeOnSearchForStatus = function () {
    $scope.tribeSearch.tribeStatus = $scope.tribeStatus;
    $scope.tribeOnSearch();
}
$scope.tribeOnSearch=function(){
	var tribeNameForModify = $scope.tribeSearch.tribeName;
    tribeNameForModify = String(tribeNameForModify);
    var newTribeName = tribeNameForModify.replace(/[%_']{1,}/,"");
    $scope.tribeSearch.tribeName = newTribeName;
    // console.log(newTribeName,"tribeNameForModify");
	var url = "/operateManage/api/tribe/queryTribeList.json";
	$scope.tribeSearch.pageNum = $scope.paginationConf.currentPage;
	$scope.tribeSearch.pageSize = $scope.paginationConf.itemsPerPage;
	$scope.tribeSearch.tribeName =$scope.tribeSearch.tribeName;
	$scope.tribeSearch.chiefName =$scope.tribeSearch.chiefName;

// console.info($scope.tribeSearch);
	$http.post(url, $scope.tribeSearch).success(function(data) {
		// console.info("部落查询接口获取成功",typeof data);
		if(data.code != 100){
            // showMessage(ngDialog,data.msg);
		}else{
            $scope.tribes = data.tribeInfoPage.beans;
// 重置分页
            $scope.paginationConf = {
                currentPage: $scope.tribeSearch.pageNum,
                totalItems: data.tribeInfoPage.total,
                itemsPerPage: $scope.tribeSearch.pageSize,
                pagesLength: 8,
                perPageOptions: [10, 20, 30, 40, 50],
                onChange: function() {}
            };
		}

	}).error(function(err){console.log(err)})

	
}
$scope.descFun = function() {
	$scope.applyDown = !$scope.applyDown;
	//		$scope.param.sortField = "createTime";
	if ($scope.applyDesc == "asc") {
		$scope.param.sortType = "desc";
		$scope.applyDesc = "desc";
	} else {
		$scope.param.sortType = "asc";
		$scope.applyDesc = "asc";
	}
    $scope.tribeOnSearch();
}

  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.tribeOnSearch);

});
	

