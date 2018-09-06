const axios = require('axios')

/**
 * 设置小程序隐私设置（是否可被搜索）
 * @param {String} appId
 * @param {Number} status
 */
exports.setSearchStatus = async function (appId, status) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}changewxasearchstatus?access_token=${authorizerAccessToken}`, {
    status //1表示不可搜索，0表示可搜索
  })
  return res.data
}

/**
 * 查询小程序当前隐私设置（是否可被搜索）
 * @param {String} appId
 */
exports.getSearchStatus = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}getwxasearchstatus?access_token=${authorizerAccessToken}`)
  return res.data
}