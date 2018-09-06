const axios = require('axios')

/**
 * 设置小程序服务器域名
 * 详情请见：<https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489138143_WPbOO&token=&lang=zh_CN>
 * @param {String} appId
 * @param {String} action // add添加, delete删除, set覆盖, get获取。当参数是get时不需要填四个域名字段
 * @param {Object[]} requestdomain
 * @param {Object[]} wsrequestdomain
 * @param {Object[]} uploaddomain
 * @param {Object[]} downloaddomain
 */
exports.setDomain = async function (appId, action, requestdomain, wsrequestdomain, uploaddomain, downloaddomain) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}modify_domain?access_token=${authorizerAccessToken}`, {
    action,
    requestdomain,
    wsrequestdomain,
    uploaddomain,
    downloaddomain
  })
  return res.data
}




/**
 * 设置小程序业务域名
 * 详情请见：<https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489138143_WPbOO&token=&lang=zh_CN>
 * @param {String} appId
 * @param {String} action // add添加, delete删除, set覆盖, get获取。当参数是get时不需要填四个域名字段
 * @param {Object[]} webviewdomain

 */
exports.setWebviewDomain = async function (appId, action, webviewdomain) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}setwebviewdomain?access_token=${authorizerAccessToken}`, {
    action,
    webviewdomain,
  })
  return res.data
}
