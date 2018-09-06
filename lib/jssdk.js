const axios = require('axios')
const crypto = require('crypto')

/**
 * 微信JS-SDK
 *  @param {String} appId  
 *  @param {String} url
 */
exports.jssdk = async function (appId, url) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let jsapi_ticket = await this.redis.get(`jsapi_ticket${appId}`)
    if (!jsapi_ticket) {
        let result = await axios.get(`${this.prefix}ticket/getticket?access_token=${authorizerAccessToken}&type=jsapi`)
        this.redis.set(`jsapi_ticket${appId}`, result.data.ticket)
        this.redis.expire(`jsapi_ticket${appId}`, 7000)
    }
    let md5sum = crypto.createHash('md5')
    let ran = Math.round(Math.random() * 1000) + ''
    md5sum.update(ran)
    let nonceStr = md5sum.digest('hex')
    let timestamp = parseInt(new Date().getTime() / 1000)
    let string = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
    let sha1 = crypto.createHash('sha1')
    sha1.update(string)
    let signature = sha1.digest('hex')
    let opt = {
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "translateVoice", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
    }
    return opt
}