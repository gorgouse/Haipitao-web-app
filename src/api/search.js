import req from '../fetch/index.js'

const config = {
  searchMethod: {
    url: '/appgoods/search',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
