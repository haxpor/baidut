describe("baidut's core tests", function() {
	it("should have a proper default value of Baidu's Http URL end-point", function() {
		expect(Baidut.static.defaults.global.httpEndPointURL).toEqual("http://api.fanyi.baidu.com/api/trans/vip/translate");
	});

	it("should have a proper default value of Baidu's Https URL end-point", function() {
		expect(Baidut.static.defaults.global.httpsEndPointURL).toEqual("https://fanyi-api.baidu.com/api/trans/vip/translate");
	});

	it("should have proper value for environment variables", function() {
		expect(Baidut.env.global.httpEndPointURL).toEqual(Baidut.static.defaults.global.httpEndPointURL);
		expect(Baidut.env.global.httpsEndPointURL).toEqual(Baidut.static.defaults.global.httpsEndPointURL);
		expect(Baidut.env.global.appId).toEqual("2015063000000001");
		expect(Baidut.env.global.key).toEqual("12345678");
	});
});
