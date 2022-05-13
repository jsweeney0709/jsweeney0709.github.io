/**
 * This file contains all of the logic for displaying SU Council Candidates from AirTable.
 */

$(document).ready(() => {
  main.get_types();

  $("#election-type").on("change", (e) => {
      main.get_roles();
  });
});

main = {
  get_types: () => {
      var get_types = airtable.get_types();

      get_types.then(types => {
          build.populate_type_choices(types);
      });
  },

  get_roles: () => {
      var selected = $("#election-type").val();

      var get_roles = airtable.get_roles(selected);

      get_roles.then(roles => {
          build.populate_role_choices(roles);
      });

  },

  get_candidates: () => {
      var selected = $("#roles").val();
      console.log(selected);
      var get_candidates = airtable.get_candidates(selected);

      get_candidates.then(candidates => {
        console.log(candidates);
          build.build_results(candidates);
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
          url: "https://api.airtable.com/v0/appkCmCPQjtx04lxa/Candidates?view=Grid%20view&filterByFormula=" + urlAppend,
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
      $('#roles').empty();
      $('#roles').editableSelect('clear');

      for(i in data.records) {
          var result = data.records[i].fields;
          $('#roles').editableSelect('add', result['Role']);
      }
    //  $('#roles').addClass("dropdown__list t__def-wh--bg-pri t__ads--pri pos__rel")
    $('#roles').addClass("select-to-input t__def-wh--bg-pri t__ads--pri pos__rel")
      $('#roles').removeClass("the-list")
      $('#roles').attr("placeholder", "Search for a role...");
      //$('#roles').attr("height", "40px");
      $('#roles').attr("padding", "20px 24px !important");
      $('#roles').attr("margin-top", "0rem !important");
      /*var fullHTML = "";
      for(i in data.records) {
          var result = data.records[i].fields;
          fullHTML += "<option value='"+ result['Role']  +"'>" + result['Role'] + "</option>";
      }



      $('#roles').editableSelect('destroy');
      $('#roles').empty();
      $('#roles').append(fullHTML);

      $('#roles').attr("placeholder", "Search for a role...");*/
      // UNCOMMENT HERE
      if (window.outerWidth < 1199) {
        $('.search-results-mobile').addClass("mgn__t--4");
      } else {
        $('.search-results').addClass("page__chapter");
      }

      $('#roles').on("select.editable-select", (e) => {
          $("#searching-placeholder").show();
          main.get_candidates();
      });

  },

  populate_type_choices: (data) => {
      var fullHTML = "";
      for(i in data.records) {
          var result = data.records[i].fields;
          fullHTML += "<option value='"+ result['Election Type']  +"'>" + result['Election Type'] + "</option>";
      }
      $('#election-type').append(fullHTML);
  },

  build_results: (data) => {
      //$('.search-results').empty();
      if (window.outerWidth < 1199) {
        $('.search-results-mobile').empty();
      } else {
        $('.search-results').empty();
        console.log("non-mobile");
      }
      $('#searching-placeholder').hide();

      if (data.records.length == 0) {
          var html = "<div class='candidate-result'><h3>There were no nominations for this position.</h3></div>";
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
          html += "<div class='candidate t__ads--pri dotted__line--small  mgn__b--2'>";
          //html += "<div class='candidate-image-name ta__c--d ta__c--t ta__c--m'><img src='" + result['Picture'][0].url + "'/>";
          //html += "<div class='candidate-image-name ta__c--d ta__c--t ta__c--m'><img src='" + result['URL'][0].url + "'/>";
          //html += "<div class='candidate-image-name ta__c--d ta__c--t ta__c--m'><img src='" + result['URL'][0] + "'/>";
          html += "<div class='candidate-image-name ta__c--d ta__c--t ta__c--m'><img class='airtable__image' src='" + result['URL']+ "'/>";
          html += "<h4 class='mgn__b--2'>" + result['Candidate Name'] + "</div></h4>";
          //html += "<div class='election-screenshot'><img src='" + result['Screenshot'][0].url + "'/>";
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

          html += "<p></p>"
           html += "</div></div>";
          fullHTML += html;
      }
      if (window.outerWidth < 1199) {
        $('.search-results-mobile').append("<div class='main-container'>" +fullHTML+ "</div>");
      } else {
        $('.search-results').append("<div class='main-container'>" +fullHTML+ "</div>");
        console.log("non-mobile");
      }

  }
}

//Script for reset
$("#reset").on("click", function () {
document.getElementById('airtable-form').reset();
$('.search-results').empty();
$('.search-results-mobile').empty();
console.log("Working");
  $('#election-type').prop('selected', function() {
      return this.defaultSelected;
  });
});