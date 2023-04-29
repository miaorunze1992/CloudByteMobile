// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";

export const login = (userName: string, userToken: string) => ({
  type: LOGIN,
  id: userName,
  token: userToken,
});

export const logout = () => ({
  type: LOGOUT,
});

export const register = (userName: string, userToken: string) => ({
  type: REGISTER,
  id: userName,
  token: userToken,
});

export const retrieveToken = (userToken: any) => ({
  type: RETRIEVE_TOKEN,
  token: userToken,
});
