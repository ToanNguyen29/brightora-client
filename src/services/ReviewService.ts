import axios, { AxiosResponse } from "axios";

export const createReview = async (
  token: string | null,
  course: string,
  rating: number,
  comment: string
): Promise<AxiosResponse> => {
  const response = await axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/review/`,
      { course, rating, comment },
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

export const updateReview = async (
  token: string | null,
  reviewId: string,
  rating: number,
  comment: string
): Promise<AxiosResponse> => {
  const response = await axios
    .put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/review/${reviewId}`,
      { rating, comment },
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

export const getReviewMeOfCourse = async (
  token: string | null,
  courseId: string
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/review/get_personal_review/${courseId}`,
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

export const getReviewByCourse = async (
  // token: string | null,
  courseId: string,
  page_number: number | undefined,
  page_size: number | undefined
  // sort_by: string
): Promise<AxiosResponse> => {
  const response = await axios
    .get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/v1/review/get_by_course?course=${courseId}&page_number=${page_number}&page_size=${page_size}`,
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
