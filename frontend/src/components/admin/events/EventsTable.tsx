import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Context } from "../../../contexts/UserProvider";
import { Table, Segment, Popup, Button, Icon } from "semantic-ui-react";
import { toDateTimeString } from "../../../util/DateUtil";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";
import "../../../styles/ScrollableTable.scss";
import ImageUploader from "../../common/ImageUploader";
import StatusBar from "../../common/StatusBar";
import { Status } from "../../custom-typings/status-type";
import { Event } from "../../custom-typings/event-types";

type EventId = string;

function EventsTable() {
  const userContext = useContext(Context);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<string | Blob>();
  const [status, setStatus] = useState<Status>(); // {success: boolean, message: string}
  const [updating, setUpdating] = useState(false); // indicates if the update in poster or delete is still processing

  useEffect(() => {
    retrieveAllCreatedEvents();
  }, []);

  const retrieveAllCreatedEvents = () => {
    return axios
      .get(`/api/events/?historical=true&latestFirst=true`, {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((resp) => {
        if (resp.status == 200) {
          console.log("###", resp.data);
          const allEvents = resp.data;
          setAllEvents(allEvents);
          setIsLoading(false);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING &&
          console.log("GET all booking requests error:", response);
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          userContext.resetUser();
        }
      });
  };

  const updatePoster = (eventId: EventId) => {
    const formData = new FormData();
    if (!image) return; //if image is undefined then do not update
    formData.append("image", image);
    formData.append("eventId", eventId);
    axios
      .patch("api/events/image", formData, {
        headers: {
          Authorization: `Bearer ${userContext.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("PATCH upload poster:", response);
        if (response.status === 200) {
          setStatus({ success: true, message: "updated image" });
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("PATCH upload poster error:", response);
        setStatus({ success: false, message: "error updating image" });
      });
  };

  const deleteEvent = (eventId: EventId) => {
    const data = {
      eventId: eventId,
    };
    axios
      .delete("/api/events", {
        data: data,
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("DELETE event", response);
        if (response.status === 200) {
          setStatus({ success: true, message: "deleted event" });
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("DELETE event error", response);
        setStatus({ success: false, message: "error deleting event" });
      });
  };

  const renderBodyRow = (data: Event, index: any) => {
    const {
      attendees,
      attendeesNames,
      capacity,
      categories,
      description,
      eventDate,
      eventId,
      organisedBy,
      posterPath,
      shortId,
      signupsAllowed,
      title,
      venue,
    } = data;
    const row = (
      <Table.Row>
        <Table.Cell>
          <div>
            <Popup
              trigger={
                <Button icon>
                  <Icon color="red" name="delete" />
                </Button>
              }
              on="click"
              content={
                <div>
                  <Button fluid onClick={() => deleteEvent(eventId)}>
                    Delete
                  </Button>
                </div>
              }
              position="bottom center"
            />

            {title}
          </div>
        </Table.Cell>
        <Table.Cell>{toDateTimeString(eventDate)}</Table.Cell>
        <Table.Cell>{attendeesNames}</Table.Cell>
        <Table.Cell>
          <div>
            <Popup
              trigger={<Button>Change Poster</Button>}
              on="click"
              content={
                <div>
                  <ImageUploader
                    onChange={(image: string | Blob) => {
                      setImage(image);
                    }}
                  />
                  <Button fluid onClick={() => updatePoster(eventId)}>
                    Update
                  </Button>
                </div>
              }
              position="bottom center"
            />
          </div>
        </Table.Cell>
      </Table.Row>
    );
    return row;
  };

  return (
    <div>
      {(status || updating) && (
        <StatusBar status={status} submitting={updating} />
      )}
      <div className="scrollable-table" style={{ maxHeight: "44em" }}>
        {allEvents.length > 0 ? (
          <Table
            selectable
            headerRow={
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Attendees</Table.HeaderCell>
                <Table.HeaderCell>Poster</Table.HeaderCell>
              </Table.Row>
            }
            tableData={allEvents}
            renderBodyRow={renderBodyRow}
          />
        ) : (
          <Segment
            placeholder
            textAlign="center"
            size="huge"
            loading={isLoading}
          >
            There are currently no events created by you
          </Segment>
        )}
      </div>
    </div>
  );
}

export default EventsTable;
