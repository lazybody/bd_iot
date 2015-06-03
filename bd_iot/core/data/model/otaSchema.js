/**
 * Created by wanghui21 on 2015/6/2.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ota = new Schema({
    ota_uuid:{type: String },
    version:{type: String },
    type:{type: String },
    firm_id:{type: String },
    product_id:{type: String },
    url:{type: String },
    size:{type: String },
    md5:{type: String },
    description:{type: String },
    state:{type: String }
});

module.exports = ota;