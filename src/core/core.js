'use strict';

module.exports = function() {
    var Baidut = function() {
        var me = this;
        return me;
    };

    // default settings of Baidut's calling to API
    // you should never edit these values in run time
    Baidut.static = {
        defaults: {
            global: {
                httpEndPointURL: "http://api.fanyi.baidu.com/api/trans/vip/translate",
                httpsEndPointURL: "https://fanyi-api.baidu.com/api/trans/vip/translate",
            }
        }
    };

    // environment variables as used during run time
    Baidut.env = {
    	global: {
    		httpEndPointURL: Baidut.static.defaults.global.httpEndPointURL,
    		httpsEndPointURL: Baidut.static.defaults.global.httpsEndPointURL,
            appId: null,
            key: null
    	}
    };

    return Baidut;
};
