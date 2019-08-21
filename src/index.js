/**
 * 将树形结构进行扁平化处理
 * @param {*Array} params 
 * 
 */
export function traverseTree(params) {
    if (!params) {
        return;
    }
    var stack = [], result = [];
    stack.push(params);
    var tmpNode;
    while (stack.length > 0) {
        tmpNode = stack.pop();
        result.push(tmpNode);
        if (tmpNode.children && tmpNode.children.length > 0) {
            var i = tmpNode.children.length - 1;
            for (i = tmpNode.children.length - 1; i >= 0; i--) {
                stack.push(tmpNode.children[i]);
            }
        }
    }
    result.map(function (item, index, array) {
        delete item.children;
    })
    return result;
}

/**
	 * 检测数字是否越界，如果越界给出提示
	 * @param {*number} num 输入数
	 */
function checkBoundary(num) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        // console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
    }
}
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
    if (num.toString().indexOf('e') === -1) {
        return Number(num.toString().replace('.', ''));
    }
    var dLen = digitLength(num);
    return dLen > 0 ? num * Math.pow(10, dLen) : num;
}
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num) {
    // Get digit length of e
    var eSplit = num.toString().split(/[eE]/);
    var len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
    return len > 0 ? len : 0;
}
/**
 * 精确乘法
 */
function times(num1, num2) {
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    var baseNum = digitLength(num1) + digitLength(num2);
    var leftValue = num1Changed * num2Changed;

    checkBoundary(leftValue);

    return leftValue / Math.pow(10, baseNum);
}

export function judgeBrowser() {
    let userAgent = navigator.userAgent;
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    let browser = {
        isEdge: /Edge/.test(userAgent),
        isOpera: /Opera/.test(userAgent),
        isFirefox: /Firefox/.test(userAgent),
        isBaidu: /bidubrowser/.test(userAgent),
        isSougo: /metasr/.test(userAgent),
        is360: /360se/.test(userAgent),
        isUc: /ucweb/.test(userAgent),
        isLB: /lbbrowser/.test(userAgent),
        isWX: /micromessenger/.test(userAgent),
        isQQ: /qqbrowser/.test(userAgent),
        isChrome: userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1,
        isSafari: userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1,
        isIe: !!window.ActiveXObject || "ActiveXObject" in window,
        isIe7: fIEVersion == 7,
        isIe8: fIEVersion == 8,
        isIe9: fIEVersion == 9,
        isIe10: fIEVersion == 10,
        isIe11: fIEVersion == 11,
    }
    return browser;
}