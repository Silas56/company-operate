

   myApp.directive('treeView',[function(){
   
   return {
      restrict: 'E',
      templateUrl: '/treeView.html',
      scope: {
        treeData: '=',
        canChecked: '=',
        textField: '@',
        itemClicked: '&',
        renderPermissionList:'=',
        itemCheckedChanged: '&',
        itemTemplateUrl: '@'
      },
     controller:['$scope', function($scope){     
       $scope.noChild=function(item){
            if(item.children==undefined){
                 return !item.children || !item.children.length;
            }
       };
       


       $scope.warpCallback = function(callback, item, $event){
          ($scope[callback] || angular.noop)({
           $item:item,
           $event:$event,
         });
       };
     }]
   };

 }]);