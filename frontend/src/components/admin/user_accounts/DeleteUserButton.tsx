import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../../contexts/UserProvider";
import { Button, Popup } from "semantic-ui-react";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";

type Props = {
  email: string;
  updateTable: () => void;
};

function DeleteUserButton(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const userContext = useContext(Context);

  const deleteUser = () => {
    const data = {
      email: props.email,
    };
    axios
      .delete("../api/accounts", {
        data: data,
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("DELETE user", response);
        if (response.status === 200) {
          props.updateTable();
          togglePopup();
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("DELETE user error", response);
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          userContext.resetUser();
        }
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popup
      trigger={<Button basic color="red" icon="close" />}
      on="click"
      content={
        <Button color="red" content="Delete user" onClick={deleteUser} />
      }
      position="bottom center"
      open={isOpen}
      onOpen={togglePopup}
      onClose={togglePopup}
    />
  );
}

export default DeleteUserButton;
