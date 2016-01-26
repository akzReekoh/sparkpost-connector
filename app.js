'use strict';

var platform = require('./platform'),
    isEmpty = require('lodash.isempty'),
    isPlainObject = require('lodash.isplainobject'),
    config,
    sparkPostClient;

platform.on('data', function (data) {
    if(isPlainObject(data)){
        if(isEmpty(data.template_id))
            data.template_id = config.default_template_id;

        if(isEmpty(data.recipients))
            data.recipients = config.default_recipients;

        sparkPostClient.sendMail({
            content : {template_id: data.template_id},
            recipients : data.recipients
        }, function(error, info){
            if(error){
                console.error(error);
                platform.handleException(error);
            }
            else{
                platform.log(JSON.stringify({
                    title: 'SparkPost Email sent.',
                    data: data
                }));
            }
        });
    }
    else
        platform.handleException(new Error('Invalid data received. Must be a valid JSON Object. Data ' + data));
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {
    config = options;

    var nodemailer = require('nodemailer');
    var sparkPostTransport = require('nodemailer-sparkpost-transport');

    sparkPostClient = nodemailer.createTransport(sparkPostTransport({
        sparkPostApiKey: options.api_key
    }));

	platform.notifyReady();
	platform.log('Connector has been initialized.');
});