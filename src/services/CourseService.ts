import axios, { AxiosResponse } from "axios";
import {
  CourseFilterType,
  CurriculumMap,
  GenerateThumbnailForm,
  ICreateCourse,
  IUpdateCourse,
} from "../models/Course";

const course_url = `${import.meta.env.VITE_SERVER_URL}/api/v1/courses`;

export const createCourse = async (
  token: string | null,
  formData: ICreateCourse
): Promise<AxiosResponse> => {
  console.log(course_url);
  const response = await axios
    .post(
      `${course_url}`,
      {
        ...formData,
      },
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
      return err.response;
    });

  return response;
};

export const updateCourse = async (
  token: string | null,
  id: string,
  formData: IUpdateCourse
): Promise<AxiosResponse> => {
  console.log(formData);
  const response = await axios
    .put(
      `${course_url}/${id}`,
      {
        ...formData,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);

      return err.response;
    });

  return response;
};

export const getCoursesByOwner = async (
  id: string,
  pageNumber: number | undefined,
  pageSize: number | undefined
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${course_url}?owner=${id}&page_number=${pageNumber}&page_size=${pageSize}`,
      {
        withCredentials: true,
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

export const getCourse = async (id: string): Promise<AxiosResponse> => {
  const response = await axios
    .get(`${course_url}/get_by_id/${id}`, {
      withCredentials: true,
    })
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

export const updateCourseImage = async (
  token: string | null,
  id: string,
  url: string
) => {
  const response = await axios
    .put(
      `${course_url}/${id}`,
      { thumbnail: url },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

  return response;
};

export const updatePromotionalVideo = async (
  token: string | null,
  id: string,
  url: string
) => {
  const response = await axios
    .put(
      `${course_url}/${id}`,
      {
        promotional_video: url,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err.response;
    });

  return response;
};

export const getCourseCurriculum = async (id: string) => {
  try {
    const response = await axios.get(`${course_url}/get_curriculum/${id}`, {
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

export const updateCurriculumSection = async (
  token: string | null,
  id: string,
  sections: CurriculumMap[]
) => {
  try {
    console.log(sections);
    const response = await axios.put(
      `${course_url}/${id}`,
      {
        sections: sections,
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

export const getCourseByType = async (filter: CourseFilterType) => {
  try {
    const response = await axios.get(
      `${course_url}/get_by_type?type=${filter.type}&page_number=${filter.page_number}&page_size=${filter.page_size}&sort_by=${filter.sort_by}&sort_order=${filter.sort_order}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error Status Code:", error.response.status);
      console.log("Error Data:", error.response.data);
      return error.response.data;
    } else {
      console.log("Request failed:", error.message);
      return new Error(error.message);
    }
  }
};

export const generateThumnail = async (
  formData: GenerateThumbnailForm,
  token: string
) => {
  console.log(course_url);
  const response = await axios
    .post(
      `${course_url}/ai/generate_thumbnail`,
      {
        ...formData,
      },
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
      return err.response;
    });

  return response;
};

export const generateDescription = async (title: string) => {
  console.log(course_url);
  const response = await axios
    .post(`${course_url}/ai/gen_description`, {
      course_title: title,
    })
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};
