import React, { useContext } from "react";
import { Responsive, Menu } from "semantic-ui-react";
import { Context } from "../contexts/UserProvider";
import LogoTab from "./LogoTab";
import DashboardTab from "./DashboardTab";
import EventsTab from "./EventsTab";
import BookingsTab from "./BookingsTab";
import DesktopAdminTab from "./DesktopAdminTab";
import UserMenu from "./UserMenu";
import { DEVELOPMENT_VIEW, CONSOLE_LOGGING } from "../DevelopmentView";

type Props = {
  getWidth: () => number;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  children: any;
};

export type TabProps = {
  activeTab: string;
  //TODO: verify type for onTabClick
  onTabClick: (event: any, data: any) => void;
};

function DesktopNavigationBar(props: Props) {
  const user = useContext(Context);
  const { getWidth, children, activeTab, setActiveTab } = props;

  const onTabClick = (event: any, data: any) => {
    CONSOLE_LOGGING && console.log("Set new tab to:", data.name);
    setActiveTab(data.name);
  };

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyComputer.minWidth}>
      <Menu fixed="top" borderless size="huge">
        <LogoTab onTabClick={onTabClick} />
        <DashboardTab activeTab={activeTab} onTabClick={onTabClick} />
        {DEVELOPMENT_VIEW && (
          <EventsTab activeTab={activeTab} onTabClick={onTabClick} />
        )}
        <BookingsTab activeTab={activeTab} onTabClick={onTabClick} />
        {user.role === "Admin" && (
          <DesktopAdminTab activeTab={activeTab} onTabClick={onTabClick} />
        )}
        <UserMenu activeTab={activeTab} onTabClick={onTabClick} />
      </Menu>
      {children}
    </Responsive>
  );
}

export default DesktopNavigationBar;
