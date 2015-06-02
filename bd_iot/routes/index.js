
(function(){
    var controller = require("../core/controller"),
        api = require("../core/api"),
        multer  = require('multer');

    module.exports = function(app){
        app.get('/',controller.home.index);

        app.get('/dm/device_manager',controller.home.device_manager);
        app.get('/add_version',controller.home.add_version);

        var otaMulter = multer({ dest: './ota/' });
        app.post('/dm/upload_ota_file',otaMulter,api.device.upload_ota_file);

        app.get('/test/add_device',controller.home.test_add_device);
        app.get('/test/devices',controller.home.get_devices_list);

        app.post('/device/add',api.device.add);
    };
})();