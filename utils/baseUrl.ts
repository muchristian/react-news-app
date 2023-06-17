import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeCredentials } from "../redux/slices/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});
const baseQueryWithRefresh: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(removeCredentials());
    baseApi.util.resetApiState();
  }
  return result;
};

export const tagTypes = ["Articles", "Auth", "Preferences", "References"];
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Articles", "Auth", "Preferences", "References"],
  endpoints: () => ({}),
});
