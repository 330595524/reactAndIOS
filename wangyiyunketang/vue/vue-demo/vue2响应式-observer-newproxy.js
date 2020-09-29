/**
 * difineProperty 定义对象属性
 * value
 * get
 * set
 * writable  写
 * enumerable  枚举
 * configurable  权限
 * 
 * 
 * 数据变化触发set，set部分触发notify，更改对应的虚拟dom，重新render，get部分收集依赖
 * 
 * proxy 还可以做
 *  类型验证
 *  真正的私有变量，数据安全
 * 
 */
function vue(params) {
    this.$data = { a: 1 }
    this.el = document.getElementById('app')
    this.virtualdom = ''
    this.observer(this.$data)
    this.render();
}

vue.prototype.observer = function (obj) {
    var value;
    var self = this;
    // 使用proxy
    this.$data = new Proxy(this.$data, {
        get(target, key, receive) {
            return target[key]
        },
        set(target, key, value, receive) {
            target[key] = value;
            self.render();
        },
    })
}

vue.prototype.render = function () {
    this.virtualdom = 'i am' + this.$data.a
    this.el.innerHTML = this.virtualdom;
}

/// vue 中数组只能通过pop 。 push实现监听，其实就是一个装饰者模式
/* var arrayPro = Array.prototype;
var arrob = Object.create(arrayPro);  // copy 出来一份
var arr = ['push', 'pop', 'shift'];
arr.forEach((method, index) => {
    arrob[method] = function () {
        var ret = arrayPro[method].apply(this, arguments);
        dep.notify()
    }
}) */


// vue 3 proxy
/* var ob = {
    a: 1,
    b: 2
} */
/*
1. 不用借助外部变量，
2. 不用设置额外的属性，
3. 不用额外监听对象，
4. 不会污染原对象


省去for  in 循环
*/
// var newobj = new Proxy(ob,{
//     get(target,key,receiver){
//         console.log(target,key,receiver);
//         // return Reflect.get(target.key)   // 上下都一样的
//         return target[key]
//     },
//     set(target,key,value,receiver){
//         // return Reflect.set(target.key,value)
//        return target[key] = value
//     }
// })


// 策略模式 
/* var validtor = {
    name: function () {
        var reg = /^[u4e80-\u9FA5]+$/
        if (typeof value == 'string' && reg.test(value)) {
            return true
        }
        return false
    },
    age: function (value) {
        if(typeof value === "number"){
            return true
        }
        return false
    }
}

function persion(age, name) {
    this.age = age;
    this.name = name;
    return new Proxy(this, {
        get: function (target, key) {
            return target[key]
        },
        set: function (target, key, value) {
            if(validtor[key](value)){
                return Reflect.set(target,key,value)
            }else{
                throw console.error();
            }
        }
    })
} */
































































