// Helpers
var dateTime = require("../helpers/dateTime.js");
var urlParser = require("../helpers/urlParser.js");

// Libraries
var moment = require("moment");
require("moment-duration-format");

/**
* @function
* RMV Wait Time module
* Gets, transforms, and renders the wait times for a specific rmv branch.
* See ticket: https://jira.state.ma.us/browse/DP-822
*/
module.exports = function($) {
  "use strict";

  // Cache the wait time container selector.
  var el = $('.ma__wait-time');

  // The API URL.
  // var rmvWaitTimeURL = 'https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx';
  var rmvWaitTimeURL = '/data/waittime.xml'; // local stub

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
    var time = dateTime.getCurrentTime();
    $timestamp.text(time);
  };

  /**
   * Get branch town value.
   * @function
   * @returns {String.} The name of the town passed to the script.
   */
  var getLocation = function() {
    var urlParams = urlParser.parseParamsFromUrl();

    // Define param for the branch town query.
    var branchParamName = 'town';

    if (urlParams[branchParamName]) {
      return urlParams[branchParamName];
    }
    else {
      throw new Error("No town parameter passed.");
    }
  };

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
  var transformTime = function(waitTime) {
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

    // Everything else: format the time string.

    // Create a moment duration with the waitTime string.
    var m = moment.duration(waitTime);

    // Declare moment formatter template partials.
    var hourTemplate = '',
      minuteTemplate = '';

    // Round minutes up to nearest 15 if there is 1+ hour.
    if ( m.hours() >= 1 ) {
      if (m.minutes() != 0 ) { // Do not round 0 minutes up to 15.
        var remainder = 15 - m.minutes() % 15;
        m = moment.duration(m).add(remainder, "minutes");
      }
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
  };

  /**
   * Pass the wait time raw strings into function to transform wait time strings according to ticket spec.
   * @function
   * @param {Object} branch contains wait time strings for licensing and registration.
   * @returns {Object.} An object of the requested branch with additional processed wait time stings for 'licensing'
   * and 'registration'.
   */
  var processWaitTimes = function(branch) {

    // Pass each wait time string (licensing + registration) through transform function.
    branch.processedLicensing = transformTime(branch.licensing);
    branch.processedRegistration = transformTime(branch.registration);

    console.log(branch);
    return branch;
  };

  /**
   * Extract the specific branch wait times from xml feed.
   * @function
   * @param {xml} xml feed of rmv <branches> wait time data.
   * @returns {Object.} An object of the requested branch wait time stings for 'licensing' and 'registration'.
   */
  var getBranch = function(xml) {
    try {
      var location = getLocation();
    }
    catch(e) {
      console.log(e);
    }
    if (location) {
      var $branch = $(xml).find('branch').filter(function () {
        return $(this).find('town').text() == location;
      });
      if ($branch.length) {
        return {
          "licensing": $branch.find('licensing').text(),
          "registration": $branch.find('registration').text()
        };
      }
      throw new Error('Could not find wait time information for provided location.');
    }
  };

  /**
   * Get the rmv wait times for a specific branch.
   * @function
   * @returns {Promise.} A promise which contains only the requested branch's wait times on success.
   */
  var getBranchData = function() {
    var promise = $.Deferred(); // promise returned by function

    $.ajax({ // ajax() returns a promise
      type: 'GET',
      url: rmvWaitTimeURL,
      cache: false,
      dataType: 'xml'
    })
    .done(function(data){
      try {
        var branch = getBranch(data); // Only send the data for the branch that we need.
      }
      catch (e) {
        console.log(e);
      }
      if (branch) {
        promise.resolve(branch);
      }

      promise.reject();
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
  var updateTimes = function() {
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

        // Do not try to keep running
        stopWaitTimeRefresh();
      });
  };

  // Define setInterval reference variable inside module so we can clear it from within.
  var refreshTimer = null;

  var waitTimeRefresh = function() {
    refreshTimer = setInterval(this.updateTimes, 60000);
  };

  var stopWaitTimeRefresh = function() {
    clearInterval(refreshTimer);
  };

  return {
    updateTimes: updateTimes,
    waitTimeRefresh: waitTimeRefresh
  }
}(jQuery);
