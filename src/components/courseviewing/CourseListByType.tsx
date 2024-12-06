import { CourseFilterType, ICourseCard } from "../../models/Course";
import { useEffect, useState } from "react";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"; // Import icons
import { getCourseByType } from "../../services/CourseService";
import { Box, IconButton } from "@mui/material";
import CourseGrid from "../home/tabview/CourseGrid";
import { useTranslation } from "react-i18next";

interface CourseListByTypeProps {
  type: string | undefined;
}

const CourseListByType: React.FC<CourseListByTypeProps> = ({ type }) => {
  const [data, setData] = useState<ICourseCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 4;
  const { t } = useTranslation();

  // Calculate total pages based on the total items
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    if (type) {
      const fetchData = async () => {
        const filter: CourseFilterType = {
          type: type,
          page_number: currentPage,
          page_size: pageSize,
          sort_by: "",
          sort_order: 1,
        };
        const response = await getCourseByType(filter);
        console.log("Fetched data:", response);
        setData(response.data);
        setTotalItems(response.total_items);
      };

      fetchData();
    }
  }, [type, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <IconButton
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        sx={{ mr: 2 }}
      >
        <ArrowBackIos />
      </IconButton>
      {data && (
        <CourseGrid
          courses={data}
          coursesPerPageValue={pageSize}
          pagination={false}
        />
      )}
      <IconButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages || totalPages === 0}
        sx={{ ml: 2 }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default CourseListByType;
