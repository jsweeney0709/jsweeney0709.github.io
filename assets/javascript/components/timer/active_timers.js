/**
 * This file contains all of the JSON data for timers.
 * - active_timers: Used by timer.js when the page first loads
 */

 /**
  * active_timers contains a list of timers each with a name (that must match the data-name in HTML)
  * and stages that the timer can go through. Note how the the final stage always has the expiry empty.
  */
exports.active_timers = [
  {
    name: "intro-timer",
    stages: [
      {
        stage: 1,
        name: 'Tickets available in',
        expiry: '2019-08-14 23:59:59'
      },
      {
        stage: 2,
        name: 'Intro begins in',
        expiry: '2019-09-20 23:59:59'
      },
      {
        stage: 3,
        name: 'Intro is live',
        expiry: ''
      }
    ]
  }, {
    name: "activities-timer",
    stages: [
      {
        stage: 1,
        name: 'Stage 1 test',
        expiry: '2021-09-23 11:00:00'
      },
      {
        stage: 2,
        name: 'Stage 2 test',
        expiry: '2019-07-24 13:10:00'
      },
      {
        stage: 3,
        name: 'Stage 3 test',
        expiry: ''
      }
    ]
  }, 
  {
    name: "sports-timer",
    stages: [
      {
        stage: 1,
        name: 'Stage 1 test',
        expiry: '2021-09-24 11:10:00'
      },
      {
        stage: 2,
        name: 'Stage 2 test',
        expiry: '2019-07-24 13:10:00'
      },
      {
        stage: 3,
        name: 'Stage 3 test',
        expiry: ''
      }
    ]
  }, {
    name: "council-timer-01",
    stages: [
      {
        stage: 1,
        name: 'Nominations Open',
        expiry: '2021-11-08 17:00:00'
      },
      {
        stage: 2,
        name: 'Nominations Close',
        expiry: '2021-11-10 17:00:00'
      },
      {
        stage: 3,
        name: 'Voting Begins',
        expiry: '2021-11-11 12:00:00'
      }
    ]
  }, {
    name: "council-timer-02",
    stages: [
      {
        stage: 1,
        name: 'Voting Opens',
        expiry: '2021-11-11 12:00:00'
      },
      {
        stage: 2,
        name: 'Voting Closes',
        expiry: '2021-11-12 12:00:00'
      },
      {
        stage: 3,
        name: 'Results Announced',
        expiry: '2021-11-15 20:00:00'
      }
    ]
  }, {
    name: "officers-timer-01",
    stages: [
      {
        stage: 1,
        name: 'Nominations Open',
        expiry: '2022-02-07 10:00:00'
      },
      {
        stage: 2,
        name: 'Nominations Close',
        expiry: '2022-02-18 17:00:00'
      },
      {
        stage: 3,
        name: 'Candidates Announced',
        expiry: '2022-02-28 10:00:00'
      }
    ]
  }, {
    name: "officers-timer-02",
    stages: [
      {
        stage: 1,
        name: 'Voting Opens',
        expiry: '2022-03-07 10:00:00'
      },
      {
        stage: 2,
        name: 'Voting Closes',
        expiry: '2022-03-09 17:00:00'
      },
      {
        stage: 3,
        name: 'Results Announced',
        expiry: '2022-03-10 14:00:00'
      }
    ]
  }, {
    name: "ref-timer-01",
    stages: [
      {
        stage: 1,
        name: 'Voting Closes',
        expiry: '2021-01-21 17:00:00'
      },
      {
        stage: 2,
        name: 'Results Announced',
        expiry: '2021-01-22 10:00:00'
      },
      {
        stage: 3,
        name: 'Results Announced',
        expiry: '2020-03-12 19:00:00'
      }
    ]
  } , {
    name: "welcome-timer-01",
    stages: [
      {
        stage: 1,
        name: 'Tickets Open',
        expiry: '2021-08-10 10:00:00'
      },
      {
        stage: 2,
        name: 'Tickets',
        expiry: '2021-09-18 10:00:00'
      },
      {
        stage: 3,
        name: 'Tickets Close',
        expiry: '2020-07-28 19:00:00'
      }
    ]
  } , {
    name: "pt-jobs-vol-fair-timer",
    stages: [
      {
        stage: 1,
        name: 'Fair Opens',
        expiry: '2021-10-06 10:30:00'
      },
      {
        stage: 2,
        name: 'Tickets',
        expiry: '2021-09-18 10:00:00'
      },
      {
        stage: 3,
        name: 'Tickets Close',
        expiry: '2020-07-28 19:00:00'
      }
    ]
  }
]
