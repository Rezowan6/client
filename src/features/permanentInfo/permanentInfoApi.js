import { apiSlice } from "../api/apiSlice";

export const permanentInfoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD PermanentInfo
    addPermanentInfo: builder.mutation({
      query: (data) => ({
        url: "/mas-malik/permanent-data",
        method: "POST",
        data,
      }),

      invalidatesTags: ["PermanentInfo"], // better tag name
    }),

    // GET PermanentInfo USERS
    getUsersPermanentInfo: builder.query({
      query: () => ({
        url: "/mas-malik/permanent-datas",
        method: "GET",
      }),

      providesTags: ["PermanentInfo"],
    }),

        // UPDATE PermanentInfo USERS
    updatePermanentInfo: builder.mutation({
      query: ({data, id}) => ({
        url: `/mas-malik/permanent-data/${id}`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: ["PermanentInfo"],
    }),


  }),

  overrideExisting: false,
});

export const { useAddPermanentInfoMutation, useGetUsersPermanentInfoQuery,useUpdatePermanentInfoMutation } = permanentInfoApi;
