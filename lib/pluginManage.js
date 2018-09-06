const axios = require('axios')

/**
 * 申请 查询 删除 使用插件接口
 * @param {String} appid
 * @param {String} action
 * @param {String} plugin_appid
 */
exports.plugin = async function (appid, action, plugin_appid) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)
  let res = await axios.post(`${this.wxappPrefix}plugin?access_token=${authorizerAccessToken}`, {
    action,
    plugin_appid
  })
  return res.data
}
