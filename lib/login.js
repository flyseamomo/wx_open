const axios = require('axios')
var crypto = require('crypto')

/**
 * code 换取 session_key
 * 详情请见：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1492585163_FtTNA&token=&lang=zh_CN
 * @param {String} appId
 * @param {String} js_code
 */
exports.login = async function (appId, js_code) {
  const componentAccessToken = await this.getComponentAccessToken()
  let res = await axios.get(`https://api.weixin.qq.com/sns/component/jscode2session?appid=${appId}&js_code=${js_code}&grant_type=authorization_code&component_appid=${this.component_appid}&component_access_token=${componentAccessToken}`)
  return res.data
}

/**
 * encryptedData 用户敏感数据解密
 * 详情请见：https://developers.weixin.qq.com/miniprogram/dev/api/open.html#wxgetuserinfoobject
 * @param {String} appId
 * @param {String} sessionKey
 * @param {String} encryptedData
 * @param {String} iv
 */
exports.decryptData = async function (appId, sessionKey, encryptedData, iv) {
  sessionKey = new Buffer(sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')
  try {
    // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== this.appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}