/**
 * This file contains all of the logic for the third party vendors.
 * - init: Used by main.js when the page first loads
 * - wufoo_handler: Handles the javascript required on the new leaf orde page.
 */

/**
 * init loads any third party logic.
 */
exports.init = function () {
  // Load the lazy load plugin and set the class to be used
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".plugin--lazy"
  });

  // Handle the wufoo form
  wufoo_handler();

}

/**
 * wufoo_handler manages the css needed on the new leaf order page. It sets a limit time
 * on the collection day, and then displays a particular date if the time limit has been 
 * passed or not. this is done every second incase the limit passes whilst the page is open.
 */
function wufoo_handler() {
  if ($('#wufoo-z40ejed10hiicg').length) {
    setInterval(function () {
      var today_end_time = moment("11:30", "HH:mm");
      var collection_day;

      if (moment().isAfter(today_end_time)) {
        collection_day = moment().add(1, 'days').format('dddd Do MMMM');
      } else {
        collection_day = moment().format('dddd Do MMMM');
      }

      $('.wufoo__collection').text(collection_day);
    }, 1000);
  }
}