const axios = require('axios')

/**
 * 获取公众号关联的小程序
 */
exports.wxamplinkget = async function () {
  const componentAccessToken = await this.getComponentAccessToken()
  let res = await axios.post(`${this.wxopenPrefix}wxamplinkget?access_token=${componentAccessToken}`)
  return res.data
}

/**
 *  关联小程序
 *  @param {String} appid 
 *  @param {String} notify_users 
 *  @param {String} show_profile 
 */
exports.wxamplink = async function (appid, notify_users, show_profile) {
    const componentAccessToken = await this.getComponentAccessToken()
    let res = await axios.post(`${this.wxopenPrefix}wxamplink?access_token=${componentAccessToken}`,{
        appid,
        notify_users,
        show_profile
    })
    return res.data
}

/**
 *  解除已关联的小程序
 *  @param {String} appid 
 *  @param {String} notify_users 
 *  @param {String} show_profile 
 */
exports.wxampunlink = async function (appid, notify_users, show_profile) {
    const componentAccessToken = await this.getComponentAccessToken()
    let res = await axios.post(`${this.wxopenPrefix}wxampunlink?access_token=${componentAccessToken}`,{
        appid
    })
    return res.data
}