const defaultState =  {list: ['a','b','c','d']}

const friendReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_FRIEND':
      return { ...state, list: action.list }
    default:
      return state
  }
}

export default friendReducer
