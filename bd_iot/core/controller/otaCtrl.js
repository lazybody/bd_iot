/**
 * Created by wanghui21 on 2015/6/3.
 */
(function(){
    var data =require("../data"),
        status = require("../status");


    exports.add_version = function(req,res){
        res.render('ota/add_version',{title:'Add Version'});
    };


})();