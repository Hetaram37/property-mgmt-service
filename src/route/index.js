'use strict'

const propertyRoute = require('./property')
const areaRoute = require('./area')
const cors = require('cors')

module.exports = (app) => {
  app.use('/api/property', cors(), propertyRoute)
  app.use('/api/area', cors(), areaRoute)
}
