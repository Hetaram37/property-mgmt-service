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
  addNewProperty,
  propertyDetail,
  getPropertyListWithPagination,
  updateProperty,
  getViewedProperty
} = require('../service/property')
const CONTROLLER_CONS = 'PMS_P_C_'

const addProperty = async (req, res, next) => {
  try {
    console.debug('addProperty()')
    const response = await addNewProperty(req)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while adding new property: %s %j', error, error)
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

const propertyDetails = async (req, res, next) => {
  try {
    console.debug('propertyDetails()')
    const id = req.params.id
    const response = await propertyDetail(id)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while getting property details: %s %j', error, error)
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

const propertyList = async (req, res, next) => {
  try {
    console.debug('propertyDetails()')
    const response = await getPropertyListWithPagination(req.query)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while getting property list: %s %j', error, error)
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

const updatePropertyDetail = async (req, res, next) => {
  try {
    console.debug('UpdatePropertyDetail()')
    const response = await updateProperty(req.body.id, req.body.key)
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while updating property detail: %s %j', error, error)
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

const getViewedPropertyList = async (req, res, next) => {
  try {
    console.debug('getViewedPropertyList()')
    const response = await getViewedProperty()
    res.status(OK).json(responseGenerators(response, CONTROLLER_CONS + OK,
      'success', null))
    next()
  } catch (error) {
    console.error('Error while getting viewed property detail: %s %j', error, error)
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
  addProperty,
  propertyDetails,
  propertyList,
  updatePropertyDetail,
  getViewedPropertyList
}
