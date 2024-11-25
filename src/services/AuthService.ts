import axios, { AxiosResponse } from "axios";
import {
  LoginRequest,
  SignUpRequest,
  UpdatePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../models/Auth";

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
      console.log("response: ", res);
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
      console.log("response: ", res);
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
      console.log("response: ", res);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};

export const updatePassword = async ({
  passwordCurrent,
  password,
  passwordConfirm,
}: UpdatePasswordRequest): Promise<AxiosResponse> => {
  return await axios
    .patch(
      `${import.meta.env.VITE_AUTH_SERVER}/api/v1/users/updatePassword`,
      { passwordCurrent, password, passwordConfirm },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("response: ", res);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};

export const forgotPassword = async ({
  email,
}: ForgotPasswordRequest): Promise<AxiosResponse> => {
  return await axios
    .post(
      `${import.meta.env.VITE_AUTH_SERVER}/api/v1/users/forgotPass`,
      { email },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("response: ", res);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};

export const resetPassword = async ({
  password,
  passwordConfirm,
  token,
}: ResetPasswordRequest): Promise<AxiosResponse> => {
  return await axios
    .patch(
      `${import.meta.env.VITE_AUTH_SERVER}/api/v1/users/resetPassword/${token}`,
      { password, passwordConfirm },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("response: ", res);
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
      console.log("response: ", res);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err);
      return err.response;
    });
};

export const facebookAuth = async (
  id: string,
  name: string,
  email: string
): Promise<AxiosResponse> => {
  return await axios
    .post(
      `${import.meta.env.VITE_AUTH_SERVER}/api/v1/users/auth/facebook`,
      { id, name, email },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log("response: ", res);
      return res;
    })
    .catch((err) => {
      console.log("error: ", err.response);
      return err.response;
    });
};
