const axios = require('axios')

/**
 * 获取媒体文件
 * @param {String} appId
 * @param {String} mediaId
 */
exports.getMedia = async function (appId, mediaId) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.get(`http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=${authorizerAccessToken}&&media_id=${mediaId}`, { responseType: 'stream' })
    let filename = 'A_' + new Buffer(String(Math.round(new Date().getTime() / 1000))).toString('base64') + new Buffer(String(Math.round(Math.random() * 100))).toString('base64')
    let filetype = res.headers['content-type'].substring(res.headers['content-type'].indexOf('/') + 1, res.headers['content-type'].length)
    return { 
        file: res.data,
        filename,
        filetype
    }
}