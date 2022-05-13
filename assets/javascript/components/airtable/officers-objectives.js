/**
   * This file contains all of the logic for displaying Officer Objectives from AirTable.
   * BaseID: appflLlpjPXN2hZ4l
   * API key: AIRTABLE_API_KEY=keyKrzjJcoeMnIAKY
   */

  exports.init = function() {
    $( ".bar" ).each(function() {
      console.log("It isn't doing this!");
      let percent = $(this).attr('data-prog');
      //For too high values :
      if(percent > 100){
        percent = 100;
      }
  
      $(this).animate({width: percent+'%' }, 2000);

      if (percent <= 33) {
        console.log("Less than!");
        $(this).css('background-color', '#FFCB21');
      } else if (percent >= 66) {
        $(this).css('background-color', '#00B255');
      }
    });
  }
  