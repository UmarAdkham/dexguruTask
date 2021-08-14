import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import Category from "./Category.js";
import TransactionType from "./TransactionType.js";
import { CSSTransition } from "react-transition-group";

const Table = ({ transactions }) => {
  const tokenValue = "Token value";
  const tradePrice = "Trade price";
  const [valueToDisplay, setValueToDisplay] = useState(tokenValue); // by default token value is displayed

  /**
   * Convert timestamp into MM/DD/YY hh:mm:ss format
   *
   * @param timestamp
   * @returns formatted date
   */
  const convertTimestamp = (timestamp) => {
    let date = new Date(+timestamp * 1000);
    let convertedDate = moment(date.toUTCString()).format("MM/DD/YY hh:mm:ss");
    return convertedDate;
  };

  /**
   * Display amount0 and amount1 together with their respective token symbols
   *
   * @param transaction specific transaction the values to be displayed for
   * @returns concatenated string
   */
  const displayAmount = (transaction) => {
    // if it is a buy transaction
    if(transaction.amount0In > 0) { 
      return (
        +transaction.amount0In.toFixed(6) + " " + transaction.token0Symbol +
        "\n" +
        +transaction.amount1Out.toFixed(6) + " " + transaction.token1Symbol
      );
    }
    // if it is a cell transaction
    return ( 
      +transaction.amount0Out.toFixed(6) + " " + transaction.token0Symbol +
      "\n" +
      +transaction.amount1In.toFixed(6) + " " + transaction.token1Symbol
    );
    
  };

  /**
   * Display either token value or trade price based on valueToDisplay state
   *
   * @param transaction specific transaction the values to be displayed for
   * @returns amount numer rounded until 6th decimal
   */
  const displayCorrectValue = (transaction) => {
    let displayValue =
      valueToDisplay === tokenValue
        ? transaction.amountUSD
        : transaction.token1PriceUSD / transaction.token0PriceUSD;
    return displayValue.toFixed(6);
  };

  /**
   * Update valueToDisplay state when dropdown menu value is changed between "Token price" and "Trade price"
   *
   * @param event selection change event
   */
   const handleValueChange = (event) => {
    setValueToDisplay(event.target.value);
  };

  /**
   * Store previous transactions props
   *
   * @param values transactions to be stored
   * @returns previous transactions array
   */
  function usePrevious(values) {
    const ref = useRef();
    useEffect(() => {
      ref.current = values;
    });
    return ref.current;
  }

  const prevTransactions = usePrevious(transactions);

  return (
    <table className="table table-hover table-dark">
      <thead>
        <tr>
          <th></th>
          <th>Token amount</th>
          <th>
            <select value={valueToDisplay} onChange={handleValueChange}>
              <option>{tokenValue}</option>
              <option>{tradePrice}</option>
            </select>
          </th>
          <th></th>
          <th>Transaction time</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => {
            return (
              <CSSTransition
                in={
                  prevTransactions !== undefined &&
                  !Boolean(
                    prevTransactions.find((x) => x.id === transaction.id) // make  animation if the transaction is not in prevTransactions
                  )
                }
                timeout={1000}
                classNames="row-transition"
                key={index}
              >
                <tr
                  className="row-transition"
                  onClick={() => window.open("https://etherscan.io/tx/" + transaction.transactionAddress)} // redirect to etherscan site
                >
                  <td>
                    <TransactionType amount0In={transaction.amount0In} />
                  </td>
                  <td>{displayAmount(transaction)}</td>
                  <td>${displayCorrectValue(transaction)}</td>
                  <td>
                    <Category walletCategory={transaction.walletCategory} />
                  </td>
                  <td>{convertTimestamp(transaction.timestamp)}</td>
                </tr>
              </CSSTransition>
            );
          })
        ) : (
          <tr>
            <td colSpan="5">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
