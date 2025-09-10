import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aquaShineApi = createApi({
  reducerPath: 'aquaShineApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Users', 'Services', 'Bookings', 'Feedback', 'Contacts'],
  endpoints: (builder) => ({
    // ======================================== USERS ======================================== //
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['Users'],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/users?id=${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),

    // ======================================== SERVICES ======================================== //
    getServices: builder.query({
      query: () => '/services',
      providesTags: ['Services'],
    }),
    addService: builder.mutation({
        query: (service) => ({
            url: '/services',
            method: 'POST',
            body: service,
        }),
        invalidatesTags: ['Services'],
    }),
    updateService: builder.mutation({
        query: ({ id, ...rest }) => ({
            url: `/services?id=${id}`,
            method: 'PUT',
            body: rest,
        }),
        invalidatesTags: ['Services'],
    }),
    deleteService: builder.mutation({
        query: (id) => ({
            url: `/services?id=${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Services'],
    }),

    // ======================================== BOOKINGS ======================================== //
    getBookings: builder.query({
      query: (userId) => (userId ? `/bookings?userId=${userId}`: '/bookings'),
      providesTags: ['Bookings'],
    }),
    addBooking: builder.mutation({
        query: (booking) => ({
            url: '/bookings',
            method: 'POST',
            body: booking,
        }),
        invalidatesTags: ['Bookings'],
    }),
    updateBooking: builder.mutation({
        query: ({ id, ...rest }) => ({
            url: `/bookings?id=${id}`,
            method: 'PUT',
            body: rest,
        }),
        invalidatesTags: ['Bookings'],
    }),
    deleteBooking: builder.mutation({
        query: (id) => ({
            url: `/bookings?id=${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Bookings'],
    }),

    // ======================================== FEEDBACK ======================================== //
    getFeedback: builder.query({
        query: () => '/feedback',
        providesTags: ['Feedback'],
    }),
    addFeedback: builder.mutation({
        query: (feedback) => ({
            url: '/feedback',
            method: 'POST',
            body: feedback,
        }),
        invalidatesTags: ['Feedback'],
    }),
    updateFeedback: builder.mutation({
        query: ({ id, ...rest }) => ({
            url: `/feedback?id=${id}`,
            method: 'PUT',
            body: rest,
        }),
        invalidatesTags: ['Feedback'],
    }),
    deleteFeedback: builder.mutation({
        query: (id) => ({
            url: `/feedback?id=${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Feedback'],
    }),

     // ======================================== CONTACT ======================================== //
    getContacts: builder.query({
      query: () => '/contact',
      providesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: '/contact',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetBookingsQuery,
  useAddBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useGetFeedbackQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = aquaShineApi;
