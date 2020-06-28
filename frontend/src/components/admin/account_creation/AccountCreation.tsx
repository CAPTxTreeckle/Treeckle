import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../contexts/UserProvider";
import { Form, Grid, Segment, Header, Message } from "semantic-ui-react";
import UploadCsv from "./UploadCsv";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";

function AccountCreation() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null | undefined>(null);
  const [userCreated, setUserCreated] = useState(false);
  const userContext = useContext(Context);

  const handleChange = (event: any, data: any) => {
    setEmail(data.value);
    setUserCreated(false);
    setEmailError(null);
  };

  const handleSubmit = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userContext.token}`,
    };
    axios
      .post(
        "../auth/newAccountRequest",
        {
          email: email,
        },
        { headers: headers }
      )
      .then((response) => {
        CONSOLE_LOGGING && console.log("POST new account:", response);
        if (response.status === 200) {
          setUserCreated(true);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("POST new account error:", response);
        let msg: string | undefined;
        switch (response.status) {
          case 400:
            msg = "Account with the specified email already exists.";
            break;
          case 401:
            alert("Your current session has expired. Please log in again.");
            userContext.resetUser();
            break;
          case 422:
            msg = "Please enter a valid email.";
            break;
          default:
            msg = "An unknown error has occurred. Please try again.";
        }
        setEmailError(msg);
      });
  };

  return (
    <Segment placeholder>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column
          verticalAlign="middle"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Form onSubmit={handleSubmit}>
            <Header>Create Account</Header>
            <Form.Input
              error={emailError}
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              type="email"
            />
            <Form.Button fluid content="Create" primary />
          </Form>
          {userCreated && (
            <Message
              success
              header="User Created"
              content={`An email has been sent to ${email} for registration.`}
            />
          )}
        </Grid.Column>
        <Grid.Column
          verticalAlign="middle"
          style={{ display: "flex", alignItems: "center" }}
        >
          <UploadCsv />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default AccountCreation;
