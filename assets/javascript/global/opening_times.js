/**
 * This file contains all of the logic for opening times.
 * - all_outlets: Called in the browser when we want to receive all of the outlet times.
 * - today_from_code: Called when we want to get the information for today for an outlet.
 * - week_from_code: Called when we want to ge the information for the week for an outlet.
 * - filter_by_search: Called when we want to filter the results of all_outlets.
 * - ot_airtable: Contains all of the operations that interact with airtable. 
 * - ot_util: Contains all of the operations that manipulate the page in some way.
 */

 // Have a record of the outlet categories
var outlets, help_advice, misc;

/**
 * all_outlets contains the logic for gathering all of the outlets from airtable for this week.
 */
exports.all_outlets = function (wb_string) {
  var prelim_promises = [];
  // get the week id from airtable for this week
  prelim_promises.push(ot_airtable.get_week_id_from_week_beginning(wb_string));
  // get all of the outlet names
  prelim_promises.push(ot_airtable.get_all_outlets());

  Promise.all(prelim_promises).then(prelim_results => {
    var opening_promises = [];
    // Get all opening times for this week with the given week id
    opening_promises.push(ot_airtable.get_opening_times_with_week_id(prelim_results[0].records[0].fields['Name']));

    Promise.all(opening_promises).then(opening_results => {
      var outlet_results = prelim_results[1].records;
      var opening_times = opening_results[0].records;

      // Get today so that we can highlight
      var day = moment().startOf('isoWeek').isoWeekday(1);
      var today = moment().isoWeekday();
      var day_s = day.format("dddd");
      var outlets_list = [];

      // For each outelt 
      for (or in outlet_results) {
        var days_array = [];
        var entry = opening_times.filter((entry) => {
          console.log(entry.fields.Outlet.includes(outlet_results[or].id));
          return entry.fields.Outlet.includes(outlet_results[or].id);
          
        });

        // If the times exist for this outlet
        if (entry.length > 0) {
          // For each day in the week, store the values from airtable
          for (var i = 0; i < 7; i++) {
            var bold = (today - 1 == i) ? true : false;
            var day_o = {
              bold: bold,
              day: day_s,
              open: entry[0].fields[day_s + " Open"],
              close: entry[0].fields[day_s + " Closed"],
              extra: entry[0].fields[day_s + " Extra Information"]
            }

            // Add to the days array and add a day to the date object.
            days_array.push(day_o);
            day_s = day.add(1, 'days').format("dddd");
          }

          // Pull out the current day
          var current_day = days_array.filter((entry) => {
            return entry.bold === true;
          })

          // Collate all of the data into an outlet object, including it's category, name, 
          // open status, days list and it's external link
          var outlet = {
            category: outlet_results[or].fields['Category'],
            name: outlet_results[or].fields['Name'],
            status: ot_util.status(current_day[0].open, current_day[0].close),
            days: days_array,
            link: outlet_results[or].fields['Page Link']
          }

          outlets_list.push(outlet);
        }
      }

      // Split the outlet list to their categories. 
      var master = ot_util.filter_by_category(outlets_list, "Master");
      outlets = ot_util.filter_by_category(outlets_list, "Outlets");
      help_advice = ot_util.filter_by_category(outlets_list, "Help & Advice");
      misc = ot_util.filter_by_category(outlets_list, "Misc");

      // Inject the results onto the page.
      ot_util.build_opener(master);
      ot_util.build_master_times(master);
      ot_util.build_accordion(outlets, "Outlets");
      ot_util.build_accordion(help_advice, "Help & Advice");
      ot_util.build_accordion(misc, "Misc");
    });
  });
}

/**
 * today_from_code extracts the current day from airtable and displays this.
 */
exports.today_from_code = function (code) {
  // Work out the week string to send off to airtable.
  wb_date = moment().startOf('isoWeek').isoWeekday(1);
  var wb_string = wb_date.format("YYYY-MM-DD");

  var promises = [];
  // Get the week id from the week string above
  promises.push(ot_airtable.get_week_id_from_week_beginning(wb_string));
  // Get the outlet from the code
  promises.push(ot_airtable.get_outlet_from_code(code));

  Promise.all(promises).then(results => {
    var week_results = results[0].records;
    var outlet_result = results[1].records;

    // Ensure we only pull out the opening time ids for this one outlet
    var opening_time_id_array = week_results[0].fields['Opening Times'].filter((entry) => {
      return outlet_result[0].fields['Opening Times'].includes(entry);
    });

    var opening_time_id = opening_time_id_array[0];
    promises = [];
    
    // Get the opening times from the id pulled out above
    promises.push(ot_airtable.get_opening_time_from_id(opening_time_id));

    Promise.all(promises).then(results => {
      var opening_time_result = results[0];
      var day = moment().startOf('isoWeek').isoWeekday(1);
      var day_s = day.format("dddd");
      var today = moment().isoWeekday();
      var outlet_day = {};

      for (var i = 0; i < 7; i++) {
        // Work out today
        var bold = (today - 1 == i) ? true : false;

        // Only store the data for the day that matches today.
        if (bold) {
          outlet_day = {
            day: day_s,
            open: opening_time_result.fields[day_s + " Open"],
            close: opening_time_result.fields[day_s + " Closed"],
            extra: opening_time_result.fields[day_s + " Extra Information"]
          }
          break;
        }
        day_s = day.add(1, 'days').format("dddd");

      }

      // Build a single string for the browser
      ot_util.build_single(outlet_day, code);
    });
  });
}

/**
 * week_from_code extracts the current week from airtable and displays this.
 */
exports.week_from_code = function (code) {
  // Work out the week string to send off to airtable.
  wb_date = moment().startOf('isoWeek').isoWeekday(1);
  var wb_string = wb_date.format("YYYY-MM-DD");

  var promises = [];
  // Get the week id from the week string above
  promises.push(ot_airtable.get_week_id_from_week_beginning(wb_string));
  // Get the outlet from the code
  promises.push(ot_airtable.get_outlet_from_code(code));

  Promise.all(promises).then(results => {
    var week_results = results[0].records;
    var outlet_result = results[1].records;

    // Ensure we only pull out the opening time ids for this one outlet
    var opening_time_id_array = week_results[0].fields['Opening Times'].filter((entry) => {
      return outlet_result[0].fields['Opening Times'].includes(entry);
    });

    var opening_time_id = opening_time_id_array[0];
    promises = [];

    // Get the opening times from the id pulled out above
    promises.push(ot_airtable.get_opening_time_from_id(opening_time_id));

    Promise.all(promises).then(results => {
      var opening_time_result = results[0];
      var day = moment().startOf('isoWeek').isoWeekday(1);
      var day_s = day.format("dddd");
      var today = moment().isoWeekday();
      var days_array = [];

      // For each day, build an object storing the information
      for (var i = 0; i < 7; i++) {
        // Work out today
        var bold = (today - 1 == i) ? true : false;

        var outlet_day = {
          bold: bold,
          day: day_s,
          open: opening_time_result.fields[day_s + " Open"],
          close: opening_time_result.fields[day_s + " Closed"],
          extra: opening_time_result.fields[day_s + " Extra Information"]
        }
        day_s = day.add(1, 'days').format("dddd");
        days_array.push(outlet_day);
      }

      // Pull out the current day
      var current_day = days_array.filter((entry) => {
        return entry.bold === true;
      })

      // Build an outlet object with the category, name, status, days list and external link.
      var outlet = {
        category: outlet_result[0].fields['Category'],
        name: outlet_result[0].fields['Name'],
        status: ot_util.status(current_day[0].open, current_day[0].close),
        days: days_array,
        link: outlet_result[0].fields['Page Link']
      }

      // Build the week on the browser
      ot_util.build_week(outlet, code);
    });
  });

}

/**
 * filter_by_search uses the 3 data structures from all_outlets and filter them by name 
 * by the given search string. It then adds them to the page in the same way as above. 
 * If the search length is 0; just fully populate in the same way.
 */
exports.filter_by_search = function (search_string) {
  if (search_string.length > 0) {
    var outlets_filtered = outlets.filter((entry) => {
      return entry.name.toLowerCase().includes(search_string.toLowerCase());
    });
    var help_advice_filtered = help_advice.filter((entry) => {
      return entry.name.toLowerCase().includes(search_string.toLowerCase());
    });
    var misc_filtered = misc.filter((entry) => {
      return entry.name.toLowerCase().includes(search_string.toLowerCase());
    });

    ot_util.build_accordion(outlets_filtered, "Outlets");
    ot_util.build_accordion(help_advice_filtered, "Help & Advice");
    ot_util.build_accordion(misc_filtered, "Misc");
  } else {
    ot_util.build_accordion(outlets, "Outlets");
    ot_util.build_accordion(help_advice, "Help & Advice");
    ot_util.build_accordion(misc, "Misc");
  }
}

/**
 * ot_airtable contains all of the asynchronous calls to airtable, all built using Airtable's API.
 */
ot_airtable = {
  get_week_id_from_week_beginning: (week_start) => {
    var get_week = "SEARCH('" + week_start + "', {Week Beginning})";

    return $.ajax({
      url: "https://api.airtable.com/v0/appHcOc9T5I3GFPkg/Weeks?view=Grid%20view&filterByFormula=" + get_week,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
      },
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      crossDomain: true
    });
  },

  get_all_outlets: () => {
    return $.ajax({
      url: "https://api.airtable.com/v0/appHcOc9T5I3GFPkg/Outlets?view=Grid%20view",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
      },
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      crossDomain: true
    });
  },

  get_opening_times_with_week_id: (week_id) => {
    var get_week = "FIND('" + week_id + "', {Week})";

    return $.ajax({
      url: "https://api.airtable.com/v0/appHcOc9T5I3GFPkg/Opening%20Times?view=Entire%20List&filterByFormula=" + get_week,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
      },
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      crossDomain: true
    });
  },

  get_outlet_from_code: (code) => {
    var get_outlet = "{Code} = '" + code + "'";

    return $.ajax({
      url: "https://api.airtable.com/v0/appHcOc9T5I3GFPkg/Outlets?view=Grid%20view&filterByFormula=" + get_outlet,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
      },
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      crossDomain: true
    });
  },

  get_opening_time_from_id: (id) => {
    return $.ajax({
      url: "https://api.airtable.com/v0/appHcOc9T5I3GFPkg/Opening%20Times/" + id,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
      },
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      crossDomain: true
    });
  }
}

/**
 * ot_util contains the operations to manipulate the page.
 */
ot_util = {
  /**
   * empty_page removes all date information from the page. (Only used on /opening-times)
   */
  empty_page: () => {
    // Empty
    $('.ot-opener .content').empty();
    $('.ot-master-times .content').empty();
    $('.ot-outlets .content').empty();
    $('.ot-help-advice .content').empty();
    $('.ot-misc .content').empty();

    // Show Loaders
    $('.ot-opener .js-loading').show();
    $('.ot-master-times .js-loading').show();
    $('.ot-outlets .js-loading').show();
    $('.ot-help-advice .js-loading').show();
    $('.ot-misc .js-loading').show();
  },

  /**
   * status works out whether the outlet is open or closed depending on the two times given.
   */
  status: (open, close) => {
    var now = moment();
    var status = "";
    var m_open = moment(open, "h:mma");
    var m_close = moment(close, "h:mma");
    
    

    if (m_close.format("h:mma").includes("am"))
      m_close.add(1, 'days');

    if (now.isBetween(m_open, m_close)) {
      status = 'Open';
    } else {
      status = 'Closed';
    }
    if (open == "Open") {
      status = 'Open';
      console.log("In here?");
    }
    
    /*if (outlets[outlet].name == "Sheffield Store") {
      console.log("In here?");
      status - 'Open'   ; 
    }*/

    return status;
  },

  /**
   * filter_by_category extracts only the outlets that match the given category.
   */
  filter_by_category: (list, category) => {
    return list.filter((entry) => {
      return entry.category === category;
    });
  },

  /**
   * build_accordion builds the accordion (one per outlet) for the given list of outlets.
   * Split into categories, this then appends to the correct area on the /opening-times page.
   */
  build_accordion: (outlets, category) => {
    var html = "<div class='acc__cont mgn__b--1'>";

    // This might look scary but it is needed to get the accordions working, you will see the same structure being 
    // built but with certain data injected in places.
    if(outlets.length > 0) { 
      for (outlet in outlets) {
        html += "<div class='acc__it'>";
        html += "<button class='acc__it--t right-text caption'>";
        
        if (outlets[outlet].status == "Open")
          html += "<span class='left f__b--b' id='outlet-name'><a target='_blank' class='mgn__r--.5' href='"+ outlets[outlet].link +"'><i class='ai-link'></i></a>" + outlets[outlet].name + "</span><span class='right'><span class='ot-open mgn__r--1 f__b--b'>" + outlets[outlet].status + "</span> <i class='ai-plus'></i></span></button>";      
         else
          html += "<span class='left f__b--b' id='outlet-name'><a target='_blank' class='mgn__r--.5' href='"+ outlets[outlet].link +"'><i class='ai-link'></i></a>" + outlets[outlet].name + "</span><span class='right'><span class='ot-closed mgn__r--1 f__b--b'>" + outlets[outlet].status + "</span> <i class='ai-plus'></i></span></button>";
        
        html += "<div class='acc__it--b'>";
        for (day in outlets[outlet].days) {
          html += "<div class='g__cont mgn__t--.5 caption'>";

          if (outlets[outlet].days[day].bold) {
            switch(outlets[outlet].status) {
              case "Open": 
              /*ATTEMPTING LINK HERE*/
                if (outlets[outlet].name == "Sheffield Store") {
                  html += "<div class='g__2--m g__4--t g__6--d ot-open'><div>" + outlets[outlet].days[day].day + "</div></div>";
                } else {
                  html += "<div class='g__2--m g__4--t g__6--d ot-open'><div>" + outlets[outlet].days[day].day + "</div></div>";
                }
                //html += "<div class='g__2--m g__4--t g__6--d ot-open'><div>" + outlets[outlet].days[day].day + "</div></div>";
                if (outlets[outlet].days[day].extra != undefined)
                  html += "<div class='g__2--m g__4--t g__6--d ot-open g__just--r ta__r--m ta__r--t'>";
                else
                  html += "<div class='g__2--m g__4--t g__6--d ot-open g__just--r'>";

                break;
              case "Closed": 
                html += "<div class='g__2--m g__4--t g__6--d ot-closed'><div>" + outlets[outlet].days[day].day + "</div></div>";

                if (outlets[outlet].days[day].extra != undefined)
                  html += "<div class='g__2--m g__4--t g__6--d ot-closed g__just--r ta__r--m ta__r--t'>";
                else
                  html += "<div class='g__2--m g__4--t g__6--d ot-closed g__just--r'>";
                break;
            }
          } else {
            html += "<div class='g__2--m g__4--t g__6--d'><div>" + outlets[outlet].days[day].day + "</div></div>";

            if (outlets[outlet].days[day].extra != undefined)
              html += "<div class='g__2--m g__4--t g__6--d g__just--r ta__r--m ta__r--t'>";
            else
              html += "<div class='g__2--m g__4--t g__6--d g__just--r'>";
          }
          if (outlets[outlet].days[day].open == outlets[outlet].days[day].close) html += "<div>" + outlets[outlet].days[day].open + "</div>";
          else html += "<div>" + outlets[outlet].days[day].open + " - " + outlets[outlet].days[day].close + "</div>";
          if (outlets[outlet].days[day].extra != undefined)
            html += "<div class='caption__small--uppercase'>" + outlets[outlet].days[day].extra + "</div>";
          else
            html += "<div class='caption__small--uppercase'>&nbsp;</div>";
          
          html += "</div></div>";
        }
        html += "</div></div>";
      }
    } else {
      html = "<p>No outlets match the search query in this category.</p>";
    }

    // Finally hide the loaders and append all of this new html to the page
    switch (category) {
      case "Outlets":
        $('.ot-outlets .js-loading').hide();
        $('.ot-outlets .content').empty();
        $('.ot-outlets .content').append(html);
        break;
      case "Help & Advice":
        $('.ot-help-advice .js-loading').hide();
        $('.ot-help-advice .content').empty();
        $('.ot-help-advice .content').append(html);
        break;
      case "Misc":
        $('.ot-misc .js-loading').hide();
        $('.ot-misc .content').empty();
        $('.ot-misc .content').append(html);
        break;
    }
  },

  /**
   * build_opener sets the text at the top of the /opening-times page.
   */
  build_opener: (outlet) => {
    var html = "";
    if (outlet[0].status == "Open")
      html = "Our main building is <span class='ot-open'>open</span>, see below for specific opening times throughout the SU.";
    else
      //html = "Our main building is currently <span class='ot-closed'>closed</span>, see below for specific opening times throughout the SU.";
      html = "Our main building is currently <span class='ot-closed'>closed</span> and will re-open Tuesday 31st August";

    $('.ot-opener .js-loading').hide();
    $('.ot-opener .content').empty();
    $('.ot-opener .content').append(html);
  },

  /**
   * build_master_times builds the list for the master outlet (usually the building times), on the /opening-times page.
   */
  build_master_times: (outlet) => {
    var html = "<div class='caption__small--uppercase mgn__b--1'>SU Opening Times:</div>";

    // Uses mostly grid classes to layout the list of days.
    for (day in outlet[0].days) {
      html += "<div class='g__cont caption'>";
      if (outlet[0].days[day].bold) {
        switch(outlet[0].status) {
          case "Open": 
            html += "<div class='g__2--m g__4--t g__6--d ot-open'><div>" + outlet[0].days[day].day + "</div></div>";
            html += "<div class='g__2--m g__4--t g__6--d ot-open g__just--r'>";
            break;
          case "Closed": 
            html += "<div class='g__2--m g__4--t g__6--d ot-closed'><div>" + outlet[0].days[day].day + "</div></div>";
            html += "<div class='g__2--m g__4--t g__6--d ot-closed g__just--r'>";
            break;
        }
      } else {
        html += "<div class='g__2--m g__4--t g__6--d'><div class=''>" + outlet[0].days[day].day + "</div></div>";
        html += "<div class='g__2--m g__4--t g__6--d g__just--r'>";
      }
      if (outlet[0].days[day].open == outlet[0].days[day].close) html += "<div class=''>" + outlet[0].days[day].open + "</div>";
      else html += "<div class=''>" + outlet[0].days[day].open + " - " + outlet[0].days[day].close + "</div>";
      if (outlet[0].days[day].extra != undefined)
        html += "<div class='caption__small--uppercase'>" + outlet[0].days[day].extra + "</div>";
      else
        html += "<div class='caption__small--uppercase'>&nbsp;</div>";

      if (outlet[0].days[day].bold)
        html += "</div></div>";
      else
        html += "</div></div>";
    }

    $('.ot-master-times .js-loading').hide();
    $('.ot-master-times .content').empty();
    $('.ot-master-times .content').append(html);
  },

  /**
   * build_single focuses on building just some text that indicates if an outlet is opened or closed.
   */
  build_single: (outlet_day, code) => {
    var html = "";

    /*if (outlet_day.open != "Closed" || outlet_day.close != "Closed") {
      html += "Open today from " + outlet_day.open + " - " + outlet_day.close;
    } else {
      html += "Closed today";
    }*/
    //if (outlet_day.open == outlet_day.close) html += "<div>" + outlet_day.open + "</div>";

    if ((outlet_day.open != "Closed" || outlet_day.close != "Closed")) {
      //console.log("wrong");
      //html += "Open today from " + outlet_day.open + " - " + outlet_day.close;

      if (outlet_day.open == "Open" || outlet_day.close == "Open")
      {
        console.log("Its in there!");
        html += "Open ";
        //html += "<a href='https://sheffieldstore.com/' target='_blank'>sheffieldstore.com</a>";
      }
      
      if (outlet_day.open == "Closed until further notice" || outlet_day.close == "Closed until further notice")
      {
        html += "Closed until further notice";
      } else {
        
        html += "Open today from " + outlet_day.open + " - " + outlet_day.close;
        //html += "Open";
        //html += "<a href='https://sheffieldstore.com/' target='_blank'>sheffieldstore.com</a>";
      } 
    } else {
        /*html += "Closed today";*/
        if (code == 'SAC') {
          html += "Currently closed </br> Advisers currently working remotely";
        } else {
          html += "Currently closed";
        }
        
    }
    
    
    $('.ot__code--' + code + ' .js-loading').hide();
    $('.ot__code--' + code + ' .content').empty();
    $('.ot__code--' + code + ' .content').append(html);

  },

  /**
   * build_week is similar to build master, that just uses grid to list out each day in the week for the outlet.
   */
  build_week: (outlet, code) => {
    var html = "<div class='g__cont opening__times--body'>";

    for(day in outlet.days) {
      if (outlet.days[day].bold) {
        switch(outlet.status) {
          case "Open": 
            html += "<div class='g__2--m g__4--t g__6--d ot-open'><div>" + outlet.days[day].day + "</div></div>";
            html += "<div class='g__2--m g__4--t g__6--d ot-open g__just--r ta__r--m ta__r--t'>";
            break;
          case "Closed": 
            html += "<div class='g__2--m g__4--t g__6--d ot-closed'><div>" + outlet.days[day].day + "</div></div>";
            html += "<div class='g__2--m g__4--t g__6--d ot-closed g__just--r ta__r--m ta__r--t'>";
            break;
        }
      } else {
        html += "<div class='g__2--m g__4--t g__6--d'><div class=''>" + outlet.days[day].day + "</div></div>";
        html += "<div class='g__2--m g__4--t g__6--d g__just--r ta__r--m ta__r--t'>";
      }
      if (outlet.days[day].open == outlet.days[day].close) html += "<div class='' id='LinkAfter'>" + outlet.days[day].open;
      else html += "<div class=''>" + outlet.days[day].open + " - " + outlet.days[day].close + "</div>";
      if (outlet.days[day].extra != undefined)
        html += "<div class='caption__small--uppercase'>" + outlet.days[day].extra + "</div>";
      else
        html += "<div class='caption__small--uppercase'>&nbsp;</div>";

      html += "</div>";
    }

    html += "</div>";
    /*html += "<a href='https://sheffieldstore.com/' target='_blank'>sheffieldstore.com</a>";*/

    $('.ot__week-code--' + code + ' .js-loading').hide();
    $('.ot__week-code--' + code + ' .content').empty();
    $('.ot__week-code--' + code + ' .content').append(html);
  }

}
