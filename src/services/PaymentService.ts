import axios, { AxiosResponse } from "axios";

// ${import.meta.env.VITE_SERVER_URL}

export const createPayment = async (
  token: string | null,
  courses: any[],
  // total_price: number,
  paypal_id: string
): Promise<AxiosResponse> => {
  const response = await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/enrollment/payment/`,
      {
        // total_price,
        courses,
        paypal_id,
      },
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

  return response;
};

export const getStats = async (
  token: string | null,
  queryParams: string
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/enrollment/payment/statistics?${queryParams}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => {
      console.log("err", err);
      return err.response;
    });
  return response;
};
