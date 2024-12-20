import React, { useEffect, useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

import { useParams, useNavigate } from "react-router-dom";
import SearchCourseItem from "./SearchCourseItem";
import { ICourseInfoPage } from "../../models/Course";
import { searchCourse } from "../../services/CourseService";
import FilterBar, { Type } from "./FilterBar";
import { useAuth } from "../../context/AuthContext";

interface SearchCoursePageProps {
  defaultType?: Type;
}

const SearchCoursePage: React.FC<SearchCoursePageProps> = ({ defaultType }) => {
  const { querySearch } = useParams();
  const { t } = useTranslation();
  const { userInfo } = useAuth();
  const { mode } = useThemeContext();
  const navigate = useNavigate(); // Dùng để điều hướng về trang chủ
  const [courses, setCourses] = useState<ICourseInfoPage[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [filter, setFilter] = useState(() =>
    defaultType ? `category=${defaultType}` : ""
  );

  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const updateQuerySearch = querySearch
          ? "search" + "=" + querySearch + "&" + filter
          : filter;

        await searchCourse(updateQuerySearch, pageNumber, pageSize).then(
          (data) => {
            if (data.status <= 305) {
              console.log("Hello search:", data.data);
              setTotalItem(data.data.total_items);
              setCourses(data.data.data);
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [filter, pageNumber, pageSize, querySearch, userInfo._id]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        backgroundColor,
        color: textColor,
      }}
    >
      <Box
        sx={{
          flex: "1.5",
          pr: 2,
          mt: 1.5,
        }}
      >
        <FilterBar setFilter={setFilter} defaultType={defaultType} />
      </Box>

      <Box sx={{ flex: "5", pl: 2, flexDirection: "column" }}>
        <Box
          sx={{
            justifyContent: "left",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: textColor, fontWeight: "bold" }}
          >
            {querySearch && `${totalItem} results for "${querySearch}"`}
          </Typography>

          {courses.length === 0 ? (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ marginBottom: "20px", textAlign: "center", mt: 7 }}
            >
              {t("no_courses_found")}.
            </Typography>
          ) : (
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
                discount_percentage={item.discount_percentage || 0}
              />
            ))
          )}
        </Box>

        {courses.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: "30px",
            }}
          >
            <Pagination
              count={Math.ceil(totalItem / pageSize)}
              page={pageNumber}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchCoursePage;
