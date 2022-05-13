/**
 * This file contains all of the logic for the transparent header.
 * - init: Used by main.js when the page first loads
 */

/**
 * init ensures that the transparent header function works correctly. It makes sure that there is no
 * colour on the header fopr the first 100 pixels in height, then adds colour when scrolling occurs
 * after 100 pixels in height.
 */
exports.init = function () {
  // Every landing page / outlet will have a transparent header. The homepage is handled by the EE template variables.
  if (
    $(".landing__header--container").length > 0 ||
    $(".outlet__header--container").length > 0
  ) {
    $(".su__header--wrapper").addClass("transparent__header");
  }
  //Check to see if on mobile
  var is_mobile = true;
  if ($(".advert__top--drop").css("top") == "290px") {
    is_mobile = false;
  }

  // Watch for page scrolling and apply/remove the scrolling class respectively.
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      $(".su__header--wrapper").addClass("scrolling");
      $(".su__navigation_header").addClass("scrolling");
      if ($("[data-page-theme]").data("page-theme") === "t__soc--bg-pas") {
        $(".su__header--wrapper").css("background", "rgb(160, 120, 255)");
      }
    } else {
      $(".su__header--wrapper").removeClass("scrolling");
      $(".su__navigation_header").removeClass("scrolling");
    }
    //For scrolling on homepage with advert
    if ($(window).scrollTop() > 140) {
      /*$('.su__header--wrapper-advert').addClass('scrolling');
      $('.su__navigation_header-advert').addClass('scrolling');
      $('.su__header--wrapper-advert').css('top', '0');
      $('.su__header--wrapper-advert').css('position', 'sticky');*/

      //$('#test__main--header').addClass('scrolling');
      $(".su__navigation_header").addClass("scrolling");
      //$('#test__main--header').css('top', '0');
      //$('#test__main--header').css('position', 'sticky');
    } else if ($(window).scrollTop() < 140) {
      /*$('.su__header--wrapper-advert').removeClass('scrolling');
      $('.su__header--wrapper-advert').css('top', '360px');
      $('.su__header--wrapper-advert').css('position', 'relative');*/
      $(".su__navigation_header-advert").removeClass("scrolling");

      //No advert on mobile
      /*if (is_mobile == false) {
        $('#test__main--header').removeClass('scrolling');
        $('#test__main--header').css('top', '140px');
        $('#test__main--header').css('position', 'relative');
        $('.su__navigation_header').removeClass('scrolling');
      }*/
    }
  });
};
