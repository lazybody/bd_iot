
(function(){
    var controller = require("../core/controller");

    module.exports = function(app){
        app.get('/',controller.home.index);

    };
})();