import React, { useEffect, useContext, useState } from "react";
import {
  Card,
  Button,
  Container,
  Accordion,
  Segment,
  ButtonProps,
  AccordionTitleProps,
} from "semantic-ui-react";
import axios from "axios";
import { Context } from "../../../../contexts/UserProvider";
import { CONSOLE_LOGGING } from "../../../../DevelopmentView";
import { Venue } from "../booking-types";
import { BookingsContext } from "./BookingsContext";

type Props = {
  venue: Venue | undefined;
  renderVenueAvailabilityCard: (venue: Venue) => void;
};

type Category = {
  key: string;
  title: string;
  content: {
    content: null | JSX.Element;
  };
};

//TODO: settle the venue rendering on button click (DOM issue)
function SelectVenueCard(props: Props) {
  const userContext = useContext(Context);
  const [categories, setCategories] = useState<Category[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [activeButton, setActiveButton] = useState(""); //selected category
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("api/rooms/categories", {
        headers: { Authorization: `Bearer ${userContext.token}` },
      })
      .then((response) => {
        CONSOLE_LOGGING && console.log("GET categories response:", response);
        if (response.status === 200) {
          const getCategories = response.data.categories.map(
            (category: Category) => {
              return {
                key: category,
                title: category,
                content: null,
              };
            }
          );
          setCategories(getCategories);
          setIsLoading(false);
          CONSOLE_LOGGING && console.log("Categories updated", categories);
        }
      })
      .catch(({ response }) => {
        CONSOLE_LOGGING && console.log("GET categories error:", response);
        if (response.status === 401) {
          alert("Your current session has expired. Please log in again.");
          userContext.resetUser();
        }
      });
  }, []);

  const handleOnCategoryClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    { active, content }: AccordionTitleProps
  ) => {
    if (!active) {
      const selectedCategory = content as Category["key"];
      axios
        .get(`api/rooms/categories/${selectedCategory}`, {
          headers: { Authorization: `Bearer ${userContext.token}` },
        })
        .then((response) => {
          CONSOLE_LOGGING && console.log("GET venues response:", response);
          if (response.status === 200) {
            updateCategory(selectedCategory, response.data);
          }
        })
        .catch(({ response }) => {
          CONSOLE_LOGGING && console.log("GET venues error:", response);
          if (response.status === 401) {
            alert("Your current session has expired. Please log in again.");
            userContext.resetUser();
          }
        });
    }
  };

  //TODO: fix improper updating of venues
  const updateCategory = (
    selectedCategory: Category["key"],
    venuesParam: Venue[]
  ) => {
    const renderedVenues = renderVenues(selectedCategory, venuesParam);
    const getCategories = categories.map((category) => {
      return selectedCategory !== category.key
        ? category
        : {
            key: category.key,
            title: category.title,
            content: renderedVenues,
          };
    });
    setCategories(getCategories);
    setVenues(venuesParam);
    CONSOLE_LOGGING &&
      console.log("Categories and venues updated", getCategories, venuesParam);
  };

  const renderVenues = (category: Category["key"], venuesParam: Venue[]) => {
    const renderedVenues = venuesParam.map((venue) => {
      return (
        <Button
          key={venue.roomId}
          // roomId={venue.roomId}
          venue={venue}
          //TODO: selected item is not highlighted
          active={props.venue?.roomId === activeButton}
          onClick={handleButtonClick}
          category={category}
        >
          <Container>{venue.name}</Container>
        </Button>
      );
    });
    return {
      content: <Button.Group vertical basic fluid buttons={renderedVenues} />,
    };
  };

  // Update on change of active button
  useEffect(() => {
    updateCategory(activeButton, venues);
  }, [activeButton, props.venue]);

  async function updateActiveButton(activeButtonParam: string) {
    setActiveButton(activeButtonParam);
  }

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    const { roomId, venue, category } = data;
    updateActiveButton(roomId);
    //updateActiveButton(roomId).then(() => updateCategory(category, venues));
    props.renderVenueAvailabilityCard(venue);
  };

  return (
    <Card raised style={{ margin: "0 0 1em 0" }}>
      <Card.Content style={{ flexGrow: 0 }}>
        <Card.Header textAlign="center">Select a venue</Card.Header>
      </Card.Content>
      <Card.Content style={{ flexGrow: 0 }}>
        {isLoading ? (
          <Segment style={{ boxShadow: "none" }} placeholder loading />
        ) : (
          <Accordion
            styled
            panels={categories}
            onTitleClick={handleOnCategoryClick}
          />
        )}
      </Card.Content>
    </Card>
  );
}

export default SelectVenueCard;
