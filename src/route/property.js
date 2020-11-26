'use strict'

const router = require('express').Router()
const {
  addProperty,
  propertyDetails,
  propertyList,
  updatePropertyDetail,
  getViewedPropertyList
} = require('../controller/property')
const { uploadFiles } = require('../middleware/upload')

router.post('/v1/add', uploadFiles.array('propertyImage', 5), addProperty)
router.get('/v1/:id/details', propertyDetails)
router.get('/v1/list', propertyList)
router.put('/v1/update', updatePropertyDetail)
router.get('/v1/viewed', getViewedPropertyList)

module.exports = router
