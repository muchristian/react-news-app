import { createApi } from "@reduxjs/toolkit/query/react";
import QueryString from "qs";
import { baseApi } from "../utils/baseUrl";

export const referenceApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryReferences: builder.query<any, void>({
      query: () => {
        return {
          url: `/reference/categories`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
          method: "GET",
        };
      },
      providesTags: ["References"],
    }),
    getSourceReferences: builder.query<any, void>({
      query: () => {
        return {
          url: `/reference/sources`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
        };
      },
      providesTags: ["References"],
    }),
    getAuthorReferences: builder.query<any, void>({
      query: () => {
        return {
          url: `/reference/authors`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
        };
      },
      providesTags: ["References"],
    }),
  }),
});

export const {
  useGetCategoryReferencesQuery,
  useLazyGetSourceReferencesQuery,
  useLazyGetAuthorReferencesQuery,
} = referenceApis;
