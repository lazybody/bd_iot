/**
 * Created by wanghui21 on 2015/6/2.
 */

(function () {
    var data =require("../data"),
        status = require("../status"),
        multer  = require('multer');

    exports.add_ota_version = function (req, res) {
        var id = req.param("uuid"),
            user = req.param("user");
        var otaObj = [];
        otaObj.uuid = req.param("ota_uuid");
        otaObj.version = req.param("version");
        otaObj.type = req.param("type");
        otaObj.firm_id = req.param("firm_id");
        otaObj.product_id = req.param("product_id");
        otaObj.url = req.param("url");
        otaObj.size = req.param("size");
        otaObj.md5 = req.param("md5");
        otaObj.description = req.param("description");
        otaObj.state = req.param("state");
        data.ota.add(otaObj,function(err){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.send({code: status.ok});
        });
    };

    exports.upload_ota_file = function(req,res){
        var md5 = getMD5(req.files.file.path);
        req.files['file']['md5'] =md5;
        req.files['file']['path']=renameFile(req.files.file.path,md5);
        res.send(req.files);
    };

    var getMD5 = function(path){
        return "123456789";
    }

    var renameFile = function(path,md5){
        var filePath = path.split('\\');
        var fileName = filePath[filePath.length-1];
        console.log(fileName);
        var newFileName;
        var indexDot = fileName.lastIndexOf('.');
        if(indexDot <0){
            newFileName = md5;
        }else{
            newFileName = md5 + fileName.substring(indexDot);
        }
        filePath[filePath.length-1] = newFileName;
        var newFilePath = filePath.join("\\");
        var fs = require("fs");
        fs.rename(path,newFilePath)
    }

})();