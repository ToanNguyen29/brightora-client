import {
   MenuItem,
   Select,
   FormControl,
   InputLabel,
   Box,
   Typography,
   Button,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import Head from "./Head";
import { useState } from "react";
import { IUpdateCourse } from "../../models/Course";
import { updateCourse } from "../../services/CourseService";
import { useParams } from "react-router-dom";
const priceTier = [
   {
      currency: "USD",
      tiers: [
         { tier: 0, price: "Free" },
         { tier: 1, price: "$4.99" },
         { tier: 2, price: "$9.99" },
         { tier: 3, price: "$19.99" },
         { tier: 4, price: "$49.99" },
         { tier: 5, price: "$99.99" },
      ],
   },
   {
      currency: "EUR",
      tiers: [
         { tier: 0, price: "Free" },

         { tier: 1, price: "€4.49" },
         { tier: 2, price: "€8.99" },
         { tier: 3, price: "€17.99" },
         { tier: 4, price: "€44.99" },
         { tier: 5, price: "€89.99" },
      ],
   },
   {
      currency: "GBP",
      tiers: [
         { tier: 0, price: "Free" },

         { tier: 1, price: "£3.99" },
         { tier: 2, price: "£7.99" },
         { tier: 3, price: "£15.99" },
         { tier: 4, price: "£39.99" },
         { tier: 5, price: "£79.99" },
      ],
   },
   {
      currency: "EURB",
      tiers: [
         { tier: 0, price: "Free" },

         { tier: 1, price: "€4.69" },
         { tier: 2, price: "€9.39" },
         { tier: 3, price: "€18.99" },
         { tier: 4, price: "€46.99" },
         { tier: 5, price: "€94.99" },
      ],
   },
   {
      currency: "VND",
      tiers: [
         { tier: 0, price: "Free" },

         { tier: 1, price: "₫100,000" },
         { tier: 2, price: "₫200,000" },
         { tier: 3, price: "₫500,000" },
         { tier: 4, price: "₫1,000,000" },
         { tier: 5, price: "₫2,000,000" },
      ],
   },
   {
      currency: "RUB",
      tiers: [
         { tier: 0, price: "Free" },

         { tier: 1, price: "₽399" },
         { tier: 2, price: "₽799" },
         { tier: 3, price: "₽1,599" },
         { tier: 4, price: "₽3,999" },
         { tier: 5, price: "₽7,999" },
      ],
   },
   {
      currency: "RUBY",
      tiers: [
         { tier: 0, price: "Free" },

         { tier: 1, price: "₽449" },
         { tier: 2, price: "₽899" },
         { tier: 3, price: "₽1,799" },
         { tier: 4, price: "₽4,499" },
         { tier: 5, price: "₽8,999" },
      ],
   },
];

const CoursePricing: React.FC = () => {
   const token = localStorage.getItem("token");
   const { t } = useTranslation();
   const { mode } = useThemeContext();
   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";
   const [selectedCurrency, setSelectedCurrency] = useState("");
   const [selectedTier, setSelectedTier] = useState("");
   const { id } = useParams<{ id: string }>();

   const handleCurrencyChange = (event: any) => {
      setSelectedCurrency(event.target.value);
      setSelectedTier(""); // Reset tier when currency changes
   };

   const handleTierChange = (event: any) => {
      setSelectedTier(event.target.value);
   };

   const handleSave = async () => {
      const formData: IUpdateCourse = {
         price: {
            amount: selectedTier,
            currency: selectedCurrency,
         },
      };
      if (id) {
         await updateCourse(token, id, formData);
      }
   };
   return (
      <Box
         width={"100%"}
         height={"100%"}
         sx={{
            border: "0.5px groove",
            backgroundColor: backgroundColor,
            color: textColor,
            padding: "20px",
            borderRadius: "8px",
         }}
      >
         <Head title={"Pricing"} />
         <Typography variant="h6" fontWeight={"bold"} ml="20px" mt={5}>
            {t("Set a price for your course")}
         </Typography>
         <Typography variant="h6" ml="20px">
            {t(
               "Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests can not be free.",
            )}
         </Typography>

         <FormControl fullWidth sx={{ mt: 3, ml: "20px" }}>
            <InputLabel>{t("Select Currency")}</InputLabel>
            <Select value={selectedCurrency} onChange={handleCurrencyChange}>
               {priceTier.map((item) => (
                  <MenuItem key={item.currency} value={item.currency}>
                     {item.currency}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>

         <FormControl fullWidth sx={{ mt: 3, ml: "20px" }}>
            <InputLabel>{t("Select Price Tier")}</InputLabel>
            <Select
               value={selectedTier}
               onChange={handleTierChange}
               disabled={!selectedCurrency}
            >
               {selectedCurrency &&
                  priceTier
                     .find((item) => item.currency === selectedCurrency)
                     ?.tiers // Use optional chaining (?.) to prevent undefined access
                     .map((tier) => (
                        <MenuItem key={tier.tier} value={tier.tier}>
                           Tier {tier.tier} - {tier.price}
                        </MenuItem>
                     ))}
            </Select>
         </FormControl>
         <Button
            sx={{
               fontSize: "16px",
               my: "15px",
               ml: "20px",
               backgroundColor: textColor,
               color: backgroundColor,
               padding: "10px 20px",
               fontWeight: "bold",
               ":hover": {
                  backgroundColor: textColor,
               },
               width: "200px",
            }}
            onClick={handleSave}
         >
            {t("Update Price")}
         </Button>
      </Box>
   );
};

export default CoursePricing;
