import React, { useCallback, useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import SearchBar from "../navbar/SearchBar";
import { Box } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { getWishlistMe } from "../../services/WishListService";
import { ICourseCard } from "../../models/Course";
import CourseGrid from "../home/tabview/CourseGrid";

const WishList: React.FC = () => {
  const token = localStorage.getItem("token");
  // const { mode } = useThemeContext();
  // const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courseInWishList, setCourseInWishList] = useState<ICourseCard[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<ICourseCard[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  // Hàm fetch danh sách wishlist
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

  // Lọc danh sách wishlist khi searchQuery thay đổi
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courseInWishList); // Nếu không có searchQuery, hiển thị tất cả
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
        <Box>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </Box>
      </Box>
      {filteredCourses && (
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
