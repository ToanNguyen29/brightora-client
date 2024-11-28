export interface ICreateCourse {
  title: string;
  type: string;
  category: string[];
  time_spend: number;
}

export interface ICreateCourseResponse {
  _id: string;
}

export interface IGoal {
  learningObjectives: string[];
  requirements: string[];
  intendedLearners: string[];
}

export interface IPrice {
  amount: string;
  currency: string;
}

export interface IOwner {
  _id: string;
  first_name: string;
  last_name: string;
  photo?: string;
}

export interface IReview {
  average_rating: number;
  course: string;
  star: any;
  total_reviews: number;
}

export interface ICourseInfoPage {
  _id: string;
  title: string;
  thumbnail?: string;
  level?: string[];
  subtitle: string;
  language: string[];
  description: string;
  goals?: IGoal;
  promotional_video: string;
  owner: IOwner;
  review: IReview;
  sections?: any[];
  price: number;
  created_at: string;
  updated_at: string;
}

// Card này là nhưng card hiện course mà mình chưa mua
export interface ICourseCard {
  _id: string;
  owner: IOwner;
  review: IReview;
  price: number;
  thumbnail: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface IMyCourseCard {
  _id: string;
  owner: IOwner;
  review: IReview;
  // price: number;
  thumbnail: string;
  title: string;
  // created_at: string;
  updated_at: string;
}

export interface IUpdateCourse {
  title?: string;
  type?: string;
  category?: string[];
  time_spend?: number;
  goals?: IGoal;
  subtitle?: string;
  description?: string;
  language?: string[];
  level?: string[];
  objectives?: string;
  thumbnail?: string;
  promotional_video?: string;
  price?: IPrice;
}

export interface CurriculumMap {
  id: string;
  ordinal_number: number;
  type?: string;
}

export interface ISection {
  _id: string;
  title: string;
  lessons: CurriculumMap[];
}

export interface ISectionLearn {
  _id: string;
  id: string;
  ordinal_number: number;
  owner: string;
  title: string;
  lessons: ILessonLearn[] | IExerciseLearn[];
}

export interface ILessonLearn {
  _id: string;
  id: string;
  ordinal_number: number;
  owner: string;
  type: string;
  video_url: string;
  title: string;
  documents: any[];
  duration?: string;
  description?: string;
}

export interface IExerciseLearn {
  _id: string;
  id: string;
  ordinal_number: number;
  owner: string;
  type: string;
  question: any[];
  title: string;
  description?: string;
}

export interface IDocument {
  title: string;
  file_url: string;
  file_type?: string;
  description: string;
}

export interface ILesson {
  _id: string;
  title: string;
  description?: string;
  video_url?: string;
  duration?: number;
  documents?: IDocument[];
}
export interface Choice {
  option_text: string;
  is_correct: boolean;
}

export interface MultipleChoiceQuestion {
  question_text: string;
  choices: Choice[];
  correct_explanation: string;
  related_lecture?: string;
}

export interface IExercise {
  _id: string;
  title: string;
  description: string;
  questions: MultipleChoiceQuestion[];
}

export interface CourseFilterType {
  type: string;
  page_number?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: number;
}

export interface CourseTypeShow {
  _id: string;
  title: string;
  duration?: string;
  price?: string;
  rating?: number;
  buying?: number;
  owner: {
    _id: string;
    fullname: string;
  };
  thumbnail: string;
  tag: string[];
}

export interface GenerateThumbnailForm {
  course_title: string;
  description: string;
  style: string;
}
