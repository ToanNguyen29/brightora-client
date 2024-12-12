import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoadingPage from "./pages/LoadingPage";
import { QuizProvider } from "./context/QuizContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

const PaymentAccount = React.lazy(() => import("./pages/user/PaymentAccount"));
const UserAccountPage = React.lazy(() => import("./pages/UserAccountPage"));
const Quiz = React.lazy(() => import("./components/quiz/Quiz"));
const LearningPage = React.lazy(() => import("./pages/LearningPage"));
const LessonComponent = React.lazy(
  () => import("./components/learning/LessonComponent")
);
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const ChatPage = React.lazy(() => import("./pages/ChatPage"));
const WishList = React.lazy(() => import("./components/mylearning/WishList"));
const PublicProfilePage = React.lazy(
  () => import("./pages/user/PublicProfile")
);
const CourseMessages = React.lazy(
  () => import("./components/courseedit/CourseMessages")
);
const PaymentStatistics = React.lazy(() => import("./pages/CourseStats"));
const CoursePage = React.lazy(() => import("./pages/CoursePage"));
const QAndAPage = React.lazy(() => import("./pages/QAndAPage"));
const PurchaseHistory = React.lazy(
  () => import("./components/mylearning/PurchaseHistory")
);
const InstructorReviewPage = React.lazy(
  () => import("./pages/InstructorReviewPage")
);
const BankingInfoPage = React.lazy(
  () => import("./components/instructor/SignToInstructor")
);
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const VerticalTabs = React.lazy(() => import("./pages/VerticalTabs"));
const EditProfilePage = React.lazy(() => import("./pages/user/EditProfile"));
const EditPhotoPage = React.lazy(() => import("./pages/user/EditPhoto"));
const EditAccountPage = React.lazy(() => import("./pages/user/EditAccount"));
// const CloseAccountPage = React.lazy(() => import("./pages/user/CloseAccount"));
const LoginPage = React.lazy(() => import("./pages/auth/Login"));
const SignUpPage = React.lazy(() => import("./pages/auth/SignUp"));
const MyLearningPage = React.lazy(() => import("./pages/MyLearningPage"));
const CourseEnrollmentList = React.lazy(
  () => import("./components/mylearning/CourseEnrollmentList")
);
const CartPage = React.lazy(() => import("./pages/Cart"));
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
const LayoutFullWidth = React.lazy(
  () => import("./components/LayoutFullWidth")
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route element={<LayoutFullWidth />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
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
                  <Route path="payment-account" element={<PaymentAccount />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route
                  path="/courses/search/:querySearch"
                  element={<SearchPage />}
                />
                <Route
                  path="course/:courseId/learn/"
                  element={
                    <ProtectedRoute>
                      <LearningPage />
                    </ProtectedRoute>
                  }
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
                  <Route
                    path="purchase-history"
                    element={<PurchaseHistory />}
                  />
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
                <Route
                  path="/sign-to-instructor"
                  element={<BankingInfoPage />}
                />
              </Route>

              <Route path="/instructor" element={<InstructorLayout />}>
                <Route path="course" element={<InstructorCoursePage />} />
                <Route path="question-and-answer" element={<QAndAPage />} />
                <Route path="course-stats" element={<PaymentStatistics />} />
                <Route path="reviews" element={<InstructorReviewPage />} />
              </Route>

              <Route
                path="/instructor/course/create"
                element={
                  <ProtectedRoute>
                    <CreateCoursePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/instructor/course/:id/manage"
                element={
                  <ProtectedRoute>
                    <CourseEditLayout />
                  </ProtectedRoute>
                }
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
