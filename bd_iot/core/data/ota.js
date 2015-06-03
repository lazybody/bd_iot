/**
 * Created by wanghui21 on 2015/6/2.
 */
var util = require("util"),
    BaseData = require("./base"),
    mongoose = require('mongoose');

var otaData = function (schema) {
    this.Schema = schema;
    BaseData.call(this, mongoose.model("ota", schema));
    var self = this;
    this.add = function(otaObj,callback){
        var device = new this.model({
            ota_uuid:otaObj.uuid,
            version:otaObj.version,
            type:otaObj.type,
            firm_id:otaObj.firm_id,
            product_id:otaObj.product_id,
            url:otaObj.url,
            size:otaObj.size,
            md5:otaObj.md5,
            description:otaObj.description,
            state:otaObj.state
        });
        device.save(callback);
    };

    this.get_all_version = function (callback) {
        this.model.find({}, '', function (err, versions) {
            callback(err, versions);
        });
    };

    this.ota_push_version = function(ota_uuid,state,callback){
        this.model.update({"ota_uuid":ota_uuid}, {$set:{"state":state}}, function(err){
            callback(err);
        });
    };

    this.ota_delete_version =function(ota_uuid,callback){
        this.model.remove({"ota_uuid":ota_uuid},function(err){
            callback(err);
        });
    };

};
module.exports = otaData;