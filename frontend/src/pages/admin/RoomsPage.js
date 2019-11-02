import React from "react";
import ReactGA from "react-ga";
import { Context } from "../../contexts/UserProvider";
import { Container, Menu } from "semantic-ui-react";

class RoomsPage extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    ReactGA.pageview("/admin/rooms");
  }

  render() {
    return (
      <main className="admin-rooms-page">
        <Menu size="huge"></Menu>
        <br />
        <br />
        <Container>
          <h1 style={{ color: "#FDFDFD" }}>Configure Rooms</h1>
          {/* <RoomConfig /> */}
        </Container>
      </main>
    );
  }
}

export default RooomsPage;
