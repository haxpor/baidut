'use strict';

/**
 * Baidut Top Level Module
 * @namespace Baidut
 */
module.exports = function(Baidut) {
	Baidut.translate = Baidut.http.requestJSONP;
}