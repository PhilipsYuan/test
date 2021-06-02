/**
 * 判定节点里是否有class
 * @param elements dom节点
 * @param cName class名
 * @return {boolean}
 */
export function hasClass (element, cName) {
    return !!element.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'))
}

/**
 * 添加class
 * @param elements
 * @param cName
 */
export function addClass (element, cName) {
    if (!hasClass(element, cName)) {
        element.className += ' ' + cName
    }
}

export function removeClass (element, cName) {
    if (hasClass(element, cName)) {
        element.className = element.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ')
    }
}