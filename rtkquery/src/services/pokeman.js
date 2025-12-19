
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://37.27.29.18:8001' }),
  tagTypes: ['TODO'],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: () => `/api/to-dos`,
      providesTags: ['TODO']
    }),
    deletepokemon: builder.mutation({
      query: (id) => ({
        url: `/api/to-dos?id=${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['TODO']
    }),
    editpokemon: builder.mutation({
      query: (elem) => ({
        url: `/api/to-dos`,
        method: "PUT",
        body: elem
      }),
      invalidatesTags: ['TODO']
    }),
    addpokemon: builder.mutation({
      query: (elem) => ({
        url: `/api/to-dos`,
        method: "POST",
        body: elem
      }),
      invalidatesTags: ['TODO']
    }),
    chexboxpokemon: builder.mutation({
      query: ({ id, isCompleted }) => ({
        url: `/completed?id=${id}`,
        method: "PUT",
        body: { isCompleted }
      }),
      invalidatesTags: ['TODO']
    }),

    deleteimgpokemon: builder.mutation({
      query: (id) => ({
        url: `/api/to-dos/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['TODO']
    }),
  }),
})

export const { useGetPokemonByNameQuery, useDeletepokemonMutation, useEditpokemonMutation, useAddpokemonMutation, useChexboxpokemonMutation, useDeleteimgpokemonMutation } = pokemonApi