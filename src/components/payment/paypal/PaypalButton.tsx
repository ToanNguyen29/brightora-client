import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPayment } from "../../../services/PaymentService";

interface PayPalButtonComponentProps {
  courses: any[];
}

const PayPalButtonComponent: React.FC<PayPalButtonComponentProps> = ({
  courses,
}) => {
  const token = localStorage.getItem("token");
  const calculateTotalAmount = () => {
    return courses
      .reduce((total, course) => total + course.price, 0)
      .toFixed(2);
  };

  const handleApprove = async (orderId: string) => {
    console.log("Order Approved:", orderId);

    try {
      const courseList = courses.map((x) => x._id);
      await createPayment(
        token,
        courseList,
        calculateTotalAmount(),
        orderId
      ).then((data) => {
        console.log(data);
        if (data.status <= 305) {
        }
      });
    } catch (error) {}
    // Handle post-approval actions here (e.g., save the transaction in the database)
  };

  const buttonProps = {
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: calculateTotalAmount().toString(),
              currency_code: "USD",
              breakdown: {
                item_total: {
                  value: calculateTotalAmount().toString(),
                  currency_code: "USD",
                },
              },
            },
            items: courses.map((course) => ({
              _id: course._id,
              name: course.title,
              unit_amount: {
                currency_code: "USD",
                value: course.price.toFixed(2),
              },
              quantity: "1",
              category: "DIGITAL_GOODS",
            })),
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING", // Disable billing/shipping address
        },
      });
    },
    onApprove: (data: any, actions: any) => {
      return actions.order.capture().then(async (details: any) => {
        console.log("Transaction completed:", details);
        await handleApprove(details.id);
      });
    },
    onError: (err: any) => {
      console.error("PayPal Checkout Error:", err);
    },
  } as any;

  return <PayPalButtons {...buttonProps} />;
};

export default PayPalButtonComponent;
