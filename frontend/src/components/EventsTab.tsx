import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { TabProps } from "./DesktopNavigationBar";

function EventsTab(props: TabProps) {
  return (
    <Menu.Item
      as={Link}
      to="/events"
      name="events"
      active={props.activeTab === "events"}
      content="Events"
      onClick={props.onTabClick}
    />
  );
}

export default EventsTab;
