/**
 * Get the current time to show when latest wait times were updated.
 * @function
 * @returns {String.} String of the current time (5:48 PM).
 * @todo move this functionality into a mayflower helper?
 */
 
module.exports = {
  getCurrentTime: function() {
    var now = new Date(),
      hours = now.getHours(),
      minutes = now.getMinutes();

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ampm;
  }
};
