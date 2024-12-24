import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
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
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!courseId || !token) return;

    const fetchQAndA = async () => {
      try {
        const data = await getQAndAByCourse(token, courseId, 1, 10);
        if (data.status <= 305) {
          console.log("getQAndAByCourse", data.data.data);
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
      {/* <QandAList data={qAndAList} instructorInfo={instructorInfo?._id} /> */}
    </Box>
  );
};

export default QuesAndAns;
