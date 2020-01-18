const express = require('express');
const path = require('path')
const hbs = require('hbs')
const weather = require('./utils/weather')
const geoCoding = require('./utils/geoCoding')

const app = express()
const port = process.env.PORT || 3000

//app used default path
app.use(express.static(path.join(__dirname, '../public')))

// PathDefinitions
viewsPath = path.join(__dirname, '../templates/views')
partialPath = path.join(__dirname, '../templates/partials')

// Setting Applications
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
    res.render('index', { title: 'GET WEATHER' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'HOW TO USE' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'ABOUT ME ' })
})

app.get('/getWeather', (req, res) => {
    const place = req.query.adress
    if (!place) {
        res.send({ error: "No adress Given ! Please provide the City,place or Adress" })
    }
    else
        geoCoding(place, (error, locationData = {}) => {
            if (error) {
                return res.send({ error: error })
            }
            else if (locationData.error)
                return res.send({ error: 'Error getting GeoLocation' })
            else {
                weather(locationData['lattitude'], locationData['longitude'], async (error, weatherData) => {
                    if (error)
                        return res.send({ error: error })
                    else {
                        res.send({ 'locationData': locationData, 'weatherData': weatherData })
                    }
                })
            }
        })

})

app.listen(port, () => {
    console.log("Server Started at port" + port)
})