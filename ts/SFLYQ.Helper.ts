
interface Date {
    Format(fms: string): string;
}
module SFLYQ {
    /**帮助类*/
    export class Helper {
        /**
         * 判断文件格式
         * @allowExtensionArr string[] 允许图片格式字符串数组,如：['jpg','png']
         * @filePath string 件路径名，包括文件名
         */
        static checkFileExtension(allowExtensionArr: string[], filePath: string): boolean {
            if (!filePath) return false;
            for (var i = 0; i < allowExtensionArr.length; i++) {
                var reStr = "^.*\." + allowExtensionArr[i] + "$";
                var re = RegExp(reStr);
                if (filePath.toLowerCase().match(re) != null) return true;
            }
            return false;
        }
        /**
         * 清理字符串空格
         * @str string  字符串
         */
        static clearSpace(str: string): string {
            return str.replace(/\s/g, "");
        }

        /**
         * 数字字符串，数位用','隔开。如得到字符串"3,444,567,123
         * num number 数值
         */
        static numToTally(num: number) {
            var numStr = String(num);
            if (!numStr) return numStr;
            var re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
            return numStr.replace(re, "$1,");
        }
        /** 
         * 通过URL解析获取URL对象
         * URL string URL地址
        */
        static getUrlParameters(url: string) {
            if (!url) return null;
            var _fields = {
                'Username': 4,
                'Password': 5,
                'Port': 7,
                'Protocol': 2,
                'Host': 6,
                'Pathname': 8,
                'URL': 0,
                'Querystring': 9,
                'Fragment': 10
            };
            var values = {};
            var regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
            if (typeof url != 'undefined') {
                for (var f in _fields) {
                    values[f] = '';
                }
                var r = regex.exec(url);
                if (!r) return; // throw "DPURLParser::parse -> Invalid URL";
                for (var f in _fields) if (typeof r[_fields[f]] != 'undefined') {
                    values[f] = r[_fields[f]];
                }
            }
            return values;
        }
        /**
         * 获取URL参数对象
         * url string url地址 
         */
        static getUrlParames(url: string) {
            if (!url) return null;
            var indexNum = url.indexOf("?");
            if (indexNum <= 0) return null;
            var paramesStr = url.substring(indexNum + 1, url.length)
            var pattern = /([^&]+)=([^&]+)/g;//定义正则表达式
            var parames = {};//定义数组
            if (paramesStr.match(pattern).length <= 0) return null;
            paramesStr.replace(pattern, (a, b, c) => parames[b] = c);
            return parames;
        }
        /**
         * 获取输入框的名值对象 
         * inputJqs JQuery 
         */
        static getInputObj(inputJqs: JQuery) {
            if (!inputJqs) return null;
            var parameObj = {};
            var lengthNum = inputJqs.length;
            for (var i = 0; i < lengthNum; i++) {
                var itemJq = inputJqs.eq(i)
                if (!itemJq) continue;
                var name = itemJq.attr("name");
                var value = itemJq.val();
                if (!name) continue;
                parameObj[name] = value;
            }
            return parameObj;
        }
        /**
         * 根据表单提交的标签集合返回提交的名值数据对象
         * tagJqs JQuery form表单输入框jquery 对象
         */
        static getFormValue(tagJqs: JQuery) {
            var parames = {};
            if (!tagJqs || tagJqs.length <= 0) return parames;
            for (var i = 0; i < tagJqs.length; i++) {
                var itemJq = $(tagJqs[i]);
                var tagName = itemJq[0].tagName;
                var name = itemJq.attr("name");
                var typeName = itemJq.attr("type");
                if (!name) continue;
                if (parames[name]) continue;
                if (tagName == "INPUT" && typeName == "radio") {
                    var radiosJq = tagJqs.filter("[type='radio'][name='" + name + "']");
                    if (radiosJq == null || radiosJq.length <= 0) continue;
                    var value = radiosJq.filter(":checked").val();
                    parames[name] = value;
                    //tagJqs.remove(radiosJq);
                } else if ((tagName == "INPUT" || tagName == "TEXTAREA")) {
                    var value = itemJq.val();
                    parames[name] = value;
                } else if (tagName == "SELECT") {
                    var selOption = itemJq.find("option:selected");
                    var value = selOption.val();
                    parames[name] = value;
                }
            }
            return parames;
        }

    }

    /**拓展帮助类 */
    export class Extend {
        ini(): void {
            Date.prototype.Format = function(fmt: string) {
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }
    }
}

(new SFLYQ.Extend().ini())


