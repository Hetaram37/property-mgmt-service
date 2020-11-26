'use strict'

const {
  config
} = require('../lib/utils')
require('../model/property')
const database = config.get('database')

const saveProperty = async (data) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const PropertyDetails = db.model('property')
    const property = new PropertyDetails(data)
    return property.save()
  } catch (error) {
    console.error('Error while property details: %s %j', error, error)
    throw error
  }
}

const updatePropertyDetail = async (query, data, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const PropertyDetails = db.model('property')
    const response = await PropertyDetails.update(query, data, projection)
    return response
  } catch (error) {
    console.error('Error while updating property details: %s %j', error, error)
    throw error
  }
}

const findProperty = async (query, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const propertyDetails = db.model('property')
    const property = await propertyDetails.find(query, projection).lean()
    return property
  } catch (error) {
    console.error('Error while getting property details: %s %j', error, error)
    throw error
  }
}

const findPropertyWithPagination = async (query, properties) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const propertyDetails = db.model('property')
    const property = await propertyDetails.paginate(query, properties)
    return property
  } catch (error) {
    console.error('Error while getting property details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  saveProperty,
  updatePropertyDetail,
  findProperty,
  findPropertyWithPagination
}
