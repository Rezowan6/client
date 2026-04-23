import { apiSlice } from "../api/apiSlice";

export const basaVaraApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD BasaVara
    addBasaVara: builder.mutation({
      query: (data) => ({
        url: "/mas-malik/basa-vara",
        method: "POST",
        data,
      }),

      invalidatesTags: ["BasaVara"], // better tag name
    }),

    // GET BasaVara USERS
    getUsersBasaVara: builder.query({
      query: () => ({
        url: "/mas-malik/basa-vara",
        method: "GET",
      }),

      providesTags: ["BasaVara"],
    }),

    // UPDATE BasaVara USERS
    updateBasaVara: builder.mutation({
      query: ({ data }) => {
        // console.log("Update Data:", data);

        return {
          url: `/mas-malik/basa-vara`,
          method: "PATCH",
          data,
        };
      },

      invalidatesTags: ["BasaVara"],
    }),

    refreshMonthlyBasaVara: builder.mutation({
      query: () => ({
        url: `/mas-malik/monthly/basa-vara/refresh`,
        method: "PATCH",
      }),

      invalidatesTags: ["BasaVara"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddBasaVaraMutation,
  useGetUsersBasaVaraQuery,
  useUpdateBasaVaraMutation,
  useRefreshMonthlyBasaVaraMutation,
} = basaVaraApi;
