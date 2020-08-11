/*
 * @FilePath: \深圳稽查局项目\web\src\utils\debounce.js
 * @Author: huangzq
 * @Date: 2020-07-21 17:43:21
 * @LastEditors: huangzq
 * @LastEditTime: 2020-07-22 11:23:19
 */
export default function debounce(fn, wait) {
    let timeout;
    return function () {
        let _this = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.call(_this, ...args)
        }, wait)
    }
}