const axios = require('axios')


/**
 * 为授权的小程序帐号上传小程序代码
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * @param {Number} template_id //模板id 通过获取代码管理
 * @param {String} ext_json   //*ext_json需为string类型，请参考下面的格式*
 * @param {String} user_version
 * @param {String} user_desc
 */
exports.uploadCode = async function (appId, template_id, ext_json, user_version, user_desc) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}commit?access_token=${authorizerAccessToken}`, {
    template_id,
    ext_json,
    user_version,
    user_desc
  })
  return res.data
}


/**
 * 获取体验小程序的体验二维码
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * 指定体验版二维码跳转到某个具体页面（如果不需要的话，则不需要填path参数，可在路径后以“?参数”方式传入参数）
 * @param {String} appId
 * @param {String} path // 具体的路径加参数需要urlencode，比如page/index?action=1编码后得到page%2Findex%3Faction%3D1
 */
exports.getQrcode = async function (appId, path) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}get_qrcode?access_token=${authorizerAccessToken}&path=${path}`)
  return res.data
}



/**
 * 获取授权小程序帐号的可选类目
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 */
exports.getCategory = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}get_category?access_token=${authorizerAccessToken}`, {
    responseType: 'stream'
  })
  return res.data
}

/**
 * 获取小程序的第三方提交代码的页面配置
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 */
exports.getPage = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}get_page?access_token=${authorizerAccessToken}`)
  return res.data
}

/**
 * 将第三方提交的代码包提交审核
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * @param {Array} item_list
 * 例: item_list:[
    {
        "address":"index",
        "tag":"学习 生活",
        "first_class": "文娱",
        "second_class": "资讯",
        "first_id":1,
        "second_id":2,
        "title": "首页"
    }
  ]
 */
exports.submitAudit = async function (appId, item_list) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}submit_audit?access_token=${authorizerAccessToken}`, {
    item_list
  })
  return res.data
}

/**
 * 查询某个指定版本的审核状态
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * @param {String} auditid
 *
 */
exports.getAuditStatus = async function (appId, auditid) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}get_auditstatus?access_token=${authorizerAccessToken}`, {
    auditid
  })
  return res.data
}


/**
 * 查询最新一次提交的审核状态
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 *
 */
exports.getLatestAuditStatus = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}get_latest_auditstatus?access_token=${authorizerAccessToken}`)
  return res.data
}

/**
 * 发布已通过审核的小程序
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 *
 */
exports.codeRelease = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}release?access_token=${authorizerAccessToken}`, {})
  return res.data
}
/**
 * 修改小程序线上代码的可见状态
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * @param {String} action //close为不可见，open为可见
 *
 */
exports.changeVisitStatus = async function (appId, action) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}change_visitstatus?access_token=${authorizerAccessToken}`, {
    action
  })
  return res.data
}

/**
 * 小程序版本回退
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 *
 */
exports.revertCodeRelease = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}revertcoderelease?access_token=${authorizerAccessToken}`)
  return res.data
}



/**
 * 查询当前设置的最低基础库版本及各版本用户占比
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 *
 */
exports.getWeappSupportVersion = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}getweappsupportversion?access_token=${authorizerAccessToken}`)
  return res.data
}

/**
 * 设置最低基础库版本（
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * @param {String} version
 *
 */
exports.setWeappSupportVersion = async function (appId, version) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}setweappsupportversion?access_token=${authorizerAccessToken}`, {
    version
  })
  return res.data
}


/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * 1) 增加或修改二维码规则
 * @param {String} appId
 * @param {String} prefix
 * @param {String} permit_sub_rule
 * @param {String} path
 * @param {String} open_version
 * @param {Array} debug_url
 * @param {Number} is_edit
 *
 */
exports.qrcodeJumpAdd = async function (appId, prefix, permit_sub_rule, path, open_version, debug_url, is_edit) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}qrcodejumpadd?access_token=${authorizerAccessToken}`,{
    prefix,
    permit_sub_rule,
    path,
    open_version,
    debug_url,
    is_edit
  })
  return res.data
}

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * 2) 获取已设置的二维码规则
 * @param {String} appId
 *
 */
exports.qrcodeJumpGet = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}qrcodejumpget?access_token=${authorizerAccessToken}`)
  return res.data
}

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * 3)获取校验文件名称及内容
 * @param {String} appId
 */
exports.qrcodeJumpDownload = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}qrcodejumpdownload?access_token=${authorizerAccessToken}`)
  return res.data
}

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * 4)删除已设置的二维码规则
 * @param {String} appId
 * @param {String} prefix
 */
exports.qrcodeJumpDelete = async function (appId, prefix) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}qrcodejumpdelete?access_token=${authorizerAccessToken}`, {
    prefix
  })
  return res.data
}

/**
 * 设置小程序“扫普通链接二维码打开小程序”能力
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * 5)发布已设置的二维码规则
 * @param {String} appId
 * @param {String} prefix
 */
exports.qrcodeJumpPublish = async function (appId, prefix) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxopenPrefix}qrcodejumppublish?access_token=${authorizerAccessToken}`, {
    prefix
  })
  return res.data
}


/**
 * 小程序审核撤回
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 */

exports.undoCodeAudit = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}undocodeaudit?access_token=${authorizerAccessToken}`)
  return res.data
}

/**
 * 小程序分阶段发布
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * @param {Number} gray_percentage
 * 1）分阶段发布接口
 */
exports.grayRelease = async function (appId, gray_percentage) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.post(`${this.wxappPrefix}grayrelease?access_token=${authorizerAccessToken}`, {
    gray_percentage
  })
  return res.data
}

/**
 * 小程序分阶段发布
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * 2）取消分阶段发布
 */
exports.revertGrayRelease = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}revertgrayrelease?access_token=${authorizerAccessToken}`)
  return res.data
}

/**
 * 小程序分阶段发布
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1489140610_Uavc4&token=&lang=zh_CN
 * @param {String} appId
 * 3）查询当前分阶段发布详情
 */
exports.getGrayReleasePlan = async function (appId) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
  let res = await axios.get(`${this.wxappPrefix}getgrayreleaseplan?access_token=${authorizerAccessToken}`)
  return res.data
}