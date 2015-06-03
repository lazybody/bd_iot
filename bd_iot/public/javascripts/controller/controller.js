/**
 * Created by wanghui21 on 2015/6/1.
 */
var iot = angular.module("iot",['angularFileUpload','ota_service']);

iot.controller('ota',['$scope','FileUploader','ota',
    function($scope,FileUploader,ota){
        var uploader = $scope.uploader = new FileUploader({
            url: '/dm/upload_ota_file'
        });
        $scope.upload_result;
        $scope.upload_result_str;
        $scope.res_str;
        $scope.fileObj = [] ;
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.upload_result_str = "上传成功";
            $scope.res_str=response;
            $scope.fileObj.url= response.file.path;
            $scope.fileObj.size = response.file.size;
            $scope.fileObj.md5 = response.file.md5;
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            $scope.upload_result_str = "上传失败";
        };

        $scope.save = function(){
            $scope.fileObj.ota_uuid = uuid();
            var str = {"ota_uuid":$scope.fileObj.ota_uuid,"version":$scope.fileObj.version,"type":$scope.fileObj.type,
                "firm_id":$scope.fileObj.firm_id,"product_id":$scope.fileObj.product_id,"url":$scope.fileObj.url,
                "size":$scope.fileObj.size,"md5":$scope.fileObj.md5,"description":$scope.fileObj.description,"state":"0"};
            ota.ota_version.add(str);
            window.location.href = "/dm/device_manager";
        };

        $scope.cancel = function(){
            window.location.href = "/dm/device_manager";
        };
    }]);

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}