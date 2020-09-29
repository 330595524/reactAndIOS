
module.exports = {
    get body(){
        // response 中有_body 都是会被挂载的
        return this._body;
    }
    ,
    set body(data){
        // response 中有_body 都是会被挂载的
         this._body = data;
    },

    get status(){
        return this.res.statusCode;
    },
    
    set status(statusCode){
        if(typeof statusCode !== 'number'){
            throw new Error('Something is wrong');
        }
        this.res.statusCode = statusCode;
    }

}