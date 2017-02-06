'use strict';

/**
 * Baidut Top Level Module
 * @namespace Baidut
 */
module.exports = function(Baidut) {

	var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
	if (isBrowser()) {
		Baidut.translate = Baidut.http.requestJSONP;
	}
	else {
		Baidut.translate = Baidut.http.requestHTTP;
	}
}