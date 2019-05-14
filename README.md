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
8. Go to the redis installation folder and launch redis-cli tool
-  Run the following command : SMEMBERS userNames
9. Go to server folder using command 'npm start'
- GraphQL port 7050 
- Socket.io runs on port 4001
- Redis port 6379
10. Go to client folder using command 'npm start'
11. Redirect to React app working 'http://localhost:3000' 
12. Enjoy!

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

#SETUP





# Team Member Contribution

Catherine Javadian:

Rozy Gupta & Vidya Maiya: We worked together almost the entire time. So our contribution is combined. 

1) Developed the entire frontend in React from scratch.
2) Configured all the routes and assembeled them to have a smooth navigation.
3) Worked on Bootstrap4 with react.
4) Implemented Firebase Authentication.
5) Implemented AWS S3 file upload.
6) Implemented Image upload for user profile picture.
7) Worked on improving the css for few portions.
8) Added initial graphql queries for edit and delete comment.
9) Implemented Course Search for allowing the users to search a particular course.
10) Fixed the issues whenever they originated with respect to our part.


Xiaojie Gao:

Xinzhe Li: 
1. Backend Express-Graphql server set up 
2. MongoDB operations for user, course, review collection
3. Frontend apollo (sign up, login checking, user information display, review related)

