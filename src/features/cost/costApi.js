import { apiSlice } from "../api/apiSlice";

export const costApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD Cost
    addCost: builder.mutation({
      query: (data) => ({
        url: "/admin/months/costs",
        method: "POST",
        data,
      }),

      invalidatesTags: ["Cost"], // better tag name
    }),

    // GET Cost USERS
    getUsersCost: builder.query({
      query: () => ({
        url: "/admin/months/costs/total",
        method: "GET",
      }),

      providesTags: ["Cost"],
    }),

    // UPDATE Cost USERS
    updateCost: builder.mutation({
      query: ({data }) => ({
        url: `/admin/months/cost`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["Cost"],
    }),

  }),

  overrideExisting: false,
});

export const { useAddCostMutation, useGetUsersCostQuery, useUpdateCostMutation, } = costApi;