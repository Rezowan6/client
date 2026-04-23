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
    distributeOtherCost: builder.mutation({
      query: (data) => ({
        url: "/admin/distribute-other-cost",
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
      query: ({ data }) => {
        return {
          url: `/admin/incidental`,
          method: "PATCH",
          data,
        };
      },

      invalidatesTags: ["IncidentalExpenses"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddIncidentalExpensesMutation,
  useDistributeOtherCostMutation,
  useGetUsersIncidentalExpensesQuery,
  useUpdateIncidentalExpensesMutation,
} = incidentalExpensesApi;
