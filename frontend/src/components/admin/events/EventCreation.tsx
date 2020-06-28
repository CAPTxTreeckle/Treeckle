import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Segment,
  Container,
  Grid,
  Header,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import { Context } from "../../../contexts/UserProvider";
import ImageUploader from "../../common/ImageUploader";
import DatePicker from "../../common/DatePicker";
import TimePicker from "../../common/TimePicker";
import StatusBar from "../../common/StatusBar";
import { parseDateTime } from "../../../util/DateUtil";
import "../../../styles/EventCreation.scss";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";
import { UNKNOWN_ERROR } from "../../../util/Constants";
import EventsTable from "./EventsTable";
import UserAccountsTable from "../user_accounts/UserAccountsTable";
import { Status } from "../../custom-typings/status-type";

const SUCCESS_MSG = "Your event has been successfully created.";
const MISSING_FIELDS = "Compulsory fields are missing.";
const IMAGE_UPLOAD_ERROR =
  "Image cannot be uploaded. Please try again at the created events page.";

function EventCreation() {
  const userContext = useContext(Context);
  const [image, setImage] = useState<string | Blob>();
  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  //TODO: figure out better type for moment
  const [startTime, setStartTime] = useState<any>();
  const [endDate, setEndDate] = useState<Date>();
  const [endTime, setEndTime] = useState<any>();
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [organisedBy, setOrganisedBy] = useState("");
  const [signupsAllowed, setSignupsAllowed] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [status, setStatus] = useState<Status>(); // {success: boolean, message: string}
  const [submitting, setSubmitting] = useState(false); // indicates if the submission is still processing

  const handleSubmit = () => {
    if (isValidEventPeriod()) {
      const data = {
        title: title,
        description: description,
        //assert that startDate is not null or undefined with !
        eventDate: parseDateTime(startDate!, startTime.toDate()),
        categories: categories,
        organisedBy: organisedBy,
        signupsAllowed: signupsAllowed,
        capacity: parseInt(capacity),
        venue: venue,
      };
      if (capacity) {
        data.capacity = parseInt(capacity);
      }
      if (venue) {
        data.venue = venue;
      }
      CONSOLE_LOGGING && console.log("Event creation data sent:", data);
      axios
        .post("api/events", data, {
          headers: { Authorization: `Bearer ${userContext.token}` },
        })
        .then((response) => {
          CONSOLE_LOGGING && console.log("POST create event:", response);
          if (response.status === 200) {
            if (image) {
              const formData = new FormData();
              formData.append("image", image);
              formData.append("eventId", response.data.eventId);
              axios
                .patch("api/events/image", formData, {
                  headers: {
                    Authorization: `Bearer ${userContext.token}`,
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  CONSOLE_LOGGING &&
                    console.log("PATCH upload poster:", response);
                  if (response.status === 200) {
                    setStatus({ success: true, message: SUCCESS_MSG });
                  }
                })
                .catch(({ response }) => {
                  CONSOLE_LOGGING &&
                    console.log("PATCH upload poster error:", response);
                  setStatus({ success: false, message: IMAGE_UPLOAD_ERROR });
                });
            } else {
              setStatus({ success: true, message: SUCCESS_MSG });
            }
          }
        })
        .catch(({ response }) => {
          CONSOLE_LOGGING && console.log("POST create event date:", response);
          let msg = "";
          switch (response.status) {
            case 401:
              alert("Your current session has expired. Please log in again.");
              userContext.resetUser();
              break;
            case 422:
              msg = MISSING_FIELDS;
              break;
            default:
              msg = UNKNOWN_ERROR;
          }
          setStatus({ success: false, message: msg });
        });
    } else {
      setDateError(true);
    }
  };

  const areValidFields = () => {
    return title && organisedBy && startDate && startTime && endDate && endTime;
  };

  const isValidEventPeriod = () => {
    if (startDate && startTime && endDate && endTime) {
      const start = parseDateTime(startDate, startTime.toDate());
      const end = parseDateTime(endDate, endTime.toDate());
      return start <= end;
    }
    return false;
  };

  return (
    <Container>
      {(status || submitting) && (
        <StatusBar status={status} submitting={submitting} />
      )}
      <Segment placeholder style={{ marginTop: "1em" }}>
        <Grid columns={2} stackable>
          <Grid.Column verticalAlign="middle">
            <ImageUploader
              onChange={
                (image: string | Blob) => {
                  setImage(image);
                }
                // this.handleChange(null, { name: "image", value: image })
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Header textAlign="center">Event creation form</Header>
            <Form className="event-creation">
              <Form.Input
                label="Event title"
                name="title"
                onChange={(event, data) => {
                  setTitle(data.value);
                }}
                required
                value={title}
              />
              <Form.Input
                label="Organised by"
                name="organisedBy"
                onChange={(event, data) => {
                  setOrganisedBy(data.value);
                }}
                required
                value={organisedBy}
              />
              <Form.Input
                label="Capacity"
                name="capacity"
                onChange={(event, data) => {
                  setCapacity(data.value);
                }}
                type="number"
                required
                value={capacity}
              />
              <Form.Input
                label="Venue"
                name="venue"
                onChange={(event, data) => {
                  setVenue(data.value);
                }}
                value={venue}
              />
              <Form.Group>
                <Form.Field required>
                  <label>Start date</label>
                  <DatePicker
                    placeholder="Select start date"
                    onDateChange={(date: Date) => {
                      setDateError(false);
                      setStartDate(date);
                    }}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Start time</label>
                  <TimePicker
                    placeholder="Select start time"
                    onChange={(time: any) => {
                      console.log(time);
                      setDateError(false);
                      setStartTime(time);
                    }}
                    showInputIcon={startTime === null}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field required error={dateError}>
                  <label>End date</label>
                  <DatePicker
                    placeholder="Select end date"
                    onDateChange={(date: Date) => {
                      console.log(date);
                      setDateError(false);
                      setEndDate(date);
                    }}
                  />
                </Form.Field>
                <Form.Field required error={dateError}>
                  <label>End time</label>
                  <TimePicker
                    placeholder="Select end time"
                    onChange={(time: any) => {
                      console.log(time);
                      setDateError(false);
                      setEndTime(time);
                    }}
                    showInputIcon={endTime === null}
                  />
                </Form.Field>
              </Form.Group>
              {dateError && (
                <Message
                  error
                  content="End date/time cannot be earlier than start date/time."
                  style={{ display: "block", margin: "1em auto" }}
                />
              )}
              <Form.TextArea
                rows={8}
                label="Description"
                name="description"
                onChange={(event, data) => {
                  setDescription(data.value as string);
                }}
                value={description}
              />
              <Form.Group>
                <Form.Radio
                  label="Allow sign-ups"
                  name="signupsAllowed"
                  onChange={
                    (event, { name, checked }) => {
                      setSignupsAllowed(!signupsAllowed);
                    }
                    // this.handleChange(event, { name: name, value: checked })
                  }
                  toggle
                  checked={signupsAllowed}
                />
                <Button
                  fluid
                  content="Create"
                  onClick={handleSubmit}
                  primary
                  disabled={!areValidFields()}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
      <br />
      <br />
      <br />

      <h1 style={{ color: "#FDFDFD" }}>Manage your created events</h1>

      <EventsTable />

      <br />
      <br />
      <br />
    </Container>
  );
}

export default EventCreation;
