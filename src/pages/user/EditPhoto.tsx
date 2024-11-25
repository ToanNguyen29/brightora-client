import React from "react";
import UserHead from "../../components/user/intercommunity/Head";
import EditPhotoBody from "../../components/user/edit-photo/Body";

const EditPhotoPage: React.FC = () => {
   return (
      <>
         <UserHead title={"photo"} subtitle={"photo_description"} />
         <EditPhotoBody />
      </>
   );
};

export default EditPhotoPage;
