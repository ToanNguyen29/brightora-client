// CourseContent.tsx
import React from "react";
import {
   Box,
   ListItem,
   ListItemText,
   ListItemIcon,
   Button,
   Collapse,
   Divider,
   Typography,
} from "@mui/material";
import {
   ExpandLess,
   ExpandMore,
   PlayCircleOutline,
   CheckCircleOutline,
} from "@mui/icons-material";

interface Lecture {
   id: string;
   title: string;
   duration: string;
   completed: boolean;
   videoUrl: string;
}

interface Section {
   id: string;
   title: string;
   lectures: Lecture[];
   duration: string;
}

interface CourseContentProps {
   courseData: Section[];
   expandedSections: string[];
   toggleSection: (id: string) => void;
   setSelectedVideoUrl: (url: string) => void;
   markAsCompleted: (sectionId: string, lectureId: string) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
   courseData,
   expandedSections,
   toggleSection,
   setSelectedVideoUrl,
   markAsCompleted,
}) => (
   <Box flex={1} maxHeight="75vh" overflow="auto">
      <Typography variant="h6" fontWeight="bold">
         Course Content
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {courseData.map((section) => (
         <Box key={section.id} mb={2}>
            <ListItem button onClick={() => toggleSection(section.id)}>
               <ListItemText
                  primary={section.title}
                  secondary={`${section.lectures.length} lectures • ${section.duration}`}
               />
               {expandedSections.includes(section.id) ? (
                  <ExpandLess />
               ) : (
                  <ExpandMore />
               )}
            </ListItem>
            <Collapse
               in={expandedSections.includes(section.id)}
               timeout="auto"
               unmountOnExit
            >
               {section.lectures.map((lecture) => (
                  <ListItem
                     key={lecture.id}
                     button
                     onClick={() => setSelectedVideoUrl(lecture.videoUrl)}
                  >
                     <ListItemIcon>
                        {lecture.completed ? (
                           <CheckCircleOutline color="primary" />
                        ) : (
                           <PlayCircleOutline />
                        )}
                     </ListItemIcon>
                     <ListItemText
                        primary={lecture.title}
                        secondary={lecture.duration}
                     />
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={() => markAsCompleted(section.id, lecture.id)}
                        disabled={lecture.completed}
                     >
                        {lecture.completed ? "Completed" : "Mark as Completed"}
                     </Button>
                  </ListItem>
               ))}
            </Collapse>
         </Box>
      ))}
   </Box>
);

export default CourseContent;
