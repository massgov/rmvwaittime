'use strict';
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    jsdom = require('jsdom').jsdom,
    document = jsdom('<html class="pl no-js" lang="en"><head></head><body class="" style="overflow-x: hidden !important;"><section class="ma__wait-time visually-hidden"> <h2 class="ma__wait-time__title"> <svg focusable="false" role="presentation" class="svg-wait-time"> <use xlink:href="assets/images/svg-sprite.svg#wait-time"></use> </svg> <span>Wait Time</span> </h2> <ul class="ma__wait-time__items"> <li class="ma__wait-time__item"> <div class="ma__wait-time__label">Licensing:</div><div class="ma__wait-time__value"> <span class="ma__wait-time__time" data-variable="licensing"></span> </div></li><li class="ma__wait-time__item"> <div class="ma__wait-time__label">Registration:</div><div class="ma__wait-time__value"> <span class="ma__wait-time__time" data-variable="registration"></span> </div></li></ul> <span class="ma__wait-time__refreshed">Updated at <span data-variable="timestamp"></span></span> </section></body></html>'),
    window = document.defaultView;

// rmvWaitTime should exist
describe('rmvWaitTime', function() {
  // create some jsdom magic to allow jQuery to work
  var $ = global.jQuery = require('../../../assets/js/vendor/bower_components/jquery/dist/jquery.js')(window);

  it('should exist', function() {
    var rmvWaitTime = require('../modules/rmvWaitTime.js');
    expect(rmvWaitTime).to.not.be.undefined;
  });
});

// rmvWaitTime should transform raw time string
describe('#transformTime()', function() {
  // create some jsdom magic to allow jQuery to work
  var $ = global.jQuery = require('../../../assets/js/vendor/bower_components/jquery/dist/jquery.js')(window);

  var rmvWaitTime = require('../modules/rmvWaitTime.js');

  it('should return "No wait time" when "00:00:00" is passed', function() {
    // 00:00:00 should = 'No wait time'
    var input = '00:00:00';
    var expected = 'No wait time';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.eql(expected);
  });

  it('should return "Closed" when "Closed" is passed', function() {

    // Closed should = 'Closed'
    var input = 'Closed';
    var expected = 'Closed';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.eql(expected);
  });

  it('should return "Less than a minute" when "00:00:**" is passed', function() {
    // < 1 minute (IE '00:00:30') should = 'Less than a minute'
    var input = '00:00:30';
    var expected = 'Less than a minute';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.eql(expected);
  });

  it('should contain "hour" when "01:**:**" is passed', function() {
    // 1 hour ... should contain 'hour'
    var input = '01:15:30';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.contain('hour');
  });

  it('should not contain "hours" when "01:**:**" is passed', function() {
    // 1 hour ... should not contain 'hours'
    var input = '01:15:30';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.not.contain('hours');
  });

  it('should contain "hours" when "02:**:**" is passed', function() {
    // 1 hour ... should contain 'hour'
    var input = '02:15:30';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.contain('hours');
  });

  it('should not contain "hour" when "02:**:**" is passed', function() {
    // 1 hour ... should not contain 'hours'
    var input = '02:15:30';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.not.contain('hour');
  });

  it('should contain "minute" when "**:01:**" is passed', function() {
    // ... 1 minute should contain 'minute'
    var input = '01:01:10';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.contain('minute');
  });

  it('should not contain "minutes" when "**:01:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '01:01:10';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.not.contain('minutes');
  });

  it('should contain "minutes" when "**:02:**" is passed', function() {
    // ... 1 minute should contain 'minute'
    var input = '00:02:10';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.contain('minutes');
  });

  it('should not contain "minute" when "**:02:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '01:02:10';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.not.contain('minute');
  });

  it('should round up to nearest 15 minutes when "01:01:45" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '01:01:45';
    var actual = rmvWaitTime.transformTime(input);
    var expected = '1 hour, 15 minutes';
    expect(actual).to.eql(expected);
  });

  it('should round up to nearest 15 minutes when "01:18:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '01:18:23';
    var actual = rmvWaitTime.transformTime(input);
    var expected = '1 hour, 30 minutes';
    expect(actual).to.eql(expected);
  });

  it('should round up to nearest 15 minutes when "01:32:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '01:32:55';
    var actual = rmvWaitTime.transformTime(input);
    var expected = '1 hour, 45 minutes';
    expect(actual).to.eql(expected);
  });

  it('should round up to the 2 hours when "01:55:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '01:55:55';
    var actual = rmvWaitTime.transformTime(input);
    var expected = '2 hours';
    expect(actual).to.eql(expected);
  });

  it('should round up to nearest minute when "00:**:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '00:25:25';
    var actual = rmvWaitTime.transformTime(input);
    var expected = '26 minutes';
    expect(actual).to.eql(expected);
  });
});

describe('#getLocationFromURL()', function() {
  // create some jsdom magic to allow jQuery to work
  var $ = global.jQuery = require('../../../assets/js/vendor/bower_components/jquery/dist/jquery.js')(window);

  var rmvWaitTime = require('../modules/rmvWaitTime.js');

  it('should return "Natick" when "[town=>\'Natick\'] (IE /?town=Natick)" is passed.', function() {
    var input = {town:'Natick'};
    var actual = rmvWaitTime.getLocationFromURL(input);
    var expected = 'Natick';
    expect(actual).to.eql(expected);
  });

  it('should throw error when no town argument (IE /) is passed', function() {
    var input = {town: 'Natick'};
    expect(rmvWaitTime.getLocationFromURL('blah')).to.throw("No town parameter passed.");
  });
});
