import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../contexts/UserProvider";
import { Button, Popup } from "semantic-ui-react";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";
import { Role } from "./RoleTypes";

type Props = {
  name: string;
  email: string;
  role: Role;
  updateTable: () => void;
};

function ChangeRoleButton(props: Props) {
  const userContext = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const updateRole = (newRole: string) => {
    const data = {
      name: props.name,
      email: props.email,
      role: newRole,
    };
    axios
      .patch("../api/accounts", data, {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("PATCH update user role", response);
        if (response.status === 200) {
          props.updateTable();
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING &&
          console.log("PATCH update user role error", response);
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          userContext.resetUser();
        }
      });
  };

  const renderOptions = () => {
    const role = props.role;
    return (
      <div style={{ flexDirection: "column", display: "flex" }}>
        {role !== "Admin" && (
          <Button
            secondary
            content="Make Admin"
            onClick={() => {
              updateRole("Admin");
              togglePopup();
            }}
            style={{ margin: "0.25rem 0" }}
          />
        )}
        {role !== "Organiser" && (
          <Button
            secondary
            content="Make Organiser"
            onClick={() => {
              updateRole("Organiser");
              togglePopup();
            }}
            style={{ margin: "0.25rem 0" }}
          />
        )}
        {role !== "Resident" && (
          <Button
            secondary
            content="Make Resident"
            onClick={() => {
              updateRole("Resident");
              togglePopup();
            }}
            style={{ margin: "0.25rem 0" }}
          />
        )}
      </div>
    );
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popup
      trigger={
        <Button basic color="green">
          Change role
        </Button>
      }
      on="click"
      content={renderOptions()}
      position="bottom center"
      open={isOpen}
      onOpen={togglePopup}
      onClose={togglePopup}
    />
  );
}

export default ChangeRoleButton;
