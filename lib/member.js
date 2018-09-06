const axios = require('axios')


/**
 * 绑定微信用户为小程序体验者
 * @param {String} appId
 * @param {String} wechatid
 */

exports.bindTester = async function (appId, wechatid) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}bind_tester?access_token=${authorizerAccessToken}`, {
    wechatid
  })
  return res.data
}

/**
 * 解除绑定小程序的体验者
 * @param {String} appId
 * @param {String} wechatid
 */

exports.unbindTester = async function (appId, wechatid) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}unbind_tester?access_token=${authorizerAccessToken}`, {
    wechatid
  })
  return res.data
}


/**
 * 获取体验者列表
 * @param {String} appId
 */

exports.getMemberList = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}memberauth?access_token=${authorizerAccessToken}`, {
    "action": "get_experiencer"
  })
  return res.data
}