import { createApi } from "@reduxjs/toolkit/query/react";
import QueryString from "qs";
import { baseApi } from "../utils/baseUrl";

export const articleApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<any, any>({
      query: (arg) => {
        const queries = QueryString.stringify(arg, {
          encodeValuesOnly: true,
        });
        return {
          url: `/article?${queries}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_news_web_tkn_")}`,
          },
        };
      },
      providesTags: ["Articles"],
    }),
  }),
});

export const { useGetArticlesQuery, useLazyGetArticlesQuery } = articleApis;
