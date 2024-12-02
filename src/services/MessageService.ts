import axios, { AxiosResponse } from "axios";

export const getAllConversations = async (
  token: string | null
): Promise<AxiosResponse> => {
  const response = await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/conversation/get_me`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("conversation err", err);
      return err.response;
    });

  return response;
};

export const getConversation = async (
  token: string | null,
  id: string
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/conversation/get_by_id/${id}`,
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
