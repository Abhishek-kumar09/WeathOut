const request = require('request')

const weather = (lattitude, longitude, callback) => {
    const apiUrl = `https://api.darksky.net/forecast/3651b65c6819a4b460142904270583e0/${lattitude},${longitude}?units=si&exclude=minutely,daily,flags`;
    request({ url: apiUrl, json: true }, (error, response) => {
        if (error) {
            callback('No Network Connectivity', undefined)
        } else if (response.body.error) {
            callback('Internal Error Ocurred', undefined)
        } else
            callback(undefined, {
                temperature: response.body.currently['temperature'],
                rainProbability: response.body.currently['precipProbability'] * 100,
                summary : response.body.hourly['summary']
            })
    })
}

module.exports = weather