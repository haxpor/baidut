(function () {

		var mock = {
			appId: "2015063000000001",
			key: "12345678"
		};

		window.mock = mock;

    // mock setting dynamic value for baidut
    Baidut.builder
  		.setAppId(mock.appId)
  		.setKey(mock.key)
  		.build();
})();
