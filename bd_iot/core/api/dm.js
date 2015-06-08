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

    exports.ota_update_version = function(req,res){
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
        console.log(otaObj);
        data.ota.ota_update_version(otaObj,function(err){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.send({code: status.ok});
        });
    }

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

    exports.ota_get_by_uuid =function(req,res){
        var ota_uuid = req.param("ota_uuid");
        data.ota.ota_get_by_uuid(ota_uuid.substring(1,ota_uuid.length),function(err,version){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            res.send({code: status.ok,data:version});
        });
    };

    exports.ota_check_update = function(req,res){
        var device_id = req.param("device_id");
        var product_id = req.param("product_id");
        var version = req.param("version");
        var callback = req.param("callback");
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers',' X-Requested-With');
        data.ota.ota_check_update("123",product_id,version,function(err,versions){
            if (err) {
                console.log(err);
                res.send({code: status.post_error.add_err});
            }
            var newVersions = [];
            for(var i =0;i < versions.length;i++){
                var versionItem = versions[i]['version'];
                if(checkVersion(version,versionItem)){
                    newVersions.push(versions[i]);
                }
            }
            var str="";
            if(callback) {
                str = "angular.callbacks._0(" + JSON.stringify(newVersions) + ")";
            }else{
                str = JSON.stringify(newVersions);
            }
            res.send(str);
        });
    };

    var checkVersion = function(version,newVersion){
        var verArray = version.split('.');
        var newVerArray = newVersion.split('.');
        console.log(version+","+newVersion);
        for(var i=0;i<verArray.length && i<newVerArray.length;i++){
            if(newVerArray[i] > verArray[i]){
                return true;
            }else if(newVerArray[i] < verArray[i]){
                return false;
            }
        }
        if(newVerArray.length > verArray.length){
            return true;
        }else{
            return false;
        }
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
        return newFileName;
    }

})();