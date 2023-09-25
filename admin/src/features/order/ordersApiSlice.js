import { apiSlice } from "../api/apiSlice"

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => `/orders/all`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Order', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id }))
                    ]
                } else return [{ type: 'Order', id: 'LIST' }]
            }
        }),
        deleteOrder: builder.mutation({
            query: ({ id }) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetOrdersQuery,
    useDeleteOrderMutation
} = ordersApiSlice
