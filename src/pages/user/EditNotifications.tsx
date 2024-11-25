import React from "react";
import UserHead from "../../components/user/intercommunity/Head";
import EditNotificationsBody from "../../components/user/edit-notifications/Body";

const EditNotificationsPage: React.FC = () => {
   return (
      <>
         <UserHead
            title={"notifications"}
            subtitle={"notifications_descriptions"}
         />
         <EditNotificationsBody />
      </>
   );
};

export default EditNotificationsPage;
