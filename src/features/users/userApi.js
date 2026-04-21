import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET USERS
    getUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    // CREATE USER
    createUser: builder.mutation({
      query: (data) => ({
        url: "/admin/users",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Users"],
    }),

    // DELETE USER
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),

  overrideExisting: false,
  refetchOnMountOrArgChange: true,
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = userApi;
