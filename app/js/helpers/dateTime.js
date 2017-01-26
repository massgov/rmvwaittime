/**
 * Get the current time to show when latest wait times were updated.
 * @function
 * @returns {String.} String of the current time (5:48 PM).
 */

module.exports = {
  getCurrentTime: function () {
    'use strict';
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ampm;
  }
};
