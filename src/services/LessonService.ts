import axios, { AxiosResponse } from "axios";
import { IDocument } from "../models/Course";

const lesson_url = `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/lessons`;

export const getLessonInfo = async (id: string) => {
  try {
    const response = await axios.get(`${lesson_url}/get_by_id/${id}`, {
      withCredentials: true,
    });
    // console.log("geeeeeeee", response);
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

export const updateLesson = async (
  token: string | null,
  id: string,
  title: string
): Promise<AxiosResponse> => {
  return await axios
    .put(
      `${lesson_url}/${id}`,
      { title },
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
};

export const updateDocuments = async (
  token: string | null,
  id: string,
  documents: IDocument[]
) => {
  try {
    const response = await axios.put(
      `${lesson_url}/${id}`,
      {
        documents: documents,
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

export const saveDocument = async (token: string | null, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await axios.post(`${lesson_url}/save_document`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response);
      return error.response;
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message);
    }
  }
};
export const updateLessonVideo = async (
  token: string | null,
  id: string,
  url: string
) => {
  try {
    console.log(id, url);
    const response = await axios.put(
      `${lesson_url}/${id}`,
      { video_url: url },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("toannn", response);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response;
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message);
    }
  }
};

export const updateLessonDescription = async (
  token: string | null,
  id: string,
  description: string
) => {
  try {
    const response = await axios.put(
      `${lesson_url}/${id}`,
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

export const createNewLesson = async (token: string | null) => {
  try {
    const response = await axios.post(
      `${lesson_url}/`,
      {
        title: "New Lesson",
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
