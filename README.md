1.	Installation necessary software:
    a.	Visual studio code
        i.	Including the extensons: github, live server
    b.	MongoDB 
        i.	Create an account
        ii.	Create a new project
        iii.	In that project, create a cluster.
    c.	Node.js
    d.	npx
  	
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
