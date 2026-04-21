import {apiSlice} from '../api/apiSlice';

export const eggRateApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addEggRate: builder.mutation({
            query: (data) => ({
                url: "admin/egg-rate",
                method: "POST",
                data,
            }),
            invalidatesTags: ["EggRate"]
        }),
        getEggRate: builder.query({
            query: () => ({
                url: "admin/egg-rate",
                method: "GET",
            }),
            providesTags: ["EggRate"]
        }),
    }),
     overrideExisting: false,
});

export const {useAddEggRateMutation, useGetEggRateQuery} = eggRateApi;