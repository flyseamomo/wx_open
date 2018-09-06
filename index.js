const API = require('./lib/component')

/**
 *******************  *********代小程序实现业务*********  *******************
*/

// 代码模板
API.mixin(require('./lib/codeTemplate'))
// 修改服务器地址
API.mixin(require('./lib/modifyDomain'))
// 成员管理
API.mixin(require('./lib/member'))
// 代码管理
API.mixin(require('./lib/codeManage'))
// 微信登录
API.mixin(require('./lib/login'))
// 模板设置
API.mixin(require('./lib/template'))
// 基础信息设置
API.mixin(require('./lib/infoSetting'))
// 开放平台账号管理
API.mixin(require('./lib/openAccountManage'))
// 插件管理
API.mixin(require('./lib/pluginManage'))
/*
* 数据分析接口
* 详情地址 https://developers.weixin.qq.com/miniprogram/dev/api/analysis.html
*/
API.mixin(require('./lib/dataAnalysis'))

/**
 *******************  *********代公众号实现业务*********  *******************
*/

// 代公众号调用接口 
API.mixin(require('./lib/clearQuota'))
//代公众号发起网页授权
API.mixin(require('./lib/authorization'))
//用户管理
API.mixin(require('./lib/userManage'))
//卡券强授权
API.mixin(require('./lib/cardVoucher'))
//小程序管理权限集
API.mixin(require('./lib/wxamplink'))
//复用公众号主体快速注册小程序
API.mixin(require('./lib/registeredApplet'))
//jssdk
API.mixin(require('./lib/jssdk'))
//菜单管理
API.mixin(require('./lib/menuManage'))
//二维码
API.mixin(require('./lib/qrcode'))
//获取媒体文件
API.mixin(require('./lib/mediaManage'))
// 发送客服消息和模板消息
API.mixin(require('./lib/sendMsg'))

/**
 *******************  *********第三方平台通用模块*********  *******************
*/
// 加解密模板
API.mixin(require('./lib/crypt'))


module.exports = API