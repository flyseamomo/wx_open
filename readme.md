本包是微信第三方开发者开发小程序和微信公众号用sdk包，封装了所有的第三方平台小程序和微信公众号用api

## 主要包含以下几个模块
（小程序）
- 代码模板
- 修改服务器地址
- 成员管理
- 代码管理
- 微信登录
- 模板设置
- 基础信息设置
- 开放平台账号管理
- 插件管理

（公众号）
- 代公众号发起网页授权
- jssdk
- 菜单管理
- 带参数二维码
- 微信登录
- 获取媒体文件
- 数据统计
- 客服消息和模板消息

（通用）
- 消息加解密

本包依赖redis数据库，用来存储各种token数据

## 使用方法：
```js
//1.引入及初始化

var wxapp_open = require('wxapp_open')
var API = new wxapp_open(componentAppid, componentAppSecret, componentKey, componentToken, redisConfig)

//2.设置ComponentVerifyTicket（微信服务器每10分钟推送一次，在使用API之前必须设置）
API.setComponentVerifyTicket(ComponentVerifyTicket)

//3.获取pre_auth_code 及授权小程序（公众号）信息
var pre_auth_code = await API.getPreAuthCode()
let mp_info = await API.auth(auth_code)

//4.调用api
//设置小程序业务域名，appId为要设置的小程序appid
let res = await API.setDomain(appId, action, requestdomain, wsrequestdomain, uploaddomain, downloaddomain)
```
