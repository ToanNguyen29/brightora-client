import axios, { AxiosResponse } from "axios";

export const createTranscript = async (
  token: string | null,
  s3_url: string
): Promise<AxiosResponse> => {
  const response = await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/transcript/`,
      {
        s3_url,
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

export const getTranscript = async (
  token: string | null,
  videoUrl: string
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/transcript/?s3_url=${videoUrl}`,
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
      console.log("err", err);
      return err.response;
    });
  return response;
};
