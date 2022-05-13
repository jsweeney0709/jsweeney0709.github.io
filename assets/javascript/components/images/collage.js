/**
 * This file contains all of the logic for image collages
 * - init: Used by main.js when the page first loads.
 */

/**
 * init loops through every image collage on the page, and adds a hover
 * handler to each image inside of the collage, which handles opacity.
 */
exports.init = function() {
  // For every collage on the page
  $('.image__collage').each(function(){

    // Find all collage items in this collage
    var collages = $(this).find('.image__collage--item');
    var parent = this; // Since each function handles 'this' as it's own, we need to still track the parent.

    collages.each(function(){

      var self = this; // Track this collage
      $(parent).find('.image__collage--text-wrapper .image__collage--text[data-collage="2"]').show();
      
      // Set hover handler that handles both on hover, and out hover.
      $(self).hover(function(){
        var collage_number = $(this).data('collage');
        $(parent).find('.image__collage--text-wrapper .image__collage--text[data-collage="2"]').hide();

        $(parent).find('.image__collage--text-wrapper .image__collage--text[data-collage="'+collage_number+'"]').show();

        // Check that we aren't hovering on the foreground image, and change its opacity
        if(!$(this).hasClass("component__foreground"))
          $(parent).find('.component__foreground img').css('opacity', '0.7');
        
      }, function(){
        var collage_number = $(this).data('collage');
        $(parent).find('.image__collage--text-wrapper .image__collage--text[data-collage="'+collage_number+'"]').hide();

        // Check that we aren't hovering on the foreground image, and change its opacity
        if(!$(this).hasClass("component__foreground"))
          $(parent).find('.component__foreground img').css('opacity', '1');
          $(parent).find('.image__collage--text-wrapper .image__collage--text[data-collage="2"]').show();
          // Make first collage item visible be default
          //$(parent).find('.image__collage--text-wrapper .image__collage--text[data-collage="'+collage_number+'"]').show();
      });
    });

  });

  // For every collage LANDSCAPE on the page
  $('.image__collage--landscape').each(function(){

    // Find all collage items in this collage
    var collages = $(this).find('.image__collage--landscape--item');
    var parent = this; // Since each function handles 'this' as it's own, we need to still track the parent.

    collages.each(function(){

      var self = this; // Track this collage
      $(parent).find('.image__collage--landscape--text-wrapper .image__collage--landscape--text[data-collage="2"]').show();
      
      // Set hover handler that handles both on hover, and out hover.
      $(self).hover(function(){
        var collage_number = $(this).data('collage');
        $(parent).find('.image__collage--landscape--text-wrapper .image__collage--landscape--text[data-collage="2"]').hide();

        $(parent).find('.image__collage--landscape--text-wrapper .image__collage--landscape--text[data-collage="'+collage_number+'"]').show();

        // Check that we aren't hovering on the foreground image, and change its opacity
        if(!$(this).hasClass("component__foreground"))
          $(parent).find('.component__foreground img').css('opacity', '0.7');
        
      }, function(){
        var collage_number = $(this).data('collage');
        $(parent).find('.image__collage--landscape--text-wrapper .image__collage--landscape--text[data-collage="'+collage_number+'"]').hide();

        // Check that we aren't hovering on the foreground image, and change its opacity
        if(!$(this).hasClass("component__foreground"))
          $(parent).find('.component__foreground img').css('opacity', '1');
          $(parent).find('.image__collage--landscape--text-wrapper .image__collage--landscape--text[data-collage="2"]').show();
          // Make first collage item visible be default
          //$(parent).find('.image__collage--text-wrapper .image__collage--text[data-collage="'+collage_number+'"]').show();
      });
    });

  });
}