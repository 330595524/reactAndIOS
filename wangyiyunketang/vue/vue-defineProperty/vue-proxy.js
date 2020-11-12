var ob = {a:1};

// defineproperty  是需要针对性的，改变原对象,只能监听某一个属性，，不能对全对象监听，具体需要使用递归
// Proxy代理对象，创建一个代理对象，可以监听全对象属性，可以去掉



var obProxy = new Proxy(ob,{
    get :function(target, key, receiver) {
        
    },
    set :function(target, key,value, receiver) {
        // target[key] = value;  // 都可以实现
        return Reflect.set(target, key,value)
    }
})


// 类的参数 校验

// 策略模式，将属性方法key拿出来，以后就不需要一个个的if（）{}else if(){}
var valudtor = {
    name:function(value) {
        var reg = /^[u4E00-\u9FA5]+$/;
        if(typeof value === 'string'&& res.test(value)){
            return true
        }
        return false;
    },
    age:function(value) {
        var reg = /^[u4E00-\u9FA5]+%/;
        if(typeof value === 'string'&& res.test(value)){
            return true
        }
        return false;
    }
}

function person(age,name) {
    this.age = age;
    this.name = name;
    return new Proxy(this,{
        get:function(target,value) {
            return target[value];
        },
        set:function(target,value) {
            // 测略模式
            if(valudtor[key](value)){
                return Reflect.set(target,key,value)
            }else{
                throw new Error(key+'shi错误的 ')
            }
        }

    })
}
let a= new person(19, 'sadfdaf')