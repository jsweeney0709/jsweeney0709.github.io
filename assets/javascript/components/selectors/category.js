/**
 * This file contains all of the logic for category selectors.
 * - init: Used by main.js when the page first loads.
 */

 /**
  * init watches for hovers over each option in the category selector.
  * This handles both the on hover and out hover to show the background image.
  * Uses data attributes to handle which image should show depending on the item
  * that has been hovered on.
  */
exports.init = function() {

  $('.cat-selector__with-image a').hover(function(){
    var for_attribute = $(this).data("for");
    $('.cat-selector__with-image .component__hoverable--images img[data-name="'+for_attribute+'"]').show();

  }, function() {
    var for_attribute = $(this).data("for");
    $('.cat-selector__with-image .component__hoverable--images img[data-name="'+for_attribute+'"]').hide();
  });
}