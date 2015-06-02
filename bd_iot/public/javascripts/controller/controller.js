/**
 * Created by wanghui21 on 2015/6/1.
 */
var iot = angular.module("iot",['angularFileUpload']);

iot.controller('ota',['$scope','FileUploader',
    function($scope,FileUploader){
        var uploader = $scope.uploader = new FileUploader({
            url: '/dm/upload_ota_file'
        });
        /*$scope.onFileSelect = function($files) {
            console.log("file count="+$files.length);
            for(var i=0; i < $files.length;i++){
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url:'/dm/upload_ota_file',
                    file:file
                }).progress(function(evt){

                }).success(function(data,status,headers,config){

                });
            }
        };*/

        $scope.cancel = function(){
            window.location.href = "/dm/device_manager";
        };
    }]);