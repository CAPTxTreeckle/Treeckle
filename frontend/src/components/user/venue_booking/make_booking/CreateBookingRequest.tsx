import React, { useState } from "react";
import SelectVenueCard from "./SelectVenueCard";
import VenueAvailabilityCard from "./VenueAvailabilityCard";
import BookVenueForm from "./BookVenueForm";
import StatusBar from "../../../common/StatusBar";
import { Card } from "semantic-ui-react";
import { CONSOLE_LOGGING } from "../../../../DevelopmentView";
import { Venue, BookingPeriod } from "../../../custom-typings/booking-types";
import { Status } from "../../../custom-typings/status-type";

function CreateBookingRequest() {
  const [venue, setVenue] = useState<Venue>(); //{roomId: string, name: string}
  const [bookingPeriod, setBookingPeriod] = useState<BookingPeriod>(); // {venue, start: date in ms, end: date in ms}
  const [status, setStatus] = useState<Status>(); // {success: boolean, message: string}
  const [submitting, setSubmitting] = useState(false); // indicates if the submission is still processing

  const renderVenueAvailabilityCard = (venue: Venue) => {
    setVenue(venue);
    setBookingPeriod(undefined);
    setStatus(undefined);

    //this.setState({ venue, bookingPeriod: null, status: null });
    CONSOLE_LOGGING && console.log("Selected venue:", venue);
  };

  const renderBookingForm = (bookingPeriod: BookingPeriod) => {
    setBookingPeriod(bookingPeriod);
    CONSOLE_LOGGING && console.log("Selected booking period:", bookingPeriod);
  };

  const toggleStatusBar = (submitting: boolean) => {
    setSubmitting(submitting);
  };

  const renderStatusBar = (success: boolean, message: string) => {
    const status: Status = { success, message };
    setStatus(status);
    CONSOLE_LOGGING && console.log("Status:", status);
  };

  return (
    <div>
      {(status || submitting) && (
        <StatusBar status={status} submitting={submitting} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
          flexWrap: "wrap",
        }}
      >
        <SelectVenueCard
          renderVenueAvailabilityCard={renderVenueAvailabilityCard}
          venue={venue}
        />
        {venue ? (
          <VenueAvailabilityCard
            venue={venue}
            renderBookingForm={renderBookingForm}
          />
        ) : (
          <Card style={{ boxShadow: "none", backgroundColor: "#2c4a66" }} />
        )}
        {bookingPeriod ? (
          <BookVenueForm
            bookingPeriod={bookingPeriod}
            renderStatusBar={renderStatusBar}
            toggleStatusBar={toggleStatusBar}
          />
        ) : (
          <Card style={{ boxShadow: "none", backgroundColor: "#2c4a66" }} />
        )}
      </div>
    </div>
  );
}

export default CreateBookingRequest;
