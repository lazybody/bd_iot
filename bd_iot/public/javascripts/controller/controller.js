/**
 * Created by wanghui21 on 2015/6/1.
 */
var iot = angular.module("iot",['angularFileUpload']);

iot.controller('ota',['$scope','FileUploader',
    function($scope,FileUploader){
        var uploader = $scope.uploader = new FileUploader({
            url: '/dm/upload_ota_file'
        });
        $scope.upload_result;
        $scope.upload_result_str;
        $scope.res_str;
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.upload_result_str = "上传成功";
            $scope.res_str=response;
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            $scope.upload_result_str = "上传失败";
        };

        $scope.cancel = function(){
            window.location.href = "/dm/device_manager";
        };
    }]);