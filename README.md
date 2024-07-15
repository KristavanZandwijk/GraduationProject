//Setting up the environment
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



//Sources & Explanation Code
1. General set-up: https://www.youtube.com/watch?v=0cPCMIuDk2I&list=LL&index=28&t=9836s
2. JSON web token authorization: https://www.youtube.com/watch?v=K8YELRmUb5o&t=18307s
3. IFC viewer usin that open company:
    Course IFC.js: https://www.notion.so/ifcjs/Frontend-BIM-Stack-2023-2nd-edition-9a0e2594a3e84667b2b9d24130299193
    Examples & Explanation code that open company: https://docs.thatopen.com/intro
    Github page that open company: https://github.com/ThatOpen/engine_components
    
