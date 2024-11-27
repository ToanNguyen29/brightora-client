// USER MODEL
export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  headline?: string;
  description?: string;
  photo: string;
  google_link?: string;
  facebook_link?: string;
  website_link?: string;
  twitter_link?: string;
  linkedin_link?: string;
  youtube_link?: string;
  role: string;
  disable: boolean;
  date_change_pass?: string;
  password_reset_token?: string;
  password_reset_expires?: string;
}

// INPUT TYPE
export interface UserProfile {
  first_name: string;
  last_name: string;
  headline: string;
  description?: string;
  photo: string;
  google_link?: string;
  facebook_link?: string;
  website_link?: string;
  twitter_link?: string;
  linkedin_link?: string;
  youtube_link?: string;
}

// CRUD Users RESPONSE
export interface IGetUserInfo {
  _id: string;
  email: string;
  headline?: string;
  description?: string;
  photo: string;
  first_name: string;
  last_name: string;
  role: string;
  facebook_link?: string;
  website_link?: string;
  twitter_link?: string;
  youtube_link?: string;
  linkedin_link?: string;
}
