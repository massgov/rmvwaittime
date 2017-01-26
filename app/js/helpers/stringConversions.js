/**
 * Title Case a Sentence With the map() Method.
 * @function
 * @returns {String.} String to be converted to Title Case.
 */

module.exports = {
  titleCase: function (str) {
    'use strict';
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
};
