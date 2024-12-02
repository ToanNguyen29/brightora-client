import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPayment } from "../../../services/PaymentService";
import { useCart } from "../../../context/CartContext";

interface PayPalButtonComponentProps {
  courses: any[];
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const PayPalButtonComponent: React.FC<PayPalButtonComponentProps> = ({
  courses,
  setIsDone,
}) => {
  const { fetchCartMe } = useCart();
  const token = localStorage.getItem("token");
  const calculateTotalAmount = () => {
    return courses
      .reduce(
        (total, course) =>
          total +
          (course.price * (100 - (course?.discount_percentage | 0))) / 100,
        0
      )
      .toFixed(2);
  };

  const handleApprove = async (orderId: string, courses: any) => {
    console.log("Order Approved:", orderId, courses);

    try {
      const courseList = courses.map((item: any) => {
        return {
          course_id: item._id,
          price: item.price,
          discount: item.discount_percentage | 0,
          payment_price:
            (item.price * (100 - (item.discount_percentage | 0))) / 100,
        };
      });
      await createPayment(
        token,
        courseList,
        // calculateTotalAmount(),
        orderId
      ).then((data) => {
        console.log(data);
        if (data.status <= 305) {
          console.log("Payment created", data.data);
          fetchCartMe();
          setIsDone(true);
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
                value: (
                  (course.price * (100 - (course?.discount_percentage | 0))) /
                  100
                ).toFixed(2),
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
        console.log("Transaction completed:", details, courses);
        await handleApprove(details.id, courses);
      });
    },
    onError: (err: any) => {
      console.error("PayPal Checkout Error:", err);
    },
  } as any;

  return <PayPalButtons {...buttonProps} />;
};

export default PayPalButtonComponent;
