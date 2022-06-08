const axios = require('axios')

/**
 * 母商户资质申请接口
 *  @param {String} register_capital  注册资本，数字， 单位：分
 *  @param {String} business_license_media_id  营业执照扫描件的media_id
 *  @param {String} tax_registration_certificate_media_id  税务登记证扫描件的media_id
 *  @param {String} last_quarter_tax_listing_media_id  上个季度纳税证明扫描件media_id
 */
exports.uploadCardAgentQualification = async function (register_capital, business_license_media_id, tax_registration_certificate_media_id, last_quarter_tax_listing_media_id) {
  const componentAccessToken = await this.getComponentAccessToken()  
  let res = await axios.post(`${this.componentPrefix}upload_card_agent_qualification?access_token=${componentAccessToken}`,{
    register_capital, 
    business_license_media_id, 
    tax_registration_certificate_media_id, 
    last_quarter_tax_listing_media_id
  })
  return res.data
}



/**
 * 母商户资质申请接口

 */
exports.checkCardAgentQualification = async function () {
    const componentAccessToken = await this.getComponentAccessToken()  
    let res = await axios.get(`${this.componentPrefix}check_card_agent_qualification?access_token=${componentAccessToken}`)
    return res.data
  }


  /**
 * 子商户资质提交接口
 *  @param {String} appid 
 *  @param {String} name  子商户的商户名
 *  @param {String} logo_media_id  子商户的logo
 *  @param {String} business_license_media_id  营业执照扫描件的media_id
 *  @param {String} agreement_file_media_id  子商户与第三方签署的授权函的media_id
 *  @param {String} primary_category_id  一级类目id
 *  @param {String} secondary_category_id  二级类目id
 *  @param {String} operator_id_card_media_id  当子商户为个体工商户且无公章时，授权函可签字，并额外提交该个体工商户经营者身份证扫描件的 media_id (可不传)

 */
exports.uploadCardMerchantQualification = async function (appid, name, logo_media_id, business_license_media_id, agreement_file_media_id, primary_category_id, secondary_category_id, operator_id_card_media_id) {
    const componentAccessToken = await this.getComponentAccessToken()
    let res = await axios.post(`${this.componentPrefix}upload_card_merchant_qualification?access_token=${componentAccessToken}`,{
        appid, 
        name, 
        logo_media_id, 
        business_license_media_id, 
        agreement_file_media_id, 
        primary_category_id, 
        secondary_category_id, 
        operator_id_card_media_id
    })
    return res.data
}
/**
 * 子商户资质申请接口
 *  @param {String} appid 
 */
exports.checkCardMerchantQualification = async function (appid) {
    const componentAccessToken = await this.getComponentAccessToken()  
    let res = await axios.get(`${this.componentPrefix}check_card_merchant_qualification?access_token=${componentAccessToken}`,{
        appid
    })
    return res.data
}

/**
 * 卡券开放类目查询接口
 *  @param {String} appid 
 */
exports.getApplyProtocol = async function (appid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)    
    let res = await axios.get(`https://api.weixin.qq.com/card/getapplyprotocol?access_token=${authorizerAccessToken}`)
    return res.data
}


/**
 * 卡券开放类目查询接口
 *  @param {String} appid 
 */
exports.getCardMerchant = async function (appid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)    
    let res = await axios.get(`${this.componentPrefix}get_card_merchant?access_token=${authorizerAccessToken}`,{
        appid
    })
    return res.data
}


/**
 * 拉取子商户列表接口
 *  @param {String} next_get 
 */
exports.batchgetCardMerchant = async function (appid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)    
    let res = await axios.get(`${this.componentPrefix}batchget_card_merchant?access_token=${authorizerAccessToken}`,{
        next_get: next_get
    })
    return res.data
}

/**
 *使用授权码换取公众号的授权信息
 *  @param {String} authorization_code 
 */
exports.apiQueryAuth = async function (authorization_code) {
    const componentAccessToken = await this.getComponentAccessToken()  
    let res = await axios.get(`${this.componentPrefix}api_query_auth?component_access_token=${componentAccessToken}`,{
        component_appid: this.component_appid,
        authorization_code
    })
    return res.data
}

/**
 *获取授权方的账户信息
 *  @param {String} authorizer_appid 
 */
exports.apiGetAuthorizerInfo = async function (authorizer_appid) {
    const componentAccessToken = await this.getComponentAccessToken()  
    let res = await axios.post(`${this.componentPrefix}api_get_authorizer_info?component_access_token=${componentAccessToken}`,{
        component_appid: this.component_appid,
        authorizer_appid
    })
    return res.data
}


/**
 * 确认授权
 *  @param {String} authorizer_appid 
 *  @param {String} funcscope_category_id 
 *  @param {String} confirm_value 
 */
exports.apiConfirmAuthorization = async function (authorizer_appid, funcscope_category_id, confirm_value) {
    const componentAccessToken = await this.getComponentAccessToken()  
    let res = await axios.get(`${this.componentPrefix}api_confirm_authorization?component_access_token=${componentAccessToken}`,{
        component_appid: this.component_appid, 
        authorizer_appid,
        funcscope_category_id,
        confirm_value
    })
    return res.data
}
