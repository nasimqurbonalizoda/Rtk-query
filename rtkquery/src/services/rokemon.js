import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rokemonapi = createApi({
  reducerPath: 'rokemonapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://37.27.29.18:8001' }),
  tagTypes:["PODO"],
  endpoints: (builder) => ({
    getuserpokemon: builder.query({
      query: () => '/api/categories',
      providesTags:["PODO"]
    }),
    deletepokemon: builder.mutation({
      query: (id) => ({
        url: `/api/categories?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['PODO']
    }),
    editpokemon: builder.mutation({
      query: (elem) => ({
        url: `/api/categories`,
        method: "PUT",
        body: elem
      }),
      invalidatesTags: ['PODO']
    }),
    addpokemon: builder.mutation({
      query: (elem) => ({
        url: `/api/categories`,
        method: "POST",
        body: elem
      }),
      invalidatesTags: ['PODO']
    }),
  }),
})

export const { useGetuserpokemonQuery,useDeletepokemonMutation,useAddpokemonMutation,useEditpokemonMutation } = rokemonapi
