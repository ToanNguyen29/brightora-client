import React from "react";
import { PayPalProvider } from "./PaypalProvider";
import PayPalButtonComponent from "./PaypalButton";

interface PaypalPageProps {
  courses: any[];
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaypalPage: React.FC<PaypalPageProps> = ({ courses, setIsDone }) => {
  return (
    <>
      <PayPalProvider clientId="AffWT5YlVVxPVT-G0ubVI0beMf_U_ALkq7HT9ABh14BdzAm32cy4FUa8BJgV03DcUc5R99q0ZByNfxVy">
        <PayPalButtonComponent courses={courses} setIsDone={setIsDone} />
      </PayPalProvider>
    </>
  );
};

export default PaypalPage;
