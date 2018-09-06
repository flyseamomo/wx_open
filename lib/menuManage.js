const axios = require('axios')

/**
 * 自定义菜单创建接口
 * button 参考https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013
 *  @param {String} appId  
 *  @param {Array} button
 */
exports.createMenu = async function (appId, button) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}menu/create?access_token=${authorizerAccessToken}`, { button })
    return res.data
}

/**
 * 自定义菜单查询接口(可以获取默认菜单和全部个性化菜单信息)
 *  @param {String} appId  
 */
exports.getMenu = async function (appId) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`${this.prefix}menu/get?access_token=${authorizerAccessToken}`)
    return res.data
}

/**
 * 自定义菜单删除接口(调用此接口会删除默认菜单及全部个性化菜单)
 *  @param {String} appId  
 */
exports.deleteMenu = async function (appId) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`${this.prefix}menu/delete?access_token=${authorizerAccessToken}`)
    return res.data
}

/**
 * 创建个性化菜单
 * button及matchrule 参考https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455782296
 *  @param {String} appId  
 *  @param {Array} button
 *  @param {Object} matchrule
 */
exports.createConditionalMenu = async function (appId, button, matchrule) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}menu/addconditional?access_token=${authorizerAccessToken}`, { button, matchrule })
    return res.data
}

/**
 * 删除个性化菜单
 *  @param {String} appId  
 *  @param {String} menuid
 */
exports.deleteConditionalMenu = async function (appId, menuid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}menu/delconditional?access_token=${authorizerAccessToken}`, { menuid })
    return res.data
}

/**
 * 测试个性化菜单匹配结果
 *  @param {String} appId  
 *  @param {String} user_id user_id可以是粉丝的OpenID，也可以是粉丝的微信号
 */
exports.tryMatchConditionalMenu = async function (appId, user_id) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}menu/trymatch?access_token=${authorizerAccessToken}`, { user_id })
    return res.data
}

/**
 * 获取自定义菜单配置接口
 *  @param {String} appId  
 */
exports.getCurrentSelfMenu = async function (appId) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`${this.prefix}get_current_selfmenu_info?access_token=${authorizerAccessToken}`)
    return res.data
}