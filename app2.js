const express = require('express');
const bodyParser = require('body-parser')

const app = express()
const port = 3001

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const dogList = [{
    breed: "Pit Bull",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    breed: "German Shepard",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    breed: "Rhodisian Ridgeback",
    starRating: 5,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    breed: "Labrador",
    starRating: 4,
    isRecommended: true,
    createdAt: new Date(),
    lastModified: new Date()
}, {
    breed: "Chihuahua",
    starRating: 2,
    isRecommended: false,
    createdAt: new Date(),
    lastModified: new Date()
}]


app.get("/all-breeds", (req, res) => {
    res.json(dogList)
})

app.post("/new-dog", (req, res) => {
    const newDog = {
        breed: "",
        starRating: 0,
        isRecommended: false,
        createdAt: new Date(),
        lastModified: new Date()
    }

    const breed = req.body.breed
    const starRating = req.body.starRating
    const isRecommended = req.body.isRecommended

    if (breed === undefined) {
        res.json({
            success: false,
            message: "Breed is a required field"
        })
        return
    } else {
        newDog.breed = breed
    }

    if (starRating === undefined) {
        res.json({
            success: false,
            message: "Star Rating is a required field"
        })
        return
    } else {
        newDog.starRating = starRating
    }

    if (isRecommended === undefined) {
        res.json({
            success: false,
            message: "Is Recommended is a required field"
        })
        return
    } else {
        newDog.isRecommended = isRecommended
    }

    dogList.push(newDog)

    res.json({
        success: true
    })
})

app.put("/update-dog/:breedUpdate", (req, res) => {
    
})












// Our port listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})