'use strict';

/**
 * Baidut Http Module
 * @namespace Baidut.http
 */
module.exports = function(Baidut) {

	var http = Baidut.http = {};

	var jsonp = require("../vendor/jsonp");

	/**
	 * Make a jsonp request to target url
	 * @param  {String}   url      target url end-point to make a request to
	 * @param  {String}   key      parameter name of callback, make sure this is set to be the same as the end-point you're trying to make a request to
	 * @return {Object}            Promise object
	 */
	http.requestJSONP = function(url, key) {

		return new Promise((resolve, reject) => {
			// wrapped callback inside before we return Promise object based on data received
			var internal_callback = function(data) {

				// if data resopnse is null, then reject it as an error
				if (data == null) {
					return reject(Baidut.const.error(Baidut.const.errorCode.responseIsNull));
				}
				// if there's any error code piggied back then it's an error
				else if (data["error_code"] != null) {
					return reject(Baidut.const.error(parseInt(data["error_code"])), { additional_msg: data["error_msg"] });
				}

				return resolve(data);
			};

			jsonp(url, key, internal_callback);
		});
	}
}