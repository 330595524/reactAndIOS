import {createApp} from './main'

// context-地址，根据地址返回app实例
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