import axios from "axios";

// ${import.meta.env.VITE_SERVER_URL}

export const getCheckoutSessionStripe = async (courses: any): Promise<any> => {
  const response = await axios
    .post(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/payments/checkout-session-stripe`,
      {
        courses,
      },
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

export const addItemToCartMe = async (courseId: string): Promise<any> => {
  const response = await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/item`,
      { courseId },
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

export const deleteItemFromCartMe = async (courseId: string): Promise<any> => {
  const response = await axios
    .delete(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/payments/item/${courseId}`,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });

  return response;
};
