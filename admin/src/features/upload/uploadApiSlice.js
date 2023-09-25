import { apiSlice } from "../api/apiSlice"

export const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewImage: builder.mutation({
            query: initialImage => {
                // set up form data
                const formData = new FormData()
                for (let i = 0; i < initialImage.length; i++) {
                    formData.append("images", initialImage[i]);
                }
               return ({
                    url: '/upload',
                    method: 'POST',
                    body: formData
                })
            },
            invalidatesTags: [
                { type: 'Upload', id: "LIST" }
            ]
        }),
        deleteImage: builder.mutation({
            query: ({ id }) => {
                console.log("🚀 ~ file: uploadApiSlice.js:24 ~ id:", id)
                return ({
                    url: `/upload/${id}`,
                    method: 'DELETE',
                })
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'Image', id: arg.id }
            ]
        }),
    }),
})

export const {
    useAddNewImageMutation,
    useDeleteImageMutation,
} = uploadApiSlice
