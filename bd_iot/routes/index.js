
(function(){
    var controller = require("../core/controller"),
        api = require("../core/api"),
        multer  = require('multer');

    module.exports = function(app){
        app.get('/',controller.home.index);

        app.get('/dm/device_manager',controller.dm.device_manager);
        app.get('/dm/add_version',controller.dm.add_ota_version);

        var otaMulter = multer({ dest: './public/ota/' });
        app.post('/dm/upload_ota_file',otaMulter,api.dm.upload_ota_file);
        app.post('/dm/add_ota',api.dm.add_ota_version);

        app.get('/test/add_device',controller.home.test_add_device);
        app.get('/test/devices',controller.home.get_devices_list);

        app.post('/device/add',api.device.add);
    };
})();