// mockData.ts

export const courseSections = [
   {
      id: "1",
      title: "Introduction to React",
      duration: "45 min",
      lectures: [
         {
            id: "1.1",
            title: "What is React?",
            duration: "15 min",
            completed: false,
            videoUrl: "https://youtu.be/8t4iOdMfB9I",
         },
         {
            id: "1.2",
            title: "Environment Setup",
            duration: "30 min",
            completed: false,
            videoUrl: "https://www.example.com/video2",
         },
      ],
   },
   {
      id: "2",
      title: "React Basics",
      duration: "60 min",
      lectures: [
         {
            id: "2.1",
            title: "JSX and Rendering",
            duration: "20 min",
            completed: false,
            videoUrl: "https://www.example.com/video3",
         },
         {
            id: "2.2",
            title: "State and Props",
            duration: "40 min",
            completed: false,
            videoUrl: "https://www.example.com/video4",
         },
      ],
   },
];

export const initialReviews = [
   {
      id: "1",
      name: "John Doe",
      rating: 5,
      content: "Great course! Helped me understand React basics.",
   },
   {
      id: "2",
      name: "Jane Smith",
      rating: 4,
      content: "Good course, but the setup could be explained better.",
   },
];

export const initialNotes = [
   { id: "1", text: "Review JSX syntax carefully." },
   { id: "2", text: "Focus on state and props for the next module." },
];
