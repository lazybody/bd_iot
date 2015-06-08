/**
 * Created by wanghui21 on 2015/6/3.
 */
(function(){
    var data =require("../data"),
        status = require("../status");


    exports.add_ota_version = function(req,res){
        res.render('dm/add_version',{title:'Add Version'});
    };

    exports.device_manager = function(req,res){
        data.ota.get_all_version(function(err,versions){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.render('dm/device_manager',{title:'Device Manager',versions:versions});
        });
    };

    exports.user_device = function(req,res){
        var device = [];
        device.product_id = "GT555";
        device.version = "1.0";
        device.device_id = "12345678";
        res.render('dm/user_devices',{title:'Device',device_info:device});
    };


})();