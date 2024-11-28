import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoadingPage from "./pages/LoadingPage";
import UserAccountPage from "./pages/UserAccountPage";
import Quiz from "./components/quiz/Quiz";
import { QuizProvider } from "./context/QuizContext";
import LearningPage from "./pages/LearningPage";
import LessonComponent from "./components/learning/LessonComponent";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import CheckoutPage from "./pages/CheckoutPage";
import ChatPage from "./pages/ChatPage";
import WishList from "./components/mylearning/WishList";
import PublicProfilePage from "./pages/user/PublicProfile";
import SearchCoursePage from "./pages/SearchCoursePage";
import CourseMessages from "./components/courseedit/CourseMessages";

const MyLearningPage = React.lazy(() => import("./pages/MyLearningPage"));
const CourseEnrollmentList = React.lazy(
  () => import("./components/mylearning/CourseEnrollmentList")
);
// const GoogleDriveViewer = React.lazy(() => import("./pages/ViewFile"));
const CartPage = React.lazy(() => import("./pages/Cart"));
const CourseTypePage = React.lazy(() => import("./pages/CourseTypePage"));
const ForgotPassWordPage = React.lazy(
  () => import("./pages/auth/ForgotPassword")
);
const ResetPassWordPage = React.lazy(
  () => import("./pages/auth/ResetPassword")
);
const InstructorLayout = React.lazy(() => import("./pages/InstructorLayout"));
const InstructorCoursePage = React.lazy(
  () => import("./components/instructor/InstructorCoursePage")
);
const CreateCoursePage = React.lazy(
  () => import("./components/instructor/CreateCoursePage")
);
const CourseEditLayout = React.lazy(() => import("./pages/CourseEditLayout"));
const Goals = React.lazy(() => import("./components/courseedit/Goals"));
const Curriculum = React.lazy(
  () => import("./components/courseedit/Curriculum")
);
const CourseLanding = React.lazy(
  () => import("./components/courseedit/CourseLanding")
);
const CoursePricing = React.lazy(
  () => import("./components/courseedit/CoursePricing")
);
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
// const Layout = React.lazy(() => import("./components/Layout"));
const VerticalTabs = React.lazy(() => import("./pages/VerticalTabs"));
const EditProfilePage = React.lazy(() => import("./pages/user/EditProfile"));
const EditPhotoPage = React.lazy(() => import("./pages/user/EditPhoto"));
const EditAccountPage = React.lazy(() => import("./pages/user/EditAccount"));

const CloseAccountPage = React.lazy(() => import("./pages/user/CloseAccount"));
const LoginPage = React.lazy(() => import("./pages/auth/Login"));
const LayoutFullWidth = React.lazy(
  () => import("./components/LayoutFullWidth")
);
const SignUpPage = React.lazy(() => import("./pages/auth/SignUp"));
const CoursePage = React.lazy(() => import("./pages/CoursePage"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route element={<LayoutFullWidth />}>
                {/* <Route
                  path="/drive-viewer/:itemId/:fileType"
                  element={<GoogleDriveViewer />}
                /> */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/user/:id" element={<UserAccountPage />} />
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <ChatPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/user"
                  element={
                    <ProtectedRoute>
                      <VerticalTabs />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="public-profile" />}
                  />
                  <Route
                    path="public-profile"
                    element={<PublicProfilePage />}
                  />
                  <Route path="edit-profile" element={<EditProfilePage />} />
                  <Route path="edit-photo" element={<EditPhotoPage />} />
                  <Route path="edit-account" element={<EditAccountPage />} />
                  <Route path="close-account" element={<CloseAccountPage />} />
                </Route>
              </Route>

              <Route element={<LayoutFullWidth />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                  path="/courses/search/:querySearch"
                  element={<SearchCoursePage />}
                />
                <Route
                  path="course/:courseId/learn/"
                  element={<LearningPage />}
                >
                  <Route
                    path="lesson/:lessonId"
                    element={<LessonComponent />}
                  />
                  <Route
                    path="exercise/:exerciseId"
                    element={
                      <QuizProvider>
                        <Quiz />
                      </QuizProvider>
                    }
                  />
                </Route>

                <Route path="/course_type/:type" element={<CourseTypePage />} />

                <Route
                  path="/my-course"
                  element={
                    <ProtectedRoute>
                      <MyLearningPage />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="learning" />} />
                  <Route path="learning" element={<CourseEnrollmentList />} />
                  <Route path="wishlist" element={<WishList />} />
                </Route>

                <Route
                  path="/forgotpassword"
                  element={<ForgotPassWordPage />}
                />
                <Route
                  path="/resetpassword/:token"
                  element={<ResetPassWordPage />}
                />
                <Route path="/course/:courseId" element={<CoursePage />} />
              </Route>

              <Route path="/instructor" element={<InstructorLayout />}>
                <Route path="course" element={<InstructorCoursePage />} />
                <Route path="question-and-answer" element={<></>} />
                <Route path="course-stats" element={<></>} />
                <Route path="discount-coupon" element={<></>} />
              </Route>

              <Route
                path="/instructor/course/create"
                element={<CreateCoursePage />}
              />
              <Route
                path="/instructor/course/:id/manage"
                element={<CourseEditLayout />}
              >
                <Route path="goals" element={<Goals />} />
                <Route path="film" element={<div></div>} />
                <Route path="curriculum" element={<Curriculum />} />
                <Route path="basics" element={<CourseLanding />} />
                <Route path="pricing" element={<CoursePricing />} />
                <Route path="promotions" element={<div></div>} />
                <Route
                  path="communications/messages"
                  element={<CourseMessages />}
                />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </Suspense>
  );
};

export default AppRoutes;
