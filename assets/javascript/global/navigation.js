/**
 * This file contains all of the logic for the navigation.
 * - init: Used by main.js when the page first loads
 */

 /**
  * init handles the clicking of the navigation icons, and the search animations in the header.
  */
exports.init = function() {
  // Handle the navigation opening and closing
  $('.menu-js-toggle').on('click', function () {
    $('#full-navigation').toggleClass("open");
    $('.su__navigation').toggleClass("open");
    $('.menu-js-toggle').toggleClass("is-active");
  });

  // Handle the appearance of the search box 
  $('.su__header--search-icon').on('click', function (e) {
    e.preventDefault();
    var location = $(this).data("location");

    // Check which search box we are talking about
    var parent = (location == 'header') ? $('.su__header--search') : $('.su__navigation_header--search');

    // If has show_search then make the icon execute search on next click, or vice versa.
    if($(this).hasClass('show_search')) {
      $(this).removeClass('show_search').addClass('execute_search');
      parent.find('.su__header--search-form').removeClass('closed');
      parent.find('.su__header--search-form').addClass('active');
      parent.find('.su__header--search-form').find("#site-search").focus();

    } else if ($(this).hasClass('execute_search')) {
      if(parent.find('.su__header--search-form').find("#site-search").val() != '') {
        parent.find('.su__header--search-form').find('#search-form').submit();
      }
    }
  });

  // Mobile only, if the close button of the search is pressed ensure it closes.
  $('.su__header--search-close').on('click', function (e) {
    e.preventDefault();
    var location = $(this).data("location");

     // Check which search box we are talking about
    var parent = (location == 'header') ? $('.su__header--search') : $('.su__navigation_header--search');
    parent.find('.su__header--search-form').removeClass('active');
    parent.find('.su__header--search-form').addClass('closed');
    parent.find('.su__header--search-icon').removeClass('execute_search').addClass('show_search');
  });
}