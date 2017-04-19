/**
 * Created by dengrunquan on 16/4/22.
 */

myApp.controller('shopAuth',function($scope,$http,$routeParams, ngDialog){
	
    //认证信息
    var basicUrl =  ctx + "shop/queryShopAuthentication.json?shopCode="+$routeParams.shopCode;
    $http.get(basicUrl).success(function(data){
        console.info(data);
        $scope.authInfo = data;
        $scope.picArr = new Array();
        $scope.picNameArr = new Array();
        if(!isBlank( $scope.authInfo.certificateFrontImg)){
        	$scope.picArr[$scope.picArr.length] =  $scope.authInfo.certificateFrontImg;
        	$scope.picNameArr[$scope.picNameArr.length] =  '身份证正面照';
        }
        if(!isBlank( $scope.authInfo.certificateBackImg)){
        	$scope.picArr[$scope.picArr.length] =  $scope.authInfo.certificateBackImg;
        	$scope.picNameArr[$scope.picNameArr.length] =  '身份证反面照';
        }
        if(!isBlank( $scope.authInfo.handlerCertificateImg)){
        	$scope.picArr[$scope.picArr.length] =  $scope.authInfo.handlerCertificateImg;
        	$scope.picNameArr[$scope.picNameArr.length] =  '手持证件照';
        }
        if(!isBlank( $scope.authInfo.businessLicenseImg)){
        	$scope.picArr[$scope.picArr.length] =  $scope.authInfo.businessLicenseImg;
        	$scope.picNameArr[$scope.picNameArr.length] =  '营业执照';
        }
        if(!isBlank( $scope.authInfo.taxRegCertImg)){
        	$scope.picArr[$scope.picArr.length] =  $scope.authInfo.taxRegCertImg;
        	$scope.picNameArr[$scope.picNameArr.length] =  '税务登记证';
        }
        if(!isBlank( $scope.authInfo.organizationCode)){
        	$scope.picArr[$scope.picArr.length] =  $scope.authInfo.organizationCode;
        	$scope.picNameArr[$scope.picNameArr.length] =  '组织机构代码';
        }
    });
    
    $scope.showBigPic = function(imgSrc,imgName){
    	$scope.imgSrc = imgSrc;
    	$scope.imgName = imgName;
    	if(isBlank(imgSrc)){
    		return;
    	}
    	ngDialog.open({
			template: 'app/shop/view/picBigShow.html',
			scope: $scope,
			closeByDocument:false
		});
    }
    
});