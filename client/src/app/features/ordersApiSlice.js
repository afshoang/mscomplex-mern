import { apiSlice } from "./api/apiSlice"

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMyOrders: builder.query({
            query: () => '/orders',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Order', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Order', id }))
                    ]
                } else return [{ type: 'Order', id: 'LIST' }]
            }
        }),
        createOrder: builder.mutation({
            query: initialOrderData => ({
                url: '/orders',
                method: 'POST',
                body: {
                    ...initialOrderData,
                }
            }),
            invalidatesTags: [
                { type: 'Order', id: "LIST" }
            ]
        })
    }),
})

export const {
    useGetMyOrdersQuery,
    useCreateOrderMutation,
} = ordersApiSlice
