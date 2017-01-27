// Helpers
var dateTime = require('../helpers/dateTime.js');
var urlParser = require('../helpers/urlParser.js');
var stringConversions = require('../helpers/stringConversions.js');

// Libraries
var moment = require('moment');
require('moment-duration-format');

/**
* @function
* RMV Wait Time module
* Gets, transforms, and renders the wait times for a specific rmv branch.
* See ticket: https://jira.state.ma.us/browse/DP-822
*/
module.exports = function ($) {
  'use strict';

  var $el = $('.ma__wait-time');
  var waitTimeUnavailableString = 'Wait time unavailable'; // Used more than once.
  var hasSucceeded = false; // Flag to determine if we are on a subsequent attempt to updateTimes.

  // The API URL.
  var rmvWaitTimeURL = 'https://9p83os0fkf.execute-api.us-east-1.amazonaws.com/v1/waittime';
  // var rmvWaitTimeURL = 'http://rmvwaittime.digital.mass.gov.s3-website-us-east-1.amazonaws.com/';

  /**
   * Render the transformed wait times for the requested branch on the page.
   * @function
   * @param {Object} data branch display data with processed wait times.
   */
  var render = function (data) {
    var $licensing = $el.find('span[data-variable="licensing"]');
    if ($licensing.length) {
      $licensing.text(data.processedLicensing);
    }
    else {
      throw new Error('Can not find licensing wait time DOM element.');
    }

    var $registration = $el.find('span[data-variable="registration"]');
    if ($registration.length) {
      $registration.text(data.processedRegistration);
    }
    else {
      throw new Error('Can not find registration wait time DOM element.');
    }

    var time = dateTime.getCurrentTime();
    var $timestamp = $el.find('span[data-variable="timestamp"]');
    if ($timestamp.length) {
      $timestamp.text(time);
    }
    else {
      throw new Error('Can not find timestamp wait time DOM element.');
    }

  };

  /**
   * Get branch town value from url parameter.
   * @function getLocationFromURL
   * @param {Array} urlParams is an associative array of url parameters,
       returned from urlParser.parseParamsFromUrl().
   * @return {String} The name of the town passed to the script.
   * @throws Error when 'town' is not found in the array of parameters.
   */
  var getLocationFromURL = function (urlParams) {
    // Define param for the branch town query.
    var branchParamName = 'town';

    if (urlParams[branchParamName]) {
      return urlParams[branchParamName];
    }
    else {
      throw new Error('No town parameter passed.');
    }
  };

  /**
   * Transform the wait time raw strings into processed wait time strings according to ticket spec.
   * @function
   * @param {String} waitTime is the raw wait time for either the branch licensing or registration.
   * @return {String} A transformed wait time duration in human readable format.
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
  var transformTime = function (waitTime) {
    // Default to unavailable.
    var displayTime = waitTimeUnavailableString;

    // Closed = 'Closed'.
    if (waitTime === 'Closed') {
      displayTime = 'Closed';
      return displayTime;
    }

    // 0 = 'No wait time'.
    if (waitTime === '00:00:00') {
      displayTime = 'No wait time';
      return displayTime;
    }

    // < 1 minute = 'Less than a minute'.
    if (waitTime.startsWith('00:00:')) {
      displayTime = 'Less than a minute';
      return displayTime;
    }

    // Everything else: format the time string.

    // Make sure moment js can work with the waitTime string.
    // moment.duration accepts 'HH:MM:SS'
    // see: https://momentjs.com/docs/#/durations/
    var durationRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
    var waitTimeIsDuration = durationRegex.test(waitTime);

    if (!waitTimeIsDuration) {
      return displayTime; // Wait time unavailable
      // throw new Error('The wait time is not duration string following "HH:MM:SS".');
    }

    // Create a moment duration with the waitTime string.
    var m = moment.duration(waitTime);

    // Declare moment formatter template partials.
    var hourTemplate = '';
    var minuteTemplate = '';

    // Round minutes up to nearest 15 if there is 1+ hour.
    if (m.hours() >= 1) {
      if (m.minutes() !== 0) { // Do not round 0 minutes up to 15.
        var remainder = 15 - m.minutes() % 15;
        m = moment.duration(m).add(remainder, 'minutes');
      }
    }
    else {
      if (m.minutes() >= 1) {
        // Round up a minute if there are 20+ seconds (and at least 1 minute).
        if (m.seconds() >= 20) {
          m = moment.duration(m).add(1, 'minutes');
        }
      }
    }

    // Set hour template partial.
    if (m.hours() > 1) {
      hourTemplate = 'h [hours]';
    }
    if (m.hours() === 1) {
      hourTemplate = 'h [hour]';
    }

    // Set minute template partial.
    if (m.minutes() === 1) {
      minuteTemplate = 'm [minute]';
    }
    if (m.minutes() > 1) {
      minuteTemplate = 'm [minutes]';
    }

    // Create format template from partials:
    // - only add a ', ' in between partials if we have them both
    // - otherwise, just write them both (since one of them is empty)
    var template = hourTemplate && minuteTemplate
      ? hourTemplate + ', ' + minuteTemplate
      : hourTemplate + minuteTemplate;

    // Apply the template to the duration
    displayTime = m.format({template: template});

    return displayTime;
  };

  /**
   * Pass the wait time raw strings into function to transform wait time strings according to ticket spec.
   * @function
   * @param {Object} branch contains wait time strings for licensing and registration.
   * @return {Object} An object of the requested branch with additional processed wait time stings for 'licensing'
   * and 'registration'.
   */
  var processWaitTimes = function (branch) {

    // Pass each wait time string (licensing + registration) through transform function.
    branch.processedLicensing = transformTime(branch.licensing);
    branch.processedRegistration = transformTime(branch.registration);

    console.warn(branch);
    return branch;
  };

  /**
   * Extract the specific branch wait times from xml feed.
   * @function
   * @param {xml} xml feed of rmv <branches> wait time data.
   * @return {Object} An object of the requested branch wait time stings for 'licensing'
        and 'registration' properties.
   * @throws Error when we can't find the branch corresponding to the passed town in the data feed.
   */
  var getBranch = function (xml) {
    var urlParams = urlParser.parseParamsFromUrl();
    try {
      var location = getLocationFromURL(urlParams);
    }
    catch (e) {
      console.error(e);
      // Send to google analytics as error event if we don't have a location argument.
      ga('send', {
        hitType: 'event',
        eventCategory: 'error',
        eventAction: e.message,
        eventLabel: window.location.href
      });
    }

    if (location) {
      // In XML, branch towns use Title Case, so convert location argument just to be safe.
      var locationTitleCased = stringConversions.titleCase(location);

      // Get the <branch> which matches the location.
      var $branch = $(xml).find('branch').filter(function () {
        return $(this).find('town').text() === locationTitleCased;
      });

      if ($branch.length) {
        // MassDOT confirms every <branch> will have both licensing and registration times.
        return {
          licensing: $branch.find('licensing').text(),
          registration: $branch.find('registration').text()
        };
      }
      throw new Error('Could not find wait time information for provided location.');
    }
  };

  /**
   * Get the rmv wait times for a specific branch.
   * @function
   * @return {Promise} A promise which contains only the requested branch's wait times on success.
   */
  var getBranchData = function () {
    var promise = $.Deferred();

    $.ajax({
      type: 'GET',
      url: rmvWaitTimeURL,
      cache: false,
      dataType: 'xml',
      crossDomain: true,
      contentType: 'application/xml; charset=utf-8'
    })
    .done(function (data) {
      // Get data for the <branch> that we want from the xml.
      try {
        var branch = getBranch(data);
      }
      catch (e) {
        console.error(e);
        // Send to google analytics as error event if we can't get the branch.
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
    .fail(function (jqXHR, textStatus, errorThrown) {
      // Get + return ajax response Text (html), remove tags, empty items, format string.
      // var responseString = jqXHR.responseText.replace(/(<([^>]+)>)/ig, '');
      // var responseArray = responseString.split('\n');
      // var responseArrayNoBlankSpaces = responseArray.filter(function (entry) { return entry.trim() !== ''; });
      // var message = responseArrayNoBlankSpaces.join(': ');
      console.error(textStatus);

      // Send to google analytics as error event if we get ajax error.
      ga('send', {
        hitType: 'event',
        eventCategory: 'error',
        eventAction: textStatus,
        eventLabel: window.location.href
      });

      promise.reject();
    });

    return promise;
  };

  /**
   * Gets, transforms, and renders the wait times for a specific rmv branch.
   * @function
   */
  var updateTimes = function () {
    // get the branch data
    getBranchData()
      .done(function (branchData) {
        // transform data
        try {
          var branchDisplayData = processWaitTimes(branchData);
        }
        catch (e) {
          console.error(e.message);
          // Send to google analytics as error event if we can not render data.
          ga('send', {
            hitType: 'event',
            eventCategory: 'error',
            eventAction: e.message,
            eventLabel: window.location.href
          });

          // Do not try to keep running
          stopWaitTimeRefresh();

          return false; // Do not reveal widget with no data.
        }

        // render information
        try {
          render(branchDisplayData);
        }
        catch (e) {
          console.error(e.message);
          // Send to google analytics as error event if we can not render data.
          ga('send', {
            hitType: 'event',
            eventCategory: 'error',
            eventAction: e.message,
            eventLabel: window.location.href
          });

          // Do not try to keep running
          stopWaitTimeRefresh();

          return false; // Do not reveal widget with no data.
        }

        $el.removeClass('visually-hidden');

        // Set flag: we have successfully rendered wait times at least once.
        hasSucceeded = true;
      })
      .fail(function () {
        // If this is the first attempt to update wait times, show "Wait time unavailable"
        // otherwise leave the last successful wait time in place
        if (!hasSucceeded) {
          try {
            render({
              processedLicensing: waitTimeUnavailableString,
              processedRegistration: waitTimeUnavailableString
            });
          }
          catch (e) {
            console.error(e.message);
            // Send to google analytics as error event if we can not render anything.
            ga('send', {
              hitType: 'event',
              eventCategory: 'error',
              eventAction: e.message,
              eventLabel: window.location.href
            });

            return false; // Do not reveal widget with no data.
          }

          $el.removeClass('visually-hidden');
        }

        // Do not try to keep running
        stopWaitTimeRefresh();
      });
  };

  // Define setInterval reference variable inside module so we can clear it from within.
  var refreshTimer = null;

  var waitTimeRefresh = function () {
    refreshTimer = setInterval(this.updateTimes, 60000);
  };

  var stopWaitTimeRefresh = function () {
    clearInterval(refreshTimer);
  };

  var api = {
    updateTimes: updateTimes,
    waitTimeRefresh: waitTimeRefresh
  };

  // removeIf(production)
  api.transformTime = transformTime;
  api.getLocationFromURL = getLocationFromURL;
  api.render = render;
  // endRemoveIf(production)

  return api;
}(jQuery);
