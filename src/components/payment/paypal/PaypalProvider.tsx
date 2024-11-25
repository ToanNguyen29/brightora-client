import React, { createContext, useContext, ReactNode } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Define the type for PayPal context
interface PayPalContextType {
   clientId: string;
}

// Create the context
const PayPalContext = createContext<PayPalContextType | undefined>(undefined);

// PayPal Provider Component
export const PayPalProvider: React.FC<{
   children: ReactNode;
   clientId: string;
}> = ({ children, clientId }) => {
   return (
      <PayPalContext.Provider value={{ clientId }}>
         <PayPalScriptProvider options={{ clientId: clientId }}>
            {children}
         </PayPalScriptProvider>
      </PayPalContext.Provider>
   );
};

// Custom hook to use PayPal context
export const usePayPalContext = (): PayPalContextType => {
   const context = useContext(PayPalContext);
   if (!context) {
      throw new Error("usePayPalContext must be used within a PayPalProvider");
   }
   return context;
};
