import React, { useState, useEffect } from "react";
import Table from './components/Table.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const apiUrl = "https://api.dex.guru/v2/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-eth/swaps";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isMyData, setIsMyData] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'accept': 'application/json' 
      },
      body: JSON.stringify({
        amm: 'uniswap',
        network: 'eth',
        token_status: 'all',
        trade_size_usd: {
          amount: 0,
          operator: "gt"
        },
        exchange_token_trade: {
          token_address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          amount: 0,
          operator: "gt"
        },
        account: (isMyData ? "0x61e1A8041186CeB8a561F6F264e8B2BB2E20e06D" : undefined), // pass account based on btn state
        sort_by: "timestamp",
        order: "desc",
        limit: 30,
        offset: 0,  
      })
    };

    /**
     * Fetch data and set it to the state "transactions"
     */
    const fetchData = async () => {
      const response = await fetch(apiUrl, requestOptions);
      const jsonData = await response.json();
      setTransactions(jsonData);
    };
    
    const interval = setInterval(() => {
      fetchData();
    }, 10000); // make api request every 30 seconds

    fetchData(); // invoke on mount

    return () => clearInterval(interval); // clear interval on unmount
  }, [isMyData]);

  if(transactions.length === 0) {
    return <div>Loading...</div>
  }

  return (
      <div className="App">
        <h2 style={{float: "left", clear: "both"}}>Trading history</h2>
        <div style={{float: "right"}}>
          <button 
            onClick={() => setIsMyData(false)}
            className={!isMyData ? "btn btn-primary" : "btn btn-outline-primary"}
          >
              All
          </button>
          <button 
            onClick={() => setIsMyData(true)}
            className={isMyData ? "btn btn-primary" : "btn btn-outline-primary"}
          >
              My orders
          </button>
        </div>
        <Table transactions={ transactions.data } />
      </div>
  );
}

export default App;