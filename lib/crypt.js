const crypto = require('crypto')
const XMLParser = require('xml2js')
const buildXML = new XMLParser.Builder({ rootName: 'xml', cdata: true, headless: true, renderOpts: { indent: ' ', pretty: 'true' } })

/**
 * 微信返回消息加密（一般用于微信事件回复非success消息,比如被动回复，常用于全网发布测试用途）
 * @param {String} Message
 */
exports.encrypt = function (Message){
    let result = {}
    
    //消息加密
    const key = new Buffer(this.key + '=', 'base64')
    let random16 = crypto.pseudoRandomBytes(16)
    let xml = buildXML.buildObject(Message)
    let msg = new Buffer(xml)
    let msgLength = new Buffer(4)
    msgLength.writeUInt32BE(msg.length, 0)
    let corpId = new Buffer(this.component_appid)
    let raw_msg = Buffer.concat([random16, msgLength, msg, corpId]);
    let cipher = crypto.createCipheriv('aes-256-cbc', key, key.slice(0, 16))
    let cipheredMsg = Buffer.concat([cipher.update(raw_msg), cipher.final()])
    result.Encrypt = cipheredMsg.toString('base64')

    //随机字符串和时间戳
    result.Nonce = parseInt((Math.random() * 100000000000), 10)
    result.TimeStamp = parseInt(new Date().getTime() / 1000)

    //生成签名
    let signature = [this.token, result.TimeStamp, result.Nonce, result.Encrypt].sort().join('')
    let sha1 = crypto.createHash("sha1")
    sha1.update(signature)
    result.MsgSignature = sha1.digest("hex")

    return buildXML.buildObject(result)
}

/**
 * 微信推送消息解密
 * @param {String} xml 微信推送xml消息体
 */

exports.decrypt = function (xml) {
    return new Promise((resolve, reject) => {
        parser.parseString(xml, (err, result) => {
            let key = new Buffer(this.key + '=', 'base64')
            let decipher = crypto.Decipheriv('aes-256-cbc', key, key.slice(0, 16))
            // 使用BASE64对密文进行解码，然后AES-CBC解密
            decipher.setAutoPadding(false)
            let plain_text = decipher.update(result.xml.Encrypt[0], 'base64', 'utf8') + decipher.final('utf8')
            let pad = plain_text.charCodeAt(plain_text.length - 1)
            plain_text = plain_text.slice(20, -pad - 18)
            parser.parseString(plain_text, (err, results) => {
                resolve(results.xml)
            })
        })
    })
}