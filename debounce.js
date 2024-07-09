/**
 * 防抖函数
 * @param {Function} func - 需要防抖处理的函数
 * @param {number} wait - 等待的时间间隔（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} - 防抖处理后的函数
 */
function debounce(func, wait, immediate) {
    let timeout; // 用于存储定时器的ID

    return function () {
        const context = this; // 保存this上下文
        const args = arguments; // 保存参数

        // 延迟执行的函数
        const later = () => {
            timeout = null; // 定时器触发后重置timeout
            if (!immediate) func.apply(context, args); // 如果immediate为false，调用原始函数
        };

        const callNow = immediate && !timeout; // 判断是否需要立即调用
        clearTimeout(timeout); // 清除之前的定时器
        timeout = setTimeout(later, wait); // 设置新的定时器

        if (callNow) func.apply(context, args); // 如果需要立即调用函数，则立即调用
    };
}

// 导出防抖函数
export default debounce;
