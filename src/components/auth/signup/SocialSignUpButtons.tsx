import React from "react";
import { Grid, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

interface SocialSignUpButtonsProps {
   textColor: string;
}

const SocialSignUpButtons: React.FC<SocialSignUpButtonsProps> = ({
   textColor,
}) => {
   return (
      <>
         <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
               <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{
                     fontSize: "16px",
                     borderColor: textColor,
                     color: textColor,
                     backgroundColor: "transparent",
                  }}
               >
                  Google
               </Button>
            </Grid>
            <Grid item xs={4}>
               <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  sx={{
                     fontSize: "16px",
                     borderColor: textColor,
                     color: textColor,
                     backgroundColor: "transparent",
                  }}
               >
                  Facebook
               </Button>
            </Grid>
            <Grid item xs={4}>
               <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{
                     fontSize: "16px",
                     borderColor: textColor,
                     color: textColor,
                     backgroundColor: "transparent",
                  }}
               >
                  GitHub
               </Button>
            </Grid>
         </Grid>
      </>
   );
};

export default SocialSignUpButtons;
