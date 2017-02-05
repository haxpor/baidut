'use strict';

/**
 * Baidut Helpers Module
 * @namespace Baidut.helpers
 */
module.exports = function(Baidut) {

  var helpers = Baidut.helpers = {};

  /**
   * Check if object and property exist, then get property value from specified object. If such property value is null, then return default value instead.
   * @param  {Object} object       Object to get property value from
   * @param  {String} propertyName Property name to get value from
   * @param {Any} defaultValue Default value to return if resolved property value is null. It can be any type.
   * @return {Any}              Value of specified property from object. It can be any type.
   * @method propertyCheck
   * @memberOf Baidut.helpers
   */
  helpers.propertyCheck = function(object, propertyName, defaultValue) {
    if (object != null && propertyName != null && object.hasOwnProperty(propertyName)) {
      if (object[propertyName] == null) {
        return defaultValue;
      }
      else {
        return object[propertyName];
      }
    }
    else {
        return defaultValue;
    }
  }
}