const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/998134c2c496298e1205ac043016acce/' + latitude + ',' + longitude +'?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
           callback('Sorry... Unable to connect to the DarkSky Weather API', undefined)
        } else if(body.error){
           callback('Sorry... Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' out. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
     })
}

module.exports = forecast