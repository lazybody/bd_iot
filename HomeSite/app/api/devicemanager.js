/**
 * Created by wanghui21 on 2015/7/5.
 */

exports.editVersion = function (req, res) {

};

exports.ota = function (req, res) {
    var versions = [
        {'product_id':'MT555','version':'1.0','description':'测试版本','type':0,'state':'0'},
        {'product_id':'GT333','version':'1.3','description':'正式版本','type':1,'state':'1'}
    ];
    res.send(versions);
};
