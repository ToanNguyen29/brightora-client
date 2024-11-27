import axios, { AxiosResponse } from "axios";

// ${import.meta.env.VITE_CART_SERVICE_SERVER}

export const getEnrollment = async (
  token: string | null
  //   id: string | undefined
): Promise<AxiosResponse> => {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/enrollment/`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};
