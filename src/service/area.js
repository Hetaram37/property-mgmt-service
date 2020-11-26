'use strict'

const { findArea } = require('../repository/area')

const getAreaList = async () => {
  let areaList = await findArea(
    queryForArea(),
    projectionForArea())
  console.debug('getAreaList() areaList: %j', areaList)
  if (areaList && Array.isArray(areaList) && areaList.length > 0) {
    areaList = areaList.map(area => area.name)
  }
  console.debug('getAreaList() areaList: %j', areaList)
  return areaList
}

function queryForArea () {
  const query = {}
  query.is_deleted = false
  return query
}

function projectionForArea () {
  const projection = {}
  projection.name = true
  projection._id = false
  return projection
}

module.exports = {
  getAreaList
}
