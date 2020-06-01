import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Label, Dropdown } from "semantic-ui-react";
import { CountsContext } from "../contexts/CountsProvider";
import { TabProps } from "./DesktopNavigationBar";

function DesktopAdminTab(props: TabProps) {
  const counts = useContext(CountsContext);

  const adminOptions = [
    <Dropdown.Item
      key="admin/bookings"
      as={Link}
      to="/admin/bookings"
      name="admin/bookings"
      active={props.activeTab === "admin/bookings"}
      text="Bookings"
      onClick={props.onTabClick}
    />,
    <Dropdown.Item
      key="admin/users"
      as={Link}
      to="/admin/users"
      name="admin/users"
      active={props.activeTab === "admin/users"}
      text="Users"
      onClick={props.onTabClick}
    />,
    <Dropdown.Item
      key="admin/settings"
      as={Link}
      to="/admin/settings"
      name="admin/settings"
      active={props.activeTab === "admin/settings"}
      text="Settings"
      onClick={props.onTabClick}
    />,
  ];

  return (
    <Dropdown
      active={props.activeTab.includes("admin")}
      text="Admin"
      as={Menu.Item}
      icon={
        counts.pendingRoomBookings >= 0 && (
          <Label color="red">{counts.pendingRoomBookings}</Label>
        )
      }
      floating
      options={adminOptions}
    />
  );
}

export default DesktopAdminTab;
