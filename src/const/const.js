	'use strict';

/**
 * Baidut Constants
 * @namespace Baidut.const
 */
module.exports = function (Baidut) {

	var cst = Baidut.const = {};
	var _eDict = {};

	/**
	 * Error code.
	 * @type {Object}
	 * @property {Number} internetConnectionIssue - Suspect to be a problem about Internet connection. User might not be able to connect to the Internet.
	 * @property {Number} responseIsNull - Response is null.
	 * @property {Number} jsonParsedError - JSON parse error.
	 * @property {Number} appIdNotSet - App Id not set yet.
	 * @property {Number} keyNotSet - Key is not set yet.
	 * @property {Number} requestTimedOut - Requested time out
	 * @property {Number} systemError - System error
	 * @property {Number} unauthorizedUsers - Unauthorized users
	 * @property {Number} requiredParameterIsNull - Required parameter is null
	 * @property {Number} clientIPIllegal - Client IP illegal
	 * @property {Number} signatureError - Signature error
	 * @property {Number} restrictedAccessFrequency - Restricted access frequency
	 * @property {Number} targetLanguageNotSupported - Target language is not supported
	 * @property {Number} accountBalanceInsufficient - Account balance is insufficient
	 * @property {Number} longQueryRequestFrequently - Long query request frequently
	 * @memberof Baidut.const
	 */
	cst.errorCode = {
		internetConnectionIssue: 99999,
		responseIsNull: 99998,
		jsonParsedError: 99997,
		appIdNotSet: 99996,
		keyNotSet: 99995,
		requestTimedOut: 52001,
		systemError: 52002,
		unauthorizedUsers: 52003,
		requiredParameterIsNull: 54000,
		clientIPIllegal: 58000,
		signatureError: 54001,
		restrictedAccessFrequency: 54003,
		targetLanguageNotSupported: 58001,
		accountBalanceInsufficient: 54004,
		longQueryRequestFrequently: 54005
	};

	/**
	 * Error message
	 * @type {Object}
	 * @property {String} internetConnectionIssue - Error message for internet connection issue
	 * @property {String} responseIsNull - Error message for response is null
	 * @property {String} jsonParsedError - Error message for JSON parsed error
	 * @property {String} appIdNotSet - App Id was not set yet. Set it via Baidut.builder.
	 * @property {String} keyNotSet - Key was not set yet. Set it via Baidut.builder.
	 * @property {String} requestTimedOut - Error message for Requested time out
	 * @property {String} systemError - Error message for System error
	 * @property {String} unauthorizedUsers - Error message for Unauthorized users
	 * @property {String} requiredParameterIsNull - Error message for Required parameter is null
	 * @property {String} clientIPIllegal - Error message for Client IP illegal
	 * @property {String} signatureError - Error message for Signature error
	 * @property {String} restrictedAccessFrequency - Error message for Restricted access frequency
	 * @property {String} targetLanguageNotSupported - Error message for Target language is not supported
	 * @property {String} accountBalanceInsufficient - Error message for Account balance is insufficient
	 * @property {String} longQueryRequestFrequently - Error message for Long query request frequently
	 */
	cst.errorMessage = {
		internetConnectionIssue: "Suspect to be a problem about Internet connection. User might not be able to connect to the Internet. Check that you have connected to WiFi.",
		responseIsNull: "Response is null. If this is intentional from API, then it's still fine.",
		jsonParsedError: "JSON parsed on response string encountered error.",
		appIdNotSet: "App Id was not set yet. Set it via Baidut.builder before making a request.",
		keyNotSet: "Key was not set yet. Set it via Baidut.builder before making a request.",
		requestTimedOut: "Request timedout. Retry again later.",
		systemError: "System error. Retry again later.",
		unauthorizedUsers: "Unauthorized users. Check your appid is correct. You can register your application id at http://api.fanyi.baidu.com/api/trans/product/desktop?req=developer.",
		requiredParameterIsNull: "Required parameter is null. Check that you pass all required parameters as listed at http://api.fanyi.baidu.com/api/trans/product/apidoc#joinFile.",
		clientIPIllegal: "Client IP is illegal. Check that your IP address is correct, and you can change your server ip address at http://api.fanyi.baidu.com/api/trans/product/desktop?req=developer.",
		signatureError: "Signature error. Check your signature generation method.",
		restrictedAccessFrequency: "Restricted access exceeded call limit. Reduce your call frequency.",
		targetLanguageNotSupported: "Target language is not supported. Check whether target language is in the language support list.",
		accountBalanceInsufficient: "Account balance is insufficient. Go to account manager http://api.fanyi.baidu.com/api/trans/product/desktop to recharge.",
		longQueryRequestFrequently: "Long query request is requested too many time. Please lower your frequency in requesting long query, and try again after 3s."
	};

	// map error code to error message
	for (var property in cst.errorCode) {
	    if (cst.errorCode.hasOwnProperty(property)) {
	        _eDict[cst.errorCode[property]] = cst.errorMessage[property];
	    }
	}

	/**
	 * Get Baidu's related error object from specified error code
	 * It it's error for http/https connection, you should not use this function. Create error object using Error class and response's error code by yourself.
	 * @param  {Number} code error code
	 * @param {Object} options (**optional**) options as Object  
	 * It can be  
	 * {  
	 * `additional_msg`: *String* = additional of error message. If you set this, this additional message will combined with base error message.  
	 * }
	 * @return {Object}      Newly created error object using Error class
	 * @method error
	 * @memberOf Baidut.const
	 */
	cst.error = function(code, options) {

		var eMsg = _eDict[code];

		if (options != null) {
			if (options.additional_msg != null &&
				  options.additional_msg != "") {
					eMsg += " [" + options.additional_msg + "]";
			}
		}

		let e = new Error(eMsg);
		e.code = code;

		return e;
	}
};