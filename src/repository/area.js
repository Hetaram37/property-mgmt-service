'use strict'

const {
  config
} = require('../lib/utils')
require('../model/area')
const database = config.get('database')

const findArea = async (query, projection) => {
  try {
    const tenant = database.get('default_db_name')
    const db = await global.db.connect(tenant)
    const areaDetails = db.model('area')
    const area = await areaDetails.find(query, projection).lean()
    return area
  } catch (error) {
    console.error('Error while getting area details: %s %j', error, error)
    throw error
  }
}

module.exports = {
  findArea
}
