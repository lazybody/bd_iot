/**
 * Created by wanghui21 on 2015/5/26.
 */
var util = require("util"),
    BaseData = require("./base"),
    mongoose = require('mongoose');

var DeviceData = function (schema) {
    this.Schema = schema;
    BaseData.call(this, mongoose.model("devices", schema));
    var self = this;
    this.add = function(id,name,callback){
        var device = new this.model({
           uuid:id,
           user:name
        });
        device.save(callback);
    };

    this.get_devices_list = function(callback){
        this.model.find({},'',function(err,devices){
           callback(err,devices);
        });
    };
};
module.exports = DeviceData;