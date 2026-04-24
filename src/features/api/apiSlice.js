import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "../../app/axiosBaseQuery";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Users","Mill","CurrentBill", "KhalaBill","Balance","Cost","IncidentalExpenses","EggRate","PermanentInfo"],

  endpoints: () => ({}),
});
