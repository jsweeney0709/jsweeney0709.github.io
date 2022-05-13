// Import the SASS to be compiled into its own file.
require('../sass/main.sass');

// Import the Global stuff to be included.
var global__third_party = require('./global/third_party.js');
var global__navigation = require('./global/navigation.js');
var global__transparent_header = require('./global/transparent_header.js');
var global__anchor_scrolling = require('./global/anchor_scrolling.js');
var global__page_theme = require('./global/page_theme.js');
var global__opening_times = require('./global/opening_times.js');
var global__facts = require('random-facts');
var global__close_advert = require('./global/close_advert.js');

// Import the Components to be included.
var component__category_selector = require('./components/selectors/category.js');
var component__image_slider = require('./components/sliders/image_slider.js');
var component__campaign_slider = require('./components/sliders/campaign_slider.js');
var component__image_dropdown = require('./components/dropdown/toggle.js');
var component__accordion = require('./components/accordion/accordion.js');
var component__timer = require('./components/timer/timer.js');
var component__image_collage = require('./components/images/collage.js');
var component__popup = require('./components/popup/popup.js');
var component__mpu = require('./components/mpu/mpu.js');
var component__airtable = require('./components/airtable/candidates-announced.js');
var component__airtable_results = require('./components/airtable/council-results.js');
var component__airtable_officers = require('./components/airtable/officers-objectives.js');
var component__confetti = require('./components/confetti/confetti.js');

// Import the Page Logic to be included.
var pages__article = require('./pages/article.js');

// Import the 3rd Party JS files to be included
//var vendor__snowstorm = require('./vendor/snowstorm.js');


$(document).ready(function () {

  /**
   * Global Javascript
   */

  // Third Party Initialisation
  global__third_party.init();

  // Navigation Opener
  global__navigation.init();

  // Transparency Handler
  global__transparent_header.init();

  // Anchor Scrolling
  global__anchor_scrolling.init();

  // Page Theme
  global__page_theme.init();

  // Close Advert
  global__close_advert.init();

  /**
   * Component JavaScript
   */

  // Category Selector
  component__category_selector.init();

  // Image Slider
  component__image_slider.init();

  // Campaign Slider
  component__campaign_slider.init();

  // Dropdown
  component__image_dropdown.init();

  // Accordion
  component__accordion.init();

  // Popup
  component__popup.init();

  // Mpu
  component__mpu.init();

  // Timers
  component__timer.init();

  // Image Collage
  component__image_collage.init();

  // Results confetti
  component__confetti.init();

  // Candidates Announced airtable
  //component__airtable.init();

  /**
   * Page Related JavaScript
   */
  // Article Page
  pages__article.init();

  // Snowstorm
  //component__airtable_officers.init();

});

module.exports = {
  ot_main: global__opening_times,
  fact: global__facts
}
