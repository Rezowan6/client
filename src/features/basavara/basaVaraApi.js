import { apiSlice } from "../api/apiSlice";

export const basaVaraApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD
    addBasaVara: builder.mutation({
      query: (data) => ({
        url: "/mas-malik/basa-vara/pay",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["BasaVara"],
    }),

    // GET
    getUsersBasaVara: builder.query({
      query: () => ({
        url: "/mas-malik/basa-vara",
        method: "GET",
      }),

      providesTags: ["BasaVara"],
    }),
    getUsersBasaVaraHistory: builder.query({
      query: () => ({
        url: "/mas-malik/basa-vara/history",
        method: "GET",
      }),

      providesTags: ["BasaVara"],
    }),

    // UPDATE
    updateBasaVara: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/mas-malik/basa-vara/update`,
          method: "PATCH",
          data,
        };
      },

      invalidatesTags: ["BasaVara"],
    }),

    refreshMonthlyBasaVara: builder.mutation({
      query: () => ({
        url: `/mas-malik/monthly/basa-vara/refresh`,
        method: "POST",
      }),

      invalidatesTags: ["BasaVara"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddBasaVaraMutation,
  useGetUsersBasaVaraQuery,
  useGetUsersBasaVaraHistoryQuery,
  useUpdateBasaVaraMutation,
  useRefreshMonthlyBasaVaraMutation,
} = basaVaraApi;
