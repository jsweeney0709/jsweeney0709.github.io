/**
 * This file contains all of the logic for popups. 
 * - init: Used by main.js when the page first loads.
 */

exports.init = function() {
  $(".closeModalPopup").click(function(event) {
    event.preventDefault();
    $("#modalPopup").fadeOut(1000);
  });

  var current = new Date();
  var startDate = new Date("September 20, 2019 10:00:00");
  var endDate = new Date("September 20, 2019 11:00:00");
  $(function() {
    if (current.getTime() <= endDate.getTime() && current.getTime() >= startDate.getTime()) {
      $("#modalPopup").show();
    } else {
      $("#modalPopup").hide();
    }
  });
}