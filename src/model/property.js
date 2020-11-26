'use strict'

const mongoose = require('mongoose')
require('mongoose-long')(mongoose)
const mongoosePaginate = require('mongoose-paginate-v2')

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  area: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Bedrooms is required']
  },
  bathrooms: {
    type: Number,
    required: [true, 'Bath is required']
  },
  count: {
    type: Number,
    default: 0
  },
  favorite: {
    type: Boolean,
    default: false
  },
  carpet_area: {
    ft: String,
    yd: String,
    mt: String
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
  collection: 'property'
})

propertySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('property', propertySchema)
