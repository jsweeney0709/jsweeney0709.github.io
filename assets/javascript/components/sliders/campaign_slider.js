/**
 * This file contains all of the logic for campaign sliders
 * - init: Used by main.js when the page first loads.
 * - campaign_slider_run: Available only to this file, called when we want to start the slider loop.
 * - campaign_slider_advance: Available to the whole browser, called when a 
 *                            selector is pressed to change slide.
 */

 // Keep track of the campaign timeouts as we may have more than one slider on the page.
var campaign_timeouts = [];

/**
 * init sets up the page by adding selectors and running the slider when the page first loads.
 */
exports.init = function() {
  // For every campaign slider on the page
  $('.slider__campaign').each(function(){
    // gather each slide
    var slides = $(this).find('.slider__campaign--slide');
    var no_slides = slides.length;
    var name_attribute = $(this).data("name");

    // For each slide
    for(var i = 0; i < no_slides; i++) {
      // Add a selector dot that is clickable.
      $('div[data-for="'+name_attribute+'"]').append('<div class="slider__campaign--selector" onclick="campaign_slider_advance(this)" data-slide-for="'+(i+1)+'" data-slider="'+name_attribute+'"><div class="slider__campaign--selector-dot"></div></div>');
    }

    // Finally start the animation
    campaign_slider_run($(this));
  });
}

/**
 * Only available to other functions in this file, this method runs the slider by creating a 
 * 5 second timeout between slides. Since we can have multiple on one page, we need to find the
 * specific timeout for this timer.
 */
function campaign_slider_run(self) {
  var slide_number = $(self).find('.slider__campaign--slide.active').data("slide");
  var slides = $(self).find('.slider__campaign--slide');
  var name_attribute = $(self).data("name");
  var selectors = $('div[data-slider="'+ name_attribute +'"]');

  // Clear timeout for this particular slider
  for (timeout in campaign_timeouts) {
    var campaign_timeout = campaign_timeouts[timeout];

    if(campaign_timeout.slider_name == name_attribute) {
      clearTimeout(campaign_timeout.timeout);
      campaign_timeouts.splice(timeout, 1);
      break;
    }
  }
  
  // Reset the selectors
  for (var i = 0; i < slides.length; i++) {
    selectors[i].className = selectors[i].className.replace(' active', '');
  }

  // Set the selector that corresponds to this slide to active
  selectors[slide_number-1].className += " active";

  // Start the timer for this slide
  var timeout = setTimeout(function () {
    // Hide previous slide
    $(self).find('.slider__campaign--slide').removeClass('active');

    // Ensure the slides loop back to the start correctly
    if(slide_number == slides.length) slide_number = 1;
    else slide_number++;

    // Make new slide active
    $(self).find('.slider__campaign--slide[data-slide="'+slide_number+'"]').addClass('active');

    campaign_slider_run(self);
  }, 5000); 

  // Add this new timer to the timeouts list for the next run.
  var timeout_obj = {
    slider_name: name_attribute,
    timeout: timeout
  }

  campaign_timeouts.push(timeout_obj);
}

/**
 * Available to the whole browser, this allows for the advancement of slides in a campaign slider
 * when the selector dot is pressed. Gathering the information needed for the slider and slide number
 * it then calls the run method to reset the slider onto the correct slide.
 */
window.campaign_slider_advance = (self) => {
  var slide_no_for = $(self).data("slide-for");
  var slider_for = $(self).data("slider");
  var slider = $('.slider__campaign[data-name="'+slider_for+'"'); 
  $(slider).find('.slider__campaign--slide').removeClass('active');
  $(slider).find('.slider__campaign--slide[data-slide="'+slide_no_for+'"]').addClass('active');
  campaign_slider_run($(slider));
}