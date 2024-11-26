import React from "react";
import { PayPalProvider } from "./PaypalProvider";
import PayPalButtonComponent from "./PaypalButton";

interface PaypalPageProps {
  courses: any[];
}

const PaypalPage: React.FC<PaypalPageProps> = ({ courses }) => {
  return (
    <>
      <PayPalProvider clientId="AffWT5YlVVxPVT-G0ubVI0beMf_U_ALkq7HT9ABh14BdzAm32cy4FUa8BJgV03DcUc5R99q0ZByNfxVy">
        <PayPalButtonComponent courses={courses} />
      </PayPalProvider>
    </>
  );
};

export default PaypalPage;
