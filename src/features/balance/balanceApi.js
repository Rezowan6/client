import { apiSlice } from "../api/apiSlice";

export const balanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD BALANCE
    addBalance: builder.mutation({
      query: (data) => ({
        url: "/admin/months/user-balances",
        method: "POST",
        data,
      }),

      invalidatesTags: ["Balance"], // better tag name
    }),

    // GET BALANCE USERS
    getUsersBalance: builder.query({
      query: () => ({
        url: "/admin/months/user-balances",
        method: "GET",
      }),

      providesTags: ["Balance"],
    }),

    // UPDATE BALANCE USERS
    updateBalance: builder.mutation({
      query: ({ data }) => ({
        url: `/admin/months/user-balances`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["Balance"],
    }),

  }),

  overrideExisting: false,
});

export const { useAddBalanceMutation, useGetUsersBalanceQuery, useUpdateBalanceMutation, } = balanceApi;
