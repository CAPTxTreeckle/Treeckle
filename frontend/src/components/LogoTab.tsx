import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import logo from "../images/Treeckle_side.png";

//TODO: verify
type Props = {
  onTabClick: (event: any, data: any) => void;
};

function LogoTab(props: Props) {
  const data = { name: "dashboard" };

  return (
    <Menu.Item>
      <Image
        size="small"
        src={logo}
        as={Link}
        to={"/dashboard"}
        onClick={() => props.onTabClick(null, data)}
      />
    </Menu.Item>
  );
}

export default LogoTab;
