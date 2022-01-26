import req from '../fetch/index.js'

const config = {
addAddress: {
    url: '/address/add',
    method: 'get'
  },
  addressList: {
    url: '/address/list',
    method: 'get'
  },
  updateAddress: {
    url: '/address/update',
    method: 'get'
  },
  selectDefault: {
    url: '/address/selectDefault',
    method: 'get'
  },
  selectAddressById: {
    url: '/address/selectAddressById',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
