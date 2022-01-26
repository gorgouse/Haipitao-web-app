import req from '../fetch/index.js'

const config = {
  //新增服务商
  slideMethod: {
    url: '/appslide/list',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
