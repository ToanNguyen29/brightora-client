import React from "react";
import UserHead from "../../components/user/intercommunity/Head";
import EditPrivacyBody from "../../components/user/edit-privacy/Body";

const EditPrivacyPage: React.FC = () => {
   return (
      <>
         <UserHead title={"privacy"} subtitle={"edit_privacy_description"} />
         <EditPrivacyBody />
      </>
   );
};

export default EditPrivacyPage;
