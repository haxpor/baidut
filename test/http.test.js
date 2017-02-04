describe("HTTP module", function() {
	it("should be able to get result from HTTP end-point URL", function(done) {

		var appid = window.mock.appId;
		var key = window.mock.key;
		var salt = (new Date).getTime();
		var query = 'apple';
		var from = 'en';
		var to = 'zh';
		var str1 = appid + query + salt +key;
		var sign = Baidut.helpers.md5(str1);
		var url_params = "q=" + query + "&appid=" + appid + "&salt=" + salt + "&from=" + from + "&to=" + to + "&sign=" + sign;

		Baidut.http.requestJSONP(Baidut.env.global.httpEndPointURL+"?"+url_params, "callback")
			.then((result) => {
				done();
			}, (e) => {
				console.log(e.name + ": " + e.message);
			});
	});

	it("should be able to get result from HTTPs end-point URL", function(done) {

		var appid = window.mock.appId;
		var key = window.mock.key;
		var salt = (new Date).getTime();
		var query = 'apple';
		var from = 'en';
		var to = 'zh';
		var str1 = appid + query + salt +key;
		var sign = Baidut.helpers.md5(str1);
		var url_params = "q=" + query + "&appid=" + appid + "&salt=" + salt + "&from=" + from + "&to=" + to + "&sign=" + sign;

		Baidut.http.requestJSONP(Baidut.env.global.httpsEndPointURL+"?"+url_params, "callback")
			.then((result) => {
				done();
			}, (e) => {
				console.log(e.name + ": " + e.message);
			});
	});
});
