/**
 * Created by wanghui21 on 2015/5/26.
 */
(function () {
    var data =require("../data");
        status = require("../status"),

    exports.add = function (req, res) {
        var id = req.param("uuid"),
            user = req.param("user");
        data.Device.add(id,user,function(err){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.send({code: status.ok});
        });

    };
})();