/*
* 
* 路由控制
*/

var config = require('../config/app.json');

module.exports = function (app) {
    app.get('/',function (req,res) {
        res.render('index',config);
    });

    app.get(/^(\/common\/(\w+)(\/)?)?$/, function (req, res) {
        // console.log(req.params)
        res.render(req.params[1], app_config);
    });

    // app.get(/^(\/mobile\/(\w+)(\/)?)?$/,function (req,res) {
    //    res.render('mobile' + req.param[1],config);
    // });
};