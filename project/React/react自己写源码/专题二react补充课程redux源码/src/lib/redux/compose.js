export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => {
    return a(b(...args))
  })
}

const f1 = (next) => (n) =>{
  console.log(n,'f1')
  return next(n-1)
}

const f2 = (next) => (n) => {
  console.log(n,'f2')
  return next(n+5)
}

const  f3 =(next) =>(n) =>{
  return next(n*10)
}

let chain = compose(f1,f2,f3)((res) => console.log('last middleware',res))
chain(3)
