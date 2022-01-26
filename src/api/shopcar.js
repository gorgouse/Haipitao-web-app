import req from '../fetch/index.js'

const config = {
addShopCar: {
    url: '/shopCar/add',
    method: 'get'
  },
  listUserShopCar: {
    url: '/shopCar/list',
    method: 'get'
  },  
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
