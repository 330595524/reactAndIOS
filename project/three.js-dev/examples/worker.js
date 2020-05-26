/*
 * @Author: xulimin
 * @Date: 2020-05-25
 * @Last Modified by: xulimin
 * @Last Modified time: 2020-05-25
 */
//使用onmessage回调函数来获取从主线程传递来的数据
onmessage = function(e) {
  console.log("进来了哦")
  console.log(navigator,location)
  let de = e.data.map(item=>item*5)
  // var workerResult = 'Result: ' + de; //将获取到的值乘以5再返回
  postMessage(de); //调用postMessage将数据传递给主线程
  this.close();
};

