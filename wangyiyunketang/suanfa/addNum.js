function getSum(arr, sum) {
    
    arr.sort();
    console.log(arr, sum)
    if (arr == '' || arr.length == 0) {
        return false;
    }

    var left = 0,
        right = arr.length - 1;

    while (left < right) {
        console.log(arr[left] + arr[right],sum)
        if (arr[left] + arr[right] > sum) {
            right--;
        } else if (arr[left] + arr[right] < sum) {
            left++;
        } else {
            console.log('kkkk:',arr[left] + " + " + arr[right] + " = " + sum);
            left++;
            right--;
        }
    }
}
// var arr = [1,2,3,4,5,1,2,4,5,8]
var arr = [4, 4,-2, 5, 2, 10, 6, 2];
console.log(getSum(arr, 8));
console.log('=======================');

function showAdd (arr ,target ){
    var mapObj = {};
    var result = [];
    arr.forEach((item,index) => mapObj[item] = index);
    
    for (let i = 0; i < arr.length; i++) {
        let j = mapObj[target - arr[i]];
        if(j&&j!==i){
            result.push([arr[i], target - arr[i]]);
            // break;
        }
    }

    return result;
}
// console.log(showAdd(arr, 8));











