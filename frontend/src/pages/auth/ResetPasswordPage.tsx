import React from "react";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

//TODO: verify props type
const ResetPasswordPage = (props: any) => (
  <AuthLayoutResetState
    form={<ResetPasswordForm uniqueId={props.match.params.uniqueId} />}
  />
);

export default ResetPasswordPage;
