const fs = require('fs');

module.exports = function(filename,cb) {
    fs.readFile(__dirname+filename,'utf8',(err,data)=>{
        cb(err,data);
    })
}