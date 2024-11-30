import React, { useEffect, useState } from "react";
import { getPurchaseHistory } from "../../services/PaymentService";

const PurchaseHistory: React.FC = () => {
  const token = localStorage.getItem("token");
  const [purchaseHistory, setPurchaseHistory] = useState();
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      await getPurchaseHistory(token).then((data) => {
        console.log("Purchase History:", data.data.payments);
        setPurchaseHistory(data.data.payments);
      });
    };
    fetchData();
  }, [token]);

  return <></>;
};

export default PurchaseHistory;
