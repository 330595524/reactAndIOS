function vue(){
    this.$data={a:1};
    this.
}

vue.prototype.observe = function(obj){
    var value;
    var self = this;
    this.$data  = new Proxy(this.$data,{
        get : function (target,key) {
          return target[key]  
        },
        set : function (target,key,newvalue,) {
             target[key] = newvalue;
             self.render();
          },
    })



    // for (const key in obj) {
    //     value = obj[key];
    //     if (typeof value ==='object') {
    //       this.
            
    //     }else{
    //         Object.defineProperties(this.$data,key,{
    //             get:function(){
    //                 // 依赖收集，收集来属性哪些地方有使用这个key，仅更新有使用的， 
    //                 // vue源码zhong dep.depend()收集
    //                 return value;
    //             set:function(newvalue){
    //                   // 触发更新
    //                   // vue源码中  dep.notfiy()收集
    //                   value = newvalue;
    //                   self.render();
    //             },
    //         })
    //     }
    // }
}
vue.prototype.render = function (){
    this.el.innerHTML = '';
    this.el.innerHTML = this.virtualdom;
}