module.exports = {

  configureWebpack: {
    devServer: {
      before(app) {
        // app就是个express
        app.get('/xx',(req,res)=>{
          res.send({code:0})
        })
      }
    }
  }
}

