// App.js
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "./layout/DefaultLayout";

// const SignIn = lazy(() => import("./pages/Auth/SignIn"));
// const SignUp = lazy(() => import("./pages/Auth/SignUp"));
// const News = lazy(() => import("./pages/News/News"));
// const Friend = lazy(() => import("./pages/Friend/Friend"));
// const ProfileCurrentUser = lazy(() => import("./pages/Profile"));
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import News from "./pages/News/News";
import Friend from "./pages/Friend/Friend";
import ProfileCurrentUser from "./pages/Profile";
import Messenger from "./pages/Messenger";
const ProtectedRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

const RejectedRoute = ({ isLoggedIn }) => {
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};
import io from 'socket.io-client'
export const socket = io("http://localhost:4000");

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<News />} />
              <Route path="/profile/:id" element={<ProfileCurrentUser />} />
              <Route path="/friend/profile/:id" element={<ProfileCurrentUser />} />
              <Route path="/friend" element={<Friend />} />
           
            </Route>
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/messenger/:id" element={<Messenger />} />
          </Route>
          <Route element={<RejectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
