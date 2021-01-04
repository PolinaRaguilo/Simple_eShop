const initialState = {
  clocksData: [],
  loadingClocks: true,
  errorClocks: false,
  typeError: null,
};

const clocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_RATING':
      return {
        ...state,
        ...state.clocksData.map(item => {
          if (item.id === action.id) {
            return {
              ...item,
              rating: action.value,
            };
          }
          return item;
        }),
      };
    case 'CLOCKS/RECEIEVE_CLOCKS':
      return {
        ...state,
        clocksData: action.clocks,
        loadingClocks: false,
      };
    case 'CLOCKS/REQUEST_CLOCKS':
      return {
        ...state,
        loadingClocks: true,
      };
    case 'CLOCKS/FAIL_LOAD':
      return {
        ...state,
        errorClocks: true,
        loadingClocks: false,
        typeError: action.error,
      };
    default:
      return state;
  }
};

export { clocksReducer };
