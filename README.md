>Problem

Create a grocery list web-application that can be shared in real-time by multiple people.

>My Solution

**My solution to the problem is**

Front-end-framework: React
Back-end: Nodejs
Server-side-framework: Express.js
Database: Postgres
ORM: Sequelize
Authentication: Passport
Web-host: Heroku

**Overview**

I decided to user React for my front end framework, due to wanting to stay with the PERN stack I was taught while learning web development at Bloc.

I chose to use Nodejs, Express.js and Postgres to handle the server side functionality, for it's simplicity and my familularity with its use.

To keep the user up to date with changes to the datebase, I set an interval on the Landing and GroceryList components that sends a request to the server. It simply queues the database every fifteen seconds and sets the state of the components to the values returned.

Passport allows multiple devices to be signed into one user profile which made programming this funtionality relitively easy.

Creation of grocery lists and grocery items are simple CRUD commands that all have validations to make sure all values are valid. I have added error messages to the front-end to allow users the ability to see what values they may have inputed incorrectly or possible errors that may occur on the server-side.

**Trade-offs**

My largest trade-off was deciding on how I wanted to handle data and user sessions. I fluctuated between using Firebase for it's ability to update users when data has changed inside the database and Postgres. I decided to use Postgres, one of my current websites is already using it and I wanted to get some more practice using Postgres, Passport and React together before I continue developing it.

**App Short Comings and Issues**

The largest problem with my application is testing, due to my lack of knowledge of testing a React based SPA I was unable to write a proper testing library. I did not have enough time to create the app and learn the complex testing frameworks needed to test the front-end and back-end correctly. This lengthened my creation time due to having to manually test all refactoring and new functionality added to my application.

Another issue my grocery list application suffers from is CSS, overall styling and flexibility are lacking and are definitely something I will need to spend more time working on.

Other small tasks do need to be handled, such as, more thorough validations and authorizations, refactoring to reduce the amount of code and make it more consistent throughout the program.

