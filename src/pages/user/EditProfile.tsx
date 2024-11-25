import React from "react";

import EditProfileBody from "../../components/user/edit-profile/Body";
import UserHead from "../../components/user/intercommunity/Head";

const EditProfilePage: React.FC = () => {
   return (
      <>
         <UserHead
            title={"public_profile"}
            subtitle={"add_information_about_yourself"}
         />
         <EditProfileBody />
      </>
   );
};

export default EditProfilePage;
