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

var ob = {
    a:1,
    b:2
}
var _value = ob.a
Object.defineProperty(ob,'a',{
    get:function(){
        // 收集依赖
        console.log('111111111')
        return _value     
    },
    set:function(newValue){
        // notify 触发更新
        console.log('222')
        _value = newValue
        return _value
    }
})





































































