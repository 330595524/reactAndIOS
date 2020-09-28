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