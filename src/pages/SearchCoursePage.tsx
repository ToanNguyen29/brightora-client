import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../theme/ThemeContext";

import { useNavigate, useParams } from "react-router-dom";
import SearchCourseItem from "../components/searchcourse/SearchCourseItem";
import { ICourseInfoPage } from "../models/Course";
import { searchCourse } from "../services/CourseService";
import FilterBar from "../components/searchcourse/FilterBar";

const SearchCoursePage: React.FC = () => {
  const { querySearch } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mode } = useThemeContext();
  const [courses, setCourses] = useState<ICourseInfoPage[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItem, setTotalItem] = useState<number>(0);

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    if (!querySearch) return;
    const fetchCourse = async () => {
      try {
        await searchCourse(querySearch, pageNumber, pageSize).then((data) => {
          console.log(data);
          if (data.status <= 305) {
            setTotalItem(data.data.total_items);
            setCourses(data.data.data);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [querySearch, pageNumber, pageSize]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={"bold"}
        sx={{ mt: 6, mb: 1.5, color: textColor, mx: "15%" }}
      >
        {`${totalItem} results for "${querySearch}"`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "70%",
          minHeight: "90vh",
          backgroundColor,
          color: textColor,
          mt: 5,
          mx: "15%",
        }}
      >
        {/* Filter Bar Section */}
        <Box
          sx={{
            flex: "1",
            pr: 2,
            mt: 1.5,
          }}
        >
          <FilterBar />
        </Box>

        {/* Course List Section */}
        <Box sx={{ flex: "5", pl: 2, flexDirection: "column" }}>
          {/* <Typography
            variant="body1"
            fontWeight={"bold"}
            sx={{ display: "flex", mb: 1.5, justifyContent: "flex-end" }}
          >
            {`${totalItem} results`}
          </Typography> */}
          <Box
            sx={{
              justifyContent: "left",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Render courses */}
            {courses &&
              courses.map((item) => (
                <SearchCourseItem
                  key={item._id}
                  id={item._id}
                  updated_at={item.updated_at}
                  title={item.title}
                  subtitle={item.subtitle}
                  price={item.price}
                  rating={item.review.average_rating}
                  numberRating={item.review.total_reviews}
                  thumbnail={item.thumbnail || ""}
                  first_name={item.owner.first_name}
                  last_name={item.owner.last_name}
                  level={item.level || []}
                />
              ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Pagination
              count={Math.ceil(totalItem / pageSize)}
              page={pageNumber}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchCoursePage;
