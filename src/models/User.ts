// USER MODEL
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  headline: string;
  description: string;
  photo: string;
  googleLink: string;
  facebookLink: string;
  websiteLink: string;
  twitterLink: string;
  linkedInLink: string;
  youtubeLink: string;
  role: string;
  disable: boolean;
  DateChangePass: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
}

// INPUT TYPE
export interface UserProfile {
  firstName: string;
  lastName: string;
  headline: string;
  photo: string;
  googleLink: string;
  facebookLink: string;
  websiteLink: string;
  twitterLink: string;
  linkedInLink: string;
  youtubeLink: string;
}

// CRUD Users RESPONSE
export interface GetUserResponse {
  data: Partial<User>;
}

export interface UpdateUserResponse {
  status: string;
  data: Partial<User>;
}

export interface DeleteMeResponse {
  status: string;
  data: null;
}
