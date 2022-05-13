/**
 * This file contains all of the logic for the page theming.
 * - init: Used by main.js when the page first loads
 */

/**
 * init handles the colouring of the header and footer if the require data attribute is present
 * on the page. Also correctly handles the behaviour of the transparent header.
 */
exports.init = function () {
  if ($("[data-page-theme]").data("page-theme") != undefined) {
    //New statement for changing logo based on theme
    if (
      $("[data-page-theme]").data("page-theme") === "t__def-bl--bg-pas" ||
      $("[data-page-theme]").data("page-theme") === "t__soc--bg-pas" ||
      $("[data-page-theme]").data("page-theme") === "t__ads--bg-pas" ||
      $("[data-page-theme]").data("page-theme") === "t__spf--bg-pas" ||
      $("[data-page-theme]").data("page-theme") === "t__part_fair--bg-pri"
    ) {
      var background_colour_class = $("[data-page-theme]").data("page-theme");
      var background_colour = $("." + background_colour_class).css(
        "backgroundColor"
      );
      $("::-webkit-scrollbar-thumb").css("background", "" + background_colour);
      if (background_colour_class === "t__ads--bg-pas") {
        $(
          "#ssu-logo-badge, #ssu-logo-text, body > footer > div > div.g__4--m.g__4--t.g__4--d.g__9--o > div > a > svg > g > path"
        ).css("fill", "#009e4b");
      } else {
        $(
          "#ssu-logo-badge, #ssu-logo-text, body > footer > div > div.g__4--m.g__4--t.g__4--d.g__9--o > div > a > svg > g > path"
        ).css("fill", "#0ABEF0");
      }
      $(
        ".su__header--action > a, .su__header--action > div > a, .su__header--search-icon.show_search > a > i, .su__header--checkout--icon > a > i, footer a, .footer__address, .footer__links"
      ).css("color", "#4a4a4a");
      $("div.su__header--menu.menu-toggle-holder > div > svg > path").css(
        "fill",
        "#4a4a4a"
      );

      $(window).on("scroll", function () {
        if ($(".transparent__header").length > 0) {
          if ($(window).scrollTop() > 100) {
            $(".transparent__header").css("background", "" + background_colour);
          } else {
            $(".transparent__header").css("background", "none");
          }
        } else {
          $(".su__header--wrapper").addClass(background_colour_class);
        }
      });

      $("footer").addClass(background_colour_class);
    } else {
      console.log($("[data-page-theme]").data("page-theme"));
      var background_colour_class = $("[data-page-theme]").data("page-theme");
      var background_colour = $("." + background_colour_class).css(
        "backgroundColor"
      );
      $("::-webkit-scrollbar-thumb").css("background", "" + background_colour);

      $(window).on("scroll", function () {
        if ($(".transparent__header").length > 0) {
          if ($(window).scrollTop() > 100) {
            console.log(
              "scroling and adding background: " +
                background_colour +
                background_colour_class
            );
            $(".transparent__header").css("background", "" + background_colour);
          } else {
            $(".transparent__header").css("background", "none");
          }
        } else {
          $(".su__header--wrapper").addClass(background_colour_class);
        }
      });

      $("footer").addClass(background_colour_class);
    }
  }
};
