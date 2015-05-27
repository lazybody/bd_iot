/**
 * Created by wanghui21 on 2015/5/26.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var device = new Schema({
    uuid:{type: String },
    user:{type:String}
});

module.exports = device;