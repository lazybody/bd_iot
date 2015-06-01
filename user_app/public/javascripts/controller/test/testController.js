/**
 * Created by wanghui21 on 2015/5/26.
 */
var app = angular.module("test",['device_service']);

app.controller('addDevice',['$scope','data',
    function($scope,data){
        $scope.register = function(){
            //data.device.add($scope.device_id,$scope.device_user);
            window.location.href = "/test/devices";
        }
    }]);