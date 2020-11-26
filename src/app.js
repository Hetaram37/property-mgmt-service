'use strict'

const express = require('express')
const app = express()
const config = require('config')

const dbUtil = require('./lib/db')(config.database)
dbUtil.connect()
global.db = dbUtil

app.use('/property', express.static('./ROOT/property_Image/101'))
// app.use(express.static(__dirname + this.path.j'public'))

require('./middleware')(app)
require('./route')(app)

global.device = []
global.connection = []

module.exports = app
