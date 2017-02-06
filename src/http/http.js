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
		to_lang: "en",
		get_method: false,
		proxy: null
	};

	// check if the error is about internet connection or not, also can be CORS problem
	function _isRelateToInternetConnectionIssue(errorMsg) {
		// as tested on Safari, Chrome, and Firefox we got 2 possible messages to check
		if (errorMsg.search("XHR error") > -1 || errorMsg.search("Failed to fetch") > -1) {
			return true;
		}
		else {
			return false;
		}
	}

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
	 * Form post data object
	 * @param  {String} query Text to translate
	 * @param  {String} from  Language code to translate from
	 * @param  {String} to    Language code to translate to
	 * @return {Object}       Post data object whose each of data to be sent to Baidu is added as property of returned Object
	 * @method _fomPostDataObject
	 * @memberOf Baidut.http
	 * @private
	 * @see  List of language code at http://api.fanyi.baidu.com/api/trans/product/apidoc
	 */
	function _formPostDataObject(query, from, to) {
		var appid = Baidut.env.global.appId;
		var key = Baidut.env.global.key;
		var salt = (new Date).getTime();

		var str1 = appid + query + salt + key;
		var sign = md5(str1);

		return { appid: appid, from: from, to: to, sign: sign, salt: salt, q: query };
	}

	/**
	 * Make a jsonp request to target url.
	 * **Warning**: This is for browser only.
	 * @param  {String}   query Text to translate. It can be in any language. If you specified non-chinese text, then you should also specific `from_lang` of options parameter to match that language code too, otherwise it will treat as chinese.
	 * @param {Object} options (**optional**) options as object  
	 * It can include  
	 * {  
	 * `http_request`: *Boolean* = set to true to make a request for Baidu's HTTP end-point. Otherwise, there's no effect to the call.  
	 * `from_lang`: *String* = language code to translate from. Default value is 'zh'.  
	 * `to_lang`: *String* = language code to translate to. Default value is 'en'.  
	 * }
	 * @return {Object}            Promise object
	 * @method requestJSONP
	 * @memberOf Baidut.http
	 */
	http.requestJSONP = function(query, options) {

		return new Promise((resolve, reject) => {
			// check if appid and key are set 
			if (Baidut.env.global.appId == null) {
				return reject(Baidut.const.error(Baidut.const.errorCode.appIdNotSet));
			}
			if (Baidut.env.global.key == null) {
				return reject(Baidut.const.error(Baidut.const.errorCode.keyNotSet));
			}

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

	/**
	 * Make a http/https request for spcified query with optional options.
	 * This is suitable for NodeJS application only.
	 * @param  {String} query   Text to translate. It can be in any language. If you specified non-chinese text, then you should also specific `from_lang` of options parameter to match that language code too, otherwise it will treat it as Chinese.
	 * @param  {Object} options (**optional**) options as object.  
	 * It can include  
	 * {  
	 * `http_request`: *Boolean* = set to true to make a request for Baidu's HTTP end-point. Otherwise, there's no effect to the call.  
	 * `get_method`: *Boolean* = set to true to make a HTTP GET method. Default is always send in HTTP POST method. Otherwise, there's no effect to the call.  
	 * `from_lang`: *String* = language code to translate from. Default value is 'zh'.  
	 * `to_lang`: *String* = language code to translate to. Default value is 'en'.  
	 * }
	 * @return {Object}         Promise object
	 * @method requestHTTP
	 * @memberOf Baidut.http
	 */
	http.requestHTTP = function(query, options) {

		return new Promise((resolve, reject) => {

			var propChk = Baidut.helpers.propertyCheck;

			var useGETMethod = propChk(options, "get_method", _kDefaultSettings.get_method);

			if (useGETMethod) {

				// get data
				var urlParams = _formURLParams(query, propChk(options, "from_lang", _kDefaultSettings.from_lang), propChk(options, "to_lang", _kDefaultSettings.to_lang));

				// get proper request url
				var useHttp = propChk(options, "http_request", _kDefaultSettings.http_request);
				var url = (useHttp ? Baidut.env.global.httpEndPointURL : Baidut.env.global.httpsEndPointURL) + urlParams;

				// make actual request, and relay promise data to top level
				_reg_GET_HTTP(url)
					.then((_r) => {
						return resolve(_r);
					}, (_e) => {
						return reject(_e);
					});
			}
			else {
				// get data
				var postDataObj = _formPostDataObject(query, propChk(options, "from_lang", _kDefaultSettings.from_lang), propChk(options, "to_lang", _kDefaultSettings.to_lang));

				// get proper request url
				var useHttp = propChk(options, "http_request", _kDefaultSettings.http_request);
				var url = useHttp ? Baidut.env.global.httpEndPointURL : Baidut.env.global.httpsEndPointURL;

				// make actual request
				_reg_POST_HTTP(url, postDataObj)
					.then((_r) => {
						return resolve(_r);
					}, (_e) => {
						return reject(_e);
					});
			}
		});
	}

	// make a GET method of HTTP request, then return promise object from input wrappedPromiseObj
	function _reg_GET_HTTP(url) {

		return new Promise((resolve, reject) => {

			// load proper library
			// load from reference if it's already loaded
			const lib = url.search('https') != -1 ? require('https') : require('http');

			// collect all data chunks into array
			var dataChunks = [];

			// make a GET request
			lib.get(url, (response) => {

				// handle http errors
				if (response.statusCode != 200) {
					// create error object
					var error = new Error("Failed to load, status code: " + response.statusCode)
					// piggy back error code
					error.code = response.statusCode;
					return reject(error);
				}

				response.setEncoding('utf8');

				// listen to event 'data' for each indivdiual chunk of data
				response.on('data', (chunk) => {
					dataChunks.push(chunk);
				});

				// listen to event 'end' when all chunks of data are transmitted
				response.on('end', () => {

					// combine all data chunks together
					let d = dataChunks.join('');

					// check if data is null
					if (d == null) {
						return reject(Baidut.const.error(Baidut.const.errorCode.responseIsNull));
					}

					// parse into json, and validate for error-free
					let json = null;
					try {
						// parse data resposne to json
						json = JSON.parse(d);
					}
					catch(e) {
						return reject(Baidut.const.error(Baidut.const.errorCode.jsonParsedError, { additional_msg: e.message } ));
					}

					// check api level error
					// if only there's no 'error_code' existing then there's no error
					if (!json.hasOwnProperty("error_code") || 
							json.error_code == undefined) {
						// all ok
						return resolve(json);
					}
					else {
						// reject with error code as error
						return reject(Baidut.const.error(json.error_code, { additional_msg: json.message } ));
					}
				});

				// listen to event 'error'
				response.on('error', (e) => { return reject(Baidut.const.error(Baidut.const.errorCode.responseIsError, { additional_msg: e.message })); } );
			}).on('error', (e) => {

				// if it relates to internet connection issue, then mark its code
				if (_isRelateToInternetConnectionIssue(e.message)) {
					return reject(Baidut.const.error(Baidut.const.errorCode.internetConnectionIssue, { additional_msg: e.message }));
				}
				else {
					return reject(Baidut.const.error(Baidut.const.errorCode.requestError, { additional_msg: e.message }));
				}
			});
		});
	}

	// make a POST method of HTTP request, then return promise object from input wrappedPromiseObj
	function _reg_POST_HTTP(url, postDataKvp) {

		return new Promise( (resolve, reject) => {

			// load proper library
			// load from reference if it's already loaded
			var lib = null;
			var isHttps = true;
			if (url.search('https') != -1) {
				lib = require('https');
				isHttps = true;
			}
			else {
				lib = require('http');
				isHttps = false;
			}

			// form query string of post data
			var encodedDataParams = "";
			if (postDataKvp != null) {
				var keys = Object.keys(postDataKvp);
				var count = keys.length;

				for (var i=0; i<count; i++)
				{
					// get key and value
					var key = keys[i];
					var value = postDataKvp[keys[i]];

					// if both are not null then we add them into result string
					if (key != null && value != null) {

						// prefix "&" as it needs to check first if the current element has value or not
						if (i != 0) {
							encodedDataParams += "&";
						}

						encodedDataParams += encodeURIComponent(key) + "=" + encodeURIComponent(value);
					}
				}
			}

			// cut out prefixed protocal
			var noPrefixUrl = isHttps ? url.substring(8) : url.substring(7);
			// get base url, and the less
			const firstSlashPos = noPrefixUrl.indexOf("/");
			const baseUrl = noPrefixUrl.substring(0, firstSlashPos);
			const pathUrl = "/" + noPrefixUrl.substring(firstSlashPos+1);

			// form options for reqeust
			// we also need to calculate byte-lenth of post data to send too
			var postOptions = {
				hostname: baseUrl,	// cut out protocal string, and get only host name string
				path: pathUrl,
				port: isHttps ? 443 : 80,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(encodedDataParams)
				}
			};

			// data chunk array to collect each individual chunk
			var dataChunks = [];

			// make a POST request
			const request = lib.request(postOptions, (response) => {

				// handle http errors
				if (response.statusCode != 200) {
					// create error object
					var error = new Error("Failed to load, status code: " + response.statusCode)
					// piggy back error code
					error.code = response.statusCode;
					return reject(error);
				}

				response.setEncoding('utf8');

				// liten to event 'data', each individual chunk will be sent
				response.on('data', (chunk) => {
					dataChunks.push(chunk);
				});

				// listen to event 'end' to combine all individual chunks together as data
				response.on('end', () => {
					// combine all data chunks together
					let d = dataChunks.join('');

					// check if data is null
					if (d == null) {
						return reject(Baidut.const.error(Baidut.const.errorCode.responseIsNull));
					}

					// parse into json, and validate for error-free
					let json = null;
					try {
						// parse data resposne to json
						json = JSON.parse(d);
					}
					catch(e) {
						return reject(Baidut.const.error(Baidut.const.errorCode.jsonParsedError, { additional_msg: e.message } ));
					}

					// check api level error
					// if only there's no 'error_code' existing then there's no error
					if (!json.hasOwnProperty("error_code") || 
							json.error_code == undefined) {
						// all ok
						return resolve(json);
					}
					else {
						// reject with error code as error
						return reject(Baidut.const.error(json.error_code, { additional_msg: json.message } ));
					}
				});

				// listen to event 'error'
				response.on('error', (e) => { return reject(new OperationalError(e.message)); });
			}).on('error', (e) => {

				// if it relates to internet connection issue, then mark its code
				if (_isRelateToInternetConnectionIssue(e.message)) {
					return reject(Baidut.const.error(Baidut.const.errorCode.internetConnectionIssue, { additional_msg: e.message }));
				}
				else {
					return reject(Baidut.const.error(Baidut.const.errorCode.requestError, { additional_msg: e.message }));
				}
			});

			// write post data
			request.write(encodedDataParams);
			request.end();
		});
	}
}