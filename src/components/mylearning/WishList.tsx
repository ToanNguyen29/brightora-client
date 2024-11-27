import React, { useCallback, useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import SearchBar from "../navbar/SearchBar";
import { Box } from "@mui/material";
// import Rating from "@mui/material/Rating";

// import StarIcon from "@mui/icons-material/Star";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { getWishlistMe } from "../../services/WishListService";
import { ICourseCard } from "../../models/Course";
import CourseGrid from "../home/tabview/CourseGrid";

const WishList: React.FC = () => {
  const token = localStorage.getItem("token");
  const { mode } = useThemeContext();
  const { t } = useTranslation();

  // const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  // const [selectedRating, setSelectedRating] = useState<number | null>(0);
  // const [reviewText, setReviewText] = useState("");

  // const handleRatingOpen = () => setRatingDialogOpen(true);
  // const handleRatingClose = () => setRatingDialogOpen(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  const [courseInWishList, setCourseInWishList] = useState<
    ICourseCard[] | undefined
  >();

  const fetchWishList = useCallback(async () => {
    try {
      await getWishlistMe(token).then((data) => {
        console.log("getWishlistMe", data.data.wishlist.wishlists);
        const courses = data.data.wishlist.wishlists.map((item) => item.course);
        console.log(courses);
        setCourseInWishList(courses);
      });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchWishList();
  }, [fetchWishList]);

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} mb={5}>
        <Box flex={7}>
          <FilterBar flex={7} />
        </Box>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </Box>
      {courseInWishList && (
        <CourseGrid
          courses={courseInWishList}
          isWishListCard={true}
          fetchWishList={fetchWishList}
        />
      )}
    </>
  );
};

export default WishList;
