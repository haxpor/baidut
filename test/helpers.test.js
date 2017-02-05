describe("Helpers module", function() {
	it("should validate returned value from propertyCheck() - obj with property value", function() {
		var options = { prop1: "test" };
		expect(Baidut.helpers.propertyCheck(options, "prop1", "test2")).toEqual("test");
	});

	it("should validate returned value from propertyCheck() - obj with no property value", function() {
		var options = { };
		expect(Baidut.helpers.propertyCheck(options, "prop1", "test2")).toEqual("test2");
	});
});
