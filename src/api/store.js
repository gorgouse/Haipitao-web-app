import req from '../fetch/index.js'

const config = {
  selectStore: {
    url: '/store/select',
    method: 'get'
  },
  selectStoreGoods: {
    url: '/store/goods',
    method: 'get'
  },
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
  }
  export default request