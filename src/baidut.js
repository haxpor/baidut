/**
 * @namespace Baidut
 */

// -- baidut -- //
var Baidut = require('./core/core.js')();

require('./core/core.util.js')(Baidut);

module.exports = Baidut;
// if it's in browser environment
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (isBrowser()) {
    window.Baidut = Baidut;
}
