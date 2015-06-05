/**
 * Created by wanghui21 on 2015/6/4.
 */
var app = angular.module("iot",['ota_service']);

app.controller('ota',['$scope','ota',
    function($scope,ota){
        $scope.product_id = "GT555";
        $scope.version = "1.0";
        $scope.device_id = "12345678";
        $scope.check_update = "111";

        $scope.check_version = function(){
            ota.ota_version.check($scope.device_id,$scope.product_id,$scope.version)
                .success(function(result){
                    $scope.check_update = result;
                }).error(function(err){
                    $scope.check_update = "error";
                });
        }
    }]);