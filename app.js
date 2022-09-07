// This code activates express.js
const express = require('express')

// This makes it into the app variable below.
const app = express()

// Picking a port to operate through
const port = 3000

// My name
const myName = "Brennan Stopnik"

// Getting today's date using Date()
const todays_date = new Date()

// Variables for the movie list
let favoriteMovieList = ['Fight Club', 'The Big Lebowski', 'Pulp Fiction', 'Old School'];
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
app.get('/get-user-info', (req, res) => {
    console.log("req.query", req.query);
    queryFirstName = req.query.firstName;
    queryLastName = req.query.lastName;
    res.send(`Saved user Info => Name: ${queryFirstName} ${queryLastName}.`)
})

app.get('/show-user-info', (req, res) => {
    console.log(req.query);
    res.send(`Showing user Info => Name: ${queryFirstName} ${queryLastName}.`)
})

// Sending the concatenated movie list 
app.get('/list-movies', (req, res) => {
    let moviesString = favoriteMovieList.join(', ');
    res.send(`Here is my movies string: ${moviesString}.`);
})

app.get('/add-movie', (req, res) => {
    newMovie = req.query.movie;
    favoriteMovieList.push(newMovie);
    res.send(`${newMovie}`)
})

// Our port listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})