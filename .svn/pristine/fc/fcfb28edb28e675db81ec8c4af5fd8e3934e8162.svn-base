/**
 * Created by dengrunquan on 16/4/27.
 */
myApp.directive("recursion", function(RecursionHelper) {
    return {
        restrict:'A',
        scope: {recursion:'='},
        


        template: '<div class="disp-inline" ng-repeat="item in recursion" style="padding:2px 20px;width: 500px;">\
                        <input type="checkbox" value="{{item.resourceCode}}" ng-checked="item.checked" onchange="choiceParent($(this),1)" name="authResDatas" >{{item.name}}\
                        <div recursion="item.children">\
                        </div>\
                    </div>',
        compile: function(element){
            return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn){
                // Define your normal link function here.
                // Alternative: instead of passing a function,
                // you can also pass an object with
                // a 'pre'- and 'post'-link function.
            });
        }
    };
});

/**
 * 选择上级
 * 1 为本级，2 为上级
 */
function choiceParent(myObj,type){
    var sname = "authResDatas";
    if(myObj.attr("name") == sname){
        //上级选择上
        if(myObj.prop('checked')){
            //下级
            if(type == 1){
                var childrenBox = myObj.parent().find("input[type='checkbox']");
                if(childrenBox.attr("name") == sname){
                    childrenBox.prop('checked',true);
                }
            }
            //上级
            if(myObj.parent().parent().prev()){
                var parentObj = myObj.parent().parent().prev();
                if(parentObj.attr("name") == sname){
                    parentObj.prop('checked',true);
                    choiceParent(parentObj,2);
                }
            }
        }
        //下级都非选
        if(!myObj.prop('checked')){
            //下级
            if(type == 1){
                var childrenBox = myObj.parent().find("input[type='checkbox']");
                if(childrenBox.attr("name")){
                    childrenBox.prop('checked',false);
                }
            }
            //上级
            if(myObj.parent().parent().prev()){
                var parentObj = myObj.parent().parent().prev();
                if(parentObj.attr("name") == sname){
                    var childrenBox = parentObj.next().find("input[type='checkbox']");
                    var ischeck = false;
                    for(var i in childrenBox){
                        if(childrenBox.get(i).checked){
                            ischeck = true;
                            break;
                        }
                    }
                    if(ischeck == false){
                        parentObj.prop('checked',false);
                        choiceParent(parentObj,2);
                    }
                }
            }
        }
    }
}


