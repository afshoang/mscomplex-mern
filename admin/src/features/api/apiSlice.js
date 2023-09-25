import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://mscomplex-api.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.user?.accessToken

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Product', 'Upload', 'User', 'Order'],
    endpoints: builder => ({})
})