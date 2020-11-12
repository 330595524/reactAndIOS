import createStore from '../lib/redux/createStore.js'
import combineReducers from '../lib/redux/combineReducers.js'
import applyMiddleware from '../lib/redux/applyMiddleware.js'
import compose from '../lib/redux/compose'
import theme from './themeReducer.js'
import friend from './friendReducer.js'
// import rootReducer from "../../mirc-demo/src/reducers";


// export const store = createStore(friend)

const middlewareA = (dispatch, getState) => next => action => {
  console.log('middle-ware-a')
  next(action)
}
const middlewareB = (dispatch, getState) => next => action => {
  console.log('middle-ware-b')
  setTimeout(() => {
    next(action)
  }, 2000)
}
const middlewareC = (dispatch, getState) => next => action => {
  console.log(next,'middle-ware-c')
  next(action)
}
const middlewares = [
  middlewareA,
  middlewareB,
  middlewareC
]

//


export default applyMiddleware(...middlewares)(createStore)(combineReducers({theme, friend}))


// export default compose(applyMiddleware)(...middlewares)(createStore)(combineReducers)({theme, friend})
