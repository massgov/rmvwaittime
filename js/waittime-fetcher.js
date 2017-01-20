/**
 * @file
 * RMV Wait Time Component Script
 * Gets, transforms, and renders the wait times for a specific rmv branch.
 * See ticket: https://jira.state.ma.us/browse/DP-822
 */

/**
 * ES6 shims
 */

// String.startsWith()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

/**
 * Main Wait Time component script.
 */
(function(){
  'use strict';

  // Cache the wait time container selector.
  var el = $('.ma__wait-time');

  // Cache the API URL.
  // var rmvWaitTimeURL = 'https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx';
  var rmvWaitTimeURL = 'waittime.xml'; // local stub

  // @todo Get branch css path iframe src URL (passed by drupal content authors) -- url parser helper in Mayflower
  // @todo Get branch js path iframe src URL (passed by drupal content authors) -- url parser helper in Mayflower

  /**
   * Get the current time to show when latest wait times were updated.
   * @function
   * @returns {String.} String of the current time (5:48 PM).
   * @todo move this functionality into a mayflower helper?
   */
  var getCurrentTime = function() {
    var now = new Date(),
      hours = now.getHours(),
      minutes = now.getMinutes();

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ampm;
  };

  /**
   * Render the transformed wait times for the requested branch on the page.
   * @function
   * @param {Object} data branch display data with processed wait times.
   */
  var render = function(data) {
    var $licensing = $('span[data-variable="licensing"]');
    $licensing.text(data.processedLicensing);

    var $registration = $('span[data-variable="registration"]');
    $registration.text(data.processedRegistration);

    var $timestamp = $('span[data-variable="timestamp"]');
    var time = getCurrentTime();
    $timestamp.text(time);
  };

  /**
   * Parse the URL querystring parameters.
   * @function
   * @returns {Array.} Array of the querystring parameter keys.
   * @todo move this functionality into a mayflower helper
   */
  var parseParamsFromUrl = function () {
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
  };

  /**
   * Get branch town value.
   * @function
   * @returns {String.} The name of the town passed to the script.
   */
  function getLocation() {
    var urlParams = parseParamsFromUrl();

    // Define param for the branch town query.
    var branchParamName = 'town';

    if (urlParams[branchParamName]) {
      return urlParams[branchParamName];
    }
  }

  /**
   * Transform the wait time raw strings into processed wait time strings according to ticket spec.
   * @function
   * @param {String} waitTime is the raw wait time for either the branch licensing or registration.
   * @returns {String.} A transformed wait time duration in human readable format.
   *
   * Specs from ticket (see link at top of file):
   * Closed = Closed
   * 00:00:00 = No wait time
   * < 1 minute = Less than a minute
   * if hours == 1 ... string += 1 hour
   * if hours > 1 string += [0] hours
   *  >> if [1], string += [1] round up to quarter hour minutes when not = 0
   * singular minute/hour for 1, plural for +1 (no abbreviations)
   * < 1 hour: round to the minute
   * > 1 hour: round to the quarter hour
   */
  function transformTime(waitTime) {
    // Default to unavailable.
    var displayTime = 'Estimation unavailable';

    // Closed = 'Closed'.
    if (waitTime == 'Closed') {
      displayTime = 'Closed';
      return displayTime;
    }
    // 0 = 'No wait time'.
    if (waitTime == '00:00:00') {
      displayTime = 'No wait time';
      return displayTime;
    }
    // < 1 minute = 'Less than a minute'.
    if (waitTime.startsWith('00:00:')) {
      displayTime = 'Less than a minute';
      return displayTime;
    }

    // Everything Else.

    // Create a moment duration with the waitTime string.
    var m = moment.duration(waitTime);

    // Declare moment formatter template partials.
    var hourTemplate = '',
      minuteTemplate = '';

    // Round minutes up to nearest 15 if there is 1+ hour.
    if (( m.hours() >= 1 ) && (m.minutes() != 0 )) {
        var remainder = 15 - m.minutes() % 15;
        m = moment.duration(m).add(remainder,"minutes");
    }
    else {
      // Round minutes up if there are 15+ seconds.
      if (m.seconds() >= 15) {
        m = moment.duration(m).add(1, "minutes");
      }
    }

    // Set hour template partial.
    if (( m.hours() > 1 )) {
      hourTemplate = "h [hours]";
    }
    if (( m.hours() == 1 )) {
      hourTemplate = "h [hour]";
    }

    // Set minute template partial.
    if (m.minutes() == 1) {
      minuteTemplate = "m [minute]";
    }
    if (m.minutes() > 1) {
      minuteTemplate = "m [minutes]";
    }

    // Create format template from partials:
    // - only add a ', ' in between partials if we have them both
    // - otherwise, just write them both (since one of them is empty)
    var template = hourTemplate && minuteTemplate
      ? hourTemplate + ', ' + minuteTemplate
      : hourTemplate + minuteTemplate;

    // Apply the template to the duration
    displayTime = m.format({ template: template});

    return displayTime;
  }

  /**
   * Pass the wait time raw strings into function to transform wait time strings according to ticket spec.
   * @function
   * @param {Object} branch contains wait time strings for licensing and registration.
   * @returns {Object.} An object of the requested branch with additional processed wait time stings for 'licensing'
   * and 'registration'.
   */
  function processWaitTimes(branch) {

    // Pass each wait time string (licensing + registration) through transform function.
    branch.processedLicensing = transformTime(branch.licensing);
    branch.processedRegistration = transformTime(branch.registration);

    console.log(branch);
    return branch;
  }

  /**
   * Extract the specific branch wait times from xml feed.
   * @function
   * @param {xml} xml feed of rmv <branches> wait time data.
   * @returns {Object.} An object of the requested branch wait time stings for 'licensing' and 'registration'.
   */
  function getBranch(xml) {
    var location = getLocation();
    var $branch = $(xml).find('branch').filter(function() { return $(this).find('town').text() == location; });
    return {
      "licensing": $branch.find('licensing').text(),
      "registration": $branch.find('registration').text()
    };
  }

  /**
   * Get the rmv wait times for a specific branch.
   * @function
   * @returns {Promise.} A promise which contains only the requested branch's wait times on success.
   */
  function getBranchData() {
    var promise = $.Deferred(); // promise returned by function

    $.ajax({ // ajax() returns a promise
      type: 'GET',
      url: rmvWaitTimeURL,
      cache: false,
      dataType: 'xml'
    })
      .done(function(data){
        var branch = getBranch(data); // Only send the data for the branch that we need.
        promise.resolve(branch);
    })
      .fail(function(){
        promise.reject();
    });

    return promise;
  }

  /**
   * Gets, transforms, and renders the wait times for a specific rmv branch.
   * @function
   */
  function updateTimes() {
    // get the branch data
    getBranchData()
      .done(function(branchData){
      // transform data
      var branchDisplayData = processWaitTimes(branchData);
      // render information
      render(branchDisplayData);
      el.removeClass('visually-hidden');
    })
      .fail(function(){
        render({
          processedLicensing: 'Estimation unavailable',
          processedRegistration: 'Estimation unavailable'
        });
        el.removeClass('visually-hidden');
      });
  }
  // Update the wait times once then set interval to update again every minute.
  updateTimes();
  var waitTimeRefresh = setInterval(updateTimes, 60000);
})();
