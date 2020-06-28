import React, { useContext, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import { Context } from "../../contexts/UserProvider";

type Props = {
  form: JSX.Element;
};

function AuthLayoutResetState(props: Props) {
  const userContext = useContext(Context);

  useEffect(() => {
    userContext.resetUser();
  }, []);

  return <AuthLayout form={props.form} />;
}

export default AuthLayoutResetState;
