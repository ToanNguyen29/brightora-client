import { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";
import { useThemeContext } from "../theme/ThemeContext";
import CourseList from "../components/user/user-accout-page/CourseList";
import { IGetUserInfo } from "../models/User";
import ButtonLink from "../components/user/user-accout-page/ButtonLink";
import UserInfo from "../components/user/user-accout-page/UserInfo";
import { useParams } from "react-router-dom";
import { getUser } from "../services/UserServices";

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

const UserAccountPage = () => {
  const { id } = useParams();
  const { mode } = useThemeContext();

  const [user, setUser] = useState<Partial<IGetUserInfo> | undefined>();

  useEffect(() => {
    if (!id) return;
    const fetchInstructorInfo = async () => {
      await getUser(id)
        .then((data) => {
          if (data.status <= 305) {
            setUser(data.data.data);
          } else {
            console.log("else");
          }
        })
        .catch((err) => {
          alert("Error: " + err.detail);
        });
    };
    fetchInstructorInfo();
  }, [id]);

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        px: "20%",
        borderColor: mode === "dark" ? "white" : "black",
        backgroundColor: "transparent",
        maxWidth: "100%",
        height: "100%",
        // minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderColor: mode === "dark" ? "white" : "black",
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
        <UserInfo userInfo={user}></UserInfo>
        <CourseList id={id} />
      </Box>
      <Box
        sx={{
          p: 3,
          borderColor: mode === "dark" ? "white" : "black",
          backgroundColor: "transparent",
          width: "40%",
        }}
      >
        <Avatar
          alt={`${user?.photo}`}
          src={`${user?.photo}`}
          sx={{
            width: 200,
            height: 200,
            fontSize: 30,
            marginBottom: "5px",
          }}
        />
        <ButtonLink
          facebook_link={user?.facebook_link}
          youtube_link={user?.youtube_link}
          linkedin_link={user?.linkedin_link}
          twitter_link={user?.twitter_link}
          website_link={user?.website_link}
        />
      </Box>
    </Box>
  );
};

export default UserAccountPage;
