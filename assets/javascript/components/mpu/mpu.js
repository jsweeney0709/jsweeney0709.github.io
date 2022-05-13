/**
 * This file contains all of the logic for auto rotating MPUs. 
 * - init: Used by main.js when the page first loads.
 */

/**
 * init creates a couple of event listeners for the dropdown toggle box, and 
 * the close button inside of image lists. The list itself is first identified,
 * then particular classes are altered to expand/close the list and change the icons.
 */
exports.init = function() {
  $('.mpu_auto_rotate > div:gt(0)').hide();    
  var numMpuSlides = $('.mpu_auto_rotate--slide').length;
  if (numMpuSlides >= 2) {
   setInterval(function() {
    $('.mpu_auto_rotate > div:first') 
     .hide()
     .next()
     .show()
     .end()
     .appendTo('.mpu_auto_rotate');
  }, 4000);
}
  $('.mpu_auto_rotate_m > div:gt(0)').hide();    
  var numMpuSlidesM = $('.mpu_auto_rotate_m--slide').length;
  if (numMpuSlidesM >= 2) {
   setInterval(function() {
    $('.mpu_auto_rotate_m > div:first') 
     .hide()
     .next()
     .show()
     .end()
     .appendTo('.mpu_auto_rotate_m');
  }, 4000);
}
  $('.adBanner_auto_rotate > div:gt(0)').hide();    
  var numMpuSlidesM = $('.adBanner_auto_rotate--slide').length;
  if (numMpuSlidesM >= 2) {
  setInterval(function() {
    $('.adBanner_auto_rotate > div:first') 
    .hide()
    .next()
    .show()
    .end()
    .appendTo('.adBanner_auto_rotate');
  }, 4000);
  }
  $('.adBanner_auto_rotate_m > div:gt(0)').hide();    
  var numMpuSlidesM = $('.adBanner_auto_rotate_m--slide').length;
  if (numMpuSlidesM >= 2) {
  setInterval(function() {
    $('.adBanner_auto_rotate_m > div:first') 
    .hide()
    .next()
    .show()
    .end()
    .appendTo('.adBanner_auto_rotate_m');
  }, 4000);
  }
}