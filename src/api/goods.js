import req from '../fetch/index.js'

const config = {
  goodslistmethod: {
    url: '/appgoods/homeGoodsList',
    method: 'get'
  },
  selectGoodsById: {
    url: '/appgoods/detail',
    method: 'get'
  },
  selectTypeOfGoods: {
    url: '/appgoods/type',
    method: 'get'
  },
  selectPropOfGoods: {
    url: '/appgoods/prop',
    method: 'get'
  },
  firstClassify: {
    url: '/appgoods/firstClassify',
    method: 'get'
  },
  getGoodsBySort: {
    url: '/appgoods/getGoodsBySort',
    method: 'get'
  },
  detailImage: {
    url: '/appgoods/detailImage',
    method: 'get'
  },
  addChatByClickClientService: {
    url: '/appgoods/addChatByClickClientService',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
