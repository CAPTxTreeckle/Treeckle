import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Context } from "./contexts/UserProvider";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import EventsPage from "./pages/EventsPage";
import VenueBookingPage from "./pages/VenueBookingPage";
import ProfilePage from "./pages/ProfilePage";
import LoginForm from "./pages/authentication/Login";
import ForgotPasswordForm from "./pages/authentication/ForgotPassword";
import ResetPasswordForm from "./pages/authentication/ResetPassword";
import CreateAccountAdminPage from "./pages/authentication/CreateAccountAdminPage";
import CreateAccountUserPage from "./pages/authentication/CreateAccountUserPage";

export const Routes = () => {
  const contextValue = useContext(Context);

  let token = contextValue.token;
  let name = contextValue.name;
  let profilePic = contextValue.profilePic;
  let role = contextValue.role;
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
  localStorage.setItem("profilePic", profilePic);
  localStorage.setItem("role", role);

  return (
    <div>
      {token !== "" && token !== -1 && token !== -2 && <NavigationBar />}
      {token !== "" && token !== -1 && token !== -2 && (
        <Route path="/dashboard" component={Dashboard}></Route>
      )}
      {token !== "" && token !== -1 && token !== -2 && (
        <Route path="/events" component={EventsPage}></Route>
      )}
      {token !== "" && token !== -1 && token !== -2 && (
        <Route path="/bookings" component={VenueBookingPage}></Route>
      )}
      {token !== "" && token !== -1 && token !== -2 && (
        <Route path="/admin/create" component={CreateAccountAdminPage}></Route>
      )}
      {token !== "" && token !== -1 && token !== -2 && (
        <Route path="/profile" component={ProfilePage}></Route>
      )}
      {token !== "" && token !== -1 && token !== -2 && role === "Admin" && (
        <Route path="/admin" component={AdminPage}></Route>
      )}
      {token === "" && <Route exact path="/" component={LoginForm} />}
      {/* {token === -1 && (
        <Route exact path="/" component={} />
      )} */}
      {token === -2 && <Route exact path="/" component={ForgotPasswordForm} />}
      {/* {
        <Route
          path="/auth/emailRedirect/:uniqueId"
          component={PasswordReset}
        />
      } */}

      <Route
        path="/user/create/:uniqueId"
        component={CreateAccountUserPage}
      ></Route>
      <Route
        path="/auth/newAccounts/:uniqueId"
        component={ResetPasswordForm}
      ></Route>
    </div>
  );
};
