import axios, { AxiosResponse } from "axios";
import { CurriculumMap } from "../models/Course";

const section_url = `${
  import.meta.env.VITE_SERVER_URL
}/api/v1/courses/sections`;

export const getSectionInfo = async (id: string) => {
  try {
    const response = await axios.get(`${section_url}/get_by_id/${id}`, {
      withCredentials: true,
    });

    return response; // Return the data on success
  } catch (error: any) {
    // Handle error and check for response status
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

export const getSectionByCourseId = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/courses/get_curriculum/${id}`,
      {
        withCredentials: true,
      }
    );

    return response; // Return the data on success
  } catch (error: any) {
    // Handle error and check for response status
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

export const updateSectionLesson = async (
  token: string | null,
  id: string,
  lessons: CurriculumMap[]
) => {
  try {
    const response = await axios.put(
      `${section_url}/${id}`,
      {
        lessons: lessons,
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

export const createNewSection = async (
  token: string | null
  // id: string | undefined,
) => {
  try {
    const response = await axios.post(
      `${section_url}/`,
      {
        title: "New Section",
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
    console.log(error);
    if (error.response) {
      return error.response; // Return error data
    } else {
      return new Error(error.message); // Return generic error if no response
    }
  }
};

export const updateSection = async (
  token: string | null,
  id: string,
  title: string
): Promise<AxiosResponse> => {
  return await axios
    .put(
      `${section_url}/${id}`,
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
