function step(n,res){
    if(n==0){
        res=[]
    }
    var i=1
    while(i<3){
        if(n+i<=10){
            var _res = res.slice()
            _res.push(i)
            if(n+i == 10) {
                console.log(_res)
            }else{
                step(n+i, _res)
            }
        }
        i++
    }
}
step(0)