/**
 * Created by wanghui21 on 2015/6/4.
 */
var service = angular.module('ota_service',[]);

service.factory('ota',['$http',function($http){
    return {
        ota_version:{
            check:function(device_id,product_id,version){
                return $http.jsonp("http://localhost:3000/dm/ota_check_update?device_id="+device_id+"&product_id="+product_id+"&version="+version+"&callback=JSON_CALLBACK");
            }
        }
    };
}]);