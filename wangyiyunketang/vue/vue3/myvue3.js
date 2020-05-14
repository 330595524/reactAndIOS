let toProxy = new WeakMap();
let toRaw = new WeakMap();

let effectStack =[]; // 存在effect的地方
let targetMap = new WeakMap();  // 特殊的{}.  key是object

// 以上存储依赖关系
function track(target,key){
    //收集依赖
    const effect = effectStack(effectStack.length-1);
    if(effect){
        let depMap = targetMap.get(target);
        if( depMap===undefined){
            depMap = new Map();
            targetMap.set(target,depMap);
        }
        let dep = depMap.get(key);
        if(dep == undefined){
            dep = new Set()
            depMap.set(key,dep);
        }

        if(!dep.has(effect)){
            dep.add(effect);
            effect.deps.push(dep);
        }
    }
}
function trigger(target,key,info){
    // 触发更新
    // 寻找依赖函数
    const depMap = targetMap.get(target);
    if(depMap === undefined){
        return 
    }
    const effects = new Set();
    const computedRunner = new Set();
    if(key){
        let deps = depMap.get(key);
        // deps 里面去拿时effect
        deps.forEach(effect => {
            if(effect.computed){
                computedRunner.add(effect);
            }else{
                effects.add(effect);
            }
        });
    }
    effects.forEach(effect=>effect())
    computedRunner.forEach(computed=>computed())
}

function effect(fn,option={}){
    // 收集依赖。
    let e = createReactiveEffect(fn,option);
    if(!option.layzy){
        e()
    }
    return e
}
function createReactiveEffect (fn,option){
    // 构造一个effect
    const effect = function effect(...args){
        return run(effect,fn,args)
    }
    effect.deps =[];
    effect.computed = option.computed;
    effect.lazy = option.lazy;
    return effect;
}
function run(effect,fn,args){
    if(effectStack.indexOf(effect)===-1){
        try{
            effectStack.push(effect)
            return fn(...args)
        }finally{
            effectStack.pop()
        }
    }
}

function computed (){
    cosnt runner  = effect(fn,{computed:true,lazy:true})
    return {
        effect: runner,
        get value(){
            return runner();
        }
    }
}
const baseHandle ={
    get(target,key){
        const res = Reflect.get(target,key);
        track(target,key);
        return typeof res == 'object'?reactive(res):res;
    },
    set(target,key,val){
        // 通知更新
        const res = Reflect.set(target,key,val);
        cosnt info = {oldValue:target[key],newValue:val};
        trigger(target,key,info)
        return res;
    }
}
function reactive(target){

    //查询缓存
    let observed = toProxy.get(target);
    if(observed){
        return observed
    }
    if(toRaw.get(target)){
        return target
    }
    observed = new Proxy(target,baseHandle);
    toProxy.set(target,observed);
    toRaw.set(observed,target);

    return observed;
}

