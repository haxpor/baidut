/**
 * @namespace Baidut
 */

// -- baidut -- //
var Baidut = require('./core/core.js')();

// -- core -- //
require('./core/core.util.js')(Baidut);
require('./core/builder.js')(Baidut);

// -- const -- //
require('./const/const.js')(Baidut);

// -- http -- //
require('./http/http.js')(Baidut);

// -- helpers -- //
require('./helpers/helpers.js')(Baidut);

module.exports = Baidut;
// if it's in browser environment
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
if (isBrowser()) {
    window.Baidut = Baidut;
}
