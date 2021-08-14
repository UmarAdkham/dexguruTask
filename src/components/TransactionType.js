import React from "react";
import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { IconContext } from "react-icons";

/**
 * Get buy or cell icon based on amount0In.
 * If amount0In is > 0, then it is a buy transaction
 * Else, it is a buy transaction
 * 
 * @param amount0In 
 * @returns icon component
 */
const getBuyOrCellIcon = (amount0In) => {
  let component =
    amount0In > 0 ? (
      <IconContext.Provider value={{ color: "green" }}>
        <FaArrowAltCircleUp />
      </IconContext.Provider>
    ) : (
      <IconContext.Provider value={{ color: "red" }}>
        <FaArrowCircleDown />
      </IconContext.Provider>
    );
  return component;
};

const TransactionType = ({ amount0In }) => {
  return <span>{getBuyOrCellIcon(amount0In)}</span>;
};

export default TransactionType;
