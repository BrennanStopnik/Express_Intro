ExpressIntro Part 1:
- Create a new github repo called ExpressIntro, clone the repo to your computer and add the link to populi.
- In the ExpressIntro folder do the following:
  - Initialize the folder as an npm project via 'npm init'
		- *Note*: When you run 'npm init', you will be shown several prompts in the terminal that will help you create the package.json file. You do not need to worry about these and can press 'enter' through all the prompts.
  - Install express as a dependency via 'npm i express'
- Create a new file app.js in the folder and copy the example code from the express starter docs into it: https://expressjs.com/en/starter/hello-world.html
- Run the command node app.js
- Navigate to http://localhost:3000 to see 'Hello World' in the browser. 


ExpressIntro Assignment 1:
- *Note*: The res.send() method sends the string passed into .send() as a response to the browser. We can modify the string to send whatever phrase we want to the browser instead of the default 'Hello World'
- Modify the code in res.send() to send a string containing the following information to the browser:
	- Your name
	- Today's date
- In app.js, create a new variable favoriteMovieList that is initialized to an array containing your favorite movie
	- const favoriteMovieList = ["Star Wars", "The Avengers"];
- Create a new GET route '/list-movies' and implement the following in the route handler:
	- Calculate a new variable called moviesString that concatenates all movies in favoriteMovieList to a single string
	- Send moviesString to the browser with res.send()
	- Navigate to localhost:3000/list-movies to see your movie list


ExpressIntro Assignment Part 2:
- In app.js, create a new GET route '/add-movie' and implement the following:
	- *Approach*: We will use this route to get user generated information from the url known as the query param. Query params are entered into a url after adding a ? at the end of the url. The format for a query param is <queryParamName>=<queryParamValue>. So for the /add-movie route, to send a newMovie query param with the value Independance Day, we would enter localhost:3000/add-movie?newMovie=Independance+Day in to the browser address bar.
	- *Note*: You cannot have any spaces in a url. In order to temporarily get around this (we'll have more robust ways of dealing with this in the future), we add some symbol like '+' in the place of a space. Then when the query param is received by the server, we need to remove the '+' characters from the string before pushing it into the favoriteMovieList array.
	- Using req.query, get the title of a new movie from the request query param and add it to the favoriteMovieList array. 
- If you implemented this correctly, you should be able to visit localhost:3000/add-movie? with a new movie query param and then visit localhost:3000/list-movies to see the movie you added in the list of movies.