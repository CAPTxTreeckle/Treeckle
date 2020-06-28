import React from "react";
import AccountCreationForm from "../../components/auth/AccountCreationForm";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

const DirectAccountCreationPage = () => (
  <AuthLayoutResetState form={<AccountCreationForm directCreation={true} />} />
);

export default DirectAccountCreationPage;
