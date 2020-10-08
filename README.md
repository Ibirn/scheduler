# Interview Scheduler

A webapp developed with learning react in mind that provides for easy scheduling of interview appointments between students and mentors at Lighthouse Labs. Clicking on an empty timeslot (denoted by the plus) allows a user to add their name and select a mentor from that day's available pool. Bookings can be done for different days and times, and can be edited or deleted.

## Setup

Install dependencies with `npm install`.

Dependencies include:

* axios: 0.20.0
* classnames: ^2.2.6
* normalize.css: ^8.0.1
* react: ^16.9.0
* react-dom: ^16.9.0
* react-hooks-testing-library: ^0.6.0
* react-scripts: 3.0.0
## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Stretch Goals:
As a stretch goal, this app was deployed online via Heroku, CircleCI, and Netlify.
It can (hopefully) be found running [here].(https://amazing-ptolemy-f81844.netlify.app/)

## Screenshots

!["Show Appointments"](https://github.com/Ibirn/scheduler/blob/master/docs/ShowAppt.png)
!["Cancel Appointments"](https://github.com/Ibirn/scheduler/blob/master/docs/CancelAppt.png)
!["Add Appointments"](https://github.com/Ibirn/scheduler/blob/master/docs/EditAppt.png)