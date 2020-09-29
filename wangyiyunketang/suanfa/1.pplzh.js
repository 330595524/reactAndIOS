// function printArr(arr,n,res){
//     for(var i = 0; i<arr[i].length;i++){
//         if(n == 0){
//             res = []
//         }
//         if(n<arr.length){
//             var _res = res.slice()
//             _res.push(arr[n][i])
//             if(n == arr.length-1){
//                 console.log(_res)
//             }else{
//                 printArr(arr,n+1,_res)
//             }
//         }
//     }
// }
// // 测试：
// var arr = [[1,2],[3,4],[5,6]]
// printArr(arr,0)

function printArr2 (arr , n , res){
    for (var i = 0; i < arr[i].length ; i++) {
       if(n ==0){
        res = [];
       }
       if(n<arr.length){
            var _res2 = res.slice();
            _res2.push(arr[n][i])
            if(n === arr.length-1){
                console.log(_res2)
            }else{
                printArr2(arr,n+1,_res2)
            }
       }
    }
}

// 测试：
var arr = [[1,2],[3,4],[5,6]]
printArr2(arr,0);