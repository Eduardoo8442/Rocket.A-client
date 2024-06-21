const initialState = {
    setSocket: null,
  };
  
  const setSocket = (state = initialState, action) => {
    switch (action.type) {
      case 'SOCKET':
        return {
          ...state,
          setSocket: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default setSocket;