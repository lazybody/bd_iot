/**
 * Created by wanghui21 on 2015/7/5.
 */
angular.module('erealm').controller('otaController', ['$scope','FileUploader',
    function ($scope,FileUploader) {
        angular.extend($scope, {subTitle: "Hello, We are", mainTitle: "eRealm Info & Tech", currentPage: "dm-page"});
        $scope.upload_result;
        $scope.uploadResultStr;
        $scope.res_str;
        var path_name = window.location.pathname;
        $scope.fileObj;
        var uploader = $scope.uploader = new FileUploader({
         url: '/ota/upload_file'
         });
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $scope.uploadResultStr = "上传成功";
            $scope.res_str = response;
            $scope.fileObj.url = response.file.path;
            $scope.fileObj.size = response.file.size;
            $scope.fileObj.md5 = response.file.md5;
            $scope.file_ok = null;
            //$scope.res_str = $scope.fileObj.url;
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            $scope.uploadResultStr = "上传失败";
            $scope.file_ok = null;
        };
        $scope.save = function () {
            if (!$scope.fileObj.productId) {
                $scope.productIdErr = "请选择产品型号";
                return;
            } else if (!$scope.fileObj.type) {
                $scope.typeErr = "请选择升级类型";
                return;
            } else if (!$scope.fileObj.version) {
                $scope.versionErr = "请填写版本号";
                return;
            } else if (!$scope.fileObj.description) {
                $scope.descriptionErr = "请填写描述";
                return;
            } else if (!$scope.fileObj.url) {
                $scope.file_ok = 1;
                return;
            }
            var edit = true;
            $scope.fileObj.firm_id = "123";
            if (!$scope.fileObj.ota_uuid) {
                $scope.fileObj.ota_uuid = uuid();
                edit = false;
            }
            var str = {"ota_uuid": $scope.fileObj.ota_uuid, "version": $scope.fileObj.version, "type": $scope.fileObj.type,
                "firm_id": $scope.fileObj.firm_id, "productId": $scope.fileObj.productId, "url": $scope.fileObj.url,
                "size": $scope.fileObj.size, "md5": $scope.fileObj.md5, "description": $scope.fileObj.description, "state": "0", "address": $scope.address_result};
            if (!edit) {
                ota.ota_version.add(str).success(function (result) {
                    window.location.href = "/ota/ota_manager";
                });
            } else {
                ota.ota_version.update(str).success(function (result) {
                    window.location.href = "/ota/ota_manager";
                });
            }
        };

        $scope.cancel = function () {
            window.location.href = "/";
        };

        var vm = $scope.vm = {};
        $scope.address_result = "";
        vm.cities = [
            [
                {province: '全国'}
            ],
            [
                {province: '北京市'},
                {province: '天津市'},
                {province: '上海市'}
            ],
            [
                {province: '重庆市'},
                {province: '河北省'},
                {province: '河南省'}
            ],
            [
                {province: '云南省'},
                {province: '辽宁省'},
                {province: '黑龙江省'}
            ],
            [
                {province: '湖南省'},
                {province: '安徽省'},
                {province: '山东省'}
            ],
            [
                {province: '新疆维吾尔'},
                {province: '江苏省'},
                {province: '浙江省'}
            ],
            [
                {province: '江西省'},
                {province: '湖北省'},
                {province: '广西壮族'}
            ],
            [
                {province: '甘肃省'},
                {province: '山西省'},
                {province: '内蒙古'}
            ],
            [
                {province: '陕西省'},
                {province: '吉林省'},
                {province: '福建省'}
            ],
            [
                {province: '贵州省'},
                {province: '广东省'},
                {province: '青海省'}
            ],
            [
                {province: '西藏'},
                {province: '四川省'},
                {province: '宁夏回族'}
            ],
            [
                {province: '海南省'},
                {province: '台湾省'},
                {province: '香港特别行政区'}
            ],
            [
                {province: '澳门特别行政区'}
            ]
        ];
        vm.check = function (city) {
            city.checked = !city.checked
            if (vm.cities[0][0] == city) {
                vm.set_all_checked(city.checked);
            } else {
                vm.cities[0][0].checked = vm.is_all_checked();
            }
            $scope.address_result = vm.selection();
        }

        vm.is_all_checked = function () {
            for (var i = 1; i < vm.cities.length; i++) {
                var group_cities = vm.cities[i];
                for (var j = 0; j < group_cities.length; j++) {
                    if (!group_cities[j].checked) {
                        return false;
                    }
                }
            }
            return true;
        };

        vm.set_all_checked = function (checked) {
            for (var i = 1; i < vm.cities.length; i++) {
                var group_cities = vm.cities[i];
                for (var j = 0; j < group_cities.length; j++) {
                    group_cities[j].checked = checked;
                }
            }
        };

        vm.get_checked = function (str_check) {
            var cities = str_check.split(",");
            if (cities.length <= 0) {
                return [];
            }
            var k = 0;
            for (var i = 0; i < vm.cities.length; i++) {
                var group_cities = vm.cities[i];
                for (var j = 0; j < group_cities.length; j++) {
                    if (group_cities[j].province == cities[k]) {
                        group_cities[j].checked = true;
                        if (k == cities.length - 1) {
                            break;
                        } else {
                            k++;
                        }
                    }
                }
            }
            if (vm.cities[0][0].checked) {
                vm.set_all_checked(true);
            }
        };

        vm.selection = function () {
            var checkCities = [];
            if (vm.cities[0][0].checked) {
                checkCities.push(vm.cities[0][0].province);
                return checkCities;
            }
            for (var i = 1; i < vm.cities.length; i++) {
                var group_cities = vm.cities[i];
                for (var j = 0; j < group_cities.length; j++) {
                    if (group_cities[j].checked) {
                        checkCities.push(group_cities[j].province);
                    }
                }
            }
            return checkCities;
        };
    }]);