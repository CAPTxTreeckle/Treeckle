import React from "react";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm.tsx";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

const ResetPasswordPage = (props) => (
  <AuthLayoutResetState
    form={<ResetPasswordForm uniqueId={props.match.params.uniqueId} />}
  />
);

export default ResetPasswordPage;
