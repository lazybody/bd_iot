
(function(){
    var controller = require("../core/controller"),
        api = require("../core/api");

    module.exports = function(app){
        app.get('/',controller.home.index);

        app.get('/device_manager',controller.home.device_manager);
        app.get('/add_version',controller.home.add_version);

        app.get('/test/add_device',controller.home.test_add_device);
        app.get('/test/devices',controller.home.get_devices_list);

        app.post('/device/add',api.device.add);
    };
})();