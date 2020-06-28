import React from "react";
import AccountCreationForm from "../../components/auth/AccountCreationForm";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

//TODO: verify props type
const LinkAccountCreationPage = (props: any) => (
  <AuthLayoutResetState
    form={
      <AccountCreationForm
        directCreation={false}
        uniqueId={props.match.params.uniqueId}
      />
    }
  />
);

export default LinkAccountCreationPage;
