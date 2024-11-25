import React from "react";
import UserHead from "../../components/user/intercommunity/Head";
import CloseAccountBody from "../../components/user/close-account/Body";

const CloseAccountPage: React.FC = () => {
   return (
      <>
         <UserHead
            title={"close_account"}
            subtitle={"close_account_description"}
         />
         <CloseAccountBody />
      </>
   );
};

export default CloseAccountPage;
