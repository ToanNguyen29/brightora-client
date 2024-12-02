import axios, { AxiosResponse } from "axios";
import { Scheduler } from "../models/Course";
import { Message } from "../components/quiz/QAQuiz";

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

export const getEnrollByCourse = async (
  courseId: string,
  token: string | null
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/enrollment/get_by_course/${courseId}`,
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

export const updateScheduler = async (
  token: string | null,
  id: string,
  schedule: Scheduler[]
) => {
  const response = await axios
    .put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/enrollment/${id}/`,
      {
        schedule: schedule,
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

export const getAnswer = async (
  question: string,
  answer: string,
  conversation_history: Message[]
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/enrollment/ai/answer/`,
      {
        question: question,
        answer: answer,
        conversation_history: conversation_history,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err: any) {
    return err.response?.data || { error: "Something went wrong" };
  }
};
