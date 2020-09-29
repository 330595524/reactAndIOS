
export let list={},listen,trigger,remove;
listen= function(key,fn){
    (list[key] || (list[key] = [])).push(fn);
}
trigger= function(){
    let key = Array.prototype.shift.call(arguments);
    let fns = list[key];
    if(!fns || fns.length === 0){
        return
    }
    for (let i = 0; i < fns.length; i++) {
        let fn = fns[i];
        fn.apply(this,arguments);
    }
    // for (let i = 0; fn; fn = fns[i++]) {
    //   fn.apply(this,arguments);
    // }
}
remove= function(key,fn){
    let fns = list [key];
    if(!fns){
        return
    }
    if(!fn){
        fns&&(fns.length =0);
    }else{
        for (let i = fns.length-1; i>=0; i--) {
            const _fn = fns[i];
            _fn === fn&&(fns.splice(i,1));
        }
    }
}
 
