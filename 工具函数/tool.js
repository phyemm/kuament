/*
 * @FilePath: \深圳稽查局项目\web\src\utils\tool.js
 * @Author: huangzq
 * @Date: 2020-07-27 14:16:35
 * @LastEditors: huangzq
 * @LastEditTime: 2020-08-05 14:42:28
 */
const Color = require('color-converter').default
exports.install = function (Vue, options) {
    /**
     * 颜色（rgb，16位）转成rgba
     * @param {*} color 
     * @param {*} opacity 
     */
    Vue.prototype.$setRgba = function (color, opacity = 1) {
        if (color == undefined || color == "" || color == null) return
        //hex
        if (color.indexOf("#") == 0) {
            return Color.fromHex(color).setAlpha(opacity).css()
        }
        //rgb
        if (color.indexOf("rgb") == 0) {
            color = color.match(/\(([^)]*)\)/)[1]
            let [r, g, b] = color.split(",")
            return Color.fromRGB(r, g, b).setAlpha(opacity).css()
        }
        console.error("color format error")
    }
    Vue.prototype.$getThemeColor = function (theme) {
        switch (theme) {
            case "市稽查局":
                return "#E45D45"
                // break
            case "第一稽查局":
                return "#ECC94F"
                // break
            case "第二稽查局":
                return "#3AB17D"
                // break
            case "第三稽查局":
                return "#3FACF9"
                // break
            default:
                break
        }

    }
}