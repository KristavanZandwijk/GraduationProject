//Demonstration Video
A demonstration of the UI can be found on:
* https://www.youtube.com/watch?v=6d6nkbIOrmE&t=44s

//Report
* https://research.tue.nl/nl/studentTheses/seamless-and-trustworthy-information-exchange-in-the-architecture


//Setting up the environment
1.	Installation necessary software:
    a.	Visual studio code (https://code.visualstudio.com/download)
        i.	Including the extensons: github, live server
    b.	MongoDB (https://www.mongodb.com/)
        i.	Create an account
        ii.	Create a new project
        iii.	In that project, create a cluster.
    c.	Node.js (https://nodejs.org/en/download/)
    d.	npx (https://www.npmjs.com/package/npx)
  	
2.	Getting the code from github
    a.	Make a pull request from github using the repository URL

   
3. Adding the missing files
    a.	.env file on the server side. 
        i.	Make a .env file in the server folder. This file should include the mongoURL, the JWT secret string, the port the server is running on, and a mapbox_key. 
    b.	The necessary node_modules need to be installed. These are:
        i.	For the client side:
            1.	npm install
            2.	npm install axios
        ii.	For the server side:
            1.	npm install
   
4.	Starting the app
    a.	Client side
        i.	npm run start
    b.	Server side
        i.	npm run dev



//Sources & Explanation Code
1. General set-up: 
    a. Youtube tutorial: https://www.youtube.com/watch?v=0cPCMIuDk2I&list=LL&index=28&t=9836s
    b. Github page: https://github.com/ed-roh/fullstack-admin
2. JSON web token authorization: 
    a. Youtube tutorial: https://www.youtube.com/watch?v=K8YELRmUb5o&t=18307s
    b. Github page: https://github.com/ed-roh/mern-social-media
3. IFC viewer usin that open company:
    a. Course IFC.js: https://www.notion.so/ifcjs/Frontend-BIM-Stack-2023-2nd-edition-9a0e2594a3e84667b2b9d24130299193
    b. Examples & Explanation code that open company: https://docs.thatopen.com/intro
    c. Github page that open company: https://github.com/ThatOpen/engine_components
4. IFC to RDF converter:
    a. Original converter: https://github.com/pipauwel/IFCtoRDF
    b. Example of desktop UI: https://github.com/jyrkioraskari/IFCtoRDF-Desktop
    c. Elaboration code Pieter Pauwels: https://github.com/jyrkioraskari/IFCtoLBD


Other links to packages I used:
1. Material UI: https://mui.com/material-ui/getting-s...
2. Redux Toolkit: https://redux-toolkit.js.org/introduc...
3. React Router: https://reactrouter.com/en/v6.3.0/get...
4. Redux Persist: https://github.com/rt2zz/redux-persist
5. React Dropzone: https://react-dropzone.js.org/
6. Node: https://nodejs.org/en/download/
7. Nodemon: https://github.com/remy/nodemon
8. NPX: https://www.npmjs.com/package/npx
9. VsCode: https://code.visualstudio.com/download
10. Dotenv: https://github.com/motdotla/dotenv
11. MongoDB: https://www.mongodb.com/
12. Mongoose: https://github.com/Automattic/mongoose
13. JsonWebToken: https://github.com/auth0/node-jsonweb...
14. Multer: https://github.com/expressjs/multer
    
