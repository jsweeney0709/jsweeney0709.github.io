/**
 * This file contains all of the logic for displaying results for SU Council from AirTable.
 */

$(document).ready(() => {
    main.get_types();
    main.get_officer_types();
    main.get_officer_societies();
  
    $("#election-type--results").on("change", (e) => {
        console.log("results change");
        main.get_roles();
    });
  
    $("#officer-election-type").on("change", (e) => {
        console.log("candidates change");
      main.get_officer_roles();
  });
  $("#officer-election-societies").on("change", (e) => {
    var selected = $("#officer-election-societies").val();
    var get_officer_society_choices = airtable.get_officer_society_choices(selected);
  
    get_officer_society_choices.then(officer_society_choices => {

          build.officer_societies_results(officer_society_choices);
      });
    
    });
});
  
  main = {
    get_types: () => {
        var get_types = airtable.get_types();
  
        get_types.then(types => {
            build.populate_type_choices(types);
        });
    },
  
    get_officer_types: () => {
      var get_officer_types = airtable.get_officer_types();
  
      get_officer_types.then(officer_types => {
          build.populate_officer_type_choices(officer_types);
      });
  },

  get_officer_societies: () => {
    var get_officer_societies = airtable.get_officer_societies();

    get_officer_societies.then(officer_societies => {
        build.populate_officer_society_names(officer_societies);
    });
},
  
    get_roles: () => {
        var selected = $("#election-type--results").val();
        console.log("winners change type");
  
        var get_roles = airtable.get_roles(selected);
  
        get_roles.then(roles => {
            build.populate_role_choices(roles);
        });
  
    },
  
    get_officer_roles: () => {
      var selected = $("#officer-election-type").val();
      console.log("candidates change type");
  
      var get_officer_roles = airtable.get_officer_roles(selected);
  
      get_officer_roles.then(officer_roles => {
          build.populate_officer_role_choices(officer_roles);
      });
  
  },
  
    get_candidates: () => {
        var selected = $("#roles--results").val();
        //console.log(selected);
        var get_candidates = airtable.get_candidates(selected);
  
        get_candidates.then(candidates => {
          //console.log(candidates);
            build.build_results(candidates);
        });
    },
  
    get_officer_candidates: () => {
      var selected = $("#officer-roles").val();
      //console.log(selected);
      var get_officer_candidates = airtable.get_officer_candidates(selected);
      var get_officer_winners = airtable.get_officer_winners(selected);
  
      get_officer_candidates.then(officer_candidates => {
        //.log("Calling this numero");
          build.build_officer_results(officer_candidates);
      });
  
      get_officer_winners.then(officer_winners => {
          //console.log(candidates);
          console.log("Doing this once?");
            build.build_officer_winner_results(officer_winners);
        });
  }
  
  }
  
  airtable = {
    get_types:() => {
        $.ajaxPrefilter(function (options, originalOptions, xhr) {
            if (options.crossDomain) {
                try {
                    delete options.headers["X-CSRF-Token"]
                } catch (err) { }
            }
        });
  
        return $.ajax({
            url: "https://api.airtable.com/v0/appkCmCPQjtx04lxa/Types?view=Grid%20view&fields%5B%5D=Election+Type",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
            },
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            error: function (e) {
                alert(JSON.stringify(e));
            }
  
        });
    },
  
    get_officer_types:() => {
      $.ajaxPrefilter(function (options, originalOptions, xhr) {
          if (options.crossDomain) {
              try {
                  delete options.headers["X-CSRF-Token"]
              } catch (err) { }
          }
      });
  
      return $.ajax({
          url: "https://api.airtable.com/v0/appwuTZ5eBMfstsQN/Types?view=Grid%20view&fields%5B%5D=Election+Type",
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
          },
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          error: function (e) {
              alert(JSON.stringify(e));
          }
  
      });
  },
  get_officer_societies:() => {
    $.ajaxPrefilter(function (options, originalOptions, xhr) {
        if (options.crossDomain) {
            try {
                delete options.headers["X-CSRF-Token"]
            } catch (err) { }
        }
    });

    return $.ajax({
        url: "https://api.airtable.com/v0/appkCmCPQjtx04lxa/Societies?view=Grid%20view&fields%5B%5D=Name",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
        },
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        error: function (e) {
            alert(JSON.stringify(e));
        }

    });
},
  
    get_roles: (type) => {
        $.ajaxPrefilter(function (options, originalOptions, xhr) {
            if (options.crossDomain) {
                try {
                    delete options.headers["X-CSRF-Token"]
                } catch (err) { }
            }
        });
  
        var urlAppend = "({Election Type} = '" + type + "')";
  
        return $.ajax({
            url: "https://api.airtable.com/v0/appkCmCPQjtx04lxa/Roles?view=Grid%20view&fields%5B%5D=Role&filterByFormula=" + urlAppend,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
            },
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            error: function (e) {
                alert(JSON.stringify(e));
            }
  
        });
    },
  
    get_officer_roles: (type) => {
      $.ajaxPrefilter(function (options, originalOptions, xhr) {
          if (options.crossDomain) {
              try {
                  delete options.headers["X-CSRF-Token"]
              } catch (err) { }
          }
      });
  
      var urlAppend = "({Election Type} = '" + type + "')";
  
      return $.ajax({
          url: "https://api.airtable.com/v0/appwuTZ5eBMfstsQN/Roles?view=Grid%20view&fields%5B%5D=Role&filterByFormula=" + urlAppend,
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
          },
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          error: function (e) {
              alert(JSON.stringify(e));
          }
  
      });
  },
  
    get_candidates: (role) => {
        $.ajaxPrefilter(function (options, originalOptions, xhr) {
            if (options.crossDomain) {
                try {
                    delete options.headers["X-CSRF-Token"]
                } catch (err) { }
            }
        });
  
        var urlAppend = "({Position} = '" + encodeURIComponent(role) + "')";
  
        return $.ajax({
            url: "https://api.airtable.com/v0/appkCmCPQjtx04lxa/Winners?view=Grid%20view&filterByFormula=" + urlAppend,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
            },
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            error: function (e) {
                alert(JSON.stringify(e));
            }
  
        });
    },
  
    get_officer_candidates: (role) => {
      $.ajaxPrefilter(function (options, originalOptions, xhr) {
          if (options.crossDomain) {
              try {
                  delete options.headers["X-CSRF-Token"]
              } catch (err) { }
          }
      });
  
      var urlAppend = "({Position} = '" + encodeURIComponent(role) + "')";
  
      return $.ajax({
          url: "https://api.airtable.com/v0/appwuTZ5eBMfstsQN/Candidates?view=Grid%20view&filterByFormula=" + urlAppend,
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
          },
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          error: function (e) {
              alert(JSON.stringify(e));
          }
  
      });
  },

  get_officer_society_choices: (name) => {
    $.ajaxPrefilter(function (options, originalOptions, xhr) {
        if (options.crossDomain) {
            try {
                delete options.headers["X-CSRF-Token"]
            } catch (err) { }
        }
    });

    var urlAppend = "({Name} = '" + encodeURIComponent(name) + "')";

    return $.ajax({
        url: "https://api.airtable.com/v0/appkCmCPQjtx04lxa/Societies?view=Grid%20view&filterByFormula=" + urlAppend,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
        },
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        error: function (e) {
            alert(JSON.stringify(e));
        }

    });
},

  
  get_officer_winners: (role) => {
      $.ajaxPrefilter(function (options, originalOptions, xhr) {
          if (options.crossDomain) {
              try {
                  delete options.headers["X-CSRF-Token"]
              } catch (err) { }
          }
      });
  
      var urlAppend = "({Position} = '" + encodeURIComponent(role) + "')";
  
      return $.ajax({
          url: "https://api.airtable.com/v0/appwLwRkF9mssqTL1/Winners?view=Grid%20view&filterByFormula=" + urlAppend,
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", "Bearer " + "keyKrzjJcoeMnIAKY");
          },
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          error: function (e) {
              alert(JSON.stringify(e));
          }
  
      });
  }
  }
  
  build = {
    populate_role_choices: (data) => {
        $('#roles--results').empty();
        $('#roles--results').editableSelect('clear');
  
        for(i in data.records) {
            var result = data.records[i].fields;
            $('#roles--results').editableSelect('add', result['Role']);
        }
      //  $('#roles--results').addClass("dropdown__list t__def-wh--bg-pri t__ads--pri pos__rel")
      $('#roles--results').addClass("select-to-input t__def-wh--bg-pri t__ads--pri pos__rel")
      //console.log()
        $('#roles--results').removeClass("the-list")
        $('#roles--results').attr("placeholder", "Search for a role...");
        //$('#roles--results').attr("height", "40px");
        $('#roles--results').attr("padding", "20px 24px !important");
        $('#roles--results').attr("margin-top", "0rem !important");
        /*var fullHTML = "";
        for(i in data.records) {
            var result = data.records[i].fields;
            fullHTML += "<option value='"+ result['Role']  +"'>" + result['Role'] + "</option>";
        }
  
  
  
        $('#roles--results').editableSelect('destroy');
        $('#roles--results').empty();
        $('#roles--results').append(fullHTML);
  
        $('#roles--results').attr("placeholder", "Search for a role...");*/
          $('.results__search-results').addClass("page__chapter");
  
        $('#roles--results').on("select.editable-select", (e) => {
            $("#searching-placeholder").show();
            main.get_candidates();
        });
  
    },
  
    populate_officer_role_choices: (data) => {
      $('#officer-roles').empty();
      $('#officer-roles').editableSelect('clear');
      console.log("populating candidate roles");
  
      for(i in data.records) {
          var result = data.records[i].fields;
          $('#officer-roles').editableSelect('add', result['Role']);
      }
    //  $('#roles--results').addClass("dropdown__list t__def-wh--bg-pri t__ads--pri pos__rel")
    $('#officer-roles').addClass("select-to-input t__def-wh--bg-pri t__ads--pri pos__rel")
    //console.log()
      $('#officer-roles').removeClass("the-list")
      $('#officer-roles').attr("placeholder", "Search for a role...");
      //$('#roles--results').attr("height", "40px");
      $('#officer-roles').attr("padding", "20px 24px !important");
      $('#officer-roles').attr("margin-top", "0rem !important");
      /*var fullHTML = "";
      for(i in data.records) {
          var result = data.records[i].fields;
          fullHTML += "<option value='"+ result['Role']  +"'>" + result['Role'] + "</option>";
      }
  
  
  
      $('#roles--results').editableSelect('destroy');
      $('#roles--results').empty();
      $('#roles--results').append(fullHTML);
  
      $('#roles--results').attr("placeholder", "Search for a role...");*/
        $('.results__search-results').addClass("page__chapter");
  
      $('#officer-roles').on("select.editable-select", (e) => {
          $("#searching-placeholder").show();
          main.get_officer_candidates();
      });
  
  },
  populate_officer_society_names: (data) => {
    var fullHTML = "";
    for(i in data.records) {
        var result = data.records[i].fields;
        fullHTML += "<option value='"+ result['Name']  +"'>" + result['Name'] + "</option>";
    }
    $('#officer-election-societies').append(fullHTML);
    },
  
    populate_type_choices: (data) => {
        console.log("Populating winners");
        var fullHTML = "";
        for(i in data.records) {
            var result = data.records[i].fields;
            fullHTML += "<option value='"+ result['Election Type']  +"'>" + result['Election Type'] + "</option>";
        }
        $('#election-type--results').append(fullHTML);
        console.log("Populating winners");
    },
  
    populate_officer_type_choices: (data) => {
        console.log("Populating candidates");
      var fullHTML = "";
      for(i in data.records) {
          var result = data.records[i].fields;
          fullHTML += "<option value='"+ result['Election Type']  +"'>" + result['Election Type'] + "</option>";
      }
      $('#officer-election-type').append(fullHTML);
  },
  
    build_results: (data) => {
        $('.results__search-results').empty();
          $('.search-results').empty();
          $('.mobile-search-results').empty();
          console.log(data);
          //console.log("council non-mobile");
  
        $('#searching-placeholder').hide();
  
        if (data.records.length == 0) {
            var html = "<div class='candidate-result'><h3 class='mgn__b--2'>The successful candidate in this election has resigned. SU Council will decide whether to run a bye-election for this position.</h3></div>";
            $('.search-results').append(html);
        }
  
        var fullHTML = "";
  
        for (i in data.records) {
            var result = data.records[i].fields;
            var html = "";
            var facebook = result["Facebook"];
          var twitter = result["Twitter"];
          var instagram = result["Instagram"];
          var poster = result["Poster/Leaflet"];
          var video = result["Youtube"];
          var email = result["Email"];
          var Endorsement = result["Endorsement"];

            html += "<div class='candidate t__ads--pri dotted__line--small  mgn__b--2'>";
            //html += "<div class='candidate-image-name ta__c--d ta__c--m'><img src='" + result['Picture'][0].url + "'/>";
            html += "<div class='candidate-image-name ta__c--d ta__c--t ta__c--m'><img class='airtable__image' src='" + result['Photo'] + "'/>";
            html += "<h4 class='mgn__b--2'>" + result['Candidate Name'] + "</div></h4>";
            html += "<p class='f__b--b'>Manifesto:</p><div class='manifesto-placeholder mgn__b--2'>" + result['Manifesto'] + "</div>";
            html += "<div class='highlight__social mgn__b--1'>";
          if (facebook == null) {
              //Do Nothing
          } else {
              html+= "<a href='" + facebook + "' target='_blank' style='border-bottom: none;'><div class='highlight_social--icon' style='display: inline-block; margin-right: 1rem;'><i class='ai-facebook' style='color:#009E4B; font-size: 1.2rem;'></i></div></a>";
          }
          if (twitter == null) {
              //Do Nothing
          } else {
              html+= "<a href='" + twitter + "' target='_blank' style='border-bottom: none;'><div class='highlight_social--icon' style='display: inline-block; margin-right: 1rem;'><i class='ai-twitter' style='color:#009E4B; font-size: 1.2rem;'></i></div></a>";
          }
          if (instagram == null) {
              //Do Nothing
          } else {
              html+= "<a href='" + instagram + "' target='_blank' style='border-bottom: none;'><div class='highlight_social--icon' style='display: inline-block; margin-right: 1rem;'><i class='ai-instagram' style='color:#009E4B; font-size: 1.2rem;'></i></div></a>";
          }
          html += "</div>";

          if (email == null) {
            //Do Nothing
        } else {
            html+= "<a href='mailto:" + email + "'>" + email + "</a>";
        }

          if (poster == null) {
              //Do Nothing
          } else {
              html+= "<img class='c__b pdg__b--1' src='" + result['Poster/Leaflet'][0].url + "'/>";
          }
          if (video == null) {
              //Do Nothing
          } else {
              html+= "<div class='iframe__wrapper'><iframe class='iframe__item' frameborder='0' src='" + video + "'></iframe></div>";
          }

            html += "<div class='election-screenshot'><img src='" + result['Screenshot'][0].url + "'/>";
             //html += "</div></div>";
             //html += "</div>";
             if (Endorsement == null) {
                html += "</div>";
                } else {
                    html += "<p class='f__b--b'>Endorsements: </p><p> "+ result['Endorsement Name'] +" </p></div>";
                }
            fullHTML += html;
            console.log(fullHTML);
        }
          //$('.search-results').append("<div class='main-container'>" +fullHTML+ "</div>");
          //$('.mobile-search-results').append("<div class='main-container'>" +fullHTML+ "</div>");
          $('.results__search-results').append("<div class='main-container'>" +fullHTML+ "</div>");
  
  
    },
  
    build_officer_results: (data) => {
        $('.officer-search-results-cont').show();
        $('.swiper-button-prev').show();
        $('.swiper-button-next').show();
      //$('.search-results').empty();
      if (window.outerWidth < 1199) {
        //$('.officer-search-results-mobile').empty();
        $('.officer-search-results').empty();
      } else {
        $('.officer-search-results').empty();
        console.log("officer candidates non-mobile");
      }
      $('#searching-placeholder').hide();
  
      if (data.records.length == 0) {
          var html = "<div class='candidate-result'><h3>There were no nominations for this position.</h3></div>";
          $('.officer-search-results').append(html);
      }
  
      var fullHTML = "";
  
      for (i in data.records) {
          var result = data.records[i].fields;
          var html = "";
          var html2 = "";
          var campaignPoster = result['Campaign Poster'];
          var campaignSlogan = result['Campaign Slogan']
          var profilePic = result['Photo'];
          var video = result["Campaign video"];
          var Endorsement = result["Endorsement"];
          /*if (window.outerWidth < 1199) {
            html += "<div class='swiper-container'><div class='swiper-wrapper'>";
          }*/

            //console.log("in this one here");
            if (video == null) {
                //Do Nothing
                html += "<div class='swiper-slide g__cont'><div class='g__4--m g__8--t g__10--d g__1--o'><div class='candidate-image-name'>";
            } else {
                html+= "<div class='swiper-slide g__cont'><div class='g__10--d g__4--m g__8--t g__1--o'><div class='candidate-image-name'><div class='mgn__b--1'><div class='iframe__wrapper'><iframe class='iframe__item' frameborder='0' src='" + video + "'></iframe></div></div>";
            }
              if (profilePic == null) {
                  html += "<div class=''><div class='g__6--d g__8--t g__4--m'><div class='candidate-image-name'>";
                  //Do Nothing
              } else {
                  html += "<img class='airtable__image' src='" + result['Photo'][0].url + "'/>";
              }
              html += "<h4 class='t__none'>" + result['Candidate Name'] + "</h4>";
              if (campaignSlogan == null) {
                  html += "</div></div>";
                  //Do Nothing
              } else {
                  html += "<p class='mgn__b--2 f__b--b'>" + result['Campaign Slogan'] + "</p></div></div>";
              }
              
              html += "<div class='g__12--d g__4--m g__8--t g__0--o'><p class='f__b--b'>Manifesto:</p><div class='manifesto-placeholder mgn__b--2'>" + result['Manifesto'] + "</div>";
              
      
              if (campaignPoster == null) {
              //Do Nothing
                html += "<div class='election-poster'>"
              } else {
                  html += "<div class='election-poster'><p class='f__b--b'>Campaign Poster</p><img class='campaign__poster' src='" + result['Campaign Poster'][0].url + "' />";
              }
              if (Endorsement == null) {
                html += "</div></div>";
                } else {
                    html += "</div><p class='f__b--b'>Endorsements: </p><p> "+ result['Endorsement Name'] +" </p></div>";
                }
      
              
              html += "<div class='g__12--d g__4--m g__8--t'><div class='t__def-bl--pri dotted__line--large mgn__t--4 mgn__b--4'>&nbsp;</div></div></div>";
              /*if (window.outerWidth < 1199) {
                html += "</div></div>";
              }*/
      
              fullHTML += html;
        }
          
      $('.officer-search-results').append(fullHTML);
      /*if (window.outerWidth < 1199) {
        $('.officer-search-results-mobile').append("<div class='main-container'><div class='swiper-container-mob'><div class='swiper-wrapper'>" +fullHTML+ "</div><div class='swiper-pagination-mob'></div><div class='swiper-button-prev-mob'></div><div class='swiper-button-next-mob'></div><div class='swiper-scrollbar-mob'></div></div></div>");
      } else {
        $('.officer-search-results').append(fullHTML);
       /*$('.officer-search-results-name').append("<div class='main-container'>" +html+ "</div>");
        $('.officer-search-results-manifesto').append("<div class='main-container'>" +html2+ "</div>");*/
     /* }*/
  
  },

  officer_societies_results: (data) => {
    //$('.officer-search-results-cont').show();
      //console.log(data + 'testing');
    //$('.search-results').empty();
    if (window.outerWidth < 1199) {
      //$('.officer-search-results-mobile').empty();
      $('.search-results').empty();
      $('.mobile-search-results').empty();
    } else {
      $('.search-results').empty();
      $('.mobile-search-results').empty();
      //console.log("officer candidates non-mobile");
    }
    $('#searching-placeholder').hide();

    if (data.records.length == 0) {
        var html = "<div class='candidate-result mgn__b--1'><h3>This society isn't endorsing anobody in this election</h3></div>";
        $('.search-results').append(html);
        $('.mobile-search-results').append(html);
    }

    var fullHTML = "";

    for (i in data.records) {
        var result = data.records[i].fields;
        var html = "";
            
        html += "<div class='g__cont'><div class='g__6--d g__4--m g__8--t g__3--o'><h3 class='f__b--b'>"+ result['Name'] +":</h3><p>" + result['Endorsee Names'] + "</p></div></div>";
        for (i in result['Endorsee Names']) {
            var endoreseResult = result['Endorsee Names'][i];
            //console.log(endoreseResult);
        }

        fullHTML += html;
    }
    $('.search-results').append(fullHTML);
    $('.mobile-search-results').append(fullHTML);
},
  
  build_officer_winner_results: (data) => {
      if (window.outerWidth < 1199) {
        $('.officer__winners--search-results').empty();
      } else {
        $('.officer__winners--search-results').empty();
        console.log("non-mobile");
      }
      $('#searching-placeholder').hide();
  
      if (data.records.length == 0) {
          var html = "<div class='candidate-result'><h3>There were no nominations for this position.</h3></div>";
          $('.officer__winners--search-results').append(html);
      }
  
      var fullHTML = "";
  
      for (i in data.records) {
          var result = data.records[i].fields;
          var html = "";
          var html2 = "";
          var campaignPoster = result['Campaign Poster'];
          var campaignSlogan = result['Campaign Slogan']
          var profilePic = result['Photo'];
          var video = result["Campaign video"];
          var Endorsement = result["Endorsement"];

          var profilePic = result['URL'];
          console.log(result['Screenshot'][0].url);
  
          if (video == null) {
            //Do Nothing
            html += "<div class='swiper-slide g__cont'><div class='g__4--m g__8--t g__10--d g__1--o'><div class='candidate-image-name'>";
        } else {
            html+= "<div class='swiper-slide g__cont'><div class='g__10--d g__4--m g__8--t g__1--o'><div class='candidate-image-name'><div class='mgn__b--1'><div class='iframe__wrapper'><iframe class='iframe__item' frameborder='0' src='" + video + "'></iframe></div></div>";
        }
          if (profilePic == null) {
              html += "<div class=''><div class='g__6--d g__8--t g__4--m'><div class='candidate-image-name'>";
              //Do Nothing
          } else {
              html += "<img class='airtable__image' src='" + result['Photo'][0].url + "'/>";
          }
          html += "<h4 class='t__none'>" + result['Candidate Name'] + "</h4>";
          if (campaignSlogan == null) {
              html += "</div></div>";
              //Do Nothing
          } else {
              html += "<p class='mgn__b--2 f__b--b'>" + result['Campaign Slogan'] + "</p></div></div>";
          }
          
          html += "<div class='g__12--d g__4--m g__8--t g__0--o'><p class='f__b--b'>Manifesto:</p><div class='manifesto-placeholder mgn__b--2'>" + result['Manifesto'] + "</div>";
          
  
          if (campaignPoster == null) {
          //Do Nothing
          } else {
              html += "<div class='election-poster'><p class='f__b--b'>Campaign Poster</p><img class='campaign__poster' src='" + result['Campaign Poster'][0].url + "' /><div class='election-screenshot'><img src='" + result['Screenshot'][0].url + "'/>";
          }
          if (Endorsement == null) {
            html += "</div></div>";
            } else {
                html += "</div><p class='f__b--b'>Endorsements: </p><p> "+ result['Endorsement Name'] +" </p></div>";
            }
  
          
          html += "<div class='g__12--d g__4--m g__8--t'><div class='t__def-bl--pri dotted__line--large mgn__t--4 mgn__b--4'>&nbsp;</div></div></div>";
  
          fullHTML += html;
      }
      if (window.outerWidth < 1199) {
        $('.officer__winners--search-results').append("<div class='main-container'>" +fullHTML+ "</div>");
      } else {
        $('.officer__winners--search-results').append(fullHTML);
        console.log("is it doing this one?");

        console.log("non-mobile");
      }
  
  }
  }
  
  //Script for reset
  $("#reset").on("click", function () {
  document.getElementById('airtable-form').reset();
  $('.results__search-results').empty();
  $('.search-results').empty();
  $('.mobile-search-results').empty();
  $('.officer-search-results').empty();
  $('.officer-search-results-cont').hide();
  $('.swiper-button-prev').hide();
  $('.swiper-button-next').hide();
  $('.officer-search-results-mobile').empty();
  $('.officer__winners--search-results').empty();
  //console.log("Working");
    $('#election-type--results').prop('selected', function() {
        return this.defaultSelected;
    });
    $('#officer-election-type').prop('selected', function() {
      return this.defaultSelected;
  });
  });
  