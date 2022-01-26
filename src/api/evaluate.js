import req from '../fetch/index.js'

const config = {
  addEvaluate: {
    url: '/evaluate/add',
    method: 'get'
  },
selectGoodsDetailEvaluate: {
    url: '/evaluate/select',
    method: 'get'
  },
  countGoodsDetailEvaluateTotal: {
    url: '/evaluate/count',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
