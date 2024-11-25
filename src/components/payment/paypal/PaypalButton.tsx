import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButtonComponent: React.FC = () => {
   const handleApprove = (orderId: string) => {
      console.log("Order Approved:", orderId);
      // Handle post-approval actions here (e.g., save the transaction in the database)
   };

   const buttonProps = {
      createOrder: (data: any, actions: any) => {
         return actions.order.create({
            purchase_units: [
               {
                  amount: {
                     value: "00.01", // Replace with the amount you want
                  },
               },
            ],
            application_context: {
               shipping_preference: "NO_SHIPPING", // Disable billing/shipping address
            },
         });
      },
      onApprove: (data: any, actions: any) => {
         return actions.order.capture().then((details: any) => {
            console.log("Transaction completed:", details);
            handleApprove(details.id);
         });
      },
      onError: (err: any) => {
         console.error("PayPal Checkout Error:", err);
      },
   } as any;

   return <PayPalButtons {...buttonProps} />;
};

export default PayPalButtonComponent;
