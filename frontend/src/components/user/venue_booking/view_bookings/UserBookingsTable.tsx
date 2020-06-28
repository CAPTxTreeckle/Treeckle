import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../../contexts/UserProvider";
import { Table, Segment } from "semantic-ui-react";
import StatusButton from "../../../common/StatusButton";
import { toDateTimeString } from "../../../../util/DateUtil";
import { CONSOLE_LOGGING } from "../../../../DevelopmentView";
import "../../../../styles/ScrollableTable.scss";
import { Booking } from "../../../custom-typings/booking-types";

function UserBookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userContext = useContext(Context);

  useEffect(() => {
    retrieveBookings();
  }, []);

  const retrieveBookings = () => {
    axios
      .get("api/rooms/bookings", {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("GET own bookings:", response);
        if (response.status === 200) {
          setBookings(response.data);
          setIsLoading(false);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("GET own bookings error:", response);
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          userContext.resetUser();
        }
      });
  };

  const renderBodyRow = (data: Booking, index: number) => {
    const {
      roomName,
      start,
      end,
      expectedAttendees,
      description,
      createdDate,
      approved,
      bookingId,
    } = data;
    const status = approved;
    const row = (
      <Table.Row key={bookingId}>
        <Table.Cell>{roomName}</Table.Cell>
        <Table.Cell>{toDateTimeString(start)}</Table.Cell>
        <Table.Cell>{toDateTimeString(end)}</Table.Cell>
        <Table.Cell>{expectedAttendees}</Table.Cell>
        <Table.Cell>{description}</Table.Cell>
        <Table.Cell>{toDateTimeString(createdDate)}</Table.Cell>
        <Table.Cell>
          <StatusButton
            status={status}
            cancellable={true}
            bookingId={bookingId}
            updateTable={retrieveBookings}
          />
        </Table.Cell>
      </Table.Row>
    );
    return row;
  };

  return bookings.length > 0 ? (
    <div
      className="scrollable-table"
      style={{
        maxHeight: "37em",
      }}
    >
      <Table
        selectable
        headerRow={
          <Table.Row>
            <Table.HeaderCell>Venue</Table.HeaderCell>
            <Table.HeaderCell>Start</Table.HeaderCell>
            <Table.HeaderCell>End</Table.HeaderCell>
            <Table.HeaderCell>Number of participants</Table.HeaderCell>
            <Table.HeaderCell>Purpose</Table.HeaderCell>
            <Table.HeaderCell>Submitted at</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        }
        tableData={bookings}
        renderBodyRow={renderBodyRow}
      />
    </div>
  ) : (
    <Segment placeholder textAlign="center" size="big" loading={isLoading}>
      You currently do not have any bookings
    </Segment>
  );
}

export default UserBookingsTable;
