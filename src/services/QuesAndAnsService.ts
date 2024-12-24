import axios, { AxiosResponse } from "axios";

export const createQuestion = async (
  token: string,
  question: string,
  courseId: string
): Promise<AxiosResponse> => {
  const formData = {
    question: question,
    course: courseId,
  };
  const response = await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/qa/`,
      { ...formData },
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

export const getQAndAByCourse = async (
  token: string | null,
  courseId: string,
  page_number: number | undefined,
  page_size: number | undefined
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/courses/qa/?course=${courseId}&page_number=${page_number}&page_size=${page_size}`,
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

export const createAnswer = async (
  token: string | null,
  qa_id: string,
  content: string
): Promise<AxiosResponse> => {
  const response = await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/qa/answer/`,
      { qa_id, content },
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
