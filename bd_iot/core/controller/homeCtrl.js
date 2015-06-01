/**
 * Created by wanghui21 on 2015/5/18.
 */
(function(){
    var data =require("../data"),
        status = require("../status");

    exports.index = function (req, res) {
        res.render('index', { title: 'Express' });
    };

    exports.device_manager = function(req,res){
        res.render('ota/device_manager',{title:'Device Manager'});
    };

    exports.add_version = function(req,res){
        res.render('ota/add_version',{title:'Add Version'});
    };

    exports.test_add_device = function(req,res){
        res.render('test/add_device.html',{title:'addDevice'});
    };
    exports.get_devices_list = function(req,res){
        data.Device.get_devices_list(function(err,devices){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.render('test/devices.html',{title:'devices',devices:devices});
        });

    };

})();