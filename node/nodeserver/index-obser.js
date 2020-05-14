/**
 * 事件发布订阅模式
 * emitter.on // 订阅
 * emitter.emit() // 发布
 */

 const fn = require('./model');
 const events  = require('events');
 let files = ['/dev.json','/test.json','/prod.json'];

 const emitter = new events.EventEmitter();

 // 利用偏函数
 var done = after(files.length,(res)=>{
     console.log(res);
 })

 emitter.on('done',done);
 
 // 偏函数控制执行几次
 function after(timers,cb) {
     let count = 0, result =[];
     return function (data) {
         result.push(data);
         count++;
         if(count === timers){
            cb(result)
         }
     }
 }

 files.forEach((filename)=>{
    fn(filename,function (err,data) {
        // if(err) 
        emitter.emit('done',data);
      })
 })