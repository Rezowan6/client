import { apiSlice } from "../api/apiSlice";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get
    getSubAdmin: builder.query({
      query: () => ({
        url: `/admin/assign-role`,
        method: "GET",
      }),

      providesTags: ["Role"],
    }),
    // update
    updateSubAdmin: builder.mutation({
      query: ({ data }) => ({
        url: `/admin/assign-role`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["Role"],
    }),

  }),
});

export const {
  useGetSubAdminQuery,
  useUpdateSubAdminMutation,
} = roleApi;
