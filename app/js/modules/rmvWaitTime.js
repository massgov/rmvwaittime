// Helpers
var dateTime = require("../helpers/dateTime.js");
var urlParser = require("../helpers/urlParser.js");
var stringConversions = require("../helpers/stringConversions.js");

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

  var $el = $('.ma__wait-time'),
  waitTimeUnavailableString = 'Wait time unavailable';

  // The API URL.
  // var rmvWaitTimeURL = 'https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx';
  var rmvWaitTimeURL = 'data/waittime.xml'; // local stub

  /**
   * Render the transformed wait times for the requested branch on the page.
   * @function
   * @param {Object} data branch display data with processed wait times.
   */
  var render = function(data) {
    var $licensing = $el.find('span[data-variable="licensing"]');
    if ($licensing.length) {
      $licensing.text(data.processedLicensing);
    }
    // else {
    //   throw new Error("Can not find licensing wait time DOM element.");
    // }

    var $registration = $el.find('span[data-variable="registration"]');
    if ($registration.length) {
      $registration.text(data.processedRegistration);
    }
    // else {
    //   throw new Error("Can not find registration wait time DOM element.");
    // }

    var time = dateTime.getCurrentTime();
    var $timestamp = $el.find('span[data-variable="timestamp"]');
    if ($timestamp.length) {
      $timestamp.text(time);
    }
    // else {
    //   throw new Error("Can not find timestamp wait time DOM element.");
    // }

  };

  /**
   * Get branch town value.
   * @function
   * @param {Array} urlParams is an associative array of url parameters,
       returned from urlParser.parseParamsFromUrl().
   * @returns {String} The name of the town passed to the script.
   * @throws Error when 'town' is not found in the array of parameters.
   */
  var getLocationFromURL = function(urlParams) {
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
   * @returns {String} A transformed wait time duration in human readable format.
   *
   * Specs from ticket (see link at top of file):
   * Closed = Closed
   * 00:00:00 = No wait time
   * < 1 minute = Less than a minute
   * if hour == 1 ... string = 1 hour ...
   * if hours > 1 ... string += * hours ...
   * if minute == 1 ... string = ... 1 minute
   * if minutes > 1 ... string += ... * minutes
   *  >> round minutes up to quarter hour minutes when minutes not = 0
   * if < 1 hour: round up to the minute
   */
  var transformTime = function(waitTime) {
    // Default to unavailable.
    var displayTime = waitTimeUnavailableString;

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
   * @returns {Object} An object of the requested branch with additional processed wait time stings for 'licensing'
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
   * @returns {Object} An object of the requested branch wait time stings for 'licensing'
        and 'registration'.
   * @throws Error when we can't find the branch corresponding to the passed town in the data feed.
   */
  var getBranch = function(xml) {
    var urlParams = urlParser.parseParamsFromUrl();
    try {
      var location = getLocationFromURL(urlParams);
    }
    catch(e) {
      console.log(e);
      // send to google anayltics as error event if we don't have a location argument
      ga('send', {
        hitType: 'event',
        eventCategory: 'error',
        eventAction: e.message,
        eventLabel: window.location.href
      });
    }

    if (location) {
      var locationTitleCased = stringConversions.titleCase(location);
      var $branch = $(xml).find('branch').filter(function () {
        return $(this).find('town').text() == locationTitleCased;
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
   * @returns {Promise} A promise which contains only the requested branch's wait times on success.
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
        // send to google anayltics as error event if we can't get the branch
        ga('send', {
          hitType: 'event',
          eventCategory: 'error',
          eventAction: e.message,
          eventLabel: window.location.href
        });
      }

      if (branch) {
        promise.resolve(branch);
      }

      promise.reject();
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      // get + return ajax response Text (html), remove tags, empty items, format string
      var responseString = jqXHR.responseText.replace(/(<([^>]+)>)/ig,""),
      responseArray = responseString.split('\n'),
      cleanResponseArray = responseArray.filter(function(entry) { return entry.trim() != ''; }),
      message = cleanResponseArray.join(": ");
      console.log(message);

      // send to google anayltics as error event if we get ajax error
      ga('send', {
        hitType: 'event',
        eventCategory: 'error',
        eventAction: message,
        eventLabel: window.location.href
      });

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
        $el.removeClass('visually-hidden');
      })
      .fail(function(){
        render({
          processedLicensing: waitTimeUnavailableString,
          processedRegistration: waitTimeUnavailableString
        });
        $el.removeClass('visually-hidden');

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
    waitTimeRefresh: waitTimeRefresh/** begin test code**/,
    transformTime: transformTime,
    getLocationFromURL: getLocationFromURL,
    render:render/** end test code **/
  }
}(jQuery);
