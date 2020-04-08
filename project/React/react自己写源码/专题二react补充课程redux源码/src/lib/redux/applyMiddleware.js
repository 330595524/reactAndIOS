import compose from './compose'

export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    // let dispatch = () => {
    //   console.log('hello')
    //   throw new Error(
    //     'Dispatching while constructing your middleware is not allowed. ' +
    //     'Other middleware would not be applied to this dispatch.'
    //   )
    // }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: store.dispatch
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI)) // 中间件 降阶


    const dispatch = compose(...chain)((action) => store.dispatch(action))
    return {
      ...store,
      dispatch
    }
  }
}
