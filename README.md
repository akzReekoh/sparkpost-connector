# SparkPost Connector
[![Build Status](https://travis-ci.org/Reekoh/sparkpost-connector.svg)](https://travis-ci.org/Reekoh/sparkpost-connector)
![Dependencies](https://img.shields.io/david/Reekoh/sparkpost-connector.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/sparkpost-connector.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

SparkPost Connector Plugin for the Reekoh IoT Platform. Integrates a Reekoh instance with SparkPost to send emails/notifications.

## Description
This plugin sends emails/notifications based on devices' data connected to the Reekoh Instance to SparkPost.

## Configuration
To configure this plugin, a SparkPost account is needed to provide the following:

1. API Key - The SparkPost API to use.

Other Parameters:

1. Default Template ID - The Email template ID to be used.
2. Default Recipients - The default recipient(s) in which the email will be sent.

These parameters are then injected to the plugin from the platform.

## Sample input data
```
{
        recipients: [
            {
                'address': {
                    'email': 'akzdinglasan@gmail.com',
                    'name': 'Achilles Dinglasan'
                }
            }
        ],
        template_id: 'my-first-email'
    }
}
```