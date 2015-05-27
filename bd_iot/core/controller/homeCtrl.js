/**
 * Created by wanghui21 on 2015/5/18.
 */
(function(){
    exports.index = function (req, res) {
        res.render('index', { title: 'Express' });
    };

    exports.test_add_device = function(req,res){
        res.render('test/add_device.html',{title:'addDevice'});
    };
    exports.get_devices_list = function(req,res){
        res.render('test/devices.html',{title:'devices'});
    };

})();