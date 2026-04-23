import { apiSlice } from "../api/apiSlice";

export const currentbillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add Currentbill
    addCurrentBill: builder.mutation({
      query: (data) => ({
        url: "/admin/months/current-bill",
        method: "POST",
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
    // update
    updateCurrentBill: builder.mutation({
      query: ({data}) => {
        return {
        url: "admin/months/current-bill",
        method: "PATCH",
        data,
      }
      },
      providesTags: ["CurrentBill"],
    }),
  }),
});

export const {useAddCurrentBillMutation, useGetCurrentBillQuery, useUpdateCurrentBillMutation} = currentbillApi;

