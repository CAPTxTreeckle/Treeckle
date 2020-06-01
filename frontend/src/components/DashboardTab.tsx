import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { TabProps } from "./DesktopNavigationBar";

function DashboardTab(props: TabProps) {
  return (
    <Menu.Item
      as={Link}
      to="/dashboard"
      name="dashboard"
      active={props.activeTab === "dashboard"}
      content="Dashboard"
      onClick={props.onTabClick}
    />
  );
}

export default DashboardTab;
