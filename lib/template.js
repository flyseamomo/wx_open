const axios = require('axios')

/**
 * 获取小程序模板库标题列表
 * @param {String} appId
 * @param {Number} offset
 * @param {Number} count
 */
exports.getTemplateLibraryList = async function (appId, offset, count) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}template/library/list?access_token=${authorizerAccessToken}`, {
    offset,
    count
  })
  return res.data
}
/**
 * 获取模板库某个模板标题下关键词库
 * @param {String} appId
 * @param {String} templateId
 */
exports.getTemplateLibraryKey = async function (appId, templateId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}template/library/get?access_token=${authorizerAccessToken}`, {
    id: templateId,
  })
  return res.data
}
/**
 * 组合模板并添加至帐号下的个人模板库
 * @param {String} appId
 * @param {String} templateId
 * @param {Array} keyword_id_list
 *
 */
exports.addTemplateLibrary = async function (appId, templateId, keyword_id_list) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}template/add?access_token=${authorizerAccessToken}`, {
    id: templateId,
    keyword_id_list
  })
  return res.data
}


/**
 * 获取帐号下已存在的模板列表
 * @param {String} appId
 * @param {Number} offset
 * @param {Number} count
 */
exports.getTemplateList = async function (appId, offset, count) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}template/list?access_token=${authorizerAccessToken}`, {
    offset,
    count
  })
  return res.data
}

/**
 * 删除帐号下的某个模板
 * @param {String} appId
 * @param {String} template_id
 */
exports.delTemplate = async function (appId, template_id) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}template/del?access_token=${authorizerAccessToken}`, {
    template_id
  })
  return res.data
}


/**
 * **************发送模版消息********************
*/


/**
 * 发送模板消息
 * @param {String} appId
 * @param {String} openid
 * @param {String} template_id
 * @param {String} form_id
 * @param {Object} data
 * @param {String} page
 * @param {String} color
 * @param {String} emphasis_keyword
 * 
 */
exports.sendTemplateMsg = async function (appId, openid, template_id, form_id, data, page, color, emphasis_keyword) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.prefix}message/wxopen/template/send?access_token${authorizerAccessToken}`,{
    touser: openid,
    template_id,
    form_id,
    data,
    page,
    color,
    emphasis_keyword
  })
  return res.data
}
