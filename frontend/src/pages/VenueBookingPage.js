import React, { useState } from "react";
import CreateBookingRequest from "../components/venue_booking/CreateBookingRequest";
import { Container, Button, Icon, Menu } from "semantic-ui-react";
import ExistingBookings from "../components/ExistingBookings";

const VenueBookingPage = props => {
  const [creating, setCreating] = useState(false);

  return (
    <main className="booking-page">
      <Menu size="huge"></Menu>
      <br />
      <Container>
        {!creating ? (
          <Button fluid animated="fade" onClick={() => setCreating(!creating)}>
            <Button.Content visible>
              <Icon name="add" />
            </Button.Content>
            <Button.Content hidden>Create new booking</Button.Content>
          </Button>
        ) : (
          <Button fluid animated="fade" onClick={() => setCreating(!creating)}>
            <Button.Content visible>
              <Icon name="close" />
            </Button.Content>
            <Button.Content hidden>Cancel booking creation</Button.Content>
          </Button>
        )}
        {!creating ? <ExistingBookings /> : <CreateBookingRequest />}
      </Container>
    </main>
  );
};

export default VenueBookingPage;
