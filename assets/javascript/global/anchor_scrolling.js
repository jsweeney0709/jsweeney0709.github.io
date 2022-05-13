/**
 * This file contains all of the logic for scrolling the page when an anchor link is pressed.
 * - init: Used by main.js when the page first loads
 */

 /**
  * init watches for any clicks of links, and if they are anchor links; it make sure the page 
  * performs a nice scroll to their location, rather than a jolty jump.
  */
exports.init = function() {
  var padding = 15;
  var offset = $('.su__header').height() + padding;

  if($('.page__menu').length > 0) 
    offset += $('.page__menu').height();

  var anchorName = "contact-anchor";
  $('.testingContactAnchor').click(function(){
          
 });
  if($(this).attr('id') == "contact-anchor")  {
    console.log("testing this");
  } else {
  // Add smooth scrolling to all anchor links
  $("a").on('click', function() {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Account for height difference when the article page menu is open/reset for when closed
      if($('.page__menu').length > 0) {
        if($('.page__menu--navigation.open').length > 0) {
          offset = $('.su__header').height() + $('.page__menu').height() + padding;
        } else {
          offset = $('.su__header').height() + $('.page__menu').height() + padding;
        }
      }

      

      // Animate the scrolling in half a second, when done edit some article page attributes (if they exist on the page)
      $('html, body').animate({
        scrollTop: $(hash).offset().top - offset
      }, 500, function () {
        
        $('.page__menu--navigation--item').removeClass('highlighted');
        $('.page__menu--navigation a[href="' + hash + '"]').parent().addClass('highlighted');

        var chapter = $('.page__menu--navigation a[href="' + hash + '"]').text();
        $('.page__menu--chapter').text(chapter);
      });
    }
  });
}
}

