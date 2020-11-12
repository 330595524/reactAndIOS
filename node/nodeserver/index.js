const fs = require('fs');
let files = ['/dev.json','/test.json','/prod.json'];
fs.readFile(__dirname+files[0],'utf8',(err,data)=> {
    let result= [];
    if(err) console.log(err);
    result.push(data);
    console.log(result);
})