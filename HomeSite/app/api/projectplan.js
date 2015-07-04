/**
 * Copyright 2014 eRealm Info & Tech.
 *
 * Created by Don on 9/11/2014.
 */

'use strict';

var config = require('../../lib/config'),
    mailer = require('../helper/mailer');

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
}

var cn = require('./data/content_cn.json');
var en = require('./data/content_en.json');

exports.sendProject = function(req, res) {
    var   name = req.body.name;
    var   email = req.body.email;
    var   message = req.body.message;
    var   company = req.body.company;
    var   type = req.body.type;
    var   telephone = req.body.telephone;
    var   budget = req.body.budget;

    req.checkBody('name', 'Invalid postparam').notEmpty().len(0, 20);
    req.checkBody('email', 'Invalid postparam').notEmpty().isEmail().len(0, 50);
    req.checkBody('message', 'Invalid postparam').notEmpty().len(0, 300);
    req.checkBody('company', 'Invalid postparam').notEmpty().len(0, 30);
    req.checkBody('type', 'Invalid postparam').notEmpty().len(0, 20);
    req.checkBody('telephone', 'Invalid postparam').notEmpty().len(0, 14);
    req.checkBody('budget', 'Invalid postparam').notEmpty().len(0, 20);

    var errors = req.validationErrors();
    if (errors) {
        res.send('There have been validation errors', 400);
        return;
    }

    var storagekey = parseCookies(req).NG_TRANSLATE_LANG_KEY;
    var language = '';
    if (storagekey === '"cn"') {
        language = cn;
    } else {
        language = en;
    }
    mailer.sendTemplate(name + '<' + email + '>', 'messagePlanReciced', {
        language: language,
        fullName: name
    });
    mailer.sendTemplate(config.support, 'newProjectplanMessage', {
        language: language,
        name: name,
        email: email,
        message: message,
        company: company,
        type: type,
        telephone: telephone,
        budget: budget
    });
    console.log(storagekey);

    //save the email message into mongodb
    require('../helper/saveEmail').saveMessage({
        language: language,
        name: name,
        email: email,
        message: message,
        company: company,
        type: type,
        telephone: telephone,
        budget: budget
    });

    res.json({
        code: 200,
        success: true
    });
};
