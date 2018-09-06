const axios = require('axios')

/**
 * 概况趋势
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 20170313
 */
exports.getweAnalySisAppidDailySummaryTrend = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappiddailysummarytrend?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }

/**
 * 访问分析 日趋势
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 限定查询一日数据
 */
exports.getweAnalysisAppidDailyVisitTrend = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappiddailyvisittrend?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }


/**
 * 访问分析 周趋势
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 限定查询一周数据
 */
exports.getweAnalysisAppidWeeklyVisitTrend = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappidweeklyvisittrend?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }

/**
 * 访问分析 月趋势
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 限定查询一月数据
 */
exports.getweAnalysisAppidMonthVisitTrend = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappidmonthlyvisittrend?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }


/**
 * 访问分布
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 20170313
 */
exports.getweAnalysisAppidVisitDistribution = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappidvisitdistribution?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }

/**
 * 访问留存 日留存
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 20170313
 */
 exports.getweAnalysisAppidDailyRetaininfo = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappiddailyretaininfo?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }


/**
 * 访问留存 周留存
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 20170313
 */
exports.getweAnalysisAppidWeeklyRetaininfo = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappidweeklyretaininfo?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }

/**
 * 访问留存 月留存
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 20170313
 */
exports.getweAnalysisAppidMonthlyRetaininfo = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappidmonthlyretaininfo?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }

/**
 * 访问页面
 * @param {String} appId
 * @param {String} begin_date 20170313
 * @param {String} end_date 20170313
 */
exports.getweAnalysisAppidVisitPage = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappidvisitpage?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }


/**
 * 用户画像
 * @param {String} appId
 * @param {String} begin_date 2017-06-11
 * @param {String} end_date 2017-06-17
 */
exports.getweAnalysisAppidUserportrait = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getweanalysisappiduserportrait?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
  }

/**
* 获取用户增减数据
* @param {String} appId
* @param {String} begin_date 2017-06-11
* @param {String} end_date 2017-06-17
*/
exports.getUserSummary = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getusersummary?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
}

/**
* 获取累计用户数据
* @param {String} appId
* @param {String} begin_date 2017-06-11
* @param {String} end_date 2017-06-17
*/
exports.getUserCumulate = async function (appId, begin_date, end_date) {
    const authorizerAccessToken = await this.getAuthorizerAccessToken(appId)
    let res = await axios.post(`${this.datacubePrefix}getUserCumulate?access_token=${authorizerAccessToken}`, {
        begin_date,
        end_date
    })
    return res.data
}