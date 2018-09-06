const axios = require('axios')

/**
 * 发送客服消息
 * 客服接口-发消息
 * @param {String} appId
 * @param {String} openid
 * @param {String} msgtype
 * @param {Object} msgtypeObj
 */
exports.sendCustomMessage = async function (appId, openid, msgtype, msgtypeObj) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}message/custom/send?access_token=${authorizerAccessToken}`, {
        touser: openid,
        msgtype,
        ...msgtypeObj,
    })
    return res.data
}

/**
 * 发送模板消息
 * @param {String} appId
 * @param {String} openid
 * @param {String} template_id
 * @param {String} url
 * @param {Object} data
 * @param {Object} miniprogram
 */
exports.sendTemplateMessage = async function (appId, openid, template_id, url, data, miniprogram) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let obj = {
        touser: openid,
        template_id,
        url,
        data
    }
    miniprogram && (obj.miniprogram = miniprogram)
    let res = await axios.post(`${this.prefix}message/template/send?access_token=${authorizerAccessToken}`, obj)
    return res.data
}

/**
 * 设置所属行业
 * @param {String} appId
 * @param {Number} industry_id1
 * @param {Number} industry_id2
 */
exports.setIndustry = async function (appId, industry_id1, industry_id2) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}template/api_set_industry?access_token=${authorizerAccessToken}`, { industry_id1, industry_id2 })
    return res.data
}

/**
 * 获取设置的行业信息
 * @param {String} appId
 */
exports.getIndustry = async function (appId) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`${this.prefix}template/get_industry?access_token=${authorizerAccessToken}`)
    return res.data
}

/**
 * 获得模板ID(添加模板)
 * @param {String} appId
 * @param {String} template_id_short
 */
exports.addTemplate = async function (appId, template_id_short) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}template/api_add_template?access_token=${authorizerAccessToken}`, { template_id_short })
    return res.data
}

/**
 * 获取模板列表
 * @param {String} appId
 */
exports.getTemplates = async function (appId) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`${this.prefix}template/get_all_private_template?access_token=${authorizerAccessToken}`)
    return res.data
}

/**
 * 删除模板
 * @param {String} appId
 * @param {String} template_id
 */
exports.deleteTemplate = async function (appId, template_id) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}template/del_private_template?access_token=${authorizerAccessToken}`, { template_id })
    return res.data
}