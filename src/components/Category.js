import React from "react";
import {
  GiSpermWhale,
  GiSharkFin,
  GiTurtle,
  GiRobotAntennas,
} from "react-icons/gi";
import { IconContext } from "react-icons";

/**
 * Get category icon based on walletCategory value.
 *
 * @param walletCategory
 * @returns icon component
 */
const renderSwitch = (walletCategory) => {
  switch (walletCategory) {
    case "heavy":
    case "Heavy":
      return <GiSpermWhale />;
    case "medium":
    case "Medium":
      return <GiSharkFin />;
    case "casual":
    case "Casual":
      return <GiTurtle />;
    case "bot":
    case "Bot":
      return <GiRobotAntennas />;
    default:
      return <div />;
  }
};

const Category = ({ walletCategory }) => {
  return (
    <span>
      <IconContext.Provider value={{ size: "2.5em" }}>
        {renderSwitch(walletCategory)}
      </IconContext.Provider>
    </span>
  );
};

export default Category;
