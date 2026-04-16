import { apiSlice } from "../api/apiSlice";

export const incidentalExpensesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD IncidentalExpenses
    addIncidentalExpenses: builder.mutation({
      query: (data) => ({
        url: "/admin/incidental",
        method: "POST",
        data,
      }),

      invalidatesTags: ["IncidentalExpenses"], // better tag name
    }),

    // GET IncidentalExpenses USERS
    getUsersIncidentalExpenses: builder.query({
      query: () => ({
        url: "/admin/incidental",
        method: "GET",
      }),

      providesTags: ["IncidentalExpenses"],
    }),

        // UPDATE IncidentalExpenses USERS
    updateIncidentalExpenses: builder.mutation({
      query: ({id,data }) => ({
        url: `/admin/incidental/${id}`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["IncidentalExpenses"],
    }),


  }),

  overrideExisting: false,
});

export const { useAddIncidentalExpensesMutation, useGetUsersIncidentalExpensesQuery,useUpdateIncidentalExpensesMutation } = incidentalExpensesApi;