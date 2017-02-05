describe("HTTP module", function() {

	it("should get and able to validate result from barebone minimal call to requestJSONP()", function(done) {
		Baidut.http.requestJSONP("苹果")
			.then((result) => {
				expect(result.error_code).toBe(undefined);
				expect(result.trans_result.length > 0).toBeTruthy();
				expect(result.trans_result[0].src).toEqual("苹果");
				expect(result.trans_result[0].dst.toLowerCase()).toEqual("apple");
				done();
			}, (e) => {
				console.log(e);
			});
	});

	it("should get and able to validate result get result from requestJSONP() with http_request", function(done) {
		Baidut.http.requestJSONP("苹果", { http_request: true })
			.then((result) => {
				expect(result.error_code).toBe(undefined);
				expect(result.trans_result.length > 0).toBeTruthy();
				expect(result.trans_result[0].src).toEqual("苹果");
				expect(result.trans_result[0].dst.toLowerCase()).toEqual("apple");
				done();
			}, (e) => {
				console.log(e);
			});
	});

	it("should be able to get and able to validate result from HTTPs end-point URL - variant 1", function(done) {
		Baidut.http.requestJSONP("苹果", { http_request: false})
			.then((result) => {
				expect(result.error_code).toBe(undefined);
				expect(result.trans_result.length > 0).toBeTruthy();
				expect(result.trans_result[0].src).toEqual("苹果");
				expect(result.trans_result[0].dst.toLowerCase()).toEqual("apple");
				done();
			}, (e) => {
				console.log(e);
			});
	});

	it("should be able to get and able to validate result from HTTPs end-point URL - variant 2", function(done) {
		Baidut.http.requestJSONP("苹果", { })
			.then((result) => {
				expect(result.error_code).toBe(undefined);
				expect(result.trans_result.length > 0).toBeTruthy();
				expect(result.trans_result[0].src).toEqual("苹果");
				expect(result.trans_result[0].dst.toLowerCase()).toEqual("apple");
				done();
			}, (e) => {
				console.log(e);
			});
	});

	it("should be able to get valid result - with all options", function(done) {
		Baidut.translate('สวัสดี', { http_request: true, from_lang: "th", to_lang: "en" })
			.then((result) => {
				expect(result.error_code).toBe(undefined);
				expect(result.trans_result.length > 0).toBeTruthy();
				expect(result.trans_result[0].src).toEqual("สวัสดี");
				expect(result.trans_result[0].dst.toLowerCase()).toEqual("hi.");
				done();
			}, (e) => {
				console.log(e);
			});
	});
});
