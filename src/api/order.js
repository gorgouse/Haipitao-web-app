import req from '../fetch/index.js'

const config = {
  orderAdd: {
    url: '/order/add',
    method: 'get'
  },
  orderList: {
    url: '/order/list',
    method: 'get'
  },
  getOrderById: {
    url: '/order/getOrderById',
    method: 'get'
  },
  updateOrderState: {
    url: '/order/updateOrderState',
    method: 'get'
  },
  
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
