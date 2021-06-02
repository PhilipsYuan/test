/**
 * 为了不同组件之间的方法调用。
 * 在某个地方通过add，把方法注册到communication，在别的地方用use，调用这个方法
 * @type {{}}
 */
let communication = {};

function use(key, param1, param2, param3) {
    if(communication[key]) {
        return communication[key](param1, param2, param3)
    }
}

function add(key, fun) {
    communication[key] = fun
}

export default {
    add,
    use
}