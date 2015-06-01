/**
 * Created by wanghui21 on 2015/5/18.
 */
(function(){
    var status = require("../status");

    exports.index = function (req, res) {
        res.render('index', { title: 'Express' });
    };

    exports.test_add_device = function(req,res){
        res.render('test/add_device.html',{title:'addDevice'});
    };
    exports.get_devices_list = function(req,res){
        var devices = [{uuid:"123",user:"wang"},{uuid:"456",user:"hui"}];
        res.render('test/devices.html',{title:'devices',devices:devices});
    };

})();