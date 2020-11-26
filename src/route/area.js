'use strict'

const router = require('express').Router()
const {
  getArea
} = require('../controller/area')

router.get('/v1/list', getArea)

module.exports = router
