const axios = require('axios')

/**
 * 从第三方平台跳转至微信公众平台授权注册页面
 *  @param {String} appid 
 *  @param {String} copy_wx_verify 
 *  @param {String} redirect_uri 
 */
exports.fastRegisterAuth = function (appid, copy_wx_verify, redirect_uri) {
    return `https://mp.weixin.qq.com/cgi-bin/fastregisterauth?appid=${appid}&component_appid=${this.component_appid}&copy_wx_verify=${copy_wx_verify}&redirect_uri=${redirect_uri}`
}


/**
 * 跳转至第三方平台，第三方平台调用快速注册API完成注册
 *  @param {String} appid 
 *  @param {String} ticket 
 */
exports.accountFastRegister = async function (appid, ticket) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)        
    let res = await axios.post(`${this.prefix}account/fastregister?access_token=${authorizerAccessToken}`,{
        ticket
    })
    return res.data
  }

  /**
 * 小程序信息设置相关接口
 * 1 获取帐号基本信息
 *  @param {String} appid 
 */
exports.getAccountBasicInfo = async function (appid) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)        
    let res = await axios.post(`${this.prefix}account/getaccountbasicinfo?access_token=${authorizerAccessToken}`)
    return res.data
  }


/**
 * 小程序信息设置相关接口
 * 2 小程序名称设置及改名
 *  @param {String} appid 
 *  @param {String} nick_name 
 *  @param {String} id_card 
 *  @param {String} license 
 *  @param {String} naming_other_stuff_1 
 *  @param {String} naming_other_stuff_2 
 *  @param {String} naming_other_stuff_3 
 *  @param {String} naming_other_stuff_4 
 *  @param {String} naming_other_stuff_5 
 */
exports.setNickname = async function (appid, nick_name, id_card, license, naming_other_stuff_1, naming_other_stuff_2, naming_other_stuff_3, naming_other_stuff_4, naming_other_stuff_5) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)        
    let res = await axios.post(`${this.wxappPrefix}setnickname?access_token=${authorizerAccessToken}`,{
        nick_name,
        id_card,
        license,
        naming_other_stuff_1,
        naming_other_stuff_2,
        naming_other_stuff_3,
        naming_other_stuff_4,
        naming_other_stuff_5
    })
    return res.data
}


/**
 * 小程序信息设置相关接口
 * 3 小程序改名审核状态查询
 *  @param {String} appid 
 *  @param {String} audit_id 
 */
exports.queryNickname = async function (appid, audit_id){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)        
    let res = await axios.post(`${this.wxappPrefix}api_wxa_querynickname?access_token=${authorizerAccessToken}`,{
        audit_id
    })
    return res.data
}

/**
 * 小程序信息设置相关接口
 * 4 微信认证名称检测
 *  @param {String} appid 
 *  @param {String} nick_name 
 */
exports.checkwxVerifyNickname = async function (appid, nick_name){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)        
    let res = await axios.post(`${this.prefix}wxverify/checkwxverifynickname?access_token=${authorizerAccessToken}`,{
        nick_name
    })
    return res.data
}

/**
 * 小程序信息设置相关接口
 * 5 修改头像
 *  @param {String} appid 
 *  @param {String} head_img_media_id 
 *  @param {float} x1 
 *  @param {float} y1
 *  @param {float} x2 
 *  @param {float} y2 
 */
exports.modifyHeadImage = async function (appid, head_img_media_id, x1, y1, x2, y2){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)        
    let res = await axios.post(`${this.prefix}account/modifyheadimage?access_token=${authorizerAccessToken}`,{
        head_img_media_id,
        x1, 
        y1, 
        x2, 
        y2
    })
    return res.data
}


/**
 * 小程序信息设置相关接口
 * 6 修改功能介绍
 *  @param {String} appid 
 *  @param {String} signature 
 */
exports.modifySignature = async function (appid, signature){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)        
    let res = await axios.post(`${this.prefix}account/modifysignature?access_token=${authorizerAccessToken}`,{
        signature
    })
    return res.data
}

/**
 * 小程序信息设置相关接口
 * 7.1 换绑小程序管理员接口
 *  @param {String} appid 
 *  @param {String} redirect_uri 
 */
exports.modifySignature = function (appid, redirect_uri){    
    return `https://mp.weixin.qq.com/wxopen/componentrebindadmin?appid=${appid}&component_appid=${this.component_appid}&redirect_uri=${redirect_uri}`
}

/**
 * 小程序信息设置相关接口
 * 7.3跳转至第三方平台，第三方平台调用快速注册API完成管理员换绑。
 *  @param {String} appid 
 *  @param {String} taskid 
 */
exports.componentRebindAdmin = async function (appid, taskid){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)            
    let res = await axios.post(`${this.prefix}account/componentrebindadmin?access_token=${authorizerAccessToken}`,{
        taskid
    })
}


/**
 * 类目相关接口
 * 1 获取账号可以设置的所有类目
 *  @param {String} appid 
 */
exports.getAllCategories = async function (appid){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)            
    let res = await axios.get(`${this.wxopenPrefix}getallcategories?access_token=${authorizerAccessToken}`)
}


/**
 * 类目相关接口
 * 2添加类目
 *  @param {String} appid 
 *  @param {String} first 
 *  @param {String} second 
 *  @param {String} key 
 *  @param {String} value 
 */
exports.addCategory = async function (appid, first, second, key, value){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)            
    let res = await axio.post(`${this.wxopenPrefix}addcategory?access_token=${authorizerAccessToken}`,{
        categories:[{
            first,
            second,
            certicates:[{
                key,
                value
            }]
        }]
    })
}

/**
 * 类目相关接口
 * 3删除类目
 *  @param {String} appid 
 *  @param {String} first 
 *  @param {String} second 
 */
exports.deleteCategory = async function (appid ,first, second){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)            
    let res = await axio.post(`${this.wxopenPrefix}deletecategory?access_token=${authorizerAccessToken}`,{
        first, 
        second
    })
}

/**
 * 类目相关接口
 * 4获取账号已经设置的所有类目
 *  @param {String} appid 
 * * * * * * * * * * *  此getcategory 方法名如驼峰式 会与  小程序模块中的 代码管理的方法名冲突  * * * * * * * * * * * 
 */
exports.getcategory = async function (appid){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)            
    let res = await axio.get(`${this.wxopenPrefix}getcategory?access_token=${authorizerAccessToken}`)
}

/**
 * 类目相关接口
 * 5修改类目
 *  @param {String} appid
 *  @param {String} first 
 *  @param {String} second 
 *  @param {String} key 
 *  @param {String} value  
 */
exports.modifyCategory = async function (appid, first, second, key, value){    
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appid)            
    let res = await axio.post(`${this.wxopenPrefix}modifycategory?access_token=${authorizerAccessToken}`,{
        categories:[{
            first,
            second,
            certicates:[{
                key,
                value
            }]
        }]
    })
}