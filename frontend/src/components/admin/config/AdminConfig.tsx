import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../contexts/UserProvider";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";

function AdminConfig() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(Context);

  useEffect(() => {
    axios
      .get("../api/emails", {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("GET CC email:", response);
        if (response.status === 200) {
          setEmail(response.data.email);
          setIsLoading(false);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("GET CC email error:", response);
        switch (response.status) {
          case 401:
            alert("Your current session has expired. Please log in again.");
            userContext.resetUser();
            break;
          case 404:
            setIsLoading(false);
            break;
          default:
            setErrorMsg("An unknown error has occurred.");
            setIsLoading(false);
        }
      });
  }, []);

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { value }: any
  ) => {
    CONSOLE_LOGGING && console.log("Email changed:", value);
    setEmail(value);
    setErrorMsg("");
  };

  const toggleField = () => {
    setIsDisabled(!isDisabled);
    setErrorMsg("");
  };

  const handleSubmit = () => {
    axios
      .put(
        "../api/emails",
        {
          email: email,
        },
        { headers: { Authorization: `Bearer ${userContext.token}` } }
      )
      .then((response) => {
        CONSOLE_LOGGING && console.log("PUT update CC email:", response);
        if (response.status === 200) {
          toggleField();
          alert(
            "CC email updated! Now all receipts will be sent to the specified email."
          );
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("PUT update CC email error:", response);
        switch (response.status) {
          case 401:
            alert("Your current session has expired. Please log in again.");
            userContext.resetUser();
            break;
          case 422:
            setErrorMsg("Invalid email.");
            break;
          default:
            setErrorMsg("An unknown error has occurred. Please try again.");
        }
      });
  };

  return (
    <Segment placeholder>
      <Form onSubmit={handleSubmit}>
        <h4>
          The below email is assigned to receive receipts for the creation or
          change in status of all bookings.
        </h4>
        <Form.Input
          placeholder="Enter a CC email"
          loading={isLoading}
          value={email}
          onChange={handleEmailChange}
          disabled={isDisabled}
          type="email"
        />
        {errorMsg && (
          <Message
            error
            content={errorMsg}
            style={{
              display: "block",
              maxWidth: "210px",
              margin: "1em auto",
            }}
          />
        )}
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Button.Group>
            <Button
              secondary
              content="Edit CC email"
              onClick={toggleField}
              style={{ border: "1px solid #dfdfdf" }}
              type="button"
            />
            <Button
              primary
              content="Confirm"
              disabled={isDisabled}
              type="submit"
              style={{ border: "1px solid #dfdfdf" }}
            />
          </Button.Group>
        </div>
      </Form>
    </Segment>
  );
}

/*

            <Button.Group >
              <Form.Button
                secondary
                content="Edit CC email"
                onClick={this.toggleField}
                style={{ border: "1px solid #dfdfdf" }}
              />
              <Form.Button
                primary
                content="Confirm"
                disabled={emailError || disabled}
                onClick={this.handleSubmit}
                style={{ border: "1px solid #dfdfdf" }}
              />
            </Button.Group>
          </div>
          */

export default AdminConfig;
