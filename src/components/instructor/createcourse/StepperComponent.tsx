import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
   stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

// Stepper Connector and Icons
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
   [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
   },
   [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
         backgroundImage:
            "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      },
   },
   [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
         backgroundImage:
            "linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      },
   },
   [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
   },
}));

const ColorlibStepIconRoot = styled("div")<{
   ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
   backgroundColor: ownerState.active ? "#784af4" : "#ccc",
   zIndex: 1,
   color: "#fff",
   width: 50,
   height: 50,
   display: "flex",
   borderRadius: "50%",
   justifyContent: "center",
   alignItems: "center",
   ...(ownerState.active && {
      backgroundImage:
         "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
   }),
   ...(ownerState.completed && {
      backgroundImage:
         "linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
   }),
}));

function ColorlibStepIcon(props: StepIconProps) {
   const { active, completed } = props;

   const icons: { [index: string]: React.ReactElement<any> } = {
      1: <SettingsIcon />,
      2: <GroupAddIcon />,
      3: <VideoLabelIcon />,
      4: <VideoLabelIcon />,
   };

   return (
      <ColorlibStepIconRoot ownerState={{ completed, active }}>
         {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
   );
}

type StepperComponentProps = {
   activeStep: number;
   steps: string[];
};

export default function StepperComponent({
   activeStep,
   steps,
}: StepperComponentProps) {
   return (
      <Stack sx={{ width: "100%" }} spacing={4}>
         <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
         >
            {steps.map((label) => (
               <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                     {label}
                  </StepLabel>
               </Step>
            ))}
         </Stepper>
      </Stack>
   );
}
