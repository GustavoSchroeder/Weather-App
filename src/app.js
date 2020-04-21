const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public/'))

const app = express()

//Define Paths for Express Config
const publcDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to Server
app.use(express.static(publcDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Gustavo'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide search term'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        adress: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Gustavo Schroder',
    image: 'img/me.jpg'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help me, Im Stuck!',
    title: 'help',
    name: 'Gustavo Schroeder'
  })
})

app.get('/help/*', (req, res) => {
  res.render('help', {
    message: 'Article not found!',
    title: '404 PAGE NOT FOUND',
    name: 'Gustavo Schroeder'
  })
})

//Mark anything that haven't being mached by now
app.get('*', (req, res) => {
  res.render('help', {
    message: 'Page not found!',
    title: '404 PAGE NOT FOUND',
    name: 'Gustavo Schroeder'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})