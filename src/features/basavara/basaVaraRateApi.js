import { apiSlice } from "../api/apiSlice";

export const basaVaraRateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE
    addBasaVaraRate: builder.mutation({
      query: (data) => ({
        url: "/mas-malik/basa-vara/rate",
        method: "POST",
        data,
      }),
      invalidatesTags: ["BasaVaraRate"],
    }),

    // GET
    getUsersBasaVaraRate: builder.query({
      query: () => ({
        url: "/mas-malik/basa-vara/rate",
        method: "GET",
      }),

      providesTags: ["BasaVaraRate"],
    }),

    // UPDATE
    updateBasaVaraRate: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/mas-malik/basa-vara/rate`,
          method: "PATCH",
          data,
        };
      },

      invalidatesTags: ["BasaVaraRate"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useAddBasaVaraRateMutation,
  useGetUsersBasaVaraRateQuery,
  useUpdateBasaVaraRateMutation,
} = basaVaraRateApi;