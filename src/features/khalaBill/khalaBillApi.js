import { apiSlice } from "../api/apiSlice";

export const khalabillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add 
    addKhalaBill: builder.mutation({
      query: (data) => ({
        url: "/admin/months/khala-bill",
        method: "POST",
        data,
      }),
      invalidatesTags: ["KhalaBill"],
    }),

    // get
    getKhalaBill: builder.query({
      query: () => ({
        url: "/admin/months/khala-bill",
        method: "GET",
      }),
      providesTags: ["KhalaBill"],
    }),
    // update
    updateKhalaBill: builder.mutation({
      query: ({data}) => {
        return {
        url: "/admin/months/khala-bill",
        method: "PATCH",
        data,
      }
      },
      invalidatesTags: ["KhalaBill"],
    }),
    // refresh
    monthlyRefreshKhalaBill: builder.mutation({
      query: () => {
        return {
        url: "/admin/months/khala-bill/refresh",
        method: "PATCH",
      }
      },
      invalidatesTags: ["KhalaBill"],
    }),
  }),
});

export const { useAddKhalaBillMutation, useGetKhalaBillQuery, useUpdateKhalaBillMutation, useMonthlyRefreshKhalaBillMutation } = khalabillApi;

