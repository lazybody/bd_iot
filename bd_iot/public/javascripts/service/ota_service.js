/**
 * Created by wanghui21 on 2015/6/2.
 */
var service = angular.module('ota_service',[]);

service.factory('ota',['$http',function($http){
    return {
        ota_version:{
            add:function(otaObj){
                return $http.post("/dm/add_ota",otaObj);
            },
            push:function(ota_uuid,state){
                return $http.put("/dm/ota_push",{"ota_uuid":ota_uuid,"state":state});
            },
            delete:function(ota_uuid){
                return $http.put("/dm/ota_delete",{"ota_uuid":ota_uuid});
            },
            get_for_uuid:function(ota_uuid){
                return $http.get("/dm/ota_get_version:"+ota_uuid);
            },
            update:function(otaObj){
                return $http.put("/dm/ota_update_version",otaObj);
            },
            check:function(device_id,product_id,version){
                return $http.get("/dm/ota_check_update?device_id="+device_id+"&product_id="+product_id+"&version="+version);
            }
        }
    };
}]);