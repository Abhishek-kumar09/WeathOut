const request = require('request')

const geoCode = (place, callback) => {
    const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoiYWJoaW1haXQxOTA5IiwiYSI6ImNrNWJidDh4dTE2NWgzam11MnAybWQ5YzkifQ.0f5twJb8nOsT1bInp7tV6Q&limit=1`
    request({ url: geoCodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to Connect!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to get the Locatoin', undefined)
        } else {
            data = {
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            }
            callback(undefined, data)
        }
    })

}

module.exports = geoCode