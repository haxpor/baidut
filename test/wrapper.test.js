describe("Wrapper test", function() {
	it("should be able to call wrapped function, and get proper result - Baidu.translate()", function(done) {
		Baidut.translate("苹果")
			.then((result) => {
				expect(result.trans_result.length > 0).toBeTruthy();
				expect(result.trans_result[0].dst.toLowerCase()).toEqual("apple");
				done();
			}, (e) => {
				fail(e.code + ": " + e.message);
			});
	});
});
