/// 处理字符串的操作
export class StringUtils {
    /*
    Usage example: StringFormatUtils.format('%s %s', 'Hello', 'World!')
     */
    public static format(...args: any): string {
        const str: string = args[0];
        let i: number = 1;
        return str.replace(/%((%)|s|d|02d|.2f%)/g, function (m) {
            // m is the matched format, e.g. %s, %d
            var val = null;
            // if (m[2]) {
            //     val = m[2];
            // } else {
            val = args[i];
            // A switch statement so that the formatter can be extended. Default is %s
            switch (m) {
                case '%02d':
                    val = parseInt(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    val = (Array(2).join('0') + val).slice(-2);
                    break;
                case '%.2f%':
                    //根据配置中 %.2f%%
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    val = val.toFixed(2);
                    break;
                case '%d':
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;
                case '%%':
                    //根据配置中 %%
                    val = '%';
                    break;
            }
            i++;
            // }
            return val;
        });
    }

    static getColorText(msg, color): string {
        return this.format("<font color='%s'>%s</font>", color, msg);
    }
    //增加文本超链接
    static getHrefText(szEvent: string, msg: string, color: string): string {
        if (StringUtils.isNullOrEmpty(color)) {
            return "<font href='" + szEvent + "'>" + msg + "</font>";
        } else {
            return "<font color='" + color + "' href='" + szEvent + "'>" + msg + "</font>";
        }
    }

    /** 将数字转化为带单位的文本
     * @num 需要改变的数据
     * @point  显示几位小数
     * @isArt 是否艺术字
     * @haveZero 是否需要.0
    */
    static transNumber(numL: number, point: number, isArt: boolean = false, haveZero: boolean = false) {
        if (!point) {
            point = 0;
        }
        let num = 0;
        let numStr = '';
        if (numL) {
            num = numL;
            numStr = numL.toString();
        } else {
            num = numL;
            numStr = num.toString();
        }
        point = point - 1;
        let numLength = numStr.length;
        if (numLength < 5) {
            return numStr;
        }

        //汉字单位
        let uintInHan = "";
        //最终返回结果
        let resNum = "";
        //小数点及其后位数
        let decimal = "";
        //该单位对应的10的次方数
        let tenPowCount = 0;
        //截取小数点后部分的开始下标
        let decimalIndex = 0;

        if (numLength >= 17) {
            decimalIndex = numLength - 15;
            uintInHan = isArt ? "wz" :
                '万兆';
            tenPowCount = 16;
        } else if (numLength >= 16) {
            decimalIndex = numLength - 14;
            uintInHan = isArt ? "qz" :
                '千兆';
            tenPowCount = 15;
        } else if (numLength >= 13) {
            decimalIndex = numLength - 11;
            uintInHan = isArt ? "z" :
                '兆';
            tenPowCount = 12;
        } else if (numLength >= 12) {
            decimalIndex = numLength - 10;
            uintInHan = isArt ? "qy" :
                '千亿';
            tenPowCount = 11;
        } else if (numLength >= 9) {
            decimalIndex = numLength - 7;
            uintInHan = isArt ? "y" :
                '亿';
            tenPowCount = 8;
        } else if (numLength >= 5) {
            decimalIndex = numLength - 3;
            uintInHan = isArt ? "w" :
                '万';
            tenPowCount = 4;
        }

        if (point != -1) {
            decimal = numStr.substring(decimalIndex - 1, decimalIndex + point);
            if (parseInt(decimal) == 0) {
                if (haveZero) {
                    decimal = ".0"
                    for (let index = 0; index < point; index++) {
                        decimal += "0";
                    }
                }
                else {
                    decimal = '';
                }

            } else {
                decimal = "." + decimal;//this.format(".%s", decimal);
            }
        }

        resNum = Math.floor(num / Math.pow(10, tenPowCount)) + decimal + uintInHan;//this.format("%d%sw", Math.floor(num / 10000), decimal);
        return resNum;

        // if (numStr.length > 8) {
        //     let decimal = '';
        //     if (point != -1) {
        //         decimal = numStr.substring(numStr.length - 7, numStr.length - 7 + point + 1);
        //         if (parseInt(decimal) == 0) {
        //             decimal = '';
        //         } else {
        //             decimal = "." + decimal;//this.format(".%s", decimal);
        //         }
        //     }

        //     let resNum = Math.floor(num / 100000000) + decimal + 'y';//this.format("%d%sy", Math.floor(num / 100000000), decimal);
        //     return resNum;
        // }

        // if (numStr.length > 5) {
        //     let decimal = '';
        //     if (point != -1) {
        //         decimal = numStr.substring(numStr.length - 3, numStr.length - 3 + point + 1);
        //         if (parseInt(decimal) == 0) {
        //             decimal = '';
        //         } else {
        //             decimal = "." + decimal;//this.format(".%s", decimal);
        //         }
        //     }

        //     let resNum = Math.floor(num / 10000) + decimal + 'w';//this.format("%d%sw", Math.floor(num / 10000), decimal);
        //     return resNum;
        // }
    }

    static readonly CFG_UI_WORD_COLOR_REG = new RegExp('[A-Z0-9a-z]{6,8}', "g");
    static readonly CFG_UI_WORD_COLOR_PREFIX_REG = new RegExp('</color>', "g");
    static readonly CFG_UI_WORD_WRAP_REG = new RegExp('\\\\n', "g");
    static readonly CFG_UI_WORD_NOTICE = new RegExp('\\r\\n', "g");
    static readonly CFG_UI_WORD_FONT_REG = new RegExp('<size=[0-9]{2}>', "g");
    static readonly CFG_UI_WORD_FONT_MID_REG = new RegExp('[0-9]{2}', "g");
    static readonly CFG_UI_WORD_FONT_PREFIX_REG = new RegExp('</size>', "g");


    static _numMap: Array<string> = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九'
    ];
    /**
        * 将一个0~9999的数字转换为汉字String
        * 大于10000请用getChineseNumber()
        */
    static getSimpleChineseNumber(num: number): string {
        var str: string = "";
        num = num % 10000;

        if (num >= 1000) {
            str += this._numMap[Math.floor(num / 1000)] + '千';
        }

        if (num % 1000 / 100 >= 1) {
            str += this._numMap[Math.floor(num % 1000 / 100)];
            str += '百';
        } else if (str && num % 100 / 10 >= 1) {
            str += '零';
        }

        if (num % 100 / 10 >= 1) {
            if (str || Math.floor(num % 100 / 10) > 1) {
                str += this._numMap[Math.floor(num % 100 / 10)];
            }
            str += '十';
        } else if (str && num % 10 >= 1) {
            str += '零';
        }

        if (num % 10 >= 1) {
            str += this._numMap[Math.floor(num % 10)];
        } else if (!str) {
            str += '零';
        }

        return str;
    }

    /**
     * 
     * @param value 
     * @returns 该字符串是否是空或者null
     */
    static isNullOrEmpty(value: string): boolean {
        return value == null || value == "";
    }

    static NumberShowFormat(number: number, sep: number, item3D: boolean = false): string {
        if (!isFinite(number) || number < 0) {
            return "";
        }
        let tempNum = '0';
        let Digit: string;
        if (number >= 10000 && number < 100000000) {
            if (number / 10000 > Math.floor(number / 10000)) {
                tempNum = (number / 10000).toFixed(sep);
            } else {
                tempNum = Math.floor(number / 10000).toString();
            }
            Digit = item3D ? 'w' :
                '万';
            return tempNum + Digit;
        } else if (number >= 100000000) {
            if (number / 100000000 > Math.floor(number / 100000000)) {
                tempNum = (number / 100000000).toFixed(sep);
            } else {
                tempNum = Math.floor(number / 100000000).toString();
            }
            Digit = item3D ? 'y' :
                '亿';
            return tempNum + Digit;
        }
        return number + '';

    }

    // static tempNumbers = [];
    static str = '0-.';
    static readonly NUMBER_0 = StringUtils.str.charCodeAt(0);
    static readonly NUMBER_9 = StringUtils.str.charCodeAt(0) + 9;
    static readonly MINUS_SIGN = StringUtils.str.charCodeAt(1);
    static readonly DOT = StringUtils.str.charCodeAt(2);

    /**
    *@param str string 需要分隔成整数的字符串
    *@param beginIndex number 字符串开始位置，默认为0
    *@param endIndex number 字符串结束位置，默认为字符串长度
    *@return table 返回数组，注意返回值是一个共享table，每次调用这个函数会把之前的值覆盖掉
    */
    static SplitToNumbers(str: String, beginIndex: number = null, endIndex: number = null) {
        let newNumbers = [];
        let index = 0;
        let current = 0;
        let dot = 0;
        let minusSign = false;
        for (let i = (beginIndex || 0), l = (endIndex || str.length); i < l; i++) {
            let b = str.charCodeAt(i);
            if (b == StringUtils.MINUS_SIGN && !current) {
                minusSign = true;
            } else if (b == StringUtils.DOT) {
                dot = 0.1;
            } else if (b >= StringUtils.NUMBER_0 && b <= StringUtils.NUMBER_9) {
                b = b - StringUtils.NUMBER_0;
                if (dot) {
                    current = current ? current + b * dot : b * dot;
                    dot = dot * 0.1;
                } else {
                    current = current ? current * 10 + b : b;
                }
            } else {
                if (current) {
                    newNumbers[index] = minusSign ? - current : current;
                    index = index + 1;
                    current = 0;
                }
                minusSign = false;
                dot = 0;
            }
        }

        if (current) {
            newNumbers[index] = minusSign ? - current : current;
            index = index + 1;
        }

        return newNumbers;
    }

    private static attrToArrDic: Map<string, number[]> = new Map;
    /**
     * #号切割字符串 如果字符串切割过了就直接返回
     * # *注意* 千万不要修改返回的数组
     */
    public static attrToArr(attr: string): Array<number> {
        if (!this.attrToArrDic.has(attr)) {
            var result: Array<number> = [];
            if (attr != "-1") {
                var list: Array<string> = attr.split("#");
                for (var i: number = 0; i < list.length; i++) {
                    result.push(parseInt(list[i]));
                }
            }
            this.attrToArrDic.set(attr, result);

        }
        return this.attrToArrDic.get(attr);
    }

    private static attrToArrDic1: Map<string, string[]> = new Map;
    /**
     * #号切割字符串 如果字符串切割过了就直接返回
     * # *注意* 千万不要修改返回的数组
     */
    public static attrToArr1(attr: string): Array<string> {
        if (!this.attrToArrDic1.has(attr)) {
            var result: Array<string> = [];
            if (attr != "-1") {
                var list: Array<string> = attr.split("#");
                for (var i: number = 0; i < list.length; i++) {
                    result.push(list[i]);
                }
            }
            this.attrToArrDic1.set(attr, result);

        }
        return this.attrToArrDic1.get(attr);
    }


    /**
     * 按指定长度分割字符串，保持HTML标签完整并保持颜色标签
     * @param text 要分割的文本
     * @param maxLength 每段最大长度
     * @returns 分割后的字符串数组
     */
    public static splitHtmlText(text: string, maxLength: number): string[] {
        // 替换转义的换行符
        text = text.replace(/\\n/g, '\n');

        const result: string[] = [];
        let currentText = '';
        let inHtmlTag = false;
        let currentLength = 0;
        let activeColorTag = ''; // 存储当前生效的颜色标签

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // 处理HTML标签
            if (char === '<') {
                inHtmlTag = true;
                let tagBuffer = char;

                // 收集完整的标签内容
                while (i + 1 < text.length && text[i + 1] !== '>') {
                    i++;
                    tagBuffer += text[i];
                }
                if (i + 1 < text.length) {
                    i++;
                    tagBuffer += '>';
                }

                // 检查是否是<br>标签
                if (tagBuffer.toLowerCase() === '<br>' || tagBuffer.toLowerCase() === '<br/>') {
                    // 像处理换行符一样处理<br>标签
                    if (currentText) {
                        if (activeColorTag && !currentText.endsWith('</font>')) {
                            currentText += '</font>';
                        }
                        result.push(currentText);
                        currentText = activeColorTag; // 新行继承颜色标签
                        currentLength = 0;
                    }
                    inHtmlTag = false;
                    continue;
                }

                // 检查是否是颜色标签
                if (tagBuffer.startsWith('<font color=')) {
                    activeColorTag = tagBuffer;
                } else if (tagBuffer === '</font>') {
                    activeColorTag = '';
                }

                currentText += tagBuffer;
                inHtmlTag = false;
                continue;
            }

            // 处理换行符
            if (char === '\n') {
                if (currentText) {
                    if (activeColorTag && !currentText.endsWith('</font>')) {
                        currentText += '</font>';
                    }
                    result.push(currentText);
                    currentText = activeColorTag; // 新行继承颜色标签
                    currentLength = 0;
                }
                continue;
            }

            // 普通字符处理
            if (!inHtmlTag) {
                currentText += char;
                if (this.isChinese(char)) {
                    currentLength += 3;
                } else {
                    currentLength += 2;
                }

                // 达到最大长度时分割
                if (currentLength >= maxLength) {
                    if (activeColorTag && !currentText.endsWith('</font>')) {
                        currentText += '</font>';
                    }
                    result.push(currentText);
                    currentText = activeColorTag; // 新段继承颜色标签
                    currentLength = 0;
                }
            }
        }

        // 添加剩余文本
        if (currentText) {
            if (activeColorTag && !currentText.endsWith('</font>')) {
                currentText += '</font>';
            }
            result.push(currentText);
        }

        return result;
    }

    private static isChinese(str) {
        const chineseRegex = /[\u4e00-\u9fa5\u3000-\u303F\uFF00-\uFFEF]/;
        return chineseRegex.test(str);
    }

    private static serialNumber: Array<string> = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"]
    public static getSerialNumber(number) {
        if (number > 10 || number <= 0) {
            return number;
        }
        return this.serialNumber[number - 1];
    }
}
