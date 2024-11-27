import axios, { AxiosResponse } from "axios";

// ${import.meta.env.VITE_CART_SERVICE_SERVER}

export const getEnrollmentMe = async (
  token: string | null
): Promise<AxiosResponse> => {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/enrollment/course_me`, {
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
