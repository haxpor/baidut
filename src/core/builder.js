'use strict';

/**
 * Baidut Builder
 * @namespace Baidut.builder
 */
module.exports = function(Baidut) {

	// global builder object
	var builder = Baidut.builder = {};

	// duplicate all properties and values from Baidut.env.global
	var finalSettingObj = {};
	for (var prop in Baidut.env.global) {
		if (Baidut.env.global.hasOwnProperty(prop)) {
			finalSettingObj[prop] = Baidut.env.global[prop];
		}
	}

	/**
	 * Set app id
	 * @param {String} appId app id
	 * @return {Object} Baidut.builder object. You can chain setting other properties further.
	 * @method  setAppId
	 * @memberOf Baidut.builder
	 */
	builder.setAppId = function(appId)
	{
		finalSettingObj.appId = appId;
		return builder;
	}

	/**
	 * Set key
	 * @param {String} key key
	 * @return {Object} Baidut.builder object. You can chain setting other properties further.
	 * @method  setKey
	 * @memberOf Baidut.builder
	 */
	builder.setKey = function(key)
	{
		finalSettingObj.key = key;
		return builder;
	}

	/**
	 * Set HTTP end-point URL
	 * @param {String} url URL to be used as HTTP end-point
	 * @return {Object} Baidut.builder object. You can chain setting other properties further.
	 * @method  setHttpEndPointURL
	 * @memberOf Baidut.builder
	 */
	builder.setHttpEndPointURL = function(url)
	{
		finalSettingObj.httpEndPointURL = url;
		return builder;
	}

	/**
	 * Set HTTPs end-point URL
	 * @param {String} url URL to be used as HTTPs end-point
	 * @return {Object} Baidut.builder object. You can chain setting other properties further.
	 * @method  setHttpEndPointURL
	 * @memberOf Baidut.builder
	 */
	builder.setHttpsEndPointURL = function(url)
	{
		finalSettingObj.httpsEndPointURL = url;
		return builder;
	}

	/**
	 * Build
	 * @method build
	 * @memberOf Baidut.builder
	 */
	builder.build = function()
	{
		// finally set all values set in finalSettingObj to Baidut.env.global
		for (var prop in finalSettingObj) {
			if (finalSettingObj.hasOwnProperty(prop)) {
				Baidut.env.global[prop] = finalSettingObj[prop];
			}
		}
	}
}