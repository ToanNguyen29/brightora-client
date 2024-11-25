// LanguageModal.tsx
import React from "react";
import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   Typography,
   Stack,
} from "@mui/material";
import { styled } from "@mui/system";

const LanguageButton = styled(Button)(({ theme }) => ({
   margin: theme.spacing(1),
   padding: theme.spacing(1, 4),
   borderRadius: theme.shape.borderRadius,
   background: theme.palette.primary.main,
   color: theme.palette.common.white,
   "&:hover": {
      background: theme.palette.primary.dark,
   },
}));

interface LanguageModalProps {
   open: boolean;
   onClose: () => void;
   onLanguageChange: (language: string) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
   open,
   onClose,
   onLanguageChange,
}) => {
   return (
      <Dialog open={open} onClose={onClose}>
         <DialogTitle>Choose Language</DialogTitle>
         <DialogContent>
            <Typography variant="body1" gutterBottom>
               Please select your preferred language:
            </Typography>
            <Stack direction="row" justifyContent="center" spacing={2}>
               <LanguageButton onClick={() => onLanguageChange("en")}>
                  English
               </LanguageButton>
               <LanguageButton onClick={() => onLanguageChange("vi")}>
                  Vietnamese
               </LanguageButton>
            </Stack>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose} color="primary">
               Cancel
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default LanguageModal;
