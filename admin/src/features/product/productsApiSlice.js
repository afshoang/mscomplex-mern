import { apiSlice } from "../api/apiSlice"

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: (data) => {
                const { categories, colors, sizes, tags, page, limit, search } = data
                if (search) return `/products?search=${search}`
                return `/products?${categories?.length ? `categories=${categories.join(",")}&` : ""}${colors?.length ? `color=${colors.join(",")}&` : ""}${sizes?.length ? `size=${sizes.join(",")}&` : ""}${tags?.length ? `tags=${tags.join("")}&` : ""}${limit ? `${`limit=${limit}&`}` : ''}${page ? `${`page=${page}&`}` : ''}`
            },
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            providesTags: (result, error, arg) => {
                if (result) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.map(product => ({ type: 'Product', id: product._id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
        getProduct: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        addNewProduct: builder.mutation({
            query: initialProduct => ({
                url: '/products',
                method: 'POST',
                body: {
                    ...initialProduct,
                }
            }),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]
        }),
        updateProduct: builder.mutation({
            query: ({data, id}) => {
                console.log("🚀 ~ file: productsApiSlice.js:41 ~ id:", id)
                console.log("🚀 ~ file: productsApiSlice.js:41 ~ data:", data)
                return ({
                    url: `/products/${id}`,
                    method: 'PUT',
                    body: {
                        ...data,
                    }
                })
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApiSlice
