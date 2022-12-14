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


ExpressIntro Part 3:
- *Goals*: 
- Refactor the app.js movies CRUD code to use Javascript objects instead of strings
    - *Note*: Eventually we will be using databases to save the information we currently have on the server. The database we'll be using (MongoDB) saves information as Javascript objects, not strings. And so we want to convert our code to work with objects for our movie list instead of simple strings.
- Gain more experience working with route params, query params and the request body

- *Approach*:
- We'll be taking much of the functionality we implemented in class and refactoring it to use objects. Refactoring means to redo the code without altering the core functionality.
- We currently have 4 CRUD routes implemented for our server
    - POST /new-movie creates a new movie in our movie list by pushing the incoming string from the request body into the movie list array
    - GET /all-movies responds to the HTTP request with the entire movie list
    - PUT /update-movie/:titleToUpdate searches for a movie title matching the route parameter (const titleToUpdate = req.params.titleToUpdate) and updates the movie title with the incoming data from the request body (const newTitle = req.body.newTitle)
    - DELETE /delete-movie/:titleToDelete searches for a movie title matching the route parameter (const titleToDelete = req.params.titleToDelete) and deletes it from the movie list array
- The movie list is currently an array of strings: ["Star Wars", "The Avengers"]
- The first step is to redo the items in the movie list to be objects instead with the following shape/format:
    - {
        title: {String},
        starRating: {Number},
        isRecommended: {Boolean},
        createdAt: {Date},
        lastModified: {Date}
    }
    - *Note*:
        - By changing the entries in the movie array to be objects instead of strings, we can store more data per movie and still use our array methods to search through them.
        - The fields in the movie object will be generated by the user and will be sent in the request body when we POST a new movie.
- *Requirement*: Change ALL the items in the favoriteMovieList array to be objects instead of strings
    - For example, I would replace the string "Star Wars" in the array with the following object:
        - {
                title: "Star Wars",
                starRating: 5,
                isRecommended: true,
                createdAt: 2022-09-07T18:18:48.586Z,
                lastModified: 2022-09-07T18:18:48.586Z
            }
        - *Note*:
            - createdAt represents the datetime the movie object was created
            - lastModified represents the datetime last time the movie object was updated
    - Feel free to add more movies to the array if you want to work with a larger dataset
    - *Note*: The property createdAt can be generated with a new date every time the server restarts
- Now we need to update our CRUD routes to work with the new format of the items in the movies array
- *Requirement*: Refactor the POST /new-movie route
    - First, the route should get the title, starRating and isRecommended from the req.body
    - Second, the route should create a new object with the above properties along with createdAt, and lastModified which should be generated using new Date()
    - Third, the route should push the new object into the movie list array as a new movie
- *Requirement*: Refactor the PUT /update-movie/:titleToUpdate route
    - First, similar to the /new-movie route, the /update-movie/:titleToUpdate route now needs to get the new title, the new starRating and the new isRecommended values from the req.body
    - Second, the route should search the movie list array for the movie with the title matching titleToUpdate
        - *Note*: Instead of using .indexOf() which cannot search for objects, we need to use the .findIndex() method instead. .findIndex() takes in a function as its argument and the return value of that function must be true for the item you are searching for and false for any other item. In our case, we want to use a function similar to: .findIndex((movie)=>{return movie.title === titleToDelete})
        - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        - *Question*: Should createdAt and lastModified both be updated, one or the other, or neither?
    - Third, the route should overwrite the values of that particular movie object with the new values we received from the req.body
- *Requirement*: Refactor the DELETE /delete-movie/:titleToDelete route
    - This route will require minimal changes as the only line of code we need to update is the .indexOf() method to the .findIndex() method. 
- *Requirement*: Create a new route GET /single-movie/:titleToFind
    - First, the route should get the title of the movie we want to find from the route params (req.params)
    - Second, the route should search the movies array for the movie object whose title matches the one we got from the route params
    - Third, the route should respond with object of the found movie using res.json()
- By this point, all the CRUD functionality we implemented should be working again along with our new route. Test your routes with Postman to verify they are all working.
- *Stretch Goal*: Update the GET /all-movies route
    - Add functionality to the route so that an optional route parameter called minStarRating can be added to the url
    - If the minStarRating route parameter exists, then the route should only respond with movies whose star rating is equal to or greater than the minStarRating
        - For instance: 
            - If we request the follwing URL: localhost:3000/all-movies?minStarRating=3
            - And if we have the following movies in our movie list:
                - [{
                        title: "Star Wars",
                        starRating: 5,
                        isRecommended: true,
                        createdAt: 2022-09-07T18:18:48.586Z,
                        lastModified: 2022-09-07T18:18:48.586Z
                    }, {
                        title: "Twilight",
                        starRating: 2,
                        isRecommended: false,
                        createdAt: 2022-09-07T20:11:42.614Z,
                        lastModified: 2022-09-07T20:11:42.614Z
                    }, {
                        title: "The Avengers",
                        starRating: 4,
                        isRecommended: true,
                        createdAt: 2022-09-07T21:02:11.212Z,
                        lastModified: 2022-09-07T21:02:11.212Z
                    }]
            - Then the route should respond with:
                - [{
                        title: "Star Wars",
                        starRating: 5,
                        isRecommended: true,
                        createdAt: 2022-09-07T18:18:48.586Z,
                        lastModified: 2022-09-07T18:18:48.586Z
                    }, {
                        title: "The Avengers",
                        starRating: 4,
                        isRecommended: true,
                        createdAt: 2022-09-07T21:02:11.212Z,
                        lastModified: 2022-09-07T21:02:11.212Z
                    }]