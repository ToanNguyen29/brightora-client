import React from "react";
import { Box } from "@mui/material";

interface FilterBarProps {
   flex: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ flex = 5 }) => {
   // const { t } = useTranslation();
   return (
      <Box display="flex" alignItems="center" gap={2}>
         <div>Sort</div>
         <div>Filter</div>
      </Box>
   );
};

export default FilterBar;
