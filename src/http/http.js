'use strict';

/**
 * Baidut Http Module
 * @namespace Baidut.http
 */
module.exports = function(Baidut) {

	var http = Baidut.http = {};

	var jsonp = require("../vendor/jsonp");
	var md5 = require("../vendor/md5");

	var _kDefaultSettings = {
		http_request: false,
		from_lang: "zh",
		to_lang: "en"
	};

	// form URL params
	function _formURLParams(query, from, to) {
		var appid = Baidut.env.global.appId;
		var key = Baidut.env.global.key;
		var salt = (new Date).getTime();

		var str1 = appid + query + salt + key;
		var sign = md5(str1);

		return "?q=" + encodeURIComponent(query) + "&appid=" + appid + "&from=" + from + "&to=" + to + "&sign=" + sign + "&salt=" + salt;
	}

	/**
	 * Make a jsonp request to target url
	 * @param  {String}   query Text to translate. It can be in any language. If you specified non-chinese text, then you should also specific `from_lang` of options parameter to match that language code too, otherwise it will treat as chinese.
	 * @param {Object} options (**optional**) options as object  
	 * It can include  
	 * {  
	 * `http_request`: *Boolean* = set to true to make a request for Baidu's HTTP end-point. Otherwise, there's no effect to the call.  
	 * `from_lang`: *String* = language code to translate from. Default value is 'zh'.  
	 * `to_lang`: *String* = language code to translate to. Default value is 'en'.  
	 * }
	 * @return {Object}            Promise object
	 */
	http.requestJSONP = function(query, options) {

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

			var propChk = Baidut.helpers.propertyCheck;
			var urlParams = _formURLParams(query, propChk(options, "from_lang", _kDefaultSettings.from_lang), propChk(options, "to_lang", _kDefaultSettings.to_lang));

			var useHttp = propChk(options, "http_request", _kDefaultSettings.http_request);

			// Baidu uses "callback" as callback parameter key
			if (useHttp) {
				jsonp(Baidut.env.global.httpEndPointURL + urlParams, "callback", internal_callback);
			}
			else {
				jsonp(Baidut.env.global.httpsEndPointURL + urlParams, "callback", internal_callback);
			}
		});
	}
}