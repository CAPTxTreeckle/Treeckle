import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Responsive } from "semantic-ui-react";
import MobileNavigationBar from "./MobileNavigationBar";
import DesktopNavigationBar from "./DesktopNavigationBar";
import { CountsContext } from "../contexts/CountsProvider";

function NavigationContainer({ children }: any) {
  const [activeTab, setActiveTab] = useState("");
  const counts = useContext(CountsContext);
  useEffect(() => counts.setCounts(null, !counts.updater, null), []);

  const getWidth = () => {
    const isSSR = typeof window === "undefined";

    return (isSSR
      ? Responsive.onlyTablet.minWidth
      : window.innerWidth) as number;
  };

  return (
    <div>
      <DesktopNavigationBar
        getWidth={getWidth}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {children}
      </DesktopNavigationBar>
      <MobileNavigationBar
        getWidth={getWidth}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {children}
      </MobileNavigationBar>
    </div>
  );
}

NavigationContainer.propTypes = {
  children: PropTypes.node,
};

export default NavigationContainer;
