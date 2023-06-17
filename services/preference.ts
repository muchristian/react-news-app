import { createApi } from "@reduxjs/toolkit/query/react";
import QueryString from "qs";
import { baseApi } from "../utils/baseUrl";

export const preferenceApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postPreference: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `/preference/add`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["Preferences"],
    }),
    getPreferences: builder.query<any, void>({
      query: () => {
        return {
          url: `/preference`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
        };
      },
      providesTags: ["Preferences"],
    }),
  }),
});

export const { useGetPreferencesQuery, usePostPreferenceMutation } =
  preferenceApis;
