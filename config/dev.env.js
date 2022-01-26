'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"dev"',
  // BASE_API: '"http://localhost:9999"'
  BASE_API: '"http://47.107.123.144:9999"'
})
