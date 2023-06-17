import { createApi } from "@reduxjs/toolkit/query/react";
import { login } from "../utils/models";
import QueryString from "qs";
import { toast } from "react-toastify";
import { baseApi } from "../utils/baseUrl";
import omit from "lodash.omit";

export const authApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<any, login>({
      query: (data) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<any, login>({
      query: (data) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    logout: builder.query<any, void>({
      query: () => {
        return {
          url: `/auth/logout`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
          method: "GET",
        };
      },
      providesTags: ["Auth"],
    }),
    me: builder.query<any, void>({
      query: () => {
        return {
          url: `/auth/me`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
          method: "GET",
        };
      },
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyLogoutQuery,
  useLazyMeQuery,
} = authApis;
