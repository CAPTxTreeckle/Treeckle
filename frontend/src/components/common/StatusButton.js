import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../contexts/UserProvider";
import { Button, Popup } from "semantic-ui-react";
import { CONSOLE_LOGGING } from "../../DevelopmentView";
import { CountsContext } from "../../contexts/CountsProvider";

function StatusButton(props) {
  const context = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [status, updateStatus] = useState(null);

  // 0 => pending, 1 => approved, 2 => rejected, 3 => cancelled
  const renderStatusButton = () => {
    let color;
    let statusLabel;

    switch (props.status) {
      case 0:
        color = "orange";
        statusLabel = "Pending";
        break;
      case 1:
        color = "green";
        statusLabel = "Approved";
        break;
      case 2:
        color = "red";
        statusLabel = "Rejected";
        break;
      case 3:
        color = "black";
        statusLabel = "Cancelled";
        break;
      default:
        color = "standard";
        statusLabel = "Unknown";
    }

    return (
      <Button
        fluid
        color={color}
        content={statusLabel}
        disabled={statusLabel === "Cancelled"}
      />
    );
  };

  const updateBookingRequest = (newStatus) => {
    const data = {
      id: props.bookingId,
      approved: newStatus,
    };
    axios
      .patch("../api/rooms/bookings/manage", data, {
        headers: { Authorization: `Bearer ${context.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("PATCH update status:", response);
        if (response.status === 200) {
          props.updateTable();
          setHasUpdated(true);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("PATCH update status error:", response);
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          context.resetUser();
        }
      });
  };

  const cancelBookingRequest = () => {
    const data = {
      id: props.bookingId,
    };
    axios
      .patch("api/rooms/bookings", data, {
        headers: { Authorization: `Bearer ${context.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("PATCH cancel booking:", response);
        if (response.status === 200) {
          props.updateTable();
          setHasUpdated(true);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("PATCH cancel booking error:", response);
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          context.resetUser();
        }
      });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const updateLabel = (updater, setCounts) => {
    //TODO: verify if this is correct
    setCounts(null, !updater, null);
    setHasUpdated(false);
  };

  const renderOptions = () => {
    return (
      <div style={{ flexDirection: "column", display: "flex" }}>
        {!props.cancellable && (status === 0 || status === 2) && (
          <Button
            color="green"
            content="Approve"
            onClick={() => {
              updateBookingRequest(1);
              togglePopup();
            }}
            style={{ margin: "0.25rem 0" }}
          />
        )}
        {!props.cancellable && (status === 1 || status === 2) && (
          <Button
            color="orange"
            content="Revoke"
            onClick={() => {
              updateBookingRequest(0);
              togglePopup();
            }}
            style={{ margin: "0.25rem 0" }}
          />
        )}
        {!props.cancellable && (status === 0 || status === 1) && (
          <Button
            color="red"
            content="Reject"
            onClick={() => {
              updateBookingRequest(2);
              togglePopup();
            }}
            style={{ margin: "0.25rem 0" }}
          />
        )}
        {props.cancellable && (
          <Button
            color="red"
            content="Cancel"
            onClick={() => {
              cancelBookingRequest();
              togglePopup();
            }}
            style={{ margin: "0.25rem 0" }}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <Popup
        trigger={renderStatusButton()}
        on="click"
        content={renderOptions()}
        position="bottom center"
        open={isOpen}
        onOpen={togglePopup}
        onClose={togglePopup}
        disabled={props.status === 3}
      />
      {hasUpdated && (
        <CountsContext.Consumer>
          {({ updater, setCounts }) => {
            updateLabel(updater, setCounts);
          }}
        </CountsContext.Consumer>
      )}
    </div>
  );
}

export default StatusButton;
