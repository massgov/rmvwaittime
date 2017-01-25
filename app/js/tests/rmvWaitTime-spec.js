'use strict';
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should,
    assert = chai.assert,
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

// rmvWaitTime should transform raw time string according to spec
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

  it('should not contain "minutes" when "**:01:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '00:01:05';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.not.contain('minutes');
  });

  it('should contain "minutes" when "**:02:**" is passed', function() {
    // ... 1 minute should contain 'minute'
    var input = '00:02:10';
    var actual = rmvWaitTime.transformTime(input);
    expect(actual).to.contain('minutes');
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

  it('should round up to 2 hours when "01:55:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '01:55:55';
    var actual = rmvWaitTime.transformTime(input);
    var expected = '2 hours';
    expect(actual).to.eql(expected);
  });

  it('should round up to nearest minute when "00:**:3*" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '00:25:35';
    var actual = rmvWaitTime.transformTime(input);
    var expected = '26 minutes';
    expect(actual).to.eql(expected);
  });

  it('should not round up to nearest minute when "00:00:**" is passed', function() {
    // ... 1 minute should not contain 'minutes'
    var input = '00:00:45';
    var actual = rmvWaitTime.transformTime(input);
    var expected = 'Less than a minute';
    expect(actual).to.eql(expected);
  });

  it('should display "Wait Time Unavailble"  when "Foo" is passed', function() {
    // String other than 'Closed' or 'HH:MM:SS' should return 'Wait time unavailable'
    var input = 'fooooooo';
    var actual = rmvWaitTime.transformTime(input);
    var expected = 'Wait time unavailable';
    expect(actual).to.eql(expected);
  });
});

// Make sure we can get the branch location from the URL
describe('#getLocationFromURL()', function() {
  // create some jsdom magic to allow jQuery to work
  var $ = global.jQuery = require('../../../assets/js/vendor/bower_components/jquery/dist/jquery.js')(window);

  var rmvWaitTime = require('../modules/rmvWaitTime.js');

  it('should return "Natick" when "{town:\'Natick\'} (IE /?town=Natick)" is passed.', function() {
    var input = {town:'Natick'};
    var actual = rmvWaitTime.getLocationFromURL(input);
    var expected = 'Natick';
    expect(actual).to.eql(expected);
  });

  it('should throw error when no town argument (IE /) is passed', function() {
    var input = '';
    // assert.throw(rmvWaitTime.getLocationFromURL(input), Error, "No town parameter passed.");
    // Pass expect a function that will get called, not the result of calling it

    expect(rmvWaitTime.getLocationFromURL.bind(rmvWaitTime.getLocationFromURL, input)).to.throw("No town parameter passed.");
  });
});

// Make sure we can write to the component selectors
describe('#render()', function() {
  // create some jsdom magic to allow jQuery to work
  var $ = global.jQuery = require('../../../assets/js/vendor/bower_components/jquery/dist/jquery.js')(window);

  var rmvWaitTime = require('../modules/rmvWaitTime.js'),
      $el = $('.ma__wait-time');

  it('should populate widget when "{ processedLicensing: \'1 hour, 32 minutes\', processedRegistration: \'30 minutes\' }" is passed.', function() {
    var input = {
      processedLicensing: "1 hour, 32 minutes",
      processedRegistration: "30 minutes"
    };
    var actual = rmvWaitTime.render(input);
    expect($el.find('span[data-variable="licensing"]').text()).to.equal('1 hour, 32 minutes');
    expect($el.find('span[data-variable="registration"]').text()).to.equal('30 minutes');
  });
});
