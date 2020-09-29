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
 */
function vue(params) {
    this.$data={a:1}
    this.el = document.getElementById('app')
    this.virtualdom = ''
    this.observer(this.$data)
    this.render();
}

vue.prototype.observer = function(obj) {
    var value;
    var self = this;
    // 对象有很多层{a:{b:{c:1}}}
    for (const key in obj) {
        value = obj[key]
        if(typeof value == 'object'){
            this.observer(value)
        }else{
            Object.defineProperty(this.$data,key,{
                get:function(){
                    return value
                },
                set:function(newValue){
                    value = newValue
                    self.render();
                }
            })
        }
    }
}

vue.prototype.render = function(){
    this.virtualdom = 'i am'+this.$data.a
    this.el.innerHTML = this.virtualdom;
}

/// vue 中数组只能通过pop 。 push实现监听，其实就是一个装饰者模式
var arrayPro =Array.prototype;
var arrob = Object.create(arrayPro);  // copy 出来一份
var arr=['push','pop','shift'];
arr.forEach((method,index)=>{
    arrob[method] = function(){
        var ret = arrayPro[method].apply(this,arguments);
        dep.notify()
    }
})


// vue 3 proxy
var ob = {
    a:1,
    b:2
}
/*
1. 不用借助外部变量，
2. 不用设置额外的属性，
3. 不用额外监听对象，
4. 不会污染原对象


省去for  in 循环
*/
var newobj = new Proxy(ob,{
    get(target,key,receiver){
        console.log(target,key,receiver);
        // return Reflect.get(target.key)   // 上下都一样的
        return target[key]
    },
    set(target,key,value,receiver){
        // return Reflect.set(target.key,value)
       return target[key] = value
    }
})

































































