(function () {

		// set up
		var setup = function(Baidut) {
			var mock = {
				appId: "2015063000000001",
				key: "12345678"
			};

		  // mock setting dynamic value for baidut
		  Baidut.builder
				.setAppId(mock.appId)
				.setKey(mock.key)
				.build();
		}

		var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
		if (isBrowser()) {
			setup(Baidut);
		}
		else {
			setup(require("../src/baidut.js"));
		}
})();
