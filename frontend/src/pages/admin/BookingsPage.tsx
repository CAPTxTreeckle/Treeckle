import React, { useState, useContext } from "react";
import ReactGA from "react-ga";
import { Context } from "../../contexts/UserProvider";
import { Container, Menu } from "semantic-ui-react";
import BookingsTable from "../../components/admin/venue_booking/BookingsTable";
import { DEVELOPMENT_VIEW } from "../../DevelopmentView";

function BookingsPage() {
  // const userContext = useContext(Context)
  // static contextType = Context;

  // constructor(props) {
  //   super(props);
  //   ReactGA.pageview("/admin/bookings");
  // }
  ReactGA.pageview("/admin/bookings");
  return (
    <main className="admin-bookings-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <h1 style={{ color: "#FDFDFD" }}>Booking Requests</h1>
        <BookingsTable />
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default BookingsPage;
