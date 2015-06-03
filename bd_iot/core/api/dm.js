/**
 * Created by wanghui21 on 2015/6/2.
 */

(function () {
    var data =require("../data"),
        status = require("../status"),
        multer  = require('multer');

    exports.add_ota_version = function (req, res) {
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
        getMD5(req,res);
    };

    exports.ota_push_version = function(req, res){
        var ota_uuid = req.param("ota_uuid");
        var state = req.param("state");
        data.ota.ota_push_version(ota_uuid,state,function(err){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.send({code: status.ok});
        });
        console.log("push_ota_version"+req.param("ota_uuid"));
    };

    exports.ota_delete_version =function(req,res){
        var ota_uuid = req.param("ota_uuid");
        data.ota.ota_delete_version(ota_uuid,function(err){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.send({code: status.ok});
        });
    };

    var getMD5 = function(req,res){
        var path = req.files.file.path;
        var crypto = require('crypto');
        var fs = require('fs');
        var md5;

        var shasum = crypto.createHash('md5');

        var s = fs.ReadStream(path);
        s.on('data', function(d) {
            shasum.update(d);
        });

        s.on('end', function() {
            md5 = shasum.digest('hex');
            console.log(md5 + '  ' + path);
            req.files['file']['md5'] =md5;
            req.files['file']['path']=renameFile(req.files.file.path,md5);
            res.send(req.files);
        });
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
        fs.rename(path,newFilePath);
    }

})();