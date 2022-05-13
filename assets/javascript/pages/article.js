/**
 * This file contains all of the logic for the article pages.
 * - init: Used by main.js when the page first loads
 */


/**
 * init watches the page and shows the article page menu and handles 
 * any of the interaction with the menu. 
 */
exports.init = function() {
  var padding = 100;
  var offset = $('.su__header').height() + padding;

  // Watch for page scrolling
  $(window).on('scroll', function(e) {

    // If we are above the offset then hide the page menu
    if(($(window).scrollTop() < offset) && (document.location.href.indexOf('account') === -1)) {
      $('.page__menu').removeClass("show");
      $('.page__menu--navigation--item').removeClass('highlighted');
      $('.page__menu--chapter').html("&nbsp;");
    } else {
      // If we are below the offset then we show the page menu.
      $('.page__menu').addClass("show");

      // For each chapter on the page
      $('.page__chapter').each(function(e){
        // If the position of the page is within the space of this chapter, we highlight this in 
        // the menu and set the menu text to the chapter name.
        if($(window).scrollTop() + (offset+padding) >= $(this).offset().top) {
          var id = $(this).attr('id');
          $('.page__menu--navigation--item').removeClass('highlighted');
          $('.page__menu--navigation a[href="#' + id + '"]').parent().addClass('highlighted');
          var chapter = $('.page__menu--navigation a[href="#' + id + '"]').text();
          $('.page__menu--chapter').text(chapter);
        }
      });
    }
  });

  // Handle the closing of the page menu 
  $('.page__menu--toggle').on('click', function (){
    var text = $(this).find("span").text();
    $(this).find("span").text(text == "View Chapters" ? "Close Menu" : "View Chapters");
    $(this).find(".span__news").text(text == "News Categories" ? "Close Menu" : "News Categories");
    $(this).find(".span__account").text(text == "My Account Menu" ? "Close Menu" : "My Account Menu");
    $('.page__menu--navigation').toggleClass("open");

    /*if ($('.page__menu--navigation').hasClass("open")) {
      $('.page__menu--navigation').css('margin-top', '-205px');
    }*/
  });

  // Handle the clicking of the page menu item. Where the actual scrolling is handled in anchor_scrolling.js, 
  // this handles the text changes of the menu. 
  $('.page__menu--navigation--item').on('click', function (){
    var text = $('.page__menu--toggle span').text();
    $('.page__menu--toggle span').text(text == "View Chapters" ? "Close Menu" : "View Chapters");
    $('.page__menu--toggle .span__news').text(text == "News Categories" ? "Close Menu" : "News Categories");
    $('.page__menu--navigation').toggleClass("open");
  });
}

