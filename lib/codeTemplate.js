const axios = require('axios')

/**
 * 获取草稿箱内的所有临时代码草稿
 */
exports.getCodeTemplateDraftList = async function () {
    const componentAccessToken = await this.getComponentAccessToken()
    let res = await axios.get(`${this.wxappPrefix}gettemplatedraftlist?access_token=${componentAccessToken}`)
    return res.data
}

/**
 * 获取代码模版库中的所有小程序代码模版
 */
exports.getCodeTemplateList = async function () {
    const componentAccessToken = await this.getComponentAccessToken()
    let res = await axios.get(`${this.wxappPrefix}gettemplatelist?access_token=${componentAccessToken}`)
    return res.data
}

/**
 * 将草稿箱的草稿选为小程序代码模版
 * @param {String} draftId
 */
exports.addCodeTemplate = async function (draftId) {
    const componentAccessToken = await this.getComponentAccessToken()
    let res = await axios.post(`${this.wxappPrefix}addtotemplate?access_token=${componentAccessToken}`,{
        draft_id: draftId
    })
    return res.data
}

/**
 * 删除指定小程序代码模版
 * @param {String} templateId
 */
exports.deleteCodeTemplate = async function (templateId) {
    const componentAccessToken = await this.getComponentAccessToken()
    let res = await axios.post(`${this.wxappPrefix}deletetemplate?access_token=${componentAccessToken}`, {
        template_id: templateId
    })
    return res.data
}
