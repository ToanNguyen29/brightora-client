import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { IDocument } from "../../../models/Course";
import { useThemeContext } from "../../../theme/ThemeContext";
import DocumentEditForm from "./documenttab/DocumentEditForm";
import DocumentList from "./documenttab/DocumentList";
import { updateDocuments } from "../../../services/LessonService";

interface DocumentProps {
   id: string;
   documents: IDocument[] | undefined;
   reloadData: () => void;
}

const DocumentTab: React.FC<DocumentProps> = ({
   id,
   documents,
   reloadData,
}) => {
   const token = localStorage.getItem("token");
   const [data, setData] = useState<IDocument[] | undefined>(documents);
   const [editDocument, setEditDocument] = useState<IDocument | null>(null);
   const [editIndex, setEditIndex] = useState<number | null>(null);

   const { t } = useTranslation();
   const { mode } = useThemeContext();

   const backgroundColor = mode === "light" ? "#ffffff" : "#000000";
   const textColor = mode === "light" ? "#000000" : "#ffffff";

   useEffect(() => {
      setData(documents);
   }, [documents]);

   const handleSave = async (updateDocument: IDocument) => {
      if (editDocument !== null && editIndex !== null) {
         if (data) {
            const updatedData = data.map((item, index) =>
               index === editIndex ? updateDocument : item,
            );
            console.log("updatedocuemnt", updatedData);
            console.log(id);

            await updateDocuments(token, id, updatedData);

            setData(updatedData);
            setEditDocument(null);
            setEditIndex(null);
         }
      }
   };

   const handleAddMore = async () => {
      if (data) {
         const updatedData = [
            ...data,
            { title: "New document", file_url: "", description: "" },
         ];
         await updateDocuments(token, id, updatedData).then((data) => {
            console.log(data);
            reloadData();
         });

         setData(updatedData);
      }
   };

   return (
      <Box>
         {editDocument ? (
            <DocumentEditForm
               editDocument={editDocument}
               handleSave={handleSave}
            />
         ) : (
            <>
               {data && (
                  <DocumentList
                     data={data}
                     onEdit={(item, index) => {
                        setEditDocument(item);
                        setEditIndex(index);
                     }}
                  />
               )}
               <Button
                  sx={{
                     width: "fit-content",
                     mt: 2,
                     backgroundColor,
                     color: textColor,
                     "&:hover": {
                        backgroundColor,
                     },
                  }}
                  onClick={handleAddMore}
                  startIcon={<AddIcon />}
               >
                  {t("Add_more")}
               </Button>
            </>
         )}
      </Box>
   );
};

export default DocumentTab;
