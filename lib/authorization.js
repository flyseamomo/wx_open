const axios = require('axios')

/**
 * 请求CODE
 * @param {String} appId
 * @param {String} redirect_uri
 */
exports.getCode = function (appId, redirect_uri, scope = 'snsapi_userinfo') {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=STATE&component_appid=${this.component_appid}#wechat_redirect`;
}

/**
 * 通过code换取access_token,返回access_token， refresh_token， openid， 
 * @param {String} appId 
 * @param {String} code 
 */
exports.codeGetToken = async function (appId, code) {
  const componentAccessToken = await this.getComponentAccessToken()    
  let res = await axios.get(`https://api.weixin.qq.com/sns/oauth2/component/access_token?appid=${appId}&code=${code}&grant_type=authorization_code&component_appid=${this.component_appid}&component_access_token=${componentAccessToken}`)
  this.redis.set(`userInfo_access_token${res.data.openid}`, res.data.access_token)
  this.redis.expire(`userInfo_access_token${res.data.openid}`, 600)
  return res.data
}

/**
 * 刷新access_token（如果需要）
 * @param {String} appId 
 * @param {String} code 
 */
exports.getRefreshToken = async function (appId, code, refresh_token) {
    const componentAccessToken = await this.getComponentAccessToken()    
    let res = await axios.get(`https://api.weixin.qq.com/sns/oauth2/component/refresh_token?appid=${appId}&grant_type=refresh_token&component_appid=${this.component_appid}&component_access_token=${componentAccessToken}&refresh_token=${refresh_token}`)
    return res.data
}

/**
 * 通过网页授权access_token获取用户基本信息（需授权作用域为snsapi_userinfo）
 * @param {String} openid 
 * @param {String} access_token
 */
exports.getUserInfoByAccessToken = async function (openid) {
    let access_token = await this.redis.get(`userInfo_access_token${openid}`)
    if (access_token){
      let res = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`)
      return res.data
    }else return null
}
