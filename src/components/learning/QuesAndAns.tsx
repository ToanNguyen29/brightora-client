import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, Pagination } from "@mui/material";
import { getQAndAByCourse } from "../../services/QuesAndAnsService";
import { useAuth } from "../../context/AuthContext";
import MyQA from "./MyQA";
import { IOwner } from "../../models/Course";
import { IQAndA } from "../../models/QaA";
import QandAList from "./QandAList";

interface QuesAndAnsProps {
  courseId: string | undefined;
  instructorInfo: IOwner | undefined;
}

const QuesAndAns: React.FC<QuesAndAnsProps> = ({
  courseId,
  instructorInfo,
}) => {
  const { userInfo } = useAuth();
  const [qAndAList, setQAndAList] = useState<IQAndA[]>([]);
  const [userQA, setUserQA] = useState<IQAndA[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!courseId || !token) return;

    const fetchQAndA = async () => {
      try {
        const data = await getQAndAByCourse(token, courseId, 1, 100);
        if (data.status <= 305) {
          const qAndAItems: IQAndA[] = data.data.data;

          const matches = qAndAItems.filter(
            (qa: IQAndA) => qa.student._id === userInfo._id
          );

          if (matches.length > 0) {
            setUserQA(matches);
          }

          const remainingQAndA = qAndAItems.filter(
            (qa: IQAndA) => qa.student._id !== userInfo._id
          );
          setQAndAList(remainingQAndA);
        }
      } catch (error) {
        console.error("Failed to fetch Q&A:", error);
      }
    };

    fetchQAndA();
  }, [courseId, token, userInfo._id]);

  // Calculate the data to display based on the current page and items per page
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const currentQAndAList = qAndAList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box p={3}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mx: "10%" }}
      >
        All questions of you ({userQA.length})
      </Typography>
      <MyQA
        qAndA={userQA}
        setData={setUserQA}
        courseId={courseId}
        instructorInfo={instructorInfo}
      />
      <Divider sx={{ my: 3 }}></Divider>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", mx: "10%" }}
      >
        All questions in this course ({qAndAList.length})
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          backgroundColor: "white",
          width: "80%",
          color: "black",
          mx: "10%",
          borderRadius: 2,
          margin: "auto",
        }}
      >
        <QandAList
          data={currentQAndAList} // Pass the sliced data for the current page
          instructorInfo={instructorInfo?._id}
          setData={setQAndAList}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(qAndAList.length / itemsPerPage)} // Total pages
          page={page}
          onChange={handlePageChange} // Handle page change
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default QuesAndAns;
