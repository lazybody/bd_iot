/**
 * Created by wanghui21 on 2015/7/5.
 */
angular.module('erealm').factory('dm', ['$http', function ($http) {
    return{
        getAllVersions:function(req,res){
            return $http.get('/dm/otas');
        }
    }
}]);