export interface IQAndA {
  _id: string;
  question: string;
  course: string;
  answer: IAns[];
  created_at?: string;
  updated_at?: string;
  student: {
    first_name: string;
    last_name: string;
    photo: string;
    _id: string;
  };
}

export interface IAns {
  content: string;
  created_at?: string;
  user: {
    first_name: string;
    last_name: string;
    photo: string;
    _id: string;
  };
}
