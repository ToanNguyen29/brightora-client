import axios from "axios";
import { MultipleChoiceQuestion } from "../models/Course";

const exercise_url = `${
  import.meta.env.VITE_SERVER_URL
}/api/v1/courses/exercises`;

export const getExerciseInfo = async (id: string) => {
  try {
    const response = await axios.get(`${exercise_url}/get_by_id/${id}`, {
      withCredentials: true,
    });
    console.log("alo exercise", response);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response; // Return error data
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message); // Return generic error if no response
    }
  }
};

export const createNewExercise = async (token: string | null) => {
  try {
    const response = await axios.post(
      `${exercise_url}/`,
      {
        title: "New Exercise",
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response; // Return error data
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message); // Return generic error if no response
    }
  }
};

export const updateQuestions = async (
  token: string | null,
  id: string,
  questions: MultipleChoiceQuestion[]
) => {
  try {
    const response = await axios.put(
      `${exercise_url}/${id}`,
      {
        questions: questions,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response; // Return error data
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message); // Return generic error if no response
    }
  }
};

export const updateExcerciseDescription = async (
  token: string | null,
  id: string,
  description: string
) => {
  try {
    const response = await axios.put(
      `${exercise_url}/${id}`,
      {
        description: description,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response; // Return error data
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message); // Return generic error if no response
    }
  }
};

export const genQuestion = async (
  token: string | null,
  count: number,
  lang: string,
  difficult: number,
  description: string
) => {
  try {
    const response = await axios.post(
      `${exercise_url}/gen_questions`,
      {
        count: count,
        lang: lang,
        difficult: difficult,
        description: description,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response.data; // Return error data
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message); // Return generic error if no response
    }
  }
};
