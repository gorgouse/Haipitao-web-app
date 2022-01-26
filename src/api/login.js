import req from '../fetch/index.js'

const config = {
  loginmethod: {
    url: '/login/loginUser',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
