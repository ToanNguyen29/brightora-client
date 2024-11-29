import React from "react";
import { Grid } from "@mui/material";
import RatingItem from "./RatingItem";
import { IReviewDetail } from "../../../models/Course";

interface RatingListProps {
  ratings: IReviewDetail[] | undefined;
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
      {ratings?.map((item, index) => (
        <Grid item xs={isGrid ? 6 : 12} key={index}>
          <RatingItem
            name={"Toan Nguyen"}
            rating={item.rating}
            content={item.comment}
            time={item.created_at}
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
