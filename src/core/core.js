'use strict';

module.exports = function() {
    var Baidut = function() {
        var me = this;
        return me;
    };

    Baidut.globalText = "Test";
    Baidut.dynamicText;    // to be set via mockContext for testing purpose later

    return Baidut;
};
