/**
 * Created by wanghui21 on 2015/6/2.
 */
var service = angular.module('ota_service',[]);

service.factory('ota',['$http',function($http){
    return {
        ota_version:{
            add:function(otaObj){
                return $http.post("/dm/add_ota",otaObj);
            }
        }
    };
}]);