(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = (function (window, document, undefined) {
  "use strict";

  function setCookie(name, value, expires) {
    if (typeof expires === 'number') {
      var d = new Date();
      d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires + "; path=/";
    } else {
      document.cookie = name + "=" + value + "; path=/";
    }
  }

  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  return {
    setCookie: setCookie,
    getCookie: getCookie
  };
})(window, document);

},{}],2:[function(require,module,exports){
"use strict";

var externalUrlCheck = (function () {
        var domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
        return function (url) {

                if (!url.length || url[0] === "#") {
                        return false;
                }

                function domain(url) {
                        return domainRe.exec(url)[1];
                }

                return domain(location.href) !== domain(url);
        };
})();

module.exports = externalUrlCheck;

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function (name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url: themePath + '/js/templates/' + name + '.html',
            success: function success(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async: false
        });
    }
    return Handlebars.templates[name];
};

},{}],4:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _modulesAccordionsJs = require("./modules/accordions.js");

var _modulesAccordionsJs2 = _interopRequireDefault(_modulesAccordionsJs);

var _modulesActionMapJs = require("./modules/actionMap.js");

var _modulesActionMapJs2 = _interopRequireDefault(_modulesActionMapJs);

var _modulesBack2topJs = require("./modules/back2top.js");

var _modulesBack2topJs2 = _interopRequireDefault(_modulesBack2topJs);

var _modulesBannerCarouselJs = require("./modules/bannerCarousel.js");

var _modulesBannerCarouselJs2 = _interopRequireDefault(_modulesBannerCarouselJs);

var _modulesClickableJs = require("./modules/clickable.js");

var _modulesClickableJs2 = _interopRequireDefault(_modulesClickableJs);

var _modulesDropdownJs = require("./modules/dropdown.js");

var _modulesDropdownJs2 = _interopRequireDefault(_modulesDropdownJs);

var _modulesEmergencyAlertsJs = require("./modules/emergencyAlerts.js");

var _modulesEmergencyAlertsJs2 = _interopRequireDefault(_modulesEmergencyAlertsJs);

var _modulesFormValidationJs = require("./modules/formValidation.js");

var _modulesFormValidationJs2 = _interopRequireDefault(_modulesFormValidationJs);

var _modulesHideAlertJs = require("./modules/hideAlert.js");

var _modulesHideAlertJs2 = _interopRequireDefault(_modulesHideAlertJs);

var _modulesKeywordSearchJs = require("./modules/keywordSearch.js");

var _modulesKeywordSearchJs2 = _interopRequireDefault(_modulesKeywordSearchJs);

var _modulesMainNavJs = require("./modules/mainNav.js");

var _modulesMainNavJs2 = _interopRequireDefault(_modulesMainNavJs);

var _modulesMainNavPilotJs = require("./modules/mainNavPilot.js");

var _modulesMainNavPilotJs2 = _interopRequireDefault(_modulesMainNavPilotJs);

var _modulesMobileNavJs = require("./modules/mobileNav.js");

var _modulesMobileNavJs2 = _interopRequireDefault(_modulesMobileNavJs);

var _modulesResponsiveVideoJs = require("./modules/responsiveVideo.js");

var _modulesResponsiveVideoJs2 = _interopRequireDefault(_modulesResponsiveVideoJs);

var _modulesRichTextJs = require("./modules/richText.js");

var _modulesRichTextJs2 = _interopRequireDefault(_modulesRichTextJs);

var _modulesScrollAnchorsJs = require("./modules/scrollAnchors.js");

var _modulesScrollAnchorsJs2 = _interopRequireDefault(_modulesScrollAnchorsJs);

var _modulesSiteSettingsJs = require("./modules/siteSettings.js");

var _modulesSiteSettingsJs2 = _interopRequireDefault(_modulesSiteSettingsJs);

var _modulesUtilNavJs = require("./modules/utilNav.js");

var _modulesUtilNavJs2 = _interopRequireDefault(_modulesUtilNavJs);

var _modulesZoomControlsJs = require("./modules/zoomControls.js");

var _modulesZoomControlsJs2 = _interopRequireDefault(_modulesZoomControlsJs);

},{"./modules/accordions.js":5,"./modules/actionMap.js":6,"./modules/back2top.js":7,"./modules/bannerCarousel.js":8,"./modules/clickable.js":9,"./modules/dropdown.js":10,"./modules/emergencyAlerts.js":11,"./modules/formValidation.js":12,"./modules/hideAlert.js":13,"./modules/keywordSearch.js":14,"./modules/mainNav.js":15,"./modules/mainNavPilot.js":16,"./modules/mobileNav.js":17,"./modules/responsiveVideo.js":18,"./modules/richText.js":19,"./modules/scrollAnchors.js":20,"./modules/siteSettings.js":21,"./modules/utilNav.js":22,"./modules/zoomControls.js":23}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-accordion').each(function () {
    var $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        active = refreshValue($el);

    $link.on('click', function (e) {
      if (active) {
        e.preventDefault();
        if ($el.hasClass('is-open')) {
          $content.stop(true, true).slideUp();
        } else {
          $content.stop(true, true).slideDown();
        }
        $el.toggleClass('is-open');
      }
    });

    $(window).resize(function () {
      var temp = refreshValue($el);

      if (temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
      }

      active = temp;
    }).resize();
  });

  function refreshValue($el) {
    var value = "true";
    try {
      value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
    } catch (err) {}
    return value === "false" ? false : true;
  };
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersGetHandlebarTemplateJs = require("../helpers/getHandlebarTemplate.js");

var _helpersGetHandlebarTemplateJs2 = _interopRequireDefault(_helpersGetHandlebarTemplateJs);

exports['default'] = (function (window, document, $, undefined) {

  // only run this code if there is a google map component on the page
  if (!$('.js-google-map').length || typeof googleMapData === 'undefined') {
    return;
  }

  var compiledTemplate = (0, _helpersGetHandlebarTemplateJs2['default'])('googleMapInfo');

  // after the api is loaded this function is called
  window.initMap = function () {

    $(".js-google-map").each(function (i) {
      // get the maps data
      var rawData = googleMapData[i];

      // *** Create the Map *** //
      // map defaults
      var initMapData = {
        scrollwheel: false
      };
      // create map Data
      var mapData = Object.assign({}, rawData.map, initMapData);

      var map = new google.maps.Map(this, mapData);

      // *** Add Markers with popups *** //
      rawData.markers.forEach(function (d) {
        var markerData = Object.assign({ map: map }, d);

        var marker = new google.maps.Marker(markerData);

        var infoData = infoTransform(markerData.infoWindow);
        var template = compiledTemplate(infoData);
        var infoWindow = new google.maps.InfoWindow({
          content: template
        });

        marker.addListener('click', function () {
          infoWindow.open(map, marker);
        });
      });

      // let infoWindow = new google.maps.InforWindow
    });
  };

  function infoTransform(data) {
    var infoData = {
      phoneFormatted: formatPhone(data.phone),
      faxFormatted: formatPhone(data.fax)
    };
    return Object.assign({}, data, infoData);
  }

  function formatPhone(phone) {
    var phoneTemp = phone[0] === '1' ? phone.substring(1) : phone;
    return phoneTemp.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  // load Google's api
  var script = document.createElement('script');
  script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyC-WIoNfS6fh7TOtOqpDEgKST-W_NBebTk&callback=initMap";
  document.getElementsByTagName('head')[0].appendChild(script);
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/getHandlebarTemplate.js":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  var $footer = $('.js-footer'),
      visibleThreshold = 250,
      staticThreshold = 50;

  $(".js-back2top").each(function () {
    var $el = $(this);

    $el.on('click', function (e) {
      e.preventDefault();
      try {
        $("html, body").stop(true, true).animate({ scrollTop: 0 }, '750');
      } catch (e) {
        $('body').scrollTop(0);
      }
      return false;
    });

    $(window).on('scroll', function () {
      // if we've exceeded the threshold of scrolling
      // from the top, show control
      var scrollTop = $(window).scrollTop();

      if (scrollTop > visibleThreshold) {
        $el.removeClass('is-hidden');
      } else {
        $el.addClass('is-hidden');
      }
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-banner-carousel').each(function () {
    var $el = $(this);

    if ($el.children().length <= 1) {
      return;
    }

    var slider = $el.slick({
      dots: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>'
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {
  $('.js-clickable').each(function () {
    // if the this is clicked
    $(this).click(function (event) {
      event.preventDefault();

      var $el = $(this).find('.js-clickable-link').first();
      // find the destination
      var dest = $el.attr("href");
      // if the target attribute exists
      if ("_blank" === $el.attr("target")) {
        // launch new tab/window
        window.open(dest);
      } else {
        // otherwise redirect to a new page
        window.location = dest;
      }
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
// ****** basic custom select that uses mobile select keyboard ******
"use strict";

var dropdownMenu = document.querySelectorAll(".js-dropdown");

if (null !== dropdownMenu) {

  var _length = dropdownMenu.length;

  var _loop = function (i) {
    var parentEl = dropdownMenu[i],
        selectEl = parentEl.querySelector(".js-dropdown-select"),
        link = parentEl.querySelector(".js-dropdown-link");

    if (null === selectEl || null === link) {
      return "break";
    }

    selectEl.onchange = function () {
      var elem = typeof this.selectedIndex === "undefined" ? window.event.srcElement : this;
      link.innerText = elem.text || elem.options[elem.selectedIndex].text;
    };
  };

  for (var i = 0; i < _length; i++) {
    var _ret = _loop(i);

    if (_ret === "break") break;
  }
}

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-emergency-alerts').each(function () {
    var $el = $(this),
        open = true,
        id = $el.data('id'),
        cookieName = 'emergency-alerts' + id,
        cookieValue = _helpersCookiesJs2['default'].getCookie(cookieName);

    if (typeof cookieValue != 'undefined' && cookieValue === 'false') {
      // cookieValue is a string so we can't use the value directly
      open = false;
    }
    if (open) {
      // expand the menu
      $el.find('.js-accordion-link').trigger('click');
    }

    $el.on('click', '.js-accordion-link', function () {
      // toggle the current state
      open = !open;
      // update open/close state cookie
      // leave off third argument to make it expire on session
      _helpersCookiesJs2['default'].setCookie(cookieName, open);
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('form').each(function () {
    var $form = $(this),
        requiredFields = [];

    // find all required fields
    $('.js-is-required').each(function () {
      var $field = $(this),
          type = $field.data('type'),
          value = $field.val(),
          valid = validate(value, type);

      requiredFields.push({ type: type, valid: valid, $el: $field });

      $(this).data('index', requiredFields.length);
    });

    // if there aren't any required fields, don't do anything
    if (requiredFields.length === 0) {
      return;
    }

    $form.on('submit', function (e) {
      var submitForm = true;

      // validate each required field
      requiredFields.forEach(function (item) {
        var value = item.$el.val();

        item.valid = validate(value, item.type);

        if (item.valid) {
          item.$el.attr('data-valid', 'is-valid');
        } else {
          submitForm = false;
          item.$el.attr('data-valid', 'is-invalid');
        }
      });

      if (!submitForm) {
        // prevent the form from submitting
        e.preventDefault();
        // show the form error message
        // or blink the message if it is already visible
        $form.find('.js-error-msg').attr('hidden', true);
        setTimeout(function () {
          $form.find('.js-error-msg').removeAttr('hidden');
        }, 100);
      }
    });
  });

  function validate(value) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? 'text' : arguments[1];

    var valid = false;

    switch (type) {
      case 'email':
        valid = !!value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+/i);
        break;
      default:
        valid = value.length !== 0;
    }

    return valid;
  }
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-header-alert').each(function () {
    var $el = $(this),
        $link = $el.find('.js-header-alert-link'),
        id = $el.data('id'),
        cookieName = "Alert" + id,
        cookieExpires = 365,
        cookieValue = _helpersCookiesJs2['default'].getCookie(cookieName);

    // show alert if cookie doesn't exist
    if (cookieValue !== "hide") {
      $el.fadeIn().fadeOut('fast').fadeIn('slow');
    }

    // hide the alert
    $link.on('click', function () {
      _helpersCookiesJs2['default'].setCookie(cookieName, "hide", cookieExpires);
      $el.stop(true, true).fadeOut();
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-keyword-search').each(function () {
    var $el = $(this),
        $form = $el.find('form');

    $form.on('submit', function (e) {
      e.preventDefault();
      $el.addClass('is-dirty');
    });

    $form.on('reset', function () {
      $el.removeClass('is-dirty');
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = (function (window, document, $, undefined) {

  var windowWidth = window.innerWidth;

  $(window).resize(function () {
    windowWidth = window.innerWidth;
  });

  $('.js-main-nav').each(function () {
    var openClass = "is-open",
        closeClass = "is-closed",
        submenuClass = "show-submenu",
        $parent = $(this),
        $mainNavToggle = $parent.find('.js-main-nav-toggle'),
        $mainNavItems = $parent.find('.js-main-nav-toggle, .js-main-nav-top-link'),
        previousKey = null,
        breakpoint = 800; // matches CSS breakpoint for Main Nav

    $mainNavItems.on('keydown', function (e) {
      if (windowWidth <= breakpoint) {
        // only for desktop
        return;
      }

      // Grab all the DOM info we need...
      var $link = $(this),
          $topLevelLinks = $parent.find('.ma__main-nav__top-link'),
          open = $link.hasClass(openClass),
          $openContent = $parent.find('.js-main-nav-content.' + openClass),
          $focusedElement = $(document.activeElement),

      // relevant if open..
      $topLevelItem = $focusedElement.parents('.ma__main-nav__item'),
          $topLevelLink = $topLevelItem.find('.ma__main-nav__top-link'),
          $dropdownLinks = $link.find('.ma__main-nav__subitem .ma__main-nav__link'),
          focusIndexInDropdown = $dropdownLinks.index($focusedElement);

      // down arrow key
      if (e.keyCode === 40) {
        // hide content
        // If menubar focus
        //  - Open pull down menu and select first menu item
        //
        // If dropdown focus
        //  - Select next menu item
        e.preventDefault();
        if (open) {
          if (focusIndexInDropdown === $dropdownLinks.length - 1) {
            return;
          } else {
            if (focusIndexInDropdown === -1) {
              $dropdownLinks[1].focus();
            } else {
              $dropdownLinks[focusIndexInDropdown + 1].focus();
            }
            return;
          }
        } else {
          show($topLevelItem.find('.js-main-nav-content'));
          $link.addClass(openClass);
          if ($dropdownLinks[1]) {
            $dropdownLinks[1].focus();
          }
          return;
        }
      }

      if (e.keyCode === 38) {
        // up arrow
        // hide content
        // If menubar focus
        //  - Open pull down menu and select first menu item
        //
        // If dropdown focus
        //  - Select previous menu item
        e.preventDefault();
        if (open) {
          if (focusIndexInDropdown <= 1) {
            // not 0 bc of hidden first link
            hide($openContent);
            $topLevelLink.focus();
            return;
          } else {
            $dropdownLinks[focusIndexInDropdown - 1].focus();
            return;
          }
        } else {
          show($topLevelItem.find('.js-main-nav-content'));
          $link.addClass(openClass);
          return;
        }
      }

      // esc key
      if (e.keyCode === 27) {
        // Close menu and return focus to menubar
        e.preventDefault();
        hide($openContent);
        $link.removeClass(openClass);
        $topLevelLink.focus();
        return;
      }

      // left arrow key
      if (e.keyCode === 37) {
        e.preventDefault();
        // hide content
        // If menubar focus
        //  - Previous menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        hide($openContent);
        var index = $topLevelLinks.index($topLevelLink) - 1;
        if ($topLevelLinks[index]) {
          $topLevelLinks[index].focus();
        }
        return;
      }
      // right arrow key
      if (e.keyCode === 39) {
        e.preventDefault();
        // hide content
        // If menubar focus
        //  - Next menubar item
        //
        // If dropdown focus
        //  - Open next pull menu and select first item
        hide($openContent);
        var index = $topLevelLinks.index($topLevelLink) + 1;
        if ($topLevelLinks[index]) {
          $topLevelLinks[index].focus();
        }
        return;
      }

      // key code 9 is the tab key
      if (open || typeof e.keycode !== "undefined" && e.keycode !== 9) {
        return;
      }

      // hide content
      hide($openContent);
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      show($link.find('.js-main-nav-content'));
    });
    $mainNavItems.on('mouseenter', function (e) {
      if (windowWidth > breakpoint) {
        var $openContent = $(this).find('.js-main-nav-content');
        show($openContent);
      }
    });
    $mainNavItems.on('mouseleave', function (e) {
      if (windowWidth > breakpoint) {
        var $openContent = $(this).find('.js-main-nav-content');
        hide($openContent);
      }
    });
    $mainNavToggle.children('a').on('click', function (e) {
      if (windowWidth <= breakpoint) {
        e.preventDefault();
        var $content = $(this).parent().find('.js-main-nav-content');
        // add open class to this item
        $(this).parent().addClass(openClass);
        show($content);
      }
    });
    $mainNavToggle.last().find('.js-main-nav-content li').last().find('a').on('keydown', function (e) {
      e.stopPropagation();
      // previous key was not a shift
      if (e.keyCode === 9 && previousKey !== 16) {
        // tab arrow\
        var $openContent = $parent.find('.js-main-nav-content.' + openClass);
        hide($openContent);
      }
      previousKey = e.keyCode;
    });

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });

    // Hide any open submenu content when the sidebar menu is closed
    $('.js-header-menu-button').click(function () {
      var $openContent = $parent.find('.js-main-nav-content.' + openClass);
      hide($openContent);
    });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $parent.find("." + openClass).removeClass(openClass);

      if (windowWidth <= breakpoint) {
        $content.addClass(closeClass);
      } else {
        $content.stop(true, true).slideUp('fast', function () {
          $content.addClass(closeClass).slideDown(0);
        });
      }
    }

    function show($content) {
      $('body').addClass(submenuClass);
      if (windowWidth <= breakpoint) {
        $content.addClass(openClass).removeClass(closeClass);
      } else {
        $content.stop(true, true).delay(200).slideUp(0, function () {
          $content.addClass(openClass).removeClass(closeClass).slideDown('fast');
        });
      }
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-main-nav').each(function () {
    var $parent = $(this),
        $mainNavToggle = $parent.find('.js-main-nav-toggle');

    // make root top-level links inert for pilot
    $mainNavToggle.children('a').on('click', function (e) {
      e.preventDefault();
    });

    // Ensure top-level links that are potential anchor links close the sidebar on mobile
    $parent.find('.js-main-nav-top-link').find('a').on('click', function () {
      $('.js-header-menu-button').trigger('click');
    });
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],17:[function(require,module,exports){
// ****** Menu button ******
"use strict";

var menuButton = document.querySelector(".js-header-menu-button");

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

// ****** Main Header Search button on mobile should open the mobile menu  ******
var searchForm = document.querySelector(".js-header-search-menu .js-header-search-form");

if (null !== searchForm) {
  searchForm.addEventListener("submit", function (event) {
    if (window.innerWidth > 620) {
      return;
    }
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $('.js-ma-responsive-video').fitVids();
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _helpersExternalUrlCheckJs = require("../helpers/externalUrlCheck.js");

var _helpersExternalUrlCheckJs2 = _interopRequireDefault(_helpersExternalUrlCheckJs);

exports["default"] = (function (window, document, $, undefined) {

  $('.js-ma-rich-text table').wrap("<div class='ma__rich-text__table-wrapper'></div>");

  // get the external SVG link code
  fetch(themePath + '/images/svg-sprite/external-link.svg', {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'text/plain'
    })
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    // find all external links that need an icon
    $('.js-ma-rich-text a').each(function () {
      var $el = $(this),
          href = $el.attr('href');

      if ((0, _helpersExternalUrlCheckJs2["default"])(href) && !$el.children().length) {
        // wrap the link in a span tag
        $el.wrap('<span class="ma__decorative-link"></span>');
        // append the SVG to the link
        $el.append('&nbsp;' + data);
      }
    });
  })["catch"](function (e) {
    console.error('external link rte code failing');
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{"../helpers/externalUrlCheck.js":2}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  $(".js-scroll-anchors").each(function () {
    var $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        elHeight = undefined,
        headerBuffer = 0,
        lowerLimit = undefined,
        upperLimit = undefined,
        debounceTimer = undefined,
        activeClass = "is-active",
        activeAnchor = 0,
        anchors = [],
        numAnchors = 0,
        isMobile = false,
        linkScrolling = false;

    setVariables();

    // default assumption as to where the screen will load
    $el.attr('data-sticky', 'top');

    // update variables one more time to catch any post page load changes
    window.setTimeout(function () {
      setVariables();
    }, 1000);

    $el.find('a').on('click', function (e) {
      e.preventDefault();

      // is the menu closed on mobile
      if (!$el.hasClass('is-open') && isMobile) {
        // just show the menu
        $el.addClass('is-open');
        return;
      }

      // find the location of the desired link and scroll the page
      var position = anchors[$(this).data('index')].position;
      // close the menu
      $el.removeClass('is-open');
      // remove active flag from other links
      $el.find('.' + activeClass).removeClass(activeClass);
      // mark this link as active
      $(this).addClass(activeClass);
      activeAnchor = $(this).data('index');
      // prevent the scroll event from updating active links
      linkScrolling = true;

      $("html,body").stop(true, true).animate({ scrollTop: position }, '750', function () {
        linkScrolling = false;
      });
    });

    $el.find(".js-scroll-anchors-toggle").on('click', function () {
      $el.toggleClass('is-open');
    });

    // make the links sticky
    $(window).resize(function () {
      if (typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function () {
        setVariables();
        setPosition();
        activateLink();
      }, 300);
    });

    $(window).scroll(function () {
      setPosition();
      activateLink();
    });

    function setVariables() {
      var topOffset = 0;

      headerBuffer = 0;
      elHeight = $el.height();
      upperLimit = $elParent.offset().top;
      isMobile = checkMobile($el);

      if ($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if (isMobile) {
        headerBuffer = $('.js-sticky-header').height() || 0;
        upperLimit -= headerBuffer;
        topOffset = elHeight;
      }

      lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

      // locate the position of all of the anchor targets
      anchors = new Array();
      $el.find('a').each(function (i, e) {
        var hash = this.hash,
            position = $(hash).offset() ? $(hash).offset().top - headerBuffer - topOffset : upperLimit;

        anchors[i] = { hash: hash, position: position };

        $(this).data('index', i);
      });

      // record the number of anchors for performance
      numAnchors = anchors.length;
    }

    function setPosition() {
      var windowTop = $(window).scrollTop(),
          attr = $el.attr('data-sticky'),
          top = attr !== 'top' && windowTop <= upperLimit,
          middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
          bottom = attr !== 'bottom' && windowTop >= lowerLimit;

      if ($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if (!$elParent[0].hasAttribute("style") && isMobile && attr === 'middle') {
        $elParent.css({ 'paddingTop': elHeight });
      }

      if (top) {
        $el.attr('data-sticky', 'top');

        if (isMobile) {
          $elParent.removeAttr('style');
        }
      } else if (middle) {
        $el.attr('data-sticky', 'middle');

        if (isMobile) {
          $elParent.css({ 'paddingTop': elHeight });
        }
      } else if (bottom) {
        $el.attr('data-sticky', 'bottom');

        if (isMobile) {
          $elParent.removeAttr('style');
        }
      }
    }

    function activateLink() {
      // do we have more than one anchor
      if (numAnchors < 2 || linkScrolling) {
        return;
      }

      // get the current scroll position and offset by half the view port
      var windowTop = $(window).scrollTop() + window.innerHeight / 2,
          currentAnchor = activeAnchor;

      // is there a prev target
      // and
      // is the current scroll position above the current target
      if (currentAnchor > 0 && windowTop < anchors[activeAnchor].position) {
        // make the prev link active
        --activeAnchor;
      }

      // is there a next target
      // and
      // is the current scroll position below the next target
      else if (currentAnchor < numAnchors - 1 && windowTop > anchors[activeAnchor + 1].position) {
          // make the next link active
          ++activeAnchor;
        }

      if (currentAnchor !== activeAnchor) {
        // move the active flag
        $el.find('.' + activeClass).removeClass(activeClass);
        $el.find('a').eq(activeAnchor).addClass(activeClass);
      }
    }
  });

  function checkMobile($el) {
    var value = "true";
    try {
      value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
    } catch (err) {}
    return value === "false" ? false : true;
  };
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersCookiesJs = require("../helpers/cookies.js");

var _helpersCookiesJs2 = _interopRequireDefault(_helpersCookiesJs);

exports['default'] = (function (window, document, $, undefined) {

  $('.js-site-setting-form').each(function () {
    var $parent = $(this),
        $reset = $parent.find('.js-button-reset'),
        $themeSelect = $parent.find('.js-site-settings-theme select'),
        $langSelect = $parent.find('.js-site-settings-lang select'),
        $zoomControls = $parent.find('.js-zoom-controls'),
        defaultZoomVal = $zoomControls.find('input[type="radio"]:checked').val(),
        cookieName = "site-settings",
        cookieExpires = 365,
        cookieValue = JSON.parse(_helpersCookiesJs2['default'].getCookie(cookieName) || "{}");

    // set default values to match cookie values
    if (typeof cookieValue.zoom !== "undefined") {
      $zoomControls.find('input[value="' + cookieValue.zoom + '"]').prop('checked', true);
      $zoomControls.trigger('reset');
    }

    if (typeof cookieValue.theme !== "undefined") {
      $themeSelect.val(cookieValue.theme).trigger('change');
      $('body').attr('data-theme', cookieValue.theme);
    }

    if (typeof cookieValue.lang !== "undefined") {
      $langSelect.val(cookieValue.lang).trigger('change');
      $('html').attr('lang', cookieValue.lang);
    }

    $zoomControls.find('input[type="radio"]').on('change', function () {
      cookieValue.zoom = $(this).val();
      updateCookie();
    });

    $themeSelect.on('change', function () {
      cookieValue.theme = $(this).val();
      updateCookie();
      $('body').attr('data-theme', cookieValue.theme);
    });

    $langSelect.on('change', function () {
      cookieValue.lang = $(this).val();
      updateCookie();
      $('html').attr('lang', cookieValue.lang);
    });

    $reset.on("click", function (e) {
      cookieValue.zoom = defaultZoomVal;
      updateCookie();
      // trigger a reset of the custom form input JS
      setTimeout(function () {
        $zoomControls.trigger('reset');
        $parent.find('select').trigger('change');
      }, .1);
    });

    function updateCookie() {
      _helpersCookiesJs2['default'].setCookie(cookieName, JSON.stringify(cookieValue), cookieExpires);
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{"../helpers/cookies.js":1}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = (function (window, document, $, undefined) {

  $('.js-util-nav').each(function () {
    var openClass = "is-open",
        closeClass = "is-closed",
        submenuClass = "show-utilmenu",
        $parent = $(this),
        waitForIt = null;

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-util-nav-content.' + openClass);
      hide($openContent);
    });

    $parent.find('.js-util-nav-toggle > a').on('click', function (e) {
      e.preventdefault;

      var open = $(this).hasClass(openClass),
          $content = $(this).next('.js-util-nav-content'),
          $openContent = $parent.find('.js-util-nav-content.' + openClass);

      // hide other content
      hide($openContent);

      if (open) {
        return;
      }
      // add open class to this item
      $(this).addClass(openClass);
      // add open class to the correct content based on index
      $content.attr("aria-hidden", "false");

      setTimeout(function () {
        $content.removeClass(closeClass).addClass(openClass);
        $('body').addClass(submenuClass);
      }, .1);
    });

    $parent.find('.js-close-util-nav').on('click', function (e) {
      e.preventDefault;

      hide($(this).closest('.js-util-nav-content'));
    });

    $('.js-close-sub-nav').on('click', function () {
      var $openContent = $parent.find('.js-util-nav-content.' + openClass);
      hide($openContent);
    });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $parent.find("." + openClass).removeClass(openClass);
      $content.removeClass(openClass).addClass(closeClass);

      if (waitForIt) {
        clearTimeout(waitForIt);
      }
      waitForIt = setTimeout(function () {
        $content.attr("aria-hidden", "true");
      }, 1000);
    }
  });
})(window, document, jQuery);

;
module.exports = exports["default"];

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = (function (window, document, $, undefined) {

  // zoom controls updates/adds a data-zoom attribute to the html tag
  // with the desired level of zooming requeted.  CSS applies a scale
  // transform based on that value.

  $(".js-zoom-controls").each(function () {

    var $parent = $(this),
        $inputs = $(this).find('input[type="radio"]');

    $('html').attr("data-zoom", getCurrentValue());

    $inputs.on('change', function () {
      $('html').attr("data-zoom", $(this).val());
    });

    $parent.on('reset', function () {
      $('html').attr("data-zoom", getCurrentValue());
    });

    function getCurrentValue() {
      return $parent.find('input[type="radio"]:checked').val();
    }
  });
})(window, document, jQuery);

;
module.exports = exports['default'];

},{}]},{},[4])

//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamNvbnN0YW50aW5lL21hc3Nnb3Ytd29yay9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL2hlbHBlcnMvY29va2llcy5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvaGVscGVycy9leHRlcm5hbFVybENoZWNrLmpzIiwiL1VzZXJzL2pjb25zdGFudGluZS9tYXNzZ292LXdvcmsvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9oZWxwZXJzL2dldEhhbmRsZWJhclRlbXBsYXRlLmpzIiwiL1VzZXJzL2pjb25zdGFudGluZS9tYXNzZ292LXdvcmsvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9pbmRleC5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9hY2NvcmRpb25zLmpzIiwiL1VzZXJzL2pjb25zdGFudGluZS9tYXNzZ292LXdvcmsvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2FjdGlvbk1hcC5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9iYWNrMnRvcC5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9iYW5uZXJDYXJvdXNlbC5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9jbGlja2FibGUuanMiLCIvVXNlcnMvamNvbnN0YW50aW5lL21hc3Nnb3Ytd29yay9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvZHJvcGRvd24uanMiLCIvVXNlcnMvamNvbnN0YW50aW5lL21hc3Nnb3Ytd29yay9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvZW1lcmdlbmN5QWxlcnRzLmpzIiwiL1VzZXJzL2pjb25zdGFudGluZS9tYXNzZ292LXdvcmsvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2Zvcm1WYWxpZGF0aW9uLmpzIiwiL1VzZXJzL2pjb25zdGFudGluZS9tYXNzZ292LXdvcmsvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL2hpZGVBbGVydC5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9rZXl3b3JkU2VhcmNoLmpzIiwiL1VzZXJzL2pjb25zdGFudGluZS9tYXNzZ292LXdvcmsvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL21haW5OYXYuanMiLCIvVXNlcnMvamNvbnN0YW50aW5lL21hc3Nnb3Ytd29yay9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvbWFpbk5hdlBpbG90LmpzIiwiL1VzZXJzL2pjb25zdGFudGluZS9tYXNzZ292LXdvcmsvbWF5Zmxvd2VyL3N0eWxlZ3VpZGUvc291cmNlL2Fzc2V0cy9qcy9tb2R1bGVzL21vYmlsZU5hdi5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9yZXNwb25zaXZlVmlkZW8uanMiLCIvVXNlcnMvamNvbnN0YW50aW5lL21hc3Nnb3Ytd29yay9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvcmljaFRleHQuanMiLCIvVXNlcnMvamNvbnN0YW50aW5lL21hc3Nnb3Ytd29yay9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvc2Nyb2xsQW5jaG9ycy5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy9zaXRlU2V0dGluZ3MuanMiLCIvVXNlcnMvamNvbnN0YW50aW5lL21hc3Nnb3Ytd29yay9tYXlmbG93ZXIvc3R5bGVndWlkZS9zb3VyY2UvYXNzZXRzL2pzL21vZHVsZXMvdXRpbE5hdi5qcyIsIi9Vc2Vycy9qY29uc3RhbnRpbmUvbWFzc2dvdi13b3JrL21heWZsb3dlci9zdHlsZWd1aWRlL3NvdXJjZS9hc3NldHMvanMvbW9kdWxlcy96b29tQ29udHJvbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQSxVQUFTLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDO0FBQ3BELGNBQVksQ0FBQzs7QUFFYixXQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUN2QyxRQUFHLE9BQU8sT0FBTyxBQUFDLEtBQUssUUFBUSxFQUFFO0FBQy9CLFVBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDbkIsT0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUksT0FBTyxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQUFBQyxDQUFDLENBQUM7QUFDakQsVUFBSSxPQUFPLEdBQUcsVUFBVSxHQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN6QyxjQUFRLENBQUMsTUFBTSxHQUFH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aEQsQ0FBQyxDQUFDOztBQUVILGFBQVMsZUFBZSxHQUFHO0FBQ3pCLGFBQU8sT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQzFEO0dBRUYsQ0FBQyxDQUFDO0NBRUosQ0FBQSxDQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxDQUFDOztBQUFBLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpe1xyXG4gIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICBmdW5jdGlvbiBzZXRDb29raWUobmFtZSwgdmFsdWUsIGV4cGlyZXMpIHtcclxuICAgIGlmKHR5cGVvZihleHBpcmVzKSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAoZXhwaXJlcyoyNCo2MCo2MCoxMDAwKSk7XHJcbiAgICAgIHZhciBleHBpcmVzID0gXCJleHBpcmVzPVwiK2QudG9VVENTdHJpbmcoKTtcclxuICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBcIjsgXCIgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBcIjsgcGF0aD0vXCI7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcclxuICAgIHZhciB2YWx1ZSA9IFwiOyBcIiArIGRvY3VtZW50LmNvb2tpZTtcclxuICAgIHZhciBwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiOyBcIiArIG5hbWUgKyBcIj1cIik7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoID09IDIpIHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdChcIjtcIikuc2hpZnQoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZXRDb29raWUsXHJcbiAgICBnZXRDb29raWVcclxuICB9O1xyXG5cclxufSh3aW5kb3csIGRvY3VtZW50KTtcclxuXHJcbiIsInZhciBleHRlcm5hbFVybENoZWNrID0gKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZG9tYWluUmUgPSAvaHR0cHM/OlxcL1xcLygoPzpbXFx3XFxkLV0rXFwuKStbXFx3XFxkXXsyLH0pL2k7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24odXJsKSB7XHJcblxyXG4gICAgICAgIGlmICghdXJsLmxlbmd0aCB8fCB1cmxbMF0gPT09IFwiI1wiKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkb21haW4odXJsKSB7XHJcbiAgICAgICAgICByZXR1cm4gZG9tYWluUmUuZXhlYyh1cmwpWzFdOyAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZG9tYWluKGxvY2F0aW9uLmhyZWYpICE9PSBkb21haW4odXJsKTtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZXh0ZXJuYWxVcmxDaGVjazsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICBpZiAoSGFuZGxlYmFycy50ZW1wbGF0ZXMgPT09IHVuZGVmaW5lZCB8fCBIYW5kbGViYXJzLnRlbXBsYXRlc1tuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICB1cmwgOiB0aGVtZVBhdGggKyAnL2pzL3RlbXBsYXRlcy8nICsgbmFtZSArICcuaHRtbCcsXHJcbiAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgIGlmIChIYW5kbGViYXJzLnRlbXBsYXRlcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgIEhhbmRsZWJhcnMudGVtcGxhdGVzID0ge307XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIEhhbmRsZWJhcnMudGVtcGxhdGVzW25hbWVdID0gSGFuZGxlYmFycy5jb21waWxlKGRhdGEpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGFzeW5jIDogZmFsc2VcclxuICAgICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBIYW5kbGViYXJzLnRlbXBsYXRlc1tuYW1lXTtcclxufTtcclxuIiwiaW1wb3J0IGFjY29yZGlvbnMgICAgICAgZnJvbSBcIi4vbW9kdWxlcy9hY2NvcmRpb25zLmpzXCI7XG5pbXBvcnQgYWN0aW9uTWFwICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL2FjdGlvbk1hcC5qc1wiO1xuaW1wb3J0IGJhY2sydG9wICAgICAgICAgZnJvbSBcIi4vbW9kdWxlcy9iYWNrMnRvcC5qc1wiO1xuaW1wb3J0IGJhbm5lckNhcm91c2VsICAgZnJvbSBcIi4vbW9kdWxlcy9iYW5uZXJDYXJvdXNlbC5qc1wiO1xuaW1wb3J0IGNsaWNrYWJsZSAgICAgICAgZnJvbSBcIi4vbW9kdWxlcy9jbGlja2FibGUuanNcIjtcbmltcG9ydCBkcm9wZG93biAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvZHJvcGRvd24uanNcIjtcbmltcG9ydCBlbWVyZ2VuY3lBbGVydHMgIGZyb20gXCIuL21vZHVsZXMvZW1lcmdlbmN5QWxlcnRzLmpzXCI7XG5pbXBvcnQgZm9ybVZhbGlkYXRpb24gICBmcm9tIFwiLi9tb2R1bGVzL2Zvcm1WYWxpZGF0aW9uLmpzXCI7XG5pbXBvcnQgaGlkZUFsZXJ0ICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL2hpZGVBbGVydC5qc1wiO1xuaW1wb3J0IGtleXdvcmRTZWFyY2ggICAgZnJvbSBcIi4vbW9kdWxlcy9rZXl3b3JkU2VhcmNoLmpzXCI7XG5pbXBvcnQgbWFpbk5hdiAgICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL21haW5OYXYuanNcIjtcbmltcG9ydCBtYWluTmF2UGlsb3QgICAgIGZyb20gXCIuL21vZHVsZXMvbWFpbk5hdlBpbG90LmpzXCI7XG5pbXBvcnQgbW9iaWxlTmF2ICAgICAgICBmcm9tIFwiLi9tb2R1bGVzL21vYmlsZU5hdi5qc1wiO1xuaW1wb3J0IHJlc3BvbnNpdmVWaWRlbyAgZnJvbSBcIi4vbW9kdWxlcy9yZXNwb25zaXZlVmlkZW8uanNcIjtcbmltcG9ydCByaWNoVGV4dCAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvcmljaFRleHQuanNcIjtcbmltcG9ydCBzY3JvbGxBbmNob3JzICAgIGZyb20gXCIuL21vZHVsZXMvc2Nyb2xsQW5jaG9ycy5qc1wiO1xuaW1wb3J0IHNpdGVTZXR0aW5ncyAgICAgZnJvbSBcIi4vbW9kdWxlcy9zaXRlU2V0dGluZ3MuanNcIjtcbmltcG9ydCB1dGlsTmF2ICAgICAgICAgIGZyb20gXCIuL21vZHVsZXMvdXRpbE5hdi5qc1wiO1xuaW1wb3J0IHpvb21Db250cm9scyAgICAgZnJvbSBcIi4vbW9kdWxlcy96b29tQ29udHJvbHMuanNcIjtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLWFjY29yZGlvbicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICRsaW5rID0gJGVsLmZpbmQoJy5qcy1hY2NvcmRpb24tbGluaycpLFxyXG4gICAgICAgICRjb250ZW50ID0gJGVsLmZpbmQoJy5qcy1hY2NvcmRpb24tY29udGVudCcpLFxyXG4gICAgICAgIGFjdGl2ZSA9IHJlZnJlc2hWYWx1ZSgkZWwpO1xyXG5cclxuICAgICRsaW5rLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgICAgIGlmKGFjdGl2ZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZigkZWwuaGFzQ2xhc3MoJ2lzLW9wZW4nKSl7XHJcbiAgICAgICAgICAkY29udGVudC5zdG9wKHRydWUsdHJ1ZSkuc2xpZGVVcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkY29udGVudC5zdG9wKHRydWUsdHJ1ZSkuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRlbC50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgdGVtcCA9IHJlZnJlc2hWYWx1ZSgkZWwpO1xyXG5cclxuICAgICAgaWYodGVtcCAhPT0gYWN0aXZlICYmICF0ZW1wKSB7XHJcbiAgICAgICAgJGNvbnRlbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYWN0aXZlID0gdGVtcDtcclxuICAgIH0pLnJlc2l6ZSgpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiByZWZyZXNoVmFsdWUoJGVsKSB7XHJcbiAgICBsZXQgdmFsdWUgPSBcInRydWVcIjtcclxuICAgIHRyeSB7XHJcbiAgICAgIHZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoJGVsWzBdLCAnOmJlZm9yZScpLmdldFByb3BlcnR5VmFsdWUoJ2NvbnRlbnQnKS5yZXBsYWNlKC9cXFwiL2csICcnKTtcclxuICAgIH0gY2F0Y2goZXJyKSB7fVxyXG4gICAgcmV0dXJuIHZhbHVlID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHRydWU7XHJcbiAgfTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiaW1wb3J0IGdldFRlbXBsYXRlIGZyb20gXCIuLi9oZWxwZXJzL2dldEhhbmRsZWJhclRlbXBsYXRlLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gIC8vIG9ubHkgcnVuIHRoaXMgY29kZSBpZiB0aGVyZSBpcyBhIGdvb2dsZSBtYXAgY29tcG9uZW50IG9uIHRoZSBwYWdlXHJcbiAgaWYoISQoJy5qcy1nb29nbGUtbWFwJykubGVuZ3RoIHx8IHR5cGVvZiBnb29nbGVNYXBEYXRhID09PSAndW5kZWZpbmVkJyl7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBsZXQgY29tcGlsZWRUZW1wbGF0ZSA9IGdldFRlbXBsYXRlKCdnb29nbGVNYXBJbmZvJyk7XHJcblxyXG4gIC8vIGFmdGVyIHRoZSBhcGkgaXMgbG9hZGVkIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkXHJcbiAgd2luZG93LmluaXRNYXAgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAkKFwiLmpzLWdvb2dsZS1tYXBcIikuZWFjaChmdW5jdGlvbihpKSB7XHJcbiAgICAgIC8vIGdldCB0aGUgbWFwcyBkYXRhXHJcbiAgICAgIGxldCByYXdEYXRhID0gZ29vZ2xlTWFwRGF0YVtpXTtcclxuICAgICAgXHJcbiAgICAgIC8vICoqKiBDcmVhdGUgdGhlIE1hcCAqKiogLy9cclxuICAgICAgLy8gbWFwIGRlZmF1bHRzXHJcbiAgICAgIGxldCBpbml0TWFwRGF0YSA9IHtcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2VcclxuICAgICAgfVxyXG4gICAgICAvLyBjcmVhdGUgbWFwIERhdGFcclxuICAgICAgbGV0IG1hcERhdGEgPSBPYmplY3QuYXNzaWduKHt9LCByYXdEYXRhLm1hcCwgaW5pdE1hcERhdGEpO1xyXG5cclxuICAgICAgbGV0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAodGhpcywgbWFwRGF0YSk7XHJcblxyXG4gICAgICAvLyAqKiogQWRkIE1hcmtlcnMgd2l0aCBwb3B1cHMgKioqIC8vXHJcbiAgICAgIHJhd0RhdGEubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uKGQpe1xyXG4gICAgICAgIGxldCBtYXJrZXJEYXRhID0gT2JqZWN0LmFzc2lnbih7bWFwfSxkKTtcclxuXHJcbiAgICAgICAgbGV0IG1hcmtlciA9ICBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG1hcmtlckRhdGEpO1xyXG5cclxuICAgICAgICBsZXQgaW5mb0RhdGEgPSBpbmZvVHJhbnNmb3JtKG1hcmtlckRhdGEuaW5mb1dpbmRvdyk7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gY29tcGlsZWRUZW1wbGF0ZShpbmZvRGF0YSk7XHJcbiAgICAgICAgbGV0IGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XHJcbiAgICAgICAgICBjb250ZW50OiB0ZW1wbGF0ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYXJrZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGluZm9XaW5kb3cub3BlbihtYXAsIG1hcmtlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gbGV0IGluZm9XaW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb3JXaW5kb3dcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5mb1RyYW5zZm9ybShkYXRhKSB7XHJcbiAgICBsZXQgaW5mb0RhdGEgPSB7XHJcbiAgICAgIHBob25lRm9ybWF0dGVkOiBmb3JtYXRQaG9uZShkYXRhLnBob25lKSxcclxuICAgICAgZmF4Rm9ybWF0dGVkOiBmb3JtYXRQaG9uZShkYXRhLmZheClcclxuICAgIH1cclxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LGRhdGEsaW5mb0RhdGEpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZm9ybWF0UGhvbmUocGhvbmUpIHtcclxuICAgIGxldCBwaG9uZVRlbXAgPSBwaG9uZVswXSA9PT0gJzEnID8gcGhvbmUuc3Vic3RyaW5nKDEpIDogcGhvbmU7XHJcbiAgICByZXR1cm4gcGhvbmVUZW1wLnJlcGxhY2UoLyhcXGR7M30pKFxcZHszfSkoXFxkezR9KS8sICcoJDEpICQyLSQzJyk7XHJcbiAgfVxyXG5cclxuICAvLyBsb2FkIEdvb2dsZSdzIGFwaVxyXG4gIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIHNjcmlwdC5zcmMgPSBcIi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcz9rZXk9QUl6YVN5Qy1XSW9OZlM2Zmg3VE90T3FwREVnS1NULVdfTkJlYlRrJmNhbGxiYWNrPWluaXRNYXBcIjtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcbiAgbGV0ICRmb290ZXIgPSAkKCcuanMtZm9vdGVyJyksXHJcbiAgICAgIHZpc2libGVUaHJlc2hvbGQgPSAyNTAsXHJcbiAgICAgIHN0YXRpY1RocmVzaG9sZCA9IDUwO1xyXG5cclxuICAkKFwiLmpzLWJhY2sydG9wXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgJGVsID0gJCh0aGlzKTtcclxuXHJcbiAgICAkZWwub24oJ2NsaWNrJyxmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5zdG9wKHRydWUsdHJ1ZSkuYW5pbWF0ZSh7c2Nyb2xsVG9wOjB9LCAnNzUwJyk7XHJcbiAgICAgIH0gXHJcbiAgICAgIGNhdGNoKGUpIHtcclxuICAgICAgICAkKCdib2R5Jykuc2Nyb2xsVG9wKDApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vIGlmIHdlJ3ZlIGV4Y2VlZGVkIHRoZSB0aHJlc2hvbGQgb2Ygc2Nyb2xsaW5nXHJcbiAgICAgIC8vIGZyb20gdGhlIHRvcCwgc2hvdyBjb250cm9sXHJcbiAgICAgIGxldCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICBpZiAoc2Nyb2xsVG9wID4gdmlzaWJsZVRocmVzaG9sZCkge1xyXG4gICAgICAgICAgJGVsLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICRlbC5hZGRDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1iYW5uZXItY2Fyb3VzZWwnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgJGVsID0gJCh0aGlzKTtcclxuXHJcbiAgICBpZigkZWwuY2hpbGRyZW4oKS5sZW5ndGggPD0gMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNsaWRlciA9ICRlbC5zbGljayh7XHJcbiAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgIHByZXZBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPjwvYnV0dG9uPicsXHJcbiAgICAgIG5leHRBcnJvdzogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stbmV4dFwiPjwvYnV0dG9uPidcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcbiAgJCgnLmpzLWNsaWNrYWJsZScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIC8vIGlmIHRoZSB0aGlzIGlzIGNsaWNrZWRcclxuICAgICQodGhpcykuY2xpY2soZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgdmFyICRlbCA9ICQodGhpcykuZmluZCgnLmpzLWNsaWNrYWJsZS1saW5rJykuZmlyc3QoKTtcclxuICAgICAgLy8gZmluZCB0aGUgZGVzdGluYXRpb25cclxuICAgICAgdmFyIGRlc3QgPSAkZWwuYXR0cihcImhyZWZcIik7XHJcbiAgICAgIC8vIGlmIHRoZSB0YXJnZXQgYXR0cmlidXRlIGV4aXN0c1xyXG4gICAgICBpZihcIl9ibGFua1wiID09PSAkZWwuYXR0cihcInRhcmdldFwiKSkge1xyXG4gICAgICAgIC8vIGxhdW5jaCBuZXcgdGFiL3dpbmRvd1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKGRlc3QpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIG90aGVyd2lzZSByZWRpcmVjdCB0byBhIG5ldyBwYWdlIFxyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGRlc3Q7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpOyIsIi8vICoqKioqKiBiYXNpYyBjdXN0b20gc2VsZWN0IHRoYXQgdXNlcyBtb2JpbGUgc2VsZWN0IGtleWJvYXJkICoqKioqKlxyXG5sZXQgZHJvcGRvd25NZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1kcm9wZG93blwiKTtcclxuXHJcbmlmKG51bGwgIT09IGRyb3Bkb3duTWVudSl7XHJcblxyXG4gIGxldCBsZW5ndGggPSBkcm9wZG93bk1lbnUubGVuZ3RoO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrICkge1xyXG4gICAgbGV0IHBhcmVudEVsID0gZHJvcGRvd25NZW51W2ldLFxyXG4gICAgICAgIHNlbGVjdEVsID0gcGFyZW50RWwucXVlcnlTZWxlY3RvcihcIi5qcy1kcm9wZG93bi1zZWxlY3RcIiksXHJcbiAgICAgICAgbGluayA9IHBhcmVudEVsLnF1ZXJ5U2VsZWN0b3IoXCIuanMtZHJvcGRvd24tbGlua1wiKVxyXG5cclxuICAgIGlmKG51bGwgPT09IHNlbGVjdEVsIHx8IG51bGwgPT09IGxpbmspIHtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0RWwub25jaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgbGV0IGVsZW0gPSAodHlwZW9mIHRoaXMuc2VsZWN0ZWRJbmRleCA9PT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdy5ldmVudC5zcmNFbGVtZW50IDogdGhpcyk7XHJcbiAgICAgIGxpbmsuaW5uZXJUZXh0ID0gZWxlbS50ZXh0IHx8IGVsZW0ub3B0aW9uc1tlbGVtLnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBjb29raWUgICBmcm9tIFwiLi4vaGVscGVycy9jb29raWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1lbWVyZ2VuY3ktYWxlcnRzJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgb3BlbiA9IHRydWUsXHJcbiAgICAgICAgaWQgPSAkZWwuZGF0YSgnaWQnKSxcclxuICAgICAgICBjb29raWVOYW1lID0gJ2VtZXJnZW5jeS1hbGVydHMnICsgaWQsXHJcbiAgICAgICAgY29va2llVmFsdWUgPSBjb29raWUuZ2V0Q29va2llKGNvb2tpZU5hbWUpO1xyXG5cclxuICAgIGlmKHR5cGVvZihjb29raWVWYWx1ZSkgIT0gJ3VuZGVmaW5lZCcgJiYgY29va2llVmFsdWUgPT09ICdmYWxzZScpIHtcclxuICAgICAgLy8gY29va2llVmFsdWUgaXMgYSBzdHJpbmcgc28gd2UgY2FuJ3QgdXNlIHRoZSB2YWx1ZSBkaXJlY3RseVxyXG4gICAgICBvcGVuID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZihvcGVuKSB7XHJcbiAgICAgIC8vIGV4cGFuZCB0aGUgbWVudVxyXG4gICAgICAkZWwuZmluZCgnLmpzLWFjY29yZGlvbi1saW5rJykudHJpZ2dlcignY2xpY2snKTtcclxuICAgIH1cclxuXHJcbiAgICAkZWwub24oJ2NsaWNrJywnLmpzLWFjY29yZGlvbi1saW5rJyxmdW5jdGlvbigpe1xyXG4gICAgICAvLyB0b2dnbGUgdGhlIGN1cnJlbnQgc3RhdGVcclxuICAgICAgb3BlbiA9ICFvcGVuO1xyXG4gICAgICAvLyB1cGRhdGUgb3Blbi9jbG9zZSBzdGF0ZSBjb29raWUgXHJcbiAgICAgIC8vIGxlYXZlIG9mZiB0aGlyZCBhcmd1bWVudCB0byBtYWtlIGl0IGV4cGlyZSBvbiBzZXNzaW9uXHJcbiAgICAgIGNvb2tpZS5zZXRDb29raWUoY29va2llTmFtZSxvcGVuKTtcclxuICAgIH0pO1xyXG5cclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCdmb3JtJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRmb3JtID0gJCh0aGlzKSxcclxuICAgICAgICByZXF1aXJlZEZpZWxkcyA9IFtdO1xyXG5cclxuICAgIC8vIGZpbmQgYWxsIHJlcXVpcmVkIGZpZWxkc1xyXG4gICAgJCgnLmpzLWlzLXJlcXVpcmVkJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgJGZpZWxkID0gJCh0aGlzKSxcclxuICAgICAgICAgIHR5cGUgPSAkZmllbGQuZGF0YSgndHlwZScpLFxyXG4gICAgICAgICAgdmFsdWUgPSAkZmllbGQudmFsKCksXHJcbiAgICAgICAgICB2YWxpZCA9IHZhbGlkYXRlKHZhbHVlLHR5cGUpO1xyXG5cclxuICAgICAgcmVxdWlyZWRGaWVsZHMucHVzaCh7dHlwZSx2YWxpZCwkZWw6JGZpZWxkfSk7XHJcblxyXG4gICAgICAkKHRoaXMpLmRhdGEoJ2luZGV4JyxyZXF1aXJlZEZpZWxkcy5sZW5ndGgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gaWYgdGhlcmUgYXJlbid0IGFueSByZXF1aXJlZCBmaWVsZHMsIGRvbid0IGRvIGFueXRoaW5nXHJcbiAgICBpZihyZXF1aXJlZEZpZWxkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICRmb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgbGV0IHN1Ym1pdEZvcm0gPSB0cnVlO1xyXG5cclxuICAgICAgLy8gdmFsaWRhdGUgZWFjaCByZXF1aXJlZCBmaWVsZFxyXG4gICAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBpdGVtLiRlbC52YWwoKTtcclxuXHJcbiAgICAgICAgaXRlbS52YWxpZCA9IHZhbGlkYXRlKHZhbHVlLGl0ZW0udHlwZSk7XHJcblxyXG4gICAgICAgIGlmKGl0ZW0udmFsaWQpIHtcclxuICAgICAgICAgIGl0ZW0uJGVsLmF0dHIoJ2RhdGEtdmFsaWQnLCdpcy12YWxpZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdWJtaXRGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgICBpdGVtLiRlbC5hdHRyKCdkYXRhLXZhbGlkJywnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZighc3VibWl0Rm9ybSkge1xyXG4gICAgICAgIC8vIHByZXZlbnQgdGhlIGZvcm0gZnJvbSBzdWJtaXR0aW5nXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIC8vIHNob3cgdGhlIGZvcm0gZXJyb3IgbWVzc2FnZSBcclxuICAgICAgICAvLyBvciBibGluayB0aGUgbWVzc2FnZSBpZiBpdCBpcyBhbHJlYWR5IHZpc2libGVcclxuICAgICAgICAkZm9ybS5maW5kKCcuanMtZXJyb3ItbXNnJylcclxuICAgICAgICAgIC5hdHRyKCdoaWRkZW4nLHRydWUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAkZm9ybS5maW5kKCcuanMtZXJyb3ItbXNnJylcclxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfSwxMDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gdmFsaWRhdGUodmFsdWUsdHlwZT0ndGV4dCcpe1xyXG4gICAgbGV0IHZhbGlkID0gZmFsc2U7XHJcblxyXG4gICAgc3dpdGNoKHR5cGUpIHtcclxuICAgICAgY2FzZSAnZW1haWwnOlxyXG4gICAgICAgIHZhbGlkID0gISEodmFsdWUubWF0Y2goL1tBLVowLTkuXyUrLV0rQFtBLVowLTkuLV0rXFwuW0EtWl0rL2kpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB2YWxpZCA9IHZhbHVlLmxlbmd0aCAhPT0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsaWQ7XHJcbiAgfVxyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiaW1wb3J0IGNvb2tpZXMgZnJvbSBcIi4uL2hlbHBlcnMvY29va2llcy5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCcuanMtaGVhZGVyLWFsZXJ0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgJGxpbmsgPSAkZWwuZmluZCgnLmpzLWhlYWRlci1hbGVydC1saW5rJyksXHJcbiAgICAgICAgaWQgPSAkZWwuZGF0YSgnaWQnKSxcclxuICAgICAgICBjb29raWVOYW1lID0gXCJBbGVydFwiICsgaWQsXHJcbiAgICAgICAgY29va2llRXhwaXJlcyA9IDM2NSxcclxuICAgICAgICBjb29raWVWYWx1ZSA9IGNvb2tpZXMuZ2V0Q29va2llKGNvb2tpZU5hbWUpO1xyXG5cclxuICAgIC8vIHNob3cgYWxlcnQgaWYgY29va2llIGRvZXNuJ3QgZXhpc3RcclxuICAgIGlmKGNvb2tpZVZhbHVlICE9PSBcImhpZGVcIikge1xyXG4gICAgICAkZWwuZmFkZUluKCkuZmFkZU91dCgnZmFzdCcpLmZhZGVJbignc2xvdycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGhpZGUgdGhlIGFsZXJ0XHJcbiAgICAkbGluay5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvb2tpZXMuc2V0Q29va2llKGNvb2tpZU5hbWUsXCJoaWRlXCIsY29va2llRXhwaXJlcyk7XHJcbiAgICAgICRlbC5zdG9wKHRydWUsdHJ1ZSkuZmFkZU91dCgpO1xyXG4gICAgfSlcclxuICB9KTtcclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLWtleXdvcmQtc2VhcmNoJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgbGV0ICRlbCA9ICQodGhpcyksXHJcbiAgICAgICAgJGZvcm0gPSAkZWwuZmluZCgnZm9ybScpO1xyXG5cclxuICAgICRmb3JtLm9uKCdzdWJtaXQnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICRlbC5hZGRDbGFzcygnaXMtZGlydHknKVxyXG4gICAgfSk7XHJcblxyXG4gICAgJGZvcm0ub24oJ3Jlc2V0JyxmdW5jdGlvbigpe1xyXG4gICAgICAkZWwucmVtb3ZlQ2xhc3MoJ2lzLWRpcnR5JylcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG4gICAgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICB9KTtcclxuXHJcbiAgJCgnLmpzLW1haW4tbmF2JykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIGxldCBvcGVuQ2xhc3MgPSBcImlzLW9wZW5cIixcclxuICAgICAgICBjbG9zZUNsYXNzID0gXCJpcy1jbG9zZWRcIixcclxuICAgICAgICBzdWJtZW51Q2xhc3MgPSBcInNob3ctc3VibWVudVwiLFxyXG4gICAgICAgICRwYXJlbnQgPSAkKHRoaXMpLFxyXG4gICAgICAgICRtYWluTmF2VG9nZ2xlID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtdG9nZ2xlJyksXHJcbiAgICAgICAgJG1haW5OYXZJdGVtcyA9ICRwYXJlbnQuZmluZCgnLmpzLW1haW4tbmF2LXRvZ2dsZSwgLmpzLW1haW4tbmF2LXRvcC1saW5rJyksXHJcbiAgICAgICAgcHJldmlvdXNLZXkgPSBudWxsLFxyXG4gICAgICAgIGJyZWFrcG9pbnQgPSA4MDA7IC8vIG1hdGNoZXMgQ1NTIGJyZWFrcG9pbnQgZm9yIE1haW4gTmF2XHJcblxyXG4gICAgJG1haW5OYXZJdGVtcy5vbigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgIC8vIG9ubHkgZm9yIGRlc2t0b3BcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdyYWIgYWxsIHRoZSBET00gaW5mbyB3ZSBuZWVkLi4uXHJcbiAgICAgIGxldCAkbGluayA9ICQodGhpcyksXHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rcyA9ICRwYXJlbnQuZmluZCgnLm1hX19tYWluLW5hdl9fdG9wLWxpbmsnKSxcclxuICAgICAgICAgIG9wZW4gPSAkbGluay5oYXNDbGFzcyhvcGVuQ2xhc3MpLFxyXG4gICAgICAgICAgJG9wZW5Db250ZW50ID0gJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudC4nICsgb3BlbkNsYXNzKSxcclxuICAgICAgICAgICRmb2N1c2VkRWxlbWVudCA9ICQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCksXHJcbiAgICAgIC8vIHJlbGV2YW50IGlmIG9wZW4uLlxyXG4gICAgICAgICAgJHRvcExldmVsSXRlbSA9ICRmb2N1c2VkRWxlbWVudC5wYXJlbnRzKCcubWFfX21haW4tbmF2X19pdGVtJyksXHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rID0gJHRvcExldmVsSXRlbS5maW5kKCcubWFfX21haW4tbmF2X190b3AtbGluaycpLFxyXG4gICAgICAgICAgJGRyb3Bkb3duTGlua3MgPSAkbGluay5maW5kKCcubWFfX21haW4tbmF2X19zdWJpdGVtIC5tYV9fbWFpbi1uYXZfX2xpbmsnKSxcclxuICAgICAgICAgIGZvY3VzSW5kZXhJbkRyb3Bkb3duID0gJGRyb3Bkb3duTGlua3MuaW5kZXgoJGZvY3VzZWRFbGVtZW50KTtcclxuXHJcblxyXG4gICAgICAvLyBkb3duIGFycm93IGtleVxyXG4gICAgICBpZihlLmtleUNvZGUgPT09IDQwKSB7XHJcbiAgICAgICAgLy8gaGlkZSBjb250ZW50XHJcbiAgICAgICAgLy8gSWYgbWVudWJhciBmb2N1c1xyXG4gICAgICAgIC8vICAtIE9wZW4gcHVsbCBkb3duIG1lbnUgYW5kIHNlbGVjdCBmaXJzdCBtZW51IGl0ZW1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIElmIGRyb3Bkb3duIGZvY3VzXHJcbiAgICAgICAgLy8gIC0gU2VsZWN0IG5leHQgbWVudSBpdGVtXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmKG9wZW4pIHtcclxuICAgICAgICAgIGlmKGZvY3VzSW5kZXhJbkRyb3Bkb3duID09PSAoJGRyb3Bkb3duTGlua3MubGVuZ3RoLTEpICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZihmb2N1c0luZGV4SW5Ecm9wZG93biA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAkZHJvcGRvd25MaW5rc1sxXS5mb2N1cygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICRkcm9wZG93bkxpbmtzW2ZvY3VzSW5kZXhJbkRyb3Bkb3duKzFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzaG93KCR0b3BMZXZlbEl0ZW0uZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKSk7XHJcbiAgICAgICAgICAkbGluay5hZGRDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAgICAgaWYoJGRyb3Bkb3duTGlua3NbMV0pIHtcclxuICAgICAgICAgICAgJGRyb3Bkb3duTGlua3NbMV0uZm9jdXMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICBpZihlLmtleUNvZGUgPT09IDM4KSB7ICAvLyB1cCBhcnJvd1xyXG4gICAgICAgIC8vIGhpZGUgY29udGVudFxyXG4gICAgICAgIC8vIElmIG1lbnViYXIgZm9jdXNcclxuICAgICAgICAvLyAgLSBPcGVuIHB1bGwgZG93biBtZW51IGFuZCBzZWxlY3QgZmlyc3QgbWVudSBpdGVtXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBJZiBkcm9wZG93biBmb2N1c1xyXG4gICAgICAgIC8vICAtIFNlbGVjdCBwcmV2aW91cyBtZW51IGl0ZW1cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYob3Blbikge1xyXG4gICAgICAgICAgaWYoZm9jdXNJbmRleEluRHJvcGRvd24gPD0gMSApIHsgLy8gbm90IDAgYmMgb2YgaGlkZGVuIGZpcnN0IGxpbmtcclxuICAgICAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgICAgICAkdG9wTGV2ZWxMaW5rLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRkcm9wZG93bkxpbmtzW2ZvY3VzSW5kZXhJbkRyb3Bkb3duLTFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2hvdygkdG9wTGV2ZWxJdGVtLmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50JykpO1xyXG4gICAgICAgICAgJGxpbmsuYWRkQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGVzYyBrZXlcclxuICAgICAgaWYoZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAgIC8vIENsb3NlIG1lbnUgYW5kIHJldHVybiBmb2N1cyB0byBtZW51YmFyXHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgICAkbGluay5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAgICR0b3BMZXZlbExpbmsuZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGxlZnQgYXJyb3cga2V5XHJcbiAgICAgIGlmKGUua2V5Q29kZSA9PT0gMzcpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gaGlkZSBjb250ZW50XHJcbiAgICAgICAgLy8gSWYgbWVudWJhciBmb2N1c1xyXG4gICAgICAgIC8vICAtIFByZXZpb3VzIG1lbnViYXIgaXRlbVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gSWYgZHJvcGRvd24gZm9jdXNcclxuICAgICAgICAvLyAgLSBPcGVuIHByZXZpb3VzIHB1bGwgZG93biBtZW51IGFuZCBzZWxlY3QgZmlyc3QgaXRlbVxyXG4gICAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgICAgICBsZXQgaW5kZXggPSAkdG9wTGV2ZWxMaW5rcy5pbmRleCgkdG9wTGV2ZWxMaW5rKS0xO1xyXG4gICAgICAgIGlmKCR0b3BMZXZlbExpbmtzW2luZGV4XSkge1xyXG4gICAgICAgICAgJHRvcExldmVsTGlua3NbaW5kZXhdLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgIH1cclxuICAgICAgLy8gcmlnaHQgYXJyb3cga2V5XHJcbiAgICAgIGlmKGUua2V5Q29kZSA9PT0gMzkpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgLy8gaGlkZSBjb250ZW50XHJcbiAgICAgICAgLy8gSWYgbWVudWJhciBmb2N1c1xyXG4gICAgICAgIC8vICAtIE5leHQgbWVudWJhciBpdGVtXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBJZiBkcm9wZG93biBmb2N1c1xyXG4gICAgICAgIC8vICAtIE9wZW4gbmV4dCBwdWxsIG1lbnUgYW5kIHNlbGVjdCBmaXJzdCBpdGVtXHJcbiAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgIGxldCBpbmRleCA9ICR0b3BMZXZlbExpbmtzLmluZGV4KCR0b3BMZXZlbExpbmspKzE7XHJcbiAgICAgICAgaWYoJHRvcExldmVsTGlua3NbaW5kZXhdKSB7XHJcbiAgICAgICAgICAkdG9wTGV2ZWxMaW5rc1tpbmRleF0uZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBrZXkgY29kZSA5IGlzIHRoZSB0YWIga2V5XHJcbiAgICAgIGlmKG9wZW4gfHwgKHR5cGVvZihlLmtleWNvZGUpICE9PSBcInVuZGVmaW5lZFwiICYmIGUua2V5Y29kZSAhPT0gOSkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGhpZGUgY29udGVudFxyXG4gICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICAgIC8vIGFkZCBvcGVuIGNsYXNzIHRvIHRoaXMgaXRlbVxyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKG9wZW5DbGFzcyk7XHJcbiAgICAgIC8vIGFkZCBvcGVuIGNsYXNzIHRvIHRoZSBjb3JyZWN0IGNvbnRlbnQgYmFzZWQgb24gaW5kZXhcclxuICAgICAgc2hvdygkbGluay5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCcpKTtcclxuICAgIH0pO1xyXG4gICAgJG1haW5OYXZJdGVtcy5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgaWYod2luZG93V2lkdGggPiBicmVha3BvaW50KSB7XHJcbiAgICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICQodGhpcykuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKTtcclxuICAgICAgICBzaG93KCRvcGVuQ29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJG1haW5OYXZJdGVtcy5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgaWYod2luZG93V2lkdGggPiBicmVha3BvaW50KSB7XHJcbiAgICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICQodGhpcykuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQnKTtcclxuICAgICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJG1haW5OYXZUb2dnbGUuY2hpbGRyZW4oJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmKHdpbmRvd1dpZHRoIDw9IGJyZWFrcG9pbnQpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbGV0ICRjb250ZW50ID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuanMtbWFpbi1uYXYtY29udGVudCcpO1xyXG4gICAgICAgIC8vIGFkZCBvcGVuIGNsYXNzIHRvIHRoaXMgaXRlbVxyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgICBzaG93KCRjb250ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkbWFpbk5hdlRvZ2dsZS5sYXN0KClcclxuICAgICAgLmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50IGxpJylcclxuICAgICAgICAubGFzdCgpXHJcbiAgICAgICAgICAuZmluZCgnYScpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAvLyBwcmV2aW91cyBrZXkgd2FzIG5vdCBhIHNoaWZ0XHJcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gOSAmJiBwcmV2aW91c0tleSAhPT0gMTYpIHsgIC8vIHRhYiBhcnJvd1xcXHJcbiAgICAgICAgICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLW1haW4tbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcbiAgICAgICAgICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByZXZpb3VzS2V5ID0gZS5rZXlDb2RlO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAkKCcuanMtY2xvc2Utc3ViLW5hdicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpO1xyXG4gICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIaWRlIGFueSBvcGVuIHN1Ym1lbnUgY29udGVudCB3aGVuIHRoZSBzaWRlYmFyIG1lbnUgaXMgY2xvc2VkXHJcbiAgICAkKCcuanMtaGVhZGVyLW1lbnUtYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgIGxldCAkb3BlbkNvbnRlbnQgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi1jb250ZW50LicgKyBvcGVuQ2xhc3MpO1xyXG4gICAgICBoaWRlKCRvcGVuQ29udGVudCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaGlkZSgkY29udGVudCkge1xyXG4gICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3Moc3VibWVudUNsYXNzKTtcclxuICAgICAgJHBhcmVudC5maW5kKFwiLlwiICsgb3BlbkNsYXNzKS5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpO1xyXG5cclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgICRjb250ZW50LmFkZENsYXNzKGNsb3NlQ2xhc3MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgLnN0b3AoIHRydWUsIHRydWUgKVxyXG4gICAgICAgIC5zbGlkZVVwKCdmYXN0JyxmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhjbG9zZUNsYXNzKVxyXG4gICAgICAgICAgICAuc2xpZGVEb3duKDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvdygkY29udGVudCkge1xyXG4gICAgICAkKCdib2R5JykuYWRkQ2xhc3Moc3VibWVudUNsYXNzKTtcclxuICAgICAgaWYod2luZG93V2lkdGggPD0gYnJlYWtwb2ludCkge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAuYWRkQ2xhc3Mob3BlbkNsYXNzKVxyXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKGNsb3NlQ2xhc3MpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAuc3RvcCggdHJ1ZSwgdHJ1ZSApXHJcbiAgICAgICAgICAuZGVsYXkoIDIwMCApXHJcbiAgICAgICAgICAuc2xpZGVVcCgwLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkY29udGVudFxyXG4gICAgICAgICAgICAgIC5hZGRDbGFzcyhvcGVuQ2xhc3MpXHJcbiAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKGNsb3NlQ2xhc3MpXHJcbiAgICAgICAgICAgICAgLnNsaWRlRG93bignZmFzdCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xuXG4gICQoJy5qcy1tYWluLW5hdicpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgbGV0ICRwYXJlbnQgPSAkKHRoaXMpLFxuICAgICAgJG1haW5OYXZUb2dnbGUgPSAkcGFyZW50LmZpbmQoJy5qcy1tYWluLW5hdi10b2dnbGUnKTtcblxuICAgIC8vIG1ha2Ugcm9vdCB0b3AtbGV2ZWwgbGlua3MgaW5lcnQgZm9yIHBpbG90XG4gICAgJG1haW5OYXZUb2dnbGUuY2hpbGRyZW4oJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyBFbnN1cmUgdG9wLWxldmVsIGxpbmtzIHRoYXQgYXJlIHBvdGVudGlhbCBhbmNob3IgbGlua3MgY2xvc2UgdGhlIHNpZGViYXIgb24gbW9iaWxlXG4gICAgJHBhcmVudC5maW5kKCcuanMtbWFpbi1uYXYtdG9wLWxpbmsnKS5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAkKCcuanMtaGVhZGVyLW1lbnUtYnV0dG9uJykudHJpZ2dlcignY2xpY2snKTtcbiAgICB9KTtcblxuICB9KTtcblxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcblxuIiwiLy8gKioqKioqIE1lbnUgYnV0dG9uICoqKioqKlxyXG5sZXQgbWVudUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtaGVhZGVyLW1lbnUtYnV0dG9uXCIpO1xyXG5cclxuaWYobnVsbCAhPT0gbWVudUJ1dHRvbil7XHJcbiAgbWVudUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5jbGFzc0xpc3QudG9nZ2xlKFwic2hvdy1tZW51XCIpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyAqKioqKiogTWFpbiBIZWFkZXIgU2VhcmNoIGJ1dHRvbiBvbiBtb2JpbGUgc2hvdWxkIG9wZW4gdGhlIG1vYmlsZSBtZW51ICAqKioqKipcclxubGV0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLWhlYWRlci1zZWFyY2gtbWVudSAuanMtaGVhZGVyLXNlYXJjaC1mb3JtXCIpO1xyXG5cclxuaWYobnVsbCAhPT0gc2VhcmNoRm9ybSl7XHJcbiAgc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+IDYyMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3ctbWVudVwiKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcblxuICAkKCcuanMtbWEtcmVzcG9uc2l2ZS12aWRlbycpLmZpdFZpZHMoKTtcblxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJpbXBvcnQgZXh0ZXJuYWxVcmxDaGVjayAgIGZyb20gXCIuLi9oZWxwZXJzL2V4dGVybmFsVXJsQ2hlY2suanNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh3aW5kb3csZG9jdW1lbnQsJCx1bmRlZmluZWQpIHtcclxuXHJcbiAgJCgnLmpzLW1hLXJpY2gtdGV4dCB0YWJsZScpLndyYXAoIFwiPGRpdiBjbGFzcz0nbWFfX3JpY2gtdGV4dF9fdGFibGUtd3JhcHBlcic+PC9kaXY+XCIgKTtcclxuXHJcbiAgLy8gZ2V0IHRoZSBleHRlcm5hbCBTVkcgbGluayBjb2RlXHJcbiAgZmV0Y2godGhlbWVQYXRoICsgJy9pbWFnZXMvc3ZnLXNwcml0ZS9leHRlcm5hbC1saW5rLnN2ZycsIHtcclxuICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbidcclxuICAgIH0pXHJcbiAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcclxuICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgIC8vIGZpbmQgYWxsIGV4dGVybmFsIGxpbmtzIHRoYXQgbmVlZCBhbiBpY29uXHJcbiAgICAkKCcuanMtbWEtcmljaC10ZXh0IGEnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgaHJlZiA9ICRlbC5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICBpZihleHRlcm5hbFVybENoZWNrKGhyZWYpICYmICEkZWwuY2hpbGRyZW4oKS5sZW5ndGgpIHtcclxuICAgICAgICAvLyB3cmFwIHRoZSBsaW5rIGluIGEgc3BhbiB0YWdcclxuICAgICAgICAkZWwud3JhcCgnPHNwYW4gY2xhc3M9XCJtYV9fZGVjb3JhdGl2ZS1saW5rXCI+PC9zcGFuPicpO1xyXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgU1ZHIHRvIHRoZSBsaW5rXHJcbiAgICAgICAgJGVsLmFwcGVuZCgnJm5ic3A7JyArIGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KS5jYXRjaChmdW5jdGlvbihlKXtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ2V4dGVybmFsIGxpbmsgcnRlIGNvZGUgZmFpbGluZycpO1xyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoXCIuanMtc2Nyb2xsLWFuY2hvcnNcIikuZWFjaChmdW5jdGlvbigpIHtcclxuICAgIGxldCAkZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICRlbFBhcmVudCA9ICRlbC5wYXJlbnQoKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdyZWxhdGl2ZScgPyAkZWwucGFyZW50KCkgOiAkZWwucGFyZW50KCkub2Zmc2V0UGFyZW50KCksXHJcbiAgICAgICAgZWxIZWlnaHQsXHJcbiAgICAgICAgaGVhZGVyQnVmZmVyID0gMCxcclxuICAgICAgICBsb3dlckxpbWl0LFxyXG4gICAgICAgIHVwcGVyTGltaXQsXHJcbiAgICAgICAgZGVib3VuY2VUaW1lcixcclxuICAgICAgICBhY3RpdmVDbGFzcyA9IFwiaXMtYWN0aXZlXCIsXHJcbiAgICAgICAgYWN0aXZlQW5jaG9yID0gMCxcclxuICAgICAgICBhbmNob3JzID0gW10sXHJcbiAgICAgICAgbnVtQW5jaG9ycyA9IDAsXHJcbiAgICAgICAgaXNNb2JpbGUgPSBmYWxzZSxcclxuICAgICAgICBsaW5rU2Nyb2xsaW5nID0gZmFsc2U7XHJcblxyXG4gICAgc2V0VmFyaWFibGVzKCk7XHJcblxyXG4gICAgLy8gZGVmYXVsdCBhc3N1bXB0aW9uIGFzIHRvIHdoZXJlIHRoZSBzY3JlZW4gd2lsbCBsb2FkXHJcbiAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCd0b3AnKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdmFyaWFibGVzIG9uZSBtb3JlIHRpbWUgdG8gY2F0Y2ggYW55IHBvc3QgcGFnZSBsb2FkIGNoYW5nZXNcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNldFZhcmlhYmxlcygpO1xyXG4gICAgfSwxMDAwKTtcclxuXHJcbiAgICAkZWwuZmluZCgnYScpLm9uKCdjbGljaycsZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAvLyBpcyB0aGUgbWVudSBjbG9zZWQgb24gbW9iaWxlXHJcbiAgICAgIGlmKCEkZWwuaGFzQ2xhc3MoJ2lzLW9wZW4nKSAmJiBpc01vYmlsZSkgeyAgICAgXHJcbiAgICAgICAgLy8ganVzdCBzaG93IHRoZSBtZW51XHJcbiAgICAgICAgJGVsLmFkZENsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgICBcclxuICAgICAgLy8gZmluZCB0aGUgbG9jYXRpb24gb2YgdGhlIGRlc2lyZWQgbGluayBhbmQgc2Nyb2xsIHRoZSBwYWdlXHJcbiAgICAgIGxldCBwb3NpdGlvbiA9IGFuY2hvcnNbJCh0aGlzKS5kYXRhKCdpbmRleCcpXS5wb3NpdGlvbjtcclxuICAgICAgLy8gY2xvc2UgdGhlIG1lbnVcclxuICAgICAgJGVsLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XHJcbiAgICAgIC8vIHJlbW92ZSBhY3RpdmUgZmxhZyBmcm9tIG90aGVyIGxpbmtzXHJcbiAgICAgICRlbC5maW5kKCcuJyArIGFjdGl2ZUNsYXNzKS5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgIC8vIG1hcmsgdGhpcyBsaW5rIGFzIGFjdGl2ZVxyXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKTtcclxuICAgICAgYWN0aXZlQW5jaG9yID0gJCh0aGlzKS5kYXRhKCdpbmRleCcpO1xyXG4gICAgICAvLyBwcmV2ZW50IHRoZSBzY3JvbGwgZXZlbnQgZnJvbSB1cGRhdGluZyBhY3RpdmUgbGlua3NcclxuICAgICAgbGlua1Njcm9sbGluZyA9IHRydWU7XHJcblxyXG4gICAgICAkKFwiaHRtbCxib2R5XCIpLnN0b3AodHJ1ZSx0cnVlKS5hbmltYXRlKHtzY3JvbGxUb3A6cG9zaXRpb259LCAnNzUwJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBsaW5rU2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgICRlbC5maW5kKFwiLmpzLXNjcm9sbC1hbmNob3JzLXRvZ2dsZVwiKS5vbignY2xpY2snLGZ1bmN0aW9uKCkge1xyXG4gICAgICAkZWwudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG1ha2UgdGhlIGxpbmtzIHN0aWNreVxyXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICAgICAgaWYodHlwZW9mIGRlYm91bmNlVGltZXIgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGRlYm91bmNlVGltZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIGRlYm91bmNlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHNldFZhcmlhYmxlcygpO1xyXG4gICAgICAgIHNldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgYWN0aXZhdGVMaW5rKCk7XHJcbiAgICAgIH0sMzAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZXRQb3NpdGlvbigpO1xyXG4gICAgICBhY3RpdmF0ZUxpbmsoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldFZhcmlhYmxlcygpIHtcclxuICAgICAgbGV0IHRvcE9mZnNldCA9IDA7XHJcblxyXG4gICAgICBoZWFkZXJCdWZmZXIgPSAwO1xyXG4gICAgICBlbEhlaWdodCA9ICRlbC5oZWlnaHQoKTtcclxuICAgICAgdXBwZXJMaW1pdCA9ICRlbFBhcmVudC5vZmZzZXQoKS50b3A7XHJcbiAgICAgIGlzTW9iaWxlID0gY2hlY2tNb2JpbGUoJGVsKTtcclxuXHJcbiAgICAgIGlmKCRlbFBhcmVudFswXS5oYXNBdHRyaWJ1dGUoXCJzdHlsZVwiKSAmJiAhaXNNb2JpbGUpIHtcclxuICAgICAgICAkZWxQYXJlbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgfVxyXG4gXHJcbiAgICAgIGlmKGlzTW9iaWxlKSB7XHJcbiAgICAgICAgaGVhZGVyQnVmZmVyID0gJCgnLmpzLXN0aWNreS1oZWFkZXInKS5oZWlnaHQoKSB8fCAwO1xyXG4gICAgICAgIHVwcGVyTGltaXQgLT0gaGVhZGVyQnVmZmVyO1xyXG4gICAgICAgIHRvcE9mZnNldCA9IGVsSGVpZ2h0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsb3dlckxpbWl0ID0gdXBwZXJMaW1pdCArICRlbFBhcmVudC5vdXRlckhlaWdodCh0cnVlKSAtICRlbC5oZWlnaHQoKTtcclxuXHJcbiAgICAgIC8vIGxvY2F0ZSB0aGUgcG9zaXRpb24gb2YgYWxsIG9mIHRoZSBhbmNob3IgdGFyZ2V0c1xyXG4gICAgICBhbmNob3JzID0gbmV3IEFycmF5O1xyXG4gICAgICAkZWwuZmluZCgnYScpLmVhY2goZnVuY3Rpb24oaSxlKXtcclxuICAgICAgICBsZXQgaGFzaCA9IHRoaXMuaGFzaCxcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAkKGhhc2gpLm9mZnNldCgpID8gJChoYXNoKS5vZmZzZXQoKS50b3AgLSBoZWFkZXJCdWZmZXIgLSB0b3BPZmZzZXQgOiB1cHBlckxpbWl0O1xyXG5cclxuICAgICAgICBhbmNob3JzW2ldID0geyBoYXNoLCBwb3NpdGlvbiB9O1xyXG5cclxuICAgICAgICAkKHRoaXMpLmRhdGEoJ2luZGV4JyxpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyByZWNvcmQgdGhlIG51bWJlciBvZiBhbmNob3JzIGZvciBwZXJmb3JtYW5jZVxyXG4gICAgICBudW1BbmNob3JzID0gYW5jaG9ycy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UG9zaXRpb24oKSB7XHJcbiAgICAgIGxldCB3aW5kb3dUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCksXHJcbiAgICAgICAgICBhdHRyID0gJGVsLmF0dHIoJ2RhdGEtc3RpY2t5JyksXHJcbiAgICAgICAgICB0b3AgPSBhdHRyICE9PSAndG9wJyAmJiB3aW5kb3dUb3AgPD0gdXBwZXJMaW1pdCwgXHJcbiAgICAgICAgICBtaWRkbGUgPSBhdHRyICE9PSAnbWlkZGxlJyAmJiB3aW5kb3dUb3AgPCBsb3dlckxpbWl0ICYmIHdpbmRvd1RvcCA+IHVwcGVyTGltaXQsXHJcbiAgICAgICAgICBib3R0b20gPSBhdHRyICE9PSAnYm90dG9tJyAmJiB3aW5kb3dUb3AgPj0gbG93ZXJMaW1pdDtcclxuICAgICAgXHJcbiAgICAgIGlmKCRlbFBhcmVudFswXS5oYXNBdHRyaWJ1dGUoXCJzdHlsZVwiKSAmJiAhaXNNb2JpbGUpIHtcclxuICAgICAgICAkZWxQYXJlbnQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYoISRlbFBhcmVudFswXS5oYXNBdHRyaWJ1dGUoXCJzdHlsZVwiKSAmJiBpc01vYmlsZSAmJiBhdHRyID09PSAnbWlkZGxlJykge1xyXG4gICAgICAgICRlbFBhcmVudC5jc3MoeydwYWRkaW5nVG9wJzplbEhlaWdodH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZih0b3ApIHtcclxuICAgICAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCd0b3AnKTtcclxuXHJcbiAgICAgICAgaWYoaXNNb2JpbGUpe1xyXG4gICAgICAgICAgJGVsUGFyZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChtaWRkbGUpIHtcclxuICAgICAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCdtaWRkbGUnKTtcclxuXHJcbiAgICAgICAgaWYoaXNNb2JpbGUpe1xyXG4gICAgICAgICAgJGVsUGFyZW50LmNzcyh7J3BhZGRpbmdUb3AnOmVsSGVpZ2h0fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIGlmIChib3R0b20pIHtcclxuICAgICAgICAkZWwuYXR0cignZGF0YS1zdGlja3knLCdib3R0b20nKTtcclxuXHJcbiAgICAgICAgaWYoaXNNb2JpbGUpe1xyXG4gICAgICAgICAgJGVsUGFyZW50LnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVMaW5rKCkge1xyXG4gICAgICAvLyBkbyB3ZSBoYXZlIG1vcmUgdGhhbiBvbmUgYW5jaG9yXHJcbiAgICAgIGlmKG51bUFuY2hvcnMgPCAyIHx8IGxpbmtTY3JvbGxpbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGdldCB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gYW5kIG9mZnNldCBieSBoYWxmIHRoZSB2aWV3IHBvcnRcclxuICAgICAgbGV0IHdpbmRvd1RvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICh3aW5kb3cuaW5uZXJIZWlnaHQvMiksXHJcbiAgICAgICAgICBjdXJyZW50QW5jaG9yID0gYWN0aXZlQW5jaG9yO1xyXG4gICAgICBcclxuICAgICAgLy8gaXMgdGhlcmUgYSBwcmV2IHRhcmdldFxyXG4gICAgICAvLyBhbmQgXHJcbiAgICAgIC8vIGlzIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBhYm92ZSB0aGUgY3VycmVudCB0YXJnZXRcclxuICAgICAgaWYoY3VycmVudEFuY2hvciA+IDAgJiYgd2luZG93VG9wIDwgYW5jaG9yc1thY3RpdmVBbmNob3JdLnBvc2l0aW9uKSB7IFxyXG4gICAgICAgIC8vIG1ha2UgdGhlIHByZXYgbGluayBhY3RpdmVcclxuICAgICAgICAtLWFjdGl2ZUFuY2hvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaXMgdGhlcmUgYSBuZXh0IHRhcmdldFxyXG4gICAgICAvLyBhbmRcclxuICAgICAgLy8gaXMgdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGJlbG93IHRoZSBuZXh0IHRhcmdldFxyXG4gICAgICBlbHNlIGlmKGN1cnJlbnRBbmNob3IgPCBudW1BbmNob3JzLTEgJiYgd2luZG93VG9wID4gYW5jaG9yc1thY3RpdmVBbmNob3IrMV0ucG9zaXRpb24pIHsgXHJcbiAgICAgICAgLy8gbWFrZSB0aGUgbmV4dCBsaW5rIGFjdGl2ZVxyXG4gICAgICAgICsrYWN0aXZlQW5jaG9yO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY3VycmVudEFuY2hvciAhPT0gYWN0aXZlQW5jaG9yKSB7XHJcbiAgICAgICAgLy8gbW92ZSB0aGUgYWN0aXZlIGZsYWdcclxuICAgICAgICAkZWwuZmluZCgnLicgKyBhY3RpdmVDbGFzcykucmVtb3ZlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xyXG4gICAgICAgICRlbC5maW5kKCdhJykuZXEoYWN0aXZlQW5jaG9yKS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrTW9iaWxlKCRlbCkge1xyXG4gICAgbGV0IHZhbHVlID0gXCJ0cnVlXCI7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCRlbFswXSwgJzpiZWZvcmUnKS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50JykucmVwbGFjZSgvXFxcIi9nLCAnJyk7XHJcbiAgICB9IGNhdGNoKGVycikge31cclxuICAgIHJldHVybiB2YWx1ZSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB0cnVlO1xyXG4gIH07XHJcblxyXG59KHdpbmRvdyxkb2N1bWVudCxqUXVlcnkpO1xyXG4iLCJpbXBvcnQgY29va2llcyBmcm9tIFwiLi4vaGVscGVycy9jb29raWVzLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2luZG93LGRvY3VtZW50LCQsdW5kZWZpbmVkKSB7XHJcblxyXG4gICQoJy5qcy1zaXRlLXNldHRpbmctZm9ybScpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIGxldCAkcGFyZW50ID0gJCh0aGlzKSxcclxuICAgICAgICAkcmVzZXQgPSAkcGFyZW50LmZpbmQoJy5qcy1idXR0b24tcmVzZXQnKSxcclxuICAgICAgICAkdGhlbWVTZWxlY3QgPSAkcGFyZW50LmZpbmQoJy5qcy1zaXRlLXNldHRpbmdzLXRoZW1lIHNlbGVjdCcpLFxyXG4gICAgICAgICRsYW5nU2VsZWN0ID0gJHBhcmVudC5maW5kKCcuanMtc2l0ZS1zZXR0aW5ncy1sYW5nIHNlbGVjdCcpLFxyXG4gICAgICAgICR6b29tQ29udHJvbHMgPSAkcGFyZW50LmZpbmQoJy5qcy16b29tLWNvbnRyb2xzJyksXHJcbiAgICAgICAgZGVmYXVsdFpvb21WYWwgPSAkem9vbUNvbnRyb2xzLmZpbmQoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykudmFsKCksXHJcbiAgICAgICAgY29va2llTmFtZSA9IFwic2l0ZS1zZXR0aW5nc1wiLFxyXG4gICAgICAgIGNvb2tpZUV4cGlyZXMgPSAzNjUsXHJcbiAgICAgICAgY29va2llVmFsdWUgPSBKU09OLnBhcnNlKGNvb2tpZXMuZ2V0Q29va2llKGNvb2tpZU5hbWUpIHx8IFwie31cIik7XHJcblxyXG4gICAgLy8gc2V0IGRlZmF1bHQgdmFsdWVzIHRvIG1hdGNoIGNvb2tpZSB2YWx1ZXNcclxuICAgIGlmKHR5cGVvZihjb29raWVWYWx1ZS56b29tKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAkem9vbUNvbnRyb2xzLmZpbmQoJ2lucHV0W3ZhbHVlPVwiJyArIGNvb2tpZVZhbHVlLnpvb20gKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgICAkem9vbUNvbnRyb2xzLnRyaWdnZXIoJ3Jlc2V0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodHlwZW9mKGNvb2tpZVZhbHVlLnRoZW1lKSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAkdGhlbWVTZWxlY3QudmFsKGNvb2tpZVZhbHVlLnRoZW1lKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgJCgnYm9keScpLmF0dHIoJ2RhdGEtdGhlbWUnLGNvb2tpZVZhbHVlLnRoZW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBpZih0eXBlb2YoY29va2llVmFsdWUubGFuZykgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgJGxhbmdTZWxlY3QudmFsKGNvb2tpZVZhbHVlLmxhbmcpLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG4gICAgICAkKCdodG1sJykuYXR0cignbGFuZycsY29va2llVmFsdWUubGFuZyk7XHJcbiAgICB9XHJcblxyXG4gICAgJHpvb21Db250cm9scy5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKS5vbignY2hhbmdlJyxmdW5jdGlvbigpe1xyXG4gICAgICBjb29raWVWYWx1ZS56b29tID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgdXBkYXRlQ29va2llKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkdGhlbWVTZWxlY3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvb2tpZVZhbHVlLnRoZW1lID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgdXBkYXRlQ29va2llKCk7XHJcbiAgICAgICQoJ2JvZHknKS5hdHRyKCdkYXRhLXRoZW1lJyxjb29raWVWYWx1ZS50aGVtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkbGFuZ1NlbGVjdC5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgY29va2llVmFsdWUubGFuZyA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgIHVwZGF0ZUNvb2tpZSgpO1xyXG4gICAgICAkKCdodG1sJykuYXR0cignbGFuZycsY29va2llVmFsdWUubGFuZyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkcmVzZXQub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICBjb29raWVWYWx1ZS56b29tID0gZGVmYXVsdFpvb21WYWw7XHJcbiAgICAgIHVwZGF0ZUNvb2tpZSgpO1xyXG4gICAgICAvLyB0cmlnZ2VyIGEgcmVzZXQgb2YgdGhlIGN1c3RvbSBmb3JtIGlucHV0IEpTXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkem9vbUNvbnRyb2xzLnRyaWdnZXIoJ3Jlc2V0Jyk7XHJcbiAgICAgICAgJHBhcmVudC5maW5kKCdzZWxlY3QnKS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgfSwuMSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVDb29raWUoKSB7XHJcbiAgICAgIGNvb2tpZXMuc2V0Q29va2llKGNvb2tpZU5hbWUsSlNPTi5zdHJpbmdpZnkoY29va2llVmFsdWUpLGNvb2tpZUV4cGlyZXMpO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAkKCcuanMtdXRpbC1uYXYnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IG9wZW5DbGFzcyA9IFwiaXMtb3BlblwiLFxyXG4gICAgICAgIGNsb3NlQ2xhc3MgPSBcImlzLWNsb3NlZFwiLFxyXG4gICAgICAgIHN1Ym1lbnVDbGFzcyA9IFwic2hvdy11dGlsbWVudVwiLFxyXG4gICAgICAgICRwYXJlbnQgPSAkKHRoaXMpLFxyXG4gICAgICAgIHdhaXRGb3JJdCA9IG51bGw7XHJcblxyXG4gICAgJCgnLmpzLWNsb3NlLXN1Yi1uYXYnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICBsZXQgJG9wZW5Db250ZW50ID0gJHBhcmVudC5maW5kKCcuanMtdXRpbC1uYXYtY29udGVudC4nICsgb3BlbkNsYXNzKTtcclxuICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJHBhcmVudC5maW5kKCcuanMtdXRpbC1uYXYtdG9nZ2xlID4gYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50ZGVmYXVsdDtcclxuXHJcbiAgICAgIGxldCBvcGVuID0gJCh0aGlzKS5oYXNDbGFzcyhvcGVuQ2xhc3MpLFxyXG4gICAgICAgICRjb250ZW50ID0gJCh0aGlzKS5uZXh0KCcuanMtdXRpbC1uYXYtY29udGVudCcpLFxyXG4gICAgICAgICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLXV0aWwtbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcblxyXG4gICAgICAvLyBoaWRlIG90aGVyIGNvbnRlbnRcclxuICAgICAgaGlkZSgkb3BlbkNvbnRlbnQpO1xyXG4gICAgICBcclxuICAgICAgaWYob3BlbikgeyBcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgLy8gYWRkIG9wZW4gY2xhc3MgdG8gdGhpcyBpdGVtXHJcbiAgICAgICQodGhpcykuYWRkQ2xhc3Mob3BlbkNsYXNzKTtcclxuICAgICAgLy8gYWRkIG9wZW4gY2xhc3MgdG8gdGhlIGNvcnJlY3QgY29udGVudCBiYXNlZCBvbiBpbmRleFxyXG4gICAgICAkY29udGVudC5hdHRyKFwiYXJpYS1oaWRkZW5cIixcImZhbHNlXCIpO1xyXG5cclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICRjb250ZW50XHJcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoY2xvc2VDbGFzcylcclxuICAgICAgICAgIC5hZGRDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcyhzdWJtZW51Q2xhc3MpXHJcbiAgICAgIH0sIC4xKTtcclxuICAgIH0pO1xyXG5cclxuICAgICRwYXJlbnQuZmluZCgnLmpzLWNsb3NlLXV0aWwtbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQ7XHJcblxyXG4gICAgICBoaWRlKCAkKHRoaXMpLmNsb3Nlc3QoJy5qcy11dGlsLW5hdi1jb250ZW50JykgKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5qcy1jbG9zZS1zdWItbmF2Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgbGV0ICRvcGVuQ29udGVudCA9ICRwYXJlbnQuZmluZCgnLmpzLXV0aWwtbmF2LWNvbnRlbnQuJyArIG9wZW5DbGFzcyk7XHJcbiAgICAgIGhpZGUoJG9wZW5Db250ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhpZGUoJGNvbnRlbnQpIHtcclxuICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKHN1Ym1lbnVDbGFzcylcclxuICAgICAgJHBhcmVudC5maW5kKFwiLlwiICsgb3BlbkNsYXNzKS5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpO1xyXG4gICAgICAkY29udGVudFxyXG4gICAgICAgIC5yZW1vdmVDbGFzcyhvcGVuQ2xhc3MpXHJcbiAgICAgICAgLmFkZENsYXNzKGNsb3NlQ2xhc3MpO1xyXG5cclxuICAgICAgaWYod2FpdEZvckl0KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHdhaXRGb3JJdCk7XHJcbiAgICAgIH1cclxuICAgICAgd2FpdEZvckl0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICRjb250ZW50LmF0dHIoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxufSh3aW5kb3csZG9jdW1lbnQsalF1ZXJ5KTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHdpbmRvdyxkb2N1bWVudCwkLHVuZGVmaW5lZCkge1xyXG5cclxuICAvLyB6b29tIGNvbnRyb2xzIHVwZGF0ZXMvYWRkcyBhIGRhdGEtem9vbSBhdHRyaWJ1dGUgdG8gdGhlIGh0bWwgdGFnXHJcbiAgLy8gd2l0aCB0aGUgZGVzaXJlZCBsZXZlbCBvZiB6b29taW5nIHJlcXVldGVkLiAgQ1NTIGFwcGxpZXMgYSBzY2FsZVxyXG4gIC8vIHRyYW5zZm9ybSBiYXNlZCBvbiB0aGF0IHZhbHVlLlxyXG5cclxuICAkKFwiLmpzLXpvb20tY29udHJvbHNcIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICBsZXQgJHBhcmVudCA9ICQodGhpcyksXHJcbiAgICAgICAgJGlucHV0cyA9ICQodGhpcykuZmluZCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XHJcblxyXG4gICAgJCgnaHRtbCcpLmF0dHIoXCJkYXRhLXpvb21cIiwgZ2V0Q3VycmVudFZhbHVlKCkpO1xyXG5cclxuICAgICRpbnB1dHMub24oJ2NoYW5nZScsZnVuY3Rpb24oKXtcclxuICAgICAgJCgnaHRtbCcpLmF0dHIoXCJkYXRhLXpvb21cIiwgJCh0aGlzKS52YWwoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkcGFyZW50Lm9uKCdyZXNldCcsZnVuY3Rpb24oKXtcclxuICAgICAgJCgnaHRtbCcpLmF0dHIoXCJkYXRhLXpvb21cIiwgZ2V0Q3VycmVudFZhbHVlKCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudFZhbHVlKCkge1xyXG4gICAgICByZXR1cm4gJHBhcmVudC5maW5kKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLnZhbCgpO1xyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn0od2luZG93LGRvY3VtZW50LGpRdWVyeSk7Il19