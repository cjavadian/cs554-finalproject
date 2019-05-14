# Course Review System

**CS554 Web Programming Group Course Project - Group 3**

## Program Structure

### Client folder ###
1. React app

### Server folder ###
1. Server Side JavaScript
2. GraphQL
3. MongoDB operations
4. Redis

## Set up 
1. Open terminal/cmdprompt
2. Go to the folder where you want to get the project
3. Clone repository https://github.com/cjavadian/cs554-finalproject.git
4. Enter command 'npm install' in both client and server folder
5. Copy client's .env file into the client/ folder and server's .env file to the server/ folder.
6. Set up both MongoDB and Redis Servers
7. Go to server/data folder and enter command 'node seed.js' **Initialize courses collection**
8. Go to server folder using command 'npm start'
- GraphQL port 7050 
- Socket.io runs on port 4001
- Redis port 6379
9. Go to client folder using command 'npm start'
10. Redirect to React app working 'http://localhost:3000' 
11. Enjoy!

#Notes:
The chat page have list the users who are online. When a new user login, it will take few minutes(less than 3min) that the others see the new user on their page.

# Technologies used

**Front End**

1. Javascript
2. React
3. Apollo
4. Bootstrap
5. Axios

**Back End**
1. NodeJS
2. GraphQL
3. Express
4. MongoDB
5. Firebase Authentication
6. Redis

**Independent Technologies**
1. Socket.io
2. AWS S3

# Special Thanks to
- W3 Schools
- Stack Overflow
- Prof. Patrick Hill

# Presenters
Catherine Javadian, Rozy Gupta, Vidya Maiya, Xiaojie Gao, Xinzhe Li


# Team Member Contribution

Catherine Javadian:

1. Chat room page (Socket.io - front end and back end, design)
2. Bootstrap4 with react on the home page, course, and course details page
3. Edit profile page (Apollo Client and GraphQL)
4. Accessibility testing with tota11y and testing
5. Improving the design throughout all pages
6. Add to seed.js to populate database
7. Presentation

Rozy Gupta & Vidya Maiya: We worked together almost the entire time. So our contribution is combined. 

1. Developed the entire frontend in React from scratch.
2. Configured all the routes and assembeled them to have a smooth navigation.
3. Worked on Bootstrap4 with react.
4. Implemented Firebase Authentication.
5. Implemented AWS S3 file upload.
6. Implemented Image upload for user profile picture.
7. Worked on improving the css for few portions.
8. Added initial graphql queries for edit and delete comment.
9. Implemented Course Search for allowing the users to search a particular course.
10. Fixed the issues whenever they originated with respect to our part.


Xiaojie Gao:

1. Backend GraphQL API, Three MongoDB API and adjust database collections fields. 
2. Frontend Apollo API, Course Search, Course Detail Display, Edit Comment, Adjust Course comment and add comment features and display. 
3. Few pages display issues such as non-used Links or unnecessary Footer etc.
4. Add seed.js initializing courses collection.
5. Implement display online user list on Chat Room, including both backend and frontend.
6. Change course comment feature that user only can see the Edit/Delete button on his own comments.


Xinzhe Li: 
1. Backend Express-Graphql server set up 
2. Backend MongoDB server set up
3. Implemented MongoDB operations for user, course, review collections
4. Backend GraphQL API for User Sign Up in backend server
5. Frontend apollo for User Sign Up, User Login Checking, User Information Display, Course Reviews Display, Course Review Add Like, Course Review Add Dislike, Add Comment features

