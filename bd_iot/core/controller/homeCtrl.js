/**
 * Created by wanghui21 on 2015/5/18.
 */
(function(){
    exports.index = function (req, res) {
        res.render('index', { title: 'Express' });
    };

})();