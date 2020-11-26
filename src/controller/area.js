'use strict'

const {
  responseGenerators,
  getStatusCode,
  errorGenerator
} = require('../lib/utils')
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST
} = require('http-status-codes')
const {
  getAreaList
} = require('../service/area')
const CONTROLLER_CONS = 'PMS_A_C_'

const getArea = async (req, res, next) => {
  try {
    console.debug('getArea()')
    const response = await getAreaList()
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while getting area list: %s %j', error, error)
    if (getStatusCode(error.status_code) && getStatusCode(
      error.status_code) !== String(INTERNAL_SERVER_ERROR)) {
      res.status(getStatusCode(error.status_code)).send(error)
    } else if (getStatusCode(error.status_code) === (BAD_REQUEST)) {
      res.status(BAD_REQUEST).send(errorGenerator(
        error, 400, 'Bad request'))
    } else {
      res.status(INTERNAL_SERVER_ERROR).send(errorGenerator(
        error, 500,
        'Server error'))
    }
  }
}

module.exports = {
  getArea
}
