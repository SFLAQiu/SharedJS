/*
**** JavaScript Document
**** SFLYQ
**** 2014-3-19
**** 搜索来源关键字获取
*/
/// <reference path="/JS/jquery.1.9.1.min.js" />
/// <reference path="/JS/SFLYQ.Helper.js" />
if (typeof SFLYQ == 'undefined') {
	var SFLYQ = {};
}
(function () {
	if (!SFLYQ.Referrer) SFLYQ.Referrer = {};
	var sr = SFLYQ.Referrer;
	//父类
	sr.Parent = function () { };
	sr.Parent.prototype.GetReferrerKeyWord = function (urlParameterObj) { }; //根据url参数集合，返回来源关键字字符串
	//工厂类
	sr.Factory = function () {
		this.getReferrerObj = function (domainName) {
			switch (domainName) {
				case baiduReferrer.domainName:
					return baiduReferrer;
				case googleReferrer.domainName:
					return googleReferrer;
				default:
					return null;
			}
			return null;
		}
	};
	sr.DoAllHander = function (roallBack, failureAnalysisBack) {
        /// <summary>执行来源分析和操作</summary>
	    /// <param name="roallBack" type="Object">解析成功执行函数</param>
	    /// <param name="failureAnalysisBack" type="Object">解析失败执行函数(如果无来源也视为解析失败)</param>
	    var keyword=sr.DoAnalysis();
	    if (keyword) {
	        if (roallBack) roallBack(keyword);
	    } else {
	        if (failureAnalysisBack) failureAnalysisBack()
	    }
	};
	sr.DoAnalysis = function () {
        /// <summary>解析操作</summary>
	    var sh = SFLYQ.Helper;
	    var keyword = "";
	    var factoryObj = new sr.Factory();
	    //来源URL是否存在
	    var referrerUrl = decodeURIComponent(document.referrer);
	    if (!referrerUrl) return keyword;
	    //来源域名是否存在,来源URL参数对象
	    var urlObj = sh.StringHander.getUrlObj(referrerUrl);
	    if (!urlObj) return keyword;
	    var domainName = urlObj.Host;
	    if (!domainName) return keyword;
	    var urlParamesObj = sh.StringHander.getParamesObjByUrl(referrerUrl);
	    if (!urlParamesObj) return keyword;
	    //来源域名是否存在
	    var referrerObj = factoryObj.getReferrerObj(domainName);
	    if (!referrerObj) return keyword;
	    //获取当前来源域名对象
	    keyword = referrerObj.GetReferrerKeyWord(urlParamesObj);
	    if (!keyword) return keyword;
	    return keyword;
	};


	//百度
	var baiduReferrer = new sr.Parent();
	baiduReferrer.domainName = "www.baidu.com";
	baiduReferrer.GetReferrerKeyWord = function (urlParameterObj) {
		if (!urlParameterObj) return "";
		if (!urlParameterObj.wd) return "";
		return decodeURI(urlParameterObj.wd);
	};
	//谷歌
	var googleReferrer = new sr.Parent();
	googleReferrer.domainName = "www.google.com.hk";
	googleReferrer.GetReferrerKeyWord = function (urlParameterObj) {
		if (!urlParameterObj) return "";
		if (!urlParameterObj.q) return "";
		return decodeURI(urlParameterObj.q);
	};
})();