import React from "react";
import AccountCreationForm from "../../components/auth/AccountCreationForm.tsx";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

const DirectAccountCreationPage = (props) => (
  <AuthLayoutResetState form={<AccountCreationForm directCreation={true} />} />
);

export default DirectAccountCreationPage;
