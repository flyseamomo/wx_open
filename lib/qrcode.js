const axios = require("axios");

/**
 * 获取小程序码(适用于需要的码数量较少的业务场景, 永久有效，数量限制)
 * @param {String} appId
 * @param {String} path
 * @param {Number} width
 * @param {Boolean} auto_color
 * @param {Object} line_color
 * @param {Boolean} is_hyaline
 */
exports.getWxaCode = async function(
  appId,
  path,
  width,
  auto_color,
  line_color,
  is_hyaline
) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId);
  let res = await axios.post(
    `${this.wxappPrefix}getwxacode?access_token=${authorizerAccessToken}`,
    {
      path,
      width,
      auto_color,
      line_color,
      is_hyaline
    },
    { responseType: "stream" }
  );
  return res.data;
};

/**
 * 获取小程序码(适用于需要的码数量极多的业务场景, 永久有效，数量暂无限制)
 * @param {String} appId
 * @param {String} scene
 * @param {String} page
 * @param {Number} width
 * @param {Boolean} auto_color
 * @param {Object} line_color
 * @param {Boolean} is_hyaline
 */
exports.getWxaCodeUnLimit = async function(
  appId,
  scene,
  page,
  width,
  auto_color,
  line_color,
  is_hyaline
) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId);
  let res = await axios.post(
    `${
      this.wxappPrefix
    }getwxacodeunlimit?access_token=${authorizerAccessToken}`,
    {
      scene,
      page,
      width,
      auto_color,
      line_color,
      is_hyaline
    },
    { responseType: "stream" }
  );
  return res.data;
};

/**
 * 获取小程序二维码(适用于需要的码数量较少的业务场景, 永久有效，数量限制)
 * @param {String} appId
 * @param {String} path
 * @param {Number} width
 */
exports.createWxaQrcode = async function(appId, path, width) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId);
  let res = await axios.post(
    `${
      this.prefix
    }wxaapp/createwxaqrcode?access_token=${authorizerAccessToken}`,
    {
      path,
      width
    },
    { responseType: "stream" }
  );
  return res.data;
};

/**
 * 创建二维码(公众号)
 * @param {String} appId
 * @param {String} action_name
 * @param {String} scene_str
 * @param {Number} expire_seconds
 * @returns {String} qrcodeImgUrl
 */
exports.createQrcode = async function(
  appId,
  action_name,
  scene_str,
  expire_seconds
) {
  const authorizerAccessToken = await this.getAuthorizerAccessToken(appId);
  const ACTION_NAME_MAP = {
    QR_SCENE: "QR_SCENE",
    QR_STR_SCENE: "QR_STR_SCENE",
    QR_LIMIT_SCENE: "QR_LIMIT_SCENE",
    QR_LIMIT_STR_SCENE: "QR_LIMIT_STR_SCENE"
  };
  if (!ACTION_NAME_MAP[action_name]) {
    throw new Error(
      'action_name is not valid, should be one of ["QR_SCENE", "QR_STR_SCENE", "QR_LIMIT_SCENE", "QR_LIMIT_STR_SCENE"]'
    );
  }
  let obj = {
    action_name,
    action_info: { scene: { scene_str } }
  };
  expire_seconds && (obj.expire_seconds = expire_seconds);
  let res = await axios.post(
    `${this.prefix}qrcode/create?access_token=${authorizerAccessToken}`,
    obj
  );
  const { ticket } = res.data;
  const qrCodeImgUrlPrefix = "https://mp.weixin.qq.com/cgi-bin/showqrcode";
  return `${qrCodeImgUrlPrefix}?ticket=${encodeURIComponent(ticket)}`;
};
