import req from '../fetch/index.js'

const config = {
    getAreaList: {
    url: '/area/getAreaList',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
