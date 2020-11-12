const defaultState =  {themeColor: 'red'}

const themeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor }
    default:
      return state
  }
}

export default themeReducer
