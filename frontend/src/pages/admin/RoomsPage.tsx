import React from "react";
import ReactGA from "react-ga";
import { Context } from "../../contexts/UserProvider";
import { Container, Menu } from "semantic-ui-react";

function RoomsPage() {
  //static contextType = Context;

  // constructor(props) {
  //   super(props);
  //   ReactGA.pageview("/admin/rooms");
  // }
  ReactGA.pageview("/admin/rooms");

  return (
    <main className="admin-rooms-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <h1 style={{ color: "#FDFDFD" }}>Configure Rooms</h1>
        {/* <RoomConfig /> */}
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default RoomsPage;
