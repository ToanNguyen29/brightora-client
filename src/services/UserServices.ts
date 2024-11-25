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
      console.log("response: ", res);
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return err.response;
    });

  return response;
};

export const updateMe = async (
  userProfile: Partial<UserProfile>
): Promise<AxiosResponse> => {
  return await axios
    .patch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/updateMe`,
      userProfile,
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
};

export const updatePhoto = async (
  formData: FormData
): Promise<AxiosResponse> => {
  return await axios
    .patch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/users/updatePhoto`,
      formData,
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
