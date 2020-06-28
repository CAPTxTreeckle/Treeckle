import React from "react";
import { Menu } from "semantic-ui-react";

type Props = {
  openSidebar: () => void;
};

function EventsTab(props: Props) {
  return (
    <Menu.Item
      onClick={props.openSidebar}
      icon="sidebar"
      style={{ marginLeft: "1rem" }}
    />
  );
}

export default EventsTab;
