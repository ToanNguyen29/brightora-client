import React from "react";
import UserHead from "../../components/user/intercommunity/Head";
import EditAccountBody from "../../components/user/edit-account/Body";

const EditAccountPage: React.FC = () => {
   return (
      <>
         <UserHead title={"account"} subtitle={"edit_account_description"} />
         <EditAccountBody />
      </>
   );
};

export default EditAccountPage;
