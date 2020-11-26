'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)

const areaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  created_by: {
    type: String,
    default: 'SYSTEM'
  },
  updated_by: {
    type: String,
    default: 'SYSTEM'
  }
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  },
  collection: 'area'
})

module.exports = mongoose.model('area', areaSchema)
