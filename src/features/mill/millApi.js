import { apiSlice } from "../api/apiSlice";

export const millApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD Mill
    addMill: builder.mutation({
      query: (data) => ({
        url: "/admin/mills",
        method: "POST",
        data,
      }),

      invalidatesTags: ["Mill"], // better tag name
    }),

    // GET Mill USERS
    getUsersMill: builder.query({
      query: () => ({
        url: "/admin/months/mills",
        method: "GET",
      }),

      providesTags: ["Mill"],
    }),

        // UPDATE MILL USERS
    updateMill: builder.mutation({
      query: ({data }) => ({
        url: `/admin/mills`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["Mill"],
    }),


  }),

  overrideExisting: false,
});

export const { useAddMillMutation, useGetUsersMillQuery,useUpdateMillMutation } = millApi;