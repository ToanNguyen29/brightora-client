import React from "react";
import { Grid } from "@mui/material";
import RatingItem from "./RatingItem";

interface RatingListProps {
   ratings: Array<{
      name: string;
      rating: number;
      content: string;
      time: string;
   }>;
   textColor: string;
   backgroundColor: string;
   headerBackgroundColor: string;
   isGrid?: boolean;
}

const RatingList: React.FC<RatingListProps> = ({
   ratings,
   textColor,
   backgroundColor,
   headerBackgroundColor,
   isGrid = true, // default to grid layout
}) => {
   return (
      <Grid container spacing={2}>
         {ratings.map((item, index) => (
            <Grid item xs={isGrid ? 6 : 12} key={index}>
               <RatingItem
                  name={item.name}
                  rating={item.rating}
                  content={item.content}
                  time={item.time}
                  textColor={textColor}
                  backgroundColor={backgroundColor}
                  headerBackgroundColor={headerBackgroundColor}
                  isGrid={isGrid}
               />
            </Grid>
         ))}
      </Grid>
   );
};

export default RatingList;
