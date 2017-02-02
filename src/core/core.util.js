'use strict';

/**
 * Baidut Util
 * @namespace Baidut.util
 */
module.exports = function(Baidut) {
    var util = Baidut.util = {};

    /**
     * Return "Hello World" string
     * @return {String} "Hello World" string
     * @method returnHelloWorld
     * @memberOf Baidut.util
     */
    util.returnHelloWorld = function() {
        return "Hello World";
    }

    /**
     * Return promise object with resolved result.
     * @return {Object} Promise object
     * @method  returnPromise
     * @memberOf Baidut.util
     */
    util.returnPromise = function() {
    	return new Promise((resolve, reject) => {
    		return resolve("You did well");
    	});
    }

    /**
     * Return "Hay Hay" string
     * @return {String} "Hay Hay" string
     * @method  returnHayHay
     * @memberOf Baidut.util
     */
    util.returnHayHay = function() {
    	return "Hay Hay Hay Hay";
    }
}
