import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Lesion, { ILesion } from "@/models/lesion";
import { IPhoto } from "@/models/photo";
import User from "@/models/user";
import {
  ApiResponse,
  PostLoginResponse,
  PostUserResponse,
} from "@/types/melanomaApiTypes";

const baseUrl = "http://192.168.100.82:3000/";

export const melanomaApi = createApi({
  reducerPath: "melanomaApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User", "Lesion", "Photo"],
  endpoints: (builder) => ({
    postUser: builder.mutation<PostUserResponse, User>({
      query: (user) => ({
        url: "user",
        method: "post",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    postLogin: builder.query<PostLoginResponse, User>({
      query: (user) => ({
        url: "user/login",
        method: "post",
        body: user,
      }),
    }),
    getUser: builder.query<User, number>({
      query: (userId) => `user/${userId}`,
      providesTags: ["User", "Lesion"],
      transformResponse: (data: User) => {
        const lesions = data.lesions?.map((lesion) => {
          return {
            sharedWithUsers: [],
            userHasWriteNotesPermission: false,
            userIsOwner: true,
            ...lesion,
          };
        });
        return {
          ...data,
          lesions,
        };
      },
    }),
    deleteLesion: builder.mutation<ApiResponse, number>({
      query: (lesionId) => ({
        url: `lesion/${lesionId}`,
        method: "delete",
      }),
      invalidatesTags: ["Lesion", "User"],
    }),
    getLesion: builder.query<ILesion, number>({
      query: (lesionId) => `lesion/${lesionId}`,
      providesTags: ["Lesion"],
      // transformResponse: (lesion: ILesion) => {
      //   return new Lesion(lesion.id, lesion.name, lesion.photos, "Uknown", [], true);
      // },
    }),
    patchLesion: builder.mutation<ApiResponse, Partial<Lesion>>({
      query: (lesion) => ({
        url: `lesion/${lesion.id}`,
        method: "patch",
        body: lesion,
      }),
      invalidatesTags: ["Lesion"],
    }),
    postPhoto: builder.mutation<
      ApiResponse,
      { lesionId: number; photo: Partial<IPhoto> }
    >({
      query: ({ lesionId, photo }) => ({
        url: `lesion/${lesionId}/photo`,
        method: "post",
        body: photo,
      }),
      invalidatesTags: ["Lesion"],
    }),
    getPhoto: builder.query<IPhoto, number>({
      query: (photoId) => `/lesion/0/photo/${photoId}`,
      providesTags: ["Photo"],
    }),
    deletePhoto: builder.mutation<ApiResponse, number>({
      query: (photoId) => ({
        url: `lesion/0/photo/${photoId}`,
        method: "delete",
      }),
      invalidatesTags: ["Lesion"],
    }),
  }),
});

export const {
  usePostUserMutation,
  usePostLoginQuery,
  useLazyPostLoginQuery,
  useGetUserQuery,
  useDeleteLesionMutation,
  useGetLesionQuery,
  usePatchLesionMutation,
  useGetPhotoQuery,
  usePostPhotoMutation,
  useDeletePhotoMutation,
} = melanomaApi;
