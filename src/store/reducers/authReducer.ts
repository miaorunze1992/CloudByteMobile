const initialLoginState = {
  isLoading: true,
  user: {},
  userToken: null,
};

export const authReducer = (state = initialLoginState, action: any) => {
  switch (action.type) {
    case "RETRIEVE_TOKEN":
      return {
        ...state,
        user: action.user,
        userToken: action.token,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.user,
        userToken: action.token,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
        userToken: null,
        isLoading: false,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.user,
        userToken: action.token,
        isLoading: false,
      };
    default:
      return state;
  }
};
