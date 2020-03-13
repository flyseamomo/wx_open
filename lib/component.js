const axios = require('axios')
const Redis = require('ioredis')

class Component {
  /*
  * @param { String } componentAppid 第三方平台appid
  * @param { String } componentAppSecret 第三方平台componentAppSecret
  * @param { Object } redisConfig redis 配置
  */
  constructor(componentAppid, componentAppSecret, componentKey, componentToken, redisConfig){
      this.component_appid = componentAppid
      this.component_appsecret = componentAppSecret
      this.key = componentKey
      this.token = componentToken
      this.redis = new Redis(redisConfig)
      this.prefix = 'https://api.weixin.qq.com/cgi-bin/'
      this.componentPrefix = 'https://api.weixin.qq.com/cgi-bin/component/'
      this.wxappPrefix = 'https://api.weixin.qq.com/wxa/'
      this.wxopenPrefix = 'https://api.weixin.qq.com/cgi-bin/wxopen/'
      this.mediaPrefix = 'https://api.weixin.qq.com/cgi-bin/media/'
      this.datacubePrefix = 'https://api.weixin.qq.com/datacube/'
      this.openPrefix = 'https://api.weixin.qq.com/cgi-bin/open/'
      this.templatePrefix = 'https://api.weixin.qq.com/cgi-bin/wxopen/template/'
      this.tempalteMessagePrefix = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/'
      this.customMessagePrefix = 'https://api.weixin.qq.com/cgi-bin/message/custom/'
  }

  /*
  * 设置第三方平台ComponentVerifyTicket
  * @param {String} ticket
  */
  setComponentVerifyTicket(ticket){
    this.redis.set(`weixin_open_ComponentVerifyTicket_${this.component_appid}`, ticket)
  }

  /*
  * 取ComponentAccessToken
  * 从redis取ComponentAccessToken，如果取不到就通过微信接口获取（需要用到componentVerifyTicket）
  */
  async getComponentAccessToken(){
    let ComponentAccessToken = await this.redis.get(`weixin_open_ComponentAccessToken_${this.component_appid}`)
    if (ComponentAccessToken){
      return ComponentAccessToken
    }else{
      let componentVerifyTicket = await this.redis.get(`weixin_open_ComponentVerifyTicket_${this.component_appid}`)
      if (componentVerifyTicket){
        let res = await axios.post(`${this.componentPrefix}api_component_token`, {
          component_appid: this.component_appid,
          component_appsecret: this.component_appsecret,
          component_verify_ticket: componentVerifyTicket
        })
        if(!res.data.component_access_token) return null
        this.redis.set(`weixin_open_ComponentAccessToken_${this.component_appid}`, res.data.component_access_token)
        this.redis.expire(`weixin_open_ComponentAccessToken_${this.component_appid}`, 7000)
        return res.data.component_access_token
      }else {
        let err = new Error('ComponentVerifyTicket need set')
        err.name = 'weixin_open_error'
        throw err
      }
    }
  }

  /*
  * 取预授权码，微信公众号或小程序授权只用
  */
  async getPreAuthCode(){
    let component_access_token = await this.getComponentAccessToken()
    let res = await axios.post(`${this.componentPrefix}api_create_preauthcode?component_access_token=${component_access_token}`, {
      component_appid: this.component_appid
    })
    return res.data.pre_auth_code
  }

  /*
  * 通过授权码去取微信公众号或小程序的authorizer_access_token和authorizer_refresh_token，并存在redis中
  */
  async auth(queryAuthCode){
    let component_access_token = await this.getComponentAccessToken()
    let res = await axios.post(`${this.componentPrefix}api_query_auth?component_access_token=${component_access_token}`, {
      "component_appid": this.component_appid,
      "authorization_code": queryAuthCode
    })
    res = res.data.authorization_info
    this.redis.set(`weixin_open_${this.component_appid}_authorizer_access_token_${res.authorizer_appid}`, res.authorizer_access_token)
    this.redis.expire(`weixin_open_${this.component_appid}_authorizer_access_token_${res.authorizer_appid}`, 7000)
    this.redis.set(`weixin_open_${this.component_appid}_authorizer_refresh_token_${res.authorizer_appid}`, res.authorizer_refresh_token)
    return res
  }

  /*
  * 获取授权微信公众号或者小程序的authorizer_access_token
  * @param {String} AppId
  */
  async getAuthorizerAccessToken(AppId) {
    let authorizerAccessToken = await this.redis.get(`weixin_open_${this.component_appid}_authorizer_access_token_${AppId}`)
    if (authorizerAccessToken) {
      return authorizerAccessToken
    } else {
      let authorizerRefreshToken = await this.redis.get(`weixin_open_${this.component_appid}_authorizer_refresh_token_${AppId}`)
      let component_access_token = await this.getComponentAccessToken()
      let res = await axios.post(`${this.componentPrefix}api_authorizer_token?component_access_token=${component_access_token}`, {
        component_appid: this.component_appid,
        authorizer_appid: AppId,
        authorizer_refresh_token: authorizerRefreshToken,
      })
      if(!res.data.authorizer_access_token){
        await this.resetAllRefreshToken()
        return null
      }
      this.redis.set(`weixin_open_${this.component_appid}_authorizer_access_token_${AppId}`, res.data.authorizer_access_token)
      this.redis.expire(`weixin_open_${this.component_appid}_authorizer_access_token_${AppId}`, 7000)
      this.redis.set(`weixin_open_${this.component_appid}_authorizer_refresh_token_${AppId}`, res.data.authorizer_refresh_token)
      return res.data.authorizer_access_token
    }
  }

    /*
  * 获取授权微信公众号或者小程序的authorizer_access_token
  * @param {String} AppId
  */
  async resetAllRefreshToken() {
    let component_access_token = await this.getComponentAccessToken()
    let res = await axios.post(`${this.componentPrefix}api_get_authorizer_list?component_access_token=${component_access_token}`, {
      component_appid: this.component_appid,
      offset: 0,
      count: 100,
    })
    if(!res.data || !res.data.list){
      return null
    }else{
      res.data.list.map(item => {
        if(item.authorizer_appid && item.refresh_token){
          this.redis.set(`weixin_open_${this.component_appid}_authorizer_refresh_token_${item.authorizer_appid}`, item.refresh_token)
        }
      })
    }
    return res.data.authorizer_access_token
  }
}

Component.mixin = function (obj) {
  for (const key in obj) {
    if (Component.prototype.hasOwnProperty(key)) {
      throw new Error(
        "Don't allow override existed prototype method. method: " + key
      )
    }
    Component.prototype[key] = obj[key]
  }
}

module.exports = Component