const fn = require('./model');
let files = ['/dev.json','/test.json','/prod.json'];

// 有先后顺序的执行异步
function toPromiserStyle(fn) {
    return (...args)=>{
        return new Promise((resolve,reject)=>{
                fn(...args,(err,data)=>{
                    if(err) reject(err)
                    resolve(data)
                })
            }
        )
    }
}
let op = toPromiserStyle(fn);
// console.log(op.toString())
let result = [];
op(files[0]).then((data)=>{
    result.push(data);
    return op(files[0])
}).then((data)=>{
    result.push(data);
    return op(files[1])
}).then((data)=>{
    result.push(data);
    console.log(result)
    return op(files[2])
}).catch((err)=>{
    console.log(err)
    console.log(result)
})

// 结合 gemter
function *getResult(){
    let  res ; 
    try {
        res = yield op(files[0]);
        res = yield op(files[1]);
        res = yield op(files[2]);
        return res;
    } catch (error) {
        return console.log(err)
    }
   
}

// 结合 async await 
async function getResult2(){
    let  res ; 
    try {
        res = await op(files[0]);
        res = await op(files[1]);
        res = await op(files[2]);
        return res;
    } catch (error) {
        return console.log(err)
    } 
}
