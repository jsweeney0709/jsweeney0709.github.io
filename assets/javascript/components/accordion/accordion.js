/**
 * This file contains all of the logic for accordions. 
 * - init: Used by main.js when the page first loads.
 */

/**
 * init creates an event listener for all accordions on the given page, 
 * and simply toggles a number of classes to expand and alter icons.
 */ 
exports.init = function() {
  $("body").on("click", ".acc__it--t, .accordion__item--title", function () {
    $(this).next().toggleClass("acc__it--o");
    $(this).find(".right i").toggleClass("ai-plus");
    $(this).find(".right i").toggleClass("ai-minus");
  });
}