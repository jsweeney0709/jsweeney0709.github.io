/**
 * This file contains all of the logic for timers.
 * - init: Used by main.js when the page is loaded
 * - timer_stage_chec: Used by init to check what stage the timer is on
 */

 // Import the active timer data
var active_timers = require('./active_timers.js');

/**
 * init handles all of the logics for timers on a particular page. Every second, the
 * logic is ran to update the text. The majority of the logic is setting the correct
 * text depending on the current state. *
 */
exports.init = function() {
  // For each timer on the page
  $('.timer__wrapper').each(function() {
    var name_attribute = $(this).data("name");

    // Gather the correct data for this timer
    var timer_json = active_timers.active_timers.filter(function(item) {
      return item.name == name_attribute;
    });
    timer_json = timer_json[0];

    // Get the time right now and check what stage the timer is in.
    var now = moment();
    var current_stage = timer_stage_check(now, timer_json.stages);

    // Set the title of the timer depending on the stage.
    $(this).find('.timer__title').text(current_stage.name);

    // Are we in the final stage?
    if(current_stage.expiry != "") {
      var stage_time = moment(current_stage.expiry);
      var self = this;

      // Countdown Logic
      var timer = setInterval(function() {
        // Every second we check whether the stage has changed, and update the title.
        var now = moment();
        current_stage = timer_stage_check(now, timer_json.stages);
        $(self).find('.timer__title').text(current_stage.name);

        // Has the stage changed whilst the user is on the page?
        if(current_stage.expiry != "") {
          stage_time = moment(current_stage.expiry);

          // Work out the values for day, hour, and minutes. Add 1 to minutes so that it is
          // always above, since we are not dealing with seconds.
          var days = stage_time.diff(now, 'days', false);
          var hours = stage_time.diff(now, 'hours', false) - (days * 24);
          var minutes = stage_time.diff(now, 'minutes', false) - (days * 24 * 60) - (hours * 60) + 1;

          // If minutes is 60, make it look like 00 (normal behaviour)
          // 00 00 60 becomes 00 01 00
          if(minutes == 60) {
            minutes = 0;
            hours += 1;
          }

          // Do some checks to see if we are on one day, and update the text to reflect
          if (days == 1) {
            days = "0" + days;
            $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="days"]').find(".timer__countdown--title").text("Day");
            $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_large[data-time="days"]').find(".large_timer__countdown--title").text("Day");
          } else if(days < 10) {
            days = "0" + days;
            $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="days"]').find(".timer__countdown--title").text("Days");
            $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_large[data-time="days"]').find(".large_timer__countdown--title").text("Days");
          }

          // Do some checks to see if we are on one hour, and update the text to reflect
          if (hours == 1) {
            hours = "0" + hours;
            $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="hours"]').find(".timer__countdown--title").text("Hour");
            $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_medium[data-time="hours"]').find(".large_timer__countdown--title").text("Hour");
          } else if(hours < 10) {
            hours = "0" + hours;
            $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="hours"]').find(".timer__countdown--title").text("Hours");
            $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_medium[data-time="hours"]').find(".large_timer__countdown--title").text("Hours");
          }

          // Do some checks to see if we are on one minute, and update the text to reflect
          if (minutes == 1) {
            minutes = "0" + minutes;
            $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="minutes"]').find(".timer__countdown--title").text("Minute");
            $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_small[data-time="minutes"]').find(".large_timer__countdown--title").text("Minute");
          } else if (minutes < 10) {
            minutes = "0" + minutes;
            $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="minutes"]').find(".timer__countdown--title").text("Minutes");
            $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_small[data-time="minutes"]').find(".large_timer__countdown--title").text("minutes");
          }

          // Set the time on the page
          $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="days"]').find(".timer__countdown--number").text(days);
          $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_large[data-time="days"]').find(".large_timer__countdown--number").text(days);
          $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="hours"]').find(".timer__countdown--number").text(hours);
          $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_medium[data-time="hours"]').find(".large_timer__countdown--number").text(hours);
          $(self).find(".timer__countdown").find('.timer__countdown--item[data-time="minutes"]').find(".timer__countdown--number").text(minutes);
          $(self).find(".large_timer__countdown").find('.large_timer__countdown--item_small[data-time="minutes"]').find(".large_timer__countdown--number").text(minutes);
        } else {
          $(self).find(".timer__countdown").hide();
          $(self).find(".large_timer__countdown").hide();
        }
      }, 1000);
    } else {
      $(this).find(".timer__countdown").hide();
      $(this).find(".large_timer__countdown").hide();
    }

  });
}

/**
 * When given the current time and the list of stages, this ensures the correct stage is returned for
 * the timer.
 */
function timer_stage_check(now, stages) {
  var current_stage = {};

  // For each stage
  for(stage in stages) {
    var item = stages[stage];

    // Get the expiry in a date object
    var expiry = moment(item.expiry);

    // If it isn't valid we presume it is the final stage
    if(!expiry.isValid()) {
      current_stage = item;
      break;
    }

    // If right now is before the expiry date of this stage, assume this is the stage we want.
    if(now < expiry) {
      current_stage = item;
      break;
    }
  }
  return current_stage;
}
