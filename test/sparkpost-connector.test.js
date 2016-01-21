'use strict';

const API_KEY = '30f92d579144b92f77a6fe75ddc1c2e8e5ab1112';

var cp     = require('child_process'),
	assert = require('assert'),
	connector;

describe('Connector', function () {
	this.slow(5000);

	after('terminate child process', function (done) {
        this.timeout(7000);
        setTimeout(function(){
            connector.kill('SIGKILL');
            done();
        }, 5000);
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			connector.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			connector.send({
				type: 'ready',
				data: {
					options: {
						api_key: API_KEY,
						default_recipients: [
                            {
                                'address': {
                                    'email': 'adinglasan@reekoh.com',
                                    'name': 'Achilles Dinglasan'
                                }
                            }
                        ],
                        default_template_id: 'my-first-email'
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#data', function () {
		it('should process the data', function (done) {
            connector.send({
                type: 'data',
                data: {
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
            }, done);
		});
	});
});