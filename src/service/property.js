'use strict'

const {
  saveProperty,
  findProperty,
  findPropertyWithPagination,
  updatePropertyDetail
} = require('../repository/property')
const {
  config,
  errorGenerator
} = require('../lib/utils')
const SERVICE_CON = 'PMS_P_S_'
const httpStatusCodes = require('http-status-codes')

const addNewProperty = async (req) => {
  console.debug('addNewProperty()')
  const propertyImages = await getImages(req.files)
  const propertyDetails = await saveProperty(inputForProperty(req.body, propertyImages))
  return propertyDetails
}

async function getImages (files) {
  const propertyImages = []
  console.debug('Property images length: ', files.length)
  await Promise.all(files.map(file => {
    propertyImages.push(file.filename)
  }))
  console.debug('Property images: ', propertyImages)
  return propertyImages
}

function inputForProperty (body, propertyImages) {
  const property = {}
  property.name = body.name
  property.description = body.description
  property.address = body.address
  property.area = body.area
  property.images = propertyImages
  property.price = body.price
  property.bedrooms = body.bedrooms
  property.bathrooms = body.bath
  property.carpet_area = {}
  property.carpet_area.ft = body.carpetFT
  property.carpet_area.yd = body.carpetYD
  property.carpet_area.mt = body.carpetMT
  console.debug('Input body for property: %j', property)
  return property
}

const propertyDetail = async (id) => {
  console.debug('propertyDetail() id: ', id)
  const details = await findProperty(queryForPropertyDetails(id), {})
  if (details && Array.isArray(details) && details.length > 0) {
    details[0].image_urls = await getImageFinalPath(details[0].images)
    return details
  }
  throw errorGenerator('No property details found with given id.', SERVICE_CON + httpStatusCodes.NO_CONTENT,
    'No data found', null)
}

async function getImageFinalPath (images) {
  const urls = []
  console.debug('getImageFinalPath() images: %j', images)
  await Promise.all(images.map(img => {
    urls.push(`${config.image.protocol}://${config.image.host}:${config.port}/property/${img}`)
  }))
  console.debug('getImageFinalPath() images with path: %j', urls)
  return urls
}

function queryForPropertyDetails (id) {
  const query = {}
  query._id = id
  query.is_deleted = false
  console.debug('queryForPropertyDetails() query: %j', query)
  return query
}

async function getPropertyListWithPagination (query) {
  console.debug('getPropertyListWithPagination() query: %j', query)
  const details = await findPropertyWithPagination(
    queryForPropertyList(query),
    paginateProperty(query.page))
  if (details && details.docs && Array.isArray(details.docs) && details.docs.length > 0) {
    details.docs = await getImageURL(details.docs)
  }
  console.debug('getPropertyListWithPagination() details: %j', details)
  return details
}

async function getImageURL (details) {
  console.debug('getImageURL() details: %j', details)
  await Promise.all(details.map(async property => {
    property.image_url = await getImageFinalPath(property.images)
  }))
  console.debug('getImageURL() details: %j', details)
  return details
}

function queryForPropertyList (filter) {
  console.debug('queryForPropertyList() filter: %j', filter)
  const query = {}
  if (filter.area) {
    query.area = {}
    query.area.$in = filter.area
  }
  if (filter.price) {
    query.price = {}
    query.price.$gte = Number(filter.price[0])
    query.price.$lte = Number(filter.price[1])
  }
  if (filter.bedrooms) {
    query.bedrooms = filter.bedrooms
  }
  if (filter.createdOn) {
    const currentDate = new Date()
    const freshness = new Date(new Date().setDate(currentDate.getDate() - filter.createdOn))
    freshness.toUTCString()
    freshness.setUTCHours(0, 0)
    const timestampInMili = freshness.getTime()
    const time = new Date(timestampInMili)
    query.created_on = {}
    query.created_on.$gte = time
  }
  query.is_deleted = false
  console.debug('Query for property list with filter: %j', query)
  return query
}

function paginateProperty (page) {
  const property = {}
  property.sort = { created_on: 1 }
  property.lean = true
  property.page = page
  property.limit = 2
  property.pagination = true
  return property
}

const updateProperty = async (id, key) => {
  let updateObject
  if (key === 'count') {
    updateObject = updateCountData()
  } else if (key === 'favorite') {
    updateObject = updateFavoriteStatus()
  }
  console.debug('update object: %j', updateObject)
  const updatedData = await updatePropertyDetail(
    queryForPropertyDetails(id),
    updateObject,
    {}
  )
  return updatedData
}

function updateCountData () {
  const updateSet = {}
  updateSet.$inc = {}
  updateSet.$inc.count = 1
  return updateSet
}

function updateFavoriteStatus (key) {
  const updateSet = {}
  updateSet.favorite = true
  return updateSet
}

const getViewedProperty = async () => {
  const details = await findPropertyWithPagination(
    viewedPropertyQuery(),
    paginateProperty(1))
  console.debug('getViewedProperty() details: %j', details)
  if (details && details.docs && Array.isArray(details.docs) && details.docs.length > 0) {
    details.docs = await getImageURL(details.docs)
  }
  console.debug('getViewedProperty() details: %j', details)
  return details
}

function viewedPropertyQuery () {
  const query = {}
  query.count = {}
  query.count.$gte = 0
  return query
}

module.exports = {
  addNewProperty,
  propertyDetail,
  getPropertyListWithPagination,
  updateProperty,
  getViewedProperty
}
