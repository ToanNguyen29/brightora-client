import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { getQAndAByCourse } from "../../services/QuesAndAnsService";
import { useAuth } from "../../context/AuthContext";
import QAItem from "./QAItem";
import MyQA from "./MyQA";
import { IOwner } from "../../models/Course";

interface QuesAndAnsProps {
  courseId: string | undefined;
  instructorInfo: IOwner | undefined;
}

interface IQAndA {
  _id: string;
  question: string;
  answer: string | null;
  student: {
    first_name: string;
    last_name: string;
    photo: string;
    _id: string;
  };
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
          console.log(data.data.data);
          const qAndAItems: IQAndA[] = data.data.data;

          // Filter for matching items based on userInfo._id
          const matches = qAndAItems.filter(
            (qa: IQAndA) => qa.student._id === userInfo._id
          );

          if (matches.length > 0) {
            setUserQA(matches); // Set the matching list
          }

          // Remove matched items from Q&A list
          const remainingQAndA = qAndAItems.filter(
            (qa: IQAndA) => qa.student._id !== userInfo._id
          );
          setQAndAList(remainingQAndA); // Update Q&A list without matched items
        }
      } catch (error) {
        console.error("Failed to fetch Q&A:", error);
      }
    };

    fetchQAndA();
  }, [courseId, token, userInfo._id]);

  return (
    <Box p={3}>
      <MyQA
        qAndA={userQA}
        courseId={courseId}
        instructorInfo={instructorInfo}
      />
      <Divider sx={{ my: 3 }}></Divider>
      {qAndAList.map((item) => (
        <QAItem key={item._id} qAndA={item} instructorInfo={instructorInfo} />
      ))}
    </Box>
  );
};

export default QuesAndAns;
