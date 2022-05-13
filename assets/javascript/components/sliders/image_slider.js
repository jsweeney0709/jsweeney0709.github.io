/**
 * This file contains all of the logic for image sliders
 * - init: Used by main.js when the page first loads.
 * - image_slider_run: Available only to this file, called when we want to start the slider loop.
 * - image_slider_advance: Available to the whole browser, called when a 
 *                            selector is pressed to change slide.
 */

// Keep track of the campaign timeouts as we may have more than one slider on the page.
var slider_timeouts = [];

/**
 * init sets up the page by adding selectors and running the slider when the page first loads.
 */
exports.init = function() {
  // For every image slider on the page
  $('.image-slider').each(function() {
    // gather each slide
    var slides = $(this).find('.image-slider__image');
    var no_slides = slides.length;
    var name_attribute = $(this).data("name");

    // For each slide
    for(var i = 0; i < no_slides; i++) {
      slides[i].style.display = "none";

      // Add a selector dot that is clickable.
      $('div[data-for="'+name_attribute+'"]').append('<div class="image-slider__selector" onclick="image_slider_advance(this)" data-slide-for="'+(i+1)+'" data-slider="'+name_attribute+'"><div class="image-slider__selector--dot"></div></div>');
    }

    // Finally start the animation
    image_slider_run($(this));
  });
}

/**
 * Only available to other functions in this file, this method runs the slider by creating a 
 * 3 second timeout between slides. Since we can have multiple on one page, we need to find the
 * specific timeout for this timer.
 */
function image_slider_run(self) {
  var slide_number = $(self).find('.image-slider__image.active').data("slide");
  var slides = $(self).find('.image-slider__image');
  var name_attribute = $(self).data("name");
  var selectors = $('div[data-slider="'+ name_attribute +'"]');

  // Clear timeout for this particular slider
  for (timeout in slider_timeouts) {
    var slider_timeout = slider_timeouts[timeout];

    if(slider_timeout.slider_name == name_attribute) {
      clearTimeout(slider_timeout.timeout);
      slider_timeouts.splice(timeout, 1);
      break;
    }
  }
  
  // Reset the selectors and slides
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    selectors[i].className = selectors[i].className.replace(' active', '');
  }

  // Set the selector and image that corresponds to this slide to active
  slides[slide_number-1].style.display = "block";
  selectors[slide_number-1].className += " active";

  // Start the timer for this slide
  var timeout = setTimeout(function () {
    // Hide previous slide
    $(self).find('.image-slider__image').removeClass('active');

    // Ensure the slides loop back to the start correctly
    if(slide_number == slides.length) slide_number = 1;
    else slide_number++;

    // Make new slide active
    $(self).find('.image-slider__image[data-slide="'+slide_number+'"]').addClass('active');

    image_slider_run(self);
  }, 6000);

  // Add this new timer to the timeouts list for the next run.
  var timeout_obj = {
    slider_name: name_attribute,
    timeout: timeout
  }

  slider_timeouts.push(timeout_obj);
}

/**
 * Available to the whole browser, this allows for the advancement of slides in an image slider
 * when the selector dot is pressed. Gathering the information needed for the slider and slide number
 * it then calls the run method to reset the slider onto the correct slide.
 */
window.image_slider_advance = (self) => {
  var slide_no_for = $(self).data("slide-for");
  var slider_for = $(self).data("slider");
  var slider = $('.image-slider[data-name="'+slider_for+'"'); 
  $(slider).find('.image-slider__image').removeClass('active');
  $(slider).find('.image-slider__image[data-slide="'+slide_no_for+'"]').addClass('active');
  image_slider_run($(slider));
}