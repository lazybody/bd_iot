/**
 * Created by wanghui21 on 2015/6/1.
 */
var iot = angular.module("iot", ['angularFileUpload', 'ota_service']);

iot.controller('ota', ['$scope', 'FileUploader', 'ota',
    function ($scope, FileUploader, ota) {

        $scope.push = function (ota_uuid, state) {
            ota.ota_version.push(ota_uuid, state)
                .success(function (result) {
                    window.location.href = "/dm/device_manager";
                }).err(function (err) {

                });
        };

        $scope.edit = function(ota_uuid){
            window.location.href = "/dm/add_version:"+ota_uuid;
        }

        $scope.delete = function(ota_uuid){
            ota.ota_version.delete(ota_uuid)
                .success(function (result) {
                    window.location.href = "/dm/device_manager";
                }).err(function (err) {

                });
        };

    }]);

iot.controller('edit_version', ['$scope', 'FileUploader', 'ota',
    function ($scope, FileUploader, ota) {
        var uploader = $scope.uploader = new FileUploader({
            url: '/dm/upload_ota_file'
        });
        $scope.upload_result;
        $scope.upload_result_str;
        $scope.res_str;
        var path_name = window.location.pathname;
        $scope.fileObj;
        if(path_name.charAt(path_name.length-1) == ":") {
            $scope.fileObj = [];
        }else{
            var path_split = path_name.split(":");
            $scope.ota_uuid = path_split[path_split.length-1];
            ota.ota_version.get_for_uuid($scope.ota_uuid)
                .success(function(result){
                    $scope.fileObj = result.data;
                });
        }
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.upload_result_str = "上传成功";
            $scope.res_str = response;
            $scope.fileObj.url = response.file.path;
            $scope.fileObj.size = response.file.size;
            $scope.fileObj.md5 = response.file.md5;
            $scope.file_ok = null;
            //$scope.res_str = $scope.fileObj.url;
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            $scope.upload_result_str = "上传失败";
            $scope.file_ok = null;
        };

        $scope.save = function () {
            if(!$scope.fileObj.product_id){
                $scope.product_id_err = "请选择产品型号";
                return;
            }else if(!$scope.fileObj.type){
                $scope.type_err = "请选择升级类型";
                return;
            }else if(!$scope.fileObj.version){
                $scope.version_err = "请填写版本号";
                return;
            }else if(!$scope.fileObj.description){
                $scope.description_err = "请填写描述";
                return;
            }else if(!$scope.fileObj.url){
                $scope.file_ok = 1;
                return;
            }
            var edit = true;
            $scope.fileObj.firm_id = "123";
            if(!$scope.fileObj.ota_uuid) {
                $scope.fileObj.ota_uuid = uuid();
                edit = false;
            }
            var str = {"ota_uuid": $scope.fileObj.ota_uuid, "version": $scope.fileObj.version, "type": $scope.fileObj.type,
                "firm_id": $scope.fileObj.firm_id, "product_id": $scope.fileObj.product_id, "url": $scope.fileObj.url,
                "size": $scope.fileObj.size, "md5": $scope.fileObj.md5, "description": $scope.fileObj.description, "state": "0"};
            if(!edit) {
                ota.ota_version.add(str).success(function (result) {
                    window.location.href = "/dm/device_manager";
                });
            }else{
                ota.ota_version.update(str).success(function(result){
                    window.location.href = "/dm/device_manager";
                });
            }
        };

        $scope.cancel = function () {
            window.location.href = "/dm/device_manager";
        };
    }]);

iot.controller('device_info',['$scope','ota',
    function($scope,ota){
        $scope.check_result = "";
        $scope.check_update = "";
        $scope.check_version = function(device_id,product_id,version){
            ota.ota_version.check(device_id,product_id,version)
                .success(function(result){
                    if(result.length>0){
                        $scope.check_result = "发现新版本";
                    }else{
                        $scope.check_result = "已经是最新版本";
                    }
                    $scope.check_update = result;
                }).error(function(err){
                    $scope.check_update = "error";
                });
        }
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