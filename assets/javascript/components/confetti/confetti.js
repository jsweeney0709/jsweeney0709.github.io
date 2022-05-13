/**
* This file contains JS for confetti rain on results page for elections
*/

exports.init = function() {
  //console.log("Running outside!");
  $('.confetti__wrapper').each(function(){
    for (var i = 0; i < 250; i++) {
      create(i);
    }
  });
}
// Set max width for tablet
var mobTab = window.matchMedia("(max-width: 1190px)")

// Called on page load
// Creates 60 confetti for mobile/tablet
// 250 for desktop
$(document).ready(() => { // i < 250
  if (mobTab.matches) {
    for (var i = 0; i < 60; i++) {
      create(i);
    }
  } else {
    for (var i = 0; i < 250; i++) {
      create(i);
    }
  }
    
});
// Variable to count number of times confetti drops
var i = 0;
// Create confetti
function create(i) {
  var width = Math.random() * 8;
  var height = width * 0.4;
  var colourIdx = Math.ceil(Math.random() * 3);
  var colour = "red";
  switch(colourIdx) {
    case 1:
      colour = "yellow";
      break;
    case 2:
      colour = "blue";
      break;
    default:
      colour = "red";
  }
  $('<div class="confetti-'+i+' '+colour+'"></div>').css({
    "width" : width+"px",
    "height" : height+"px",
    "top" : -Math.random()*20+"%",
    "left" : Math.random()*100+"%",
    "opacity" : Math.random()+0.5,
    "transform" : "rotate("+Math.random()*360+"deg)"
  }).appendTo('.confetti__wrapper');  
  
    //drop(i);
  //setInterval(drop(i), 30000);  
  //requestAnimationFrame(drop());
  window.requestAnimationFrame(function () {
    drop(i);
  });
}
// Drops the confetti down the wrapper
function drop(x) {
  $('.confetti-'+x).animate({
    top: "100%",
    left: "+="+Math.random()*15+"%"
  }, Math.random()*3000 + 3000, function() {
    // Math.random()*3000 + 3000, function()
    reset(x);
    //setInterval(reset(x), 30000); 
    //window.requestAnimationFrame(drop);   
  });
}
// Removes the confetti from the bottom of the 
// container so it can fall again from the top
function reset(x) {
  // Increment loop count variable
  i++;
  // If screen size smaller than desktop
  if (mobTab.matches) {
    // Check if 120 pieces of confetti have been reset (3 drops)
    if (i <= 120) {
      //If NOT, reset and drop agin
      $('.confetti-'+x).animate({
        "top" : -Math.random()*20+"%",
        "left" : "-="+Math.random()*15+"%"
      }, 0, function() {
        //drop(x);    
        //setInterval(drop(x), 30000);   
        //window.requestAnimationFrame(drop(x));    
        window.requestAnimationFrame(function () {
          drop(x);
        });  
      });
      console.log(i);
    } else {
      // If it HAS, remove confetti and stop
      console.log("Done!");
      $('.confetti-'+x).remove();
    }
  } else {
    // Else if screensize desktop, check if 500 pieces have been reset (3 drops)
  if (i <= 500) {
    // If NOT, reset and drop again
    $('.confetti-'+x).animate({
      "top" : -Math.random()*20+"%",
      "left" : "-="+Math.random()*15+"%"
    }, 0, function() {
      //drop(x);    
      //setInterval(drop(x), 30000);   
      //window.requestAnimationFrame(drop(x));    
      window.requestAnimationFrame(function () {
        drop(x);
      });  
    });
    console.log(i);
  } else {
    // If has, remove confetti and stop
    console.log("Done!");
    $('.confetti-'+x).remove();
  }
}
}