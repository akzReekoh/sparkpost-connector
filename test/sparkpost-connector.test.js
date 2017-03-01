'use strict'

const amqp = require('amqplib')

const API_KEY = '30f92d579144b92f77a6fe75ddc1c2e8e5ab1112'

let _channel = null
let _conn = null
let app = null

describe('SparkPost Connector Test', () => {
  before('init', () => {
    process.env.ACCOUNT = 'adinglasan'
    process.env.CONFIG = JSON.stringify({
      apiKey: API_KEY,
      defaultRecipients: [
        {
        'address': {
          'email': 'adinglasan@reekoh.com',
          'name': 'Achilles Dinglasan'
          }
        }
      ],
      defaultTemplateId: 'my-first-email'
    })
    process.env.INPUT_PIPE = 'ip.sparkpost'
    process.env.LOGGERS = 'logger1, logger2'
    process.env.EXCEPTION_LOGGERS = 'ex.logger1, ex.logger2'
    process.env.BROKER = 'amqp://guest:guest@127.0.0.1/'

    amqp.connect(process.env.BROKER)
      .then((conn) => {
        _conn = conn
        return conn.createChannel()
      }).then((channel) => {
      _channel = channel
    }).catch((err) => {
      console.log(err)
    })
  })

  after('close connection', function (done) {
    _conn.close()
    done()
  })

  describe('#start', function () {
    it('should start the app', function (done) {
      this.timeout(10000)
      app = require('../app')
      app.once('init', done)
    })
  })

  describe('#data', () => {
    it('should send data to third party client', function (done) {
      this.timeout(15000)

      let data = {
        recipients: [
            {
              'address': {
                'email': 'akzdinglasan@gmail.com',
                'name': 'Achilles Dinglasan'
              }
            }
        ],
        templateId: 'my-first-email'
      }

      _channel.sendToQueue('ip.sparkpost', new Buffer(JSON.stringify(data)))
      setTimeout(done, 10000)
    })
  })
})

// 'use strict';
//
// const API_KEY = '30f92d579144b92f77a6fe75ddc1c2e8e5ab1112';
//
// var cp     = require('child_process'),
// 	assert = require('assert'),
// 	connector;
//
// describe('Connector', function () {
// 	this.slow(5000);
//
// 	after('terminate child process', function (done) {
//         this.timeout(7000);
//
//         setTimeout(function(){
//             connector.kill('SIGKILL');
//             done();
//         }, 5000);
// 	});
//
// 	describe('#spawn', function () {
// 		it('should spawn a child process', function () {
// 			assert.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
// 		});
// 	});
//
// 	describe('#handShake', function () {
// 		it('should notify the parent process when ready within 5 seconds', function (done) {
// 			this.timeout(5000);
//
// 			connector.on('message', function (message) {
// 				if (message.type === 'ready')
// 					done();
// 			});
//
// 			connector.send({
// 				type: 'ready',
// 				data: {
// 					options: {
// 						api_key: API_KEY,
// 						default_recipients: [
//                             {
//                                 'address': {
//                                     'email': 'adinglasan@reekoh.com',
//                                     'name': 'Achilles Dinglasan'
//                                 }
//                             }
//                         ],
//                         default_template_id: 'my-first-email'
// 					}
// 				}
// 			}, function (error) {
// 				assert.ifError(error);
// 			});
// 		});
// 	});
//
// 	describe('#data', function () {
// 		it('should process the JSON data', function (done) {
//             connector.send({
//                 type: 'data',
//                 data: {
//                     recipients: [
//                         {
//                             'address': {
//                                 'email': 'akzdinglasan@gmail.com',
//                                 'name': 'Achilles Dinglasan'
//                             }
//                         }
//                     ],
//                     template_id: 'my-first-email'
//                 }
//             }, done);
// 		});
// 	});
//
// 	describe('#data', function () {
// 		it('should process the Array data', function (done) {
// 			connector.send({
// 				type: 'data',
// 				data:[
// 					{
// 						recipients: [
// 							{
// 								'address': {
// 									'email': 'akzdinglasan@gmail.com',
// 									'name': 'Achilles Dinglasan'
// 								}
// 							}
// 						],
// 						template_id: 'my-first-email'
// 					},
// 					{
// 						recipients: [
// 							{
// 								'address': {
// 									'email': 'akzdinglasan@gmail.com',
// 									'name': 'Achilles Dinglasan'
// 								}
// 							}
// 						],
// 						template_id: 'my-first-email'
// 					}
// 				]
// 			}, done);
// 		});
// 	});
// });