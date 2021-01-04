//  开启服务
const express = require('express')
const server = express();
// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const path = require('path')
const fs = require('fs')
const { Buffer } = require('buffer')
const serverBundle =require(path.resolve(__dirname,'./dist/vue-ssr-server-bundle.json'))
const clientManifest =require(path.resolve(__dirname,'./dist/vue-ssr-client-manifest.json'))
const template =fs.readFileSync(path.resolve(__dirname,'./dist/index.ssr.html'))
const renderer = createBundleRenderer(serverBundle,{
    template:template,
    clientManifest:clientManifest,
    runInNewContext:false
})

server.use(express.static(path.resolve(__dirname,'./dist')))
server.get('*',(req,res)=>{
    if(req.url!='/favicon.ico'){
        const context = {url:req.url}
        // 变成流解决内存压力过大
        const ssrStream = renderer.renderToStream(context)
        // 将流转化成字符串
        let buffers = [];
        ssrStream.on('data',(data)=>{
            buffers.push(data)
        })
        ssrStream.on('end',(data)=>{
           res.end(Buffer.concat(buffers))
        })
    }

})
server.listen(1000)