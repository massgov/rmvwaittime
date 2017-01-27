/**
 * Parse the URL querystring parameters.
 * @function
 * @returns {Array.} Array of the querystring parameter keys.
 * @todo move this functionality into a mayflower helper
 */
module.exports = {
  parseParamsFromUrl: function () {
    'use strict';
    var params = {};
    var parts = window.location.search.substr(1).split('&');
    for (var i = 0; i < parts.length; i++) {
      var keyValuePair = parts[i].split('=');
      var key = decodeURIComponent(keyValuePair[0]);
      params[key] = keyValuePair[1] ?
        decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')) :
        keyValuePair[1];
    }
    return params;
  }
};
