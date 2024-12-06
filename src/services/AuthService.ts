import axios, { AxiosResponse } from "axios";
import { LoginRequest, SignUpRequest } from "../models/Auth";

export const login = async ({
  email,
  password,
}: LoginRequest): Promise<AxiosResponse> => {
  return await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/token`,
      { email, password },
      { withCredentials: true }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpRequest): Promise<AxiosResponse> => {
  return await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
      { email, password, first_name: firstName, last_name: lastName },
      { withCredentials: true }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};

export const logOut = async (token: string | null): Promise<AxiosResponse> => {
  return await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/logout`,
      {},
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
      console.log("error: ", err.response);
      return err.response;
    });
};

export const updatePassword = async (
  token: string | null,
  current_password: string,
  new_password: string
): Promise<AxiosResponse> => {
  return await axios
    .put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/change_password`,
      { current_password, new_password },
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
      console.log("error: ", err.response);
      return err.response;
    });
};

export const forgotPassword = async (email: string): Promise<AxiosResponse> => {
  return await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/forgot-password`,
      { email },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};

export const resetPassword = async (
  token: string,
  new_password: string
): Promise<AxiosResponse> => {
  return await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/reset-password`,
      { token, new_password },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};

export const googleAuth = async (code: string): Promise<AxiosResponse> => {
  return await axios
    .get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/auth/google?code=${code}`,
      { withCredentials: true }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      return err.response;
    });
};
