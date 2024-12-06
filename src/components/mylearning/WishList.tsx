import React, { useCallback, useEffect, useState } from "react";
import SearchBar from "../navbar/SearchBar";
import { Box, Typography, Button } from "@mui/material";
import { getWishlistMe } from "../../services/WishListService";
import { ICourseCard } from "../../models/Course";
import CourseGrid from "../home/tabview/CourseGrid";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const WishList: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { mode } = useThemeContext();
  const { t } = useTranslation();
  const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
  const textColor = mode === "light" ? "#000000" : "#ffffff";
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courseInWishList, setCourseInWishList] = useState<ICourseCard[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourseCard[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  const fetchWishList = useCallback(async () => {
    try {
      await getWishlistMe(token).then((data) => {
        console.log("getWishlistMe", data.data.wishlist.wishlists);
        const courses = data.data.wishlist.wishlists.map((item) => item.course);
        console.log(courses);
        setCourseInWishList(courses);
        setFilteredCourses(courses);
      });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [token]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courseInWishList);
    } else {
      const filtered = courseInWishList.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courseInWishList]);

  useEffect(() => {
    fetchWishList();
  }, [fetchWishList]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={5}>
        <Box
          sx={{
            mb: 2,
            width: "200px",
            backgroundColor: "white",
            borderRadius: 1,
            ml: "auto",
            display: "block",
          }}
        >
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </Box>
      </Box>
      {filteredCourses.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography
            variant="body1"
            color={textColor}
            gutterBottom
            sx={{ mb: 3 }}
          >
            You don't have any courses in your wish list. Explore amazing
            courses now!
          </Typography>
          <Button
            variant="outlined"
            // color="primary"
            sx={{
              color: backgroundColor,
              backgroundColor: textColor,
              borderColor: textColor,
              ":hover": {
                color: textColor,
                backgroundColor: backgroundColor,
              },
            }}
            onClick={() => navigate("/")} // Điều hướng đến trang chủ
          >
            Browse Now
          </Button>
        </Box>
      ) : (
        <CourseGrid
          courses={filteredCourses} // Hiển thị danh sách đã lọc
          isWishListCard={true}
          fetchWishList={fetchWishList}
        />
      )}
    </>
  );
};

export default WishList;
