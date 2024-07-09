/**
 * 创建一个节流函数，该函数在指定的时间间隔内只会执行一次。
 * @param {Function} func - 需要节流的函数
 * @param {number} wait - 时间间隔（毫秒）
 * @returns {Function} - 节流后的函数，包含一个 cancel 方法用于取消节流
 */
function throttle(func, wait) {
    let timeout = null;  // 定时器
    let lastArgs = null;  // 上一次调用的参数
    let lastContext = null;  // 上一次调用的上下文
    let lastCallTime = 0;  // 上一次调用的时间

    // 执行函数
    const invokeFunc = () => {
        func.apply(lastContext, lastArgs);  // 执行函数并传递参数和上下文
        lastCallTime = Date.now();  // 更新上一次调用时间
        timeout = null;  // 清空定时器
    };

    // 节流后的函数
    const throttled = function(...args) {
        const now = Date.now();  // 当前时间
        const remainingTime = wait - (now - lastCallTime);  // 距离下次调用的时间

        lastContext = this;  // 保存当前上下文
        lastArgs = args;  // 保存当前参数

        if (remainingTime <= 0 || remainingTime > wait) {
            if (timeout) {
                clearTimeout(timeout);  // 清除定时器
                timeout = null;
            }
            invokeFunc();  // 立即执行函数
        } else if (!timeout) {
            timeout = setTimeout(invokeFunc, remainingTime);  // 设置定时器
        }
    };

    // 取消节流
    throttled.cancel = () => {
        if (timeout) {
            clearTimeout(timeout);  // 清除定时器
        }
        lastCallTime = 0;  // 重置上一次调用时间
        timeout = null;  // 清空定时器
        lastArgs = null;  // 清空参数
        lastContext = null;  // 清空上下文
    };

    return throttled;
}

export default throttle;
