module.exports = function(config) {
	config.set({
		browsers: ['Chrome', 'Firefox'],
		frameworks: ['browserify', 'jasmine'],
		reporters: ['spec'],

		preprocessors: {
			'src/**/*.js': ['browserify']
		},
		browserify: {
			debug: true
		},

		// uncomment this line to show message on terminal
		//logLevel: config.LOG_DEBUG,
		client: {
			captureConsole: true
		}
	});
};