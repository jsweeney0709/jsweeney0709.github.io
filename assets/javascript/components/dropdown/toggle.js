/**
 * This file contains all of the logic for dropdown lists/image-lists. 
 * - init: Used by main.js when the page first loads.
 */

/**
 * init creates a couple of event listeners for the dropdown toggle box, and 
 * the close button inside of image lists. The list itself is first identified,
 * then particular classes are altered to expand/close the list and change the icons.
 */
exports.init = function() {
  // Handle the dropdown box being clicked
  $('.dropdown__toggle').on('click', function() {
    var for_attribute = $(this).data("for");
    $('div[data-name="'+ for_attribute +'"]').toggleClass("active");
    $(this).find('.dropdown__toggle--icon i').toggleClass('ai-down').toggleClass('ai-close');
  });

  // Handle the close button being clicked (only on image dropdowns)
  $('.dropdown__close').on('click', function() {
    var for_attribute = $(this).data("for");
    $('div[data-name="'+ for_attribute +'"]').toggleClass("active");
    $('.dropdown__toggle[data-for="'+ for_attribute +'"]').find('.dropdown__toggle--icon i').toggleClass('ai-down').toggleClass('ai-close');
  });
}