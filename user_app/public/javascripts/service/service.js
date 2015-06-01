/**
 * Created by wanghui21 on 2015/5/26.
 */
var service = angular.module('device_service',[]);

service.factory('data',['$http',function($http){
    return {
        device:{
            add:function(id,name){
                console.log("my id="+id+",name="+name);
            }
        }
    };
}]);