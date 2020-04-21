const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3VzZGV2IiwiYSI6ImNrNmsxbTA2bDAyNWUzbG4xeDdlZDk5YWkifQ.lWP5RBkTvri2hKuN2KmfaQ&limit=1'
 
    request({ url, json: true }, (error, {body}) => {
       if(error){
          callback('Sorry... Unable to connect to the MapBox API', undefined)
       }else if(body.message){
          callback('Sorry... Token Error', undefined)
       }else if(body.features.length === 0){
          callback('Sorry... Unable to find location' === 0, undefined)
       }else{
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }

 module.exports = geocode