// This code activates express.js
const express = require('express')
const bodyParser = require('body-parser')

// Initializing app and selecting port
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// My name
const myName = "Brennan Stopnik"

// Getting today's date using Date()
const todays_date = new Date()

// Variables for the movie list

let newMovie = null;
// let moviesString = favoriteMovieList.join(', ');

// Global variables for getting the first and last name through the website
let queryFirstName = null;
let queryLastName = null;



// *** All of the apps made using the different variables above

// Printing name and date to the website
app.get('/', (req, res) => {
    res.send(`My name is ${myName}. Today's date is: ${todays_date}`);
})

// Getting the first and last names
app.post('/get-user-info', (req, res) => {
    console.log("req.query", req.query);
    queryFirstName = req.query.firstName;
    queryLastName = req.query.lastName;
    res.send(`Saved user Info => Name: ${queryFirstName} ${queryLastName}.`)
})

app.get('/show-user-info', (req, res) => {
    console.log(req.query);
    res.send(`Showing user Info => Name: ${queryFirstName} ${queryLastName}.`)
})


/* 
Movie stuff for the assignments
*/

const favoriteMovieList = [{
    title: "Fight Club",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "The Big Lebowski",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "Pulp Fiction",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    title: "Old School",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}];


// Create
app.post("/new-movie", (req, res) => {
    console.log("POST to /new-movie")
    console.log(req.body)

    const newMovie = {
        title: "",
        starRating: 0,
        isRecommended: false,
        createdAt: new Date(),
        lastModified: new Date()
    }

    if (req.body.title  === undefined) {
        res.json({
            success: false,
            message: "title is a required field"
        })
        return;
    } else { 
        newMovie.title = req.body.title
    }

    if (req.body.starRating === undefined) {
        res.json({
            success: false,
            message: "starRating is a required field"
        })
        return;
    } else { 
        newMovie.starRating = req.body.starRating
    }

    if (req.body.isRecommended === undefined) {
        res.json({
            success: false,
            message: "isRecommended is a required field"
        })
        return;
    } else { 
        newMovie.isRecommended = req.body.isRecommended
    }

    favoriteMovieList.push(newMovie)

    res.json({
        success: true
    })  
})

// Read
app.get("/all-movies", (req, res) => {

    console.log("GET to /all-movies")

    res.json(favoriteMovieList)
})

app.get("/single-movie/:titleToFind", (req, res) => {
    const titleToFind = req.params.titleToFind

    const foundMovieIndex = favoriteMovieList.findIndex((movie)=>{
        if (movie.title === titleToFind) {
            return true
        } else {
            return false
        }
    })

    const foundMovie = favoriteMovieList[foundMovieIndex]

    res.json(foundMovie)

})

// Update
app.put("/update-movie/:titleUpdate", (req, res) => {
    console.log("PUT to /update-movie")
    console.log("req params", req.params)

    const titleUpdate = req.params.titleUpdate

    const originalMovieIndex = favoriteMovieList.findIndex((movie)=>{
        if (movie.title === req.params.titleUpdate) {
            return true
        } else {
            return false
        }
    })

    const originalMovie = favoriteMovieList[originalMovieIndex]

    const updatedMovie = {
        title: originalMovie.title,
        starRating: originalMovie.starRating,
        isRecommended: originalMovie.isRecommended,
        createdAt: originalMovie.createdAt,
        lastModified: new Date()
    }

    if (req.body.title !== undefined) {
        updatedMovie.title = req.body.title
    }
    if (req.body.starRating !== undefined) {
        updatedMovie.starRating = req.body.starRating
    }
    if (req.body.isRecommended !== undefined) {
        updatedMovie.isRecommended = req.body.isRecommended
    }

    console.log(titleUpdate)
    favoriteMovieList[originalMovieIndex] = updatedMovie

    res.json({
        success: true
    })

    
})

// Delete 
app.delete("/delete-movie/:titleDelete", (req, res) => {
    console.log("DELETE to /delete-movie")

    const titleDelete = req.params.titleDelete
    
    const indexOfMovie = favoriteMovieList.findIndex((movie)=>{
        if (movie.title === titleDelete) {
            return true
        } else {
            return false
        }
    })

    console.log("index of movie", indexOfMovie)

    if (indexOfMovie < 0) {
        res.json({
            hasBeenDeleted: false
        })
        return;
    }

    console.log("Before Delete ", favoriteMovieList)
    favoriteMovieList.splice(indexOfMovie, 1)
    console.log("After Delete ", favoriteMovieList)

    res.json({
        hasBeenDeleted: true
    })
})

// Our port listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})