import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  tagTypes: ['Channel', 'Message'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: 'signup',
        method: 'POST',
        body: newUser,
      }),
    }),
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: ['Channel'],
    }),
    // addChannel: builder.mutation({
    //   query: (newChannel) => ({
    //     url: 'channels',
    //     method: 'POST',
    //     body: newChannel,
    //   }),
    //   invalidatesTags: ['Channel'],
    // }),
    // removeChannel: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `channels/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Channel', 'Message'],
    // }),
    // editChannel: builder.mutation({
    //   query: ({ id, editChannel }) => ({
    //     url: `channels/${id}`,
    //     method: 'PATCH',
    //     body: editChannel,
    //   }),
    //   invalidatesTags: ['Channel', 'Message'],
    // }),
    getMessages: builder.query({
      query: () => 'messages',
      // async onCacheEntryAdded(
      //   _,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      // ) {
      //   addSocketListener(
      //     socket,
      //     'newMessage',
      //     cacheDataLoaded,
      //     updateCachedData,
      //     cacheEntryRemoved,
      //   );
      // },
      providesTags: ['Message', 'Channel'],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useAddNewUserMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
  useRemoveChannelMutation,
  useEditChannelMutation,
  useAddMessageMutation,
  useAddChannelMutation,
} = chatApi;
