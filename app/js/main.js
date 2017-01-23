(function(window, document){
  "use strict";

  var waitTime = require("./modules/rmvWaitTime.js");

  // Update the wait times once then set interval to update again every minute.
  waitTime.updateTimes();
  waitTime.waitTimeRefresh();
  
})(window, document);
