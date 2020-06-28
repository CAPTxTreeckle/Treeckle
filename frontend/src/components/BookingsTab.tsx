import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { TabProps } from "./DesktopNavigationBar";

function BookingsTab(props: TabProps) {
  return (
    <Menu.Item
      as={Link}
      to="/bookings"
      name="bookings"
      active={props.activeTab === "bookings"}
      content="Bookings"
      onClick={props.onTabClick}
    />
  );
}

export default BookingsTab;
