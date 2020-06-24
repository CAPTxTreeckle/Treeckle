import React from "react";
<<<<<<< HEAD
import AccountCreationForm from "../../components/auth/AccountCreationForm.tsx";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

const DirectAccountCreationPage = (props) => (
=======
import AccountCreationForm from "../../components/auth/AccountCreationForm.js";
import AuthLayoutResetState from "../../components/auth/AuthLayoutResetState";

const DirectAccountCreationPage = props => (
>>>>>>> de123a4fe033ab9e4608bbf4ce000a83f210f05b
  <AuthLayoutResetState form={<AccountCreationForm directCreation={true} />} />
);

export default DirectAccountCreationPage;
