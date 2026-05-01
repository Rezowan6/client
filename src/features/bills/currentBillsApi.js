import { apiSlice } from "../api/apiSlice";

export const currentbillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add Currentbill
    addCurrentBill: builder.mutation({
      query: (data) => ({
        url: "/admin/months/current-bill/pay",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CurrentBill"],
    }),

    // get Currentbill
    getCurrentBill: builder.query({
      query: () => ({
        url: "admin/months/current-bill",
        method: "GET",
      }),
      providesTags: ["CurrentBill"],
    }),
    getCurrentBillHistory: builder.query({
      query: () => ({
        url: "admin/months/current-bill/history",
        method: "GET",
      }),
      providesTags: ["CurrentBill"],
    }),
    // update
    updateCurrentBill: builder.mutation({
      query: ({data}) => {
        return {
        url: "admin/months/current-bill/update",
        method: "PATCH",
        data,
      }
      },
      invalidatesTags: ["CurrentBill"],
    }),
    // refresh
    monthlyRefreshCurrentBill: builder.mutation({
      query: () => {
        return {
        url: "admin/months/current-bill/refresh",
        method: "POST",
      }
      },
      invalidatesTags: ["CurrentBill"],
    }),
  }),
});

export const {useAddCurrentBillMutation, useGetCurrentBillQuery, useGetCurrentBillHistoryQuery, useUpdateCurrentBillMutation, useMonthlyRefreshCurrentBillMutation } = currentbillApi;

