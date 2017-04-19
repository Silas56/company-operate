myApp.controller('filterWords', function($scope, $http, ngDialog) {
    // var PAGE_SIZE = 20;
    $scope.paginationConf = {
		itemsPerPage: 20,
		currentPage: 1
	};
    $scope.param = {letter: null};
    $scope.indexs = ['全部'].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));

    $scope.sortByIndex = function (letter) {
        if($scope.lastIndex) $scope.lastIndex.isActive = false;
        $scope.lastIndex = this;
        this.isActive = true;
        $scope.param.letter = letter === '全部' ? null : letter;
        $scope.onSearch();
    }

    $scope.openAddDialog = function () {
        ngDialog.open({
            template: 'app/datacenter/filter/addFilterWord.html',
            scope: $scope,
            closeByDocument: false
        });
    }

    $scope.deleteSelectWord = function() {
        var words = [];
        $('[name="filterWordsCheck"]').each(function(index, el){
            if(el.checked) {
                words.push(el.value);
            }
        });
        if(words.length) {
            $scope.curDelWord = words.join(',');
            ngDialog.open({
                template: 'app/datacenter/filter/delFilterWord.html',
                scope: $scope,
                closeByDocument: false
            });
        }else {
            showMessage(ngDialog, '请勾选要删除的滤词');
        }
    }

    $scope.deleteWord = function(keyword) {
        $scope.curDelWord = keyword;
        ngDialog.open({
            template: 'app/datacenter/filter/delFilterWord.html',
            scope: $scope,
            closeByDocument: false
        });
    }

    $scope.onMalulSearch = function () {
        $scope.paginationConf.currentPage = 1;
        $scope.onSearch();
    }

    $scope.onSearch = function () {
        var url = ctx + 'evaluate/queryEvaluateFilterWords.json';
        
        $scope.param.pageNum = $scope.paginationConf.currentPage;
        $scope.param.pageSize = $scope.paginationConf.itemsPerPage;

        $http.get(url, {params:$scope.param}).success(function(data) {
            if(data.respCode == 100) {
                $scope.words = data.evaluateFilterWords;
            }

            $scope.paginationConf = {
				currentPage: $scope.param.pageNum,
				totalItems: data.total,
				itemsPerPage: $scope.param.pageSize,
				pagesLength: 8,
				perPageOptions: [10, 20, 30, 40, 50]
			};
		});
    }

    $scope.onSearch();

    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.onSearch);
});