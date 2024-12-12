import React from "react";
import UserHead from "../../components/user/intercommunity/Head";
import PaymentMethods from "../../components/user/payment-method/PaymentMethods";

const PaymentAccount: React.FC = () => {
  return (
    <>
      <UserHead
        title={"payment_account"}
        subtitle={"payment_account_subtitle"}
      />
      <PaymentMethods />
    </>
  );
};

export default PaymentAccount;
