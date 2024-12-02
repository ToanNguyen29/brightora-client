import axios, { AxiosResponse } from "axios";

// ${import.meta.env.VITE_CART_SERVICE_SERVER}

export const getCartMe = async (
  token: string | null
): Promise<AxiosResponse> => {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/get_by_owner`, {
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

export const addItemToCartMe = async (
  token: string | null,
  items: any
): Promise<AxiosResponse> => {
  const response = await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/add_to_cart`,
      { items },
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

export const deleteItemFromCartMe = async (
  token: string | null,
  courseId: string
): Promise<AxiosResponse> => {
  const response = await axios
    .delete(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/rm_course/${courseId}`,
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
      console.log(err);
      return err.response;
    });

  return response;
};
