const combineReducers = reducers => (state = {}, action) => {
  // {game:()=>,friend:()=>}
  let res = Object.keys(reducers).reduce(
    (nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    },
    {}
  )
  return res
}


export default combineReducers



