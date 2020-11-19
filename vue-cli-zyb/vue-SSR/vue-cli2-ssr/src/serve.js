import {createApp} from './main'

export default context =>{
    return new Promise((resolve,reject)=>{
        const {app, router }=createApp()
        router.push(context.url)
        router.onReady(()=>{
            const mathCoomponents = router.getMatchedComponents(); // 有没有匹配上地址 
            if(!mathCoomponents){
                return reject({code:404})
            }
            resolve(app)
        })
    },reject)
}