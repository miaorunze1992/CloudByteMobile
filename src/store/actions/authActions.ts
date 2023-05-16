// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";

export const login = (user: any, userToken: string) => ({
  type: LOGIN,
  user: user,
  token: userToken,
});

export const logout = () => ({
  type: LOGOUT,
});

export const register = (user: any, userToken: string) => ({
  type: REGISTER,
  user: user,
  token: userToken,
});

export const retrieveToken = (user: any, userToken: any) => ({
  type: RETRIEVE_TOKEN,
  user: user,
  token: userToken,
});
