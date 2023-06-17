import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AuthState = {
  authToken: string | undefined;
};
const slice = createSlice({
  name: "auth",
  initialState: {
    authToken: undefined,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { authToken } }: PayloadAction<{ authToken: string }>
    ) => {
      state.authToken = authToken;
      localStorage.setItem("_news_web_tkn_", authToken);
    },
    tokenUpdated: (state) => {
      return state;
    },
    removeCredentials: (state) => {
      state.authToken = undefined;
      if (typeof window !== "undefined") {
        localStorage.removeItem("_news_web_tkn_");
      }
    },
  },
});
export const { setCredentials, tokenUpdated, removeCredentials } =
  slice.actions;
export default slice.reducer;
