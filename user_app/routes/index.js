
(function(){
    var controller = require("../core/controller");

    module.exports = function(app){
        app.get('/',controller.home.index);

        app.get('/test/add_device',controller.home.test_add_device);
        app.get('/test/devices',controller.home.get_devices_list);
    };
})();