const axios = require('axios')

//每个公众号每个月有10次清零机会，包括在微信公众平台上的清零以及调用API进行清零
/**
 * 第三方代公众号调用次数进行清零，实际上消耗的是公众号的清零
 * @param {String} appId
 */
exports.clearQuota = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.prefix}clear_quota?access_token=${authorizerAccessToken}`,{
    appid: appId
  })
  return res.data
}

/**
 * 第三方平台对其所有API调用次数清零（只与第三方平台相关，与公众号无关，接口如api_component_token）
 */
exports.componentClearQuota = async function () {
  const componentAccessToken = await this.getComponentAccessToken()    
  let res = await axios.post(`${this.prefix}component/clear_quota?component_access_token=${componentAccessToken}`,{
    component_appid: this.component_appid
  })
  return res.data
}