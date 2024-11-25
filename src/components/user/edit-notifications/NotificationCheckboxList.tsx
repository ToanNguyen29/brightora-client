import React from "react";
import NotificationCheckbox from "./NotificationCheckbox";

interface NotificationCheckboxListProps {
   formState: {
      promotions: boolean;
      announcements: boolean;
      dontSend: boolean;
   };
   setFormState: React.Dispatch<
      React.SetStateAction<{
         promotions: boolean;
         announcements: boolean;
         dontSend: boolean;
      }>
   >;
}

const NotificationCheckboxList: React.FC<NotificationCheckboxListProps> = ({
   formState,
   setFormState,
}) => {
   // Handler for checkbox change
   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>,
   ) => {
      const { name, checked } = event.target;
      setFormState((prevState) => ({
         ...prevState,
         [name]: checked,
      }));
   };

   return (
      <>
         <NotificationCheckbox
            name="promotions"
            checked={formState.promotions}
            onChange={handleCheckboxChange}
            label="notifications_promotion"
         />
         <NotificationCheckbox
            name="announcements"
            checked={formState.announcements}
            onChange={handleCheckboxChange}
            label="notifications_announcements"
         />
         <NotificationCheckbox
            name="dontSend"
            checked={formState.dontSend}
            onChange={handleCheckboxChange}
            label="notifications_dont_send"
         />
      </>
   );
};

export default NotificationCheckboxList;
