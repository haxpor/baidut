describe("HTTP module", function() {

	it("should get result from barebone minimal call to requestJSONP()", function(done) {
		Baidut.http.requestJSONP("苹果")
			.then((result) => {
				done();
			}, (e) => {
				console.log(e);
			});
	});

	it("should get result get result from requestJSONP() with http_request", function(done) {
		Baidut.http.requestJSONP("苹果", { http_request: true })
			.then((result) => {
				done();
			}, (e) => {
				console.log(e);
			});
	});

	it("should be able to get result from HTTPs end-point URL - variant 1", function(done) {
		Baidut.http.requestJSONP("苹果", { http_request: false})
			.then((result) => {
				done();
			}, (e) => {
				console.log(e);
			});
	});

	it("should be able to get result from HTTPs end-point URL - variant 2", function(done) {
		Baidut.http.requestJSONP("苹果", { })
			.then((result) => {
				done();
			}, (e) => {
				console.log(e);
			});
	});
});
