import React from "react";
<<<<<<< HEAD
import ResetPasswordForm from "../../components/auth/ResetPasswordForm.tsx";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

const ResetPasswordPage = (props) => (
=======
import ResetPasswordForm from "../../components/auth/ResetPasswordForm.js";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

const ResetPasswordPage = props => (
>>>>>>> de123a4fe033ab9e4608bbf4ce000a83f210f05b
  <AuthLayoutResetState
    form={<ResetPasswordForm uniqueId={props.match.params.uniqueId} />}
  />
);

export default ResetPasswordPage;
