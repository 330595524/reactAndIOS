let proto ={};

function delegateSet(property,name){
    // __defineSetter__  设置
    proto.__defineSetter__(name,function(val){
        this[property][name] = val;
    })
}

function delegateGet(property,name){
    // 这块是__defineGetter__  获取
    proto.__defineGetter__(name,function(){
        return this[property][name];
    })
}

let requestSet = [];
let requestGet = ['query'];

let responseSet = ['body','status'];
let responseGet = responseSet;

requestSet.forEach(ele=>delegateSet('request',ele));
requestGet.forEach( ele => delegateGet('request',ele));
responseSet.forEach(ele=>delegateSet('request',ele));
responseGet.forEach(ele=>delegateGet('request',ele));




module.exports = proto;