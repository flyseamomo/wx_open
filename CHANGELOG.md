# wxapp_open 项目更新日志

### v1.0.7

- [Optimize] createQrcode[创建参数二维码]方法不再负责请求图片文件内容，只会返回图片的地址。需要进一步处理的使用者，请自行完成下载处理。
- [Optimize] createQrcode[创建参数二维码]方法会对传入的 action_name 参数进行校验，必须是 ["QR_SCENE", "QR_STR_SCENE", "QR_LIMIT_SCENE", "QR_LIMIT_STR_SCENE"] 中的一个，否则会抛出错误，详情请阅读[官方文档](https://mp.weixin.qq.com/wiki?action=doc&id=mp1443433542)。