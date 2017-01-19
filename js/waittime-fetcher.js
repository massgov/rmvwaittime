/**
 * Created by jconstantine on 1/16/17.
 */
// https://jira.state.ma.us/browse/DP-822
(function(){
  'use strict';
  // API URL
  // var rmvWaitTimeURL = 'https://www.massdot.state.ma.us/feeds/qmaticxml/qmaticXML.aspx';
  var rmvWaitTimeURL = 'waittime.xml';


  // Get branch css path iframe src URL (passed by drupal content authors) -- url parser helper in Mayflower
  // Get branch js path iframe src URL (passed by drupal content authors) -- url parser helper in Mayflower


  // Capture current time to show when last refresh occurred
  // for: Wait times refreshed at ______ in component footer
  var currentTimestamp = Date.now();

  // Get branch from iframe src URL (passed by drupal content authors)
  function getLocation() {
    // return pretendTheresAQueryParamFn('loc');
    // return 'Brockton';
    // return 'Natick'; // closed
    // return 'Milford'; // No wait time
    return 'Lowell'; // Less than a minute
  }


  // processWaittimes()
  var processWaittimes = function (branch) {
    branch.processedLicensing = 'Estimation unavailable';
    branch.processedLicensing = 'Estimation unavailable';

    // Closed = 'Closed'
    branch.processedLicensing = branch.licensing == 'Closed' ? 'Closed' : branch.procssedLicensing;
    branch.processedRegistration = branch.registration == 'Closed' ? 'Closed' : branch.procssedRegistration;

    // 0 = 'No wait time'
    branch.processedLicensing = branch.licensing == '00:00:00' ? 'No wait time' : branch.procssedLicensing;
    branch.processedRegistration = branch.registration == '00:00:00' ? 'No wait time' : branch.procssedRegistration;


    // < 1 minute = 'Less than a minute'
    branch.processedLicensing = branch.licensing.includes('00:00:') ? 'Less than a minute' : branch.procssedLicensing;
    branch.processedRegistration = branch.registration.includes('00:00:') ? 'Less than a minute' : branch.procssedRegistration;

    // explode string into array
    var licensingArray = branch.licensing.split(":");
    var registrationArray = branch.registration.split(":");

    // if [0] == 1 string += 1 hour
    // if [0] > 1 string += [0] hours
    // >> if [1], string += [1] round up to quarter hour minutes when not = 0

    console.log(licensingArray);
    console.log(registrationArray);

    // singular minute/hour for 1, plural for +1 (no abbreviations)

    // < 1 hour: round to the minute

    // > 1 hour: round to the quarter hour

    console.log(branch);
    return branch;
  };


  // only show needed info (hide wait time heading if no info)

  // getBranch(xml)
  function getBranch(xml) {
    var location = getLocation();
    var $branch = $(xml).find('branch').filter(function() { return $(this).find('town').text() == location; });
    return {
      "licensing": $branch.find('licensing').text(),
      "registration": $branch.find('registration').text()
    };
  }

  // // determine if branch is closed
  // function isBranchClosed(branch) {
  //   return ((branch.licensing && branch.licensing == "Closed") && (branch.registration && branch.registration == "Closed"));
  // }


  // handleWaittimes(data)
  var handleWaittimes = function(data) {
    var branch = getBranch(data);
    // if (!isBranchClosed(branch)) {
      processWaittimes(branch);
    // }
  };

  // getData()
  // Make xmlhttprequest
  // -- returns <branches> with all <branch> information
  // -- error handling = "Estimation Unavailable"
  // Execute callback handleWaittimes() to handle XML
  /**
   * ex: {
     town: 'Natick',
     licensing: '00:07:24' || 'Closed || '00:00:00',
     registration: '00:00:06' || 'Closed' || '00:00:00'
   }
   */
  function getData() {
    var promise = $.ajax({
      type: 'GET',
      url: rmvWaitTimeURL,
      dataType: 'xml'
    });

    promise.done(function(data){
      handleWaittimes(data);
    });

    promise.fail(function(){
      console.log('Estimation unavailable');
      return 'Estimation unavailable'
    });

    return promise;
  }


  function updateTimes() {
    var data = getData();
    console.log('getData: ', data);
  }

  // setTimeout every minute to updateTimes()
  setTimeout(updateTimes, 1000);
})();
