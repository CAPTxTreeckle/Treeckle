import React, { useState, useContext, useEffect, Fragment } from "react";
import EventCard from "../../EventCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../components/CarousellCards.css";
import Axios from "axios";
import { Context } from "../../../contexts/UserProvider";
import { CONSOLE_LOGGING } from "../../../DevelopmentView";
import { Card, Container, Placeholder } from "semantic-ui-react";
import _ from "lodash";
import { Event } from "../../custom-typings/event-types";

const EventsGallery = () => {
  const user = useContext(Context);

  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
    Axios.get("/api/events/gallery", { headers: headers })
      .then((response) => {
        CONSOLE_LOGGING && console.log("GET all events:", response);
        if (response.status === 200) {
          setAllEvents(response.data);
          setLoading(false);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("GET all events error:", response);
      });
  };

  //TODO: verify if loading card needs type
  if (isLoading) {
    return (
      <div>
        <Container>
          <Card.Group doubling itemsPerRow={3} centered>
            {_.map([1, 2, 3], (card: any) => (
              <Card key={card.header}>
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Header>
                      <Placeholder.Line length="very short" />
                      <Placeholder.Line length="medium" />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                  <Fragment>
                    <Card.Header>{card.header}</Card.Header>
                    <Card.Meta>{card.date}</Card.Meta>
                    <Card.Description>{card.description}</Card.Description>
                  </Fragment>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
  return (
    <div>
      <Container>
        <Card.Group doubling itemsPerRow={3} centered>
          {allEvents.map((value: Event, index) => {
            return (
              <EventCard
                event={{
                  title: value.title,
                  description: value.description,
                  eventDate: value.eventDate,
                  venue: value.venue,
                  posterPath: "/ftp/" + value.posterPath,
                  categories: value.categories,
                  eventId: value.eventId,
                  isUserAttendee: value.isUserAttendee,
                  attendees: value.attendees,
                }}
              />
            );
          })}
        </Card.Group>
      </Container>
    </div>
  );
};

export default EventsGallery;
