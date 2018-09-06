const axios = require('axios')

/**
 * 创建 开放平台帐号并绑定公众号/小程序
 * @param {String} appid
 */
exports.createAccount = async function (appid) {
  const componentAccessToken = await this.getComponentAccessToken()
  let res = await axios.post(`${this.openPrefix}create?access_token=${componentAccessToken}`, {
    appid
  })
  return res.data
}


/**
 * 将 公众号/小程序绑定到开放平台帐号下
 * @param {String} appid
 */
exports.bindAccount = async function (appid) {
  const componentAccessToken = await this.getComponentAccessToken()
  let res = await axios.post(`${this.openPrefix}bind?access_token=${componentAccessToken}`, {
    appid,
    open_appid: this.component_appid
  })
  return res.data
}
/**
 * 将公众号/小程序从开放平台帐号下解绑
 * @param {String} appid
 */
exports.unbindAccount = async function (appid) {
  const componentAccessToken = await this.getComponentAccessToken()
  let res = await axios.post(`${this.openPrefix}unbind?access_token=${componentAccessToken}`, {
    appid,
    open_appid: this.component_appid
  })
  return res.data
}


/**
 * 获取公众号/小程序所绑定的开放平台帐号
 * @param {String} appid
 */
exports.getAccount = async function (appid) {
  const componentAccessToken = await this.getComponentAccessToken()
  let res = await axios.post(`${this.openPrefix}get?access_token=${componentAccessToken}`, {
    appid
  })
  return res.data
}
