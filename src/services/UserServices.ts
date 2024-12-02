import axios, { AxiosResponse } from "axios";
import { UserProfile } from "../models/User";
import { String } from "aws-sdk/clients/cloudtrail";

export const getMe = async (token: string | null): Promise<AxiosResponse> => {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/users/me/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return err.response;
    });

  return response;
};

export const updateMe = async (
  token: string | null,
  userProfile: Partial<UserProfile>
): Promise<AxiosResponse> => {
  return await axios
    .put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/users/me`,
      userProfile,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const updatePhoto = async (
  token: string | null,
  photo: string
): Promise<AxiosResponse> => {
  return await axios
    .put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/users/me`,
      { photo: photo },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteMe = async (): Promise<AxiosResponse> => {
  return await axios
    .delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/deleteMe`, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getUser = async (id: String): Promise<AxiosResponse> => {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/auth/get_by_id/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const getInstructorStatistics = async (
  id: String
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/courses/instructor_statistics/${id}`,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};
