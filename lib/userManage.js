const axios = require('axios')

/**
 * 获取用户基本信息（包括UnionID机制）
 *  @param {String} appId  
 *  @param {String} openid
 */
exports.getUserInfo = async function (appId, openid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`${this.prefix}user/info?access_token=${authorizerAccessToken}&openid=${openid}&lang=zh_CN`)
    if (res.data.subscribe == 1){
        return res.data
    }else {
        res = await this.getUserInfoByAccessToken(openid)
        return res
    }
}

/**
 * 批量获取用户基本信息
 *  @param {String} appId  
 *  @param {Array} user_list 对象数组，包含openid 和 lang(非必填)
 */
exports.getUserInfoList = async function (appId, user_list) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}user/info/batchget?access_token=${authorizerAccessToken}`, user_list)
    return res.data
}

/**
 * 批量获取用户openid列表
 *  @param {String} appId  
 *  @param {String} next_openid 第一个拉取的OPENID，不填默认从头开始拉取
 */
exports.getOpenidList = async function (appId, next_openid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let url = `${this.prefix}user/get?access_token=${authorizerAccessToken}`
    next_openid && (url = `${url}&next_openid=${next_openid}`)
    let res = await axios.get(url)
    return res.data
}

/**
 * 创建标签
 *  @param {String} appId  
 *  @param {String} name 
 */
exports.createTag = async function (appId, name) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/create?access_token=${authorizerAccessToken}`, { tag : { name }})
    return res.data
}

/**
 * 获取公众号已创建的标签
 *  @param {String} appId  
 *  @param {String} name 
 */
exports.getTags = async function (appId) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`${this.prefix}tags/get?access_token=${authorizerAccessToken}`)
    return res.data
}

/**
 * 编辑标签
 *  @param {String} appId  
 *  @param {Number} id 
 *  @param {String} name
 */
exports.updateTag = async function (appId, id, name) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/update?access_token=${authorizerAccessToken}`, { tag: { id, name } })
    return res.data
}

/**
 * 删除标签
 *  @param {String} appId  
 *  @param {Number} id 
 */
exports.deleteTag = async function (appId, id) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/delete?access_token=${authorizerAccessToken}`, { tag: { id } })
    return res.data
}

/**
 * 获取标签下粉丝列表
 *  @param {String} appId  
 *  @param {String} tagid
 *  @param {String} next_openid 第一个拉取的OPENID，不填默认从头开始拉取
 */
exports.getTagUserList = async function (appId, tagid, next_openid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let obj = { tagid }
    next_openid && (obj.next_openid = next_openid)
    let res = await axios.post(`${this.prefix}tags/get?access_token=${authorizerAccessToken}`, obj)
    return res.data
}

/**
 * 批量为用户打标签
 *  @param {String} appId  
 *  @param {String} tagid
 *  @param {Array} openid_list
 */
exports.batchTags = async function (appId, tagid, openid_list) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/members/batchtagging?access_token=${authorizerAccessToken}`, { openid_list, tagid })
    return res.data
}

/**
 * 批量为用户取消标签
 *  @param {String} appId  
 *  @param {String} tagid
 *  @param {Array} openid_list
 */
exports.batchUnTag = async function (appId, tagid, openid_list) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/members/batchuntagging?access_token=${authorizerAccessToken}`, { openid_list, tagid })
    return res.data
}

/**
 * 获取用户身上的标签列表
 *  @param {String} appId  
 *  @param {String} openid
 */
exports.getUserTags = async function (appId, openid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/getidlist?access_token=${authorizerAccessToken}`, { openid })
    return res.data
}

/**
 * 设置用户备注名
 *  @param {String} appId  
 *  @param {String} openid
 *  @param {String} remark
 */
exports.updateRemark = async function (appId, openid, remark) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}user/info/updateremark?access_token=${authorizerAccessToken}`, { openid, remark })
    return res.data
}

/**
 * 获取公众号的黑名单列表
 *  @param {String} appId  
 *  @param {String} begin_openid
 */
exports.getBlackList = async function (appId, begin_openid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/members/getblacklist?access_token=${authorizerAccessToken}`, { begin_openid })
    return res.data
}

/**
 * 拉黑用户
 *  @param {String} appId  
 *  @param {String} openid_list
 */
exports.batchBlackList = async function (appId, openid_list) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/members/batchblacklist?access_token=${authorizerAccessToken}`, { openid_list })
    return res.data
}

/**
 * 取消拉黑用户
 *  @param {String} appId  
 *  @param {String} openid_list
 */
exports.batchUnBlackList = async function (appId, openid_list) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.prefix}tags/members/batchunblacklist?access_token=${authorizerAccessToken}`, { openid_list })
    return res.data
}