/**
 * Created by wanghui21 on 2015/5/26.
 */

var mongoose = require('mongoose'),
    schemas = require("./model/schema"),
    DeviceData = require("./device"),
    otaData = require("./ota"),
    connectTimes = 0;

var connect = function () {
    connectTimes++;
    if(connectTimes > 5){
        return;
    }
    var options = { server: { socketOptions: { keepAlive: 1 } } }
    mongoose.connect("mongodb://127.0.0.1/iot", options, function (err) {
        if (err) {
            console.log("connect mongodb " + err);
        }else{
            console.log("connect mongodb successfully...");
        }
    });
};

connect();


module.exports = {
    Device: new DeviceData(schemas.device),
    ota:new otaData(schemas.ota)
};