
(function(){
    var controller = require("../core/controller"),
        api = require("../core/api"),
        multer  = require('multer');

    module.exports = function(app){
        app.get('/',controller.home.index);

        app.get('/dm/device_manager',controller.dm.device_manager);
        app.get('/dm/add_version:ota_uuid',controller.dm.add_ota_version);
        app.get('/dm/ota_get_version:ota_uuid',api.dm.ota_get_by_uuid);

        var otaMulter = multer({ dest: './public/ota/' });
        app.post('/dm/upload_ota_file',otaMulter,api.dm.upload_ota_file);
        app.post('/dm/add_ota',api.dm.add_ota_version);
        app.put('/dm/ota_push',api.dm.ota_push_version);
        app.put('/dm/ota_delete',api.dm.ota_delete_version)
        app.put('/dm/ota_update_version',api.dm.ota_update_version);
        app.get('/dm/ota_check_update',api.dm.ota_check_update);

        app.get('/test/add_device',controller.home.test_add_device);
        app.get('/test/devices',controller.home.get_devices_list);

        app.post('/device/add',api.device.add);
    };
})();